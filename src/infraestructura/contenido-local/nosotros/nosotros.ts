// CONTENIDO DE NOSOTROS — pantallas D-Nosotros y M-Nosotros.
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 5.

import type { ContenidoNosotros } from '@dominio/paginas/nosotros';

export const nosotros: ContenidoNosotros = {
  seo: {
    titulo: 'Nosotros: alquiler de plataformas elevadoras en Colombia | PyH+',
    descripcion: '',
  },

  migas: [],   // Inicio / Nosotros PyH+

  // Encabezado ("Somos el + de tu obra.")
  encabezado: {
    eyebrow: '',
    titular: { partes: [] },
    texto: '',
    boton: { texto: '', url: '' },
    foto: { src: '', alt: '' },
  },

  // Misión y visión
  mision: { titulo: '', texto: '' },
  vision: { titulo: '', texto: '' },

  // Historia ("De dos plataformas a 43 metros")
  historia: {
    eyebrow: '',
    titular: { partes: [] },
    hitos: [],
  },

  // Video del equipo en ferias
  video: {
    ayuda: '',      // "Pasa el mouse para ver y escuchar"
    etiquetas: [],
    video: { src: '', poster: '', alt: '' },
  },

  // Valores ("Lo que no negociamos")
  valores: {
    titular: { partes: [] },
    lista: [],
  },

  // Certificados ("Certificados, no promesas")
  certificados: {
    titular: { partes: [] },
    texto: '',
    lista: [],
  },

  // Equipo ("Las personas del +")
  equipo: {
    titular: { partes: [] },
    personas: [],
  },

  // Políticas (acordeón con descarga)
  politicas: {
    titulo: '',
    texto: '',
    descargar: '',
    lista: [],
  },
};
