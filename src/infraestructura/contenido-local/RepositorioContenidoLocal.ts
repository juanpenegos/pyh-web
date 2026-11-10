// ADAPTADOR LOCAL — implementa el puerto RepositorioContenido leyendo los archivos .ts
// de esta carpeta (uno por página). Es el adaptador que se usa mientras no exista el CRM.

import type { RepositorioContenido } from '@aplicacion/puertos/RepositorioContenido';
import { comun } from './comun/comun';
import { inicio } from './inicio/inicio';
import { catalogo } from './catalogo/catalogo';
import { nosotros } from './nosotros/nosotros';
import { proximamente } from './proximamente/proximamente';
import { muestra } from './muestra/muestra';

export class RepositorioContenidoLocal implements RepositorioContenido {
  async obtenerComun() {
    return comun;
  }

  async obtenerInicio() {
    return inicio;
  }

  async obtenerCatalogo() {
    return catalogo;
  }

  async obtenerNosotros() {
    return nosotros;
  }

  async obtenerProximamente() {
    return proximamente;
  }

  async obtenerMuestra() {
    return muestra;
  }
}
