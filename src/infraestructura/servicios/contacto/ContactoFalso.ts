// ADAPTADOR FALSO de contacto: no envía nada. Sirve para probar la página sin backend.
// - Espera ~600 ms y responde que el mensaje llegó.
// - Si el nombre es "error", responde SERVICE_UNAVAILABLE (para ver la pantalla de error).

import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { AcuseMensaje, MensajeContacto } from '@dominio/contacto';
import { ErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { esperar } from '../espera';

export class ContactoFalso implements ServicioContacto {
  constructor(private readonly demora = 600) {}

  async enviar(mensaje: MensajeContacto): Promise<AcuseMensaje> {
    await esperar(this.demora);
    if (mensaje.nombre.trim().toLowerCase() === 'error') {
      throw new ErrorServicio('SERVICE_UNAVAILABLE', 'No pudimos enviar tu mensaje. Intenta de nuevo en un momento.');
    }
    return { id: `falso-${mensaje.idSolicitud}`, recibidoEn: new Date().toISOString() };
  }
}
