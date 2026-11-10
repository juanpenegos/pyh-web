// DOMINIO — forma del contenido de la página provisional "Próximamente" (Blog y Pagos PSE).

import type { Enlace, Titular, Seo } from '../comunes';

export interface ContenidoProximamente {
  seo: Seo;
  titular: Titular;
  texto: string;
  boton: Enlace;
  volver: Enlace;
}
