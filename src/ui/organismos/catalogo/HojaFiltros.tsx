// HOJA DE FILTROS MÓVIL (M-Filtros): sube desde abajo con el orden y todos los grupos.
// Es un <dialog>: cierra con Escape, atrapa el foco y deja inactiva la página de atrás.
// Quien la usa le pasa el `ref` y `cerrar` de useDialogoModal (así también puede abrirla).

import type { RefObject } from 'react';
import type { IdOrden } from '@dominio/filtros';
import type { TextosCatalogo } from '@dominio/paginas/catalogo';
import type { VistaGrupo } from '@aplicacion/catalogo/ConsultaCatalogo';
import Icono from '@ui/atomos/Icono';
import ChipsGrupo from './ChipsGrupo';
import ChipsOrden from './ChipsOrden';
import Boton from '@ui/atomos/Boton';

interface Props {
  dialogo: RefObject<HTMLDialogElement | null>;
  textos: TextosCatalogo['hoja'];
  ordenar: TextosCatalogo['ordenar'];
  orden: IdOrden;
  grupos: VistaGrupo[];
  textoVer: string;   // "Ver 9 resultados"
  onCerrar: () => void;
  onOrdenar: (orden: IdOrden) => void;
  onAlternar: (grupo: string, opcion: string) => void;
  onLimpiar: () => void;
}

export default function HojaFiltros({ dialogo, textos, ordenar, orden, grupos, textoVer, onCerrar, onOrdenar, onAlternar, onLimpiar }: Props) {
  return (
    <dialog
      ref={dialogo}
      className="hoja-filtros"
      aria-labelledby="hoja-filtros-titulo"
      // Tocar la parte oscura (fuera de la hoja) también la cierra
      onClick={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div className="hoja-filtros__contenido">
        <span className="hoja-filtros__agarre" aria-hidden="true" />

        <div className="hoja-filtros__cabecera">
          <span className="hoja-filtros__titulo" id="hoja-filtros-titulo">
            {textos.titulo}
          </span>
          <button type="button" className="hoja-filtros__cerrar" aria-label={textos.cerrar} onClick={onCerrar}>
            <Icono nombre="cerrar" tamano={20} color="#00475D" />
          </button>
        </div>

        <div className="hoja-filtros__cuerpo">
          <div className="hoja-filtros__grupo hoja-filtros__grupo--orden" role="group" aria-labelledby="hoja-orden">
            <span className="hoja-filtros__grupo-titulo" id="hoja-orden">
              {ordenar.etiqueta}
            </span>
            <div className="hoja-filtros__chips">
              <ChipsOrden opciones={ordenar.opciones} actual={orden} onOrdenar={onOrdenar} />
            </div>
          </div>

          {grupos.map((grupo) => (
            <div key={grupo.id} className="hoja-filtros__grupo" role="group" aria-labelledby={`hoja-${grupo.id}`}>
              <span className="hoja-filtros__grupo-titulo" id={`hoja-${grupo.id}`}>
                {grupo.etiqueta}
              </span>
              <div className="hoja-filtros__chips">
                <ChipsGrupo grupo={grupo} conCantidad onAlternar={onAlternar} />
              </div>
            </div>
          ))}
        </div>

        <div className="hoja-filtros__pie">
          <Boton variante="linea" className="hoja-filtros__limpiar" onClick={onLimpiar}>
            {textos.limpiar}
          </Boton>
          <Boton variante="lima" className="hoja-filtros__ver" onClick={onCerrar}>
            {textoVer}
          </Boton>
        </div>
      </div>
    </dialog>
  );
}
