// ADAPTADOR HTTP de pagos: habla con el backend, que a su vez habla con la pasarela PSE.
// GET /payments/pse/banks · POST /payments/pse · GET /payments/{paymentId}

import type { ServicioPagos } from '@aplicacion/puertos/ServicioPagos';
import type { Banco, InicioPago, ResultadoPago, SolicitudPago } from '@dominio/pagos';
import { ClienteHttp, traducirCampos } from '../http/ClienteHttp';

interface PagoApi {
  status: ResultadoPago['estado'];
  invoiceNumber: string;
  bankName: string;
  pseReference?: string;
  amount: number;
  paidAt?: string;
  receiptUrl?: string;
  rejectionReason?: string;
}

const CAMPOS = {
  invoiceNumber: 'numeroFactura',
  bankCode: 'codigoBanco',
  personType: 'tipoPersona',
  documentType: 'tipoDocumento',
  documentNumber: 'numeroDocumento',
  email: 'correo',
};

export class PagosHttp implements ServicioPagos {
  constructor(private readonly http: ClienteHttp) {}

  async listarBancos(): Promise<Banco[]> {
    const bancos = await this.http.pedir<{ code: string; name: string }[]>('GET', '/payments/pse/banks');
    return bancos.map((b) => ({ codigo: b.code, nombre: b.name }));
  }

  async iniciar(s: SolicitudPago): Promise<InicioPago> {
    try {
      const r = await this.http.pedir<{ paymentId: string; redirectUrl: string }>('POST', '/payments/pse', {
        idSolicitud: s.idSolicitud,
        cuerpo: {
          invoiceNumber: s.numeroFactura,
          bankCode: s.codigoBanco,
          personType: s.tipoPersona,
          documentType: s.tipoDocumento,
          documentNumber: s.numeroDocumento,
          email: s.correo,
          returnUrl: s.urlRetorno,
        },
      });
      return { idPago: r.paymentId, urlBanco: r.redirectUrl };
    } catch (error) {
      return traducirCampos(error, CAMPOS);
    }
  }

  async consultar(idPago: string): Promise<ResultadoPago> {
    const p = await this.http.pedir<PagoApi>('GET', `/payments/${encodeURIComponent(idPago)}`);
    return {
      estado: p.status,
      numeroFactura: p.invoiceNumber,
      banco: p.bankName,
      referenciaPse: p.pseReference,
      total: p.amount,
      pagadoEn: p.paidAt,
      urlComprobante: p.receiptUrl,
      motivoRechazo: p.rejectionReason,
    };
  }
}
