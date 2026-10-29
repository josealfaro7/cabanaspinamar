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
  <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- 1. Selector: Reserva por HotelSync -->
    <button
      type="button"
      @click="toggleChannel('hotelsync')"
      :aria-expanded="activeChannel === 'hotelsync'"
      :class="[
        'order-1 md:order-1 group w-full min-h-[48px] text-left bg-white rounded-3xl p-7 sm:p-9 shadow-[0_14px_35px_-12px_rgba(10,34,70,0.08)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none border cursor-pointer flex items-center justify-between gap-4',
        activeChannel === 'hotelsync' ? 'border-[#E86F2C] ring-2 ring-[#E86F2C]/25' : 'border-[#0A2246]/10',
      ]"
    >
      <div>
        <span class="inline-block rounded-full bg-[#FFF5DF] text-[#E86F2C] text-[11px] uppercase tracking-widest font-bold px-3 py-1 mb-2.5">
          PASARELA DE PAGO EN LÍNEA
        </span>
        <h3 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug">
          Reserva por <span class="italic font-normal text-[#E86F2C]">HotelSync</span>
        </h3>
        <p class="text-sm text-[#0A2246]/70 leading-relaxed mt-2">
          Despliega los 6 pasos para reservar con confirmación inmediata.
        </p>
      </div>
      <span
        :class="[
          'w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200',
          activeChannel === 'hotelsync'
            ? 'rotate-180 bg-[#E86F2C] text-white border-[#E86F2C]'
            : 'border-[#0A2246]/15 text-[#0A2246] group-hover:bg-[#0A2246] group-hover:text-white',
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>

    <!-- 2. Panel Desplegable: HotelSync -->
    <div
      v-if="activeChannel === 'hotelsync'"
      class="order-2 md:order-3 md:col-span-2 bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#0A2246]/10"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-[#0A2246]/10">
        <div>
          <span class="block text-xs uppercase tracking-widest text-[#E86F2C] font-bold mb-1">
            PASO A PASO · HOTELSYNC
          </span>
          <h4 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug">
            Flujo de Reserva Online con Pasarela de Pago
          </h4>
        </div>
        <span class="inline-block rounded-full bg-[#FFF5DF] text-[#E86F2C] text-xs uppercase tracking-widest font-bold px-4 py-1.5 self-start sm:self-center">
          6 Pasos Simples
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <div
          v-for="item in hotelSyncSteps"
          :key="item.step"
          class="bg-[#FAF6F0] rounded-2xl p-6 border border-[#0A2246]/8 flex flex-col justify-between"
        >
          <div>
            <span class="font-serif text-2xl font-bold text-[#E86F2C] block mb-2">
              {{ item.step }}
            </span>
            <h5 class="font-bold text-[#0A2246] text-sm uppercase tracking-wider mb-1.5">
              {{ item.title }}
            </h5>
            <p class="text-sm text-[#0A2246]/75 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A2246]/10">
        <p class="text-sm text-[#0A2246]/80">
          Disponibilidad en tiempo real y confirmación automática.
        </p>
        <a
          :href="hotelSyncUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] rounded-full bg-gradient-to-r from-[#E86F2C] to-[#F59B00] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-md transition-all duration-300 ease-in-out"
        >
          Ir a HotelSync Ahora
        </a>
      </div>
    </div>

    <!-- 3. Selector: Reserva por WhatsApp -->
    <button
      type="button"
      @click="toggleChannel('whatsapp')"
      :aria-expanded="activeChannel === 'whatsapp'"
      :class="[
        'order-3 md:order-2 group w-full min-h-[48px] text-left bg-white rounded-3xl p-7 sm:p-9 shadow-[0_14px_35px_-12px_rgba(10,34,70,0.08)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none border cursor-pointer flex items-center justify-between gap-4',
        activeChannel === 'whatsapp' ? 'border-[#25D366] ring-2 ring-[#25D366]/25' : 'border-[#0A2246]/10',
      ]"
    >
      <div>
        <span class="inline-block rounded-full bg-[#E9FBF0] text-[#189D4E] text-[11px] uppercase tracking-widest font-bold px-3 py-1 mb-2.5">
          ATENCIÓN ASISTIDA DIRECTA
        </span>
        <h3 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug">
          Reserva por <span class="italic font-normal text-[#25D366]">WhatsApp</span>
        </h3>
        <p class="text-sm text-[#0A2246]/70 leading-relaxed mt-2">
          Despliega el flujo rápido de consulta directa con recepción.
        </p>
      </div>
      <span
        :class="[
          'w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200',
          activeChannel === 'whatsapp'
            ? 'rotate-180 bg-[#25D366] text-white border-[#25D366]'
            : 'border-[#0A2246]/15 text-[#0A2246] group-hover:bg-[#0A2246] group-hover:text-white',
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>

    <!-- 4. Panel Desplegable: WhatsApp -->
    <div
      v-if="activeChannel === 'whatsapp'"
      class="order-4 md:order-4 md:col-span-2 bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#0A2246]/10"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-[#0A2246]/10">
        <div>
          <span class="block text-xs uppercase tracking-widest text-[#25D366] font-bold mb-1">
            PASO A PASO · WHATSAPP
          </span>
          <h4 class="font-serif text-2xl font-bold text-[#0A2246] tracking-tight leading-snug">
            Flujo Directo de Consulta y Reserva
          </h4>
        </div>
        <span class="inline-block rounded-full bg-[#E9FBF0] text-[#189D4E] text-xs uppercase tracking-widest font-bold px-4 py-1.5 self-start sm:self-center">
          3 Pasos Rápidos
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div
          v-for="item in whatsappSteps"
          :key="item.step"
          class="bg-[#FAF6F0] rounded-2xl p-6 border border-[#0A2246]/8 flex flex-col justify-between"
        >
          <div>
            <span class="font-serif text-2xl font-bold text-[#25D366] block mb-2">
              {{ item.step }}
            </span>
            <h5 class="font-bold text-[#0A2246] text-sm uppercase tracking-wider mb-1.5">
              {{ item.title }}
            </h5>
            <p class="text-sm text-[#0A2246]/75 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A2246]/10">
        <p class="text-sm text-[#0A2246]/80">
          Atención directa con nuestra recepción las 24 horas.
        </p>
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="#cabanas"
            class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] rounded-full border border-[#0A2246] text-[#0A2246] hover:bg-[#0A2246] hover:text-white font-bold text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 ease-in-out"
          >
            Ver Catálogo de Cabañas
          </a>
          <a
            href="https://wa.me/56974635702"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 ease-in-out"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
