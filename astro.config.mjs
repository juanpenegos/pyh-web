// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Dominio oficial: se usa para la dirección canónica de cada página (SEO)
  site: 'https://alquilerpyh.com',
  integrations: [react()]
});
