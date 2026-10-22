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

  setTimeout(() => {
    isLoadingSkeleton.value = false;
  }, 280);
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
    <!-- Grid Responsivo de Cabañas con Guiño al Borde Punteado del Logo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="cabin in props.cabins"
        :key="cabin.id"
        class="bg-white border border-amber-900/10 p-2.5 shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group"
      >
        <div class="border-2 border-dotted border-[#0A2246]/30 flex-1 flex flex-col">
          <!-- Imagen Principal -->
          <div class="relative h-60 w-full overflow-hidden bg-pinamar-ice">
            <img
              :src="cabin.mainImage"
              :alt="cabin.title"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 bg-pinamar-sun text-pinamar-navy text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm border border-pinamar-navy/20">
              {{ cabin.capacity }}
            </span>
          </div>

          <!-- Contenido de la Tarjeta -->
          <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
            <div>
              <h3 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug mb-6">
                {{ cabin.title }}
              </h3>
            </div>

            <!-- Botón Secundario Outline (#0A2246) con Hover Relleno -->
            <div class="pt-4 border-t border-[#0A2246]/10">
              <button
                type="button"
                @click="openCabinModal(cabin)"
                class="w-full min-h-[44px] border border-pinamar-navy text-pinamar-navy hover:bg-pinamar-navy hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 transition-all duration-300 ease-in-out focus:outline-none"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Interactivo de Cabaña -->
    <div
      v-if="isModalOpen && selectedCabin"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cabin-title"
      @click.self="closeCabinModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-pinamar-navy/80 backdrop-blur-sm transition-opacity duration-200 ease-out"
    >
      <div
        class="relative w-full max-w-5xl bg-pinamar-ice shadow-2xl p-2.5 overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div class="border-2 border-dotted border-[#0A2246]/30 bg-white overflow-hidden flex flex-col max-h-full">
          <!-- Franja Retro-Sunset en el Tope del Modal -->
          <div class="grid grid-cols-5 h-1.5 w-full shrink-0">
            <div class="bg-[#FCE600]"></div>
            <div class="bg-[#F9C600]"></div>
            <div class="bg-[#F59B00]"></div>
            <div class="bg-[#F06A00]"></div>
            <div class="bg-[#E63B06]"></div>
          </div>

          <!-- Encabezado del Modal -->
          <div class="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#0A2246]/15 bg-pinamar-ice shrink-0">
            <div>
              <span class="inline-block bg-pinamar-sun text-pinamar-navy text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 mb-1">
                {{ selectedCabin.capacity }}
              </span>
              <h3
                id="modal-cabin-title"
                class="font-serif text-2xl sm:text-3xl font-bold text-pinamar-navy tracking-tight leading-snug"
              >
                {{ selectedCabin.title }}
              </h3>
            </div>

            <button
              type="button"
              @click="closeCabinModal"
              aria-label="Cerrar ventana"
              class="min-w-[44px] min-h-[44px] border border-pinamar-navy text-pinamar-navy hover:bg-pinamar-navy hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Cuerpo del Modal -->
          <div class="overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0A2246]/15">
            <!-- Izquierda: Carrusel + Equipamiento -->
            <div class="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-8 bg-white">
              <div
                v-if="isLoadingSkeleton"
                class="aspect-[16/10] w-full bg-pinamar-ice animate-pulse flex flex-col justify-end p-6"
              >
                <div class="h-3 w-32 bg-pinamar-navy/10 mb-2"></div>
                <div class="h-2 w-48 bg-pinamar-navy/10"></div>
              </div>

              <div
                v-else
                class="relative overflow-hidden bg-pinamar-ice aspect-[16/10] select-none border border-[#0A2246]/15"
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

                <!-- Botón Anterior -->
                <button
                  type="button"
                  @click="prevSlide"
                  aria-label="Foto anterior"
                  class="absolute left-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[48px] bg-pinamar-ice/90 hover:bg-pinamar-navy hover:text-white text-pinamar-navy flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <!-- Botón Siguiente -->
                <button
                  type="button"
                  @click="nextSlide"
                  aria-label="Foto siguiente"
                  class="absolute right-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[48px] bg-pinamar-ice/90 hover:bg-pinamar-navy hover:text-white text-pinamar-navy flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
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
                      'w-6 h-1.5 transition-all duration-200',
                      currentSlide === idx ? 'bg-sunset-5' : 'bg-white/70',
                    ]"
                  ></button>
                </div>
              </div>

              <!-- Lista de Equipamiento -->
              <div class="pt-2">
                <h4 class="text-xs uppercase tracking-widest text-pinamar-navy font-bold mb-4 pb-2 border-b border-[#0A2246]/15">
                  Equipamiento Incluido
                </h4>
                <ul class="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-pinamar-navy">
                  <li
                    v-for="item in amenities"
                    :key="item"
                    class="flex items-center gap-2.5"
                  >
                    <span class="w-2 h-2 bg-sunset-4 shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Derecha: Formulario de Consulta -->
            <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-pinamar-ice/60">
              <div>
                <span class="inline-block bg-pinamar-sun text-pinamar-navy text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 mb-2">
                  ATENCIÓN DIRECTA
                </span>
                <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug mb-6">
                  Consultar Disponibilidad
                </h4>

                <form @submit.prevent="submitWhatsAppQuote" class="space-y-6">
                  <div>
                    <label
                      for="wa-nombre"
                      class="block text-xs uppercase tracking-widest text-pinamar-navy font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      id="wa-nombre"
                      v-model="guestName"
                      type="text"
                      required
                      placeholder="Ej: Familia Muñoz"
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-[#0A2246]/30 bg-transparent text-pinamar-navy placeholder:text-pinamar-navy/40 focus:border-sunset-5 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      for="wa-fechas"
                      class="block text-xs uppercase tracking-widest text-pinamar-navy font-bold mb-2"
                    >
                      Fechas
                    </label>
                    <input
                      id="wa-fechas"
                      v-model="stayDate"
                      type="date"
                      required
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-[#0A2246]/30 bg-transparent text-pinamar-navy focus:border-sunset-5 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      for="wa-personas"
                      class="block text-xs uppercase tracking-widest text-pinamar-navy font-bold mb-2"
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
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-[#0A2246]/30 bg-transparent text-pinamar-navy focus:border-sunset-5 focus:outline-none transition-colors"
                    />
                  </div>

                  <div
                    v-if="optimisticDateSummary"
                    class="bg-pinamar-sun border-l-4 border-sunset-5 px-4 py-3 text-xs text-pinamar-navy font-bold"
                  >
                    {{ optimisticDateSummary }}
                  </div>

                  <div class="pt-2">
                    <button
                      type="submit"
                      class="w-full min-h-[48px] bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-widest py-4 px-6 shadow-md transition-all duration-300 ease-in-out"
                    >
                      Enviar por WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
