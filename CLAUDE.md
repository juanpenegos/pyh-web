# PyH+ — sitio web (versión de desarrollo)

Sitio provisional en línea para el cliente PyH+ (alquiler de plataformas elevadoras, Colombia).
Alcance de esta entrega: **Inicio, Catálogo y Nosotros**, en escritorio y móvil.

## Reglas de trabajo
- El usuario es principiante en programación (Java principalmente). Responde siempre en **español**, explica en lenguaje natural y **no hagas cambios que no te pida**. Antes de una tarea grande, haz preguntas.
- El resultado debe verse **igual al diseño**. Después de construir cada sección, compárala con su pantalla de referencia y corrige diferencias (espacios, tamaños, colores, tipografía).

## Stack
- **Astro** (sitio estático). **React solo en islas interactivas**: asistente (chat), filtros del catálogo y menú móvil.
- CSS propio con variables (tokens). Sin librerías de UI.
- Despliegue provisional: Vercel o Netlify.

## Textos como variables (regla clave)
- **Ningún texto visible va escrito dentro de los componentes.** Todo vive en archivos de contenido separados, p. ej. `src/content/inicio.ts`, `catalogo.ts`, `nosotros.ts`, `comun.ts` (header, footer, contacto, menú).
- Los componentes solo reciben esas variables. Para cambiar un texto basta editar la variable. Más adelante el CRM reemplazará esos archivos por datos remotos, así que mantén la estructura simple (objetos y listas con nombres claros).
- Lo mismo para listas de productos, clientes, cifras y enlaces.
- Los textos pendientes del cliente se dejan como valores temporales **tal como están en el diseño** (ver PLAN.md).

## Carpeta `diseno/` (solo referencia)
- `diseno/pantallas/*.dc.html` son archivos del editor de diseño con etiquetas especiales (`<x-dc>`, `<helmet>`, `{{ }}`, `<sc-if>`, `<sc-for>`). **No se ejecutan ni se copian**: se leen para extraer medidas, colores, textos y estructura.
- `Sistema.dc.html` es la guía de marca (colores, tipografías, formas, escala de títulos).
- Pantallas: `Main` (Inicio escritorio), `M-Inicio`, `D-Catalogo`, `M-Catalogo`, `M-Filtros`, `M-SinResultados`, `D-Nosotros`, `M-Nosotros`, `M-Menu`, `M-Asistente`, `Sistema`.
- Si hay capturas en `diseno/capturas/`, úsalas como referencia visual principal.
- Imágenes y videos: carpeta `media/` (inventario en `MEDIA.md`). Los GIF originales son `.mp4`.

## Tokens de diseño
Tipografías: **Exo 2** (titulares, pesos 600–900) y **Arial/Arimo** (texto).
Colores:
- Azul petróleo `#00475D`, azul oscuro `#062A33`, `#00313F`, azul medio `#3F809C`, `#336E88` (enlaces pequeños), `#AEC7CF`
- Verde acción `#89E462` (solo botones/acciones), `#A3EC83`, `#609839` (solo texto grande), `#46772A` (texto verde pequeño)
- Amarillo `#FFD406`
- Neutros: `#4E5258`, `#6B7075` (gris texto pequeño), `#A6A6A6`, `#E6E6E6`, `#F5F7F6`, `#E8F0F2`, `#F2FFE5`
Formas: esquinas cortadas con `clip-path`; máquinas como recortes flotantes; motivo "+"; titulares cortos que terminan en punto.
Escala de títulos — escritorio: Display 96 (Nosotros), H1 72 (Inicio, Catálogo), H2 64. Móvil: H1 66, H2 38. Texto corrido mínimo 13px (eyebrow 12px permitido).

## Accesibilidad mínima
`<main>`, enlace "saltar al contenido", foco visible, `alt` en imágenes, videos con `muted loop playsinline` y `prefers-reduced-motion` respetado, contraste según los tokens de arriba.

## Orden de trabajo
Sigue `PLAN.md`.
