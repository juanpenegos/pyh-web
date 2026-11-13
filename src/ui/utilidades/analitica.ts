// EVENTOS DE ANALÍTICA para Google Tag Manager (dataLayer).
// Si GTM no está instalado, no pasa nada: los eventos se guardan en la lista y nadie los lee.
// Nunca se envían datos personales (nombre, correo, celular, documento): solo qué pasó.

export type EventoAnalitica =
  | { event: 'contact_channel_click'; channel: 'whatsapp' | 'telefono' | 'correo' | 'mapa' }
  | { event: 'contact_form_submit'; topic: string }
  | { event: 'contact_form_success'; topic: string }
  | { event: 'pse_invoice_lookup'; result: 'found' | 'error' }
  | { event: 'pse_payment_start' }
  | { event: 'pse_payment_result'; status: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function emitirEvento(evento: EventoAnalitica): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(evento);
}
