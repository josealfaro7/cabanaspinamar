<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  hotelSyncUrl: string;
}>();

const activeChannel = ref<'hotelsync' | 'whatsapp' | null>(null);

function toggleChannel(channel: 'hotelsync' | 'whatsapp') {
  activeChannel.value = activeChannel.value === channel ? null : channel;
}

const hotelSyncSteps = [
  {
    step: '01',
    title: 'Entras al link',
    description: 'Accede a nuestro motor oficial de reservas en línea.',
  },
  {
    step: '02',
    title: 'Eliges fecha de llegada y salida',
    description: 'Selecciona los días exactos de tu estadía en el calendario.',
  },
  {
    step: '03',
    title: 'Eliges cabaña',
    description: 'Revisa las tipologías disponibles y sus tarifas en tiempo real.',
  },
  {
    step: '04',
    title: 'Confirmas cabaña',
    description: 'Selecciona la unidad que mejor se adapte a tu grupo familiar.',
  },
  {
    step: '05',
    title: 'Rellenas formulario',
    description: 'Ingresa los datos del titular de la reserva de forma rápida.',
  },
  {
    step: '06',
    title: 'Confirmas reserva',
    description: 'Utiliza la pasarela de pago integrada y asegura tu estadía al instante.',
  },
];

const whatsappSteps = [
  {
    step: '01',
    title: 'Apretas en el link o cabaña',
    description: 'Selecciona "Ver detalles" en la cabaña de tu interés dentro del catálogo.',
  },
  {
    step: '02',
    title: 'Rellenas el formulario',
    description: 'Completa tu nombre, fechas de estadía y cantidad de personas.',
  },
  {
    step: '03',
    title: 'Envías para consultar',
    description: 'Se abre el chat directo con recepción con tus datos listos para confirmar.',
  },
];
</script>

