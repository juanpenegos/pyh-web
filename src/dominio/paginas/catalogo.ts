// DOMINIO — forma del contenido del Catálogo (D-Catalogo, M-Catalogo, M-Filtros, M-SinResultados).

import type { Enlace, Titular, Seo } from '../comunes';
import type { Maquina } from '../maquina';

/** Textos fijos de cada tarjeta de máquina. */
export interface TextosTarjetaMaquina {
  disponibleTitulo: string;
  disponibleDetalle: string;
  botonCotizar: Enlace;
}

export interface ContenidoCatalogo {
  seo: Seo;

  migas: Enlace[];   // Inicio / Catálogo

  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
  };

  buscador: {
    etiqueta: string;
    placeholder: string;
  };
  tituloResultados: string;
  limpiarFiltros: string;
  verResultados: {
    uno: string;     // "Ver 1 resultado"
    varios: string;  // "Ver {n} resultados"
  };

  // Grupos de filtros (el `id` lo usa el código, la `etiqueta` es lo que se lee)
  filtros: {
    id: string;
    etiqueta: string;
    opciones: string[];
  }[];

  ordenar: {
    etiqueta: string;
    opciones: { id: string; etiqueta: string }[];
  };

  tarjeta: TextosTarjetaMaquina;

  notaDatos: string;

  sinResultados: {
    titulo: string;
    texto: string;
    quitarFiltros: string;
    whatsapp: Enlace;
  };

  ayudaAsistente: {
    titulo: string;
    texto: string;
    boton: string;
  };

  maquinas: Maquina[];
}
