// DOMINIO — forma del contenido de la página de Inicio (pantallas Main y M-Inicio).
// Las secciones van en el mismo orden en que aparecen en la página.

import type { Enlace, Imagen, Video, Titular, Cifra, Certificacion, Pregunta, Seo } from '../comunes';
import type { Cliente } from '../cliente';

/** Íconos que puede llevar una garantía o un beneficio (el dibujo lo pone la interfaz). */
export type IconoInicio = 'documento' | 'escudo' | 'persona' | 'camion' | 'flecha' | 'destello' | 'flecha-doble' | 'mas';

/** Una pregunta del asistente con sus opciones. */
export interface PreguntaAsistente {
  pregunta: string;
  opciones: { titulo: string; descripcion: string }[];
}

/** Lo que recomienda el asistente al terminar. */
export interface RecomendacionAsistente {
  equipo: string;   // "Tijera eléctrica de 12 m"
  motivo: string;   // Por qué se recomienda
  imagen: Imagen;
}

/** Contenido del asistente de 3 preguntas (lo usa la isla de React AsistenteInicio). */
export interface ContenidoAsistente {
  eyebrow: string;
  titular: Titular;
  texto: string;
  /** "{actual}" y "{total}" se reemplazan por el número de paso. */
  etiquetaPaso: string;
  preguntas: PreguntaAsistente[];
  /** La recomendación depende de la respuesta a la pregunta de altura. */
  preguntaQueDecide: number;           // Posición de esa pregunta (0 = la primera)
  recomendaciones: RecomendacionAsistente[]; // Una por cada opción de esa pregunta, en el mismo orden
  recomendacionPorDefecto: number;     // Cuál usar si no se respondió esa pregunta
  enlaceSaltar: Enlace;
  botonAtras: string;
  eyebrowResultado: string;
  botonCotizar: Enlace;
  botonReiniciar: string;
}

export interface ContenidoInicio {
  seo: Seo;

  /** Texto del indicador de los carruseles en móvil ("Desliza"). */
  desliza: string;

  // Hero con los videos
  hero: {
    titular: Titular;
    videos: Video[];
    botonPrincipal: Enlace;
    botonSecundario: Enlace;
    etiquetaAccesos: string;     // Nombre de la lista para lectores de pantalla
    accesosFamilias: Enlace[];   // Tijera eléctrica, Tijera diésel... (sin "Ver todo")
    accesoTodo: Enlace;          // "Ver todo" (va resaltado en verde)
  };

  // Franja amarilla de sellos (ONAC, IPAF, 4272, 43 m)
  sellos: {
    etiqueta: string;            // Nombre de la sección para lectores de pantalla
    lista: Cifra[];
    botonSiguientes: string;     // Flechas del carrusel en móvil
    botonAnteriores: string;
  };

  // Presentación corta ("Somos PyH+.")
  nosotros: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    enlace: Enlace;
    imagen: Imagen;
  };

  // Catálogo destacado ("Elige tu altura.")
  catalogoDestacado: {
    eyebrow: string;
    titular: Titular;
    texto: string;          // Escritorio ("Pasa el cursor...")
    textoMovil: string;     // Móvil ("Desliza...")
    enlace: Enlace;
    familias: {
      numero: string;       // "+01"
      nombre: string;
      resumen: string;      // "Hasta 14 m · interior"
      descripcion: string;  // Aparece al pasar el cursor
      imagen: Imagen;
      alturaImagen: number; // Alto de la foto en escritorio, en px (en móvil se usa el 75 %)
      url: string;
    }[];
  };

  // Asistente ("¿No sabes qué plataforma necesitas?")
  asistente: ContenidoAsistente;

  // "Subimos personas. Bajamos riesgos. Ese es el +."
  confianza: {
    etiqueta: string;       // Nombre de la sección para lectores de pantalla
    titular: Titular;
    texto: string;
    imagen: Imagen;         // Máquina sobre el arco
    garantias: { texto: string; icono: IconoInicio }[];
    cifras: Cifra[];
    enlace: Enlace;
  };

  // Marquesina de clientes
  clientes: {
    etiqueta: string;
    titulo: string;
    lista: Cliente[];
  };

  // Casos ("Casos que subieron de nivel.")
  casos: {
    titular: Titular;
    destacado: {
      etiquetas: string[];
      titulo: string;
      imagen: Imagen;
      enlace: Enlace;       // El texto es "Ver el caso →"
    };
    cifra: Cifra;
    testimonio: {
      estrellas: number;
      etiquetaEstrellas: string; // "5 de 5 estrellas" (para lectores de pantalla)
      cita: string;
      iniciales: string;
      nombre: string;
      cargo: string;
    };
  };

  // "Así se mueven." (un clip por familia)
  movimiento: {
    titular: Titular;
    /** En escritorio se lee "Etiqueta: texto"; en móvil la etiqueta va arriba y el texto debajo. */
    clips: { video: Video; etiqueta: string; texto: string }[];
  };

  // Preguntas frecuentes
  preguntas: {
    etiqueta: string;
    eyebrow: string;
    titular: Titular;
    /** El párrafo lleva un enlace en medio: textoAntes + enlace + textoDespues. */
    textoAntes: string;
    enlace: Enlace;
    textoDespues: string;
    lista: Pregunta[];
  };

  // Certificaciones ("Seguro no es un eslogan. Es un papel firmado.")
  certificaciones: {
    titular: Titular;
    texto: string;
    etiquetaDescripcion: string; // "¿Qué es?" (aparece al pasar el cursor o tocar)
    lista: Certificacion[];
    enlace: Enlace;
  };

  // Galería "En la obra, no en el catálogo."
  galeria: {
    etiqueta: string;
    titular: Titular;
    video: Video;
    fotos: Imagen[];        // Dos fotos
    cifra: Cifra;           // "14 m" sobre una foto
    fotoCifra: Imagen;
    frase: string;          // Tarjeta verde ("Llega donde\nla escalera no.")
    imagenFrase: Imagen;
  };

  // "Lo que viene con el +"
  beneficios: {
    titular: Titular;
    lista: { numero: string; titulo: string; texto: string; icono: IconoInicio }[];
  };

  // Blog ("Aprende antes de subir.")
  blog: {
    titular: Titular;
    enlace: Enlace;
    articulos: {
      categoria: string;    // "Normativa · 6 min"
      titulo: string;
      imagen: Imagen;
      url: string;
    }[];
  };
}
