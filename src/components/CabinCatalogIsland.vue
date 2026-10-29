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
  }, 240);
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
    <!-- Bento Grid de Cabañas con Curvas Suaves (rounded-3xl) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="cabin in props.cabins"
        :key="cabin.id"
        class="bg-white rounded-3xl border border-[#0A2246]/10 p-3 shadow-[0_14px_35px_-12px_rgba(10,34,70,0.08)] hover:shadow-[0_22px_45px_-12px_rgba(232,111,44,0.16)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col group"
      >
        <!-- Imagen con Esquinas Redondeadas -->
        <div class="relative h-60 w-full overflow-hidden rounded-2xl bg-[#FAF6F0]">
          <img
            :src="cabin.mainImage"
            :alt="cabin.title"
            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <span class="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-sm text-[#0A2246] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 shadow-sm">
            {{ cabin.capacity }}
          </span>
        </div>

        <!-- Contenido de la Tarjeta -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug mb-5">
              {{ cabin.title }}
            </h3>
          </div>

          <div class="pt-4 border-t border-[#0A2246]/8">
            <button
              type="button"
              @click="openCabinModal(cabin)"
              class="w-full min-h-[44px] rounded-full bg-[#FAF6F0] hover:bg-[#0A2246] text-[#0A2246] hover:text-white border border-[#0A2246]/15 font-bold text-xs uppercase tracking-widest py-3.5 px-6 transition-all duration-300 ease-in-out focus:outline-none cursor-pointer"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Interactivo de Cabaña (rounded-3xl) -->
    <div
      v-if="isModalOpen && selectedCabin"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cabin-title"
      @click.self="closeCabinModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#071A33]/80 backdrop-blur-md transition-opacity duration-200 ease-out"
    >
      <div
        class="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-white/20"
      >
        <!-- Encabezado del Modal -->
        <div class="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#0A2246]/10 bg-[#FAF6F0] shrink-0">
          <div>
            <span class="inline-block rounded-full bg-[#FFF5DF] text-[#E86F2C] text-[11px] uppercase tracking-widest font-bold px-3 py-0.5 mb-1">
              {{ selectedCabin.capacity }}
            </span>
            <h3
              id="modal-cabin-title"
              class="font-serif text-2xl sm:text-3xl font-bold text-[#0A2246] tracking-tight leading-snug"
            >
              {{ selectedCabin.title }}
            </h3>
          </div>

          <button
            type="button"
            @click="closeCabinModal"
            aria-label="Cerrar ventana"
            class="min-w-[44px] min-h-[44px] rounded-full bg-white border border-[#0A2246]/15 text-[#0A2246] hover:bg-[#0A2246] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Cuerpo del Modal -->
        <div class="overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0A2246]/10">
          <!-- Izquierda: Carrusel + Equipamiento -->
          <div class="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-8 bg-white">
            <div
              v-if="isLoadingSkeleton"
              class="aspect-[16/10] w-full rounded-2xl bg-[#FAF6F0] animate-pulse flex flex-col justify-end p-6"
            >
              <div class="h-3 w-32 bg-[#0A2246]/10 rounded-full mb-2"></div>
              <div class="h-2 w-48 bg-[#0A2246]/10 rounded-full"></div>
            </div>

            <div
              v-else
              class="relative overflow-hidden rounded-2xl bg-[#FAF6F0] aspect-[16/10] select-none border border-[#0A2246]/10"
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
                class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-[#0A2246] hover:text-white text-[#0A2246] shadow-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <!-- Botón Siguiente -->
              <button
                type="button"
                @click="nextSlide"
                aria-label="Foto siguiente"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-[#0A2246] hover:text-white text-[#0A2246] shadow-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <!-- Indicadores -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <button
                  v-for="(_, idx) in selectedCabin.images"
                  :key="idx"
                  type="button"
                  @click="setSlide(idx)"
                  :aria-label="`Foto ${idx + 1}`"
                  :class="[
                    'h-2 rounded-full transition-all duration-200',
                    currentSlide === idx ? 'w-6 bg-[#F9C600]' : 'w-2 bg-white/75',
                  ]"
                ></button>
              </div>
            </div>

            <!-- Equipamiento en Cápsulas -->
            <div class="pt-2">
              <h4 class="text-xs uppercase tracking-widest text-[#0A2246] font-bold mb-4">
                Equipamiento Incluido
              </h4>
              <ul class="flex flex-wrap gap-2.5 text-sm text-[#0A2246]">
                <li
                  v-for="item in amenities"
                  :key="item"
                  class="inline-flex items-center gap-2 rounded-full bg-[#FAF6F0] border border-[#0A2246]/10 px-4 py-2 text-xs font-semibold"
                >
                  <span class="w-2 h-2 rounded-full bg-[#E86F2C] shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Derecha: Formulario de Consulta + Link Directo HotelSync -->
          <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF6F0]/70">
            <div>
              <span class="inline-block rounded-full bg-[#FFF5DF] text-[#E86F2C] text-[11px] uppercase tracking-widest font-bold px-3 py-0.5 mb-2">
                ATENCIÓN DIRECTA
              </span>
              <h4 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug mb-6">
                Consultar Disponibilidad
              </h4>

              <form @submit.prevent="submitWhatsAppQuote" class="space-y-5">
                <div>
                  <label
                    for="wa-nombre"
                    class="block text-xs uppercase tracking-widest text-[#0A2246] font-bold mb-1.5"
                  >
                    Nombre
                  </label>
                  <input
                    id="wa-nombre"
                    v-model="guestName"
                    type="text"
                    required
                    placeholder="Ej: Familia Muñoz"
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#0A2246]/15 bg-white text-[#0A2246] placeholder:text-[#0A2246]/40 focus:border-[#E86F2C] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    for="wa-fechas"
                    class="block text-xs uppercase tracking-widest text-[#0A2246] font-bold mb-1.5"
                  >
                    Fechas
                  </label>
                  <input
                    id="wa-fechas"
                    v-model="stayDate"
                    type="date"
                    required
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#0A2246]/15 bg-white text-[#0A2246] focus:border-[#E86F2C] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    for="wa-personas"
                    class="block text-xs uppercase tracking-widest text-[#0A2246] font-bold mb-1.5"
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
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#0A2246]/15 bg-white text-[#0A2246] focus:border-[#E86F2C] focus:outline-none transition-colors"
                  />
                </div>

                <div
                  v-if="optimisticDateSummary"
                  class="rounded-xl bg-[#FFF5DF] border border-[#E86F2C]/30 px-4 py-3 text-xs text-[#0A2246] font-bold"
                >
                  {{ optimisticDateSummary }}
                </div>

                <div class="pt-2 space-y-3">
                  <button
                    type="submit"
                    class="w-full min-h-[48px] rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-widest py-4 px-6 shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    Consultar por WhatsApp
                  </button>

                  <a
                    href="https://app.hotelsync.com/engine/es?engine_code=e0dacb55418a3ad29a5f9d07b988ba218e10eeb0&adults=2&children=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full min-h-[48px] rounded-full inline-flex items-center justify-center bg-[#0A2246] hover:bg-[#E86F2C] text-white font-bold text-xs uppercase tracking-widest py-4 px-6 shadow-md transition-all duration-300 ease-in-out text-center"
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
