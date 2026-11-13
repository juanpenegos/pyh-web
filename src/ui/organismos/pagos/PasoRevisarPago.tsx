// PASO 2 — "Revisa y paga." Resumen de la factura, banco, tipo de persona, "Atrás" y "Pagar con PSE".
// Los bancos llegan del servicio de pagos (la lista real la da la pasarela). Se muestran los
// 6 primeros como botones y, si hay más, el resto en una lista desplegable "Otro banco".
import { useState, type FormEvent, type RefObject } from 'react';
import type { Banco, Factura, TipoPersona } from '@dominio/pagos';
import type { TextosAsistentePago } from '@dominio/paginas/pagosPse';
import { formatearFecha, formatearPesos } from '@aplicacion/pagos/formato';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import Campo from '@ui/moleculas/Campo';
import Alerta from '@ui/moleculas/Alerta';
import Boton from '@ui/atomos/Boton';
import Cargando from '@ui/atomos/Cargando';
import { Seleccion } from '@ui/atomos/Control';

interface Props {
  textos: TextosAsistentePago['revisar'];
  reintentar: string;
  factura: Factura;
  bancos: Banco[] | null;          // null = cargando
  pagando: boolean;
  error?: { texto: string; reintentar: boolean };
  alAtras: () => void;
  alPagar: (codigoBanco: string, tipoPersona: TipoPersona) => void;
  refTitulo: RefObject<HTMLHeadingElement | null>;
}

const VISIBLES = 6;

export default function PasoRevisarPago(props: Props) {
  const { textos, reintentar, factura, bancos, pagando, error, alAtras, alPagar, refTitulo } = props;
  const [banco, setBanco] = useState('');
  const [tipoPersona, setTipoPersona] = useState<TipoPersona>(textos.tipoPersona.opciones[0].valor);
  const [faltaBanco, setFaltaBanco] = useState(false);

  const principales = bancos?.slice(0, VISIBLES) ?? [];
  const otros = bancos?.slice(VISIBLES) ?? [];
  const elegirBanco = (codigo: string) => {
    setBanco(codigo);
    setFaltaBanco(false);
  };

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    if (pagando || bancos === null) return;
    if (!banco) {
      setFaltaBanco(true);
      return;
    }
    alPagar(banco, tipoPersona);
  }

  const filas = [
    { etiqueta: textos.filas.factura, valor: factura.numero },
    { etiqueta: textos.filas.cliente, valor: factura.cliente },
    { etiqueta: textos.filas.concepto, valor: factura.concepto },
    { etiqueta: textos.filas.vence, valor: formatearFecha(factura.vence) },
  ];

  return (
    <form className="pago-pse__paso" noValidate onSubmit={enviar} aria-labelledby="pse-titulo-revisar">
      <h2 ref={refTitulo} id="pse-titulo-revisar" tabIndex={-1} className="pago-pse__titular titulo-paso">
        <Titular titular={textos.titular} etiqueta="span" />
      </h2>

      <dl className="resumen-factura">
        {filas.map((fila) => (
          <div key={fila.etiqueta} className="resumen-factura__fila">
            <dt>{fila.etiqueta}</dt>
            <dd>{fila.valor}</dd>
          </div>
        ))}
        <div className="resumen-factura__linea" role="presentation" />
        <div className="resumen-factura__fila">
          <dt>{textos.filas.total}</dt>
          <dd className="resumen-factura__total">{formatearPesos(factura.total)}</dd>
        </div>
      </dl>

      <fieldset className="grupo-chips" aria-describedby={faltaBanco ? 'pse-banco-error' : undefined}>
        <legend className="campo__etiqueta">{textos.banco.etiqueta}</legend>
        {bancos === null ? (
          <p className="pago-pse__nota">{textos.banco.cargando}</p>
        ) : (
          <div className="bancos">
            {principales.map((b) => (
              <label key={b.codigo} className={`banco ${banco === b.codigo ? 'banco--elegido' : ''}`}>
                <input
                  type="radio"
                  name="banco"
                  value={b.codigo}
                  checked={banco === b.codigo}
                  onChange={() => elegirBanco(b.codigo)}
                />
                {b.nombre}
              </label>
            ))}
          </div>
        )}
        {faltaBanco && (
          <span id="pse-banco-error" className="campo__error">
            {textos.banco.elige}
          </span>
        )}
      </fieldset>

      {otros.length > 0 && (
        <Campo id="pse-otro-banco" etiqueta={textos.banco.otros}>
          {(a) => (
            <Seleccion
              {...a}
              vacia="—"
              opciones={otros.map((b) => ({ valor: b.codigo, texto: b.nombre }))}
              value={otros.some((b) => b.codigo === banco) ? banco : ''}
              onChange={(e) => elegirBanco(e.target.value)}
            />
          )}
        </Campo>
      )}

      <Campo id="pse-tipoPersona" etiqueta={textos.tipoPersona.etiqueta}>
        {(a) => (
          <Seleccion
            {...a}
            opciones={textos.tipoPersona.opciones}
            value={tipoPersona}
            onChange={(e) => setTipoPersona(e.target.value as TipoPersona)}
          />
        )}
      </Campo>

      <Alerta>{error?.texto}</Alerta>

      <div className="pago-pse__botones">
        <Boton variante="linea" onClick={alAtras} disabled={pagando}>
          <Icono nombre="atras" tamano={18} />
          {textos.atras}
        </Boton>
        <Boton type="submit" variante="lima" ocupado={pagando || bancos === null}>
          {pagando ? <Cargando /> : <Icono nombre="candado" tamano={18} color="#00475D" />}
          {pagando ? textos.pagando : error?.reintentar ? reintentar : textos.pagar}
        </Boton>
      </div>
    </form>
  );
}
