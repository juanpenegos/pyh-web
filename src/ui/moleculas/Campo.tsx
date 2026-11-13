// CAMPO DE FORMULARIO (molécula): etiqueta + control + ayuda + error.
// Conecta todo para los lectores de pantalla (aria-describedby, aria-invalid).
// El control se pasa como función, para que reciba esos atributos:
//   <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
//     {(a11y) => <Entrada {...a11y} name="nombre" />}
//   </Campo>
import type { ReactNode } from 'react';
import '@ui/estilos/formulario.css';

export interface AtributosCampo {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
}

interface Props {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
  className?: string;
  children: (atributos: AtributosCampo) => ReactNode;
}

export default function Campo({ id, etiqueta, error, ayuda, className = '', children }: Props) {
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const descritoPor = [idAyuda, idError].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`campo ${error ? 'campo--error' : ''} ${className}`.trim()}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': descritoPor })}
      {ayuda && (
        <span id={idAyuda} className="campo__ayuda">
          {ayuda}
        </span>
      )}
      {error && (
        <span id={idError} className="campo__error">
          {error}
        </span>
      )}
    </div>
  );
}
