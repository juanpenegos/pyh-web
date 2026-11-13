// TARJETA DE MÁQUINA del catálogo (D-Catalogo en escritorio, M-Catalogo en móvil).
// Está en React porque en la tanda 4 se mostrará dentro de la isla de filtros;
// usada desde un .astro sin "client:" se convierte en HTML fijo, sin JavaScript.
// Escritorio: tarjeta vertical (foto arriba). Móvil: tarjeta horizontal (foto a la izquierda).

import type { CSSProperties } from 'react';
import Icono from '@ui/atomos/Icono';
import type { Maquina } from '@dominio/maquina';
import type { TextosTarjetaMaquina } from '@dominio/paginas/catalogo';
import './TarjetaMaquina.css';
import Boton from '@ui/atomos/Boton';

interface Props {
  maquina: Maquina;
  textos: TextosTarjetaMaquina;
}

export default function TarjetaMaquina({ maquina, textos }: Props) {
  const altura = `${maquina.alturaM} m`;

  return (
    <article
      className="tarjeta-maquina"
      style={
        {
          '--alto-foto': `${maquina.alturaImagen}px`,
          '--alto-foto-movil': `${Math.round(maquina.alturaImagen * 0.56)}px`,
        } as CSSProperties
      }
    >
      <div className="tarjeta-maquina__foto">
        <img src={maquina.imagen.src} alt={maquina.imagen.alt} loading="lazy" decoding="async" />
        {maquina.insignia && (
          <span className="tarjeta-maquina__insignia tarjeta-maquina__insignia--foto">{maquina.insignia}</span>
        )}
        <span className="tarjeta-maquina__altura" aria-hidden="true">{altura}</span>
      </div>

      <div className="tarjeta-maquina__cuerpo">
        {maquina.insignia && (
          <span className="tarjeta-maquina__insignia tarjeta-maquina__insignia--cuerpo" aria-hidden="true">
            {maquina.insignia}
          </span>
        )}
        <span className="tarjeta-maquina__familia">
          {maquina.familia} · {maquina.marca}
        </span>
        <h3 className="tarjeta-maquina__nombre">{maquina.nombre}</h3>

        <div className="tarjeta-maquina__datos">
          <span>
            <Icono nombre="altura" tamano={15} />
            {altura}
          </span>
          <span>
            <Icono nombre="energia" tamano={15} />
            {maquina.energia}
          </span>
          <span>
            <Icono nombre="capacidad" tamano={15} />
            {maquina.capacidad}
          </span>
        </div>

        <div className="tarjeta-maquina__uso">
          {maquina.terreno.join(' y ')} · {maquina.modalidad.join(' · ')}
        </div>

        <div className="tarjeta-maquina__estado">
          <span className={`tarjeta-maquina__punto tarjeta-maquina__punto--${maquina.estado}`} aria-hidden="true" />
          {maquina.disponibilidad}
        </div>

        <div className="tarjeta-maquina__pie">
          <div>
            <div className="tarjeta-maquina__pie-titulo">{textos.disponibleTitulo}</div>
            <div className="tarjeta-maquina__pie-detalle">{textos.disponibleDetalle}</div>
          </div>
          <Boton href={textos.botonCotizar.url} variante="lima" className="tarjeta-maquina__cotizar">
            {textos.botonCotizar.texto}
            <span className="solo-lector"> {maquina.nombre}</span>
          </Boton>
        </div>
      </div>
    </article>
  );
}
