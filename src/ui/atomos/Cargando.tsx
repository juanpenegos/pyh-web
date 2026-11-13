// ÁTOMO — CARGANDO: circulito que gira mientras se espera una respuesta.
// Es decorativo (aria-hidden): el texto que lo acompaña ("Enviando…") es el que lo dice.
// Con prefers-reduced-motion gira mucho más lento (ver formulario.css).
import '@ui/estilos/formulario.css';

export default function Cargando() {
  return <span className="girando" aria-hidden="true" />;
}
