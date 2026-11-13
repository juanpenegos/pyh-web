// COLUMNA LATERAL de Pagos PSE: "¿Cómo funciona?" y "¿Problemas con el pago?" (D-PSE / M-PSE).
// El botón de WhatsApp lleva el número de factura en el mensaje si la persona ya la buscó.
import Icono from '@ui/atomos/Icono';
import { rellenar } from '@aplicacion/comun/textos';
import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';
import './PagoPse.css';
import Boton from '@ui/atomos/Boton';

interface Props {
  comoFunciona: ContenidoPagosPse['comoFunciona'];
  ayuda: ContenidoPagosPse['ayuda'];
  /** Arma el enlace de WhatsApp con el mensaje ya escrito. */
  enlaceWhatsapp: (mensaje: string) => string;
  numeroFactura?: string;
}

export default function Lateral({ comoFunciona, ayuda, enlaceWhatsapp, numeroFactura }: Props) {
  const mensaje = numeroFactura ? rellenar(ayuda.mensaje, { factura: numeroFactura }) : ayuda.mensajeSinFactura;

  return (
    <aside className="pago-pse__lateral">
      <div className="como-funciona">
        <h2 className="como-funciona__titulo">{comoFunciona.titulo}</h2>
        <ol className="pasos-pago">
          {comoFunciona.pasos.map((paso) => (
            <li key={paso.numero}>
              <span className="pasos-pago__numero" aria-hidden="true">
                {paso.numero}
              </span>
              {paso.texto}
            </li>
          ))}
        </ol>
      </div>

      <div className="ayuda-pago">
        <h2 className="ayuda-pago__titulo">{ayuda.titulo}</h2>
        <p>{ayuda.texto}</p>
        <Boton href={enlaceWhatsapp(mensaje)} variante="linea">
          <Icono nombre="whatsapp" tamano={18} color="currentColor" />
          {ayuda.whatsapp}
        </Boton>
        <a href={ayuda.formulario.url} className="ayuda-pago__enlace">
          {ayuda.formulario.texto}
        </a>
      </div>
    </aside>
  );
}
