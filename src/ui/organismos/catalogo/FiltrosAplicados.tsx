// FILTROS APLICADOS: una píldora por filtro marcado (se quita al tocarla) y "Limpiar filtros".
// Se usa en el panel de escritorio y en la lista móvil.

import type { FiltroAplicado } from '@aplicacion/catalogo/ConsultaCatalogo';
import { rellenar } from '@aplicacion/catalogo/textos';
import Icono from '@ui/atomos/Icono';
import Chip from '@ui/atomos/Chip';

interface Props {
  aplicados: FiltroAplicado[];
  textoQuitar: string;   // "Quitar filtro {opcion}"
  textoLimpiar: string;
  onQuitar: (grupo: string, opcion: string) => void;
  onLimpiar: () => void;
  tamanoIcono: number;
  className: string;
}

export default function FiltrosAplicados({ aplicados, textoQuitar, textoLimpiar, onQuitar, onLimpiar, tamanoIcono, className }: Props) {
  if (aplicados.length === 0) return null;

  return (
    <div className={`filtros-aplicados ${className}`}>
      <div className="filtros-aplicados__lista">
        {aplicados.map(({ grupo, opcion }) => (
          <Chip
            key={`${grupo}-${opcion}`}
            estado="aplicado"
            aria-label={rellenar(textoQuitar, { opcion })}
            onClick={() => onQuitar(grupo, opcion)}
          >
            {opcion}
            <Icono nombre="cerrar" tamano={tamanoIcono} grosor={2.5} color="#00475D" />
          </Chip>
        ))}
      </div>
      <button type="button" className="filtros-aplicados__limpiar" onClick={onLimpiar}>
        {textoLimpiar}
      </button>
    </div>
  );
}
