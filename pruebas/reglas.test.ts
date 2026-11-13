// PRUEBAS de reglas pequeñas: formato de pesos y fechas, parámetros de campaña,
// enlaces de contacto y datos para Google.
import { describe, expect, it } from 'vitest';
import { formatearFecha, formatearPesos } from '@aplicacion/pagos/formato';
import { leerCampana, leerMotivo } from '@aplicacion/contacto/campana';
import { enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from '@aplicacion/contacto/enlacesContacto';
import { negocioLocal } from '@aplicacion/contacto/datosEstructurados';
import { empresa } from '@infraestructura/contenido-local/comun/empresa';

describe('Formato', () => {
  it('pesos con puntos de miles', () => {
    expect(formatearPesos(2380000)).toBe('$2.380.000');
    expect(formatearPesos(950)).toBe('$950');
  });

  it('fecha corta en español', () => {
    expect(formatearFecha('2026-10-30')).toBe('30 oct 2026');
    expect(formatearFecha('2026-01-05T10:00:00Z')).toBe('5 ene 2026');
  });
});

describe('Parámetros de la dirección', () => {
  it('guarda utm y gclid, ignora lo demás', () => {
    expect(leerCampana('?utm_source=google&gclid=abc&x=1')).toEqual({ utm_source: 'google', gclid: 'abc' });
    expect(leerCampana('?x=1')).toBeUndefined();
  });

  it('lee el motivo solo si es conocido', () => {
    expect(leerMotivo('?motivo=facturacion')).toBe('facturacion');
    expect(leerMotivo('?motivo=otra-cosa')).toBeUndefined();
  });
});

describe('Enlaces de contacto', () => {
  it('se arman desde los datos de la empresa', () => {
    expect(enlaceTelefono(empresa.celular)).toBe('tel:+573043649060');
    expect(enlaceWhatsapp(empresa.celular)).toBe('https://wa.me/573043649060');
    expect(enlaceWhatsapp(empresa.celular, 'Hola PyH+')).toBe('https://wa.me/573043649060?text=Hola%20PyH%2B');
    expect(enlaceCorreo(empresa.correo)).toBe('mailto:info@alquilerdeplataformasyherramientas.com');
  });
});

describe('JSON-LD LocalBusiness', () => {
  it('lleva dirección, coordenadas, horario y redes', () => {
    const datos = negocioLocal(empresa, 'https://alquilerpyh.com/');
    expect(datos['@type']).toBe('LocalBusiness');
    expect(datos).toMatchObject({
      telephone: '+573043649060',
      geo: { latitude: 4.683291, longitude: -74.133399 },
      address: { streetAddress: 'Calle 24 B # 101 – 02', addressCountry: 'CO' },
    });
    expect(datos.sameAs).toHaveLength(4);
  });
});