<template>
  <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- 1. Selector: Reserva por HotelSync -->
    <button
      type="button"
      @click="toggleChannel('hotelsync')"
      :aria-expanded="activeChannel === 'hotelsync'"
      class="order-1 md:order-1 group w-full min-h-[48px] text-left bg-white p-2.5 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none"
    >
      <div
        :class="[
          'border-2 border-dotted p-6 sm:p-8 flex items-center justify-between gap-4 transition-colors',
          activeChannel === 'hotelsync' ? 'border-sunset-5 bg-pinamar-sun/30' : 'border-[#0A2246]/30',
        ]"
      >
        <div>
          <span class="inline-block bg-pinamar-sun text-pinamar-navy text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 mb-2">
            PASARELA DE PAGO EN LÍNEA
          </span>
          <h3 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
            Reserva por HotelSync
          </h3>
          <p class="text-sm text-pinamar-navy/75 leading-relaxed mt-2">
            Despliega los 6 pasos para reservar con confirmación inmediata.
          </p>
        </div>
        <span
          :class="[
            'min-w-[44px] min-h-[44px] border border-pinamar-navy flex items-center justify-center shrink-0 transition-transform duration-200',
            activeChannel === 'hotelsync'
              ? 'rotate-180 bg-sunset-5 text-white border-sunset-5'
              : 'text-pinamar-navy group-hover:bg-pinamar-navy group-hover:text-white',
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>

    <!-- 2. Panel Desplegable: HotelSync -->
    <div
      v-if="activeChannel === 'hotelsync'"
      class="order-2 md:order-3 md:col-span-2 bg-white p-2.5 shadow-xl"
    >
      <div class="border-2 border-dotted border-[#0A2246]/30 p-6 sm:p-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-[#0A2246]/15">
          <div>
            <span class="block text-xs uppercase tracking-widest text-sunset-5 font-bold mb-1">
              PASO A PASO · HOTELSYNC
            </span>
            <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
              Flujo de Reserva Online con Pasarela de Pago
            </h4>
          </div>
          <span class="inline-block bg-pinamar-sun text-pinamar-navy text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 self-start sm:self-center">
            6 Pasos Simples
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div
            v-for="item in hotelSyncSteps"
            :key="item.step"
            class="bg-pinamar-ice p-6 border border-[#0A2246]/15 flex flex-col justify-between"
          >
            <div>
              <span class="font-serif text-2xl font-bold text-sunset-5 block mb-2">
                {{ item.step }}
              </span>
              <h5 class="font-bold text-pinamar-navy text-sm uppercase tracking-wider mb-1.5">
                {{ item.title }}
              </h5>
              <p class="text-sm text-pinamar-navy/75 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A2246]/15">
          <p class="text-sm text-pinamar-navy/80">
            Disponibilidad en tiempo real y confirmación automática.
          </p>
          <a
            :href="hotelSyncUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] text-center bg-sunset-5 hover:bg-sunset-4 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-md transition-all duration-300 ease-in-out"
          >
            Ir a HotelSync Ahora
          </a>
        </div>
      </div>
    </div>

    <!-- 3. Selector: Reserva por WhatsApp -->
    <button
      type="button"
      @click="toggleChannel('whatsapp')"
      :aria-expanded="activeChannel === 'whatsapp'"
      class="order-3 md:order-2 group w-full min-h-[48px] text-left bg-white p-2.5 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none"
    >
      <div
        :class="[
          'border-2 border-dotted p-6 sm:p-8 flex items-center justify-between gap-4 transition-colors',
          activeChannel === 'whatsapp' ? 'border-[#25D366] bg-pinamar-sun/30' : 'border-[#0A2246]/30',
        ]"
      >
        <div>
          <span class="inline-block bg-pinamar-sun text-pinamar-navy text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 mb-2">
            ATENCIÓN ASISTIDA DIRECTA
          </span>
          <h3 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
            Reserva por WhatsApp
          </h3>
          <p class="text-sm text-pinamar-navy/75 leading-relaxed mt-2">
            Despliega el flujo rápido de consulta directa con recepción.
          </p>
        </div>
        <span
          :class="[
            'min-w-[44px] min-h-[44px] border border-pinamar-navy flex items-center justify-center shrink-0 transition-transform duration-200',
            activeChannel === 'whatsapp'
              ? 'rotate-180 bg-[#25D366] text-white border-[#25D366]'
              : 'text-pinamar-navy group-hover:bg-pinamar-navy group-hover:text-white',
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>

    <!-- 4. Panel Desplegable: WhatsApp -->
    <div
      v-if="activeChannel === 'whatsapp'"
      class="order-4 md:order-4 md:col-span-2 bg-white p-2.5 shadow-xl"
    >
      <div class="border-2 border-dotted border-[#0A2246]/30 p-6 sm:p-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-[#0A2246]/15">
          <div>
            <span class="block text-xs uppercase tracking-widest text-[#25D366] font-bold mb-1">
              PASO A PASO · WHATSAPP
            </span>
            <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
              Flujo Directo de Consulta y Reserva
            </h4>
          </div>
          <span class="inline-block bg-pinamar-sun text-pinamar-navy text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 self-start sm:self-center">
            3 Pasos Rápidos
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            v-for="item in whatsappSteps"
            :key="item.step"
            class="bg-pinamar-ice p-6 border border-[#0A2246]/15 flex flex-col justify-between"
          >
            <div>
              <span class="font-serif text-2xl font-bold text-[#25D366] block mb-2">
                {{ item.step }}
              </span>
              <h5 class="font-bold text-pinamar-navy text-sm uppercase tracking-wider mb-1.5">
                {{ item.title }}
              </h5>
              <p class="text-sm text-pinamar-navy/75 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A2246]/15">
          <p class="text-sm text-pinamar-navy/80">
            Atención directa con nuestra recepción las 24 horas.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="#cabanas"
              class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] text-center border border-pinamar-navy text-pinamar-navy hover:bg-pinamar-navy hover:text-white font-bold text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 ease-in-out"
            >
              Ver Catálogo de Cabañas
            </a>
            <a
              href="https://wa.me/56974635702"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] text-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 ease-in-out"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
