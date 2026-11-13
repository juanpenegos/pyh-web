// BARRA FIJA DE MÓVIL (M-Catalogo): botón "Filtros (n)" y accesos rápidos del primer grupo
// (tipo de equipo), en una fila que se desliza de lado.

import type { VistaGrupo } from '@aplicacion/catalogo/ConsultaCatalogo';
import Icono from '@ui/atomos/Icono';
import ChipsGrupo from './ChipsGrupo';
import Chip from '@ui/atomos/Chip';

interface Props {
  textoFiltros: string;
  nAplicados: number;
  grupoRapido?: VistaGrupo;
  onAbrirFiltros: () => void;
  onAlternar: (grupo: string, opcion: string) => void;
}

export default function BarraMovil({ textoFiltros, nAplicados, grupoRapido, onAbrirFiltros, onAlternar }: Props) {
  return (
    <div className="barra-movil">
      <div className="barra-movil__fila">
        <Chip activo aria-haspopup="dialog" onClick={onAbrirFiltros}>
          <Icono nombre="filtros" tamano={16} color="#89E462" />
          {textoFiltros}
          {nAplicados > 0 && ` (${nAplicados})`}
        </Chip>
        {grupoRapido && <ChipsGrupo grupo={grupoRapido} conCantidad={false} onAlternar={onAlternar} />}
      </div>
    </div>
  );
}
