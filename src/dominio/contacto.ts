// DOMINIO — un mensaje del formulario de Contacto.

/** Motivo del mensaje. Son los valores que recibe el backend (`topic`). */
export type MotivoContacto = 'cotizacion' | 'soporte' | 'compra' | 'facturacion' | 'otro';

/** Parámetros de campaña que traía la dirección (Google Ads, redes…). */
export type ParametrosCampana = Partial<
  Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content' | 'gclid', string>
>;

/** Lo que escribe la persona en el formulario. */
export interface DatosMensaje {
  motivo: MotivoContacto;
  nombre: string;
  empresa?: string;
  celular: string;  // 10 dígitos, empieza por 3
  correo: string;
  mensaje: string;
  aceptaPolitica: boolean;
}

/** El mensaje completo que se envía (los datos más lo que agrega el sitio). */
export interface MensajeContacto extends DatosMensaje {
  origen: 'web-contacto';
  campana?: ParametrosCampana;
  idSolicitud: string; // UUID: evita mensajes repetidos por doble clic (Idempotency-Key)
}

/** Respuesta cuando el mensaje llegó bien. */
export interface AcuseMensaje {
  id: string;
  recibidoEn: string; // Fecha ISO 8601
}
