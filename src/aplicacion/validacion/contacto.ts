// REGLAS DEL FORMULARIO DE CONTACTO (las mismas debe aplicar el backend; ver docs/api-contrato.md).
// - Nombre: 2 a 80 caracteres.          - Empresa: opcional, hasta 120.
// - Celular: colombiano, 10 dígitos que empiezan por 3 (se aceptan espacios).
// - Correo válido.                      - Mensaje: 10 a 1000 caracteres.
// - Aceptar la política de datos (Ley 1581 de 2012).

import { z } from 'zod';
import { soloDigitos } from './validar';

export const MOTIVOS = ['cotizacion', 'soporte', 'compra', 'facturacion', 'otro'] as const;

export const esquemaContacto = z.object({
  motivo: z.enum(MOTIVOS),
  nombre: z
    .string()
    .trim()
    .min(2, 'Escribe tu nombre (mínimo 2 letras).')
    .max(80, 'El nombre puede tener hasta 80 caracteres.'),
  empresa: z.string().trim().max(120, 'El nombre de la empresa puede tener hasta 120 caracteres.').optional(),
  celular: z
    .string()
    .transform(soloDigitos)
    .refine((celular) => /^3\d{9}$/.test(celular), 'Escribe un celular de 10 dígitos que empiece por 3.'),
  correo: z.string().trim().email('Revisa el correo: debe verse como nombre@empresa.com.'),
  mensaje: z
    .string()
    .trim()
    .min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).')
    .max(1000, 'El mensaje puede tener hasta 1000 caracteres.'),
  aceptaPolitica: z.literal(true, 'Para enviar, acepta la política de tratamiento de datos.'),
});

export type EntradaContacto = z.input<typeof esquemaContacto>;
export type ContactoValidado = z.output<typeof esquemaContacto>;
