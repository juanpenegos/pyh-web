// PÍLDORAS DE UN GRUPO DE FILTROS (versión móvil de las casillas).
// `conCantidad`: muestra "(n)" al lado de cada opción (hoja de filtros).

import type { VistaGrupo } from '@aplicacion/catalogo/ConsultaCatalogo';
import Chip from '@ui/atomos/Chip';

interface Props {
  grupo: VistaGrupo;
  conCantidad: boolean;
  onAlternar: (grupo: string, opcion: string) => void;
}

export default function ChipsGrupo({ grupo, conCantidad, onAlternar }: Props) {
  return (
    <>
      {grupo.opciones.map((opcion) => {
        return (
          <Chip
            key={opcion.etiqueta}
            activo={opcion.marcada}
            estado={!opcion.marcada && opcion.cantidad === 0 ? 'vacio' : undefined}
            aria-pressed={opcion.marcada}
            onClick={() => onAlternar(grupo.id, opcion.etiqueta)}
          >
            {opcion.etiqueta}
            {conCantidad && <span className="chip__cantidad">({opcion.cantidad})</span>}
          </Chip>
        );
      })}
    </>
  );
}
