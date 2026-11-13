// CONTRATO de un filtro del catálogo.
// Cualquier filtro (por familia, por altura, por marca…) cumple esta forma, así el resto del
// código trabaja con "un criterio" sin saber cuál es (principios O y L de SOLID: se agregan
// filtros nuevos sin cambiar el código que los usa).

import type { Maquina } from '@dominio/maquina';

export interface CriterioFiltro {
  /** Identificador del grupo; también es el parámetro en la dirección (?familia=…). */
  readonly id: string;
  /** Nombre visible del grupo ("Tipo de equipo"). */
  readonly etiqueta: string;
  /** Nombres visibles de las opciones ("Tijera eléctrica", "Hasta 8 m"…). */
  readonly opciones: string[];
  /** ¿La máquina cumple esta opción? */
  cumple(maquina: Maquina, opcion: string): boolean;
}
