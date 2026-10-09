# Datos reales (comprobados el 9 oct 2026)

Obtenidos ejecutando las herramientas en un proyecto de prueba (Linux, Node 22, Python 3.13) con la integración
de GitHub Copilot, y contrastados con los artículos de Webreactiva. Esta página es la fuente de verdad de lo que
las guías originales no dicen. El texto de aquí se usa en `npm run verify -- --source=…`.

## OpenSpec 1.14.1

Requisito: Node.js 20.19.0 o superior (campo engines del paquete @fission-ai/openspec).
Licencia: MIT.

Instalación: npm install -g @fission-ai/openspec@latest

Inicialización interactiva: openspec init
Inicialización sin preguntas: openspec init --tools github-copilot

Lo que genera con GitHub Copilot (6 skills y 6 commands en .github/):
.github/prompts/opsx-apply.prompt.md
.github/prompts/opsx-archive.prompt.md
.github/prompts/opsx-explore.prompt.md
.github/prompts/opsx-propose.prompt.md
.github/prompts/opsx-sync.prompt.md
.github/prompts/opsx-update.prompt.md
.github/skills/openspec-*/SKILL.md
openspec/config.yaml
openspec/specs/
openspec/changes/archive/

Comandos del chat de Copilot con guion: /opsx-propose, /opsx-explore, /opsx-apply, /opsx-sync, /opsx-archive, /opsx-update.
Seis flujos más disponibles (new, continue, ff, bulk-archive, verify, onboard): openspec config profile
Telemetría anónima: se desactiva con OPENSPEC_TELEMETRY=0 o openspec config set telemetry.enabled false

## Spec Kit 1.1.0

Requisito: Python 3.11 o superior (campo Requires-Python del paquete specify-cli).
Instalación: uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.1.0

Inicialización en carpeta nueva: specify init mi-proyecto --integration copilot
Inicialización en la carpeta actual: specify init --here --integration copilot --force

Lo que genera con GitHub Copilot:
.github/skills/speckit-*/SKILL.md
.specify/memory/constitution.md
.specify/scripts/
.specify/templates/
.specify/workflows/
.specify/integration.json

Skills de Copilot con guion (invoke_separator "-"): /speckit-constitution, /speckit-specify, /speckit-plan,
/speckit-tasks, /speckit-implement, /speckit-converge, /speckit-clarify, /speckit-analyze, /speckit-checklist,
/speckit-taskstoissues.
Comandos de la CLI: specify check, specify version, specify self check, specify self upgrade --dry-run, specify self upgrade,
specify integration list.
