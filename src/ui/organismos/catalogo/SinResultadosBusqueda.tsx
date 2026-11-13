// SIN RESULTADOS DE BÚSQUEDA (M-SinResultados): lo escrito no coincide con ningún equipo.
// Muestra sugerencias, el asistente, WhatsApp y "Lo más alquilado".
// En escritorio es la misma pantalla acomodada al ancho (no hay diseño propio).

import type { Maquina } from '@dominio/maquina';
import type { TextosCatalogo } from '@dominio/paginas/catalogo';
import { rellenar } from '@aplicacion/catalogo/textos';
import { urlConBusqueda } from '@aplicacion/catalogo/direccion';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import Boton from '@ui/atomos/Boton';
import Chip from '@ui/atomos/Chip';

interface Props {
  textos: TextosCatalogo['sinResultadosBusqueda'];
  busqueda: string;
  masAlquilado: Maquina[];
}

export default function SinResultadosBusqueda({ textos, busqueda, masAlquilado }: Props) {
  // "No encontramos «{busqueda}»" → con lo que la persona escribió
  const titular = { partes: textos.titular.partes.map((p) => ({ ...p, texto: rellenar(p.texto, { busqueda }) })) };

  return (
    <>
      <section className="sin-busqueda">
        <div className="contenedor sin-busqueda__caja">
          <div className="sin-busqueda__figura">
            <span className="sin-busqueda__circulo" aria-hidden="true" />
            <img className="sin-busqueda__foto" src={textos.imagen.src} alt={textos.imagen.alt} />
            <span className="sin-busqueda__insignia">{textos.insignia}</span>
          </div>

          <div className="sin-busqueda__texto">
            <Titular titular={titular} className="sin-busqueda__titulo" />
            <p className="sin-busqueda__parrafo">{textos.texto}</p>

            <span className="sin-busqueda__sugerencias-titulo">{textos.sugerenciasTitulo}</span>
            <div className="sin-busqueda__sugerencias">
              {textos.sugerencias.map((s) => (
                <Chip key={s.url} href={s.url}>
                  <Icono nombre="buscar" tamano={16} color="#3F809C" />
                  {s.texto}
                </Chip>
              ))}
            </div>

            <div className="sin-busqueda__acciones">
              <Boton href={textos.asistente.url} variante="azul">
                {textos.asistente.texto}
              </Boton>
              <Boton href={textos.whatsapp.url} variante="linea">
                <Icono nombre="whatsapp" tamano={18} />
                {textos.whatsapp.texto}
              </Boton>
            </div>
          </div>
        </div>
      </section>

      {masAlquilado.length > 0 && (
        <section className="mas-alquilado">
          <div className="contenedor">
            <h2 className="mas-alquilado__titulo">{textos.masAlquiladoTitulo}</h2>
          </div>
          <div className="contenedor mas-alquilado__lista">
            {masAlquilado.map((maquina) => (
              <a key={maquina.id} href={urlConBusqueda('', maquina.nombre)} className="mas-alquilado__tarjeta">
                <span className="mas-alquilado__foto">
                  <img
                    src={maquina.imagen.src}
                    alt=""
                    loading="lazy"
                    style={{ height: Math.round(maquina.alturaImagen * 0.56) }}
                  />
                </span>
                <span className="mas-alquilado__nombre">{maquina.nombre}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
