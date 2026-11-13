// CONECTOR de la isla del resultado del pago PSE (ver FormularioContactoIsla.tsx para la idea).
import ResultadoPago from '@ui/organismos/pagos/ResultadoPago';
import { servicios } from '@infraestructura/servicios';
import { enlaceWhatsapp } from '@aplicacion/contacto/enlacesContacto';
import type { Telefono } from '@dominio/empresa';
import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';

interface Props {
  textos: Pick<ContenidoPagosPse, 'resultado' | 'asistente' | 'comoFunciona' | 'ayuda'>;
  urlPagar: string;
  whatsapp: Telefono;
}

export default function ResultadoPagoIsla({ textos, urlPagar, whatsapp }: Props) {
  return (
    <ResultadoPago
      textos={textos}
      pagos={servicios.pago.tipo === 'asistente' ? servicios.pago.pagos : null}
      urlPagar={urlPagar}
      enlaceWhatsapp={(mensaje) => enlaceWhatsapp(whatsapp, mensaje)}
    />
  );
}
