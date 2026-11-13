// PUERTO — pagar con PSE. No sabe qué pasarela hay detrás (ACH, PayU, Wompi, ePayco…).
// Lo implementan PagosFalso (pruebas) y PagosHttp (backend real).
// El pago por enlace externo (Mi Pago Amigo) no es un servicio: ver aplicacion/pagos/formaDePago.ts.

import type { Banco, InicioPago, ResultadoPago, SolicitudPago } from '@dominio/pagos';

export interface ServicioPagos {
  /** Bancos de PSE. La lista real la entrega la pasarela. */
  listarBancos(): Promise<Banco[]>;
  /** Empieza el pago y devuelve la página del banco a la que hay que ir. */
  iniciar(solicitud: SolicitudPago): Promise<InicioPago>;
  /** Estado del pago cuando la persona vuelve del banco. */
  consultar(idPago: string): Promise<ResultadoPago>;
}
