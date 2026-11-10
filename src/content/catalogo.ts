// CONTENIDO DEL CATÁLOGO — pantallas D-Catalogo, M-Catalogo, M-Filtros y M-SinResultados.
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 4.

import type { Enlace, Titular, Maquina } from './tipos';

export const catalogo = {
  seo: {
    titulo: 'Catálogo de plataformas elevadoras en alquiler y venta | PyH+',
    descripcion: '',
  },

  migas: [] as Enlace[],   // Inicio / Catálogo

  // Encabezado
  encabezado: {
    eyebrow: '',
    titular: { partes: [] } as Titular,
    texto: '',
  },

  // Buscador y barra de resultados
  buscador: {
    etiqueta: '',
    placeholder: '',
  },
  tituloResultados: '',
  limpiarFiltros: '',
  verResultados: {
    uno: '',     // "Ver 1 resultado"
    varios: '',  // "Ver {n} resultados"
  },

  // Grupos de filtros (el `id` lo usa el código, la `etiqueta` es lo que se lee)
  filtros: [] as {
    id: string;
    etiqueta: string;
    opciones: string[];
  }[],

  // Ordenar
  ordenar: {
    etiqueta: '',
    opciones: [] as { id: string; etiqueta: string }[],
  },

  // Textos de cada tarjeta de máquina
  tarjeta: {
    disponibleTitulo: '',
    disponibleDetalle: '',
    botonCotizar: '',
  },

  notaDatos: '',   // "Datos de ejemplo. Las fichas las carga el CRM."

  // Estado sin resultados
  sinResultados: {
    titulo: '',
    texto: '',
    quitarFiltros: '',
    whatsapp: { texto: '', url: '' } as Enlace,
  },

  // Recuadro del asistente
  ayudaAsistente: {
    titulo: '',
    texto: '',
    boton: '',
  },

  // Lista de máquinas
  maquinas: [] as Maquina[],
};
