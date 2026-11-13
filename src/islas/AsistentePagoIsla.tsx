// CONECTOR de la isla del asistente de Pagos PSE (ver FormularioContactoIsla.tsx para la idea).
// Toma los servicios ya elegidos en src/infraestructura/servicios.ts y se los pasa al asistente.
import AsistentePago, { type PropsAsistentePago } from '@ui/organismos/pagos/AsistentePago';
import { servicios } from '@infraestructura/servicios';
import { enlaceWhatsapp } from '@aplicacion/contacto/enlacesContacto';
import type { Telefono } from '@dominio/empresa';

interface Props {
  textos: PropsAsistentePago['textos'];
  rutaRetorno: string;
  whatsapp: Telefono;
}

export default function AsistentePagoIsla({ textos, rutaRetorno, whatsapp }: Props) {
  const pago = servicios.pago;
  if (pago.tipo !== 'asistente') return null; // En ese caso la página usa PagoExterno
  return (
    <AsistentePago
      textos={textos}
      facturas={pago.facturas}
      pagos={pago.pagos}
      rutaRetorno={rutaRetorno}
      enlaceWhatsapp={(mensaje) => enlaceWhatsapp(whatsapp, mensaje)}
    />
  );
}
