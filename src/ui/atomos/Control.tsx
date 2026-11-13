// ÁTOMOS — CONTROLES DE FORMULARIO: Entrada (<input>), Seleccion (<select>) y AreaTexto (<textarea>).
// Todos tienen la misma forma del diseño (52 px de alto, radio 14, borde gris, foco azul).
// Reciben los mismos atributos que el elemento HTML; Campo (molécula) les agrega etiqueta y error.
// Estilos: .campo__control en src/ui/estilos/formulario.css.
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import '@ui/estilos/formulario.css';

const clase = (extra?: string) => ['campo__control', extra].filter(Boolean).join(' ');

export function Entrada({ className, type = 'text', ...resto }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type={type} className={clase(className)} {...resto} />;
}

interface PropsSeleccion<T extends string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  opciones: { valor: T; texto: string }[];
  vacia?: string;  // Primera opción sin valor ("—"), si hace falta
}

export function Seleccion<T extends string>({ className, opciones, vacia, ...resto }: PropsSeleccion<T>) {
  return (
    <select className={clase(className)} {...resto}>
      {vacia !== undefined && <option value="">{vacia}</option>}
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.texto}
        </option>
      ))}
    </select>
  );
}

export function AreaTexto({ className, ...resto }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clase(className)} {...resto} />;
}
