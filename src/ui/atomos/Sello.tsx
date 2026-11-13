// ÁTOMO — SELLO: píldora con borde ("Miembro IPAF", "Res. 4272 de 2021").
// Los demás atributos pasan al elemento (así le llegan los estilos con alcance de los .astro).
// Estilos: .sello en src/ui/estilos/global.css.
import type { HTMLAttributes } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  texto: string;
}

export default function Sello({ texto, className, ...resto }: Props) {
  return (
    <span className={['sello', className].filter(Boolean).join(' ')} {...resto}>
      {texto}
    </span>
  );
}
