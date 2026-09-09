/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form relay endpoint (Formspree / Web3Forms). Unset = show direct-email panel. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
