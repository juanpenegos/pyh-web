// BARRA DE PROGRESO (átomo): segmentos que se pintan de lima según el paso actual.
// Pasos del asistente de pago: 3 segmentos (D-PSE).
import '@ui/estilos/formulario.css';

interface Props {
  pasos: number;
  actual: number;      // 1, 2 o 3
  etiqueta: string;    // "Paso 2 de 3"
}

export default function BarraProgreso({ pasos, actual, etiqueta }: Props) {
  return (
    <div
      className="barra-progreso"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={pasos}
      aria-valuenow={actual}
      aria-valuetext={etiqueta}
      aria-label={etiqueta}
    >
      {Array.from({ length: pasos }, (_, i) => (
        <span key={i} className={`barra-progreso__tramo ${i < actual ? 'barra-progreso__tramo--hecho' : ''}`} />
      ))}
    </div>
  );
}
