// Rellena las plantillas de texto del contenido: "{n} resultados", "No encontramos «{busqueda}»".

import type { TextoCantidad } from '@dominio/paginas/catalogo';

export function textoCantidad(textos: TextoCantidad, n: number): string {
  return (n === 1 ? textos.uno : textos.varios).replace('{n}', String(n));
}

// La regla de plantillas es común a todo el sitio; se reexporta para no cambiar a quienes ya la usan.
export { rellenar } from '../comun/textos';
