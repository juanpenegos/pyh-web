// Espera unos milisegundos. La usan los servicios falsos para parecerse a un servidor real.
export const esperar = (ms: number) => new Promise<void>((listo) => setTimeout(listo, ms));
