/**
 * Everything that may need changing five minutes before going on stage lives here.
 * After editing, rebuild (`npm run build` / `npm run present`).
 */
export const config = {
  title: 'OpenSpec y Spec Kit en la práctica',
  /** One line under the title. Empty = none. */
  subtitle: 'Guía de uso',
  author: 'Miguel Ángel',
  /** Ciudad y fecha de la charla (el evento no tiene nombre). */
  place: 'Madrid',
  date: '9 oct 2026',
  /** Destination of the QR on the closing screen. "TODO" = no QR (the presenter view warns). Never guess it. */
  qrUrl: 'TODO',
  /** Shown under the QR, e.g. "example.com/talk". */
  qrLabel: '',
  /**
   * Texto con direcciones web que se muestra en escena o en las notas del presentador (nunca se descarga).
   * Viven aquí para que la comprobación sin conexión las reconozca como texto y no como recursos remotos.
   */
  specKitInstallCmd: 'uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.1.0',
  uvGuideUrl: 'https://github.github.io/spec-kit/install/uv.html',
} as const;
