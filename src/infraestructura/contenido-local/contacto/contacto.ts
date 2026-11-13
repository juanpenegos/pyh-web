// CONTENIDO DE CONTACTO — textos de las pantallas D-Contacto y M-Contacto.
// Los datos de la empresa (teléfono, correo, dirección, horario) salen de comun/empresa.ts.

import type { ContenidoContacto } from '@dominio/paginas/contacto';
import { urls, ANCLA_MAPA } from '../comun/urls';
import { empresa } from '../comun/empresa';

export const contacto: ContenidoContacto = {
  seo: {
    titulo: 'Contacto: alquiler de manlift en Bogotá | PyH+',
    descripcion:
      'Contacta a PyH+ para el alquiler de plataformas elevadoras en Bogotá: WhatsApp, teléfono, correo y sede en Fontibón.',
  },

  migas: [
    { texto: 'Inicio', url: urls.inicio },
    { texto: 'Contacto', url: urls.contacto },
  ],
  etiquetaMigas: 'Ruta',

  encabezado: {
    eyebrow: 'Alquiler de manlift en Bogotá',
    titular: { partes: [{ texto: 'Hablemos' }, { texto: '.', resaltado: true }] },
    texto: 'Elige el canal que prefieras. Si es urgente, WhatsApp es lo más rápido.',
  },

  canales: [
    {
      canal: 'whatsapp',
      titulo: 'WhatsApp',
      valor: empresa.celular.texto,
      ayuda: 'Respuesta en minutos',
      url: urls.whatsapp,
      tono: 'lima',
    },
    {
      canal: 'telefono',
      titulo: 'Llámanos',
      valor: empresa.celular.texto,
      ayuda: empresa.horario.corto,
      url: urls.telefono,
      tono: 'azul',
    },
    {
      canal: 'correo',
      titulo: 'Escríbenos',
      valor: empresa.correo,
      ayuda: 'Respuesta en 1 día hábil',
      url: urls.correo,
      tono: 'hielo',
    },
    {
      canal: 'mapa',
      titulo: 'Visítanos',
      valor: empresa.direccion.linea1,
      ayuda: empresa.direccion.barrioCiudad,
      url: `#${ANCLA_MAPA}`,
      tono: 'suave',
    },
  ],

  formulario: {
    etiqueta: 'Formulario de contacto',
    titular: { partes: [{ texto: 'Déjanos tu mensaje.' }] },
    preguntaMotivo: '¿Sobre qué quieres hablar?',
    motivos: [
      { valor: 'cotizacion', texto: 'Cotización', ayuda: 'Cuéntanos qué equipo, ciudad y fechas necesitas.' },
      { valor: 'soporte', texto: 'Soporte en obra', ayuda: 'Dinos la referencia del equipo y qué está pasando.' },
      { valor: 'compra', texto: 'Compra de equipo', ayuda: '¿Qué equipo quieres comprar? ¿Nuevo o usado?' },
      { valor: 'facturacion', texto: 'Facturación', ayuda: 'Número de factura y tu duda.' },
      { valor: 'otro', texto: 'Otro', ayuda: 'Escribe tu mensaje.' },
    ],
    campos: {
      nombre: { etiqueta: 'Nombre', placeholder: 'Tu nombre' },
      empresa: { etiqueta: 'Empresa (opcional)', placeholder: 'Tu empresa' },
      celular: { etiqueta: 'Celular', placeholder: '300 000 0000' },
      correo: { etiqueta: 'Correo', placeholder: 'tu@empresa.com' },
      mensaje: { etiqueta: 'Mensaje' },
    },
    // El diseño dice "Al enviar aceptas la política de tratamiento de datos.".
    // La Ley 1581 de 2012 pide un consentimiento claro, por eso es una casilla.
    politica: {
      antes: 'Acepto la ',
      enlace: { texto: 'política de tratamiento de datos', url: empresa.politicaDatos },
      despues: '.',
    },
    trampa: 'No llenes este campo',
    enviar: 'Enviar mensaje',
    enviando: 'Enviando…',
    revisaCampos: 'Revisa los campos marcados.',
    // (no está en el diseño) Solo se ve si el navegador tiene JavaScript apagado
    sinJavascript: 'Tu navegador tiene JavaScript apagado y el formulario no puede enviarse. Escríbenos por WhatsApp, llámanos o mándanos un correo con los datos de arriba.',
    reintentar: 'Intentar de nuevo',
    exito: {
      titular: { partes: [{ texto: 'Mensaje recibido' }, { texto: '.', resaltado: true }] },
      texto: 'Te respondemos sobre «{motivo}» en menos de 1 día hábil.',
      otro: 'Enviar otro mensaje',
    },
  },

  // Mensaje que se escribe en WhatsApp mientras no exista el backend (PUBLIC_CONTACT_MODE=whatsapp)
  whatsapp: {
    saludo: 'Hola, PyH+. Les escribo desde la página de Contacto.',
    etiquetas: {
      motivo: 'Motivo',
      nombre: 'Nombre',
      empresa: 'Empresa',
      celular: 'Celular',
      correo: 'Correo',
      mensaje: 'Mensaje',
    },
  },

  mapa: {
    id: ANCLA_MAPA,
    imagen: {
      src: '/media/mapa-sede-bogota-fontibon-google-maps-7e3d3a.webp',
      alt: `Mapa de Google con la ubicación de PyH+ en ${empresa.direccion.linea1}, San José Fontibón, Bogotá`,
    },
    imagenAvif: '/media/mapa-sede-bogota-fontibon-google-maps-7e3d3a.avif', // Versión más liviana para navegadores que la entienden
    boton: 'Ver en Google Maps ↗',
    etiquetaBoton: 'Ver la sede de PyH+ en Google Maps',
    tituloMapa: 'Mapa de la sede de PyH+ en Bogotá',
    url: empresa.mapa.embebido,
  },

  sede: {
    titulo: 'Sede Bogotá',
    direccion: empresa.direccion.completa,
    horario: empresa.horario.largo,
    comoLlegar: { texto: 'Cómo llegar', url: empresa.mapa.comoLlegar },
  },
};
