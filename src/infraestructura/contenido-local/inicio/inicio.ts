// CONTENIDO DE INICIO — las secciones van en el mismo orden que en el diseño (Main / M-Inicio).
// Para cambiar un texto, edita su valor aquí.
// Los valores entre corchetes, p. ej. "[+100]", están pendientes de confirmar con el cliente (ver PLAN.md).
// En los titulares, "\n" es un cambio de línea y `resaltado` pinta esa parte de otro color.

import type { ContenidoInicio } from '@dominio/paginas/inicio';
import { urls } from '../comun/urls';
import { urlConFiltro } from '@aplicacion/catalogo/direccion';
import { ID_GRUPO_FAMILIA } from '../catalogo/catalogo';

const m = (archivo: string) => `/media/${archivo}`;

/** Enlace al catálogo ya filtrado por un tipo de equipo (/catalogo?familia=tijera-electrica). */
const familia = (nombre: string) => urlConFiltro(urls.catalogo, ID_GRUPO_FAMILIA, nombre);

export const inicio: ContenidoInicio = {
  seo: {
    titulo: 'Alquiler de plataformas elevadoras en Bogotá | PyH+',
    descripcion:
      'Alquiler y venta de plataformas elevadoras en Bogotá y toda Colombia: tijeras, brazos articulados y telescópicos de 6 a 43 m, con operario certificado si lo necesitas.',
  },

  desliza: 'Desliza',

  // Hero con los videos
  hero: {
    titular: { partes: [{ texto: 'Alquiler de plataformas\nen Bogotá' }] },
    // El diseño tiene un tercer video ("Fachada") que todavía no existe; al tenerlo, agrégalo aquí.
    videos: [
      { src: m('hero-clip-1-ee036e.mp4'), alt: 'Video comercial de plataforma elevadora PyH+' },
      { src: m('hero-clip-2-c12b9c.mp4'), alt: 'Video comercial de tijera elevadora PyH+' },
    ],
    botonPrincipal: { texto: 'Cotizar ahora', url: urls.whatsapp },
    botonSecundario: { texto: 'Ver catálogo', url: urls.catalogo },
    etiquetaAccesos: 'Tipos de plataforma',
    accesosFamilias: [
      { texto: 'Tijera eléctrica', url: familia('Tijera eléctrica') },
      { texto: 'Tijera diésel', url: familia('Tijera diésel') },
      { texto: 'Brazo articulado', url: familia('Brazo articulado') },
      { texto: 'Brazo telescópico', url: familia('Brazo telescópico') },
      { texto: 'Unipersonal', url: familia('Unipersonal') },
    ],
    accesoTodo: { texto: 'Ver todo', url: urls.catalogo },
  },

  // Franja amarilla de sellos
  sellos: {
    etiqueta: 'Certificaciones',
    lista: [
      { valor: 'ONAC', etiqueta: 'Equipos certificados' },
      { valor: 'IPAF', etiqueta: 'Miembro activo' },
      { valor: '4272', etiqueta: 'Res. 2021 alturas' },
      { valor: '43 m', etiqueta: 'Nuestro equipo más alto' },
    ],
    botonSiguientes: 'Ver las siguientes certificaciones',
    botonAnteriores: 'Ver las certificaciones anteriores',
  },

  // Presentación corta ("Somos PyH+.")
  nosotros: {
    eyebrow: 'Nosotros',
    titular: { partes: [{ texto: 'Somos ' }, { texto: 'PyH+', resaltado: true }, { texto: '.' }] },
    texto:
      'Plataformas y Herramientas S.A.S. Trabajamos con empresas pequeñas, medianas y grandes para que el trabajo en alturas sea seguro, rápido y sin sorpresas.',
    enlace: { texto: 'Conoce nuestra historia', url: urls.nosotros },
    imagen: {
      src: m('foto-operario-equipo-seguridad-senalando-hacia-arriba-433570.webp'),
      alt: 'Operario PyH+ con arnés y casco señalando hacia arriba',
    },
  },

  // Catálogo destacado ("Elige tu altura.")
  catalogoDestacado: {
    eyebrow: 'Catálogo',
    titular: { partes: [{ texto: 'Elige tu ' }, { texto: 'altura', resaltado: true }, { texto: '.' }] },
    texto: 'Cinco familias de equipos, eléctricos y diésel. Pasa el cursor y mira cómo suben.',
    textoMovil: 'Cinco familias de equipos, eléctricos y diésel. Desliza y mira cómo suben.',
    enlace: { texto: 'Ver todo el catálogo', url: urls.catalogo },
    familias: [
      {
        numero: '+01',
        nombre: 'Tijera eléctrica',
        resumen: 'Hasta 14 m · interior',
        descripcion: 'Sube recto y en silencio. Ideal para bodegas, centros comerciales y pisos lisos. Plataforma amplia para 2 personas.',
        imagen: { src: m('maquina-tijera-electrica-recomendada-para-alquiler-370c7e.webp'), alt: 'Alquiler de tijera eléctrica PyH+' },
        alturaImagen: 240,
        url: familia('Tijera eléctrica'),
      },
      {
        numero: '+02',
        nombre: 'Brazo articulado',
        resumen: 'Hasta 20 m · esquiva obstáculos',
        descripcion: 'Su brazo se dobla y esquiva obstáculos. Perfecto para fachadas y estructuras de difícil acceso.',
        imagen: { src: m('maquina-alquiler-brazo-articulado-electrico-7794fc.webp'), alt: 'Alquiler de brazo articulado eléctrico' },
        alturaImagen: 240,
        url: familia('Brazo articulado'),
      },
      {
        numero: '+03',
        nombre: 'Brazo telescópico',
        resumen: 'Hasta 43 m · máximo alcance',
        descripcion: 'Brazo recto de máximo alcance, hasta 43 m. Para grandes alturas y obras exteriores.',
        imagen: { src: m('maquina-alquiler-brazo-telescopico-diesel-5df650.webp'), alt: 'Alquiler de brazo telescópico diésel' },
        alturaImagen: 190,
        url: familia('Brazo telescópico'),
      },
      {
        numero: '+04',
        nombre: 'Unipersonal',
        resumen: 'Hasta 10 m · espacios estrechos',
        descripcion: 'Liviana y angosta: entra por puertas y pasillos. Para una persona en trabajos livianos.',
        imagen: { src: m('maquina-alquiler-plataforma-unipersonal-36976a.webp'), alt: 'Alquiler de plataforma unipersonal' },
        alturaImagen: 240,
        url: familia('Unipersonal'),
      },
      {
        numero: '+05',
        nombre: 'Tijera diésel',
        resumen: 'Hasta 18 m · terreno difícil',
        descripcion: 'Tracción todo terreno. Aguanta barro y pendientes en obra, con más capacidad de carga.',
        imagen: { src: m('maquina-alquiler-tijera-diesel-todo-terreno-ad3729.webp'), alt: 'Alquiler de tijera diésel todo terreno' },
        alturaImagen: 170,
        url: familia('Tijera diésel'),
      },
    ],
  },

  // Asistente de 3 preguntas
  asistente: {
    eyebrow: 'Asistente PyH+',
    titular: {
      partes: [{ texto: '¿No sabes qué plataforma necesitas? ' }, { texto: 'Te lo decimos en 3 toques.', resaltado: true }],
    },
    texto: 'Tres preguntas, una recomendación. Si después quieres hablar con alguien, te pasamos directo a un asesor.',
    etiquetaPaso: 'Paso {actual} de {total}',
    preguntas: [
      {
        pregunta: '¿Dónde vas a trabajar?',
        opciones: [
          { titulo: 'Interior', descripcion: 'Bodegas, centros comerciales, piso liso.' },
          { titulo: 'Exterior', descripcion: 'Obra, fachadas, terreno irregular.' },
          { titulo: 'Ambos', descripcion: 'Un poco de todo.' },
          { titulo: 'No estoy seguro', descripcion: 'Te ayudamos a definirlo.' },
        ],
      },
      {
        pregunta: '¿A qué altura necesitas llegar?',
        opciones: [
          { titulo: 'Hasta 8 m', descripcion: 'Techos de bodega, vitrinas.' },
          { titulo: 'De 8 a 15 m', descripcion: 'Naves industriales, fachadas bajas.' },
          { titulo: 'De 15 a 25 m', descripcion: 'Edificios, tarimas.' },
          { titulo: 'Más de 25 m', descripcion: 'Grandes alturas, hasta 43 m.' },
        ],
      },
      {
        pregunta: '¿Qué vas a hacer arriba?',
        opciones: [
          { titulo: 'Mantenimiento', descripcion: 'Cableado, ductos, iluminación.' },
          { titulo: 'Fachadas', descripcion: 'Limpieza, pintura, vidrios.' },
          { titulo: 'Eventos', descripcion: 'Tarimas, vallas, montajes.' },
          { titulo: 'Bodegaje', descripcion: 'Racks, inventarios.' },
        ],
      },
    ],
    // La recomendación sale de la respuesta a "¿A qué altura necesitas llegar?" (pregunta 2)
    preguntaQueDecide: 1,
    recomendaciones: [
      {
        equipo: 'Unipersonal de 8 m',
        motivo: 'Liviana y angosta: entra en pasillos y espacios estrechos.',
        imagen: { src: m('maquina-alquiler-plataforma-unipersonal-36976a.webp'), alt: 'Plataforma unipersonal recomendada para alquiler' },
      },
      {
        equipo: 'Tijera eléctrica de 12 m',
        motivo: 'Interior, piso liso y altura media: sube recto, no marca el piso y cabe por puertas estándar.',
        imagen: { src: m('maquina-tijera-electrica-recomendada-para-alquiler-370c7e.webp'), alt: 'Tijera eléctrica recomendada para alquiler' },
      },
      {
        equipo: 'Brazo articulado de 20 m',
        motivo: 'Esquiva obstáculos y llega a fachadas y estructuras medianas.',
        imagen: { src: m('maquina-alquiler-brazo-articulado-electrico-7794fc.webp'), alt: 'Brazo articulado recomendado para alquiler' },
      },
      {
        equipo: 'Brazo telescópico de 43 m',
        motivo: 'El máximo alcance de nuestra flota, ideal para grandes alturas.',
        imagen: { src: m('maquina-alquiler-brazo-telescopico-diesel-5df650.webp'), alt: 'Brazo telescópico recomendado para alquiler' },
      },
    ],
    recomendacionPorDefecto: 1,
    enlaceSaltar: { texto: 'Saltar e ir al catálogo', url: urls.catalogo },
    botonAtras: 'Atrás',
    eyebrowResultado: 'Tu equipo ideal',
    botonCotizar: { texto: 'Cotizar este equipo', url: urls.whatsapp },
    botonReiniciar: 'Volver a empezar',
  },

  // "Subimos personas. Bajamos riesgos. Ese es el +."
  confianza: {
    etiqueta: 'Quiénes somos',
    titular: {
      partes: [
        { texto: 'Subimos personas.\n' },
        { texto: 'Bajamos riesgos.', resaltado: 'azul' },
        { texto: '\nEse es el ' },
        { texto: '+', resaltado: 'verde' },
        { texto: '.' },
      ],
    },
    texto:
      'Somos Plataformas y Herramientas S.A.S. Alquilamos, vendemos y mantenemos plataformas elevadoras para que tu equipo trabaje arriba con la tranquilidad de estar abajo.',
    imagen: {
      src: m('maquina-plataforma-elevadora-articulada-movimiento-0f3248.webp'),
      alt: 'Plataforma elevadora articulada PyH+ en movimiento',
    },
    garantias: [
      { texto: 'Cumplimiento Res. 4272 de 2021', icono: 'documento' },
      { texto: 'Equipos certificados ONAC', icono: 'escudo' },
      { texto: 'Operario si lo necesitas', icono: 'persona' },
      { texto: 'Entrega en Bogotá y todo el país', icono: 'camion' },
    ],
    cifras: [
      { valor: '6–43 m', etiqueta: 'de altura de trabajo en una sola flota' },
      { valor: '[+100]', etiqueta: 'equipos listos para salir' },
      { valor: '[24 h]', etiqueta: 'entrega en Bogotá y alrededores' },
      { valor: '100%', etiqueta: 'equipos con certificación ONAC' },
    ],
    enlace: { texto: 'Conoce PyH+', url: urls.nosotros },
  },

  // Marquesina de clientes
  // Nombres provisionales: confirmar con el cliente qué logo es cada uno (ver MEDIA.md).
  clientes: {
    etiqueta: 'Clientes',
    titulo: 'Empresas que ya subieron con nosotros',
    lista: [
      { nombre: 'Multiplaza', logo: { src: m('logo-multiplaza-5690f9.png'), alt: 'Logo Multiplaza' } },
      { nombre: 'El Dorado', logo: { src: m('logo-el-dorado-a71eeb.png'), alt: 'Logo El Dorado' } },
      { nombre: 'Parque La Colina', logo: { src: m('logo-parque-la-colina-2ec3b6.png'), alt: 'Logo Parque La Colina' } },
    ],
  },

  // Casos ("Casos que subieron de nivel.")
  casos: {
    titular: { partes: [{ texto: 'Casos que ' }, { texto: 'subieron', resaltado: true }, { texto: ' de nivel.' }] },
    destacado: {
      etiquetas: ['Aeropuerto', '[Bogotá]', '[Tijera eléctrica]'],
      titulo: 'Aeropuerto El Dorado: trabajo en altura de noche, sin parar la operación.',
      imagen: {
        src: m('foto-tijera-electrica-amarilla-frente-a-fachada-iluminada-ed0ac7.png'),
        alt: 'Tijera eléctrica amarilla frente a la fachada iluminada del aeropuerto El Dorado, de noche',
      },
      enlace: { texto: 'Ver el caso →', url: urls.proximamente },
    },
    cifra: { valor: '[+500]', etiqueta: 'proyectos entregados en alturas en todo el país' },
    testimonio: {
      estrellas: 5,
      etiquetaEstrellas: '5 de 5 estrellas',
      cita: '“Teníamos que trabajar en la fachada de noche, sin detener la operación del aeropuerto. PyH+ llegó a tiempo, con el equipo listo y un operario certificado. Cumplieron lo que prometieron.”',
      iniciales: 'EH',
      nombre: 'Edwin Higuera',
      cargo: 'Jefe de mantenimiento · Aeropuerto El Dorado',
    },
  },

  // "Así se mueven." — en escritorio se lee "Etiqueta: texto"
  movimiento: {
    titular: { partes: [{ texto: 'Así se ' }, { texto: 'mueven', resaltado: true }, { texto: '.' }] },
    clips: [
      {
        etiqueta: 'Tijera',
        texto: 'Sube recto, sin moverse de su huella.',
        video: {
          src: m('clip-tijera-elevadora-subiendo-plataforma-a14fc7.mp4'),
          poster: m('poster-tijera-elevadora-subiendo-plataforma-8172c0.jpg'),
          alt: 'Tijera elevadora PyH+ subiendo su plataforma',
        },
      },
      {
        etiqueta: 'Telescópico',
        texto: '43 m de alcance para tarimas.',
        video: {
          src: m('clip-brazo-telescopico-extendiendo-alcance-ee7157.mp4'),
          poster: m('poster-brazo-telescopico-extendiendo-alcance-870595.jpg'),
          alt: 'Brazo telescópico PyH+ extendiendo su alcance',
        },
      },
      {
        etiqueta: 'Articulado',
        texto: 'Esquiva cornisas y llega.',
        video: {
          src: m('clip-brazo-articulado-elevando-canasta-39fd07.mp4'),
          poster: m('poster-brazo-articulado-elevando-canasta-9b9413.jpg'),
          alt: 'Brazo articulado PyH+ elevando su canasta',
        },
      },
      {
        etiqueta: 'Unipersonal',
        texto: 'Entra por puertas estrechas.',
        video: {
          src: m('clip-plataforma-articulada-compacta-girando-base-c2a6dc.mp4'),
          poster: m('poster-plataforma-articulada-compacta-girando-base-f65594.jpg'),
          alt: 'Plataforma articulada compacta PyH+ girando sobre su base',
        },
      },
      {
        etiqueta: 'Con operario',
        texto: 'Tú pides, nosotros subimos.',
        video: {
          src: m('clip-plataforma-telescopica-ruedas-moviendo-brazo-9377a5.mp4'),
          poster: m('poster-plataforma-telescopica-ruedas-moviendo-brazo-8aed78.jpg'),
          alt: 'Plataforma telescópica sobre ruedas PyH+ moviendo su brazo',
        },
      },
    ],
  },

  // Preguntas frecuentes
  preguntas: {
    etiqueta: 'Preguntas frecuentes',
    eyebrow: 'Más preguntas',
    titular: {
      partes: [{ texto: 'Lo que más nos ' }, { texto: 'preguntan', resaltado: 'azul' }, { texto: ' antes de subir.' }],
    },
    textoAntes: 'Respuestas cortas sobre alquiler y venta de plataformas elevadoras en Colombia. Si te queda alguna duda, ',
    enlace: { texto: 'cotiza aquí', url: urls.whatsapp },
    textoDespues: ' y te asesoramos.',
    lista: [
      {
        pregunta: '¿Qué es un manlift y para qué sirve?',
        respuesta:
          'Manlift es otro nombre de la plataforma elevadora: una máquina que lleva personas y herramientas a trabajar en altura de forma segura. Se usa en mantenimiento industrial, fachadas, instalaciones eléctricas, bodegas y eventos.',
      },
      {
        pregunta: '¿Cuánto cuesta alquilar una plataforma tijera?',
        respuesta:
          'Depende de la altura, el tipo (eléctrica o diésel) y el tiempo de alquiler: por día, semana o mes. Cuéntanos qué necesitas y te enviamos una cotización con transporte e inducción incluidos.',
      },
      {
        pregunta: '¿Qué diferencia hay entre un manlift tipo tijera y un brazo articulado?',
        respuesta:
          'La tijera sube recto y ofrece una plataforma amplia, ideal para interiores y bodegas. El brazo articulado esquiva obstáculos y llega más lejos, ideal para fachadas y estructuras.',
      },
      {
        pregunta: '¿Alquilan y venden plataformas elevadoras en Colombia?',
        respuesta:
          'Sí. Hacemos alquiler y venta de plataformas elevadoras nuevas y usadas, con entrega en Bogotá, Soacha, Chía y el resto del país.',
      },
      {
        pregunta: '¿Necesito certificado para operar una plataforma?',
        respuesta:
          'Sí. La Resolución 4272 de 2021 exige certificado de trabajo en alturas. Si no lo tienes, alquilas con nuestro operario certificado.',
      },
      {
        pregunta: '¿Qué alturas manejan?',
        respuesta:
          'Desde 6 m hasta 43 m, en tijera, brazo articulado y brazo telescópico. Si no sabes cuál elegir, el cotizador te recomienda una en tres preguntas.',
      },
    ],
  },

  // Certificaciones ("Seguro no es un eslogan. Es un papel firmado.")
  certificaciones: {
    titular: {
      partes: [{ texto: 'Seguro no es un eslogan. ' }, { texto: 'Es un papel firmado.', resaltado: 'azul' }],
    },
    texto:
      'Cumplimos la Resolución 4272 de 2021 (requisitos mínimos para trabajo en alturas) y la 1409 de 2012. Mantenimiento al día, póliza todo riesgo y operarios con certificado de competencia.',
    etiquetaDescripcion: '¿Qué es?',
    lista: [
      {
        sigla: 'ONAC',
        titulo: 'Equipos certificados',
        descripcion: 'Organismo Nacional de Acreditación de Colombia: certifica la inspección de cada equipo.',
      },
      {
        sigla: 'IPAF',
        titulo: 'Miembro activo',
        descripcion: 'Federación internacional de acceso motorizado: ser miembro respalda nuestras buenas prácticas.',
      },
      {
        sigla: '4272',
        titulo: 'Res. 2021 · Alturas',
        descripcion: 'Resolución 4272 de 2021: requisitos mínimos de seguridad para trabajo en alturas.',
      },
      {
        sigla: '1409',
        titulo: 'Res. 2012 · Caídas',
        descripcion: 'Resolución 1409 de 2012: reglamento de seguridad para protección contra caídas.',
      },
    ],
    enlace: { texto: 'Ver todos los certificados', url: `${urls.nosotros}#certificados` },
  },

  // Galería "En la obra, no en el catálogo."
  galeria: {
    etiqueta: 'En la obra',
    titular: { partes: [{ texto: 'En la obra, ' }, { texto: 'no en el catálogo.', resaltado: 'azul' }] },
    video: {
      src: m('video-tijera-electrica-extendida-bodega-operario-trabajando-altura-873a54.mp4'),
      poster: m('poster-tijera-electrica-extendida-bodega-operario-trabajando-altura-a8758a.jpg'),
      alt: 'Tijera eléctrica PyH+ extendida en una bodega con un operario trabajando en altura',
      posicion: '52% 50%',
    },
    fotos: [
      {
        src: m('foto-brazo-articulado-operario-canasta-trabajando-aire-libre-0f170a.jpg'),
        alt: 'Brazo articulado PyH+ con operario en la canasta, trabajando al aire libre',
        posicion: '82% 50%',
      },
      {
        src: m('foto-tijera-electrica-bodega-operario-plataforma-135574.jpg'),
        alt: 'Tijera eléctrica PyH+ en una bodega con un operario sobre la plataforma',
        posicion: '50% 78%',
      },
    ],
    cifra: { valor: '14 m', etiqueta: 'de altura en bodegas, sin salir del piso' },
    fotoCifra: {
      src: m('foto-tijera-electrica-extendida-dentro-bodega-operario-trabajando-ee52d1.png'),
      alt: 'Tijera eléctrica PyH+ extendida dentro de una bodega, con un operario trabajando en la plataforma',
      posicion: '50% 35%',
    },
    frase: 'Llega donde\nla escalera no.',
    imagenFrase: { src: m('maquina-alquiler-brazo-articulado-electrico-7794fc.webp'), alt: 'Alquiler de brazo articulado eléctrico' },
  },

  // "Lo que viene con el +"
  beneficios: {
    titular: { partes: [{ texto: 'Lo que viene con el ' }, { texto: '+', resaltado: true }] },
    lista: [
      { numero: '01', titulo: 'Maquinaria de alturas', texto: 'Flota eléctrica y diésel de 6 a 43 m, con mantenimiento al día.', icono: 'flecha' },
      { numero: '02', titulo: 'Equipo comprometido', texto: 'Operarios y técnicos certificados que llegan contigo a la obra.', icono: 'destello' },
      { numero: '03', titulo: 'Múltiples soluciones', texto: 'Alquiler, venta, repuestos, transporte y capacitación.', icono: 'flecha-doble' },
      { numero: '04', titulo: 'Valor agregado', texto: 'Asesoría para elegir bien y acompañamiento en todo el proyecto.', icono: 'mas' },
    ],
  },

  // Blog ("Aprende antes de subir.") — el blog todavía no existe: lleva a "Próximamente"
  blog: {
    titular: { partes: [{ texto: 'Aprende antes de ' }, { texto: 'subir', resaltado: true }, { texto: '.' }] },
    enlace: { texto: 'Ver blog', url: urls.proximamente },
    articulos: [
      {
        categoria: 'Normativa · 6 min',
        titulo: 'Resolución 4272 de 2021: lo que debes saber antes de trabajar en alturas',
        imagen: {
          src: m('foto-tijera-electrica-bodega-operario-trabajando-altura-1950a7.jpg'),
          alt: 'Tijera eléctrica PyH+ en una bodega con un operario trabajando en altura',
          posicion: '50% 40%',
        },
        url: urls.proximamente,
      },
      {
        categoria: 'Guías · 7 min',
        titulo: '¿Tijera o brazo articulado? La guía para no equivocarte',
        imagen: {
          src: m('foto-tijera-electrica-extendida-operario-plataforma-0d2523.jpg'),
          alt: 'Tijera eléctrica PyH+ extendida con un operario en la plataforma',
          posicion: '50% 35%',
        },
        url: urls.proximamente,
      },
      {
        categoria: 'Seguridad · 5 min',
        titulo: '5 chequeos antes de subir a una plataforma (y por qué importan)',
        imagen: {
          src: m('foto-operario-casco-arnes-tijera-electrica-64130b.jpg'),
          alt: 'Operario PyH+ con casco y arnés sobre una tijera eléctrica',
          posicion: '50% 28%',
        },
        url: urls.proximamente,
      },
    ],
  },
};
