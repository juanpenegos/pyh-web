// RESULTADO DEL PAGO (organismo, isla de React) — paso 3, en /pagos-pse/resultado?paymentId=…
// Al volver del banco consulta el estado del pago:
// - Aprobado: "Pago aprobado." con referencia, comprobante y "Pagar otra factura".
// - Rechazado: motivo e "Intentar de nuevo".
// - Pendiente: vuelve a consultar sola cada pocos segundos, durante un tiempo limitado.
import { useEffect, useRef, useState } from 'react';
import type { ServicioPagos } from '@aplicacion/puertos/ServicioPagos';
import type { ResultadoPago as Resultado } from '@dominio/pagos';
import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';
import { comoErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { rellenar } from '@aplicacion/comun/textos';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import BarraProgreso from '@ui/atomos/BarraProgreso';
import { emitirEvento } from '@ui/utilidades/analitica';
import Lateral from './Lateral';
import './PagoPse.css';
import Boton from '@ui/atomos/Boton';
import Cargando from '@ui/atomos/Cargando';

interface Props {
  textos: Pick<ContenidoPagosPse, 'resultado' | 'asistente' | 'comoFunciona' | 'ayuda'>;
  pagos: ServicioPagos | null;                    // null = el pago es por enlace externo (no vuelve aquí)
  urlPagar: string;                               // "/pagos-pse"
  enlaceWhatsapp: (mensaje: string) => string;
  cadaMs?: number;                                // Cada cuánto se vuelve a consultar si está pendiente
  intentos?: number;                              // Cuántas veces como máximo
}

type Vista =
  | { tipo: 'consultando' }
  | { tipo: 'sin-pago' }
  | { tipo: 'pago'; resultado: Resultado; agotado: boolean };

export default function ResultadoPago({ textos, pagos, urlPagar, enlaceWhatsapp, cadaMs = 4000, intentos = 15 }: Props) {
  const [vista, setVista] = useState<Vista>({ tipo: 'consultando' });
  const [vuelta, setVuelta] = useState(0); // Sube para volver a consultar a mano
  const idPago = useRef<string | null>(null);

  useEffect(() => {
    idPago.current = new URLSearchParams(window.location.search).get('paymentId');
    const idLeido = idPago.current;
    if (!idLeido || !pagos) {
      setVista({ tipo: 'sin-pago' });
      return;
    }
    const id: string = idLeido;
    const servicio: ServicioPagos = pagos;

    let cancelado = false;
    let espera: ReturnType<typeof setTimeout> | undefined;

    async function consultar(n: number) {
      try {
        const resultado = await servicio.consultar(id);
        if (cancelado) return;
        const agotado = resultado.estado === 'pending' && n >= intentos;
        setVista({ tipo: 'pago', resultado, agotado });
        if (resultado.estado === 'pending' && !agotado) {
          espera = setTimeout(() => consultar(n + 1), cadaMs);
        } else {
          emitirEvento({ event: 'pse_payment_result', status: resultado.estado });
        }
      } catch (error) {
        if (cancelado) return;
        const e = comoErrorServicio(error);
        if (e.codigo === 'NOT_FOUND') setVista({ tipo: 'sin-pago' });
        else setVista({ tipo: 'pago', resultado: { estado: 'pending', numeroFactura: '', banco: '', total: 0 }, agotado: true });
      }
    }

    consultar(1);
    return () => {
      cancelado = true;
      clearTimeout(espera);
    };
  }, [pagos, cadaMs, intentos, vuelta]);

  const t = textos.resultado;
  const progreso = rellenar(textos.asistente.progreso, { n: '3' });
  const factura = vista.tipo === 'pago' ? vista.resultado.numeroFactura || undefined : undefined;

  return (
    <div className="pago-pse__fila">
      <div className="pago-pse__tarjeta">
        <BarraProgreso pasos={3} actual={3} etiqueta={progreso} />
        <div className="pago-pse__paso" aria-live="polite">
          <Contenido vista={vista} textos={t} urlPagar={urlPagar} alConsultar={() => setVuelta((v) => v + 1)} />
        </div>
      </div>
      <Lateral comoFunciona={textos.comoFunciona} ayuda={textos.ayuda} enlaceWhatsapp={enlaceWhatsapp} numeroFactura={factura} />
    </div>
  );
}

interface PropsContenido {
  vista: Vista;
  textos: ContenidoPagosPse['resultado'];
  urlPagar: string;
  alConsultar: () => void;
}

function Contenido({ vista, textos: t, urlPagar, alConsultar }: PropsContenido) {
  if (vista.tipo === 'consultando') {
    return (
      <>
        <span className="pago-pse__icono pago-pse__icono--pendiente">
          <Cargando />
        </span>
        <p className="pago-pse__texto">{t.consultando}</p>
      </>
    );
  }

  if (vista.tipo === 'sin-pago') {
    return (
      <>
        <Titular titular={t.sinPago.titular} etiqueta="h2" className="pago-pse__titular" />
        <p className="pago-pse__texto">{t.sinPago.texto}</p>
        <Boton href={urlPagar} variante="lima" className="pago-pse__boton-solo">
          {t.sinPago.volver}
        </Boton>
      </>
    );
  }

  const r = vista.resultado;

  if (r.estado === 'approved') {
    return (
      <>
        <span className="pago-pse__icono">
          <Icono nombre="visto" tamano={32} color="#00475D" grosor={3} />
        </span>
        <Titular titular={t.aprobado.titular} etiqueta="h2" className="pago-pse__titular" />
        <p className="pago-pse__texto">
          {rellenar(t.aprobado.texto, { factura: r.numeroFactura, banco: r.banco, referencia: r.referenciaPse ?? '—' })}
        </p>
        <div className="pago-pse__botones">
          {r.urlComprobante && (
            <Boton href={r.urlComprobante} variante="azul">
              <Icono nombre="archivo" tamano={18} color="#89E462" />
              {t.aprobado.comprobante}
            </Boton>
          )}
          <Boton href={urlPagar} variante="linea">
            {t.aprobado.otra}
          </Boton>
        </div>
      </>
    );
  }

  if (r.estado === 'rejected') {
    return (
      <>
        <span className="pago-pse__icono pago-pse__icono--rechazado">
          <Icono nombre="cerrar" tamano={30} grosor={3} />
        </span>
        <Titular titular={t.rechazado.titular} etiqueta="h2" className="pago-pse__titular" />
        <p className="pago-pse__texto">{rellenar(t.rechazado.texto, { motivo: r.motivoRechazo ?? '' }).trim()}</p>
        <Boton href={urlPagar} variante="lima" className="pago-pse__boton-solo">
          {t.rechazado.reintentar}
        </Boton>
      </>
    );
  }

  // Pendiente
  return (
    <>
      <span className="pago-pse__icono pago-pse__icono--pendiente">
        {vista.agotado ? <Icono nombre="reloj" tamano={30} /> : <Cargando />}
      </span>
      <Titular titular={t.pendiente.titular} etiqueta="h2" className="pago-pse__titular" />
      <p className="pago-pse__texto">{vista.agotado ? t.pendiente.tarda : t.pendiente.texto}</p>
      {vista.agotado && (
        <Boton variante="linea" className="pago-pse__boton-solo" onClick={alConsultar}>
          {t.pendiente.consultar}
        </Boton>
      )}
    </>
  );
}
