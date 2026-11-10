// CONTENIDO DE NOSOTROS — pantallas D-Nosotros y M-Nosotros.
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 5.

import type { Enlace, Imagen, Video, Titular, Certificacion, Pregunta } from './tipos';

export const nosotros = {
  seo: {
    titulo: 'Nosotros: alquiler de plataformas elevadoras en Colombia | PyH+',
    descripcion: '',
  },

  migas: [] as Enlace[],   // Inicio / Nosotros PyH+

  // Encabezado ("Somos el + de tu obra.")
  encabezado: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
    boton: { texto: '', url: '' } as Enlace,
    foto: { src: '', alt: '' } as Imagen,
  },

  // Misión y visión
  mision: { titulo: '', texto: '' },
  vision: { titulo: '', texto: '' },

  // Historia ("De dos plataformas a 43 metros")
  historia: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    hitos: [] as { anio: string; titulo: string; texto: string }[],
  },

  // Video del equipo en ferias
  video: {
    ayuda: '',      // "Pasa el mouse para ver y escuchar"
    etiquetas: [] as string[],
    video: { src: '', poster: '', alt: '' } as Video,
  },

  // Valores ("Lo que no negociamos")
  valores: {
    titular: { partes: [] } as Titular,
    lista: [] as { numero: string; titulo: string; texto: string }[],
  },

  // Certificados ("Certificados, no promesas")
  certificados: {
    titular: { partes: [] } as Titular,
    texto: '',
    lista: [] as Certificacion[],
  },

  // Equipo ("Las personas del +")
  equipo: {
    titular: { partes: [] } as Titular,
    personas: [] as { nombre: string; cargo: string; foto?: Imagen }[],
  },

  // Políticas (acordeón con descarga)
  politicas: {
    titulo: '',
    texto: '',
    descargar: '',
    lista: [] as (Pregunta & { pdf: string })[],
  },
};
