// PASO 1 — "Busca tu factura." Tipo y número de documento, número de factura y "Buscar factura".
// Valida con src/aplicacion/validacion/factura.ts. No sabe de dónde salen las facturas:
// recibe `alBuscar`, que el asistente conecta con el servicio de facturas.
import { useState, type FormEvent, type RefObject } from 'react';
import type { ConsultaFactura, TipoDocumento } from '@dominio/pagos';
import type { TextosAsistentePago } from '@dominio/paginas/pagosPse';
import { esquemaFactura, type EntradaFactura } from '@aplicacion/validacion/factura';
import { validar } from '@aplicacion/validacion/validar';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import Campo from '@ui/moleculas/Campo';
import Alerta from '@ui/moleculas/Alerta';
import Boton from '@ui/atomos/Boton';
import Cargando from '@ui/atomos/Cargando';
import { Entrada, Seleccion } from '@ui/atomos/Control';

interface Props {
  textos: TextosAsistentePago['buscar'];
  reintentar: string;
  inicial: EntradaFactura;
  buscando: boolean;
  error?: { texto: string; reintentar: boolean };
  alBuscar: (consulta: ConsultaFactura, entrada: EntradaFactura) => void;
  refTitulo: RefObject<HTMLHeadingElement | null>;
}

type NombreCampo = keyof EntradaFactura;

export default function PasoBuscarFactura({ textos, reintentar, inicial, buscando, error, alBuscar, refTitulo }: Props) {
  const [valores, setValores] = useState<EntradaFactura>(inicial);
  const [tocados, setTocados] = useState<Partial<Record<NombreCampo, boolean>>>({});

  const errores = validar(esquemaFactura, valores);
  const errorDe = (campo: NombreCampo) => (tocados[campo] ? errores[campo] : undefined);
  const cambiar = (campo: NombreCampo, valor: string) => setValores((v) => ({ ...v, [campo]: valor }));
  const tocar = (campo: NombreCampo) => setTocados((t) => ({ ...t, [campo]: true }));

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (buscando) return;
    setTocados({ tipoDocumento: true, numeroDocumento: true, numeroFactura: true });
    const resultado = esquemaFactura.safeParse(valores);
    if (!resultado.success) {
      const primero = (['numeroDocumento', 'numeroFactura'] as const).find((c) => errores[c]);
      if (primero) evento.currentTarget.querySelector<HTMLElement>(`#pse-${primero}`)?.focus();
      return;
    }
    alBuscar(resultado.data, valores);
  }

  return (
    <form className="pago-pse__paso" noValidate onSubmit={enviar} aria-labelledby="pse-titulo-buscar">
      <h2 ref={refTitulo} id="pse-titulo-buscar" tabIndex={-1} className="pago-pse__titular titulo-paso">
        <Titular titular={textos.titular} etiqueta="span" />
      </h2>

      <div className="formulario__fila">
        <Campo id="pse-tipoDocumento" etiqueta={textos.tipoDocumento.etiqueta}>
          {(a) => (
            <Seleccion
              {...a}
              name="tipoDocumento"
              opciones={textos.tipoDocumento.opciones}
              value={valores.tipoDocumento}
              onChange={(e) => cambiar('tipoDocumento', e.target.value as TipoDocumento)}
            />
          )}
        </Campo>
        <Campo id="pse-numeroDocumento" etiqueta={textos.numeroDocumento.etiqueta} error={errorDe('numeroDocumento')}>
          {(a) => (
            <Entrada
              {...a}
              name="numeroDocumento"
              inputMode="numeric"
              autoComplete="off"
              placeholder={textos.numeroDocumento.placeholder}
              value={valores.numeroDocumento}
              onChange={(e) => cambiar('numeroDocumento', e.target.value)}
              onBlur={() => tocar('numeroDocumento')}
            />
          )}
        </Campo>
      </div>

      <Campo id="pse-numeroFactura" etiqueta={textos.numeroFactura.etiqueta} error={errorDe('numeroFactura')}>
        {(a) => (
          <Entrada
            {...a}
            name="numeroFactura"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder={textos.numeroFactura.placeholder}
            value={valores.numeroFactura}
            onChange={(e) => cambiar('numeroFactura', e.target.value)}
            onBlur={() => tocar('numeroFactura')}
          />
        )}
      </Campo>

      <Alerta>{error?.texto}</Alerta>

      <Boton type="submit" variante="azul" className="pago-pse__boton-solo" ocupado={buscando}>
        {buscando ? <Cargando /> : <Icono nombre="buscar" tamano={18} color="#89E462" />}
        {buscando ? textos.buscando : error?.reintentar ? reintentar : textos.boton}
      </Boton>
    </form>
  );
}
