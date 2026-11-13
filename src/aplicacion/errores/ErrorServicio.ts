// ERROR TIPADO que lanzan TODOS los servicios (falsos, HTTP, WhatsApp, redirección).
// Así la pantalla siempre recibe la misma forma de error, venga de donde venga (principio L de SOLID).
// Uso: throw new ErrorServicio('NOT_FOUND', 'No encontramos esa factura.');

import type { CodigoError, DetalleError } from '@dominio/errores';

const CODIGOS_CONOCIDOS: CodigoError[] = [
  'VALIDATION_ERROR',
  'NOT_FOUND',
  'ALREADY_PAID',
  'RATE_LIMITED',
  'PAYMENT_REJECTED',
  'PAYMENT_PENDING',
  'SERVICE_UNAVAILABLE',
];

export class ErrorServicio extends Error implements DetalleError {
  readonly codigo: CodigoError;
  readonly mensaje: string;
  readonly campos?: Record<string, string>;

  constructor(codigo: string, mensaje: string, campos?: Record<string, string>) {
    super(mensaje);
    this.name = 'ErrorServicio';
    this.codigo = CODIGOS_CONOCIDOS.includes(codigo as CodigoError) ? (codigo as CodigoError) : 'UNKNOWN';
    this.mensaje = mensaje;
    this.campos = campos;
  }
}

/** Convierte cualquier error (de red, de programación…) en un ErrorServicio. */
export function comoErrorServicio(error: unknown): ErrorServicio {
  if (error instanceof ErrorServicio) return error;
  return new ErrorServicio('UNKNOWN', 'Algo salió mal. Intenta de nuevo en un momento.');
}
