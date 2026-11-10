// DOMINIO — piezas básicas que se repiten en todo el sitio.
// El dominio solo describe "qué campos tiene" cada cosa. No sabe nada de Astro, React,
// ni de dónde vienen los datos (archivos locales hoy, CRM mañana).

/** Un enlace o botón: lo que se lee y a dónde lleva. */
export interface Enlace {
  texto: string;
  url: string;
}

/** Una imagen. `src` es la ruta dentro de public/, p. ej. "/media/archivo.webp". */
export interface Imagen {
  src: string;
  alt: string;
}

/** Un video corto sin sonido. `poster` es la imagen que se ve mientras carga. */
export interface Video {
  src: string;
  poster: string;
  alt: string;
}

/**
 * Un titular partido en partes, para pintar de otro color una palabra
 * (p. ej. "Elige tu" + "altura" en verde) y el punto final.
 */
export interface Titular {
  partes: { texto: string; resaltado?: boolean }[];
}

/** Una cifra destacada, p. ej. "43 m" / "Nuestro equipo más alto". */
export interface Cifra {
  valor: string;
  etiqueta: string;
}

/** Una certificación o norma, p. ej. ONAC, IPAF, Res. 4272. */
export interface Certificacion {
  sigla: string;
  titulo: string;
  descripcion: string;
  documento?: Enlace;
}

/** Una pregunta frecuente o un elemento de acordeón. */
export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

/** Título y descripción de una página para el navegador y Google. */
export interface Seo {
  titulo: string;
  descripcion: string;
}
