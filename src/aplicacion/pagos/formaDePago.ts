// CÓMO SE PAGA en este sitio. Son dos casos distintos, y cada uno trae solo lo que necesita:
// - "asistente": el asistente de 3 pasos, con el servicio de facturas y el de pagos.
// - "externo":   solo un enlace a la página de pagos que ya usa la empresa (Mi Pago Amigo).
// Así ningún adaptador tiene que fingir operaciones que no hace.
import type { ServicioFacturas } from '@aplicacion/puertos/ServicioFacturas';
import type { ServicioPagos } from '@aplicacion/puertos/ServicioPagos';

export type FormaDePago =
  | { tipo: 'asistente'; facturas: ServicioFacturas; pagos: ServicioPagos }
  | { tipo: 'externo'; url: string };
