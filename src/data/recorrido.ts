import { asset } from './site';

export type EspacioId = 'dormitorios' | 'cocina-living' | 'banos' | 'terrazas' | 'complejo';

export interface Espacio {
  id: EspacioId;
  nombre: string;
  texto: string;
}

export interface Foto {
  id: string;
  espacio: EspacioId;
  caption: string;
  alt: string;
  src: string;
  srcSmall: string;
}

export const espacios: Espacio[] = [
  { id: 'dormitorios', nombre: 'Dormitorios', texto: 'Camas matrimoniales, camas de una plaza y literas, según cuántos vengan.' },
  { id: 'cocina-living', nombre: 'Cocina y living', texto: 'Cocina americana equipada y living para compartir.' },
  { id: 'banos', nombre: 'Baños', texto: 'Baño privado en cada cabaña.' },
  { id: 'terrazas', nombre: 'Terrazas', texto: 'Terraza con parrilla, mesa y sillas afuera de cada cabaña.' },
  { id: 'complejo', nombre: 'El complejo', texto: 'Recepción 24 horas, juegos infantiles y áreas comunes.' },
];

const f = (id: string, espacio: EspacioId, caption: string, alt: string): Foto => ({
  id,
  espacio,
  caption,
  alt,
  src: asset(`/fotos/recorrido/${id}-1600.webp`),
  srcSmall: asset(`/fotos/recorrido/${id}-800.webp`),
});

export const fotos: Foto[] = [
  f('dormitorio-matrimonial-1', 'dormitorios', 'Dormitorio matrimonial', 'Dormitorio con cama de dos plazas, veladores y lámpara'),
  f('literas-1', 'dormitorios', 'Dormitorio con literas', 'Dormitorio con dos literas de madera'),
  f('dormitorio-dos-camas', 'dormitorios', 'Dormitorio con dos camas', 'Dormitorio con dos camas de una plaza junto a la ventana'),
  f('dormitorio-matrimonial-2', 'dormitorios', 'Dormitorio matrimonial', 'Cama de dos plazas con espejo y ventana'),
  f('literas-2', 'dormitorios', 'Literas para los niños', 'Literas de madera con cojines'),
  f('dormitorio-matrimonial-3', 'dormitorios', 'Dormitorio con salida a la terraza', 'Dormitorio con cama, televisor y puerta de vidrio hacia la terraza'),
  f('living-cocina-1', 'cocina-living', 'Living y cocina americana', 'Living con sofá, barra con pisos y cocina equipada'),
  f('living-1', 'cocina-living', 'Living', 'Living con sillones claros, mesa de centro y ventanales'),
  f('cocina-1', 'cocina-living', 'Barra de la cocina', 'Barra de madera con pisos y refrigerador'),
  f('living-cocina-2', 'cocina-living', 'Living con vista a las palmeras', 'Sofá frente a la cocina y ventana con palmeras'),
  f('cocina-2', 'cocina-living', 'Cocina equipada', 'Cocina con horno, encimera, lavaplatos y microondas'),
  f('cocina-3', 'cocina-living', 'Cocina con horno y refrigerador', 'Cocina con encimera, horno, hervidor y refrigerador'),
  f('living-2', 'cocina-living', 'Comedor y living', 'Mesa con pisos, sofá de cuero y televisor'),
  f('bano-1', 'banos', 'Baño privado', 'Baño con lavamanos, inodoro y ducha con cortina'),
  f('bano-2', 'banos', 'Baño privado', 'Baño blanco con lavamanos y ducha'),
  f('terraza-vista', 'terrazas', 'De la cabaña a la terraza', 'Vista desde el interior hacia la terraza con mesa y sillas'),
  f('terraza-1', 'terrazas', 'Terraza propia', 'Mesa de vidrio y sillas en la terraza de una cabaña'),
  f('exterior-terrazas', 'terrazas', 'Terrazas con mesas', 'Cabañas blancas con ventanales y terrazas con mesas'),
  f('terraza-2', 'terrazas', 'Terraza frente a los jardines', 'Mesa en la terraza con palmeras y juegos al fondo'),
  f('exterior-blanca', 'complejo', 'Cabañas entre jardines', 'Cabaña blanca de techo de teja con terraza y quitasol'),
  f('exterior-gris', 'complejo', 'Cabañas entre jardines', 'Cabaña de fachada gris con buganvilias'),
  f('recepcion', 'complejo', 'Recepción 24 horas', 'Caseta de recepción y calle interior del complejo'),
  f('juegos', 'complejo', 'Juegos infantiles', 'Columpios y balancín en el pasto, con palmeras'),
  f('comedor-1', 'complejo', 'Comedor nuevo', 'Comedor amplio con mesas, sillas y ventanales'),
  f('entrada', 'complejo', 'Bienvenidos a Pinamar', 'Letrero de bienvenida de Cabañas Pinamar junto a las cabañas'),
];

export const fotosPorEspacio = espacios.map((e) => ({ ...e, fotos: fotos.filter((p) => p.espacio === e.id) }));

export const resumenCabanas = {
  cantidad: 21,
  personas: 'de 1 a 7 personas',
  superficie: 'de 28 a 75 m²',
};
