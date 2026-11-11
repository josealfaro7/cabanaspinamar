/** @type {import('tailwindcss').Config} */
// Única fuente de tokens de diseño de Cabañas Pinamar.
// Regla: en los componentes no se escriben hex sueltos (bg-[#...]); si falta un color, se agrega aquí.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base
        'pinamar-navy': '#0A2246', // texto, bordes y superficies oscuras
        'pinamar-ice': '#F2FAFC', // navbar y fondos fríos
        'pinamar-sun': '#FFFAC2', // etiquetas e íconos
        cream: '#FFFDF7', // superficies cálidas
        sand: '#F8F5EE', // relleno mientras carga el mapa

        // Franja retro-sunset del logo (decorativa: no usar para texto)
        'sunset-1': '#FCE600',
        'sunset-2': '#F9C600',
        'sunset-3': '#F59B00',
        'sunset-4': '#F06A00',
        'sunset-5': '#E63B06',

        // Línea viva del logo
        'logo-yellow': '#F9C116',
        'logo-orange': '#E76A14',

        // Acción: naranjo profundo con contraste AA para texto blanco y texto pequeño
        action: '#C2330A',
        'action-hover': '#A82B04',

        // WhatsApp: el verde de marca lleva texto navy; whatsapp-ink es para texto verde sobre blanco
        whatsapp: '#25D366',
        'whatsapp-hover': '#1EBE5D',
        'whatsapp-ink': '#0B7A3E',

        // Alias heredados: solo los usan CabinCard.astro y FontSwitcherIsland.vue, que ya no están en la página
        primary: '#0A2246',
        accent: '#C2330A',
        background: '#F2FAFC',
        surface: '#FFFFFF',
      },
      backgroundImage: {
        'logo-line': 'linear-gradient(90deg, #F9C116 0%, #E76A14 100%)',
        // Fondo atmosférico del <main>: degradado cálido continuo, sin blur
        atmosphere: [
          'radial-gradient(ellipse 75% 18% at 50% 2%, rgb(249 193 22 / 0.55), transparent 75%)',
          'radial-gradient(ellipse 80% 22% at 50% 50%, rgb(243 139 24 / 0.42), transparent 75%)',
          'radial-gradient(ellipse 80% 20% at 50% 98%, rgb(231 106 20 / 0.5), transparent 75%)',
          'linear-gradient(180deg, rgb(249 193 22 / 0.42) 0%, rgb(245 146 29 / 0.38) 50%, rgb(231 106 20 / 0.48) 100%)',
        ].join(', '),
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
