// CONTENIDO DE INICIO — las secciones van en el mismo orden que en el diseño (Main / M-Inicio).
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 3.

import type { ContenidoInicio } from '@dominio/paginas/inicio';

export const inicio: ContenidoInicio = {
  seo: {
    titulo: 'Alquiler de plataformas elevadoras en Bogotá | PyH+',
    descripcion: '',
  },

  // Hero con los dos videos
  hero: {
    titular: { partes: [] },
    videos: [],
    accesosFamilias: [],   // Tijera eléctrica, Tijera diésel... Ver todo
    botonPrincipal: { texto: '', url: '' },
    botonSecundario: { texto: '', url: '' },
    sellos: [],             // ONAC, IPAF, 4272, 43 m
  },

  // Presentación corta ("Somos PyH+")
  nosotros: {
    eyebrow: '',
    titular: { partes: [] },
    texto: '',
    enlace: { texto: '', url: '' },
  },

  // Catálogo destacado ("Elige tu altura")
  catalogoDestacado: {
    eyebrow: '',
    titular: { partes: [] },
    texto: '',
    enlace: { texto: '', url: '' },
    familias: [],
  },

  // Asistente ("¿No sabes qué plataforma necesitas?")
  asistente: {
    eyebrow: '',
    titular: { partes: [] },
    texto: '',
  },

  // Confianza: lista corta de garantías
  garantias: [],

  // "Subimos personas. Bajamos riesgos."
  confianza: {
    titular: { partes: [] },
    subtitular: { partes: [] },
    texto: '',
    cifras: [],
    enlace: { texto: '', url: '' },
  },

  // Marquesina de clientes
  // Nombres provisionales: confirmar con el cliente qué logo es cada uno (ver MEDIA.md).
  clientes: {
    titulo: 'Empresas que ya subieron con nosotros',
    lista: [
      { nombre: 'Multiplaza', logo: { src: '/media/logo-multiplaza-5690f9.png', alt: 'Logo Multiplaza' } },
      { nombre: 'El Dorado', logo: { src: '/media/logo-el-dorado-a71eeb.png', alt: 'Logo El Dorado' } },
      { nombre: 'Parque La Colina', logo: { src: '/media/logo-parque-la-colina-2ec3b6.png', alt: 'Logo Parque La Colina' } },
    ],
  },

  // Casos ("Casos que subieron de nivel.")
  casos: {
    titular: { partes: [] },
    destacado: {
      etiquetas: [],
      titulo: '',
      imagen: { src: '', alt: '' },
      enlace: { texto: '', url: '' },
    },
    cifra: { valor: '', etiqueta: '' },
    testimonio: {
      estrellas: 0,
      cita: '',
      iniciales: '',
      nombre: '',
      cargo: '',
    },
  },

  // "Así se mueven" (clips de cada máquina)
  movimiento: {
    titular: { partes: [] },
    clips: [],
  },

  // Preguntas frecuentes
  preguntas: {
    eyebrow: '',
    titular: { partes: [] },
    texto: '',
    enlace: { texto: '', url: '' },
    lista: [],
  },

  // Certificaciones ("Seguro no es un eslogan.")
  certificaciones: {
    titular: { partes: [] },
    texto: '',
    lista: [],
    enlace: { texto: '', url: '' },
  },

  // Galería "En la obra, no en el catálogo."
  galeria: {
    titular: { partes: [] },
    fotos: [],
    videos: [],
    cifra: { valor: '', etiqueta: '' },
    frase: '',
  },

  // "Lo que viene con el +"
  beneficios: {
    titular: { partes: [] },
    lista: [],
  },

  // Blog ("Aprende antes de subir")
  blog: {
    titular: { partes: [] },
    enlace: { texto: '', url: '' },
    articulos: [],
  },
};
