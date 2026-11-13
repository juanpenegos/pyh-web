// PRUEBAS de las reglas de los formularios (Contacto y búsqueda de factura).
import { describe, expect, it } from 'vitest';
import { esquemaContacto } from '@aplicacion/validacion/contacto';
import { esquemaFactura } from '@aplicacion/validacion/factura';
import { validar } from '@aplicacion/validacion/validar';

const mensajeBueno = {
  motivo: 'cotizacion',
  nombre: 'Ana Pérez',
  empresa: '',
  celular: '300 123 4567',
  correo: 'ana@empresa.com',
  mensaje: 'Necesito una tijera de 10 m para la próxima semana.',
  aceptaPolitica: true,
};

describe('Formulario de contacto', () => {
  it('acepta un mensaje correcto y limpia el celular', () => {
    const r = esquemaContacto.safeParse(mensajeBueno);
    expect(r.success).toBe(true);
    expect(r.data?.celular).toBe('3001234567');
  });

  it('pide nombre de 2 a 80 letras', () => {
    expect(validar(esquemaContacto, { ...mensajeBueno, nombre: 'A' }).nombre).toBeDefined();
    expect(validar(esquemaContacto, { ...mensajeBueno, nombre: 'A'.repeat(81) }).nombre).toBeDefined();
  });

  it('pide un celular colombiano de 10 dígitos que empiece por 3', () => {
    expect(validar(esquemaContacto, { ...mensajeBueno, celular: '6012952561' }).celular).toBeDefined();
    expect(validar(esquemaContacto, { ...mensajeBueno, celular: '30012345' }).celular).toBeDefined();
  });

  it('revisa el correo, el mensaje y la empresa', () => {
    expect(validar(esquemaContacto, { ...mensajeBueno, correo: 'ana@' }).correo).toBeDefined();
    expect(validar(esquemaContacto, { ...mensajeBueno, mensaje: 'Hola' }).mensaje).toBeDefined();
    expect(validar(esquemaContacto, { ...mensajeBueno, mensaje: 'x'.repeat(1001) }).mensaje).toBeDefined();
    expect(validar(esquemaContacto, { ...mensajeBueno, empresa: 'x'.repeat(121) }).empresa).toBeDefined();
  });

  it('exige aceptar la política de datos', () => {
    expect(validar(esquemaContacto, { ...mensajeBueno, aceptaPolitica: false }).aceptaPolitica).toBeDefined();
  });

  it('solo acepta los motivos conocidos', () => {
    expect(validar(esquemaContacto, { ...mensajeBueno, motivo: 'chisme' }).motivo).toBeDefined();
  });
});

describe('Búsqueda de factura', () => {
  const buena = { tipoDocumento: 'NIT', numeroDocumento: '900.123.456-7', numeroFactura: 'fe-12345' };

  it('acepta NIT con puntos y guion, y pone la factura en mayúsculas', () => {
    const r = esquemaFactura.safeParse(buena);
    expect(r.success).toBe(true);
    expect(r.data?.numeroDocumento).toBe('9001234567');
    expect(r.data?.numeroFactura).toBe('FE-12345');
  });

  it('NIT de 9 o 10 dígitos; cédula de 5 a 10', () => {
    expect(validar(esquemaFactura, { ...buena, numeroDocumento: '90012345' }).numeroDocumento).toBeDefined();
    expect(validar(esquemaFactura, { ...buena, tipoDocumento: 'CC', numeroDocumento: '1234' }).numeroDocumento).toBeDefined();
    expect(esquemaFactura.safeParse({ ...buena, tipoDocumento: 'CE', numeroDocumento: '12345' }).success).toBe(true);
  });

  it('la factura debe ser FE- y números', () => {
    expect(validar(esquemaFactura, { ...buena, numeroFactura: '12345' }).numeroFactura).toBeDefined();
    expect(validar(esquemaFactura, { ...buena, numeroFactura: 'FE-ABC' }).numeroFactura).toBeDefined();
  });

  it('muestra juntos el error del documento y el de la factura', () => {
    const errores = validar(esquemaFactura, { tipoDocumento: 'NIT', numeroDocumento: '1', numeroFactura: 'x' });
    expect(errores.numeroDocumento).toBeDefined();
    expect(errores.numeroFactura).toBeDefined();
  });
});
