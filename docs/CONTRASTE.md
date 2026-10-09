# Contraste de contenido

Generado por `npm run audit`. Cada fila: dato mostrado, si es obligatorio u opcional y con qué fuentes coincide.
Fuentes: guía propia (`reference/`), artículo de Webreactiva y salida real de la CLI (`reference/datos-reales.md`).

## OpenSpec v1.14.1

### Requisitos

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Node.js 20.19.0 o superior | obligatorio | `node --version` | artículo+CLI | La guía no da la versión mínima; sale del artículo y del campo engines del paquete. |
| GitHub Copilot en VS Code | obligatorio | — | guía+CLI |  |

### Instalación

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Instalar OpenSpec | UNA VEZ | `npm install -g @fission-ai/openspec@latest` | guía+artículo+CLI |  |
| Instalar con pnpm | OPCIONAL | `pnpm add -g @fission-ai/openspec@latest` | solo artículo | Solo aparece en el artículo de Webreactiva; no está en la guía. |

### Init del proyecto

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Inicializar un proyecto | UNA VEZ | `openspec init` | guía+artículo+CLI |  |
| Inicializar sin asistente | OPCIONAL | `openspec init --tools github-copilot` | solo CLI | Comprobado ejecutándolo en OpenSpec 1.14.1; ni la guía ni el artículo lo mencionan. |

### Flujo en el chat

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Madurar una idea | OPCIONAL | `/opsx-explore` | guía+artículo+CLI |  |
| Crear el plan | POR CAMBIO | `/opsx-propose` | guía+artículo+CLI |  |
| Revisar el plan | OPCIONAL | `/opsx-update` | guía+CLI | Está en la guía y se genera en el init, pero el artículo no lo lista. |
| Implementar las tareas | POR CAMBIO | `/opsx-apply` | guía+artículo+CLI |  |
| Actualizar las especificaciones principales | OPCIONAL | `/opsx-sync` | discrepancia | La guía lo pone como paso del flujo; el artículo lo sitúa en el perfil expandido y dice que archivar ya fusiona las delta specs. Con Copilot el init sí genera /opsx-sync. |
| Concluir un cambio | POR CAMBIO | `/opsx-archive` | guía+artículo+CLI |  |

### Terminal

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Listar cambios activos | OPCIONAL | `openspec list` | guía+CLI |  |
| Listar capacidades | OPCIONAL | `openspec list --specs` | guía+CLI |  |
| Seguir todos los cambios | OPCIONAL | `openspec status --all` | guía+CLI |  |
| Inspeccionar un cambio | OPCIONAL | `openspec show NOME-DA-MUDANCA --type change` | guía+CLI |  |
| Validar cambios y especificaciones | OPCIONAL | `openspec validate --all --strict` | guía+CLI |  |
| Actualizar las instrucciones de OpenSpec | OPCIONAL | `openspec update` | guía+artículo+CLI |  |

### Qué genera el init

- **PARA COPILOT**: `.github/prompts/opsx-*.prompt.md`, `.github/skills/openspec-*/SKILL.md`
- **LA ESTRUCTURA DE OPENSPEC**: `openspec/specs/`, `openspec/changes/archive/`, `openspec/config.yaml`

### Dónde duele (artículo)

- Mantener specs y código alineados es el dolor más real.
- Tratar la spec como intocable devuelve a un waterfall.
- Escribir specs quita tiempo de programar: tiene que compensar en revisiones.
- Para un prototipo o un proyecto pequeño, basta con vibe coding.

## Spec Kit v1.1.0

### Requisitos

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Python 3.11 o superior | obligatorio | `python --version` | guía+artículo+CLI |  |
| uv | obligatorio | `uv --version` | guía+artículo+CLI | Si no lo tienes, el siguiente apartado lo instala. |
| Git | obligatorio | `git --version` | artículo+CLI | La guía no lo lista como requisito; el artículo sí. |
| GitHub Copilot en VS Code | obligatorio | — | guía+CLI |  |

### Instalación

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Instalar uv | OPCIONAL | `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 \| iex"` | guía+artículo+CLI | Enlace de la guía oficial de uv: https://github.github.io/spec-kit/install/uv.html |
| Instalar Spec Kit v1.1.0 | UNA VEZ | `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.1.0` | discrepancia | El artículo fija v0.16.1 y también muestra uv tool install specify-cli sin versión. La guía y la CLI real usan v1.1.0. |

### Init del proyecto

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Crear un proyecto con Copilot | UNA VEZ | `specify init mi-proyecto --integration copilot` | guía+artículo+CLI | El artículo usa --integration claude como ejemplo; con Copilot es copilot. |
| Inicializar en la carpeta actual | OPCIONAL | `specify init --here --integration copilot --force` | artículo+CLI | Solo en el artículo; comprobado con Copilot en Spec Kit 1.1.0. |

### Flujo en el chat

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Establecer la constitución | UNA VEZ | `/speckit-constitution` | guía+artículo+CLI |  |
| Especificar qué construir | POR FUNCIONALIDAD | `/speckit-specify` | guía+artículo+CLI |  |
| Aclarar requisitos | OPCIONAL | `/speckit-clarify` | guía+artículo+CLI |  |
| Crear el plan técnico | POR FUNCIONALIDAD | `/speckit-plan` | guía+artículo+CLI |  |
| Revisar la calidad de requisitos | OPCIONAL | `/speckit-checklist` | guía+CLI | El artículo la lista como opcional, pero no en su flujo recomendado. |
| Generar las tareas | POR FUNCIONALIDAD | `/speckit-tasks` | guía+artículo+CLI |  |
| Analizar la coherencia | OPCIONAL | `/speckit-analyze` | guía+artículo+CLI |  |
| Implementar las tareas | POR FUNCIONALIDAD | `/speckit-implement` | guía+artículo+CLI |  |
| Convertir las tareas en issues | OPCIONAL | `/speckit-taskstoissues` | artículo+CLI | No está en la guía; el artículo y el init real sí lo incluyen. |
| Comprobar la convergencia | POR FUNCIONALIDAD | `/speckit-converge` | guía+artículo+CLI |  |

### Terminal

| Paso | Etiqueta | Comando | Contraste | Nota |
| --- | --- | --- | --- | --- |
| Comprobar herramientas | OPCIONAL | `specify check` | guía+artículo+CLI |  |
| Consultar la versión instalada | OPCIONAL | `specify version` | guía+CLI |  |
| Comprobar si hay una versión nueva | OPCIONAL | `specify self check` | guía+artículo+CLI |  |
| Actualizar la CLI | OPCIONAL | `specify self upgrade --dry-run` | artículo+CLI |  |
| Ver las integraciones | OPCIONAL | `specify integration list` | artículo+CLI |  |

### Qué genera el init

- **PARA COPILOT**: `.github/skills/speckit-*/SKILL.md`
- **LA ESTRUCTURA DE SPEC KIT**: `.specify/memory/constitution.md`, `.specify/templates/`, `.specify/scripts/`, `.specify/workflows/`, `.specify/integration.json`

### Dónde duele (artículo)

- Mar de Markdown: en proyectos pequeños los documentos superan al código.
- Efecto cascada: un cambio a mitad de camino obliga a actualizar toda la cadena.
- Contexto limitado: constitución, spec, plan y tareas pueden agotar el del agente.
- Para añadir funciones puntuales a un proyecto existente, conviene OpenSpec.
