// LO QUE LA PERSONA ELIGIÓ en el catálogo: filtros marcados, texto buscado y orden.
// Las funciones devuelven un estado nuevo en lugar de modificar el anterior.

import type { IdOrden } from '@dominio/filtros';
import { ORDEN_POR_DEFECTO } from './ordenes';

/** Opciones marcadas por grupo: { familia: ['Tijera eléctrica'], altura: ['Hasta 8 m'] }. */
export type Seleccion = Record<string, string[]>;

export interface EstadoCatalogo {
  seleccion: Seleccion;
  busqueda: string;
  orden: IdOrden;
}

export const ESTADO_INICIAL: EstadoCatalogo = { seleccion: {}, busqueda: '', orden: ORDEN_POR_DEFECTO };

/** Marca o desmarca una opción. */
export function alternarOpcion(estado: EstadoCatalogo, grupo: string, opcion: string): EstadoCatalogo {
  const actuales = estado.seleccion[grupo] ?? [];
  const nuevas = actuales.includes(opcion) ? actuales.filter((o) => o !== opcion) : [...actuales, opcion];
  return { ...estado, seleccion: { ...estado.seleccion, [grupo]: nuevas } };
}

/** Quita todos los filtros (conserva la búsqueda y el orden). */
export function limpiarFiltros(estado: EstadoCatalogo): EstadoCatalogo {
  return { ...estado, seleccion: {} };
}

export function cambiarOrden(estado: EstadoCatalogo, orden: IdOrden): EstadoCatalogo {
  return { ...estado, orden };
}

export function cambiarBusqueda(estado: EstadoCatalogo, busqueda: string): EstadoCatalogo {
  return { ...estado, busqueda };
}

export function estaMarcada(estado: EstadoCatalogo, grupo: string, opcion: string): boolean {
  return (estado.seleccion[grupo] ?? []).includes(opcion);
}
