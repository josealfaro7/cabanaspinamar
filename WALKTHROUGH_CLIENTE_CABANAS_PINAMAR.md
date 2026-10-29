# Dossier de Funcionalidades y Propuestas de Diseño — Cabañas Pinamar (La Serena)

**Proyecto:** Nueva Plataforma Web de Alta Conversión (SPA) — Cabañas Pinamar  
**Ubicación:** Av. Pacífico 5020, Sector Peñuelas, La Serena, Chile  
**Enlaces de Presentación en Vivo:**
- **Presentador Interactivo (5 Propuestas en 1 solo link):** https://josealfaro7.github.io/cabanaspinamar/propuestas/
- **Acceso Raíz Directo:** https://josealfaro7.github.io/cabanaspinamar/

---

## 1. Objetivo del Proyecto
Modernizar la presencia digital de **Cabañas Pinamar** combinando sus **más de 25 años de tradición familiar** en La Serena con una experiencia de reserva rápida, transparente y adaptada tanto a teléfonos móviles como a computadores de escritorio, conectando a cada huésped con los dos canales oficiales de cierre: **Reserva Online Inmediata (HotelSync)** y **Atención Asistida 24/7 por WhatsApp**.

---

## 2. Recorrido por las Funcionalidades Clave (Features)

### 2.1. Barra de Navegación Superior (Sticky Navbar) y Primer Impacto (Hero)
- **Navegación Directa:** Accesos rápidos a **Cabañas**, **Cómo Reservar**, **Cómo Llegar** y **Contacto** siempre visibles al hacer scroll.
- **Conexión Directa con Motor Oficial HotelSync:** El botón principal **«Ver Disponibilidad»** ("Reserva tu estadía hoy") redirige directamente al motor de reservas en tiempo real de Cabañas Pinamar:
  - `https://app.hotelsync.com/engine/es?engine_code=e0dacb55418a3ad29a5f9d07b988ba218e10eeb0&adults=2&children=0`
- **Optimización Responsiva Móvil:** En pantallas de celular, la fotografía secundaria del Hero se oculta automáticamente para priorizar el mensaje principal y el botón de reserva sin obligar al usuario a hacer scroll innecesario.

---

### 2.2. Métricas de Respaldo y Grilla de 8 Servicios Incluidos
- **3 Indicadores Clave de Confianza:**
  1. **`+25`** Años de tradición familiar en La Serena.
  2. **`9,7`** Calificación sobresaliente en Limpieza.
  3. **`21`** Cabañas totalmente equipadas.
- **8 Servicios Destacados con Iconografía Dedicada:**
  - *A pasos de la playa (5 min a pie de Playa Peñuelas)* · *Recepción 24 hrs* · *Desayuno incluido* · *Estacionamiento privado* · *Wi-Fi* · *Juegos infantiles* · *100% Pet Friendly (Mascotas gratis)* · *Terraza común nueva*.

---

### 2.3. Catálogo Interactivo de Cabañas y Modal de Reserva Dual
El catálogo presenta las **6 tipologías reales** de Cabañas Pinamar con su metraje y distribución:
1. **Individual** (`28m² | 1 Dormitorio`)
2. **Suite (4 pax)** (`45m² | 1 Dormitorio + Estar`)
3. **Cabañas 4 Personas** (`54m² | 2 Dormitorios`)
4. **Cabañas 5 Personas** (`60m² | 2 Dormitorios`)
5. **Cabañas 6 Personas** (`68m² | 3 Dormitorios`)
6. **Cabañas 7 Personas** (`75m² | 3 Dormitorios`)

Al hacer clic en **«Ver detalles»** en cualquier cabaña, se despliega una **Ventana Modal Interactiva** que incluye:
- **Carrusel Fotográfico** de múltiples vistas de la cabaña.
- **Listado de Equipamiento Incluido:** Cocina americana, Living, Baño privado, Ropa de cama, Terraza con parrilla y TV Cable.
- **Formulario Inteligente Conectado a WhatsApp:**
  - El huésped ingresa su **Nombre**, **Fechas de estadía** y **Cantidad de personas** (pre-cargada según la capacidad de la cabaña elegida).
  - Al presionar **«Consultar por WhatsApp»**, la página redacta automáticamente el mensaje exacto hacia el número oficial (`+56 9 7463 5702`):
    > *"Hola Cabañas Pinamar, mi nombre es [Nombre]. Quisiera consultar disponibilidad para [Tipo de Cabaña], para [N] personas, en la fecha [Fecha]."*
- **Botón de Reserva Directa en HotelSync:** Dentro del mismo modal, si el huésped prefiere pagar en línea de inmediato, cuenta con el botón **«Reservar directo en HotelSync»**.

---

### 2.4. Sección Interactiva «¿Cómo Reservar tu Estadía?» (Guía Paso a Paso)
Dos tarjetas desplegables que explican con total claridad ambos caminos de reserva:

1. **Reserva por HotelSync (Pasarela de Pago en Línea — 6 Pasos):**
   - **01.** Entras al link
   - **02.** Eliges fecha de llegada y salida
   - **03.** Eliges cabaña
   - **04.** Confirmas cabaña
   - **05.** Rellenas formulario
   - **06.** Confirmas reserva (con botón directo **«Ir a HotelSync Ahora»**)
