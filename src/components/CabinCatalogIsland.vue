<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Cabin {
  id: string;
  title: string;
  capacity: string;
  defaultGuests: number;
  mainImage: string;
  images: string[];
}

const props = defineProps<{
  cabins: Cabin[];
}>();

const isModalOpen = ref(false);
const isLoadingSkeleton = ref(false);
const selectedCabin = ref<Cabin | null>(null);
const currentSlide = ref(0);

// Booking Form Reactive State (Vue 3 Composition API)
const guestName = ref('');
const stayDate = ref('');
const guestCount = ref(4);

const amenities = [
  'Cocina americana',
  'Living',
  'Baño privado',
  'Ropa de cama',
  'Terraza con parrilla',
  'TV Cable',
];

// Optimistic UI confirmation when user selects dates
const optimisticDateSummary = computed(() => {
  if (!stayDate.value) return '';
  try {
    const [year, month, day] = stayDate.value.split('-');
    return `Estadía seleccionada desde el ${day}/${month}/${year} · ${guestCount.value} ${
      guestCount.value === 1 ? 'huésped' : 'huéspedes'
    }`;
  } catch {
    return `Estadía seleccionada: ${stayDate.value}`;
  }
});

function openCabinModal(cabin: Cabin) {
  selectedCabin.value = cabin;
  guestCount.value = cabin.defaultGuests;
  currentSlide.value = 0;
  isModalOpen.value = true;
  isLoadingSkeleton.value = true;
  document.body.classList.add('overflow-hidden');

  // UI-matched Skeleton state simulating HotelSync availability sync
  setTimeout(() => {
    isLoadingSkeleton.value = false;
  }, 320);
}

function closeCabinModal() {
  isModalOpen.value = false;
  document.body.classList.remove('overflow-hidden');
}

function nextSlide() {
  if (!selectedCabin.value) return;
  currentSlide.value = (currentSlide.value + 1) % selectedCabin.value.images.length;
}

function prevSlide() {
  if (!selectedCabin.value) return;
  const len = selectedCabin.value.images.length;
  currentSlide.value = (currentSlide.value - 1 + len) % len;
}

function setSlide(idx: number) {
  currentSlide.value = idx;
}

