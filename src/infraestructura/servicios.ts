// AQUÍ SE ELIGE QUÉ IMPLEMENTACIÓN USA CADA SERVICIO (único punto de "cableado").
// Es el ÚNICO archivo del sitio que conoce las implementaciones; las pantallas solo
// conocen las interfaces (puertos) de src/aplicacion/puertos.
//
// Se elige con variables de entorno (ver .env.example). Llevan el prefijo PUBLIC_
// porque las lee el navegador:
//   PUBLIC_API_BASE_URL    dirección del backend (vacía = se usan los servicios falsos)
//   PUBLIC_CONTACT_MODE    mock | http | whatsapp      (por defecto: whatsapp)
//   PUBLIC_PAYMENTS_MODE   mock | http | redirect      (por defecto: redirect)

import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { FormaDePago } from '@aplicacion/pagos/formaDePago';
import type { MotivoContacto } from '@dominio/contacto';

import { ClienteHttp } from './servicios/http/ClienteHttp';
import { ContactoFalso } from './servicios/contacto/ContactoFalso';
import { ContactoHttp } from './servicios/contacto/ContactoHttp';
import { ContactoWhatsapp } from './servicios/contacto/ContactoWhatsapp';
import { FacturasFalso } from './servicios/pagos/FacturasFalso';
import { FacturasHttp } from './servicios/pagos/FacturasHttp';
import { PagosFalso } from './servicios/pagos/PagosFalso';
import { PagosHttp } from './servicios/pagos/PagosHttp';
import { empresa } from './contenido-local/comun/empresa';
import { contacto } from './contenido-local/contacto/contacto';

export type ModoContacto = 'mock' | 'http' | 'whatsapp';
export type ModoPagos = 'mock' | 'http' | 'redirect';

export interface Configuracion {
  urlApi: string;
  modoContacto: ModoContacto;
  modoPagos: ModoPagos;
}

export interface Servicios {
  contacto: ServicioContacto;
  pago: FormaDePago;
}

const elegir = <T extends string>(valor: string | undefined, opciones: readonly T[], porDefecto: T): T =>
  opciones.find((o) => o === valor) ?? porDefecto;

/** Lee las variables de entorno. Si "http" no tiene dirección del backend, usa el servicio falso. */
export function leerConfiguracion(env: Record<string, string | undefined>): Configuracion {
  const urlApi = (env.PUBLIC_API_BASE_URL ?? '').trim();
  let modoContacto = elegir(env.PUBLIC_CONTACT_MODE, ['mock', 'http', 'whatsapp'] as const, 'whatsapp');
  let modoPagos = elegir(env.PUBLIC_PAYMENTS_MODE, ['mock', 'http', 'redirect'] as const, 'redirect');
  if (!urlApi && modoContacto === 'http') modoContacto = 'mock';
  if (!urlApi && modoPagos === 'http') modoPagos = 'mock';
  return { urlApi, modoContacto, modoPagos };
}

/** Nombre de cada motivo para el mensaje de WhatsApp ("cotizacion" → "Cotización"). */
const nombresMotivos = Object.fromEntries(
  contacto.formulario.motivos.map((m) => [m.valor, m.texto]),
) as Record<MotivoContacto, string>;

export function crearServicios(config: Configuracion): Servicios {
  const http = new ClienteHttp(config.urlApi);

  const servicioContacto: Record<ModoContacto, () => ServicioContacto> = {
    mock: () => new ContactoFalso(),
    http: () => new ContactoHttp(http),
    whatsapp: () => new ContactoWhatsapp(empresa.celular, { ...contacto.whatsapp, motivos: nombresMotivos }),
  };

  const formaDePago: Record<ModoPagos, () => FormaDePago> = {
    mock: () => ({ tipo: 'asistente', facturas: new FacturasFalso(), pagos: new PagosFalso() }),
    http: () => ({ tipo: 'asistente', facturas: new FacturasHttp(http), pagos: new PagosHttp(http) }),
    redirect: () => ({ tipo: 'externo', url: empresa.pagoPse }),
  };

  return {
    contacto: servicioContacto[config.modoContacto](),
    pago: formaDePago[config.modoPagos](),
  };
}

export const servicios: Servicios = crearServicios(leerConfiguracion(import.meta.env));
