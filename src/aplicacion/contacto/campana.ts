// PARÁMETROS DE CAMPAÑA (Google Ads, redes): lee utm_* y gclid de la dirección
// para adjuntarlos al mensaje. Solo guarda los conocidos; ignora el resto.

import type { MotivoContacto, ParametrosCampana } from '@dominio/contacto';
import { MOTIVOS } from '../validacion/contacto';

const CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;

export function leerCampana(busqueda: string): ParametrosCampana | undefined {
  const parametros = new URLSearchParams(busqueda);
  const campana: ParametrosCampana = {};
  for (const clave of CLAVES) {
    const valor = parametros.get(clave);
    if (valor) campana[clave] = valor.slice(0, 200);
  }
  return Object.keys(campana).length ? campana : undefined;
}

/** "?motivo=facturacion" → 'facturacion' (lo usa Pagos PSE en "¿Problemas con el pago?"). */
export function leerMotivo(busqueda: string): MotivoContacto | undefined {
  const motivo = new URLSearchParams(busqueda).get('motivo');
  return MOTIVOS.find((m) => m === motivo);
}
