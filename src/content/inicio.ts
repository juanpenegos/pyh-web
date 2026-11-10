// CONTENIDO DE INICIO — las secciones van en el mismo orden que en el diseño (Main / M-Inicio).
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 3.

import type {
  Enlace,
  Imagen,
  Video,
  Titular,
  Cifra,
  Certificacion,
  Pregunta,
  Cliente,
} from './tipos';

export const inicio = {
  seo: {
    titulo: 'Alquiler de plataformas elevadoras en Bogotá | PyH+',
    descripcion: '',
  },

  // Hero con los dos videos
  hero: {
    titular: { partes: [] } as Titular,
    videos: [] as Video[],
    accesosFamilias: [] as Enlace[],   // Tijera eléctrica, Tijera diésel... Ver todo
    botonPrincipal: { texto: '', url: '' } as Enlace,
    botonSecundario: { texto: '', url: '' } as Enlace,
    sellos: [] as Cifra[],             // ONAC, IPAF, 4272, 43 m
  },

  // Presentación corta ("Somos PyH+")
  nosotros: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
    enlace: { texto: '', url: '' } as Enlace,
  },

  // Catálogo destacado ("Elige tu altura")
  catalogoDestacado: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
    enlace: { texto: '', url: '' } as Enlace,
    familias: [] as {
      numero: string;
      nombre: string;
      resumen: string;
      descripcion: string;
      imagen: Imagen;
      video?: Video;
      url: string;
    }[],
  },

  // Asistente ("¿No sabes qué plataforma necesitas?")
  asistente: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
  },

  // Confianza: lista corta de garantías
  garantias: [] as string[],

  // "Subimos personas. Bajamos riesgos."
  confianza: {
    titular: { partes: [] } as Titular,
    subtitular: { partes: [] } as Titular,
    texto: '',
    cifras: [] as Cifra[],
    enlace: { texto: '', url: '' } as Enlace,
  },

  // Marquesina de clientes
  clientes: {
    titulo: '',
    lista: [] as Cliente[],
  },

  // Casos ("Casos que subieron de nivel.")
  casos: {
    titular: { partes: [] } as Titular,
    destacado: {
      etiquetas: [] as string[],
      titulo: '',
      imagen: { src: '', alt: '' } as Imagen,
      enlace: { texto: '', url: '' } as Enlace,
    },
    cifra: { valor: '', etiqueta: '' } as Cifra,
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
    titular: { partes: [] } as Titular,
    clips: [] as (Video & { texto: string })[],
  },

  // Preguntas frecuentes
  preguntas: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
    enlace: { texto: '', url: '' } as Enlace,
    lista: [] as Pregunta[],
  },

  // Certificaciones ("Seguro no es un eslogan.")
  certificaciones: {
    titular: { partes: [] } as Titular,
    texto: '',
    lista: [] as Certificacion[],
    enlace: { texto: '', url: '' } as Enlace,
  },

  // Galería "En la obra, no en el catálogo."
  galeria: {
    titular: { partes: [] } as Titular,
    fotos: [] as Imagen[],
    videos: [] as Video[],
    cifra: { valor: '', etiqueta: '' } as Cifra,
    frase: '',
  },

  // "Lo que viene con el +"
  beneficios: {
    titular: { partes: [] } as Titular,
    lista: [] as { numero: string; titulo: string; texto: string }[],
  },

  // Blog ("Aprende antes de subir")
  blog: {
    titular: { partes: [] } as Titular,
    enlace: { texto: '', url: '' } as Enlace,
    articulos: [] as {
      categoria: string;
      lectura: string;
      titulo: string;
      imagen: Imagen;
      url: string;
    }[],
  },
};
