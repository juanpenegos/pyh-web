// DOMINIO — errores que el sitio sabe mostrar cuando un servicio (contacto, facturas, pagos) falla.
// El backend responde siempre con la misma forma:
//   { "error": { "code": "NOT_FOUND", "message": "texto para el usuario", "fields": { "campo": "motivo" } } }
// Cualquier código que no esté en esta lista se muestra como error genérico ("Intentar de nuevo").

export type CodigoError =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'ALREADY_PAID'
  | 'RATE_LIMITED'
  | 'PAYMENT_REJECTED'
  | 'PAYMENT_PENDING'
  | 'SERVICE_UNAVAILABLE'
  | 'UNKNOWN';

export interface DetalleError {
  codigo: CodigoError;
  mensaje: string;
  campos?: Record<string, string>; // Campo del formulario → motivo
}
