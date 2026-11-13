// Tipos de las variables de entorno (ver .env.example).
interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL?: string;
  readonly PUBLIC_CONTACT_MODE?: string;
  readonly PUBLIC_PAYMENTS_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
