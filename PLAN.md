# Plan de trabajo (semana del 10 al 14 de noviembre)

Meta: sitio provisional en línea con Inicio, Catálogo y Nosotros (escritorio + móvil) para el cliente al final de la semana.

## Tanda 1 — Base (martes)
1. Crear proyecto Astro, git, estructura `src/{components,layouts,pages,content,styles}` y copiar `media/` a `public/media/`.
2. Tokens CSS (colores, tipografías Exo 2 + Arial, escala de títulos, espacios, formas de esquina cortada).
3. Archivos de contenido vacíos con la estructura de variables.

## Tanda 2 — Componentes compartidos (martes–miércoles)
Header (con buscador y menú móvil), footer, botones, tarjetas de máquina, tarjeta de cliente, enlace "saltar al contenido". Comparar con `Sistema` y las pantallas.

## Tanda 3 — Inicio (miércoles)
Hero con video (clips 1 y 2), sección de confianza, catálogo destacado, galería "En la obra, no en el catálogo", clientes, contacto. Escritorio y móvil.

## Tanda 4 — Catálogo (jueves)
Rejilla, filtros (isla React), pantalla de filtros móvil, estado "sin resultados".

## Tanda 5 — Nosotros y asistente (jueves–viernes)
Nosotros, menú móvil, asistente (isla React, solo interfaz por ahora).

## Tanda 6 — Revisión y publicación (viernes)
Comparación final sección por sección con el diseño, revisión de accesibilidad y rendimiento (videos pesados), despliegue en Vercel/Netlify, enviar enlace.

## Pendientes conocidos (se dejan como valores temporales)
- Datos del cliente por confirmar: NIT, razón social, fechas de Nosotros ([2010], [2014], [2019], [2023]), cifras [+100], [+500], [24 h], nombres [Nombre], [Fecha], [Texto a validar con PyH+].
- Logos de clientes: nombres provisionales, confirmar.
- Inicio escritorio usaba GIF; usar los videos mp4 (igual que móvil).
- En Inicio hay 8 colores sueltos no documentados: usar el token más cercano de CLAUDE.md y avisar al usuario.
- Texto de 10–12px en el diseño: subir a 13px mínimo en el texto corrido.
- Buscador del header: en escritorio el diseño solo lo muestra en Inicio y Catálogo; implementarlo en todas las páginas del alcance.
- Fuera de alcance por ahora: Detalle, Cotizador, Blog, Artículo, Contacto, Pagos (PSE).
