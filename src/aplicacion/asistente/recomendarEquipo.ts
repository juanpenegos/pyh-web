// CASO DE USO — qué equipo recomienda el asistente según las respuestas.
// Es lógica pura (sin pantalla): recibe el contenido del asistente y las respuestas, y devuelve
// la recomendación. Así la pantalla (AsistenteInicio) solo dibuja, y la regla se puede cambiar
// o probar sin tocar la interfaz.

import type { ContenidoAsistente, RecomendacionAsistente } from '@dominio/paginas/inicio';

/** `respuestas[i]` es la opción elegida en la pregunta i (o undefined si no se respondió). */
export function recomendarEquipo(asistente: ContenidoAsistente, respuestas: (number | undefined)[]): RecomendacionAsistente {
  const { recomendaciones, recomendacionPorDefecto, preguntaQueDecide } = asistente;
  const elegida = respuestas[preguntaQueDecide];
  return recomendaciones[elegida ?? recomendacionPorDefecto] ?? recomendaciones[recomendacionPorDefecto];
}

/** Texto "Paso 1 de 3" a partir de la plantilla del contenido. */
export function textoPaso(plantilla: string, actual: number, total: number): string {
  return plantilla.replace('{actual}', String(actual)).replace('{total}', String(total));
}
