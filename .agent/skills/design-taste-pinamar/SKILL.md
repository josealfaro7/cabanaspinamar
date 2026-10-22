---
name: design-taste-pinamar
description: "Use when building frontend interfaces for Cabañas Pinamar. Focuses on premium hospitality, high conversion, strict Astro/Vue.js architecture, and nature-inspired aesthetics."
category: frontend
risk: safe
date_added: "2026-10-21"
tags: [frontend, design, hospitality, astro, vue, tailwind]
---
# Cabañas Pinamar - Frontend & UI Skill

## When to Use
- Use when generating, reviewing, or improving frontend UI components for the Cabañas Pinamar booking platform.
- Use when dealing with Astro layouts, Vue.js islands, Tailwind CSS styling, responsive behavior, or HotelSync API UI states.
- Use when the output must override common LLM UI biases (like cold SaaS dashboards, generic tech cards, or React/Next.js assumptions) and instead project a premium, calm, and trustworthy hospitality experience.

## 1. ACTIVE BASELINE CONFIGURATION
- DESIGN_VARIANCE: 5 (Organic structures, high-quality image focus, elegant asymmetry).
- MOTION_INTENSITY: 3 (Calm, fluid, purpose-driven micro-interactions. Zero infinite loops).
- VISUAL_DENSITY: 2 (Premium hospitality feel. Generous whitespace, airy, relaxed pacing).

**AI Instruction:** Always use these baseline values to drive UI generation. Prioritize conversion (fast booking) and trust over flashy visual gimmicks.

## 2. STRICT ARCHITECTURE & CONVENTIONS
Adhere to these structural constraints to maintain the "Zero JS" philosophy and performance goals:

- **Framework Stack [MANDATORY]:** Use **Astro** for all static rendering, layouts, and SEO structural elements. Use **Vue 3** (Composition API) EXCLUSIVELY via Astro Islands (`client:load`, `client:visible`) for transactional components (Calendars, Booking Forms, HotelSync API interactions). 
- **NO REACT/NEXT.JS:** React, Next.js, and Framer Motion are strictly BANNED. Do not output JSX.
- **State Management:** Use local `ref()` or `reactive()` for isolated Vue components. If global state is needed across islands (e.g., booking details), use **Pinia** or Nano Stores.
- **Styling Policy:** Use Tailwind CSS. Avoid arbitrary values unless absolutely necessary.
- **Responsiveness:** "Mobile-First" is mandatory. 80% of bookings happen on phones. Ensure tap targets (buttons, calendar dates) are at least `44x44px`.
- **Icons:** Use Lucide Vue or clean SVG primitives. NO Emojis.

## 3. DESIGN ENGINEERING (Hospitality Bias Correction)

**Rule 1: Organic & Premium Typography**
- **Display/Headlines (H1/H2):** Use elegant, modern Serif or Humanist Sans-Serif (e.g., Playfair Display, Lora, or Optima) to convey warmth, nature, and premium status. `tracking-tight leading-snug`.
- **Body/Paragraphs:** Clean, highly legible Sans-Serif (e.g., Plus Jakarta Sans, Inter) with `text-gray-700 leading-relaxed`.
- **ANTI-SAAS RULE:** Banned fonts: Geist, JetBrains Mono, Fira Code. This is a nature retreat, not a developer tool.

**Rule 2: Brand Color Calibration**
- **Palette:** Rooted in the "El Cuidador" archetype. 
  - Base: "Arena Blanca Coquimbo" (warm off-whites, `#FAFAFA`, `#F5F5F0`).
  - Primary: "Azul Pacífico Profundo" (Dark slate/navy for text and main UI elements).
  - Accent/Action: "Verde Dosel" (Muted forest green for CTAs, booking buttons, success states).
- **THE NEON BAN:** Pure blacks, glowing borders, AI-purple, and oversaturated tech blues are strictly BANNED.

**Rule 3: Materiality & Container Flow**
- **No Generic Dashboard Cards:** Avoid wrapping text in rigid white boxes with harsh gray borders. Use subtle separators (`divide-y`), generous padding, and full-bleed image sections. If cards are needed (e.g., room types), use zero borders with a very subtle diffusion shadow.

**Rule 4: Interactive UI States (Booking Flow)**
- **API Loading:** When Vue islands fetch availability from HotelSync, NEVER use generic spinners. Use UI-matched skeleton loaders (e.g., grayed-out calendar dates pulsing gently).
- **Tactile Feedback:** Booking buttons should feel responsive. Use `transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]`.
- **Optimistic UI:** When a user selects dates, visually confirm the selection instantly in the DOM before the server responds. 

## 4. PERFORMANCE & SEO GUARDRAILS
- **Image Optimization:** All hero images and gallery assets MUST use Astro's native `<Image />` component or standard `<img>` with `.webp` format and `loading="lazy"` (except for the Above-the-Fold Hero).
- **DOM Cost:** Keep the DOM shallow. Do not generate deeply nested `div` structures for simple layouts.
- **Hardware Acceleration:** Limit transitions to `opacity` and `transform`.

## 5. AI TELLS (Forbidden Patterns in Hospitality)
- **NO Tech Jargon:** Avoid words like "Seamless", "Next-Gen", "Elevate". Use hospitable terms: "Descubre", "Tu refugio", "Relájate", "Disponibilidad".
- **NO Placeholder Slop:** Do not use "John Doe" or generic city names. If mocking data, use Chilean contexts (e.g., "Santiago", "Familia Muñoz", "+56 9 1234 5678").
- **NO 3-Column SaaS Features:** Banned. Display amenities (WiFi, Quincho, Limpieza) using asymmetric lists, bento-style subtle grids with icons, or inline tags.
- **NO Centered Dark Hero:** Avoid the generic "centered text over darkened image" hero. Use a 50/50 split, or a clean white header with a stunning edge-to-edge landscape image below it.

## 6. FINAL PRE-FLIGHT CHECK
- [ ] Is the code written in Astro (.astro) and Vue 3 (.vue)?
- [ ] Are all React/Next.js/Framer Motion dependencies removed?
- [ ] Is the design optimized for mobile tapping (large hit areas for calendars/booking)?
- [ ] Are colors and typography aligned with the natural, premium vibe of Cabañas Pinamar?
- [ ] Are HotelSync loading states accounted for with Skeleton screens?
