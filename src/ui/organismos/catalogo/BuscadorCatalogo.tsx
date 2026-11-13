// BUSCADOR DEL CATÁLOGO. Es un formulario normal (?q=…), así funciona incluso sin JavaScript;
// con JavaScript filtra sin recargar la página.
// `conBorrar`: muestra la "X" para borrar la búsqueda (pantalla sin resultados).

import { useEffect, useState, type FormEvent } from 'react';
import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import { PARAM_BUSQUEDA } from '@aplicacion/catalogo/direccion';
import Icono from '@ui/atomos/Icono';
import Boton from '@ui/atomos/Boton';

interface Props {
  buscador: ContenidoCatalogo['buscador'];
  textoBorrar: string;
  busqueda: string;
  conBorrar: boolean;
  onBuscar: (texto: string) => void;
}

export default function BuscadorCatalogo({ buscador, textoBorrar, busqueda, conBorrar, onBuscar }: Props) {
  const [texto, setTexto] = useState(busqueda);

  // Si la búsqueda cambia desde afuera (dirección, "Atrás"), el campo la muestra
  useEffect(() => setTexto(busqueda), [busqueda]);

  const enviar = (evento: FormEvent) => {
    evento.preventDefault();
    onBuscar(texto.trim());
  };

  const borrar = () => {
    setTexto('');
    onBuscar('');
  };

  return (
    <form className="buscador-catalogo" role="search" method="get" onSubmit={enviar}>
      <Icono nombre="buscar" tamano={20} color="#3F809C" className="buscador-catalogo__icono" />
      <input
        className="buscador-catalogo__campo"
        type="search"
        name={PARAM_BUSQUEDA}
        aria-label={buscador.etiqueta}
        placeholder={buscador.placeholder}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      {conBorrar && (
        <button type="button" className="buscador-catalogo__borrar" aria-label={textoBorrar} onClick={borrar}>
          <Icono nombre="cerrar" tamano={18} color="#A6A6A6" />
        </button>
      )}
      <Boton
        type="submit"
        variante="azul"
        className={conBorrar ? 'buscador-catalogo__boton buscador-catalogo__boton--opcional' : 'buscador-catalogo__boton'}
      >
        {buscador.boton}
      </Boton>
    </form>
  );
}
