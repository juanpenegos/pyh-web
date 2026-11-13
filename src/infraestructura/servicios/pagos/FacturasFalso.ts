// ADAPTADOR FALSO de facturas: inventa una factura para probar el asistente sin backend.
// Facturas especiales para probar los errores:
//   FE-40400 → no existe (NOT_FOUND)     FE-11111 → ya está pagada (ALREADY_PAID)
// Cualquier otra FE-##### devuelve una factura pendiente de ejemplo.

import type { ServicioFacturas } from '@aplicacion/puertos/ServicioFacturas';
import type { ConsultaFactura, Factura } from '@dominio/pagos';
import { ErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { esperar } from '../espera';

export const FACTURA_NO_EXISTE = 'FE-40400';
export const FACTURA_PAGADA = 'FE-11111';

export class FacturasFalso implements ServicioFacturas {
  constructor(private readonly demora = 500) {}

  async buscar(consulta: ConsultaFactura): Promise<Factura> {
    await esperar(this.demora);
    const numero = consulta.numeroFactura.toUpperCase();

    if (numero === FACTURA_NO_EXISTE) {
      throw new ErrorServicio('NOT_FOUND', 'No encontramos esa factura. Revisa el número y el documento.');
    }
    if (numero === FACTURA_PAGADA) {
      throw new ErrorServicio('ALREADY_PAID', 'Esta factura ya está pagada. ¡Gracias!');
    }

    return {
      numero,
      cliente: '[Razón social]',
      concepto: 'Alquiler brazo articulado 20 m · 1 semana',
      vence: '2026-10-30',
      total: 2380000,
      moneda: 'COP',
      estado: 'pending',
    };
  }
}
