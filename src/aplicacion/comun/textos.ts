// Rellena plantillas de texto del contenido: "Te respondemos sobre «{motivo}»" + { motivo: 'Cotización' }.
// Si falta un valor, deja la marca {clave} tal cual para que se note.

export function rellenar(plantilla: string, valores: Record<string, string>): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, clave: string) => valores[clave] ?? todo);
}
