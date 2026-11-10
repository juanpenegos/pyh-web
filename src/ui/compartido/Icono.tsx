// ÍCONOS del diseño (todos decorativos: el texto de al lado o el aria-label del botón dice qué son).
// Se usan igual desde archivos .astro y desde islas de React:  <Icono nombre="buscar" tamano={20} />

type Nombre =
  | 'mas'
  | 'buscar'
  | 'menu'
  | 'cerrar'
  | 'whatsapp'
  | 'telefono'
  | 'candado'
  | 'abajo'
  | 'altura'
  | 'energia'
  | 'capacidad';

interface Props {
  nombre: Nombre;
  tamano?: number;
  color?: string;   // Por defecto usa el color del texto (currentColor)
  grosor?: number;  // Grosor de línea, solo íconos de trazo
  className?: string;
}

// Íconos rellenos (fill) — el resto son de trazo (stroke)
const rellenos: Partial<Record<Nombre, string>> = {
  mas: 'M9.5 2h5v7.5H22v5h-7.5V22h-5v-7.5H2v-5h7.5z',
  whatsapp:
    'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.3Z',
};

function Trazo({ nombre }: { nombre: Nombre }) {
  switch (nombre) {
    case 'buscar':
      return (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
    case 'menu':
      return <path d="M4 7h16M4 12h16M4 17h10" />;
    case 'cerrar':
      return <path d="M6 6l12 12M18 6 6 18" />;
    case 'telefono':
      return <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />;
    case 'candado':
      return (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
    case 'abajo':
      return <path d="m6 9 6 6 6-6" />;
    case 'altura':
      return <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />;
    case 'energia':
      return <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;
    case 'capacidad':
      return (<><path d="M6 8h12l2 13H4L6 8Z" /><circle cx="12" cy="5" r="2" /></>);
    default:
      return null;
  }
}

export default function Icono({ nombre, tamano = 20, color = 'currentColor', grosor = 2, className }: Props) {
  const relleno = rellenos[nombre];
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...(relleno
        ? { fill: color }
        : { fill: 'none', stroke: color, strokeWidth: grosor, strokeLinecap: 'round', strokeLinejoin: 'round' })}
    >
      {relleno ? <path d={relleno} /> : <Trazo nombre={nombre} />}
    </svg>
  );
}
