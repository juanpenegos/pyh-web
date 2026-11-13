// ASISTENTE DE 3 PREGUNTAS (isla de React): pregunta dónde, a qué altura y para qué,
// y al final recomienda un equipo. Este componente solo maneja la pantalla (paso actual, foco);
// la regla de qué recomendar está en src/aplicacion/asistente/recomendarEquipo.ts.
// Todos los textos llegan por props desde inicio.ts.
import { useEffect, useRef, useState } from 'react';
import type { ContenidoAsistente } from '@dominio/paginas/inicio';
import { recomendarEquipo, textoPaso } from '@aplicacion/asistente/recomendarEquipo';
import './AsistenteInicio.css';
import Boton from '@ui/atomos/Boton';
import Eyebrow from '@ui/atomos/Eyebrow';

interface Props {
  asistente: ContenidoAsistente;
}

export default function AsistenteInicio({ asistente }: Props) {
  const total = asistente.preguntas.length;
  const [paso, setPaso] = useState(0);                       // 0, 1, 2… y "total" = terminado
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const titulo = useRef<HTMLDivElement>(null);
  const primeraVez = useRef(true);

  const terminado = paso >= total;
  const actual = asistente.preguntas[Math.min(paso, total - 1)];

  // Al cambiar de paso, el foco va al título nuevo (para quien usa teclado o lector de pantalla)
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }
    titulo.current?.focus();
  }, [paso]);

  const elegir = (opcion: number) => {
    const nuevas = respuestas.slice();
    nuevas[paso] = opcion;
    setRespuestas(nuevas);
    setPaso(paso + 1);
  };

  // Las reglas viven en la capa de aplicación; aquí solo se usan
  const recomendacion = recomendarEquipo(asistente, respuestas);
  const etiquetaPaso = textoPaso(asistente.etiquetaPaso, Math.min(paso + 1, total), total);


  return (
    <div className="asistente" aria-live="polite">
      {!terminado ? (
        <>
          <div className="asistente__barras" aria-hidden="true">
            {asistente.preguntas.map((_, i) => (
              <span key={i} className={i <= paso ? 'asistente__barra asistente__barra--hecha' : 'asistente__barra'} />
            ))}
          </div>
          <div className="asistente__paso">{etiquetaPaso}</div>
          <div className="asistente__pregunta" ref={titulo} tabIndex={-1}>
            {actual.pregunta}
          </div>
          <div className="asistente__opciones">
            {actual.opciones.map((opcion, i) => (
              <button
                key={opcion.titulo}
                type="button"
                className={respuestas[paso] === i ? 'asistente__opcion asistente__opcion--elegida' : 'asistente__opcion'}
                aria-pressed={respuestas[paso] === i}
                onClick={() => elegir(i)}
              >
                <span className="asistente__opcion-titulo">{opcion.titulo}</span>
                <span className="asistente__opcion-texto">{opcion.descripcion}</span>
              </button>
            ))}
          </div>
          <div className="asistente__pie">
            <a href={asistente.enlaceSaltar.url} className="asistente__saltar">
              {asistente.enlaceSaltar.texto}
            </a>
            <Boton className="asistente__atras" onClick={() => setPaso(Math.max(0, paso - 1))} disabled={paso === 0}>
              {asistente.botonAtras}
            </Boton>
          </div>
        </>
      ) : (
        <div className="asistente__resultado">
          <div className="asistente__foto">
            <img src={recomendacion.imagen.src} alt={recomendacion.imagen.alt} />
          </div>
          <div className="asistente__detalle">
            <Eyebrow texto={asistente.eyebrowResultado} className="asistente__eyebrow" />
            <div className="asistente__equipo" ref={titulo} tabIndex={-1}>
              {recomendacion.equipo}
            </div>
            <p className="asistente__motivo">{recomendacion.motivo}</p>
            <div className="asistente__acciones">
              <Boton href={asistente.botonCotizar.url} variante="lima" className="asistente__cotizar">
                {asistente.botonCotizar.texto}
              </Boton>
              <Boton
                variante="linea-blanca"
                className="asistente__reiniciar"
                onClick={() => {
                  setRespuestas([]);
                  setPaso(0);
                }}
              >
                {asistente.botonReiniciar}
              </Boton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
