// FORMAS DE ORDENAR. Cada orden es una regla de comparación; para uno nuevo se agrega aquí
// (y su texto en el contenido), sin tocar el resto.

import type { Maquina } from '@dominio/maquina';
import type { IdOrden } from '@dominio/filtros';

type Comparador = (a: Maquina, b: Maquina) => number;

const comparadores: Record<IdOrden, Comparador> = {
  relevancia: () => 0, // Deja el orden en que vienen los datos
  'menor-altura': (a, b) => a.alturaM - b.alturaM,
  'mayor-altura': (a, b) => b.alturaM - a.alturaM,
};

export const ORDEN_POR_DEFECTO: IdOrden = 'relevancia';

export function esOrdenValido(id: string): id is IdOrden {
  return Object.hasOwn(comparadores, id);
}

/** Devuelve una copia ordenada (no cambia la lista original). */
export function ordenar(maquinas: Maquina[], orden: IdOrden): Maquina[] {
  return [...maquinas].sort(comparadores[orden]);
}
