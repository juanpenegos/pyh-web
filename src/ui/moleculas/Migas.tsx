// MIGAS DE PAN ("Inicio / Catálogo"): la última es la página actual y no es enlace.
// Sirve en .astro (sale como HTML sin JavaScript) y dentro de islas de React.
// `fondo`: "oscuro" para encabezados azules (catálogo), "claro" para fondos claros (Nosotros).
import type { Enlace } from '@dominio/comunes';
import './Migas.css';

interface Props {
  migas: Enlace[];
  etiqueta: string;
  fondo?: 'claro' | 'oscuro';
  className?: string;
}

export default function Migas({ migas, etiqueta, fondo = 'claro', className = '' }: Props) {
  const anteriores = migas.slice(0, -1);
  const actual = migas[migas.length - 1];

  return (
    <nav className={`migas migas--${fondo} ${className}`.trim()} aria-label={etiqueta}>
      {anteriores.map((miga) => (
        <span key={miga.url} className="migas__miga">
          <a href={miga.url}>{miga.texto}</a>
          <span aria-hidden="true">/</span>
        </span>
      ))}
      {actual && <span aria-current="page">{actual.texto}</span>}
    </nav>
  );
}
