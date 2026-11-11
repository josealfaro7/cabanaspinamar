<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';

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
const dialogRef = ref<HTMLElement | null>(null);
const closeBtnRef = ref<HTMLButtonElement | null>(null);
let lastTrigger: HTMLElement | null = null;

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

function openCabinModal(cabin: Cabin, event?: Event) {
  lastTrigger = (event?.currentTarget as HTMLElement) ?? (document.activeElement as HTMLElement | null);
  selectedCabin.value = cabin;
  guestCount.value = cabin.defaultGuests;
  currentSlide.value = 0;
  isModalOpen.value = true;
  isLoadingSkeleton.value = true;
  document.body.classList.add('overflow-hidden');
  nextTick(() => closeBtnRef.value?.focus());

  setTimeout(() => {
    isLoadingSkeleton.value = false;
  }, 280);
}

function closeCabinModal() {
  isModalOpen.value = false;
  document.body.classList.remove('overflow-hidden');
  // Devolver el foco al botón que abrió el modal
  nextTick(() => lastTrigger?.focus());
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e: KeyboardEvent) {
  const root = dialogRef.value;
  if (!root) return;
  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null
  );
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || !root.contains(active))) {
    e.preventDefault();
    first.focus();
  }
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
  if (!isModalOpen.value) return;
  if (e.key === 'Escape') {
    closeCabinModal();
  } else if (e.key === 'Tab') {
    trapFocus(e);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <div>
    <!-- Grid Responsivo de Cabañas con Guiño al Borde Punteado del Logo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="cabin in props.cabins"
        :key="cabin.id"
        class="bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group"
      >
        <div class="flex-1 flex flex-col">
          <!-- Imagen Principal -->
          <div class="relative h-60 w-full overflow-hidden bg-pinamar-ice">
            <img
              :src="cabin.mainImage"
              width="900"
              height="600"
              decoding="async"
              :alt="cabin.title"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 bg-pinamar-sun text-pinamar-navy text-xs font-bold px-3 py-1 shadow-sm border border-pinamar-navy/20">
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
            <div class="pt-4 border-t border-pinamar-navy/10">
              <button
                type="button"
                @click="openCabinModal(cabin, $event)"
                class="w-full min-h-[44px] border border-pinamar-navy text-pinamar-navy hover:bg-pinamar-navy hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 transition-all duration-300 ease-in-out"
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
      ref="dialogRef"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cabin-title"
      @click.self="closeCabinModal"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-pinamar-navy/80 backdrop-blur-sm transition-opacity duration-200 ease-out"
    >
      <div
        class="relative w-full max-w-5xl bg-pinamar-ice shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div class="bg-white overflow-hidden flex flex-col max-h-full">
          <!-- Franja Retro-Sunset en el Tope del Modal -->
          <div class="grid grid-cols-5 h-1.5 w-full shrink-0">
            <div class="bg-sunset-1"></div>
            <div class="bg-sunset-2"></div>
            <div class="bg-sunset-3"></div>
            <div class="bg-sunset-4"></div>
            <div class="bg-sunset-5"></div>
          </div>

          <!-- Encabezado del Modal -->
          <div class="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-pinamar-navy/15 bg-pinamar-ice shrink-0">
            <div>
              <span class="inline-block bg-pinamar-sun text-pinamar-navy text-xs font-bold px-2.5 py-0.5 mb-1">
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
              ref="closeBtnRef"
              @click="closeCabinModal"
              aria-label="Cerrar ventana"
              class="min-w-[44px] min-h-[44px] border border-pinamar-navy text-pinamar-navy hover:bg-pinamar-navy hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Cuerpo del Modal -->
          <div class="overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-pinamar-navy/15">
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
                class="relative overflow-hidden bg-pinamar-ice aspect-[16/10] select-none border border-pinamar-navy/15"
              >
                <div
                  class="flex w-full h-full transition-transform duration-300 ease-out motion-reduce:transition-none"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <div
                    v-for="(imgSrc, idx) in selectedCabin.images"
                    :key="idx"
                    class="w-full h-full shrink-0"
                  >
                    <img
                      :src="imgSrc"
                      width="900"
                      height="563"
                      decoding="async"
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
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
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
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                <!-- Indicadores (área táctil 32x32, trazo visual interno) -->
                <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center">
                  <button
                    v-for="(_, idx) in selectedCabin.images"
                    :key="idx"
                    type="button"
                    @click="setSlide(idx)"
                    :aria-label="`Foto ${idx + 1} de ${selectedCabin.images.length}`"
                    :aria-current="currentSlide === idx ? 'true' : undefined"
                    class="w-8 h-8 flex items-center justify-center"
                  >
                    <span
                      :class="[
                        'block w-6 h-1.5 transition-colors duration-200',
                        currentSlide === idx ? 'bg-action' : 'bg-white/80',
                      ]"
                    ></span>
                  </button>
                </div>
              </div>

              <!-- Lista de Equipamiento -->
              <div class="pt-2">
                <h4 class="text-xs uppercase tracking-widest text-pinamar-navy font-bold mb-4 pb-2 border-b border-pinamar-navy/15">
                  Equipamiento incluido
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
                <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug mb-6">
                  Consultar disponibilidad
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
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-pinamar-navy/30 bg-transparent text-pinamar-navy placeholder:text-pinamar-navy/65 focus:border-sunset-5 transition-colors"
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
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-pinamar-navy/30 bg-transparent text-pinamar-navy focus:border-sunset-5 transition-colors"
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
                      class="w-full min-h-[44px] py-2.5 border-b-2 border-pinamar-navy/30 bg-transparent text-pinamar-navy focus:border-sunset-5 transition-colors"
                    />
                  </div>

                  <div
                    v-if="optimisticDateSummary"
                    class="bg-pinamar-sun px-4 py-3 text-xs text-pinamar-navy font-bold"
                  >
                    {{ optimisticDateSummary }}
                  </div>

                  <div class="pt-2 space-y-3">
                    <button
                      type="submit"
                      class="w-full min-h-[48px] bg-whatsapp hover:bg-whatsapp-hover text-pinamar-navy font-bold text-xs uppercase tracking-widest py-4 px-6 shadow-md transition-all duration-300 ease-in-out"
                    >
                      Consultar por WhatsApp
                    </button>

                    <a
                      href="https://app.hotelsync.com/engine/es?engine_code=e0dacb55418a3ad29a5f9d07b988ba218e10eeb0&adults=2&children=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full min-h-[48px] inline-flex items-center justify-center bg-action hover:bg-action-hover text-white font-bold text-xs uppercase tracking-widest py-4 px-6 shadow-md transition-all duration-300 ease-in-out text-center"
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
  </div>
</template>
