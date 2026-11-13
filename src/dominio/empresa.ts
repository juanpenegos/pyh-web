// DOMINIO — datos de la empresa (razón social, teléfonos, dirección, horario, redes…).
// Hay UN solo archivo con los valores: src/infraestructura/contenido-local/comun/empresa.ts.
// Header, footer, Contacto, Pagos PSE, WhatsApp y el JSON-LD para Google salen de ahí.

/** Un número de teléfono. `numero` va solo con dígitos y el indicativo del país (573043649060). */
export interface Telefono {
  texto: string;   // Como se lee en pantalla: "304 364 9060"
  numero: string;  // Para armar tel: y wa.me
}

/** Un día de atención, en el formato que entiende Google (schema.org). */
export interface HorarioAtencion {
  dias: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  abre: string;    // "07:00"
  cierra: string;  // "16:30"
}

export interface DatosEmpresa {
  razonSocial: string;
  marca: string;
  nit: string;
  direccion: {
    linea1: string;      // "Calle 24 B # 101 – 02"
    barrioCiudad: string;
    corta: string;       // Sin el país (footer)
    completa: string;
    ciudad: string;
    region: string;
    pais: string;        // Código de país: "CO"
  };
  coordenadas: { lat: number; lng: number };
  celular: Telefono;     // También es el WhatsApp
  pbx: Telefono;
  mostrarPbx: boolean;   // El PBX no está en el diseño: se muestra solo cuando el cliente lo apruebe
  correo: string;
  horario: {
    largo: string;
    corto: string;
    datos: HorarioAtencion[];
    zona: string;        // "America/Bogota"
  };
  mapa: {
    comoLlegar: string;  // Abre Google Maps con la dirección
    embebido: string;    // Dirección del mapa que se pone dentro de la página (iframe)
  };
  pagoPse: string;       // Pago PSE que se usa hoy (Mi Pago Amigo)
  redes: { nombre: string; url: string }[];
  politicaDatos: string; // PDF de la política de tratamiento de datos
  terminos: string;
  sellos: string[];
}
