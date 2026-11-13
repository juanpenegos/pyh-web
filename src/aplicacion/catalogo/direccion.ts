// ESTADO ↔ DIRECCIÓN: guarda lo elegido en la dirección de la página para poder compartirla
// (/catalogo?familia=tijera-electrica&q=jlg&orden=mayor-altura) y lo vuelve a leer al abrirla.
// Las opciones se escriben como "slug": sin tildes, minúsculas y con guiones.

import type { CriterioFiltro } from './CriterioFiltro';
import type { EstadoCatalogo, Seleccion } from './EstadoCatalogo';
import { esOrdenValido, ORDEN_POR_DEFECTO } from './ordenes';
import { normalizar } from './busqueda';

export const PARAM_BUSQUEDA = 'q';
const PARAM_ORDEN = 'orden';

/** "Tijera eléctrica" → "tijera-electrica". */
export function slug(texto: string): string {
  return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Lee el estado desde los parámetros de la dirección (ignora valores desconocidos). */
export function leerEstado(parametros: URLSearchParams, criterios: CriterioFiltro[]): EstadoCatalogo {
  const seleccion: Seleccion = {};
  for (const criterio of criterios) {
    const pedidas = parametros.getAll(criterio.id).flatMap((v) => v.split(','));
    const opciones = criterio.opciones.filter((o) => pedidas.includes(slug(o)));
    if (opciones.length) seleccion[criterio.id] = opciones;
  }
  const orden = parametros.get(PARAM_ORDEN) ?? '';
  return {
    seleccion,
    busqueda: parametros.get(PARAM_BUSQUEDA) ?? '',
    orden: esOrdenValido(orden) ? orden : ORDEN_POR_DEFECTO,
  };
}

/** Escribe el estado como texto de parámetros ("familia=tijera-electrica&q=jlg"). */
export function escribirEstado(estado: EstadoCatalogo, criterios: CriterioFiltro[]): string {
  const parametros = new URLSearchParams();
  if (estado.busqueda.trim()) parametros.set(PARAM_BUSQUEDA, estado.busqueda.trim());
  for (const criterio of criterios) {
    const marcadas = estado.seleccion[criterio.id] ?? [];
    if (marcadas.length) parametros.set(criterio.id, marcadas.map(slug).join(','));
  }
  if (estado.orden !== ORDEN_POR_DEFECTO) parametros.set(PARAM_ORDEN, estado.orden);
  return parametros.toString();
}

/** Dirección del catálogo con un filtro puesto (para enlaces desde otras páginas). */
export function urlConFiltro(baseCatalogo: string, grupo: string, opcion: string): string {
  return `${baseCatalogo}?${new URLSearchParams({ [grupo]: slug(opcion) }).toString()}`;
}

/** Dirección del catálogo con una búsqueda escrita. */
export function urlConBusqueda(baseCatalogo: string, busqueda: string): string {
  return `${baseCatalogo}?${new URLSearchParams({ [PARAM_BUSQUEDA]: busqueda }).toString()}`;
}
