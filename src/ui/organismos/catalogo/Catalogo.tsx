// CATÁLOGO (isla de React): conecta las reglas del catálogo con las piezas de pantalla.
// - Las reglas (filtrar, contar, ordenar, buscar) están en src/aplicacion/catalogo.
// - Cada pieza (panel, hoja, barra, tarjetas…) solo dibuja lo que recibe.
// - Este componente solo decide qué se muestra y pasa los datos y acciones a cada pieza.
// Todos los textos llegan por props desde contenido-local/catalogo/catalogo.ts.

import { useMemo } from 'react';
import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import { crearCriterios } from '@aplicacion/catalogo/criterios';
import { ConsultaCatalogo } from '@aplicacion/catalogo/ConsultaCatalogo';
import { textoCantidad } from '@aplicacion/catalogo/textos';
import { useDialogoModal } from '@ui/utilidades/useDialogoModal';
import { useEstadoCatalogo } from './useEstadoCatalogo';
import EncabezadoCatalogo from './EncabezadoCatalogo';
import PanelFiltros from './PanelFiltros';
import FiltrosAplicados from './FiltrosAplicados';
import BarraMovil from './BarraMovil';
import HojaFiltros from './HojaFiltros';
import ChipsOrden from './ChipsOrden';
import TarjetaMaquina from '@ui/moleculas/TarjetaMaquina';
import SinCoincidencias from './SinCoincidencias';
import SinResultadosBusqueda from './SinResultadosBusqueda';
import AyudaAsistente from './AyudaAsistente';
import './Catalogo.css';
import './FiltrosMovil.css';

interface Props {
  catalogo: Omit<ContenidoCatalogo, 'seo'>;
}

export default function Catalogo({ catalogo }: Props) {
  const { textos } = catalogo;

  // Reglas del catálogo, armadas una sola vez con los grupos y máquinas del contenido
  const consulta = useMemo(
    () => new ConsultaCatalogo(catalogo.maquinas, crearCriterios(catalogo.grupos)),
    [catalogo.maquinas, catalogo.grupos],
  );
  const [estado, acciones] = useEstadoCatalogo(consulta.criterios);
  const hoja = useDialogoModal('(min-width: 768px)');

  const resultados = consulta.resultados(estado);
  const grupos = consulta.grupos(estado);
  const aplicados = consulta.aplicados(estado);
  const cantidad = textoCantidad(textos.resultados, resultados.length);
  const busquedaSinResultados = estado.busqueda.trim() !== '' && !consulta.hayCoincidenciasDeBusqueda(estado);

  const pildorasAplicadas = (variante: 'panel' | 'movil') => (
    <FiltrosAplicados
      aplicados={aplicados}
      textoQuitar={textos.filtros.quitar}
      textoLimpiar={textos.filtros.limpiar}
      onQuitar={acciones.alternar}
      onLimpiar={acciones.limpiar}
      tamanoIcono={variante === 'panel' ? 14 : 12}
      className={`filtros-aplicados--${variante}`}
    />
  );

  return (
    <>
      <EncabezadoCatalogo
        migas={catalogo.migas}
        etiquetaMigas={catalogo.etiquetaMigas}
        encabezado={catalogo.encabezado}
        buscador={catalogo.buscador}
        textoBorrar={textos.sinResultadosBusqueda.borrarBusqueda}
        busqueda={estado.busqueda}
        compacto={busquedaSinResultados}
        onBuscar={acciones.buscar}
      />

      {/* Aviso para lectores de pantalla cada vez que cambia la cantidad */}
      <div className="solo-lector" aria-live="polite">
        {cantidad}
      </div>

      {busquedaSinResultados ? (
        <SinResultadosBusqueda
          textos={textos.sinResultadosBusqueda}
          busqueda={estado.busqueda}
          masAlquilado={consulta.porIds(textos.sinResultadosBusqueda.masAlquilado)}
        />
      ) : (
        <>
          <BarraMovil
            textoFiltros={textos.filtros.botonMovil}
            nAplicados={aplicados.length}
            grupoRapido={grupos[0]}
            onAbrirFiltros={hoja.abrir}
            onAlternar={acciones.alternar}
          />

          <section className="catalogo">
            <div className="contenedor catalogo__columnas">
              <PanelFiltros
                etiqueta={textos.filtros.etiquetaPanel}
                titulo={textos.filtros.titulo}
                cantidad={cantidad}
                grupos={grupos}
                aplicados={pildorasAplicadas('panel')}
                onAlternar={acciones.alternar}
              />

              <div className="catalogo__principal">
                {/* Escritorio: orden con píldoras y nota */}
                <div className="catalogo__barra">
                  <div className="catalogo__orden" role="group" aria-labelledby="catalogo-orden">
                    <span id="catalogo-orden" className="catalogo__orden-etiqueta">
                      {textos.ordenar.etiqueta}
                    </span>
                    <ChipsOrden opciones={textos.ordenar.opciones} actual={estado.orden} onOrdenar={acciones.ordenar} />
                  </div>
                  <span className="catalogo__nota">{textos.notaDatos}</span>
                </div>

                {/* Móvil: cantidad, orden con lista desplegable, filtros aplicados y nota */}
                <div className="catalogo__barra-movil">
                  <div className="catalogo__resumen">
                    <span className="catalogo__cantidad">{cantidad}</span>
                    <label className="catalogo__orden-movil">
                      {textos.ordenar.etiqueta}
                      <select value={estado.orden} onChange={(e) => acciones.ordenar(e.target.value as typeof estado.orden)}>
                        {textos.ordenar.opciones.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.etiqueta}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {pildorasAplicadas('movil')}
                  <span className="catalogo__nota">{textos.notaDatos}</span>
                </div>

                {resultados.length > 0 ? (
                  <div className="catalogo__rejilla">
                    {resultados.map((maquina) => (
                      <TarjetaMaquina key={maquina.id} maquina={maquina} textos={textos.tarjeta} />
                    ))}
                  </div>
                ) : (
                  <SinCoincidencias textos={textos.sinCoincidencias} onQuitarFiltros={acciones.limpiar} />
                )}

                <AyudaAsistente textos={textos.ayudaAsistente} />
              </div>
            </div>
          </section>

          <HojaFiltros
            dialogo={hoja.ref}
            textos={textos.hoja}
            ordenar={textos.ordenar}
            orden={estado.orden}
            grupos={grupos}
            textoVer={textoCantidad(textos.hoja.ver, resultados.length)}
            onCerrar={hoja.cerrar}
            onOrdenar={acciones.ordenar}
            onAlternar={acciones.alternar}
            onLimpiar={acciones.limpiar}
          />
        </>
      )}
    </>
  );
}
