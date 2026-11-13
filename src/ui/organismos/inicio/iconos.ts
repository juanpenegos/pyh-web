// Qué dibujo de Icono corresponde a cada ícono que puede pedir el contenido de Inicio.
import type { ComponentProps } from 'react';
import type Icono from '@ui/atomos/Icono';
import type { IconoInicio } from '@dominio/paginas/inicio';

export const dibujoIcono: Record<IconoInicio, ComponentProps<typeof Icono>['nombre']> = {
  documento: 'documento',
  escudo: 'escudo',
  persona: 'persona',
  camion: 'camion',
  flecha: 'flecha-subir',
  destello: 'destello',
  'flecha-doble': 'flecha-doble',
  mas: 'mas',
};
