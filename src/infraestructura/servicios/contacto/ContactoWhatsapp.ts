// ADAPTADOR WHATSAPP de contacto (solución temporal, igual que el sitio actual):
// arma un texto con los datos del formulario y abre WhatsApp con ese mensaje ya escrito.
// La persona solo tiene que tocar "Enviar" en WhatsApp.

import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { AcuseMensaje, MensajeContacto, MotivoContacto } from '@dominio/contacto';
import type { Telefono } from '@dominio/empresa';
import { enlaceWhatsapp } from '@aplicacion/contacto/enlacesContacto';

/** Textos del mensaje de WhatsApp (viven en contenido-local/contacto/contacto.ts). */
export interface PlantillaWhatsapp {
  saludo: string;
  motivos: Record<MotivoContacto, string>;
  etiquetas: { motivo: string; nombre: string; empresa: string; celular: string; correo: string; mensaje: string };
}

type Abrir = (url: string) => void;

/** Abre WhatsApp en otra pestaña; si el navegador lo bloquea, abre en la misma. */
const abrirEnNavegador: Abrir = (url) => {
  const ventana = window.open(url, '_blank', 'noopener');
  if (!ventana) window.location.href = url;
};

export class ContactoWhatsapp implements ServicioContacto {
  constructor(
    private readonly telefono: Telefono,
    private readonly plantilla: PlantillaWhatsapp,
    private readonly abrir: Abrir = abrirEnNavegador,
  ) {}

  /** El texto que se escribe en WhatsApp (sin los campos vacíos). */
  armarTexto(m: MensajeContacto): string {
    const { etiquetas: e } = this.plantilla;
    const lineas = [
      this.plantilla.saludo,
      `${e.motivo}: ${this.plantilla.motivos[m.motivo]}`,
      `${e.nombre}: ${m.nombre}`,
      m.empresa ? `${e.empresa}: ${m.empresa}` : '',
      `${e.celular}: ${m.celular}`,
      `${e.correo}: ${m.correo}`,
      `${e.mensaje}: ${m.mensaje}`,
    ];
    return lineas.filter(Boolean).join('\n');
  }

  async enviar(m: MensajeContacto): Promise<AcuseMensaje> {
    this.abrir(enlaceWhatsapp(this.telefono, this.armarTexto(m)));
    return { id: `whatsapp-${m.idSolicitud}`, recibidoEn: new Date().toISOString() };
  }
}
