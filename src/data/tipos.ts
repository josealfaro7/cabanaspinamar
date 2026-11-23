import { fotos, type Foto } from './recorrido';

export interface TipoCabana {
  id: string;
  nombre: string;
  detalle: string;
  descripcion: string;
  portada: string;
  fotos: Foto[];
}

const porId = (ids: string[]) => ids.map((id) => fotos.find((p) => p.id === id)!).filter(Boolean);

export const tiposCabana: TipoCabana[] = [
  {
    id: 'tipo-1',
    nombre: 'Cabaña tipo 1',
    detalle: '',
    descripcion: '',
    portada: 'exterior-blanca',
    fotos: porId(['exterior-blanca', 'living-cocina-1', 'cocina-1', 'dormitorio-matrimonial-3', 'dormitorio-dos-camas', 'cocina-3', 'bano-1', 'terraza-1']),
  },
  {
    id: 'tipo-2',
    nombre: 'Cabaña tipo 2',
    detalle: '',
    descripcion: '',
    portada: 'exterior-terrazas',
    fotos: porId(['exterior-terrazas', 'living-cocina-2', 'living-2', 'dormitorio-matrimonial-2', 'literas-2', 'bano-2', 'terraza-2']),
  },
  {
    id: 'tipo-3',
    nombre: 'Cabaña tipo 3',
    detalle: '',
    descripcion: '',
    portada: 'exterior-gris',
    fotos: porId(['exterior-gris', 'living-1', 'cocina-2', 'dormitorio-matrimonial-1', 'literas-1', 'terraza-vista']),
  },
];
