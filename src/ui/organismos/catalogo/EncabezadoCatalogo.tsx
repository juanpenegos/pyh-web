// ENCABEZADO DEL CATÁLOGO: migas, titular, texto y buscador (D-Catalogo / M-Catalogo).
// `compacto`: cuando la búsqueda no encontró nada, en móvil solo queda el buscador (M-SinResultados).

import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import Titular from '@ui/atomos/Titular';
import Migas from '@ui/moleculas/Migas';
import BuscadorCatalogo from './BuscadorCatalogo';
import './EncabezadoCatalogo.css';
import Eyebrow from '@ui/atomos/Eyebrow';

interface Props {
  migas: ContenidoCatalogo['migas'];
  etiquetaMigas: string;
  encabezado: ContenidoCatalogo['encabezado'];
  buscador: ContenidoCatalogo['buscador'];
  textoBorrar: string;
  busqueda: string;
  compacto: boolean;
  onBuscar: (texto: string) => void;
}

export default function EncabezadoCatalogo({ migas, etiquetaMigas, encabezado, buscador, textoBorrar, busqueda, compacto, onBuscar }: Props) {
  return (
    <section className={compacto ? 'encabezado-catalogo encabezado-catalogo--compacto' : 'encabezado-catalogo'}>
      <div className="contenedor encabezado-catalogo__contenido">
        <Migas migas={migas} etiqueta={etiquetaMigas} fondo="oscuro" className="encabezado-catalogo__migas" />

        <div className="encabezado-catalogo__titulo">
          <Eyebrow texto={encabezado.eyebrow} className="encabezado-catalogo__eyebrow" />
          <Titular titular={encabezado.titular} etiqueta="h1" colorResaltado="lima" />
        </div>

        <p className="encabezado-catalogo__texto">{encabezado.texto}</p>

        <BuscadorCatalogo buscador={buscador} textoBorrar={textoBorrar} busqueda={busqueda} conBorrar={compacto} onBuscar={onBuscar} />
      </div>
    </section>
  );
}
