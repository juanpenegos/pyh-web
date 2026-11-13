// CONTENIDO DE PAGOS PSE — textos de las pantallas D-PSE y M-PSE y de la página de resultado.
// Los textos marcados "(no está en el diseño)" los escribimos nosotros: revísalos con PyH+.

import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';
import { urls } from '../comun/urls';

export const pagosPse: ContenidoPagosPse = {
  seo: {
    titulo: 'Pago PSE de alquiler de plataformas elevadoras | PyH+',
    descripcion:
      'Paga en línea con PSE tus facturas de alquiler o compra de plataformas elevadoras PyH+. Rápido, seguro y sin filas.',
  },
  seoResultado: {
    titulo: 'Resultado de tu pago PSE | PyH+',
    descripcion: '',
  },

  migas: [
    { texto: 'Inicio', url: urls.inicio },
    { texto: 'Pagos PSE', url: urls.pagosPse },
  ],
  etiquetaMigas: 'Ruta',

  encabezado: {
    eyebrow: 'Pago en línea del alquiler de plataformas',
    titular: { partes: [{ texto: 'Paga en ' }, { texto: '2 minutos', resaltado: true }, { texto: '.' }] },
    texto: 'Paga tus facturas de alquiler o compra desde tu banco. Rápido, seguro y sin filas.',
    sellos: [
      { icono: 'candado', texto: 'Conexión segura' },
      { icono: 'banco', texto: 'Todos los bancos PSE' },
    ],
  },

  asistente: {
    progreso: 'Paso {n} de 3',
    buscar: {
      titular: { partes: [{ texto: 'Busca tu factura.' }] },
      tipoDocumento: {
        etiqueta: 'Tipo de documento',
        opciones: [
          { valor: 'NIT', texto: 'NIT' },
          { valor: 'CC', texto: 'Cédula de ciudadanía' },
          { valor: 'CE', texto: 'Cédula de extranjería' },
        ],
      },
      numeroDocumento: { etiqueta: 'Número de documento', placeholder: '900123456' },
      numeroFactura: { etiqueta: 'Número de factura', placeholder: 'FE-[00000]' },
      boton: 'Buscar factura',
      buscando: 'Buscando…',
    },
    revisar: {
      titular: { partes: [{ texto: 'Revisa y paga.' }] },
      filas: { factura: 'Factura', cliente: 'Cliente', concepto: 'Concepto', vence: 'Vence', total: 'Total a pagar' },
      banco: {
        etiqueta: 'Elige tu banco',
        otros: 'Otro banco',            // (no está en el diseño) lista con el resto de bancos
        cargando: 'Cargando bancos…',   // (no está en el diseño)
        elige: 'Elige tu banco.',       // (no está en el diseño) error si no eligió
      },
      tipoPersona: {
        etiqueta: 'Tipo de persona',
        opciones: [
          { valor: 'juridica', texto: 'Persona jurídica' },
          { valor: 'natural', texto: 'Persona natural' },
        ],
      },
      atras: 'Atrás',
      pagar: 'Pagar con PSE',
      pagando: 'Te llevamos a tu banco…', // (no está en el diseño)
    },
    reintentar: 'Intentar de nuevo',
  },

  resultado: {
    consultando: 'Consultando tu pago…', // (no está en el diseño)
    aprobado: {
      titular: { partes: [{ texto: 'Pago aprobado' }, { texto: '.', resaltado: true }] },
      texto: 'Pagaste la factura {factura} con {banco}. Te enviamos el comprobante a tu correo. Referencia PSE: {referencia}.',
      comprobante: 'Descargar comprobante',
      otra: 'Pagar otra factura',
    },
    // (no está en el diseño) El diseño solo dice: "mostramos aquí el motivo y el botón Intentar de nuevo"
    rechazado: {
      titular: { partes: [{ texto: 'Pago rechazado' }, { texto: '.', resaltado: true }] },
      texto: 'Tu banco no aprobó el pago. {motivo}',
      reintentar: 'Intentar de nuevo',
    },
    pendiente: {
      titular: { partes: [{ texto: 'Pago en proceso' }, { texto: '.', resaltado: true }] },
      texto: 'Tu banco aún está procesando el pago. Esta página se actualiza sola.',
      tarda: 'Tu banco está tardando más de lo normal. Te enviaremos el resultado a tu correo.',
      consultar: 'Volver a consultar',
    },
    sinPago: {
      titular: { partes: [{ texto: 'No encontramos el pago' }, { texto: '.', resaltado: true }] },
      texto: 'Vuelve a buscar tu factura para pagarla.',
      volver: 'Pagar una factura',
    },
  },

  // Modo de hoy (PUBLIC_PAYMENTS_MODE=redirect): el pago se hace en Mi Pago Amigo.
  // (no está en el diseño) Mismos 3 pasos, explicados para la página externa.
  externo: {
    titular: { partes: [{ texto: 'Paga tu factura.' }] },
    pasos: [
      'Toca "Pagar con PSE": se abre la página de pagos en otra pestaña.',
      'Escribe tu NIT o cédula y el número de tu factura.',
      'Elige tu banco y paga en su página. Te llega el comprobante a tu correo.',
    ],
    boton: 'Pagar con PSE',
    nota: 'El pago se hace en Mi Pago Amigo, la plataforma de pagos PSE que usamos hoy.',
  },

  comoFunciona: {
    titulo: '¿Cómo funciona?',
    pasos: [
      { numero: '01', texto: 'Busca tu factura con NIT o cédula.' },
      { numero: '02', texto: 'Elige tu banco y paga en su página.' },
      { numero: '03', texto: 'Vuelves aquí con tu comprobante.' },
    ],
  },

  ayuda: {
    titulo: '¿Problemas con el pago?',
    texto: 'Escríbenos con el número de factura y te ayudamos.',
    whatsapp: 'WhatsApp',
    mensaje: 'Hola, PyH+. Tengo un problema con el pago de la factura {factura}.',
    mensajeSinFactura: 'Hola, PyH+. Tengo un problema con el pago de una factura.',
    formulario: { texto: 'O escríbenos por el formulario', url: `${urls.contacto}?motivo=facturacion` }, // (no está en el diseño)
  },
};
