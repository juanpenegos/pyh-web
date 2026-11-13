// DOMINIO — facturas y pagos PSE.
// Los montos van en pesos colombianos como número entero (sin decimales ni puntos).

export type TipoDocumento = 'NIT' | 'CC' | 'CE';
export type TipoPersona = 'natural' | 'juridica';

/** Lo que pide la persona para encontrar su factura. */
export interface ConsultaFactura {
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  numeroFactura: string; // FE-00000
}

/** Una factura del propio cliente. Solo trae los datos que se muestran en pantalla. */
export interface Factura {
  numero: string;
  cliente: string;
  concepto: string;
  vence: string;         // Fecha ISO 8601
  total: number;         // Pesos, entero
  moneda: 'COP';
  estado: 'pending' | 'paid' | 'overdue';
}

export interface Banco {
  codigo: string;
  nombre: string;
}

/** Lo que se envía para empezar un pago. */
export interface SolicitudPago {
  numeroFactura: string;
  codigoBanco: string;
  tipoPersona: TipoPersona;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  correo?: string;
  urlRetorno: string;    // Página a la que vuelve el banco
  idSolicitud: string;   // UUID: evita pagos repetidos por doble clic (Idempotency-Key)
}

/** Respuesta al empezar un pago: a dónde mandar a la persona (la página de su banco). */
export interface InicioPago {
  idPago: string;
  urlBanco: string;
}

export type EstadoPago = 'approved' | 'rejected' | 'pending';

/** Resultado de un pago, cuando la persona vuelve del banco. */
export interface ResultadoPago {
  estado: EstadoPago;
  numeroFactura: string;
  banco: string;
  referenciaPse?: string;
  total: number;
  pagadoEn?: string;      // Fecha ISO 8601
  urlComprobante?: string;
  motivoRechazo?: string;
}

/**
 * Cómo se paga hoy:
 * - 'asistente': en esta página, con los 3 pasos (buscar factura, elegir banco, resultado).
 * - 'externo': un botón que abre la página de pagos que ya usa la empresa (Mi Pago Amigo).
 */
