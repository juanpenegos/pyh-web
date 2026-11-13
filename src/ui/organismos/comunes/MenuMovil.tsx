// MENÚ MÓVIL (isla de React) — pantalla M-Menu del diseño.
// Muestra el botón de hamburguesa; al tocarlo abre el menú a pantalla completa.
// Usa <dialog>, que ya trae de fábrica: cerrar con Escape, foco atrapado dentro
// del menú y el resto de la página inactiva mientras está abierto.
// Todos los textos llegan por props (contenido común, ver src/dominio/paginas/comun.ts).

import Icono from '@ui/atomos/Icono';
import { useDialogoModal } from '@ui/utilidades/useDialogoModal';
import Logo from '@ui/atomos/Logo';
import type { ContenidoComun } from '@dominio/paginas/comun';
import './MenuMovil.css';
import { atributosEnlace } from '@ui/utilidades/enlaces';
import Boton from '@ui/atomos/Boton';
import Sello from '@ui/atomos/Sello';

interface Props {
  textos: ContenidoComun['menuMovil'];   // La forma está en src/dominio/paginas/comun.ts
  logo: { etiquetaEnlace: string; url: string };
  paginaActual: string;
}

export default function MenuMovil({ textos, logo, paginaActual }: Props) {
  // Abrir, cerrar y bloquear la página de atrás: comportamiento compartido (useDialogoModal)
  const { ref: dialogo, abrir, cerrar } = useDialogoModal('(min-width: 1100px)');

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
                {...atributosEnlace(enlace.url)}
              >
                <span className="menu-movil__numero">{String(i + 1).padStart(2, '0')}</span>
                <span className="menu-movil__texto">{enlace.texto}</span>
              </a>
            ))}
          </nav>

          <div className="menu-movil__botones">
            <Boton href={textos.botonClientes.url} variante="azul" className="menu-movil__clientes">
              <Icono nombre="persona" tamano={18} color="#FFFFFF" />
              {textos.botonClientes.texto}
            </Boton>
            <Boton href={textos.botonCotizar.url} variante="lima">
              <Icono nombre="mas" tamano={14} color="#00475D" />
              {textos.botonCotizar.texto}
            </Boton>
            <Boton href={textos.botonPagos.url} variante="linea-blanca">
              <Icono nombre="candado" tamano={18} color="#89E462" />
              {textos.botonPagos.texto}
            </Boton>
          </div>

          <div className="menu-movil__contacto">
            <a href={textos.telefono.url}>
              <Icono nombre="telefono" tamano={18} color="#89E462" />
              {textos.telefono.texto}
            </a>
            <a href={textos.whatsapp.url} {...atributosEnlace(textos.whatsapp.url)}>
              <Icono nombre="whatsapp" tamano={18} color="#89E462" />
              {textos.whatsapp.texto}
            </a>
            <div className="menu-movil__sellos">
              {textos.sellos.map((sello) => (
                <Sello key={sello} texto={sello} />
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
