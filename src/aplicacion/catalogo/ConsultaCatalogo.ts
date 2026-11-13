// CASO DE USO PRINCIPAL del catálogo: dado lo que la persona eligió, qué máquinas se muestran,
// cuántas hay por opción y qué filtros están puestos.
// Depende del contrato CriterioFiltro, no de filtros concretos (principio D de SOLID).

import type { Maquina } from '@dominio/maquina';
import type { CriterioFiltro } from './CriterioFiltro';
import type { EstadoCatalogo } from './EstadoCatalogo';
import { coincideBusqueda } from './busqueda';
import { ordenar } from './ordenes';

export interface FiltroAplicado {
  grupo: string;
  opcion: string;
}

/** Un grupo de filtros listo para mostrar. */
export interface VistaGrupo {
  id: string;
  etiqueta: string;
  opciones: VistaOpcion[];
}

export interface VistaOpcion {
  etiqueta: string;
  marcada: boolean;
  cantidad: number; // Resultados que habría al marcarla
}

export class ConsultaCatalogo {
  constructor(
    private readonly maquinas: Maquina[],
    readonly criterios: CriterioFiltro[],
  ) {}

  /** Máquinas que cumplen búsqueda y filtros, ya ordenadas. */
  resultados(estado: EstadoCatalogo): Maquina[] {
    return ordenar(this.filtrar(estado), estado.orden);
  }

  /** ¿La búsqueda escrita, por sí sola (sin filtros), encuentra algo? */
  hayCoincidenciasDeBusqueda(estado: EstadoCatalogo): boolean {
    return this.maquinas.some((m) => coincideBusqueda(m, estado.busqueda));
  }

  /**
   * Cuántas máquinas habría al marcar una opción. Se cuentan con los demás grupos
   * aplicados, pero no el propio (como en las tiendas en línea).
   */
  cantidad(estado: EstadoCatalogo, grupo: string, opcion: string): number {
    const criterio = this.criterios.find((c) => c.id === grupo);
    if (!criterio) return 0;
    return this.filtrar(estado, grupo).filter((m) => criterio.cumple(m, opcion)).length;
  }

  /** Todos los grupos con sus opciones, si están marcadas y cuántos resultados darían. */
  grupos(estado: EstadoCatalogo): VistaGrupo[] {
    return this.criterios.map((criterio) => ({
      id: criterio.id,
      etiqueta: criterio.etiqueta,
      opciones: criterio.opciones.map((opcion) => ({
        etiqueta: opcion,
        marcada: (estado.seleccion[criterio.id] ?? []).includes(opcion),
        cantidad: this.cantidad(estado, criterio.id, opcion),
      })),
    }));
  }

  /** Lista de filtros marcados, en el orden de los grupos. */
  aplicados(estado: EstadoCatalogo): FiltroAplicado[] {
    return this.criterios.flatMap((c) => (estado.seleccion[c.id] ?? []).map((opcion) => ({ grupo: c.id, opcion })));
  }

  /** Busca máquinas por id (para listas fijas como "Lo más alquilado"). */
  porIds(ids: string[]): Maquina[] {
    return ids.map((id) => this.maquinas.find((m) => m.id === id)).filter((m): m is Maquina => Boolean(m));
  }

  // Dentro de un grupo basta una opción (O); entre grupos deben cumplirse todos (Y).
  private filtrar(estado: EstadoCatalogo, grupoOmitido?: string): Maquina[] {
    return this.maquinas.filter(
      (maquina) =>
        coincideBusqueda(maquina, estado.busqueda) &&
        this.criterios.every((criterio) => {
          const marcadas = estado.seleccion[criterio.id] ?? [];
          return criterio.id === grupoOmitido || marcadas.length === 0 || marcadas.some((o) => criterio.cumple(maquina, o));
        }),
    );
  }
}
