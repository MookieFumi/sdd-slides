# SDD en la práctica: OpenSpec y Spec Kit

Miguel Martín · Madrid · 9 oct 2026 · hecho con [beatdeck](https://github.com/borjaperfra/beatdeck).

Dos charlas con **los mismos diez apartados**: portada, el flujo, requisitos, instalación, init del proyecto,
qué genera el init, flujo en el chat de Copilot, terminal, dónde duele y preguntas. Cada paso lleva su etiqueta:
`UNA VEZ`, `POR CAMBIO`/`POR FUNCIONALIDAD` u `OPCIONAL`.

```bash
npm install
npm run dev:openspec   # http://127.0.0.1:5173/#1.1
npm run dev:spec-kit   # http://127.0.0.1:5174/#1.1
npm run build          # compila las dos y monta site/ (portada + /openspec/ + /spec-kit/)
npm run preview        # sirve site/ en http://127.0.0.1:4173
npm run verify:openspec && npm run verify:spec-kit
npm run audit          # regenera docs/CONTRASTE.md
```

## Dónde está cada cosa

| Ruta | Qué es |
| --- | --- |
| `decks/_shared/` | modelo de datos, componentes y las diez escenas (idénticas en las dos charlas) |
| `decks/openspec/`, `decks/spec-kit/` | el contenido de cada charla (`content.ts`) y su `deck.config.ts` |
| `landing/` | la portada con los dos enlaces |
| `reference/` | guías originales, datos reales de las CLI, extractos de los artículos y textos propios |
| `docs/CONTRASTE.md` | cada paso contrastado con guía, artículo y CLI real |

## GitHub Pages

`.github/workflows/pages.yml` publica un único sitio en cada push a `main` o `sdd-slides-beatdeck`:

- `https://mookiefumi.github.io/sdd-slides/` — portada
- `https://mookiefumi.github.io/sdd-slides/openspec/` — charla de OpenSpec
- `https://mookiefumi.github.io/sdd-slides/spec-kit/` — charla de Spec Kit

Settings → Pages → Source: GitHub Actions (una sola vez).
