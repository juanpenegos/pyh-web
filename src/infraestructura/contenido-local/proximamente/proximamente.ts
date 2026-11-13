// CONTENIDO DE LA PÁGINA PROVISIONAL "PRÓXIMAMENTE" (destino de Blog y Pagos PSE mientras no existan).
// Este texto NO está en el diseño: es temporal y se puede cambiar libremente.

import type { ContenidoProximamente } from '@dominio/paginas/proximamente';
import { urls } from '../comun/urls';

export const proximamente: ContenidoProximamente = {
  seo: {
    titulo: 'En construcción | PyH+',
    descripcion: '',
  },
  titular: {
    partes: [{ texto: 'En construcción' }, { texto: '.', resaltado: true }],
  },
  texto: 'Estamos preparando esta sección. Mientras tanto, escríbenos y te ayudamos.',
  boton: { texto: 'Escríbenos por WhatsApp', url: urls.whatsapp },
  volver: { texto: 'Volver al inicio', url: urls.inicio },
};
