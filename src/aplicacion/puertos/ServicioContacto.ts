// PUERTO — enviar un mensaje del formulario de Contacto.
// Lo implementan (en src/infraestructura/servicios/contacto/):
//   ContactoFalso (pruebas), ContactoHttp (backend real) y ContactoWhatsapp (hoy: abre WhatsApp).
// Si falla, lanza un ErrorServicio (src/aplicacion/errores/ErrorServicio.ts).

import type { AcuseMensaje, MensajeContacto } from '@dominio/contacto';

export interface ServicioContacto {
  enviar(mensaje: MensajeContacto): Promise<AcuseMensaje>;
}
