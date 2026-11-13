// PANEL DE FILTROS DE ESCRITORIO (columna izquierda de D-Catalogo).
// Muestra cada grupo con casillas y, al lado, cuántos resultados daría cada opción.

import type { ReactNode } from 'react';
import type { VistaGrupo } from '@aplicacion/catalogo/ConsultaCatalogo';
import Icono from '@ui/atomos/Icono';
import './PanelFiltros.css';

interface Props {
  etiqueta: string;
  titulo: string;
  cantidad: string;          // "14 resultados"
  grupos: VistaGrupo[];
  aplicados: ReactNode;      // Píldoras de filtros aplicados (las arma quien usa el panel)
  onAlternar: (grupo: string, opcion: string) => void;
}

export default function PanelFiltros({ etiqueta, titulo, cantidad, grupos, aplicados, onAlternar }: Props) {
  return (
    <aside className="panel-filtros" aria-label={etiqueta}>
      <div className="panel-filtros__titulo">{titulo}</div>
      <div className="panel-filtros__cantidad">{cantidad}</div>
      {aplicados}

      {grupos.map((grupo) => (
        <div key={grupo.id} className="panel-filtros__grupo" role="group" aria-labelledby={`grupo-${grupo.id}`}>
          <div className="panel-filtros__grupo-titulo" id={`grupo-${grupo.id}`}>
            {grupo.etiqueta}
          </div>
          {grupo.opciones.map((opcion) => {
            const clases = ['panel-filtros__opcion'];
            if (opcion.marcada) clases.push('panel-filtros__opcion--marcada');
            else if (opcion.cantidad === 0) clases.push('panel-filtros__opcion--vacia');
            return (
              <button
                key={opcion.etiqueta}
                type="button"
                className={clases.join(' ')}
                aria-pressed={opcion.marcada}
                onClick={() => onAlternar(grupo.id, opcion.etiqueta)}
              >
                <span className="panel-filtros__opcion-nombre">
                  <span className="panel-filtros__casilla" aria-hidden="true">
                    {opcion.marcada && <Icono nombre="visto" tamano={12} grosor={3.5} color="#FFFFFF" />}
                  </span>
                  <span className="panel-filtros__opcion-etiqueta">{opcion.etiqueta}</span>
                </span>
                <span className="panel-filtros__opcion-cantidad">({opcion.cantidad})</span>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