function submitWhatsAppQuote() {
  if (!selectedCabin.value) return;
  const cabana = selectedCabin.value.title;
  const nombre = guestName.value.trim();
  const fechas = stayDate.value.trim();
  const personas = guestCount.value;

  const mensajeConstruido = `Hola Cabañas Pinamar, mi nombre es ${nombre}. Quisiera consultar disponibilidad para ${cabana}, para ${personas} personas, en la fecha ${fechas}.`;

  window.open(
    'https://wa.me/56974635702?text=' + encodeURIComponent(mensajeConstruido),
    '_blank'
  );
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeCabinModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div>
    <!-- Grid Responsivo de Cabañas (Cero bordes duros, sombra de difusión sutil) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <article
        v-for="cabin in props.cabins"
        :key="cabin.id"
        class="bg-surface rounded-none border-0 shadow-[0_10px_30px_-10px_rgba(10,31,53,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(10,31,53,0.15)] transition-all duration-300 ease-out flex flex-col"
      >
        <!-- Imagen Principal en formato WebP -->
        <div class="relative h-64 w-full overflow-hidden bg-gray-100">
          <img
            :src="cabin.mainImage"
            :alt="cabin.title"
            class="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>

        <!-- Contenido con Espacios en Blanco Generosos -->
        <div class="p-8 sm:p-10 flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs uppercase tracking-widest text-accent font-bold mb-2">
              {{ cabin.capacity }}
            </p>
            <h3 class="font-serif text-2xl font-bold text-primary tracking-tight leading-snug mb-6">
              {{ cabin.title }}
            </h3>
          </div>

          <div class="pt-5 border-t border-gray-100">
            <button
              type="button"
              @click="openCabinModal(cabin)"
              class="w-full min-h-[44px] border border-primary/80 text-primary hover:bg-primary hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-none transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Interactivo de Cabaña (Vue 3 Island) -->
    <div
      v-if="isModalOpen && selectedCabin"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cabin-title"
      @click.self="closeCabinModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-primary/75 backdrop-blur-sm transition-opacity duration-200 ease-out"
    >
      <div
        class="relative w-full max-w-5xl bg-surface shadow-2xl rounded-none overflow-hidden max-h-[92vh] flex flex-col"
      >
        <!-- Encabezado del Modal -->
        <div class="flex items-center justify-between px-6 sm:px-10 py-6 border-b border-gray-100 bg-surface shrink-0">
          <div>
            <p class="text-xs uppercase tracking-widest text-accent font-bold mb-1">
              {{ selectedCabin.capacity }}
            </p>
            <h3
              id="modal-cabin-title"
              class="font-serif text-2xl sm:text-3xl font-bold text-primary tracking-tight leading-snug"
            >
              {{ selectedCabin.title }}
            </h3>
          </div>

          <button
            type="button"
            @click="closeCabinModal"
            aria-label="Cerrar ventana"
            class="min-w-[44px] min-h-[44px] border border-gray-200 text-primary hover:bg-primary hover:text-white rounded-none flex items-center justify-center transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Cuerpo del Modal -->
        <div class="overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <!-- Izquierda: Carrusel de Fotos + Equipamiento -->
          <div class="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-8">
            <!-- Skeleton Loader adaptado a la UI mientras carga vista/disponibilidad -->
            <div
              v-if="isLoadingSkeleton"
              class="aspect-[16/10] w-full bg-gray-100 animate-pulse flex flex-col justify-end p-6"
            >
              <div class="h-3 w-32 bg-gray-200 mb-2"></div>
              <div class="h-2 w-48 bg-gray-200"></div>
            </div>

            <!-- Carrusel de Fotos -->
            <div
              v-else
              class="relative overflow-hidden bg-gray-100 aspect-[16/10] rounded-none select-none"
            >
              <div
                class="flex w-full h-full transition-transform duration-300 ease-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <div
                  v-for="(imgSrc, idx) in selectedCabin.images"
                  :key="idx"
                  class="w-full h-full shrink-0"
                >
                  <img
                    :src="imgSrc"
                    :alt="`${selectedCabin.title} - Vista ${idx + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <!-- Botón Anterior (Tap Target >= 44px) -->
              <button
                type="button"
                @click="prevSlide"
                aria-label="Foto anterior"
                class="absolute left-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[48px] bg-white/90 hover:bg-primary hover:text-white text-primary flex items-center justify-center rounded-none transition-all duration-200 ease-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <!-- Botón Siguiente (Tap Target >= 44px) -->
              <button
                type="button"
                @click="nextSlide"
                aria-label="Foto siguiente"
                class="absolute right-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[48px] bg-white/90 hover:bg-primary hover:text-white text-primary flex items-center justify-center rounded-none transition-all duration-200 ease-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <!-- Indicadores -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <button
                  v-for="(_, idx) in selectedCabin.images"
                  :key="idx"
                  type="button"
                  @click="setSlide(idx)"
                  :aria-label="`Foto ${idx + 1}`"
                  :class="[
                    'w-6 h-1.5 rounded-none transition-all duration-200',
                    currentSlide === idx ? 'bg-accent' : 'bg-white/60',
                  ]"
                ></button>
              </div>
            </div>

            <!-- Equipamiento en Lista Minimalista -->
            <div class="pt-2">
              <h4 class="text-xs uppercase tracking-widest text-primary/60 font-bold mb-4 pb-2 border-b border-gray-100">
                Equipamiento de tu refugio
              </h4>
              <ul class="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-700">
                <li
                  v-for="item in amenities"
                  :key="item"
                  class="flex items-center gap-2.5"
                >
                  <span class="w-1.5 h-1.5 bg-accent rounded-none shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Derecha: Formulario de Disponibilidad con Optimistic UI y Contexto Chileno -->
          <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-surface">
            <div>
              <p class="text-xs uppercase tracking-widest text-accent font-bold mb-2">
                ATENCIÓN DIRECTA
              </p>
              <h4 class="font-serif text-2xl font-bold text-primary tracking-tight leading-snug mb-6">
                Consultar Disponibilidad
              </h4>

              <!-- Skeleton de Calendario / Disponibilidad durante carga inicial -->
              <div v-if="isLoadingSkeleton" class="space-y-6 py-4 animate-pulse">
                <div class="h-10 bg-gray-100 w-full"></div>
                <div class="h-10 bg-gray-100 w-full"></div>
                <div class="h-10 bg-gray-100 w-2/3"></div>
              </div>

              <form v-else @submit.prevent="submitWhatsAppQuote" class="space-y-7">
                <!-- Campo: Nombre (Contexto Chileno) -->
                <div>
                  <label
                    for="wa-nombre"
                    class="block text-xs uppercase tracking-widest text-primary/70 font-bold mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    id="wa-nombre"
                    v-model="guestName"
                    type="text"
                    required
                    placeholder="Ej: Familia Muñoz"
                    class="w-full min-h-[44px] py-2.5 border-b border-gray-300 rounded-none bg-transparent text-primary placeholder:text-gray-400 focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <!-- Campo: Fechas -->
                <div>
                  <label
                    for="wa-fechas"
                    class="block text-xs uppercase tracking-widest text-primary/70 font-bold mb-2"
                  >
                    Fechas
                  </label>
                  <input
                    id="wa-fechas"
                    v-model="stayDate"
                    type="date"
                    required
                    class="w-full min-h-[44px] py-2.5 border-b border-gray-300 rounded-none bg-transparent text-primary focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <!-- Campo: Personas -->
                <div>
                  <label
                    for="wa-personas"
                    class="block text-xs uppercase tracking-widest text-primary/70 font-bold mb-2"
                  >
                    Personas
                  </label>
                  <input
                    id="wa-personas"
                    v-model.number="guestCount"
                    type="number"
                    min="1"
                    max="15"
                    required
                    class="w-full min-h-[44px] py-2.5 border-b border-gray-300 rounded-none bg-transparent text-primary focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <!-- Optimistic UI: Confirmación instantánea en el DOM al seleccionar fecha -->
                <div
                  v-if="optimisticDateSummary"
                  class="bg-background border-l-2 border-accent px-4 py-3 text-xs text-primary font-medium transition-opacity duration-200"
                >
                  {{ optimisticDateSummary }}
                </div>

                <div class="pt-2 space-y-3">
                  <button
                    type="submit"
                    class="w-full min-h-[48px] bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-none transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                  >
                    Consultar por WhatsApp
                  </button>

                  <a
                    href="https://app.hotelsync.com/engine/es?engine_code=e0dacb55418a3ad29a5f9d07b988ba218e10eeb0&adults=2&children=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full min-h-[48px] inline-flex items-center justify-center bg-primary hover:bg-accent text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-none transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] text-center"
                  >
                    Reservar directo en HotelSync
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
