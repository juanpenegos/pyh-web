// DOMINIO — forma del contenido del Catálogo (D-Catalogo, M-Catalogo, M-Filtros, M-SinResultados).
// En los textos, {n} y {busqueda} se reemplazan por el número de resultados y lo buscado.

import type { Enlace, Imagen, Titular, Seo } from '../comunes';
import type { Maquina } from '../maquina';
import type { GrupoFiltro, IdOrden } from '../filtros';

/** Textos fijos de cada tarjeta de máquina. */
export interface TextosTarjetaMaquina {
  disponibleTitulo: string;
  disponibleDetalle: string;
  botonCotizar: Enlace;
}

/** Texto en singular y plural, p. ej. "1 resultado" / "{n} resultados". */
export interface TextoCantidad {
  uno: string;
  varios: string;
}

/** Textos de la parte interactiva del catálogo (filtros, orden, resultados). */
export interface TextosCatalogo {
  filtros: {
    etiquetaPanel: string;     // Nombre del panel para lectores de pantalla ("Filtros")
    titulo: string;            // "Plataformas elevadoras"
    limpiar: string;           // "Limpiar filtros"
    quitar: string;            // "Quitar filtro {opcion}" (lector de pantalla)
    botonMovil: string;        // "Filtros"
  };
  hoja: {
    titulo: string;            // "Filtros"
    cerrar: string;
    limpiar: string;
    ver: TextoCantidad;        // "Ver {n} resultados"
  };
  resultados: TextoCantidad;   // "{n} resultados"
  ordenar: {
    etiqueta: string;
    opciones: { id: IdOrden; etiqueta: string }[];
  };
  notaDatos: string;
  tarjeta: TextosTarjetaMaquina;
  sinCoincidencias: {
    titular: Titular;
    texto: string;
    quitarFiltros: string;
    whatsapp: Enlace;
    imagen: Imagen;
  };
  sinResultadosBusqueda: {
    insignia: string;          // "0 resultados"
    titular: Titular;          // "No encontramos «{busqueda}»."
    texto: string;
    borrarBusqueda: string;    // Botón que limpia la búsqueda (lector de pantalla)
    sugerenciasTitulo: string; // "Quizás buscabas"
    sugerencias: Enlace[];
    asistente: Enlace;
    whatsapp: Enlace;
    masAlquiladoTitulo: string;
    masAlquilado: string[];    // ids de las máquinas que se muestran
    imagen: Imagen;
  };
  ayudaAsistente: {
    titulo: string;
    texto: string;
    boton: Enlace;
  };
}

export interface ContenidoCatalogo {
  seo: Seo;

  migas: Enlace[];   // Inicio / Catálogo (la última es la página actual)
  etiquetaMigas: string;

  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
  };

  buscador: {
    etiqueta: string;
    placeholder: string;
    boton: string;
  };

  /** Grupos de filtros. El `id` es también el parámetro de la dirección. */
  grupos: GrupoFiltro[];

  textos: TextosCatalogo;

  maquinas: Maquina[];
}
