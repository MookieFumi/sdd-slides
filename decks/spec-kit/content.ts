import type { TalkData } from '../_shared/types';
import { config } from './deck.config';

const CHAT = 'COPILOT CHAT';

export const SPECKIT: TalkData = {
  id: 'spec-kit-en-la-practica',
  name: 'Spec Kit',
  version: 'v1.1.0',
  eyebrow: 'DESARROLLO GUIADO POR ESPECIFICACIONES',
  lead: 'Desde la preparación del proyecto hasta la convergencia.',
  routeTitle: 'Flujo SDD por funcionalidad',
  route: [
    { label: 'Constitución' }, { label: 'Especificar' }, { label: 'Planificar' }, { label: 'Desglosar' }, { label: 'Implementar' }, { label: 'Converger' },
  ],
  routeNote: 'La constitución se establece una vez por proyecto; los controles de calidad son opcionales.',

  req: {
    kicker: 'ANTES DE EMPEZAR', title: 'Requisitos',
    note: 'Python 3.11 o superior, uv, Git y GitHub Copilot en VS Code. Spec Kit genera scripts PowerShell en Windows.',
    steps: [
      { index: '01 / Python', tag: '', surface: 'TERMINAL', title: 'Python 3.11 o superior', cmd: 'python --version',
        desc: 'Comprueba la versión instalada. Spec Kit exige 3.11 o posterior.', check: 'guía+artículo+CLI' },
      { index: '02 / uv', tag: '', surface: 'TERMINAL', title: 'uv', cmd: 'uv --version',
        desc: 'El gestor de herramientas de Python con el que se instala la CLI. pipx también sirve.', check: 'guía+artículo+CLI',
        note: 'Si no lo tienes, el siguiente apartado lo instala.' },
      { index: '03 / Git', tag: '', surface: 'TERMINAL', title: 'Git', cmd: 'git --version',
        desc: 'Spec Kit crea una rama por funcionalidad.', check: 'artículo+CLI',
        note: 'La guía no lo lista como requisito; el artículo sí.' },
      { index: '04 / Agente', tag: '', surface: 'VS CODE', title: 'GitHub Copilot en VS Code', cmd: '',
        desc: 'Los skills se ejecutan en Copilot Chat, no en la terminal.', check: 'guía+CLI' },
    ],
  },

  install: {
    kicker: 'UNA VEZ POR MÁQUINA', title: 'Instalación',
    note: 'Primero uv si no lo tienes; después la CLI de Spec Kit, fijada a una versión.',
    steps: [
      { index: '01 / Requisito', tag: 'OPCIONAL', surface: 'WINDOWS', title: 'Instalar uv', cmd: config.uvInstallCmd,
        desc: 'Solo si uv --version falla. Instala uv; Python 3.11+ debe estar ya disponible.', check: 'guía+artículo+CLI',
        note: `Enlace de la guía oficial de uv: ${config.uvGuideUrl}` },
      { index: '02 / CLI', tag: 'UNA VEZ', surface: 'POWERSHELL', title: 'Instalar Spec Kit v1.1.0', cmd: config.specKitInstallCmd,
        desc: 'Instala la CLI desde el repositorio oficial, fijada a la versión estable consultada el 6 de octubre de 2026.', check: 'discrepancia',
        note: 'El artículo fija v0.16.1 y también muestra uv tool install specify-cli sin versión. La guía y la CLI real usan v1.1.0.' },
    ],
  },

  init: {
    kicker: 'UNA VEZ POR PROYECTO', title: 'Inicializar el proyecto',
    note: 'Con la integración de GitHub Copilot. Después, abre la carpeta en VS Code.',
    steps: [
      { index: '01 / Proyecto nuevo', tag: 'UNA VEZ', surface: 'POWERSHELL', title: 'Crear un proyecto con Copilot', cmd: 'specify init mi-proyecto --integration copilot',
        desc: 'Inicializa una carpeta nueva con la integración de GitHub Copilot.', check: 'guía+artículo+CLI',
        note: 'El artículo usa --integration claude como ejemplo; con Copilot es copilot.' },
      { index: '02 / Proyecto existente', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Inicializar en la carpeta actual', cmd: 'specify init --here --integration copilot --force',
        desc: 'Para un proyecto que ya existe: añade Spec Kit en la carpeta actual sin crear otra.', check: 'artículo+CLI',
        note: 'Solo en el artículo; comprobado con Copilot en Spec Kit 1.1.0.' },
    ],
  },

  generated: {
    kicker: 'SALIDA REAL DEL INIT', title: 'Qué genera el init',
    note: 'Comprobado con Spec Kit 1.1.0 y GitHub Copilot.',
    groups: [
      { title: 'PARA COPILOT', note: 'Diez skills: son los comandos /speckit-* del chat.',
        items: ['.github/skills/speckit-*/SKILL.md'] },
      { title: 'LA ESTRUCTURA DE SPEC KIT', note: 'La carpeta specs/ no existe todavía: se crea con la primera funcionalidad.',
        items: ['.specify/memory/constitution.md', '.specify/templates/', '.specify/scripts/', '.specify/workflows/', '.specify/integration.json'] },
    ],
  },

  chat: {
    kicker: 'DE LA IDEA A LA CONVERGENCIA', title: 'Trabaja en una funcionalidad',
    note: 'Ejecuta cada skill por separado en Copilot Chat y revisa el resultado antes de continuar. No son comandos de terminal. Con Copilot el separador es un guion.',
    steps: [
      { index: '01 / Constitución', tag: 'UNA VEZ', surface: CHAT, title: 'Establecer la constitución', cmd: '/speckit-constitution', strip: 0,
        desc: 'Define los principios del proyecto que orientarán y evaluarán las etapas siguientes.', check: 'guía+artículo+CLI' },
      { index: '02 / Definir', tag: 'POR FUNCIONALIDAD', surface: CHAT, title: 'Especificar qué construir', cmd: '/speckit-specify', strip: 1,
        desc: 'Describe qué necesitas y por qué. Concéntrate en el comportamiento, no en la tecnología.', check: 'guía+artículo+CLI' },
      { index: 'Control', tag: 'OPCIONAL', surface: CHAT, title: 'Aclarar requisitos', cmd: '/speckit-clarify', strip: 1,
        desc: 'Resuelve ambigüedades en la especificación antes de planificar.', check: 'guía+artículo+CLI' },
      { index: '03 / Diseñar', tag: 'POR FUNCIONALIDAD', surface: CHAT, title: 'Crear el plan técnico', cmd: '/speckit-plan', strip: 2,
        desc: 'Indica el stack, la arquitectura y las restricciones para generar los artefactos de diseño.', check: 'guía+artículo+CLI' },
      { index: 'Control', tag: 'OPCIONAL', surface: CHAT, title: 'Revisar la calidad de requisitos', cmd: '/speckit-checklist', strip: 2,
        desc: 'Genera una lista para evaluar que los requisitos sean completos, claros y coherentes.', check: 'guía+CLI',
        note: 'El artículo la lista como opcional, pero no en su flujo recomendado.' },
      { index: '04 / Desglosar', tag: 'POR FUNCIONALIDAD', surface: CHAT, title: 'Generar las tareas', cmd: '/speckit-tasks', strip: 3,
        desc: 'Convierte el diseño en tareas accionables y ordenadas según sus dependencias.', check: 'guía+artículo+CLI' },
      { index: 'Control', tag: 'OPCIONAL', surface: CHAT, title: 'Analizar la coherencia', cmd: '/speckit-analyze', strip: 3,
        desc: 'Busca conflictos entre spec.md, plan.md y tasks.md antes de implementar.', check: 'guía+artículo+CLI' },
      { index: '05 / Construir', tag: 'POR FUNCIONALIDAD', surface: CHAT, title: 'Implementar las tareas', cmd: '/speckit-implement', strip: 4,
        desc: 'Ejecuta las tareas de tasks.md en orden de dependencias y valida el resultado.', check: 'guía+artículo+CLI' },
      { index: 'Extra', tag: 'OPCIONAL', surface: CHAT, title: 'Convertir las tareas en issues', cmd: '/speckit-taskstoissues', strip: 4,
        desc: 'Convierte las tareas en issues de GitHub.', check: 'artículo+CLI',
        note: 'No está en la guía; el artículo y el init real sí lo incluyen.' },
      { index: '06 / Verificar', tag: 'POR FUNCIONALIDAD', surface: CHAT, title: 'Comprobar la convergencia', cmd: '/speckit-converge', strip: 5,
        desc: 'Compara la implementación con los artefactos. Si quedan brechas, agrega tareas y repite.', check: 'guía+artículo+CLI' },
    ],
    summaryLead: 'Ruta breve:',
    summary: 'constitución una vez por proyecto; después, especifica, planifica, genera tareas, implementa y converge por funcionalidad. Aclarar, checklist y analizar, solo cuando haga falta.',
  },

  cli: {
    kicker: 'CONSULTA RÁPIDA', title: 'Comandos de terminal',
    note: 'Estos comandos se ejecutan en PowerShell. El flujo SDD se ejecuta desde Copilot Chat. Ninguno es obligatorio.',
    steps: [
      { index: '01 / Diagnóstico', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Comprobar herramientas', cmd: 'specify check',
        desc: 'Verifica herramientas de agentes de codificación basados en CLI. Los agentes integrados en IDE, como Copilot, se omiten.', check: 'guía+artículo+CLI' },
      { index: '02 / Versión', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Consultar la versión instalada', cmd: 'specify version',
        desc: 'Muestra la versión de Spec Kit CLI, Python, la plataforma y la arquitectura.', check: 'guía+CLI' },
      { index: '03 / Actualizaciones', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Comprobar si hay una versión nueva', cmd: 'specify self check',
        desc: 'Consulta si hay una versión más reciente. Es una comprobación de solo lectura y no actualiza la instalación.', check: 'guía+artículo+CLI' },
      { index: '04 / Actualizar', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Actualizar la CLI', cmd: 'specify self upgrade --dry-run',
        desc: 'Muestra qué haría la actualización sin aplicarla. Quita --dry-run para actualizar.', check: 'artículo+CLI' },
      { index: '05 / Integraciones', tag: 'OPCIONAL', surface: 'POWERSHELL', title: 'Ver las integraciones', cmd: 'specify integration list',
        desc: 'Lista los agentes de codificación compatibles y su estado.', check: 'artículo+CLI' },
    ],
  },

  limits: {
    title: 'Dónde duele',
    lead: 'Dónde duele',
    items: [
      'Mar de Markdown: en proyectos pequeños los documentos superan al código.',
      'Efecto cascada: un cambio a mitad de camino obliga a actualizar toda la cadena.',
      'Contexto limitado: constitución, spec, plan y tareas pueden agotar el del agente.',
      'Para añadir funciones puntuales a un proyecto existente, conviene OpenSpec.',
    ],
    note: 'Fuente: artículo de Webreactiva sobre Spec Kit. El flujo de vuelta y converge mitigan la cascada, pero no la eliminan.',
  },
};
