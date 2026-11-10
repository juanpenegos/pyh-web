// DOMINIO — forma del contenido de Nosotros (D-Nosotros y M-Nosotros).

import type { Enlace, Imagen, Video, Titular, Certificacion, Pregunta, Seo } from '../comunes';

export interface ContenidoNosotros {
  seo: Seo;

  migas: Enlace[];   // Inicio / Nosotros PyH+

  // "Somos el + de tu obra."
  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    boton: Enlace;
    foto: Imagen;
  };

  mision: { titulo: string; texto: string };
  vision: { titulo: string; texto: string };

  // "De dos plataformas a 43 metros"
  historia: {
    eyebrow: string;
    titular: Titular;
    hitos: { anio: string; titulo: string; texto: string }[];
  };

  // Video del equipo en ferias
  video: {
    ayuda: string;
    etiquetas: string[];
    video: Video;
  };

  // "Lo que no negociamos"
  valores: {
    titular: Titular;
    lista: { numero: string; titulo: string; texto: string }[];
  };

  // "Certificados, no promesas"
  certificados: {
    titular: Titular;
    texto: string;
    lista: Certificacion[];
  };

  // "Las personas del +"
  equipo: {
    titular: Titular;
    personas: { nombre: string; cargo: string; foto?: Imagen }[];
  };

  // Políticas (acordeón con descarga)
  politicas: {
    titulo: string;
    texto: string;
    descargar: string;
    lista: (Pregunta & { pdf: string })[];
  };
}
