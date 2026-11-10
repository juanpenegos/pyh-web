// AQUÍ SE ELIGE DE DÓNDE SALE EL CONTENIDO DEL SITIO.
// Las páginas (src/pages) importan `repositorio` y le piden el contenido:
//   const inicio = await repositorio.obtenerInicio();
//
// Hoy: archivos locales. Cuando exista el CRM, basta con cambiar la línea de abajo por
//   export const repositorio: RepositorioContenido = new RepositorioContenidoCrm();
// y nada más en el sitio tiene que cambiar.

import type { RepositorioContenido } from '@aplicacion/puertos/RepositorioContenido';
import { RepositorioContenidoLocal } from './contenido-local/RepositorioContenidoLocal';

export const repositorio: RepositorioContenido = new RepositorioContenidoLocal();
