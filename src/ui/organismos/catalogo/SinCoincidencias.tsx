// SIN COINCIDENCIAS: los filtros elegidos no dejan ningún equipo (D-Catalogo / M-Catalogo).

import type { TextosCatalogo } from '@dominio/paginas/catalogo';
import Titular from '@ui/atomos/Titular';
import Boton from '@ui/atomos/Boton';

interface Props {
  textos: TextosCatalogo['sinCoincidencias'];
  onQuitarFiltros: () => void;
}

export default function SinCoincidencias({ textos, onQuitarFiltros }: Props) {
  return (
    <div className="sin-coincidencias">
      <img className="sin-coincidencias__foto" src={textos.imagen.src} alt={textos.imagen.alt} loading="lazy" />
      <div className="sin-coincidencias__texto">
        <Titular titular={textos.titular} className="h2 sin-coincidencias__titulo" />
        <p>{textos.texto}</p>
        <div className="sin-coincidencias__acciones">
          <Boton variante="azul" onClick={onQuitarFiltros}>
            {textos.quitarFiltros}
          </Boton>
          <Boton href={textos.whatsapp.url} variante="linea">
            {textos.whatsapp.texto}
          </Boton>
        </div>
      </div>
    </div>
  );
}
