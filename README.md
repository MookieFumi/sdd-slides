# OpenSpec y Spec Kit en la práctica

Miguel Martín · built with [beatdeck](https://github.com/borjaperfra/beatdeck).

```bash
npm install
npm run dev          # http://127.0.0.1:5173/#1.1
npm run present      # production build, opened locally (works offline)
npm run verify       # every beat checked → artifacts/verify/
npm run upgrade      # bring the engine up to date (never touches deck/)
```

The talk lives in `deck/`. See `AGENTS.md` and `skills/building-a-beatdeck/SKILL.md`.

## GitHub Pages

`.github/workflows/pages.yml` construye la charla y la publica en
`https://mookiefumi.github.io/sdd-slides/` en cada push a `main` o a `sdd-slides-beatdeck`.
Activa **Settings → Pages → Build and deployment → Source: GitHub Actions** una sola vez.

