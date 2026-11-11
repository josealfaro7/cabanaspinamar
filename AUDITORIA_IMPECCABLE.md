# Auditoría Impeccable · Cabañas Pinamar (home `/`)

Fecha: 2026-11-10 · Alcance: `src/` + `dist/index.html` (último build) · Detector Impeccable + revisión manual del código.

## Puntaje de salud

| # | Dimensión | Puntaje | Hallazgo clave |
|---|-----------|---------|----------------|
| 1 | Accesibilidad | 2 | Modal sin manejo de foco; `focus:outline-none` sin reemplazo; CTAs bajo 4.5:1 |
| 2 | Performance | 2 | 10 familias de Google Fonts; 3 blobs `blur(140px)` + `backdrop-blur(80px)` a página completa |
| 3 | Theming | 1 | Tokens triplicados (Tailwind, `:root`, clases manuales con `!important`) y +8 hex fuera de paleta |
| 4 | Responsive | 3 | Bien en general; dots del carrusel de 24×6 px |
| 5 | Integridad de implementación | 1 | Reseñas de respaldo inventadas presentadas como reales; fotos de stock como si fueran las cabañas |
| **Total** | | **9/20** | **Pobre (requiere trabajo serio)** |

## Veredicto de integridad: NO PASA
- `GoogleReviews.astro` L15-43: sin API key, la página muestra 3 reseñas con nombres inventados ("Carolina Muñoz", "Rodrigo Valenzuela", "Patricia González"), fechas fijas ("Hace 2 semanas") y un comentario que las llama "Reseñas reales". El build actual no tiene API key, así que hoy se publican esas reseñas falsas bajo el logo de Google. Además 4.4 / 320 están fijos en el código.
- `Hero.astro` y `CabinCatalog.astro`: todas las fotos son de Unsplash; el alt del hero dice "Atardecer costero y Cabañas Pinamar".
- La implementación contradice su propio brief (`design-taste-pinamar`): pide CTA "Verde Dosel", "nada de cajas blancas rígidas con bordes" y "nada de 3 columnas tipo SaaS"; el sitio usa CTA naranjo, tarjeta-dentro-de-tarjeta con borde punteado en todas las secciones (6 detecciones de `nested-cards`) y métricas en `md:grid-cols-3`.

## Resumen
- 17 issues: P0 ×2 · P1 ×7 · P2 ×6 · P3 ×2
- Los más críticos: reseñas inventadas, fotos de stock, modal inaccesible por teclado, contraste de CTAs/WhatsApp, peso de fuentes y blur.

## Hallazgos por severidad

### P0 — Bloqueantes
1. **Reseñas falsas como respaldo** — `GoogleReviews.astro` L15-43 · Integridad. Riesgo legal y de confianza (publicidad engañosa, políticas de marca de Google). Arreglo: sin API, no mostrar tarjetas de reseñas; dejar solo el CTA "Ver reseñas en Google", o pegar textos reales copiados con permiso y con nombre/fecha reales. `clarify` / `harden`.
2. **Fotos de stock presentadas como las cabañas** — `Hero.astro` L73, `CabinCatalog.astro` (todas las `images`) · Integridad. El huésped reserva lo que ve. Arreglo: fotos reales del recinto (el cliente debe entregarlas); mientras tanto, alt honesto. Asset que debe aportar el cliente.

### P1 — Mayores
3. **Modal de cabaña sin manejo de foco** — `CabinCatalogIsland.vue` L157-170 · A11y · WCAG 2.4.3 / 2.1.2. El foco no entra al diálogo, no queda atrapado y no vuelve al botón "Ver detalle" al cerrar; Tab recorre la página de atrás. Arreglo: usar `<dialog>` nativo con `showModal()` o un trap de foco + `focus()` al abrir/cerrar. `harden`.
4. **Indicadores de foco eliminados** — `HowToBookIsland.vue` L73/L168, `WhatsAppFloat.astro`, logo en `Navbar.astro`, inputs del modal (`focus:outline-none`) · A11y · WCAG 2.4.7. Usuarios de teclado no saben dónde están. Arreglo: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pinamar-navy` global. `harden`.
5. **Contraste insuficiente en CTAs** · A11y · WCAG 1.4.3. Blanco sobre `#E63B06` = 4.21:1 (texto xs bold, necesita 4.5); hover sobre `#F06A00` = 3.10:1; blanco sobre WhatsApp `#25D366` = 1.98:1 (botón del modal y HowToBook); `#25D366` como texto en blanco = 1.98:1; etiqueta "RESERVA ONLINE OFICIAL" `#F06A00` a 11px = 3.05:1. Arreglo: oscurecer el CTA (~`#C2330A`), usar verde WhatsApp oscuro (`#128C4A` o texto navy sobre verde) y sacar `sunset-4` de textos. `colorize`.
6. **Google Fonts carga 10 familias** — `Layout.astro` L25 · Performance. Cinzel, Cormorant, Fraunces, Baskerville, Lora, Marcellus, Merriweather, Playfair, Jakarta, Tenor Sans: residuo del "font switcher" (`FontSwitcherIsland.vue`, que ya no se usa en ninguna página). Cientos de KB y bloqueo de render en móvil. Arreglo: dejar solo Playfair (600/700, itálica 400) + Plus Jakarta Sans (400/600/700). `optimize`.
7. **Blur a página completa** — `index.astro` L22-52 · Performance. Tres capas `blur(140px)` de 120% de ancho y un `backdrop-blur(80px)` sobre todo el `<main>`, más estilos duplicados inline. Caro de componer en Android de gama media y en scroll. Arreglo: reemplazar por un `linear-gradient`/`radial-gradient` estático (el resultado visual es casi idéntico). `optimize`.
8. **Posible fuga de API key** — `GoogleReviews.astro` L12 y L86-88 · Performance/Seguridad. La key se lee como `PUBLIC_` y se imprime en `data-google-api-key` del HTML. Hoy está vacía, pero al configurarla queda expuesta. El fetch ocurre en build, así que no necesita ser pública: renombrar a `GOOGLE_PLACES_API_KEY` y quitar los `data-*`. `harden`.
9. **Sin `prefers-reduced-motion`** — `Layout.astro` `.reveal-on-scroll`, hovers con `-translate-y`, carrusel · A11y · WCAG 2.3.3. Arreglo: con reduced motion, mostrar los bloques sin desplazamiento (solo fade corto o nada). `animate`.

