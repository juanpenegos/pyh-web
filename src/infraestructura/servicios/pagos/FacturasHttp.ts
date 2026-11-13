// ADAPTADOR HTTP de facturas: busca la factura en el backend real.
// GET /invoices/lookup?documentType=…&documentNumber=…&invoiceNumber=…

import type { ServicioFacturas } from '@aplicacion/puertos/ServicioFacturas';
import type { ConsultaFactura, Factura } from '@dominio/pagos';
import { ClienteHttp, traducirCampos } from '../http/ClienteHttp';

interface FacturaApi {
  invoiceNumber: string;
  customerName: string;
  concept: string;
  dueDate: string;
  amount: number;
  currency: 'COP';
  status: Factura['estado'];
}

const CAMPOS = { documentType: 'tipoDocumento', documentNumber: 'numeroDocumento', invoiceNumber: 'numeroFactura' };

export class FacturasHttp implements ServicioFacturas {
  constructor(private readonly http: ClienteHttp) {}

  async buscar(c: ConsultaFactura): Promise<Factura> {
    const consulta = new URLSearchParams({
      documentType: c.tipoDocumento,
      documentNumber: c.numeroDocumento,
      invoiceNumber: c.numeroFactura,
    });
    try {
      const f = await this.http.pedir<FacturaApi>('GET', `/invoices/lookup?${consulta}`);
      return {
        numero: f.invoiceNumber,
        cliente: f.customerName,
        concepto: f.concept,
        vence: f.dueDate,
        total: f.amount,
        moneda: f.currency,
        estado: f.status,
      };
    } catch (error) {
      return traducirCampos(error, CAMPOS);
    }
  }
}
