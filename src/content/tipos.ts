// FORMAS DE LOS DATOS
// Aquí solo se describe "qué campos tiene" cada cosa (un enlace, una imagen, una máquina...).
// Los textos reales viven en inicio.ts, catalogo.ts, nosotros.ts y comun.ts.
// Más adelante el CRM entregará datos con estas mismas formas.

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

/** Una máquina del catálogo. */
export interface Maquina {
  id: string;
  nombre: string;
  familia: string;      // Tijera eléctrica, Brazo articulado...
  energia: string;      // Eléctrica, Diésel
  alturaM: number;      // Altura de trabajo en metros (sirve para filtrar y ordenar)
  terreno: string[];    // Interior, Exterior...
  marca: string;
  modalidad: string[];  // Alquiler, Venta
  capacidad: string;    // p. ej. "230 kg"
  imagen: Imagen;
  insignia?: string;    // p. ej. "Más alquilado"
  disponibilidad: string; // Disponible hoy, Bajo reserva...
  url: string;
}

/** Un cliente (logo en la marquesina). */
export interface Cliente {
  nombre: string;
  logo: Imagen;
}
