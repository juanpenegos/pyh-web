// FORMATO de montos y fechas para mostrar una factura.
// Se hace a mano (sin Intl) para que salga igual en todos los navegadores y en el servidor.

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** 2380000 → "$2.380.000" */
export function formatearPesos(valor: number): string {
  const entero = Math.round(valor);
  const signo = entero < 0 ? '-' : '';
  return `${signo}$${String(Math.abs(entero)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

/** "2026-10-30" (o una fecha ISO completa) → "30 oct 2026" */
export function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.slice(0, 10).split('-').map(Number);
  if (!anio || !mes || !dia) return iso;
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}
