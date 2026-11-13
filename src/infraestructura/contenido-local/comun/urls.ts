// DIRECCIONES que se repiten en todo el sitio. Cambiarlas aquí las cambia en todas partes.
// Las usan comun.ts, catalogo.ts, proximamente.ts, contacto.ts y pagosPse.ts.
// Teléfono, WhatsApp y correo se arman con los datos de empresa.ts (no se escriben a mano).

import { empresa } from './empresa';
import { enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from '@aplicacion/contacto/enlacesContacto';

// Ancla de la sección Políticas dentro de Nosotros (la usan nosotros.ts y los enlaces legales del footer)
export const ANCLA_POLITICAS = 'politicas';

// Ancla del mapa dentro de Contacto (la usa la tarjeta "Visítanos")
export const ANCLA_MAPA = 'mapa';

export const urls = {
  inicio: '/',
  catalogo: '/catalogo',
  nosotros: '/nosotros',
  politicas: `/nosotros#${ANCLA_POLITICAS}`,
  contacto: '/contacto',
  pagosPse: '/pagos-pse',
  pagosPseResultado: '/pagos-pse/resultado', // Página a la que vuelve el banco
  proximamente: '/proximamente',          // Blog, mientras no exista
  clientes: '/proximamente',              // TEMPORAL: poner aquí la dirección de la página de Clientes
  whatsapp: enlaceWhatsapp(empresa.celular), // Cotizar, mientras no exista el cotizador
  telefono: enlaceTelefono(empresa.celular),
  correo: enlaceCorreo(empresa.correo),
};
