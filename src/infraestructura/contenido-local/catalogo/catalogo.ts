// CONTENIDO DEL CATÁLOGO — pantallas D-Catalogo, M-Catalogo, M-Filtros y M-SinResultados.
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 4.

import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import { urls } from '../comun/urls';
import { maquinas } from './maquinas';

export const catalogo: ContenidoCatalogo = {
  seo: {
    titulo: 'Catálogo de plataformas elevadoras en alquiler y venta | PyH+',
    descripcion: '',
  },

  migas: [],   // Inicio / Catálogo

  // Encabezado
  encabezado: {
    eyebrow: '',
    titular: { partes: [] },
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
  filtros: [],

  // Ordenar
  ordenar: {
    etiqueta: '',
    opciones: [],
  },

  // Textos de cada tarjeta de máquina
  tarjeta: {
    disponibleTitulo: 'Disponible para alquilar',
    disponibleDetalle: 'por día, semana y mes',
    botonCotizar: { texto: 'Cotizar', url: urls.whatsapp },
  },

  notaDatos: '',   // "Datos de ejemplo. Las fichas las carga el CRM."

  // Estado sin resultados
  sinResultados: {
    titulo: '',
    texto: '',
    quitarFiltros: '',
    whatsapp: { texto: '', url: '' },
  },

  // Recuadro del asistente
  ayudaAsistente: {
    titulo: '',
    texto: '',
    boton: '',
  },

  // Lista de máquinas (en maquinas.ts, en esta misma carpeta)
  maquinas,
};
