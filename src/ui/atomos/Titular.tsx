// TITULAR con partes resaltadas en color (p. ej. "Elige tu " + "altura" en verde + ".").
// Sirve en .astro (sale como HTML sin JavaScript) y dentro de islas de React.
// Uso: <Titular titular={inicio.catalogoDestacado.titular} etiqueta="h2" className="h2" />
// colorResaltado: color de las partes con `resaltado: true`.
//   "verde" (#609839, sobre fondo claro), "lima" (#89E462, sobre oscuro) o "azul" (#3F809C).
// Una parte puede pedir su propio color con `resaltado: 'azul'`, etc.
// Un "\n" dentro del texto se muestra como cambio de línea.
import { Fragment } from 'react';
import type { Titular as TipoTitular, ColorResaltado } from '@dominio/comunes';

interface Props {
  titular: TipoTitular;
  etiqueta?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  colorResaltado?: ColorResaltado;
  className?: string;
  id?: string;
  tabIndex?: number;
}

const colores: Record<ColorResaltado, string> = {
  verde: 'var(--verde-texto)',
  lima: 'var(--verde-lima)',
  azul: 'var(--azul-medio)',
};

// Parte el texto en líneas para poner <br> donde hay "\n"
function ConSaltos({ texto }: { texto: string }) {
  return (
    <>
      {texto.split('\n').map((linea, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linea}
        </Fragment>
      ))}
    </>
  );
}

export default function Titular({ titular, etiqueta: Etiqueta = 'h2', colorResaltado = 'verde', className, id, tabIndex }: Props) {
  return (
    <Etiqueta className={className} id={id} tabIndex={tabIndex}>
      {titular.partes.map((parte, i) => {
        if (!parte.resaltado) return <ConSaltos key={i} texto={parte.texto} />;
        const color = parte.resaltado === true ? colorResaltado : parte.resaltado;
        return (
          <span key={i} style={{ color: colores[color] }}>
            <ConSaltos texto={parte.texto} />
          </span>
        );
      })}
    </Etiqueta>
  );
}
