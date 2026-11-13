/// <reference types="vitest/config" />
// CONFIGURACIÓN DE PRUEBAS (Vitest). Usa la misma configuración de Astro para que
// funcionen los atajos de import (@dominio, @aplicacion, @infraestructura…).
// Correr: pnpm test
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['pruebas/**/*.test.ts'],
    environment: 'node',
  },
});
