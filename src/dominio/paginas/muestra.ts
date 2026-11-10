// DOMINIO — forma del contenido de la página TEMPORAL /muestra. Se borra antes de publicar.

import type { Enlace, Seo } from '../comunes';

export interface ContenidoMuestra {
  seo: Seo;
  titulo: string;
  aviso: string;
  secciones: {
    botones: string;
    tarjetas: string;
    clientes: string;
  };
  botones: {
    lima: Enlace;
    azul: Enlace;
    linea: Enlace;
    lineaBlanca: Enlace;
  };
}
