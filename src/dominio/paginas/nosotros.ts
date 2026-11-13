// DOMINIO — forma del contenido de Nosotros (D-Nosotros y M-Nosotros).

import type { Enlace, Imagen, Video, Titular, Seo } from '../comunes';

/** Misión o visión: título pequeño, texto grande y una nota debajo. */
export interface BloquePrincipio {
  titulo: string;
  texto: string;
  nota: string;   // p. ej. "[Texto a validar con PyH+]"
}

export interface ContenidoNosotros {
  seo: Seo;

  migas: Enlace[];       // Inicio / Nosotros PyH+ (la última es la página actual)
  etiquetaMigas: string;

  // "Somos el + de tu obra."
  encabezado: {
    eyebrow: string;
    titular: Titular;
    texto: string;
    botones: { principal: Enlace; secundario: Enlace };
    foto: Imagen;
  };

  mision: BloquePrincipio;
  vision: BloquePrincipio;

  // "De dos plataformas a 43 metros" + video y foto del equipo
  historia: {
    titular: Titular;
    hitos: { anio: string; titulo: string; texto: string; actual?: boolean }[];
    video: { video: Video; etiqueta: string; ayuda: string };
    foto: { imagen: Imagen; etiqueta: string };
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
    lista: { sigla: string; titulo: string; documento: Enlace }[];
  };

  // "Las personas del +"
  equipo: {
    titular: Titular;
    nota: string;           // Solo en móvil (así está en M-Nosotros)
    etiquetaFoto: string;   // "FOTO", mientras no haya fotos
    personas: { nombre: string; cargo: string; foto?: Imagen }[];
  };

  // Políticas (acordeón con descarga)
  politicas: {
    id: string;             // Ancla para llegar desde el footer (/nosotros#politicas)
    titular: Titular;
    texto: string;
    descargar: string;      // Texto del botón "Descargar PDF"
    lista: { titulo: string; resumen: string; pdf: string }[];
  };
}
