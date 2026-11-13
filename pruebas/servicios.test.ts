// PRUEBAS de los servicios: los falsos (mock), WhatsApp, redirección, el cliente HTTP
// y la elección de servicio según las variables de entorno.
import { describe, expect, it, vi } from 'vitest';
import type { MensajeContacto } from '@dominio/contacto';
import { ErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { ContactoFalso } from '@infraestructura/servicios/contacto/ContactoFalso';
import { ContactoWhatsapp } from '@infraestructura/servicios/contacto/ContactoWhatsapp';
import { ContactoHttp } from '@infraestructura/servicios/contacto/ContactoHttp';
import { FacturasFalso, FACTURA_NO_EXISTE, FACTURA_PAGADA } from '@infraestructura/servicios/pagos/FacturasFalso';
import { PagosFalso, FACTURA_PENDIENTE, FACTURA_RECHAZADA } from '@infraestructura/servicios/pagos/PagosFalso';
import { PagosHttp } from '@infraestructura/servicios/pagos/PagosHttp';
import { ClienteHttp } from '@infraestructura/servicios/http/ClienteHttp';
import { leerConfiguracion, crearServicios } from '@infraestructura/servicios';
import { empresa } from '@infraestructura/contenido-local/comun/empresa';

const mensaje: MensajeContacto = {
  motivo: 'cotizacion',
  nombre: 'Ana Pérez',
  celular: '3001234567',
  correo: 'ana@empresa.com',
  mensaje: 'Necesito una tijera de 10 m.',
  aceptaPolitica: true,
  origen: 'web-contacto',
  idSolicitud: 'id-1',
};

/** Espera que la promesa falle con un ErrorServicio de ese código. */
async function fallaCon(promesa: Promise<unknown>, codigo: string) {
  await expect(promesa).rejects.toBeInstanceOf(ErrorServicio);
  await expect(promesa).rejects.toMatchObject({ codigo });
}

describe('ContactoFalso', () => {
  it('responde que el mensaje llegó', async () => {
    const acuse = await new ContactoFalso(0).enviar(mensaje);
    expect(acuse.id).toContain('id-1');
    expect(Date.parse(acuse.recibidoEn)).not.toBeNaN();
  });

  it('con el nombre "error" responde SERVICE_UNAVAILABLE', async () => {
    await fallaCon(new ContactoFalso(0).enviar({ ...mensaje, nombre: 'Error' }), 'SERVICE_UNAVAILABLE');
  });
});

describe('ContactoWhatsapp', () => {
  const plantilla = {
    saludo: 'Hola, PyH+.',
    motivos: { cotizacion: 'Cotización', soporte: 'Soporte', compra: 'Compra', facturacion: 'Facturación', otro: 'Otro' },
    etiquetas: { motivo: 'Motivo', nombre: 'Nombre', empresa: 'Empresa', celular: 'Celular', correo: 'Correo', mensaje: 'Mensaje' },
  };

  it('abre WhatsApp con el mensaje escrito y sin los campos vacíos', async () => {
    const abrir = vi.fn();
    const servicio = new ContactoWhatsapp({ texto: '304 364 9060', numero: '573043649060' }, plantilla, abrir);
    await servicio.enviar(mensaje);

    const url = new URL(abrir.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe('https://wa.me/573043649060');
    const texto = url.searchParams.get('text') ?? '';
    expect(texto).toContain('Motivo: Cotización');
    expect(texto).toContain('Nombre: Ana Pérez');
    expect(texto).not.toContain('Empresa:');
  });
});

describe('FacturasFalso', () => {
  const consulta = { tipoDocumento: 'NIT' as const, numeroDocumento: '900123456', numeroFactura: 'FE-12345' };

  it('devuelve una factura pendiente de ejemplo', async () => {
    const f = await new FacturasFalso(0).buscar(consulta);
    expect(f).toMatchObject({ numero: 'FE-12345', moneda: 'COP', estado: 'pending' });
    expect(Number.isInteger(f.total)).toBe(true);
  });

  it('avisa si no existe o si ya está pagada', async () => {
    const servicio = new FacturasFalso(0);
    await fallaCon(servicio.buscar({ ...consulta, numeroFactura: FACTURA_NO_EXISTE }), 'NOT_FOUND');
    await fallaCon(servicio.buscar({ ...consulta, numeroFactura: FACTURA_PAGADA }), 'ALREADY_PAID');
  });
});

describe('PagosFalso', () => {
  const solicitud = (numeroFactura: string) => ({
    numeroFactura,
    codigoBanco: '1007',
    tipoPersona: 'juridica' as const,
    tipoDocumento: 'NIT' as const,
    numeroDocumento: '900123456',
    urlRetorno: 'https://sitio.co/pagos-pse/resultado',
    idSolicitud: 'id-2',
  });

  it('trae los 6 bancos de ejemplo', async () => {
    const pagos = new PagosFalso(0);
    expect(await pagos.listarBancos()).toHaveLength(6);
  });

  it('manda a la página de resultado y aprueba el pago', async () => {
    const pagos = new PagosFalso(0);
    const inicio = await pagos.iniciar(solicitud('FE-12345'));
    const url = new URL(inicio.urlBanco);
    expect(url.pathname).toBe('/pagos-pse/resultado');
    expect(url.searchParams.get('paymentId')).toBe(inicio.idPago);

    const r = await pagos.consultar(inicio.idPago);
    expect(r).toMatchObject({ estado: 'approved', numeroFactura: 'FE-12345', banco: 'Bancolombia' });
    expect(r.referenciaPse).toBeDefined();
  });

  it(`rechaza ${FACTURA_RECHAZADA} con su motivo`, async () => {
    const pagos = new PagosFalso(0);
    const { idPago } = await pagos.iniciar(solicitud(FACTURA_RECHAZADA));
    const r = await pagos.consultar(idPago);
    expect(r.estado).toBe('rejected');
    expect(r.motivoRechazo).toBeTruthy();
  });

  it(`${FACTURA_PENDIENTE} queda pendiente 2 veces y luego se aprueba`, async () => {
    const pagos = new PagosFalso(0);
    const { idPago } = await pagos.iniciar(solicitud(FACTURA_PENDIENTE));
    expect((await pagos.consultar(idPago)).estado).toBe('pending');
    expect((await pagos.consultar(idPago)).estado).toBe('pending');
    expect((await pagos.consultar(idPago)).estado).toBe('approved');
  });

  it('avisa si el banco no existe o el pago no se encuentra', async () => {
    const pagos = new PagosFalso(0);
    await fallaCon(pagos.iniciar({ ...solicitud('FE-1'), codigoBanco: 'x' }), 'VALIDATION_ERROR');
    await fallaCon(pagos.consultar('otro.id'), 'NOT_FOUND');
  });
});

describe('ClienteHttp y ContactoHttp', () => {
  it('envía Idempotency-Key y traduce los errores del backend', async () => {
    const fetchFalso = vi.fn(async () =>
      new Response(
        JSON.stringify({ error: { code: 'VALIDATION_ERROR', message: 'Revisa', fields: { phone: 'Celular inválido' } } }),
        { status: 422 },
      ),
    );
    const servicio = new ContactoHttp(new ClienteHttp('https://api.co/', fetchFalso));
    const promesa = servicio.enviar(mensaje);
    await fallaCon(promesa, 'VALIDATION_ERROR');
    await expect(promesa).rejects.toMatchObject({ campos: { celular: 'Celular inválido' } });

    const [url, opciones] = fetchFalso.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.co/contact-messages');
    expect((opciones.headers as Record<string, string>)['Idempotency-Key']).toBe('id-1');
    expect(JSON.parse(String(opciones.body))).toMatchObject({ topic: 'cotizacion', phone: '3001234567', source: 'web-contacto' });
  });

  it('sin conexión responde SERVICE_UNAVAILABLE; códigos raros quedan como UNKNOWN', async () => {
    const sinRed = new ClienteHttp('https://api.co', async () => {
      throw new TypeError('Failed to fetch');
    });
    await fallaCon(sinRed.pedir('GET', '/x'), 'SERVICE_UNAVAILABLE');

    const raro = new ClienteHttp('https://api.co', async () =>
      new Response(JSON.stringify({ error: { code: 'TEAPOT', message: 'Soy una tetera' } }), { status: 418 }),
    );
    await fallaCon(raro.pedir('GET', '/x'), 'UNKNOWN');
  });
});

describe('Elección de servicios (variables de entorno)', () => {
  it('por defecto: contacto por WhatsApp y pagos con redirección', () => {
    const config = leerConfiguracion({});
    expect(config).toMatchObject({ modoContacto: 'whatsapp', modoPagos: 'redirect' });
    const s = crearServicios(config);
    expect(s.contacto).toBeInstanceOf(ContactoWhatsapp);
    expect(s.pago).toEqual({ tipo: 'externo', url: empresa.pagoPse });
  });

  it('"http" sin dirección del backend usa los servicios falsos', () => {
    const config = leerConfiguracion({ PUBLIC_CONTACT_MODE: 'http', PUBLIC_PAYMENTS_MODE: 'http' });
    expect(config).toMatchObject({ modoContacto: 'mock', modoPagos: 'mock' });
  });

  it('"http" con dirección usa el backend', () => {
    const s = crearServicios(
      leerConfiguracion({ PUBLIC_API_BASE_URL: 'https://api.co', PUBLIC_CONTACT_MODE: 'http', PUBLIC_PAYMENTS_MODE: 'http' }),
    );
    expect(s.contacto).toBeInstanceOf(ContactoHttp);
    expect(s.pago.tipo).toBe('asistente');
    if (s.pago.tipo === 'asistente') expect(s.pago.pagos).toBeInstanceOf(PagosHttp);
  });
});