### P2 — Menores
10. **Dots del carrusel de 24×6 px** — `CabinCatalogIsland.vue` L266-277 · Responsive · WCAG 2.5.8. Difíciles de tocar. Arreglo: área táctil de 24×24 mínimo con el trazo visual interno. `adapt`.
11. **Estrellas con etiqueta incorrecta** — `GoogleReviews.astro` L126: `aria-label="Valoración de 5 estrellas"` con rating 4.4, y en un `div` sin `role="img"`. Arreglo: `role="img" aria-label="4,4 de 5 estrellas"` dinámico. `harden`.
12. **`role="tablist"` sin tabs** — `Location.astro` L68: los botones no tienen `role="tab"`/`aria-selected`; el estado activo solo es visual. Arreglo: quitar `tablist` y usar `aria-pressed` en los botones (y en las tarjetas de ruta). `harden`.
13. **Contenido invisible sin JS y `will-change` permanente** — `Layout.astro` `.reveal-on-scroll`: todo parte en `opacity-0`; si el script falla, desaparecen secciones enteras. `will-change` queda activo en ~25 elementos. Arreglo: aplicar el estado oculto solo con una clase `js` en `<html>`; quitar `will-change`. `optimize`.
14. **Imagen del hero oculta en móvil pero `loading="eager"`** — `Hero.astro` L72-77: `hidden lg:block` igual descarga la foto de 1200px en teléfonos; ninguna `<img>` declara `width`/`height` (CLS). `optimize`.
15. **Deriva de tokens** — `tailwind.config.mjs` + `:root` + clases manuales con `!important` en `Layout.astro` L47-62 + hex sueltos (`#f9c116`, `#e76a14`, `#f38b18`, `#E86F2C`, `#fffdf9`, `#fffdf7`, `#1ebe5d`) + doble degradado en `<body>` y otro en `<main>`. Arreglo: una sola fuente (Tailwind), borrar las clases manuales, añadir `cream`/`whatsapp-dark` como tokens. `extract`.

### P3 — Pulido
16. `WhatsAppFloat.astro`: `http://wa.me` → `https://wa.me`.
17. `/propuestas` (página interna de propuestas de tema) se publica junto al sitio; moverla fuera de `src/pages` o excluirla del build de producción. Kickers en mayúsculas encima de cada H2 (5 veces) vuelven el ritmo monótono. `distill`.

## Patrones sistémicos
- **Tarjeta dentro de tarjeta en todo el sitio**: `bg-white p-2.5 shadow-xl border` + `border-2 border-dotted` interno se repite en Hero, métricas, servicios, cabañas, HowToBook, reseñas, ubicación y modal. Es la firma visual, pero repetida en cada bloque pierde fuerza y choca con el brief.
- **`focus:outline-none` como reflejo** en botones e inputs, sin estilo de foco alternativo.
- **Colores de acción por debajo de AA**: la paleta sunset funciona como decoración, no como texto ni fondo de texto pequeño.
- **Comentarios de código que describen intención** ("100% Transparente", "Reseñas reales") que no coinciden con lo que se renderiza.

## Lo que funciona bien
- Arquitectura limpia Astro + islas Vue, solo dos islas con hidratación.
- Áreas táctiles de 44–48 px en casi todos los botones y links.
- Formulario del modal con `<label for>` correcto, `required` y resumen optimista de fechas.
- Modal con `role="dialog"`, `aria-modal`, `aria-labelledby`, cierre con Escape y bloqueo de scroll.
- `aria-expanded` en los acordeones de HowToBook; `aria-label` en botones de ícono; iframe del mapa con `title` y `loading="lazy"`.
- Copy cálido y local (Peñuelas, Av. Pacífico, rutas desde Coquimbo), sin jerga tech.

## Acciones recomendadas
1. **[P0] `/impeccable clarify`** — sacar las reseñas inventadas y corregir el copy/alt que afirma cosas no verificables (+ pedir fotos reales al cliente).
2. **[P1] `/impeccable harden`** — foco del modal, `focus-visible` global, API key privada, `aria` de estrellas y botones del mapa.
3. **[P1] `/impeccable colorize`** — recalibrar CTA naranjo y verde WhatsApp para AA sin perder la paleta sunset.
4. **[P1] `/impeccable optimize`** — fuentes a 2 familias, fondo estático en vez de blur, imágenes con dimensiones, reveal tolerante a fallos.
5. **[P1] `/impeccable animate`** — variante `prefers-reduced-motion`.
6. **[P2] `/impeccable adapt`** — dots del carrusel.
7. **[P2] `/impeccable extract`** — un solo sistema de tokens.
8. **[P3] `/impeccable distill`** — aplanar tarjeta-dentro-de-tarjeta y kickers repetidos.
9. **`/impeccable polish`** — pasada final.
