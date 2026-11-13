// PAGO CON ENLACE EXTERNO (PUBLIC_PAYMENTS_MODE=redirect, la solución de hoy) — tarjeta + columna lateral.
// Explica los 3 pasos y un botón "Pagar con PSE" abre la página de pagos que ya usa la empresa
// (Mi Pago Amigo). No tiene estado: la página lo usa sin "client:", así que sale como HTML puro
// y no manda JavaScript (más rápido). El evento de analítica lo emite un script pequeño de la
// página al tocar el enlace marcado con data-pago-externo.
import type { ContenidoPagosPse, TextosPagoExterno } from '@dominio/paginas/pagosPse';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import Boton from '@ui/atomos/Boton';
import BarraProgreso from '@ui/atomos/BarraProgreso';
import Lateral from './Lateral';
import './PagoPse.css';

interface Props {
  textos: TextosPagoExterno;
  url: string;
  etiquetaProgreso: string;
  comoFunciona: ContenidoPagosPse['comoFunciona'];
  ayuda: ContenidoPagosPse['ayuda'];
  enlaceWhatsapp: (mensaje: string) => string;
}

export default function PagoExterno({ textos, url, etiquetaProgreso, comoFunciona, ayuda, enlaceWhatsapp }: Props) {
  return (
    <div className="pago-pse__fila">
      <div className="pago-pse__tarjeta">
        <BarraProgreso pasos={3} actual={1} etiqueta={etiquetaProgreso} />
        <Titular titular={textos.titular} etiqueta="h2" className="pago-pse__titular" />
        <ol className="pasos-pago">
          {textos.pasos.map((paso, i) => (
            <li key={paso}>
              <span className="pasos-pago__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {paso}
            </li>
          ))}
        </ol>
        <Boton href={url} variante="lima" className="pago-pse__boton-solo" data-pago-externo="">
          <Icono nombre="candado" tamano={18} color="#00475D" />
          {textos.boton}
          <Icono nombre="diagonal" tamano={16} color="#00475D" />
        </Boton>
        <p className="pago-pse__nota">{textos.nota}</p>
      </div>
      <Lateral comoFunciona={comoFunciona} ayuda={ayuda} enlaceWhatsapp={enlaceWhatsapp} />
    </div>
  );
}
