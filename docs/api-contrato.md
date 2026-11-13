# Contrato de la API — Contacto y Pagos PSE (PyH+)

Este documento es para quien construya el backend. El frontend (Astro) ya está hecho y funciona hoy
con servicios falsos o temporales; cuando el backend cumpla este contrato, basta con configurar
las variables de entorno (ver `.env.example`) y nada más del sitio cambia.

La versión para herramientas está en `docs/openapi.yaml`.

## 1. Reglas generales

- Dirección base configurable: `PUBLIC_API_BASE_URL` (por ejemplo `https://api.alquilerpyh.com`).
- Todo es JSON (`Content-Type: application/json`) en UTF-8.
- Fechas en ISO 8601 (`2026-10-30` o `2026-10-30T14:05:00Z`).
- Montos en **pesos colombianos como número entero** (`2380000`, sin decimales ni puntos).
- El navegador llama directo a la API: habilitar **CORS** para el dominio del sitio.
- **Idempotencia:** cada envío de formulario y cada inicio de pago trae el encabezado
  `Idempotency-Key: <UUID>`. Si llega dos veces la misma clave (doble clic, reintento), se responde
  lo mismo que la primera vez, sin crear un segundo mensaje ni un segundo pago.

### Forma única de los errores

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Texto corto para la persona, en español.",
    "fields": { "phone": "Escribe un celular de 10 dígitos que empiece por 3." }
  }
}
```

`fields` es opcional y usa los nombres de campo de cada endpoint. El sitio muestra `message` y marca
los campos de `fields`.

| Código | Cuándo | HTTP sugerido |
|---|---|---|
| `VALIDATION_ERROR` | Algún dato no cumple las reglas | 422 |
| `NOT_FOUND` | La factura o el pago no existen | 404 |
| `ALREADY_PAID` | La factura ya está pagada | 409 |
| `RATE_LIMITED` | Demasiados intentos seguidos | 429 |
| `PAYMENT_REJECTED` | La pasarela rechazó el pago al iniciarlo | 402 |
| `PAYMENT_PENDING` | Ya hay un pago en curso para esa factura | 409 |
| `SERVICE_UNAVAILABLE` | El backend o la pasarela no responden | 503 |

Cualquier otro código se muestra como error genérico con el botón "Intentar de nuevo".

## 2. Contacto

### `POST /contact-messages`

Entrada:

| Campo | Tipo | Regla |
|---|---|---|
| `topic` | texto | Uno de `cotizacion`, `soporte`, `compra`, `facturacion`, `otro` |
| `name` | texto | 2 a 80 caracteres |
| `company` | texto, opcional | Hasta 120 caracteres |
| `phone` | texto | Celular colombiano: 10 dígitos que empiezan por 3 (llega sin espacios) |
| `email` | texto | Correo válido |
| `message` | texto | 10 a 1000 caracteres |
| `acceptsDataPolicy` | booleano | Debe ser `true` (Ley 1581 de 2012) |
| `source` | texto | Siempre `web-contacto` |
| `utm` | objeto, opcional | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid` |

Respuesta correcta `201`:

```json
{ "id": "msg_123", "receivedAt": "2026-11-12T15:30:00Z" }
```

Antispam: el formulario tiene un campo trampa oculto; si un robot lo llena, el sitio no envía nada.
Captcha: todavía no se eligió proveedor (reCAPTCHA o Turnstile). Cuando se elija, se agrega aquí el campo
del token y el backend lo verifica con la clave **secreta** del proveedor.

## 3. Facturas

### `GET /invoices/lookup?documentType=NIT&documentNumber=900123456&invoiceNumber=FE-12345`

| Parámetro | Regla |
|---|---|
| `documentType` | `NIT`, `CC` (cédula de ciudadanía) o `CE` (cédula de extranjería) |
| `documentNumber` | Solo dígitos. NIT: 9 o 10 (con o sin dígito de verificación). Cédulas: 5 a 10 |
| `invoiceNumber` | `FE-` seguido de números, en mayúsculas |

Respuesta correcta `200`:

```json
{
  "invoiceNumber": "FE-12345",
  "customerName": "Constructora Ejemplo S.A.S.",
  "concept": "Alquiler brazo articulado 20 m · 1 semana",
  "dueDate": "2026-10-30",
  "amount": 2380000,
  "currency": "COP",
  "status": "pending"
}
```

`status`: `pending`, `paid` u `overdue`. Errores: `NOT_FOUND`, `ALREADY_PAID`.

**Seguridad:** la factura solo se entrega si el documento coincide con el dueño de la factura, y la
respuesta no debe traer más datos del cliente que los de arriba. Limitar intentos (`RATE_LIMITED`).

## 4. Pagos PSE

Pensado para cualquier pasarela (ACH Colombia, PayU, Wompi, ePayco, Mercado Pago…). El sitio no sabe
cuál es. **Nunca** se piden datos de tarjeta ni claves del banco: PSE se paga en la página del banco.

### `GET /payments/pse/banks`

```json
[{ "code": "1007", "name": "Bancolombia" }, { "code": "1051", "name": "Davivienda" }]
```

La lista real la entrega la pasarela. El sitio muestra los 6 primeros como botones y el resto en una
lista desplegable, así que conviene ordenarla con los más usados primero.

### `POST /payments/pse`

| Campo | Regla |
|---|---|
| `invoiceNumber` | Factura buscada antes |
| `bankCode` | Código de la lista de bancos |
| `personType` | `natural` o `juridica` |
| `documentType`, `documentNumber` | Los mismos de la búsqueda |
| `email` | Opcional (hoy el diseño no lo pide) |
| `returnUrl` | Página a la que vuelve el banco: `https://<sitio>/pagos-pse/resultado` |

Respuesta correcta `201`:

```json
{ "paymentId": "pay_789", "redirectUrl": "https://banco.ejemplo/pse/..." }
```

El sitio manda a la persona a `redirectUrl`. Al terminar, la pasarela debe devolverla a
`returnUrl?paymentId=pay_789` (agregar el parámetro `paymentId`).

### `GET /payments/{paymentId}`

```json
{
  "status": "approved",
  "invoiceNumber": "FE-12345",
  "bankName": "Davivienda",
  "pseReference": "1234567890",
  "amount": 2380000,
  "paidAt": "2026-11-12T15:40:00Z",
  "receiptUrl": "https://api.alquilerpyh.com/receipts/pay_789.pdf",
  "rejectionReason": null
}
```

`status`: `approved`, `rejected` o `pending`. Si está `pending`, el sitio vuelve a consultar cada
4 segundos durante 1 minuto. `receiptUrl` es opcional (botón "Descargar comprobante").
`rejectionReason` se muestra tal cual a la persona cuando el pago es rechazado.

## 5. Cómo probar hoy sin backend

| Variable | Valor | Qué hace |
|---|---|---|
| `PUBLIC_CONTACT_MODE` | `whatsapp` (por defecto) | Abre WhatsApp con el mensaje ya escrito |
| | `mock` | Responde "recibido" a los 600 ms. Nombre `error` → error de servicio |
| `PUBLIC_PAYMENTS_MODE` | `redirect` (por defecto) | Botón "Pagar con PSE" que abre Mi Pago Amigo |
| | `mock` | Asistente completo con datos de ejemplo |

Facturas de prueba en modo `mock`: `FE-40400` no existe · `FE-11111` ya pagada ·
`FE-99999` pago rechazado · `FE-22222` pendiente y luego aprobado · cualquier otra `FE-#####` se aprueba.
