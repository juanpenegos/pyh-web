// ÁTOMO — CHIP (píldora de filtro, orden u opción).
// Con `href` es un enlace; con `como="label"` envuelve un radio (ver GrupoChips); si no, es un <button>.
// Estados: activo (azul), vacio (sin resultados), aplicado (filtro que se quita al tocarlo).
// Estilos: clases .chip de src/ui/estilos/global.css.
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

interface Base {
  activo?: boolean;
  estado?: 'vacio' | 'aplicado';
  className?: string;
  children: ReactNode;
}

type ComoEnlace = Base & { como?: 'a'; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;
type ComoEtiqueta = Base & { como: 'label'; href?: undefined } & Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className' | 'children'>;
type ComoBoton = Base & { como?: 'button'; href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type PropsChip = ComoEnlace | ComoEtiqueta | ComoBoton;

export default function Chip(props: PropsChip) {
  const { activo, estado, className, children, como, ...resto } = props;
  const clase = ['chip', activo && 'chip--activo', estado && `chip--${estado}`, className].filter(Boolean).join(' ');

  if (props.href !== undefined) {
    return (
      <a className={clase} {...(resto as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  if (como === 'label') {
    return (
      <label className={clase} {...(resto as LabelHTMLAttributes<HTMLLabelElement>)}>
        {children}
      </label>
    );
  }
  const { type = 'button', ...boton } = resto as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={clase} {...boton}>
      {children}
    </button>
  );
}
