// ÁTOMO — BOTÓN (Sistema: lima = acción principal, azul, línea, línea blanca sobre fondo oscuro).
// Con `href` es un enlace con forma de botón; sin `href`, un <button> de verdad.
// Sirve en .astro (sale como HTML, sin JavaScript) y dentro de islas de React.
//   <Boton href={enlace.url} variante="lima">{enlace.texto}</Boton>
//   <Boton type="submit" variante="azul" ocupado={buscando}>Buscar</Boton>
// Estilos: clases .btn de src/ui/estilos/global.css.
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { atributosEnlace } from '@ui/utilidades/enlaces';

export type VarianteBoton = 'lima' | 'azul' | 'linea' | 'linea-blanca';

interface Base {
  variante?: VarianteBoton;   // Sin variante: solo la forma (la pinta el componente que lo usa)
  className?: string;
  children: ReactNode;
}

type ComoEnlace = Base & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;
type ComoBoton = Base & {
  href?: undefined;
  /** Mientras espera una respuesta: no se puede volver a pulsar, pero conserva el foco del teclado. */
  ocupado?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type PropsBoton = ComoEnlace | ComoBoton;

const clases = (variante?: VarianteBoton, extra?: string) =>
  ['btn', variante && `btn--${variante}`, extra].filter(Boolean).join(' ');

export default function Boton(props: PropsBoton) {
  if (props.href !== undefined) {
    const { variante, className, children, href, ...resto } = props;
    return (
      <a href={href} className={clases(variante, className)} {...atributosEnlace(href)} {...resto}>
        {children}
      </a>
    );
  }
  const { variante, className, children, ocupado, type = 'button', onClick, ...resto } = props;
  return (
    <button
      type={type}
      className={clases(variante, className)}
      aria-disabled={ocupado || undefined}
      aria-busy={ocupado || undefined}
      onClick={(evento) => {
        if (ocupado) evento.preventDefault();
        else onClick?.(evento);
      }}
      {...resto}
    >
      {children}
    </button>
  );
}
