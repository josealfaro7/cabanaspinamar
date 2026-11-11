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
    title: 'Rellenar formulario',
    description: 'Selecciona la cabaña de tu interés en el catálogo y completa tu nombre, fechas y cantidad de personas.',
  },
  {
    step: '02',
    title: 'Consulta por disponibilidad',
    description: 'Envía el formulario para abrir el chat con recepción y verificar disponibilidad en tus fechas.',
  },
  {
    step: '03',
    title: 'Coordina el pago',
    description: 'Coordina la transferencia o medio de pago directamente con nuestro equipo para confirmar tu estadía.',
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
      class="order-1 md:order-1 group w-full min-h-[48px] text-left bg-white shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        :class="[
          'p-6 sm:p-8 flex items-center justify-between gap-4 transition-colors',
          activeChannel === 'hotelsync' ? 'bg-pinamar-sun/40' : '',
        ]"
      >
        <div>
          <h3 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
            Reserva por <span class="italic font-normal text-action">HotelSync</span>
          </h3>
          <p class="text-sm text-pinamar-navy/75 leading-relaxed mt-2">
            Despliega los 6 pasos para reservar con confirmación inmediata.
          </p>
        </div>
        <span
          :class="[
            'min-w-[44px] min-h-[44px] border border-pinamar-navy flex items-center justify-center shrink-0 transition-transform duration-200',
            activeChannel === 'hotelsync'
              ? 'rotate-180 bg-action text-white border-sunset-5'
              : 'text-pinamar-navy group-hover:bg-pinamar-navy group-hover:text-white',
          ]"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>

    <!-- 2. Panel Desplegable: HotelSync -->
    <div
      v-if="activeChannel === 'hotelsync'"
      class="order-2 md:order-3 md:col-span-2 bg-white shadow-xl"
    >
      <div class="p-6 sm:p-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
              Reserva en línea con pago inmediato
            </h4>
          </div>
        </div>

        <ol class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 mb-10">
          <li
            v-for="item in hotelSyncSteps"
            :key="item.step"
            class="flex gap-4 pt-5 border-t border-pinamar-navy/15"
          >
            <span class="font-serif text-2xl font-bold text-action leading-none" aria-hidden="true">{{ item.step }}</span>
            <div>
              <h5 class="font-bold text-pinamar-navy text-sm mb-1">{{ item.title }}</h5>
              <p class="text-sm text-pinamar-navy/75 leading-relaxed">{{ item.description }}</p>
            </div>
          </li>
        </ol>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-pinamar-navy/80">
            Disponibilidad en tiempo real y confirmación automática.
          </p>
          <a
            :href="hotelSyncUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] text-center bg-action hover:bg-action-hover text-white font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-md transition-all duration-300 ease-in-out"
          >
            Ir a HotelSync
          </a>
        </div>
      </div>
    </div>

    <!-- 3. Selector: Reserva por WhatsApp -->
    <button
      type="button"
      @click="toggleChannel('whatsapp')"
      :aria-expanded="activeChannel === 'whatsapp'"
      class="order-3 md:order-2 group w-full min-h-[48px] text-left bg-white shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        :class="[
          'p-6 sm:p-8 flex items-center justify-between gap-4 transition-colors',
          activeChannel === 'whatsapp' ? 'bg-pinamar-sun/40' : '',
        ]"
      >
        <div>
          <h3 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
            Reserva por <span class="italic font-normal text-whatsapp-ink">WhatsApp</span>
          </h3>
          <p class="text-sm text-pinamar-navy/75 leading-relaxed mt-2">
            Despliega el flujo rápido de consulta directa con recepción.
          </p>
        </div>
        <span
          :class="[
            'min-w-[44px] min-h-[44px] border border-pinamar-navy flex items-center justify-center shrink-0 transition-transform duration-200',
            activeChannel === 'whatsapp'
              ? 'rotate-180 bg-whatsapp text-pinamar-navy border-whatsapp'
              : 'text-pinamar-navy group-hover:bg-pinamar-navy group-hover:text-white',
          ]"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>

    <!-- 4. Panel Desplegable: WhatsApp -->
    <div
      v-if="activeChannel === 'whatsapp'"
      class="order-4 md:order-4 md:col-span-2 bg-white shadow-xl"
    >
      <div class="p-6 sm:p-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 class="font-serif text-2xl font-bold text-pinamar-navy tracking-tight leading-snug">
              Consulta y reserva directa con recepción
            </h4>
          </div>
        </div>

        <ol class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-10">
          <li
            v-for="item in whatsappSteps"
            :key="item.step"
            class="flex gap-4 pt-5 border-t border-pinamar-navy/15"
          >
            <span class="font-serif text-2xl font-bold text-whatsapp-ink leading-none" aria-hidden="true">{{ item.step }}</span>
            <div>
              <h5 class="font-bold text-pinamar-navy text-sm mb-1">{{ item.title }}</h5>
              <p class="text-sm text-pinamar-navy/75 leading-relaxed">{{ item.description }}</p>
            </div>
          </li>
        </ol>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
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
              class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] text-center bg-whatsapp hover:bg-whatsapp-hover text-pinamar-navy font-bold text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 ease-in-out"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
