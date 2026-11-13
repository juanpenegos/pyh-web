// ADAPTADOR FALSO de pagos: simula PSE sin pasarela. No cobra nada.
// - Bancos de ejemplo (los 6 del diseño). La lista real la entrega la pasarela.
// - "Ir al banco" lleva directo a /pagos-pse/resultado, como si el banco hubiera respondido.
// - Aprueba siempre, salvo:  FE-99999 → rechazado   FE-22222 → pendiente las 2 primeras consultas.

import type { ServicioPagos } from '@aplicacion/puertos/ServicioPagos';
import type { Banco, InicioPago, ResultadoPago, SolicitudPago } from '@dominio/pagos';
import { ErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { esperar } from '../espera';

export const FACTURA_RECHAZADA = 'FE-99999';
export const FACTURA_PENDIENTE = 'FE-22222';

const BANCOS: Banco[] = [
  { codigo: '1007', nombre: 'Bancolombia' },
  { codigo: '1051', nombre: 'Davivienda' },
  { codigo: '1001', nombre: 'Banco de Bogotá' },
  { codigo: '1013', nombre: 'BBVA' },
  { codigo: '1023', nombre: 'Banco de Occidente' },
  { codigo: '1507', nombre: 'Nequi' },
];

const TOTAL_EJEMPLO = 2380000;

export class PagosFalso implements ServicioPagos {
  // Cuántas veces se consultó cada pago (para simular "pendiente" y luego "aprobado")
  private readonly consultas = new Map<string, number>();

  constructor(private readonly demora = 500) {}

  async listarBancos(): Promise<Banco[]> {
    await esperar(this.demora / 2);
    return BANCOS;
  }

  async iniciar(s: SolicitudPago): Promise<InicioPago> {
    await esperar(this.demora);
    if (!BANCOS.some((b) => b.codigo === s.codigoBanco)) {
      throw new ErrorServicio('VALIDATION_ERROR', 'Elige tu banco.', { codigoBanco: 'Elige tu banco.' });
    }
    // El id guarda la factura y el banco para poder "responder" en la página de resultado
    const idPago = `falso.${s.numeroFactura}.${s.codigoBanco}`;
    return { idPago, urlBanco: `${s.urlRetorno}?paymentId=${encodeURIComponent(idPago)}` };
  }

  async consultar(idPago: string): Promise<ResultadoPago> {
    await esperar(this.demora);
    const [prefijo, numeroFactura, codigoBanco] = idPago.split('.');
    const banco = BANCOS.find((b) => b.codigo === codigoBanco);
    if (prefijo !== 'falso' || !numeroFactura || !banco) {
      throw new ErrorServicio('NOT_FOUND', 'No encontramos ese pago.');
    }

    const veces = (this.consultas.get(idPago) ?? 0) + 1;
    this.consultas.set(idPago, veces);

    const base = { numeroFactura, banco: banco.nombre, total: TOTAL_EJEMPLO };
    if (numeroFactura === FACTURA_RECHAZADA) {
      return { ...base, estado: 'rejected', motivoRechazo: 'Motivo: fondos insuficientes.' };
    }
    if (numeroFactura === FACTURA_PENDIENTE && veces <= 2) {
      return { ...base, estado: 'pending' };
    }
    return { ...base, estado: 'approved', referenciaPse: '0000000000', pagadoEn: new Date().toISOString() };
  }
}
