/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'pinamar-ice': '#F2FAFC',
        'pinamar-navy': '#0A2246',
        'pinamar-sun': '#FFFAC2',
        'sunset-1': '#FCE600',
        'sunset-2': '#F9C600',
        'sunset-3': '#F59B00',
        'sunset-4': '#F06A00',
        'sunset-5': '#E63B06',
        // Aliases de compatibilidad con la paleta retro-sunset
        primary: '#0A2246',
        accent: '#E63B06',
        background: '#F2FAFC',
        surface: '#FFFFFF',
        whatsapp: '#25D366',
      },
      backgroundImage: {
        'pinamar-gradient':
          'linear-gradient(180deg, #FCE600 0%, #F9C600 25%, #F59B00 50%, #F06A00 75%, #E63B06 100%)',
        'pinamar-stripes':
          'linear-gradient(180deg, #FCE600 0% 20%, #F9C600 20% 40%, #F59B00 40% 60%, #F06A00 60% 80%, #E63B06 80% 100%)',
        'pinamar-pastel':
          'linear-gradient(180deg, #FFFDF0 0%, #FFF4D6 50%, #F2FAFC 100%)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
