// ASISTENTE DE PAGO PSE (organismo, isla de React) — tarjeta blanca + columna lateral (D-PSE / M-PSE).
// Paso 1: busca la factura · Paso 2: revisa y elige banco · Paso 3: en /pagos-pse/resultado.
// - Recibe los servicios por props (falsos o HTTP); no sabe cuál es cuál.
// - El pago por enlace externo (Mi Pago Amigo) no pasa por aquí: es PagoExterno.tsx.
// - Los datos del cliente viven solo en la memoria de esta isla (no en la dirección ni en el navegador).
// - Al cambiar de paso, el foco pasa al título del paso nuevo (para lectores de pantalla).
import { useEffect, useRef, useState } from 'react';
import type { ServicioFacturas } from '@aplicacion/puertos/ServicioFacturas';
import type { ServicioPagos } from '@aplicacion/puertos/ServicioPagos';
import type { Banco, ConsultaFactura, Factura, TipoPersona } from '@dominio/pagos';
import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';
import type { EntradaFactura } from '@aplicacion/validacion/factura';
import { comoErrorServicio, type ErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { rellenar } from '@aplicacion/comun/textos';
import BarraProgreso from '@ui/atomos/BarraProgreso';
import { emitirEvento } from '@ui/utilidades/analitica';
import PasoBuscarFactura from './PasoBuscarFactura';
import PasoRevisarPago from './PasoRevisarPago';
import Lateral from './Lateral';
import './PagoPse.css';

export interface PropsAsistentePago {
  textos: Pick<ContenidoPagosPse, 'asistente' | 'comoFunciona' | 'ayuda'>;
  facturas: ServicioFacturas;
  pagos: ServicioPagos;
  rutaRetorno: string;                         // "/pagos-pse/resultado"
  enlaceWhatsapp: (mensaje: string) => string;
  irA?: (url: string) => void;                 // Ir a la página del banco (se puede cambiar en pruebas)
}

type Aviso = { texto: string; reintentar: boolean };

const avisoDe = (e: ErrorServicio): Aviso => ({
  texto: e.mensaje,
  reintentar: e.codigo === 'UNKNOWN' || e.codigo === 'SERVICE_UNAVAILABLE',
});

const INICIAL: EntradaFactura = { tipoDocumento: 'NIT', numeroDocumento: '', numeroFactura: '' };

export default function AsistentePago(props: PropsAsistentePago) {
  const { textos, facturas, pagos, rutaRetorno, enlaceWhatsapp, irA = (url) => window.location.assign(url) } = props;

  const [paso, setPaso] = useState<1 | 2>(1);
  const [entrada, setEntrada] = useState<EntradaFactura>(INICIAL);
  const [consulta, setConsulta] = useState<ConsultaFactura | null>(null);
  const [factura, setFactura] = useState<Factura | null>(null);
  const [bancos, setBancos] = useState<Banco[] | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<Aviso | undefined>();
  const idSolicitud = useRef<string | null>(null);
  const tituloBuscar = useRef<HTMLHeadingElement>(null);
  const tituloRevisar = useRef<HTMLHeadingElement>(null);
  const yaCambio = useRef(false);

  // Foco al título del paso cuando cambia (no al abrir la página)
  useEffect(() => {
    if (!yaCambio.current) {
      yaCambio.current = true;
      return;
    }
    (paso === 1 ? tituloBuscar : tituloRevisar).current?.focus();
  }, [paso]);

  // Los bancos se piden al llegar al paso 2 (una sola vez)
  useEffect(() => {
    if (paso !== 2 || bancos !== null) return;
    pagos
      .listarBancos()
      .then(setBancos)
      .catch((error) => {
        setBancos([]);
        setAviso(avisoDe(comoErrorServicio(error)));
      });
  }, [paso, bancos, pagos]);

  const lateral = (
    <Lateral
      comoFunciona={textos.comoFunciona}
      ayuda={textos.ayuda}
      enlaceWhatsapp={enlaceWhatsapp}
      numeroFactura={factura?.numero}
    />
  );

  const progreso = (n: number) => rellenar(textos.asistente.progreso, { n: String(n) });

  async function buscar(nueva: ConsultaFactura, valores: EntradaFactura) {
    setEntrada(valores);
    setOcupado(true);
    setAviso(undefined);
    try {
      const encontrada = await facturas.buscar(nueva);
      emitirEvento({ event: 'pse_invoice_lookup', result: 'found' });
      setConsulta(nueva);
      setFactura(encontrada);
      setPaso(2);
    } catch (error) {
      emitirEvento({ event: 'pse_invoice_lookup', result: 'error' });
      setAviso(avisoDe(comoErrorServicio(error)));
    } finally {
      setOcupado(false);
    }
  }

  async function pagar(codigoBanco: string, tipoPersona: TipoPersona) {
    if (!consulta || !factura) return;
    setOcupado(true);
    setAviso(undefined);
    idSolicitud.current ??= crypto.randomUUID();
    try {
      emitirEvento({ event: 'pse_payment_start' });
      const inicio = await pagos.iniciar({
        numeroFactura: factura.numero,
        codigoBanco,
        tipoPersona,
        tipoDocumento: consulta.tipoDocumento,
        numeroDocumento: consulta.numeroDocumento,
        urlRetorno: new URL(rutaRetorno, window.location.origin).href,
        idSolicitud: idSolicitud.current,
      });
      irA(inicio.urlBanco); // Se va a la página del banco; la isla se queda "ocupada"
    } catch (error) {
      setAviso(avisoDe(comoErrorServicio(error)));
      setOcupado(false);
    }
  }

  function atras() {
    setAviso(undefined);
    idSolicitud.current = null;
    setPaso(1);
  }

  return (
    <div className="pago-pse__fila">
      <div className="pago-pse__tarjeta">
        <BarraProgreso pasos={3} actual={paso} etiqueta={progreso(paso)} />
        {paso === 1 || !factura ? (
          <PasoBuscarFactura
            textos={textos.asistente.buscar}
            reintentar={textos.asistente.reintentar}
            inicial={entrada}
            buscando={ocupado}
            error={aviso}
            alBuscar={buscar}
            refTitulo={tituloBuscar}
          />
        ) : (
          <PasoRevisarPago
            textos={textos.asistente.revisar}
            reintentar={textos.asistente.reintentar}
            factura={factura}
            bancos={bancos}
            pagando={ocupado}
            error={aviso}
            alAtras={atras}
            alPagar={pagar}
            refTitulo={tituloRevisar}
          />
        )}
      </div>
      {lateral}
    </div>
  );
}
