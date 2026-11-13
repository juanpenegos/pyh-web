// DOMINIO — forma del contenido de la página Contacto (D-Contacto / M-Contacto).

import type { Enlace, Imagen, Seo, Titular } from '../comunes';
import type { MotivoContacto } from '../contacto';

/** Una tarjeta de canal: WhatsApp, Llámanos, Escríbenos, Visítanos. */
export interface CanalContacto {
  canal: 'whatsapp' | 'telefono' | 'correo' | 'mapa';
  titulo: string;
  valor: string;     // "304 364 9060", el correo o la dirección
  ayuda: string;     // "Respuesta en minutos"
  url: string;
  tono: 'lima' | 'azul' | 'hielo' | 'suave';
}

/** Un campo de texto del formulario. */
export interface TextosCampo {
  etiqueta: string;
  placeholder?: string;
}

export interface TextosFormularioContacto {
  etiqueta: string;          // Nombre del formulario para lectores de pantalla
  titular: Titular;
  preguntaMotivo: string;
  motivos: { valor: MotivoContacto; texto: string; ayuda: string }[];
  campos: {
    nombre: TextosCampo;
    empresa: TextosCampo;
    celular: TextosCampo;
    correo: TextosCampo;
    mensaje: TextosCampo;
  };
  // Casilla de la política: antes + enlace + despues ("Acepto la " + "política…" + ".")
  politica: { antes: string; enlace: Enlace; despues: string };
  trampa: string;            // Campo oculto contra robots (lo leen solo los lectores de pantalla)
  enviar: string;
  enviando: string;
  revisaCampos: string;      // Aviso arriba del botón cuando hay campos con error
  sinJavascript: string;     // Aviso si el navegador no tiene JavaScript (el formulario no puede enviar)
  reintentar: string;
  exito: {
    titular: Titular;
    texto: string;           // Plantilla con {motivo}
    otro: string;
  };
}

/** Textos del mensaje que se arma en WhatsApp (modo temporal sin backend). */
export interface TextosWhatsappContacto {
  saludo: string;
  etiquetas: { motivo: string; nombre: string; empresa: string; celular: string; correo: string; mensaje: string };
}

export interface ContenidoContacto {
  seo: Seo;
  migas: Enlace[];
  etiquetaMigas: string;
  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
  };
  canales: CanalContacto[];
  formulario: TextosFormularioContacto;
  whatsapp: TextosWhatsappContacto;
  mapa: {
    id: string;
    imagen: Imagen;          // Captura del mapa (WebP): se ve hasta que la persona toca "Ver en Google Maps"
    imagenAvif?: string;     // La misma captura en AVIF (más liviana)
    boton: string;
    etiquetaBoton: string;   // Para lectores de pantalla
    tituloMapa: string;      // Título del mapa de Google (iframe)
    url: string;             // Mapa de Google que se pone dentro de la página
  };
  sede: {
    titulo: string;
    direccion: string;
    horario: string;
    comoLlegar: Enlace;
  };
}
