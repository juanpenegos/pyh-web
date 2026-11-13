// REGLA ÚNICA para armar enlaces de contacto a partir de los datos de la empresa.
// Nunca se escriben a mano "tel:+57…" ni "https://wa.me/…": se usan estas funciones.

import type { Telefono } from '@dominio/empresa';

/** tel:+573043649060 */
export function enlaceTelefono(telefono: Telefono): string {
  return `tel:+${telefono.numero}`;
}

/** https://wa.me/573043649060 (con mensaje ya escrito si se pasa `texto`) */
export function enlaceWhatsapp(telefono: Telefono, texto?: string): string {
  const base = `https://wa.me/${telefono.numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** mailto:correo@dominio.com */
export function enlaceCorreo(correo: string): string {
  return `mailto:${correo}`;
}
