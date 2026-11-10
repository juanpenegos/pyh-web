// DOMINIO — forma del contenido común a todas las páginas (header, menú, footer, contacto).

import type { Enlace, Titular } from '../comunes';

export interface ContenidoComun {
  // Direcciones que se repiten en todo el sitio
  urls: {
    inicio: string;
    catalogo: string;
    nosotros: string;
    proximamente: string;
    whatsapp: string;
    telefono: string;
    correo: string;
  };

  empresa: {
    nombreCorto: string;
    razonSocial: string;
    nit: string;
  };

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
    menu: Enlace[];
    etiquetaMenu: string;
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
