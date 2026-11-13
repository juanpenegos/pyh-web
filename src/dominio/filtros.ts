// DOMINIO — cómo se describe un grupo de filtros del catálogo.
// Son solo datos: el contenido dice qué grupos hay y sus opciones; la capa de aplicación
// sabe cómo aplicar cada TIPO de grupo. Para un filtro nuevo basta agregar un grupo al contenido.

import type { Maquina } from './maquina';

/** Campos de la máquina por los que se puede filtrar comparando texto. */
export type CampoFiltrable = keyof Pick<Maquina, 'familia' | 'energia' | 'terreno' | 'marca' | 'modalidad'>;

/** Una opción de un rango de altura, p. ej. "De 8 a 12 m" = más de 8 y hasta 12. */
export interface OpcionRango {
  etiqueta: string;
  masDe?: number;   // Altura mínima (sin incluirla)
  hasta?: number;   // Altura máxima (incluida)
}

/**
 * Un grupo de filtros. `id` también es el nombre del parámetro en la dirección
 * (p. ej. /catalogo?familia=tijera-electrica).
 * - tipo "campo": la máquina pasa si su campo coincide con la opción (o la contiene, si es una lista).
 * - tipo "rango": la máquina pasa si su altura está dentro del rango de la opción.
 */
export type GrupoFiltro =
  | { tipo: 'campo'; id: string; etiqueta: string; campo: CampoFiltrable; opciones: string[] }
  | { tipo: 'rango'; id: string; etiqueta: string; opciones: OpcionRango[] };

/** Formas de ordenar los resultados (cada una tiene su regla en la capa de aplicación). */
export type IdOrden = 'relevancia' | 'menor-altura' | 'mayor-altura';
