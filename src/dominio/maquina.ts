// DOMINIO — una máquina del catálogo (plataforma elevadora).

import type { Imagen } from './comunes';

export interface Maquina {
  id: string;
  nombre: string;
  familia: string;      // Tijera eléctrica, Brazo articulado...
  energia: string;      // Eléctrica, Diésel
  alturaM: number;      // Altura de trabajo en metros (sirve para filtrar y ordenar)
  terreno: string[];    // Interior, Exterior...
  marca: string;
  modalidad: string[];  // Alquiler, Venta
  capacidad: string;    // p. ej. "230 kg"
  imagen: Imagen;
  alturaImagen: number; // Alto de la foto en la tarjeta (px), para que cada máquina se vea a su escala
  insignia?: string;    // p. ej. "Más alquilado"
  disponibilidad: string; // Texto: "Disponible hoy", "Entrega en 48 h", "Bajo reserva"
  estado: 'disponible' | 'pronto' | 'reserva'; // Define el color del punto (verde, amarillo, gris)
  url?: string;         // Ficha de detalle (fuera de alcance por ahora)
}
