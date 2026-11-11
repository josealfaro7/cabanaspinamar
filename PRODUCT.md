# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three guest groups, all confirmed by the owner:

- Families on holiday (groups of 4–7, often with children or pets), mostly in summer and long weekends.
- Couples and leisure travellers the rest of the year.
- Work travellers who need a practical stay: location, 24-hour reception, private parking.

Most arrive from a phone while planning a trip to La Serena.

## Product Purpose

Website for Cabañas Pinamar, a family-run cabin complex in La Serena, Chile. It must let a guest understand the place, compare the cabin types and book.

Success: the guest reaches the HotelSync booking engine (primary path) or opens a WhatsApp conversation with reception (secondary path) with enough confidence to book.

## Positioning

More than 25 years as a family business at Av. Pacífico 5020, five minutes on foot from Playa de Peñuelas, with 24-hour reception and breakfast included. A long-standing family place by the sea, not a hotel chain.

## Operating Context

- Booking engine (external): HotelSync, https://app.hotelsync.com/engine/es?engine_code=e0dacb55418a3ad29a5f9d07b988ba218e10eeb0&adults=2&children=0
- HotelSync flow (6 steps): open the link · choose arrival and departure dates · choose cabin · confirm cabin · fill in the form · confirm and pay through the integrated payment gateway.
- WhatsApp flow (3 steps): choose cabin and fill name, dates and guests · send to open the chat with reception · coordinate transfer or payment with the team.
- WhatsApp: +56 9 7463 5702 (wa.me/56974635702). Phone: +56 9 7463 5702. Email: cabanapinamar.chile@gmail.com. Instagram: @cabanaspinamarchile.
- Address: Avenida Pacífico 5020, La Serena, Coquimbo. Coordinates −29.938014, −71.282414.
- Policies: check-in 15:00–00:00, check-out 12:00. Cancellation subject to rate.
- Routes by car: Faro de La Serena 4,2 km (6 min) · Terminal de Buses 4,8 km (10 min) · Estadio La Portada 5,5 km (12 min) · Aeropuerto La Florida 10 km (18 min).

## Capabilities and Constraints

- Stack: Astro 4 + Tailwind 3, static build. Deployed from the `gh-pages` branch.
- 21 fully equipped cabins. Cabin types: Individual (28 m², 1 bedroom) · Suite 4 pax (45 m², 1 bedroom + living) · Cabañas 4 personas (54 m², 2 bedrooms) · Cabañas 5 personas (60 m², 2 bedrooms) · Cabañas 6 personas (68 m², 3 bedrooms) · Cabañas 7 personas (75 m², 3 bedrooms).
- Cabin equipment: kitchenette (cocina americana), living, private bathroom, bed linen, terrace with grill, cable TV.
- Services: breakfast included · 24-hour reception · pet friendly · private parking inside the complex · WiFi · common terrace with taca-taca · children's playground · 24-hour minimarket at reception.
- Coming soon: a new dining room for breakfast service (under construction).
- Prices are not published on the site; availability and rates live in HotelSync.

## Brand Commitments

- Name: Cabañas Pinamar. Logo: `public/logocabanas.png` (sunset with palm trees). The logo is the only binding brand asset; colours, type and the rest of the look are open (assumed by Claude, user did not answer; confirm).
- Voice: warm, family, Chilean Spanish; "tú". No tech jargon.
- Standing direction (owner's choice, Nov 2026, branch `redesign/impeccable-postal`): the hospitality-category standard played straight, at the finish level of Tierra Hotels / Explora (large photography, sober type, calm). Not a themed concept.

## Evidence on Hand

- Google rating summary: 4,4 with 320+ reviews (as stated in the main branch; must be verified against the live Google listing). Public listing link: https://share.google/X8pzTj1kjc1M6aP7U
- Real guest reviews: none on hand. Never invent reviews, authors or dates; only show reviews returned by the Google Places API.
- Photos: none of the property on hand. Current images are Unsplash stock and must be replaced with real photos; never present stock as the cabins.
- No other ratings (the former "9,7 en limpieza" claim was removed by the owner).

## Product Principles

1. Booking first: every section should leave the guest one step from HotelSync, with WhatsApp always available.
2. Say only what is true: 25 years, the address, the walk to the beach, the services. No invented proof.
3. One family place by the sea: warmth and familiarity over hotel-chain polish.
4. Phone first: thumbs, slow connections, sun glare.

## Accessibility & Inclusion

WCAG 2.1 AA. Many guests read on phones outdoors: high contrast and large touch targets.
