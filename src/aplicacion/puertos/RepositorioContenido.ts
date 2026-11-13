// PUERTO — qué contenido puede pedir el sitio, sin decir de dónde sale.
// Es una interfaz, igual que en Java: las páginas solo conocen esta lista de métodos.
//
// Hoy la implementa RepositorioContenidoLocal (textos en archivos .ts).
// Cuando llegue el CRM se crea otra clase que también la implemente (p. ej.
// RepositorioContenidoCrm) y se cambia una sola línea en src/infraestructura/repositorio.ts.
//
// Los métodos devuelven Promise porque el CRM responderá por internet (tarda un momento).
// Con los archivos locales la respuesta es inmediata, pero la forma es la misma.

import type { ContenidoComun } from '@dominio/paginas/comun';
import type { ContenidoInicio } from '@dominio/paginas/inicio';
import type { ContenidoCatalogo } from '@dominio/paginas/catalogo';
import type { ContenidoNosotros } from '@dominio/paginas/nosotros';
import type { ContenidoProximamente } from '@dominio/paginas/proximamente';
import type { ContenidoContacto } from '@dominio/paginas/contacto';
import type { ContenidoPagosPse } from '@dominio/paginas/pagosPse';

export interface RepositorioContenido {
  obtenerComun(): Promise<ContenidoComun>;
  obtenerInicio(): Promise<ContenidoInicio>;
  obtenerCatalogo(): Promise<ContenidoCatalogo>;
  obtenerNosotros(): Promise<ContenidoNosotros>;
  obtenerProximamente(): Promise<ContenidoProximamente>;
  obtenerContacto(): Promise<ContenidoContacto>;
  obtenerPagosPse(): Promise<ContenidoPagosPse>;
}
