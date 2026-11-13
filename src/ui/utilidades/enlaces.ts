// REGLA ÚNICA para enlaces: los que van a otro sitio (p. ej. WhatsApp) se abren en una pestaña nueva.
// Todos los componentes usan esta función en lugar de repetir la regla.
// Uso: <a href={url} {...atributosEnlace(url)}>

export function esExterno(url: string): boolean {
  return url.startsWith('http');
}

export function atributosEnlace(url: string): { target?: '_blank'; rel?: string } {
  return esExterno(url) ? { target: '_blank', rel: 'noopener' } : {};
}
