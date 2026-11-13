// CONTENIDO COMÚN — se repite en todas las páginas (header, menú, footer, contacto).
// Para cambiar un texto, edita su valor aquí.

import type { ContenidoComun } from '@dominio/paginas/comun';
import { urls } from './urls';
import { empresa } from './empresa';
import { urlConBusqueda, urlConFiltro } from '@aplicacion/catalogo/direccion';
import { ID_GRUPO_FAMILIA } from '../catalogo/catalogo';

/** Enlace al catálogo ya filtrado por un tipo de equipo. */
const familia = (nombre: string) => urlConFiltro(urls.catalogo, ID_GRUPO_FAMILIA, nombre);

export const comun: ContenidoComun = {
  urls,

  // Datos de la empresa
  empresa,

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
    telefono: { texto: empresa.celular.texto, url: urls.telefono },
    pagos: { texto: 'Pagos PSE', url: urls.pagosPse },
  },

  // Header
  header: {
    menu: [
      { texto: 'Inicio', url: urls.inicio },
      { texto: 'Catálogo', url: urls.catalogo },
      { texto: 'Nosotros PyH+', url: urls.nosotros },
    ],
    mas: {
      texto: 'Más',
      enlaces: [
        { texto: 'Blog', url: urls.proximamente },
        { texto: 'Contacto', url: urls.contacto },
      ],
    },
    etiquetaMenu: 'Principal',
    botonClientes: { texto: 'Clientes', url: urls.clientes },
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
      { texto: 'Contacto', url: urls.contacto },
    ],
    botonClientes: { texto: 'Clientes', url: urls.clientes },
    botonCotizar: { texto: 'Cotizar un equipo', url: urls.whatsapp },
    botonPagos: { texto: 'Pagos PSE', url: urls.pagosPse },
    telefono: { texto: empresa.celular.texto, url: urls.telefono },
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
        { texto: 'Contacto', url: urls.contacto },
        { texto: 'Pagos PSE', url: urls.pagosPse },
      ],
    },
    catalogo: {
      titulo: 'Catálogo',
      enlaces: [
        { texto: 'Alquiler de tijera eléctrica', url: familia('Tijera eléctrica') },
        { texto: 'Alquiler de tijera diésel y oruga', url: familia('Tijera diésel') },
        { texto: 'Brazos articulados', url: familia('Brazo articulado') },
        { texto: 'Brazos telescópicos', url: familia('Brazo telescópico') },
        { texto: 'Brazo sobre camión', url: urlConBusqueda(urls.catalogo, 'camión') },
        { texto: 'Unipersonales y spider', url: familia('Unipersonal') },
        { texto: 'Venta de plataformas', url: urlConFiltro(urls.catalogo, 'modalidad', 'Venta') },
      ],
    },
    contacto: {
      titulo: 'Hablemos',
      telefono: { texto: empresa.celular.texto, url: urls.telefono },
      correo: { texto: empresa.correo, url: urls.correo },
      horario: empresa.horario.largo,
      direccion: empresa.direccion.corta,
    },
    cobertura: {
      titulo: 'Alquiler de plataformas elevadoras en:',
      texto: 'Bogotá, Soacha, Girardot, Chía, Zipaquirá, Fusagasugá, Tocancipá, Facatativá, Guaduas y Guarne.',
    },
    marcas: {
      titulo: 'Marcas:',
      texto: 'JLG, Genie, Haulotte, ALO LIFT, Oil & Steel y PyH LIFT.',
    },
    sellos: empresa.sellos,
    derechos: `© 2026 ${empresa.razonSocial} · NIT ${empresa.nit}`,
    legales: [
      { texto: 'Política de datos', url: urls.politicas },
      { texto: 'Términos y condiciones', url: urls.politicas },
      { texto: 'Políticas corporativas', url: urls.politicas },
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
