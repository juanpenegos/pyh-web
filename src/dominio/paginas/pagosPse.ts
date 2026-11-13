// DOMINIO — forma del contenido de Pagos PSE (D-PSE / M-PSE) y de su página de resultado.

import type { Enlace, Seo, Titular } from '../comunes';
import type { TipoDocumento, TipoPersona } from '../pagos';

export interface TextosAsistentePago {
  progreso: string;            // "Paso {n} de 3" (lectores de pantalla)
  buscar: {
    titular: Titular;
    tipoDocumento: { etiqueta: string; opciones: { valor: TipoDocumento; texto: string }[] };
    numeroDocumento: { etiqueta: string; placeholder: string };
    numeroFactura: { etiqueta: string; placeholder: string };
    boton: string;
    buscando: string;
  };
  revisar: {
    titular: Titular;
    filas: { factura: string; cliente: string; concepto: string; vence: string; total: string };
    banco: { etiqueta: string; otros: string; cargando: string; elige: string };
    tipoPersona: { etiqueta: string; opciones: { valor: TipoPersona; texto: string }[] };
    atras: string;
    pagar: string;
    pagando: string;
  };
  reintentar: string;
}

export interface TextosResultadoPago {
  consultando: string;
  aprobado: { titular: Titular; texto: string; comprobante: string; otra: string };   // texto con {factura} {banco} {referencia}
  rechazado: { titular: Titular; texto: string; reintentar: string };                  // texto con {motivo}
  pendiente: { titular: Titular; texto: string; tarda: string; consultar: string };
  sinPago: { titular: Titular; texto: string; volver: string };
}

/** Modo de hoy: botón que abre la página de pagos externa (Mi Pago Amigo). */
export interface TextosPagoExterno {
  titular: Titular;
  pasos: string[];
  boton: string;
  nota: string;
}

export interface ContenidoPagosPse {
  seo: Seo;
  seoResultado: Seo;
  migas: Enlace[];
  etiquetaMigas: string;
  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    sellos: { icono: 'candado' | 'banco'; texto: string }[];
  };
  asistente: TextosAsistentePago;
  resultado: TextosResultadoPago;
  externo: TextosPagoExterno;
  comoFunciona: { titulo: string; pasos: { numero: string; texto: string }[] };
  ayuda: {
    titulo: string;
    texto: string;
    whatsapp: string;
    mensaje: string;            // Mensaje de WhatsApp con {factura}
    mensajeSinFactura: string;
    formulario: Enlace;         // Contacto con el motivo "Facturación" ya elegido
  };
}
