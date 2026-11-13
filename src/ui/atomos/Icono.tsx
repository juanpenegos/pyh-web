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
  | 'capacidad'
  | 'flecha'          // →
  | 'atras'           // ←
  | 'diagonal'        // ↗
  | 'derecha'         // >
  | 'izquierda'       // <
  | 'documento'       // Documento con visto bueno
  | 'escudo'          // Escudo con visto bueno
  | 'archivo'         // Hoja con renglones (descargar PDF)
  | 'persona'
  | 'camion'
  | 'play'
  | 'flecha-subir'    // Flecha gruesa en diagonal (beneficios)
  | 'flecha-doble'    // Dos flechas gruesas
  | 'destello'        // "+" de 8 puntas
  | 'visto'           // ✓
  | 'correo'          // Sobre
  | 'ubicacion'       // Pin del mapa
  | 'reloj'
  | 'banco'           // Edificio con columnas
  | 'filtros';        // Tres líneas de distinto largo

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
  play: 'M8 5v14l11-7L8 5Z',
  'flecha-subir':
    'M5 2.5h15.5c.8 0 1.5.7 1.5 1.5v15.5c0 .8-.7 1.5-1.5 1.5h-1.6c-.8 0-1.5-.7-1.5-1.5V9.7L6.9 20.2c-.6.6-1.5.6-2.1 0l-1-1c-.6-.6-.6-1.5 0-2.1L14.3 6.6H5c-.8 0-1.5-.7-1.5-1.5V4c0-.8.7-1.5 1.5-1.5Z',
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
    case 'flecha':
      return <path d="M5 12h14M13 6l6 6-6 6" />;
    case 'atras':
      return <path d="M19 12H5M11 6l-6 6 6 6" />;
    case 'diagonal':
      return <path d="M7 17 17 7M8 7h9v9" />;
    case 'derecha':
      return <path d="m9 6 6 6-6 6" />;
    case 'izquierda':
      return <path d="m15 6-6 6 6 6" />;
    case 'documento':
      return (<><path d="M6 3h9l4 4v14H6z" /><path d="m9 14 2 2 4-4" /></>);
    case 'escudo':
      return (<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>);
    case 'persona':
      return (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>);
    case 'camion':
      return (<><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
    case 'visto':
      return <path d="m5 12 5 5 9-10" />;
    case 'filtros':
      return <path d="M4 6h16M7 12h10M10 18h4" />;
    case 'archivo':
      return (<><path d="M14 3H6v18h12V7l-4-4Z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></>);
    case 'correo':
      return (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
    case 'ubicacion':
      return (<><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>);
    case 'reloj':
      return (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
    case 'banco':
      return <path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />;
    case 'capacidad':
      return (<><path d="M6 8h12l2 13H4L6 8Z" /><circle cx="12" cy="5" r="2" /></>);
    default:
      return null;
  }
}

// Íconos rellenos hechos de varias piezas
function RellenoCompuesto({ nombre }: { nombre: Nombre }) {
  if (nombre === 'destello') {
    return (
      <>
        <rect x="10.6" y="1" width="2.8" height="22" rx=".6" />
        <rect x="1" y="10.6" width="22" height="2.8" rx=".6" />
        <rect x="10.6" y="1" width="2.8" height="22" rx=".6" transform="rotate(45 12 12)" />
        <rect x="10.6" y="1" width="2.8" height="22" rx=".6" transform="rotate(-45 12 12)" />
      </>
    );
  }
  return null;
}

export default function Icono({ nombre, tamano = 20, color = 'currentColor', grosor = 2, className }: Props) {
  // La flecha doble son dos flechas gruesas, una encima de la otra (como en el diseño)
  if (nombre === 'flecha-doble') {
    return (
      <span className={className} style={{ display: 'flex' }} aria-hidden="true">
        <Icono nombre="flecha-subir" tamano={tamano} color={color} />
        <span style={{ display: 'flex', marginLeft: -tamano * 0.35 }}>
          <Icono nombre="flecha-subir" tamano={tamano} color={color} />
        </span>
      </span>
    );
  }
  const relleno = rellenos[nombre];
  const compuesto = nombre === 'destello';
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...(relleno || compuesto
        ? { fill: color }
        : { fill: 'none', stroke: color, strokeWidth: grosor, strokeLinecap: 'round', strokeLinejoin: 'round' })}
    >
      {compuesto ? <RellenoCompuesto nombre={nombre} /> : relleno ? <path d={relleno} /> : <Trazo nombre={nombre} />}
    </svg>
  );
}
