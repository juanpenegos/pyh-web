// DATOS DE LA EMPRESA — la ÚNICA fuente de teléfonos, correo, dirección, horario y redes.
// Tomados de alquilerpyh.com (página de Contacto). Para cambiar un dato, cámbialo aquí:
// header, footer, Contacto, Pagos PSE, WhatsApp y el JSON-LD se actualizan solos.
// Los enlaces tel:, wa.me y mailto: se arman con src/aplicacion/contacto/enlacesContacto.ts.

import type { DatosEmpresa } from '@dominio/empresa';

export const empresa: DatosEmpresa = {
  razonSocial: 'Plataformas y Herramientas S.A.S.',
  marca: 'PyH+',
  nit: '[000.000.000-0]', // Pendiente del cliente

  direccion: {
    linea1: 'Calle 24 B # 101 – 02',
    barrioCiudad: 'Barrio San José Fontibón, Bogotá',
    corta: 'Calle 24 B # 101 – 02, barrio San José Fontibón, Bogotá',
    completa: 'Calle 24 B # 101 – 02, barrio San José Fontibón, Bogotá, Colombia',
    ciudad: 'Bogotá',
    region: 'Bogotá D.C.',
    pais: 'CO',
  },
  coordenadas: { lat: 4.683291, lng: -74.133399 },

  celular: { texto: '304 364 9060', numero: '573043649060' },
  pbx: { texto: '601 295 2561', numero: '576012952561' },
  mostrarPbx: false, // Pendiente: el cliente decide si se muestra

  correo: 'info@alquilerdeplataformasyherramientas.com',

  horario: {
    largo: 'Lun a vie 7:00 a.m. a 4:30 p.m. · Sáb, dom y festivos cerrado',
    corto: 'Lun a vie 7:00 a.m. a 4:30 p.m.',
    datos: [{ dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '07:00', cierra: '16:30' }],
    zona: 'America/Bogota',
  },

  mapa: {
    comoLlegar:
      'https://www.google.com/maps/search/?api=1&query=Calle+24B+%23+101-02,+San+Jos%C3%A9+Fontib%C3%B3n,+Bogot%C3%A1',
    embebido:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988.2486362255554!2d-74.13339907373556!3d4.683291312135781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9c997c28af5f%3A0x305751bf36df5d65!2sAlquiler%20de%20plataformas%20elevadoras%20P%20y%20H%20-%20Manlift%20-%20maquinas%20para%20trabajo%20en%20alturas!5e0!3m2!1ses!2sco!4v1626308115344!5m2!1ses!2sco',
  },

  pagoPse:
    'https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=7884&searchedCategoryId=&searchedAgreementName=PLATAFORMAS%20Y%20HERRAMIENTAS%20SAS',

  redes: [
    { nombre: 'Instagram', url: 'https://www.instagram.com/plataformasyherramientas/' },
    { nombre: 'Facebook', url: 'https://www.facebook.com/pyhalquilerdeplataformas/' },
    { nombre: 'LinkedIn', url: 'https://www.linkedin.com/company/plataformasyherramientas/' },
    { nombre: 'YouTube', url: 'https://www.youtube.com/channel/UCW6uEEdAeWImG79nO63fulA/featured' },
  ],

  politicaDatos: 'https://alquilerpyh.com/pdf/Politica-Tratamiento-de-Datos-PyH.pdf',
  terminos: 'https://alquilerpyh.com/terminos-y-condiciones',

  sellos: ['Miembro IPAF', 'Equipos certificados ONAC', 'Res. 4272 de 2021', 'Res. 1409 de 2012'],
};
