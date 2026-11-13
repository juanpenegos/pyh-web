// DATOS ESTRUCTURADOS (JSON-LD) para Google: "LocalBusiness" con nombre, dirección,
// coordenadas, teléfono, correo, horario y redes. Todo sale de los datos de la empresa.
// https://schema.org/LocalBusiness

import type { DatosEmpresa } from '@dominio/empresa';

export function negocioLocal(empresa: DatosEmpresa, urlSitio: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${empresa.marca} — ${empresa.razonSocial}`,
    legalName: empresa.razonSocial,
    url: urlSitio,
    telephone: `+${empresa.celular.numero}`,
    email: empresa.correo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: empresa.direccion.linea1,
      addressLocality: empresa.direccion.ciudad,
      addressRegion: empresa.direccion.region,
      addressCountry: empresa.direccion.pais,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: empresa.coordenadas.lat,
      longitude: empresa.coordenadas.lng,
    },
    openingHoursSpecification: empresa.horario.datos.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
    sameAs: empresa.redes.map((r) => r.url),
  };
}
