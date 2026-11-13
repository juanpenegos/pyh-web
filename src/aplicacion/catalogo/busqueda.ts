// BÚSQUEDA POR TEXTO ("tijera 12 m", "jlg diesel"…).
// Cada palabra buscada debe aparecer al inicio de alguna palabra de la máquina
// (nombre, familia, marca, energía, terreno o modalidad). No importan tildes ni mayúsculas.

import type { Maquina } from '@dominio/maquina';

// Palabras que no ayudan a buscar
const PALABRAS_VACIAS = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'en', 'y', 'a', 'para', 'con', 'm', 'mts', 'metros']);

/** Quita tildes y pasa a minúsculas: "Diésel" → "diesel". */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function palabras(texto: string): string[] {
  return normalizar(texto).split(/[^a-z0-9]+/).filter(Boolean);
}

function palabrasDeMaquina(maquina: Maquina): string[] {
  return palabras(
    [maquina.nombre, maquina.familia, maquina.marca, maquina.energia, ...maquina.terreno, ...maquina.modalidad, String(maquina.alturaM)].join(' '),
  );
}

/** ¿La máquina coincide con lo buscado? Una búsqueda vacía coincide con todo. */
export function coincideBusqueda(maquina: Maquina, busqueda: string): boolean {
  const buscadas = palabras(busqueda).filter((p) => !PALABRAS_VACIAS.has(p));
  if (buscadas.length === 0) return true;
  const propias = palabrasDeMaquina(maquina);
  return buscadas.every((buscada) =>
    // Los números deben ser exactos ("12" no encuentra "120"); las palabras pueden estar incompletas ("tije")
    propias.some((propia) => (/^\d+$/.test(buscada) ? propia === buscada : propia.startsWith(buscada))),
  );
}
