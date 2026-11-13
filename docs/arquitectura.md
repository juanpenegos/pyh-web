# Arquitectura del sitio PyH+

## Capas (hexagonal, de adentro hacia afuera)

| Carpeta | Qué hay | Puede usar |
|---|---|---|
| `src/dominio` | Tipos del negocio (máquina, factura, mensaje, textos de cada página) | nada |
| `src/aplicacion` | Reglas (validación, filtros, formatos) y **puertos** (interfaces de servicios) | dominio |
| `src/infraestructura` | Contenido local, adaptadores (falsos, HTTP, WhatsApp) y `servicios.ts` | dominio, aplicacion |
| `src/ui` | Componentes (Atomic Design, ver abajo) | dominio, aplicacion |
| `src/islas` | Conectores: toman los servicios de `servicios.ts` y se los pasan a un organismo | todo |
| `src/pages` | Páginas: piden el contenido al repositorio y arman la página | todo |

`src/infraestructura/servicios.ts` es el **único** lugar que sabe qué implementación se usa (variables de `.env.example`).

## `src/ui` — Atomic Design

| Carpeta | Qué es | Ejemplos |
|---|---|---|
| `atomos/` | Piezas mínimas, sin lógica de negocio | `Boton`, `Chip`, `Control` (Entrada, Seleccion, AreaTexto), `Casilla`, `Cargando`, `Sello`, `Eyebrow`, `Icono`, `Logo`, `Titular`, `BarraProgreso`, `VideoAuto` |
| `moleculas/` | Varios átomos juntos con un propósito | `Campo`, `GrupoChips`, `Alerta`, `Migas`, `TarjetaMaquina`, `TarjetaCanal`, `TarjetaSede`, `MapaSede`, `Buscador`, `BotonWhatsapp` |
| `organismos/<página>/` | Secciones completas; `comunes/` = header, footer, menú móvil | `FormularioContacto`, `AsistentePago`, `HeroInicio`… |
| `plantillas/` | Esqueleto de página | `Layout.astro` |
| `estilos/` | Tokens, estilos globales y de formulario | `tokens.css`, `global.css`, `formulario.css` |
| `utilidades/` | Ayudas de UI sin dibujo | `enlaces.ts`, `analitica.ts`, `useDialogoModal.ts` |

Reglas:
- No escribir `class="btn …"`, `chip`, `eyebrow`, `sello` ni `campo__control` a mano: usar el átomo.
- En `.astro`, `Boton.astro` (recibe un `Enlace`) o `Boton.tsx` con hijos. Sin `client:`, un componente React sale como HTML puro (0 KB de JavaScript).
- Los átomos pasan los atributos extra al HTML para que les lleguen los estilos con alcance de cada `.astro`.
- La lógica de un organismo grande va en un hook aparte (ej. `useFormularioContacto.ts`); el componente solo dibuja.

## Principios

- **SOLID**: una responsabilidad por archivo; puertos pequeños (`ServicioContacto`, `ServicioFacturas`, `ServicioPagos`); la forma de pago es `FormaDePago` (asistente o enlace externo), así ningún adaptador finge operaciones.
- **YAGNI**: no se crea nada que hoy no se use. El captcha se agrega cuando se elija proveedor. Los adaptadores HTTP sí se quedan: son el contrato con el backend (`docs/api-contrato.md`).
- **Core Web Vitals**: JavaScript solo donde hay interacción (`client:visible` si está abajo, `client:load` si está arriba). En modo `redirect`, Pagos PSE no manda React: es HTML puro.
- **Mejora progresiva**: todo enlace funciona sin JavaScript; los formularios avisan con `<noscript>` y usan `method="post"` para que los datos nunca queden en la dirección.
- **Accesibilidad primero**: WCAG 2.2 AA, áreas táctiles de 44 px, foco visible, `aria-disabled` (no `disabled`) en botones ocupados para no perder el foco, errores ligados con `aria-describedby`, foco al título al cambiar de paso.

## Comandos

`pnpm dev` · `pnpm build` · `pnpm test` (Vitest, carpeta `pruebas/`) · tipos: `npx -p typescript@5.9.3 tsc --noEmit -p tsconfig.json`
