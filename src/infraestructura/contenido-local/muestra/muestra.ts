// TEXTOS DE LA PÁGINA TEMPORAL /muestra (solo para revisar componentes).
// Se borra junto con src/pages/muestra.astro y src/dominio/paginas/muestra.ts antes de publicar.

import type { ContenidoMuestra } from '@dominio/paginas/muestra';

export const muestra: ContenidoMuestra = {
  seo: {
    titulo: 'Muestra de componentes | PyH+',
    descripcion: '',
  },
  titulo: 'Muestra de componentes',
  aviso: 'Página temporal para revisar los componentes. No aparece en el menú y se borra antes de publicar.',
  secciones: {
    botones: 'Botones',
    tarjetas: 'Tarjetas de máquina',
    clientes: 'Logos de clientes',
  },
  botones: {
    lima: { texto: 'Cotizar', url: '#' },
    azul: { texto: 'Ver catálogo', url: '#' },
    linea: { texto: 'Secundario', url: '#' },
    lineaBlanca: { texto: 'Sobre oscuro', url: '#' },
  },
};
