// ADAPTADOR HTTP de contacto: envía el mensaje al backend real.
// POST /contact-messages  (contrato completo en docs/api-contrato.md)

import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { AcuseMensaje, MensajeContacto } from '@dominio/contacto';
import { ClienteHttp, traducirCampos } from '../http/ClienteHttp';

// Campo del backend → campo del formulario (para marcar en rojo el que corresponde)
const CAMPOS = {
  topic: 'motivo',
  name: 'nombre',
  company: 'empresa',
  phone: 'celular',
  email: 'correo',
  message: 'mensaje',
  acceptsDataPolicy: 'aceptaPolitica',
};

export class ContactoHttp implements ServicioContacto {
  constructor(private readonly http: ClienteHttp) {}

  async enviar(m: MensajeContacto): Promise<AcuseMensaje> {
    try {
      const r = await this.http.pedir<{ id: string; receivedAt: string }>('POST', '/contact-messages', {
        idSolicitud: m.idSolicitud,
        cuerpo: {
          topic: m.motivo,
          name: m.nombre,
          company: m.empresa || undefined,
          phone: m.celular,
          email: m.correo,
          message: m.mensaje,
          acceptsDataPolicy: m.aceptaPolitica,
          source: m.origen,
          utm: m.campana,
        },
      });
      return { id: r.id, recibidoEn: r.receivedAt };
    } catch (error) {
      return traducirCampos(error, CAMPOS);
    }
  }
}