2. **Reserva por WhatsApp (Atención Asistida Directa — 3 Pasos):**
   - **01. Rellenar formulario:** Selecciona la cabaña de tu interés en el catálogo y completa tu nombre, fechas y cantidad de personas.
   - **02. Consulta por disponibilidad:** Envía el formulario para abrir el chat con recepción y verificar disponibilidad en tus fechas.
   - **03. Coordina el pago:** Coordina la transferencia o medio de pago directamente con nuestro equipo para confirmar tu estadía.

---

### 2.5. Sección de Reseñas Oficiales de Google (Google Places API v1)
Ubicada justo debajo de «¿Cómo Reservar tu Estadía?» para reforzar la decisión de compra con prueba social real:
- **Barra Resumen Oficial:** Muestra el puntaje general de **4,4 ★**, más de **320+ opiniones verificadas** en Google Maps y el sello **9,7 en Limpieza**.
- **Enlace Directo a la Ficha de Google:** Botón **«Ver todas en Google»** conectado al link oficial (`https://share.google/X8pzTj1kjc1M6aP7U`).
- **3 Tarjetas de Reseñas Destacadas:** Comentarios reales sobre limpieza, cercanía a Playa Peñuelas, seguridad del estacionamiento y ambiente 100% *Pet Friendly*.
- **Sincronización Automática (Google Places API New v1):** Preparada mediante variables de entorno (`PUBLIC_GOOGLE_PLACES_API_KEY` y `PUBLIC_GOOGLE_PLACE_ID`) para actualizar calificación y reseñas en tiempo real.

---

### 2.6. Sección Interactiva «Ubicación Privilegiada y Cómo Llegar»
Diseñada tanto para quien planifica su viaje desde casa como para quien ya viene manejando hacia **Av. Pacífico 5020**:
1. **Conmutador de 3 Vistas en Vivo (Sin salir de la página):**
   - **Mapa 2D:** Calles de Av. Pacífico 5020 y cercanía a Playa de Peñuelas.
   - **Street View 360°:** Vista panorámica interactiva en 360° frente al acceso de Cabañas Pinamar (`-29.938014, -71.282414`) para reconocer la fachada y el portón antes de llegar.
   - **Vista Satélite:** Fotografía aérea costera para dimensionar la distancia real hasta la playa (5 minutos a pie).
2. **Calculador de Ruta en 1 Clic («¿Desde dónde vienes?»):**
   - Al hacer clic en **Faro de La Serena (4,2 km · 6 min)**, **Terminal de Buses (4,8 km · 10 min)**, **Estadio La Portada (5,5 km · 12 min)** o **Aeropuerto La Florida (10 km · 18 min)**, el mapa traza automáticamente la ruta en auto hasta Cabañas Pinamar.
3. **Botones de Navegación GPS para Celular y Auto:**
   - **«Cómo llegar en Google Maps»** (inicia navegación desde el GPS actual del teléfono).
   - **«Abrir en Waze»** (carga las coordenadas exactas en la app Waze).
   - **«Abrir 360°»** (abre Street View en pantalla completa).

---

### 2.7. Footer Institucional, Políticas y Botón Flotante de WhatsApp
- **Datos Oficiales de Contacto:** Dirección (*Avenida Pacífico 5020, La Serena*), teléfonos clicables (`+56 9 7463 5702` / `+56 9 4408 9260`), correo (`contacto@cabanaspinamar.cl`) e Instagram oficial (`@cabanaspinamarchile`).
- **Políticas Transparentes:** Check-in `15:00 a 00:00`, Check-out `12:00`, sin restricción de edad y mascotas gratis.
- **Botón Flotante de WhatsApp:** Siempre accesible en la esquina inferior derecha durante toda la navegación.

---

## 3. Comparativa de las 5 Propuestas de Diseño

| # | Nombre de la Propuesta | Estilo Visual y Personalidad | Tipografía |
| :-: | :--- | :--- | :--- |
| **1** | **Hotel Boutique Clásico** | Elegancia hotelera tradicional en Azul Marino (`#0a1f35`), Dorado (`#d49a2a`), fondo claro y bordes rectos arquitectónicos. | *Playfair Display* + *Lato* |
| **2** | **Editorial Minimalista** | Composición asimétrica tipo revista de viajes, lista de servicios abierta, sombras suaves de difusión y máxima limpieza visual. | *Lora* + *Lato* |
| **3** | **Retro-Sunset del Logo** | Inspirada directamente en los 5 tonos de atardecer y el marco punteado del logo oficial de Cabañas Pinamar sobre fondo hielo costero (`#F2FAFC`). | *Playfair Display* + *Plus Jakarta Sans* |
| **4** | **Atardecer Continuo Difuminado** | Lienzo atmosférico continuo con los colores cálidos del atardecer difuminados en el fondo y tarjetas en **blanco puro sólido** de alto contraste. | *Playfair Display* + *Plus Jakarta Sans* |
| **5** | **Costero Orgánico & Bento Resort** | **El Twist Moderno:** Tarjetas curvas (`rounded-3xl`), botones tipo cápsula (`rounded-full`), Navbar flotante y un Hero *Dark-Luxe* en Azul Pacífico Profundo con acentos dorados sobre arena cálida (`#FAF6F0`). | *Fraunces* + *Plus Jakarta Sans* |
