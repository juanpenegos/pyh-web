// MENÚ MÓVIL (isla de React) — pantalla M-Menu del diseño.
// Muestra el botón de hamburguesa; al tocarlo abre el menú a pantalla completa.
// Usa <dialog>, que ya trae de fábrica: cerrar con Escape, foco atrapado dentro
// del menú y el resto de la página inactiva mientras está abierto.
// Todos los textos llegan por props (contenido común, ver src/dominio/paginas/comun.ts).

import { useEffect, useRef } from 'react';
import Icono from '@ui/compartido/Icono';
import Logo from '@ui/compartido/Logo';
import type { ContenidoComun } from '@dominio/paginas/comun';
import './MenuMovil.css';

interface Props {
  textos: ContenidoComun['menuMovil'];   // La forma está en src/dominio/paginas/comun.ts
  logo: { etiquetaEnlace: string; url: string };
  paginaActual: string;
}

// Los enlaces a otros sitios (WhatsApp) se abren en una pestaña nueva
const externo = (url: string) => (url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});

export default function MenuMovil({ textos, logo, paginaActual }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);

  const abrir = () => {
    dialogo.current?.showModal();
    document.body.style.overflow = 'hidden'; // Evita que la página de atrás se desplace
  };
  const cerrar = () => dialogo.current?.close();

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    // Cuando el menú se cierra (con el botón, con Escape o al elegir un enlace)
    const alCerrar = () => {
      document.body.style.overflow = '';
    };
    d.addEventListener('close', alCerrar);

    // Si la pantalla crece a tamaño escritorio con el menú abierto, se cierra
    const escritorio = window.matchMedia('(min-width: 1100px)');
    const alCambiar = () => escritorio.matches && d.open && d.close();
    escritorio.addEventListener('change', alCambiar);

    return () => {
      d.removeEventListener('close', alCerrar);
      escritorio.removeEventListener('change', alCambiar);
    };
  }, []);

  return (
    <>
      <button type="button" className="menu-movil__abrir" aria-label={textos.abrir} aria-haspopup="dialog" onClick={abrir}>
        <Icono nombre="menu" tamano={24} color="#00475D" />
      </button>

      <dialog ref={dialogo} className="menu-movil" aria-label={textos.etiqueta}>
        <div className="menu-movil__contenido">
          {/* "+" gigante decorativo */}
          <Icono nombre="mas" tamano={420} color="#89E462" className="menu-movil__decoracion" />

          <div className="menu-movil__barra">
            <a href={logo.url} aria-label={logo.etiquetaEnlace} className="menu-movil__logo">
              <Logo variante="oscuro" />
            </a>
            <button type="button" className="menu-movil__cerrar" aria-label={textos.cerrar} onClick={cerrar}>
              <Icono nombre="cerrar" tamano={22} color="#FFFFFF" />
            </button>
          </div>

          <nav className="menu-movil__nav" aria-label={textos.etiquetaNav}>
            {textos.enlaces.map((enlace, i) => (
              <a
                key={enlace.texto}
                href={enlace.url}
                className="menu-movil__enlace"
                style={{ animationDelay: `${i * 70}ms` }}
                aria-current={enlace.url === paginaActual ? 'page' : undefined}
                onClick={cerrar}
                {...externo(enlace.url)}
              >
                <span className="menu-movil__numero">{String(i + 1).padStart(2, '0')}</span>
                <span className="menu-movil__texto">{enlace.texto}</span>
              </a>
            ))}
          </nav>

          <div className="menu-movil__botones">
            <a href={textos.botonCotizar.url} className="btn btn--lima" {...externo(textos.botonCotizar.url)}>
              <Icono nombre="mas" tamano={14} color="#00475D" />
              {textos.botonCotizar.texto}
            </a>
            <a href={textos.botonPagos.url} className="btn btn--linea-blanca" {...externo(textos.botonPagos.url)}>
              <Icono nombre="candado" tamano={18} color="#89E462" />
              {textos.botonPagos.texto}
            </a>
          </div>

          <div className="menu-movil__contacto">
            <a href={textos.telefono.url}>
              <Icono nombre="telefono" tamano={18} color="#89E462" />
              {textos.telefono.texto}
            </a>
            <a href={textos.whatsapp.url} {...externo(textos.whatsapp.url)}>
              <Icono nombre="whatsapp" tamano={18} color="#89E462" />
              {textos.whatsapp.texto}
            </a>
            <div className="menu-movil__sellos">
              {textos.sellos.map((sello) => (
                <span key={sello} className="sello">{sello}</span>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
