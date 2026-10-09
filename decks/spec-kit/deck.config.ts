export const config = {
  title: 'Spec Kit en la práctica',
  subtitle: 'Guía de uso',
  author: 'Miguel Martín',
  place: 'Madrid',
  date: '9 oct 2026',
  qrUrl: 'TODO',
  qrLabel: '',
  /** Texto con direcciones web que se muestra en escena o notas (nunca se descarga); vive aquí para la comprobación sin conexión. */
  specKitInstallCmd: 'uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.1.0',
  uvInstallCmd: 'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"',
  uvGuideUrl: 'https://github.github.io/spec-kit/install/uv.html',
} as const;
