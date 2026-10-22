<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

interface NavbarFontOption {
  name: string;
  cssFamily: string;
  styleNote: string;
}

const navbarFonts: NavbarFontOption[] = [
  {
    name: 'Cinzel',
    cssFamily: "'Cinzel', serif",
    styleNote: 'Idéntica a las letras del logo circular',
  },
  {
    name: 'Marcellus',
    cssFamily: "'Marcellus', serif",
    styleNote: 'Estilo Optima · Limpia y de hotel boutique',
  },
  {
    name: 'Playfair Display',
    cssFamily: "'Playfair Display', serif",
    styleNote: 'Serif editorial de alto contraste',
  },
  {
    name: 'Cormorant Garamond',
    cssFamily: "'Cormorant Garamond', serif",
    styleNote: 'Clásica costera y estilizada',
  },
  {
    name: 'Tenor Sans',
    cssFamily: "'Tenor Sans', sans-serif",
    styleNote: 'Sans humanista sobria de resort',
  },
  {
    name: 'Libre Baskerville',
    cssFamily: "'Libre Baskerville', serif",
    styleNote: 'Tradicional, firme y señorial',
  },
  {
    name: 'Fraunces',
    cssFamily: "'Fraunces', serif",
    styleNote: 'Orgánica y cálida',
  },
  {
    name: 'Lora (Actual)',
    cssFamily: "'Lora', serif",
    styleNote: 'Fuente actual de los títulos',
  },
];

const currentIndex = ref(0);
const isUppercase = ref(false);

const activeFont = computed(() => navbarFonts[currentIndex.value]);

function updateNavbarBrandOnly() {
  if (typeof document === 'undefined') return;
  const brandEl = document.getElementById('navbar-brand-text');
  if (!brandEl) return;

  brandEl.style.fontFamily = activeFont.value.cssFamily;

  if (isUppercase.value) {
    brandEl.classList.add('uppercase', 'tracking-widest');
    brandEl.classList.remove('tracking-tight');
  } else {
    brandEl.classList.remove('uppercase', 'tracking-widest');
    brandEl.classList.add('tracking-tight');
  }
}

watch([currentIndex, isUppercase], () => {
  updateNavbarBrandOnly();
});

onMounted(() => {
  updateNavbarBrandOnly();
});
</script>

<template>
  <!-- Barra de Prueba exclusiva para el texto "Cabañas Pinamar" del Navbar -->
  <div class="bg-primary text-white border-b border-white/15 px-4 sm:px-8 lg:px-12 py-2.5 text-xs">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="bg-accent text-white font-bold uppercase tracking-widest px-2 py-0.5 text-[10px]">
          FUENTE NAVBAR ({{ currentIndex + 1 }}/{{ navbarFonts.length }})
        </span>
        <span class="font-bold text-white text-sm">
          {{ activeFont.name }}
        </span>
        <span class="hidden md:inline text-white/70">
          — {{ activeFont.styleNote }}
        </span>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-center">
        <button
          type="button"
          @click="currentIndex = (currentIndex - 1 + navbarFonts.length) % navbarFonts.length"
          class="w-7 h-7 border border-white/30 hover:border-white flex items-center justify-center font-bold"
          aria-label="Fuente anterior"
        >
          ‹
        </button>

        <input
          type="range"
          min="0"
          :max="navbarFonts.length - 1"
          step="1"
          v-model.number="currentIndex"
          class="w-36 sm:w-48 accent-[#d49a2a] cursor-pointer h-1.5 bg-white/30"
          aria-label="Deslizar para cambiar la fuente de Cabañas Pinamar en el Navbar"
        />

        <button
          type="button"
          @click="currentIndex = (currentIndex + 1) % navbarFonts.length"
          class="w-7 h-7 border border-white/30 hover:border-white flex items-center justify-center font-bold"
          aria-label="Fuente siguiente"
        >
          ›
        </button>

        <button
          type="button"
          @click="isUppercase = !isUppercase"
          class="ml-2 px-2.5 py-1 border border-white/30 hover:border-white text-[11px] uppercase tracking-wider font-bold"
        >
          {{ isUppercase ? 'MAYÚS' : 'Normal' }}
        </button>
      </div>
    </div>
  </div>
</template>
