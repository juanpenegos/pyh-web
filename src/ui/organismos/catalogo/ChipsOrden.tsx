// PÍLDORAS DE ORDEN ("Más relevantes", "Menor altura", "Mayor altura").
// Se usan en la barra de escritorio y en la hoja de filtros móvil.

import type { IdOrden } from '@dominio/filtros';
import type { TextosCatalogo } from '@dominio/paginas/catalogo';
import Chip from '@ui/atomos/Chip';

interface Props {
  opciones: TextosCatalogo['ordenar']['opciones'];
  actual: IdOrden;
  onOrdenar: (orden: IdOrden) => void;
}

export default function ChipsOrden({ opciones, actual, onOrdenar }: Props) {
  return (
    <>
      {opciones.map((opcion) => (
        <Chip
          key={opcion.id}
          activo={opcion.id === actual}
          aria-pressed={opcion.id === actual}
          onClick={() => onOrdenar(opcion.id)}
        >
          {opcion.etiqueta}
        </Chip>
      ))}
    </>
  );
}
