/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0a1f35',
        accent: '#d49a2a',
        'accent-alt': '#e76a14',
        background: '#f9fafb',
        surface: '#ffffff',
        whatsapp: '#25D366',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  Overwrite: true,
};
