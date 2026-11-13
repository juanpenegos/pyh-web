// CONTENIDO DEL CATÁLOGO — pantallas D-Catalogo, M-Catalogo, M-Filtros y M-SinResultados.
// Para cambiar un texto, edita su valor aquí.
// {n} se reemplaza por el número de resultados y {busqueda} por lo que la persona escribió.

import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import type { GrupoFiltro } from '@dominio/filtros';
import { urlConBusqueda } from '@aplicacion/catalogo/direccion';
import { urls } from '../comun/urls';
import { maquinas } from './maquinas';

const m = (archivo: string) => `/media/${archivo}`;

/** Id del grupo "Tipo de equipo"; otras páginas lo usan para enlazar el catálogo ya filtrado. */
export const ID_GRUPO_FAMILIA = 'familia';

// GRUPOS DE FILTROS. Para agregar uno nuevo basta sumarlo a esta lista.
// - tipo 'campo': compara con un dato de la máquina (familia, energia, terreno, marca, modalidad).
// - tipo 'rango': rangos de altura de trabajo (masDe = sin incluir, hasta = incluido).
// El `id` es lo que aparece en la dirección: /catalogo?familia=tijera-electrica
const grupos: GrupoFiltro[] = [
  {
    tipo: 'campo',
    id: ID_GRUPO_FAMILIA,
    etiqueta: 'Tipo de equipo',
    campo: 'familia',
    opciones: ['Tijera eléctrica', 'Tijera diésel', 'Brazo articulado', 'Brazo telescópico', 'Unipersonal'],
  },
  {
    tipo: 'rango',
    id: 'altura',
    etiqueta: 'Altura de trabajo',
    opciones: [
      { etiqueta: 'Hasta 8 m', hasta: 8 },
      { etiqueta: 'De 8 a 12 m', masDe: 8, hasta: 12 },
      { etiqueta: 'De 12 a 20 m', masDe: 12, hasta: 20 },
      { etiqueta: 'Más de 20 m', masDe: 20 },
    ],
  },
  { tipo: 'campo', id: 'energia', etiqueta: 'Energía', campo: 'energia', opciones: ['Eléctrica', 'Diésel'] },
  { tipo: 'campo', id: 'terreno', etiqueta: 'Terreno', campo: 'terreno', opciones: ['Interior', 'Exterior'] },
  { tipo: 'campo', id: 'marca', etiqueta: 'Marca', campo: 'marca', opciones: ['JLG', 'Haulotte', 'Oilsteel'] },
  { tipo: 'campo', id: 'modalidad', etiqueta: 'Modalidad', campo: 'modalidad', opciones: ['Alquiler', 'Venta'] },
];

const imagenOperario = {
  src: m('foto-operario-equipo-seguridad-senalando-hacia-arriba-433570.webp'),
  alt: 'Operario PyH+ de plataformas elevadoras',
};

const whatsapp = { texto: 'Preguntar por WhatsApp', url: urls.whatsapp };

export const catalogo: ContenidoCatalogo = {
  seo: {
    titulo: 'Catálogo de plataformas elevadoras en alquiler y venta | PyH+',
    descripcion:
      'Tijeras eléctricas y diésel, brazos articulados, telescópicos y unipersonales en alquiler y venta. Filtra por altura, energía y terreno y cotiza en un clic.',
  },

  etiquetaMigas: 'Ruta',
  migas: [
    { texto: 'Inicio', url: urls.inicio },
    { texto: 'Catálogo', url: urls.catalogo },
  ],

  encabezado: {
    eyebrow: 'Alquiler y venta de plataformas elevadoras',
    titular: { partes: [{ texto: 'Encuentra tu ' }, { texto: 'altura', resaltado: 'lima' }, { texto: '.' }] },
    texto: 'Un solo catálogo para alquiler y venta. Filtra como en cualquier tienda en línea y cotiza el equipo en un clic.',
  },

  buscador: {
    etiqueta: 'Buscar equipo',
    placeholder: 'Busca por equipo, altura o marca. Ej: tijera 12 m',
    boton: 'Buscar',
  },

  grupos,

  textos: {
    filtros: {
      etiquetaPanel: 'Filtros',
      titulo: 'Plataformas elevadoras',
      limpiar: 'Limpiar filtros',
      quitar: 'Quitar filtro {opcion}',
      botonMovil: 'Filtros',
    },
    hoja: {
      titulo: 'Filtros',
      cerrar: 'Cerrar filtros',
      limpiar: 'Limpiar',
      ver: { uno: 'Ver 1 resultado', varios: 'Ver {n} resultados' },
    },
    resultados: { uno: '1 resultado', varios: '{n} resultados' },
    ordenar: {
      etiqueta: 'Ordenar por',
      opciones: [
        { id: 'relevancia', etiqueta: 'Más relevantes' },
        { id: 'menor-altura', etiqueta: 'Menor altura' },
        { id: 'mayor-altura', etiqueta: 'Mayor altura' },
      ],
    },
    notaDatos: 'Datos de ejemplo. Las fichas las carga el CRM.',
    tarjeta: {
      disponibleTitulo: 'Disponible para alquilar',
      disponibleDetalle: 'por día, semana y mes',
      botonCotizar: { texto: 'Cotizar', url: urls.whatsapp },
    },

    // Filtros sin coincidencias (D-Catalogo / M-Catalogo)
    sinCoincidencias: {
      titular: { partes: [{ texto: 'Ningún equipo con esa combinación' }, { texto: '.', resaltado: 'verde' }] },
      texto: 'Quita algún filtro o cuéntanos qué necesitas. Si no lo tenemos, lo conseguimos.',
      quitarFiltros: 'Quitar filtros',
      whatsapp,
      imagen: imagenOperario,
    },

    // Búsqueda escrita sin resultados (M-SinResultados)
    sinResultadosBusqueda: {
      insignia: '0 resultados',
      titular: { partes: [{ texto: 'No encontramos «{busqueda}»' }, { texto: '.', resaltado: 'verde' }] },
      texto: 'Nuestro equipo más alto llega a 43 m. Prueba con otra búsqueda o pregúntanos: si no lo tenemos, te ayudamos a conseguirlo.',
      borrarBusqueda: 'Borrar búsqueda',
      sugerenciasTitulo: 'Quizás buscabas',
      sugerencias: [
        { texto: 'Brazo telescópico 43 m', url: urlConBusqueda(urls.catalogo, 'Brazo telescópico 43 m') },
        { texto: 'Brazo articulado 26 m', url: urlConBusqueda(urls.catalogo, 'Brazo articulado 26 m') },
        { texto: 'Tijera 16 m', url: urlConBusqueda(urls.catalogo, 'Tijera 16 m') },
      ],
      asistente: { texto: 'Usar el asistente', url: `${urls.inicio}#asistente` },
      whatsapp,
      masAlquiladoTitulo: 'Lo más alquilado',
      masAlquilado: ['te8', 'ba20', 'bt43'],
      imagen: { src: imagenOperario.src, alt: 'Operario PyH+ buscando' },
    },

    // Recuadro al final de la lista
    ayudaAsistente: {
      titulo: '¿No sabes cuál elegir?',
      texto: 'Responde 3 preguntas y te recomendamos el equipo.',
      boton: { texto: 'Abrir asistente', url: `${urls.inicio}#asistente` },
    },
  },

  // Lista de máquinas (en maquinas.ts, en esta misma carpeta)
  maquinas,
};
