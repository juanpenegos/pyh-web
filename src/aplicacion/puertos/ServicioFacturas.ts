// PUERTO — buscar la factura de un cliente para pagarla.
// Lo implementan FacturasFalso (pruebas) y FacturasHttp (backend real).
// Errores: NOT_FOUND (no existe), ALREADY_PAID (ya está pagada) y los generales.

import type { ConsultaFactura, Factura } from '@dominio/pagos';

export interface ServicioFacturas {
  buscar(consulta: ConsultaFactura): Promise<Factura>;
}
