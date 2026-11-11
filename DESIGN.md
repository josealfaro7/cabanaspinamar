# Design

Direction: the hospitality standard played straight, at the craft level of Tierra Hotels / Explora. Calm, light, photographic, with booking always one tap away. No theme, no costume: the place and the facts do the work.

Scene: a parent planning summer holidays on a phone, often outdoors in daylight, comparing a few places in La Serena. Light theme, high contrast, large targets.

## Color (restrained: warm neutrals + one accent)

| Token | Hex | Use |
|---|---|---|
| `bone` | #F6F2EB | page ground |
| `sand` | #ECE5D8 | alternate section ground, image placeholders |
| `ink` | #1F2B2A | text, footer ground |
| `stone` | #5A615C | secondary text (5.7:1 on bone) |
| `line` | ink at 12% | hairlines |
| `terracotta` | #A3401C | the one accent: primary buttons, links (6.35:1 with white) |
| `terracotta-dark` | #86330F | hover |
| `whatsapp` | #25D366 | WhatsApp actions only, always with ink text |

The sunset palette lives only in the logo.

## Type

- Display: Libre Caslon Display 400. Headings only, never below 24px. Sentence case.
- Text and UI: Hanken Grotesk 400/500/600. Body 17px/1.65, measure ≤ 68ch.
- Labels: Hanken Grotesk 600, 13px, letter-spacing .08em, uppercase, used sparingly (form labels, image captions), never as a kicker above a heading.

## Layout

- Container 1200px, gutters 20px mobile / 40px desktop.
- Sections separated by space and ground changes (bone ↔ sand), not cards.
- Square corners on photos; 2px radius on controls.
- One elevation: the hero booking panel. Everything else is flat.

## Components

- Booking panel: guests selectors + "Ver disponibilidad" (GET form to HotelSync) + WhatsApp link. Appears in the hero; a compact bar sticks to the bottom on phones.
- Cabin entry: photo 4:3, name, size · bedrooms · guests, link that opens HotelSync with that cabin's guest count.
- Lists (services, steps, routes): hairline-separated rows with a small line icon.

## Photography

Real photos of the property live in `public/fotos/` (WebP, several widths; originals in the untracked `Cabañas Página web_/` folder). Exteriors only for now: no interior photos yet. Any stock image added later must carry a visible "Imagen referencial" caption.

## Motion

One moment: the hero photo settles (scale 1.04 → 1, 1.2s ease-out) on load. Everything else is instant. `prefers-reduced-motion` removes it.
