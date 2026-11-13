// ÁTOMO — EYEBROW: texto corto en mayúsculas que va encima de un titular ("ALQUILER DE MANLIFT…").
// El color y el tamaño de cada sección se ajustan con `className`.
// Los demás atributos pasan al elemento (así le llegan los estilos con alcance de los .astro).
// Estilos: .eyebrow en src/ui/estilos/global.css.
import type { HTMLAttributes } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  texto: string;
  etiqueta?: 'span' | 'p' | 'h2';
}

export default function Eyebrow({ texto, etiqueta: Etiqueta = 'span', className, ...resto }: Props) {
  return (
    <Etiqueta className={['eyebrow', className].filter(Boolean).join(' ')} {...resto}>
      {texto}
    </Etiqueta>
  );
}
