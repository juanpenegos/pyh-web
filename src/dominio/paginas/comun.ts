// DOMINIO — forma del contenido común a todas las páginas (header, menú, footer, contacto).

import type { Enlace, Titular } from '../comunes';
import type { DatosEmpresa } from '../empresa';

export interface ContenidoComun {
  // Direcciones que se repiten en todo el sitio
  urls: {
    inicio: string;
    catalogo: string;
    nosotros: string;
    politicas: string;
    contacto: string;
    pagosPse: string;
    pagosPseResultado: string;
    proximamente: string;
    clientes: string;
    whatsapp: string;
    telefono: string;
    correo: string;
  };

  // Datos de la empresa (teléfonos, dirección, horario, redes…)
  empresa: DatosEmpresa;

  saltarAlContenido: string;

  logo: {
    etiquetaEnlace: string;
    nombre: string;
  };

  // Franja superior del header (solo escritorio)
  barraSuperior: {
    texto: string;
    telefono: Enlace;
    pagos: Enlace;
  };

  header: {
    menu: Enlace[];       // Enlaces que se ven siempre
    mas: { texto: string; enlaces: Enlace[] };  // Desplegable "Más"
    etiquetaMenu: string;
    botonClientes: Enlace;
    botonCotizar: Enlace;
  };

  buscador: {
    etiqueta: string;
    placeholder: string;
    boton: string;
    url: string;
  };

  menuMovil: {
    etiqueta: string;     // Nombre del menú para lectores de pantalla
    etiquetaNav: string;
    abrir: string;
    cerrar: string;
    enlaces: Enlace[];
    botonClientes: Enlace;
    botonCotizar: Enlace;
    botonPagos: Enlace;
    telefono: Enlace;
    whatsapp: Enlace;
    sellos: string[];
  };

  // Bloque "¿Subimos?" arriba del footer
  cierre: {
    titular: Titular;
    texto: string;
    boton: Enlace;
  };

  footer: {
    descripcion: string;
    menu: { titulo: string; enlaces: Enlace[] };
    catalogo: { titulo: string; enlaces: Enlace[] };
    contacto: {
      titulo: string;
      telefono: Enlace;
      correo: Enlace;
      horario: string;
      direccion: string;
    };
    cobertura: { titulo: string; texto: string };
    marcas: { titulo: string; texto: string };
    sellos: string[];
    derechos: string;
    legales: Enlace[];
    fraseFinal: Titular;
  };

  whatsapp: {
    etiqueta: string;
    url: string;
  };
}
