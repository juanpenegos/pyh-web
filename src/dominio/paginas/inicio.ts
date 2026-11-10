// DOMINIO — forma del contenido de la página de Inicio (pantallas Main y M-Inicio).

import type { Enlace, Imagen, Video, Titular, Cifra, Certificacion, Pregunta, Seo } from '../comunes';
import type { Cliente } from '../cliente';

export interface ContenidoInicio {
  seo: Seo;

  // Hero con los dos videos
  hero: {
    titular: Titular;
    videos: Video[];
    accesosFamilias: Enlace[];   // Tijera eléctrica, Tijera diésel... Ver todo
    botonPrincipal: Enlace;
    botonSecundario: Enlace;
    sellos: Cifra[];             // ONAC, IPAF, 4272, 43 m
  };

  // Presentación corta ("Somos PyH+")
  nosotros: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    enlace: Enlace;
  };

  // Catálogo destacado ("Elige tu altura")
  catalogoDestacado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    enlace: Enlace;
    familias: {
      numero: string;
      nombre: string;
      resumen: string;
      descripcion: string;
      imagen: Imagen;
      video?: Video;
      url: string;
    }[];
  };

  // Asistente ("¿No sabes qué plataforma necesitas?")
  asistente: {
    eyebrow: string;
    titular: Titular;
    texto: string;
  };

  // Lista corta de garantías
  garantias: string[];

  // "Subimos personas. Bajamos riesgos."
  confianza: {
    titular: Titular;
    subtitular: Titular;
    texto: string;
    cifras: Cifra[];
    enlace: Enlace;
  };

  // Marquesina de clientes
  clientes: {
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
      enlace: Enlace;
    };
    cifra: Cifra;
    testimonio: {
      estrellas: number;
      cita: string;
      iniciales: string;
      nombre: string;
      cargo: string;
    };
  };

  // "Así se mueven" (clips de cada máquina)
  movimiento: {
    titular: Titular;
    clips: (Video & { texto: string })[];
  };

  // Preguntas frecuentes
  preguntas: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    enlace: Enlace;
    lista: Pregunta[];
  };

  // Certificaciones ("Seguro no es un eslogan.")
  certificaciones: {
    titular: Titular;
    texto: string;
    lista: Certificacion[];
    enlace: Enlace;
  };

  // Galería "En la obra, no en el catálogo."
  galeria: {
    titular: Titular;
    fotos: Imagen[];
    videos: Video[];
    cifra: Cifra;
    frase: string;
  };

  // "Lo que viene con el +"
  beneficios: {
    titular: Titular;
    lista: { numero: string; titulo: string; texto: string }[];
  };

  // Blog ("Aprende antes de subir")
  blog: {
    titular: Titular;
    enlace: Enlace;
    articulos: {
      categoria: string;
      lectura: string;
      titulo: string;
      imagen: Imagen;
      url: string;
    }[];
  };
}
