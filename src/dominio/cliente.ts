// DOMINIO — un cliente de PyH+ (su logo aparece en la marquesina de Inicio).

import type { Imagen } from './comunes';

export interface Cliente {
  nombre: string;
  logo: Imagen;
}
