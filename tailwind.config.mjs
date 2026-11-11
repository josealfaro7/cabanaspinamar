/** @type {import('tailwindcss').Config} */
// Tokens de diseño: ver DESIGN.md. No usar hex sueltos en los componentes.
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  theme: {
    extend: {
      colors: {
        bone: '#F6F2EB',
        sand: '#ECE5D8',
        ink: '#1F2B2A',
        stone: '#5A615C',
        terracotta: { DEFAULT: '#A3401C', dark: '#86330F' },
        whatsapp: { DEFAULT: '#25D366', dark: '#1EBE5D' },
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '75rem',
      },
      borderRadius: {
        ctl: '2px',
      },
    },
  },
  plugins: [],
};
