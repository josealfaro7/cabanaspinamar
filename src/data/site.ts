// Datos del sitio: única fuente de hechos (ver PRODUCT.md). No inventar cifras ni reseñas.

// Rutas de archivos de /public respetando el "base" del build (en GitHub Pages es /cabanaspinamar).
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const HOTELSYNC_ENGINE = 'https://app.hotelsync.com/engine/es';
export const HOTELSYNC_CODE = 'e0dacb55418a3ad29a5f9d07b988ba218e10eeb0';

export function hotelsyncUrl(adults = 2, children = 0) {
  return `${HOTELSYNC_ENGINE}?engine_code=${HOTELSYNC_CODE}&adults=${adults}&children=${children}&currency=CLP`;
}

export const WHATSAPP_NUMBER = '56974635702';
export function whatsappUrl(text?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export const contact = {
  phoneLabel: '+56 9 7463 5702',
  phoneHref: 'tel:+56974635702',
  email: 'cabanapinamar.chile@gmail.com',
  instagram: 'https://www.instagram.com/cabanaspinamarchile/',
  instagramHandle: '@cabanaspinamarchile',
  address: 'Avenida Pacífico 5020, La Serena, Coquimbo',
};

export const policies = {
  checkIn: '15:00 a 00:00',
  checkOut: '12:00',
  cancellation: 'Tarifas no reembolsables.',
  children: 'Menores de 5 años no pagan.',
  pets: 'Perros pequeños, hasta 15 kg.',
};

// Tipos de alojamiento. La "Cabaña" es una sola tipología equipada para 4 a 7 personas:
// la tarifa cambia según cuántas personas se alojan (se elige en HotelSync).
export const cabana = {
  id: 'cabana',
  name: 'Cabaña',
  guestsMin: 4,
  guestsMax: 7,
  // Pendiente confirmar con el dueño: superficie y dormitorios reales (p. ej. '60 m² · 2 dormitorios').
  // Mientras esté vacío no se muestra.
  detail: '',
  image: asset('/fotos/cabana-1400.webp'),
  imageSmall: asset('/fotos/cabana-800.webp'),
  alt: 'Cabaña blanca de techo de teja con su terraza, mesa y quitasol',
};

export interface Unit {
  id: string;
  name: string;
  size: string;
  rooms: string;
  guests: number;
  image: string;
  imageSmall: string;
  alt: string;
}

export const otherUnits: Unit[] = [
  // Pendiente confirmar con el dueño qué foto corresponde a cada unidad.
  { id: 'individual', name: 'Individual', size: '28 m²', rooms: '1 dormitorio', guests: 1, image: asset('/fotos/unidad-a-1000.webp'), imageSmall: asset('/fotos/unidad-a-700.webp'), alt: 'Unidad de fachada gris y blanca con terraza y buganvilias' },
  { id: 'suite', name: 'Suite', size: '45 m²', rooms: '1 dormitorio + estar', guests: 4, image: asset('/fotos/unidad-b-1000.webp'), imageSmall: asset('/fotos/unidad-b-700.webp'), alt: 'Unidades con ventanales y terraza con mesas' },
];

export const cabinEquipment = [
  'Cocina americana',
  'Living',
  'Baño privado',
  'Ropa de cama',
  'Terraza con parrilla',
  'TV cable',
];

// Íconos: contenido interno de un SVG 24x24, trazo 1.5
export const services = [
  { title: 'Desayuno incluido', text: 'Para empezar cada mañana sin preocupaciones.', icon: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/>' },
  { title: 'Recepción 24 horas', text: 'Atención durante toda tu estadía, de día y de noche.', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { title: 'Pet friendly', text: 'Mascotas bienvenidas.', note: 'Solo perros de razas pequeñas, hasta 15 kg.', icon: '<circle cx="11" cy="4.5" r="1.8"/><circle cx="17.5" cy="8" r="1.8"/><circle cx="19.5" cy="14" r="1.8"/><path d="M8.5 14a3.5 3.5 0 0 1 7 0v1.5a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3Z"/><circle cx="5" cy="9" r="1.8"/>' },
  { title: 'Estacionamiento privado', text: 'Dentro del recinto, con acceso directo.', icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>' },
  { title: 'WiFi', text: 'Conexión gratuita en cabañas y áreas comunes.', icon: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M2 9a15 15 0 0 1 20 0"/><path d="M12 19.5h.01"/>' },
  { title: 'Terraza común y taca-taca', text: 'Espacios renovados para compartir en familia.', icon: '<path d="M3 21h18"/><path d="M5 21V11h14v10"/><path d="M12 3 2 11h20Z"/>' },
  { title: 'Juegos infantiles', text: 'Un parque seguro dentro del recinto.', icon: '<path d="M4 21V4h16v17"/><path d="M4 9h16"/><path d="M10 9v7"/><path d="M14 9v7"/><path d="M8 16h8"/>' },
  { title: 'Minimarket 24 horas', text: 'Snacks y bebidas en recepción.', icon: '<path d="M6 2 3 6v14h18V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>' },
];

export const hotelsyncSteps = [
  { title: 'Abre el motor de reservas', text: 'Desde cualquier botón “Ver disponibilidad”.' },
  { title: 'Elige tus fechas', text: 'Llegada y salida en el calendario.' },
  { title: 'Elige tu cabaña', text: 'Verás las disponibles con su tarifa.' },
  { title: 'Confirma la cabaña', text: 'La que mejor calce con tu grupo.' },
  { title: 'Completa tus datos', text: 'Los del titular de la reserva.' },
  { title: 'Paga y listo', text: 'Con la pasarela de pago; la confirmación es inmediata.' },
];

export const whatsappSteps = [
  { title: 'Escríbenos', text: 'Cuéntanos tu nombre, fechas y cuántas personas vienen.' },
  { title: 'Te confirmamos disponibilidad', text: 'Recepción revisa y te responde por el mismo chat.' },
  { title: 'Coordinamos el pago', text: 'Por transferencia u otro medio que acordemos contigo.' },
];

export const location = {
  lat: -29.938014,
  lng: -71.282414,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent('Cabañas Pinamar, Av. Pacífico 5020, La Serena, Chile')}&t=m&z=15&output=embed&hl=es`,
  googleMaps: 'https://www.google.com/maps/dir/?api=1&destination=-29.938014,-71.282414',
  waze: 'https://waze.com/ul?ll=-29.938014,-71.282414&navigate=yes',
  routes: [
    { from: 'Faro de La Serena', distance: '4,2 km', time: '6 min' },
    { from: 'Terminal de Buses', distance: '4,8 km', time: '10 min' },
    { from: 'Estadio La Portada', distance: '5,5 km', time: '12 min' },
    { from: 'Aeropuerto La Florida', distance: '10 km', time: '18 min' },
  ],
};

export const GOOGLE_LISTING_URL = 'https://share.google/X8pzTj1kjc1M6aP7U';
// Respaldo sin API (dato de la rama main, verificar contra la ficha de Google)
export const googleFallback = { rating: 4.4, count: 320 };
