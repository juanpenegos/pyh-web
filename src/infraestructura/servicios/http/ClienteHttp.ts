// CLIENTE HTTP compartido por los adaptadores que hablan con el backend real.
// - Envía y recibe JSON.
// - Pone el encabezado Idempotency-Key cuando se le pasa `idSolicitud` (evita envíos dobles).
// - Convierte la respuesta de error del backend { error: { code, message, fields } } en ErrorServicio.
// - Si no hay conexión, lanza SERVICE_UNAVAILABLE.

import { ErrorServicio } from '@aplicacion/errores/ErrorServicio';

type Fetch = typeof fetch;

interface OpcionesPedido {
  cuerpo?: unknown;
  idSolicitud?: string;
}

const SIN_SERVICIO = 'No pudimos conectarnos. Revisa tu internet e intenta de nuevo.';

export class ClienteHttp {
  constructor(
    private readonly base: string,
    private readonly fetchFn: Fetch = (...args) => fetch(...args),
  ) {}

  async pedir<T>(metodo: 'GET' | 'POST', ruta: string, opciones: OpcionesPedido = {}): Promise<T> {
    const encabezados: Record<string, string> = { Accept: 'application/json' };
    if (opciones.cuerpo !== undefined) encabezados['Content-Type'] = 'application/json';
    if (opciones.idSolicitud) encabezados['Idempotency-Key'] = opciones.idSolicitud;

    let respuesta: Response;
    try {
      respuesta = await this.fetchFn(this.base.replace(/\/$/, '') + ruta, {
        method: metodo,
        headers: encabezados,
        body: opciones.cuerpo === undefined ? undefined : JSON.stringify(opciones.cuerpo),
      });
    } catch {
      throw new ErrorServicio('SERVICE_UNAVAILABLE', SIN_SERVICIO);
    }

    const datos: unknown = await respuesta.json().catch(() => undefined);
    if (respuesta.ok) return datos as T;

    const error = (datos as { error?: { code?: string; message?: string; fields?: Record<string, string> } })?.error;
    throw new ErrorServicio(
      error?.code ?? (respuesta.status >= 500 ? 'SERVICE_UNAVAILABLE' : 'UNKNOWN'),
      error?.message ?? SIN_SERVICIO,
      error?.fields,
    );
  }
}

/** Traduce los nombres de campo del backend (inglés) a los del formulario. */
export function traducirCampos(error: unknown, mapa: Record<string, string>): never {
  if (error instanceof ErrorServicio && error.campos) {
    const campos = Object.fromEntries(Object.entries(error.campos).map(([campo, motivo]) => [mapa[campo] ?? campo, motivo]));
    throw new ErrorServicio(error.codigo, error.mensaje, campos);
  }
  throw error;
}
