// ÁTOMO — CASILLA (checkbox) con su texto al lado. Toda la línea se puede tocar.
// Estilos: .casilla en src/ui/estilos/formulario.css.
import type { InputHTMLAttributes, ReactNode } from 'react';
import '@ui/estilos/formulario.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  conError?: boolean;
  children: ReactNode;
}

export default function Casilla({ conError, children, ...resto }: Props) {
  return (
    <label className={`casilla ${conError ? 'casilla--error' : ''}`.trim()}>
      <input type="checkbox" aria-invalid={conError || undefined} {...resto} />
      <span>{children}</span>
    </label>
  );
}
