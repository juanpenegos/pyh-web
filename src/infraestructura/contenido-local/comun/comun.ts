// CONTENIDO COMÚN — se repite en todas las páginas (header, menú, footer, contacto).
// Para cambiar un texto, edita su valor aquí.

import type { ContenidoComun } from '@dominio/paginas/comun';
import { urls } from './urls';

export const comun: ContenidoComun = {
  urls,

  // Datos de la empresa
  empresa: {
    nombreCorto: 'PyH+',
    razonSocial: 'Plataformas y Herramientas S.A.S.',
    nit: '[000.000.000-0]',   // Pendiente del cliente
  },

  // Accesibilidad
  saltarAlContenido: 'Saltar al contenido',

  // Logo
  logo: {
    etiquetaEnlace: 'PyH+ inicio',
    nombre: 'PyH+',
  },

  // Franja superior del header (solo escritorio)
  barraSuperior: {
    texto: 'Miembro IPAF · Equipos certificados ONAC · Bogotá y todo el país',
    telefono: { texto: '304 364 9060', url: urls.telefono },
    pagos: { texto: 'Pagos PSE', url: urls.proximamente },
  },

  // Header
  header: {
    menu: [
      { texto: 'Inicio', url: urls.inicio },
      { texto: 'Catálogo', url: urls.catalogo },
      { texto: 'Nosotros PyH+', url: urls.nosotros },
      { texto: 'Blog', url: urls.proximamente },
      { texto: 'Contacto', url: urls.whatsapp },
    ],
    etiquetaMenu: 'Principal',
    botonCotizar: { texto: 'Cotizar', url: urls.whatsapp },
  },

  // Buscador (header de todas las páginas). Envía la búsqueda al catálogo.
  buscador: {
    etiqueta: 'Buscar equipo',
    placeholder: 'Busca tu equipo: tijera, brazo…',
    boton: 'Buscar',
    url: urls.catalogo,
  },

  // Menú móvil (pantalla M-Menu)
  menuMovil: {
    etiqueta: 'Menú',
    etiquetaNav: 'Principal',
    abrir: 'Abrir menú',
    cerrar: 'Cerrar menú',
    enlaces: [
      { texto: 'Inicio', url: urls.inicio },
      { texto: 'Catálogo', url: urls.catalogo },
      { texto: 'Nosotros PyH+', url: urls.nosotros },
      { texto: 'Blog', url: urls.proximamente },
      { texto: 'Contacto', url: urls.whatsapp },
    ],
    botonCotizar: { texto: 'Cotizar un equipo', url: urls.whatsapp },
    botonPagos: { texto: 'Pagos PSE', url: urls.proximamente },
    telefono: { texto: '304 364 9060', url: urls.telefono },
    whatsapp: { texto: 'Escríbenos por WhatsApp', url: urls.whatsapp },
    sellos: ['Miembro IPAF', 'Certificados ONAC'],
  },

  // Bloque de cierre arriba del footer ("¿Subimos?")
  cierre: {
    titular: {
      partes: [{ texto: '¿Subimos' }, { texto: '?', resaltado: true }],
    },
    texto: 'Te ayudamos a elegir la plataforma correcta, la llevamos y te dejamos operando seguro.',
    boton: { texto: 'Cotiza tu equipo', url: urls.whatsapp },
  },

  // Footer
  footer: {
    descripcion: 'Alquiler y venta de plataformas elevadoras en Colombia.',
    menu: {
      titulo: 'Menú',
      enlaces: [
        { texto: 'Inicio', url: urls.inicio },
        { texto: 'Catálogo', url: urls.catalogo },
        { texto: 'Nosotros PyH+', url: urls.nosotros },
        { texto: 'Blog', url: urls.proximamente },
        { texto: 'Contacto', url: urls.whatsapp },
        { texto: 'Pagos PSE', url: urls.proximamente },
      ],
    },
    catalogo: {
      titulo: 'Catálogo',
      enlaces: [
        { texto: 'Alquiler de tijera eléctrica', url: urls.catalogo },
        { texto: 'Alquiler de tijera diésel y oruga', url: urls.catalogo },
        { texto: 'Brazos articulados', url: urls.catalogo },
        { texto: 'Brazos telescópicos', url: urls.catalogo },
        { texto: 'Brazo sobre camión', url: urls.catalogo },
        { texto: 'Unipersonales y spider', url: urls.catalogo },
        { texto: 'Venta de plataformas', url: urls.catalogo },
      ],
    },
    contacto: {
      titulo: 'Hablemos',
      telefono: { texto: '304 364 9060', url: urls.telefono },
      correo: { texto: 'info@alquilerdeplataformasyherramientas.com', url: urls.correo },
      horario: 'Lun a vie 7:00 a.m. a 4:30 p.m. · Sáb, dom y festivos cerrado',
      direccion: 'Calle 24 B # 101 – 02, barrio San José Fontibón, Bogotá',
    },
    cobertura: {
      titulo: 'Alquiler de plataformas elevadoras en:',
      texto: 'Bogotá, Soacha, Girardot, Chía, Zipaquirá, Fusagasugá, Tocancipá, Facatativá, Guaduas y Guarne.',
    },
    marcas: {
      titulo: 'Marcas:',
      texto: 'JLG, Genie, Haulotte, ALO LIFT, Oil & Steel y PyH LIFT.',
    },
    sellos: ['Miembro IPAF', 'Equipos certificados ONAC', 'Res. 4272 de 2021', 'Res. 1409 de 2012'],
    derechos: '© 2026 Plataformas y Herramientas S.A.S. · NIT [000.000.000-0]',
    legales: [
      { texto: 'Política de datos', url: urls.nosotros },
      { texto: 'Términos y condiciones', url: urls.nosotros },
      { texto: 'Políticas corporativas', url: urls.nosotros },
    ],
    fraseFinal: {
      partes: [
        { texto: 'Aquí se acaba el scroll. Lo demás lo ' },
        { texto: 'subimos nosotros ↑', resaltado: true },
      ],
    },
  },

  // Botón flotante de WhatsApp
  whatsapp: {
    etiqueta: 'Escríbenos por WhatsApp',
    url: urls.whatsapp,
  },
};
