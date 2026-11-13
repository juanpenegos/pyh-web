// RECUADRO "¿No sabes cuál elegir?" al final de la lista: lleva al asistente de Inicio.

import type { TextosCatalogo } from '@dominio/paginas/catalogo';
import Icono from '@ui/atomos/Icono';
import Boton from '@ui/atomos/Boton';

interface Props {
  textos: TextosCatalogo['ayudaAsistente'];
}

export default function AyudaAsistente({ textos }: Props) {
  return (
    <div className="ayuda-asistente">
      <div className="ayuda-asistente__texto">
        <Icono nombre="mas" tamano={44} color="#89E462" className="ayuda-asistente__mas" />
        <div>
          <div className="ayuda-asistente__titulo">{textos.titulo}</div>
          <div className="ayuda-asistente__detalle">{textos.texto}</div>
        </div>
      </div>
      <Boton href={textos.boton.url} variante="lima" className="ayuda-asistente__boton">
        {textos.boton.texto}
      </Boton>
    </div>
  );
}
