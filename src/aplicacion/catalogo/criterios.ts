// FILTROS CONCRETOS y la fábrica que los crea a partir de los grupos del contenido.
// Cada clase sabe aplicar UN tipo de grupo (responsabilidad única).
// Para un tipo nuevo: crear su clase y registrarla en `fabricas` (nada más cambia).

import type { Maquina } from '@dominio/maquina';
import type { CampoFiltrable, GrupoFiltro, OpcionRango } from '@dominio/filtros';
import type { CriterioFiltro } from './CriterioFiltro';

/** Compara un campo de texto (o lista de textos) de la máquina con la opción. */
export class CriterioPorCampo implements CriterioFiltro {
  constructor(
    readonly id: string,
    readonly etiqueta: string,
    private readonly campo: CampoFiltrable,
    readonly opciones: string[],
  ) {}

  cumple(maquina: Maquina, opcion: string): boolean {
    const valor = maquina[this.campo];
    return Array.isArray(valor) ? valor.includes(opcion) : valor === opcion;
  }
}

/** Revisa si la altura de trabajo cae dentro del rango de la opción. */
export class CriterioPorRango implements CriterioFiltro {
  readonly opciones: string[];

  constructor(
    readonly id: string,
    readonly etiqueta: string,
    private readonly rangos: OpcionRango[],
  ) {
    this.opciones = rangos.map((rango) => rango.etiqueta);
  }

  cumple(maquina: Maquina, opcion: string): boolean {
    const rango = this.rangos.find((r) => r.etiqueta === opcion);
    if (!rango) return false;
    const altura = maquina.alturaM;
    return (rango.masDe === undefined || altura > rango.masDe) && (rango.hasta === undefined || altura <= rango.hasta);
  }
}

/** Convierte un grupo del contenido en su criterio. Un tipo nuevo = un `case` nuevo. */
function crearCriterio(grupo: GrupoFiltro): CriterioFiltro {
  switch (grupo.tipo) {
    case 'campo':
      return new CriterioPorCampo(grupo.id, grupo.etiqueta, grupo.campo, grupo.opciones);
    case 'rango':
      return new CriterioPorRango(grupo.id, grupo.etiqueta, grupo.opciones);
  }
}

/** Convierte los grupos del contenido en criterios listos para usar. */
export function crearCriterios(grupos: GrupoFiltro[]): CriterioFiltro[] {
  return grupos.map(crearCriterio);
}
