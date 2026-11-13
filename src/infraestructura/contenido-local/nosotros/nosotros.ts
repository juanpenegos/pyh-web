// CONTENIDO DE NOSOTROS — pantallas D-Nosotros y M-Nosotros.
// Para cambiar un texto, edita su valor aquí. Los datos entre [corchetes] están pendientes del cliente.

import type { ContenidoNosotros } from '@dominio/paginas/nosotros';
import { urls, ANCLA_POLITICAS } from '../comun/urls';

// Mientras no existan los PDF, "Ver documento" y "Descargar PDF" llevan a la página "En construcción"
const PDF_PENDIENTE = urls.proximamente;
const verDocumento = { texto: 'Ver documento', url: PDF_PENDIENTE };

export const nosotros: ContenidoNosotros = {
  seo: {
    titulo: 'Nosotros: alquiler de plataformas elevadoras en Colombia | PyH+',
    descripcion:
      'Conoce a PyH+: alquiler y venta de plataformas para trabajo en alturas, miembros IPAF, equipos certificados ONAC y cumplimiento de las Res. 1409/2012 y 4272/2021.',
  },

  etiquetaMigas: 'Ruta',
  migas: [
    { texto: 'Inicio', url: urls.inicio },
    { texto: 'Nosotros PyH+', url: urls.nosotros },
  ],

  // Encabezado ("Somos el + de tu obra.")
  encabezado: {
    eyebrow: 'Alquiler de plataformas para trabajo en alturas',
    titular: { partes: [{ texto: 'Somos el ' }, { texto: '+', resaltado: true }, { texto: '\nde tu obra.' }] },
    texto:
      'Somos Plataformas y Herramientas S.A.S. Desde [2010] llevamos plataformas elevadoras a obras, bodegas, fachadas y eventos de todo el país. Lo nuestro es que trabajes arriba como si estuvieras abajo.',
    botones: {
      principal: { texto: 'Cotizar un equipo', url: urls.whatsapp },
      secundario: { texto: 'Nuestra historia', url: '#historia' },
    },
    foto: {
      src: '/media/foto-operario-equipo-seguridad-senalando-hacia-arriba-433570.webp',
      alt: 'Operario PyH+ con arnés y casco en trabajo en alturas',
    },
  },

  // Misión y visión
  mision: {
    titulo: 'Misión',
    texto:
      'En Plataformas y Herramientas S.A.S nos comprometemos con las pequeñas, medianas y grandes empresas a tener prácticas seguras relacionadas con el trabajo en alturas, proporcionando un excelente servicio y la solución adecuada para cada uno de nuestros clientes.',
    nota: '[Texto a validar con PyH+]',
  },
  vision: {
    titulo: 'Visión',
    texto:
      'Ser reconocidos como la empresa líder del sector, destacada por la excelencia en la atención al cliente, la operación de equipos en óptimas condiciones, la confiabilidad de nuestros procesos y la agilidad en cada servicio prestado.',
    nota: '[Texto a validar con PyH+]',
  },

  // Historia ("De dos plataformas a 43 metros"), con el video y la foto del equipo
  historia: {
    titular: { partes: [{ texto: 'De dos plataformas ' }, { texto: 'a 43 metros', resaltado: true }, { texto: '.' }] },
    hitos: [
      { anio: '[2010]', titulo: 'Arrancamos', texto: 'Dos plataformas, una bodega y muchas ganas de hacer las cosas bien.' },
      { anio: '[2014]', titulo: 'Llegan los brazos', texto: 'Sumamos brazos articulados y telescópicos para obras de gran altura.' },
      { anio: '[2019]', titulo: 'Miembros IPAF', texto: 'Nos unimos a la federación internacional de acceso motorizado.' },
      { anio: '[2023]', titulo: 'Flota certificada ONAC', texto: 'Todos los equipos con certificado de inspección vigente.' },
      {
        anio: '2026',
        titulo: 'Se consolida PyH+',
        texto: 'No empezó hoy: es la suma de años de obras y equipos que no fallan. Subir seguro. Ese es el +.',
        actual: true,
      },
    ],
    video: {
      video: {
        src: '/media/video-equipo-feria-stand-montaje-plataformas-elevadoras-exhibicion-75aa91.mp4#t=0.5',
        alt: 'El equipo de PyH+ en una feria: stand, montaje y plataformas elevadoras en exhibición',
      },
      etiqueta: 'Así trabajamos · En ferias y en campo',
      ayuda: '▶ Pasa el mouse para ver y escuchar',
    },
    foto: {
      imagen: {
        src: '/media/foto-equipo-chaquetas-corporativas-posando-tarima-plataforma-elevadora-9b22eb.webp',
        alt: 'El equipo de PyH+ con chaquetas corporativas posando sobre una tarima, con una plataforma elevadora proyectada al fondo',
        posicion: '55% 50%',
      },
      etiqueta: 'Las personas detrás de PyH+',
    },
  },

  // Valores ("Lo que no negociamos")
  valores: {
    titular: { partes: [{ texto: 'Lo que no ' }, { texto: 'negociamos', resaltado: true }, { texto: '.' }] },
    lista: [
      { numero: '+01', titulo: 'Seguridad primero', texto: 'Si no es seguro, no se sube. Así de simple.' },
      { numero: '+02', titulo: 'Cumplimos la hora', texto: 'El equipo llega cuando dijimos, revisado y limpio.' },
      { numero: '+03', titulo: 'Hablamos claro', texto: 'Precios sin letra pequeña y asesoría honesta.' },
      { numero: '+04', titulo: 'Siempre un +', texto: 'Inducción, soporte y acompañamiento en obra.' },
    ],
  },

  // Certificados ("Certificados, no promesas")
  certificados: {
    titular: { partes: [{ texto: 'Certificados, ' }, { texto: 'no promesas', resaltado: 'azul' }, { texto: '.' }] },
    texto:
      'Cada equipo tiene certificado de inspección ONAC vigente y mantenimiento documentado. Descarga los certificados en la ficha de cada equipo.',
    lista: [
      { sigla: 'ONAC', titulo: 'Equipos certificados', documento: verDocumento },
      { sigla: 'IPAF', titulo: 'Miembro activo', documento: verDocumento },
      { sigla: '4272', titulo: 'Res. 2021 · Alturas', documento: verDocumento },
      { sigla: '1409', titulo: 'Res. 2012 · Caídas', documento: verDocumento },
      { sigla: 'TODO RIESGO', titulo: 'Póliza vigente', documento: verDocumento },
      { sigla: 'OPERARIOS', titulo: 'Certificado de competencia', documento: verDocumento },
    ],
  },

  // Equipo ("Las personas del +")
  equipo: {
    titular: { partes: [{ texto: 'Las personas ' }, { texto: 'del +', resaltado: true }, { texto: '.' }] },
    nota: 'Espacios para fotos del equipo, recortadas sin fondo como las máquinas.',
    etiquetaFoto: 'Foto',
    personas: [
      { nombre: '[Nombre]', cargo: 'Gerencia' },
      { nombre: '[Nombre]', cargo: 'Comercial' },
      { nombre: '[Nombre]', cargo: 'Mantenimiento' },
      { nombre: '[Nombre]', cargo: 'SST y operarios' },
    ],
  },

  // Políticas (acordeón con descarga)
  politicas: {
    id: ANCLA_POLITICAS,
    titular: { partes: [{ texto: 'Políticas' }, { texto: '.', resaltado: true }] },
    texto: 'Documentos editables desde el CRM.',
    descargar: 'Descargar PDF',
    lista: [
      'Política de seguridad y salud en el trabajo',
      'Política de calidad',
      'Política ambiental',
      'Política de tratamiento de datos personales',
      'Términos y condiciones de alquiler',
    ].map((titulo) => ({
      titulo,
      resumen: '[Resumen de la política, 2 o 3 líneas, cargado desde el CRM.]',
      pdf: PDF_PENDIENTE,
    })),
  },
};
