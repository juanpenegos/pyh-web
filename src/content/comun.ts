// CONTENIDO COMÚN — se repite en todas las páginas (header, menú, footer, contacto).
// Para cambiar un texto, edita su valor aquí. Los valores vacíos se llenan en la tanda 2.

import type { Enlace } from './tipos';

export const comun = {
  // Datos de la empresa
  empresa: {
    nombreCorto: '',   // PyH+
    razonSocial: '',   // Pendiente del cliente
    nit: '',           // Pendiente del cliente
  },

  // Accesibilidad
  saltarAlContenido: '',

  // Franja superior del header
  barraSuperior: {
    texto: '',
    telefono: { texto: '', url: '' } as Enlace,
    pagos: { texto: '', url: '' } as Enlace,
  },

  // Header
  header: {
    logoAlt: '',
    menu: [] as Enlace[],
    botonCotizar: { texto: '', url: '' } as Enlace,
    buscador: {
      etiqueta: '',
      placeholder: '',
    },
  },

  // Menú móvil
  menuMovil: {
    abrir: '',
    cerrar: '',
    enlaces: [] as Enlace[],
  },

  // Bloque de cierre antes del footer ("¿Subimos?")
  cierre: {
    titulo: '',
    texto: '',
    boton: { texto: '', url: '' } as Enlace,
  },

  // Footer
  footer: {
    descripcion: '',
    menu: {
      titulo: '',
      enlaces: [] as Enlace[],
    },
    catalogo: {
      titulo: '',
      enlaces: [] as Enlace[],
    },
    contacto: {
      titulo: '',
      telefono: { texto: '', url: '' } as Enlace,
      correo: { texto: '', url: '' } as Enlace,
      horario: '',
      direccion: '',
    },
    cobertura: {
      titulo: '',
      ciudades: '',
    },
    marcas: {
      titulo: '',
      lista: '',
    },
    certificaciones: [] as string[],
    derechos: '',
    legales: [] as Enlace[],
    fraseFinal: '',
  },

  // Botón flotante de WhatsApp
  whatsapp: {
    etiqueta: '',
    url: '',
  },
};
