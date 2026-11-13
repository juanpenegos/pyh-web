// AYUDA COMÚN para validar un formulario con un esquema de Zod.
// Devuelve un objeto campo → primer mensaje de error. Vacío = todo bien.

import type { z } from 'zod';

export type ErroresFormulario<T> = Partial<Record<keyof T & string, string>>;

export function validar<T extends z.ZodType>(esquema: T, datos: unknown): ErroresFormulario<z.input<T>> {
  const resultado = esquema.safeParse(datos);
  if (resultado.success) return {};

  const errores: Record<string, string> = {};
  for (const problema of resultado.error.issues) {
    const campo = String(problema.path[0] ?? '');
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return errores as ErroresFormulario<z.input<T>>;
}

/** Deja solo los dígitos: "300 123 4567" → "3001234567". */
export function soloDigitos(texto: string): string {
  return texto.replace(/\D/g, '');
}
