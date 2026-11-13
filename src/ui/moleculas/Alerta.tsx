// AVISO (molécula): mensaje de error, éxito o información dentro de un formulario.
// Se anuncia solo a los lectores de pantalla cuando aparece (aria-live="polite").
// El contenedor existe siempre (aunque esté vacío) para que el anuncio funcione.
import type { ReactNode } from 'react';
import '@ui/estilos/formulario.css';

interface Props {
  tipo?: 'error' | 'exito' | 'info';
  children?: ReactNode;
}

export default function Alerta({ tipo = 'error', children }: Props) {
  return (
    <div aria-live="polite" className="alerta__zona">
      {children && <div className={`alerta alerta--${tipo}`}>{children}</div>}
    </div>
  );
}
