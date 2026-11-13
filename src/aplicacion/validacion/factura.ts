// REGLAS PARA BUSCAR UNA FACTURA (las mismas debe aplicar el backend; ver docs/api-contrato.md).
// - NIT: 9 o 10 dígitos (con o sin dígito de verificación; se aceptan puntos y guion).
// - Cédula de ciudadanía o de extranjería: 5 a 10 dígitos.
// - Factura: "FE-" seguido de números (se acepta en minúsculas: "fe-123" → "FE-123").

import { z } from 'zod';
import { soloDigitos } from './validar';

export const TIPOS_DOCUMENTO = ['NIT', 'CC', 'CE'] as const;

const campos = z.object({
  tipoDocumento: z.enum(TIPOS_DOCUMENTO),
  numeroDocumento: z.string().transform(soloDigitos),
  numeroFactura: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^FE-\d{1,10}$/, 'El número de factura se ve así: FE-12345.'),
});

// El largo del documento depende de su tipo. `when` hace que esta regla se revise
// aunque otro campo (p. ej. la factura) tenga error, para mostrar todos los errores juntos.
const tipoYDocumentoValidos = campos.pick({ tipoDocumento: true, numeroDocumento: true });
const revisarSiempre = {
  when: (p: { value: unknown }) => tipoYDocumentoValidos.safeParse(p.value).success,
};

export const esquemaFactura = campos
  .refine((d) => d.tipoDocumento !== 'NIT' || /^\d{9,10}$/.test(d.numeroDocumento), {
    path: ['numeroDocumento'],
    message: 'El NIT tiene 9 o 10 dígitos.',
    ...revisarSiempre,
  })
  .refine((d) => d.tipoDocumento === 'NIT' || /^\d{5,10}$/.test(d.numeroDocumento), {
    path: ['numeroDocumento'],
    message: 'La cédula tiene de 5 a 10 dígitos.',
    ...revisarSiempre,
  });

export type EntradaFactura = z.input<typeof esquemaFactura>;
export type FacturaValidada = z.output<typeof esquemaFactura>;
