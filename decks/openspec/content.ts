import type { TalkData } from '../_shared/types';

const CHAT = 'CHAT DE COPILOT';

export const OPENSPEC: TalkData = {
  id: 'openspec-en-la-practica',
  name: 'OpenSpec',
  version: 'v1.14.1',
  eyebrow: 'FLUJO DE TRABAJO',
  lead: 'Desde la preparación del proyecto hasta el archivo del cambio.',
  routeTitle: 'Flujo típico del cambio',
  route: [
    { label: 'Explorar', opt: true }, { label: 'Proponer' }, { label: 'Aplicar' }, { label: 'Sincronizar', opt: true }, { label: 'Archivar' },
  ],
  routeNote: 'Explorar es opcional; úsalo cuando necesites madurar la idea. Sincronizar también: archivar ya fusiona las especificaciones.',

  req: {
    kicker: 'ANTES DE EMPEZAR', title: 'Requisitos',
    note: 'Una versión de Node.js y GitHub Copilot en VS Code. Nada más.',
    steps: [
      { index: '01 / Node.js', tag: '', surface: 'TERMINAL', title: 'Node.js 20.19.0 o superior', cmd: 'node --version',
        desc: 'Comprueba la versión instalada. OpenSpec exige 20.19.0 o posterior.', check: 'artículo+CLI',
        note: 'La guía no da la versión mínima; sale del artículo y del campo engines del paquete.' },
      { index: '02 / Agente', tag: '', surface: 'VS CODE', title: 'GitHub Copilot en VS Code', cmd: '',
        desc: 'Los comandos del flujo se escriben en el campo de chat de GitHub Copilot, no en la terminal.', check: 'guía+CLI' },
    ],
  },

  install: {
    kicker: 'UNA VEZ POR MÁQUINA', title: 'Instalación',
    note: 'Instala la herramienta una vez. Ejecútalo en CMD o PowerShell.',
    steps: [
      { index: '01 / Herramienta', tag: 'UNA VEZ', surface: 'TERMINAL', title: 'Instalar OpenSpec', cmd: 'npm install -g @fission-ai/openspec@latest',
        desc: 'Instala la CLI de forma global.', check: 'guía+artículo+CLI' },
      { index: '02 / Alternativa', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Instalar con pnpm', cmd: 'pnpm add -g @fission-ai/openspec@latest',
        desc: 'Si usas pnpm en lugar de npm. También funcionan yarn y bun.', check: 'solo artículo',
        note: 'Solo aparece en el artículo de Webreactiva; no está en la guía.' },
    ],
  },

  prep: {
    kicker: 'ANTES DEL INIT · OPCIONAL', title: 'Prepara el terreno',
    note: 'El init deja plantillas vacías. Rellenarlas bien es lo que más cambia el resultado. Se vuelcan en openspec/config.yaml después del init.',
    template: {
      title: 'LO QUE DEJA EL INIT · openspec/config.yaml',
      lines: [
        '# Project context (optional)',
        '# Include constraints an agent cannot infer by reading the code.',
        '#   context: |',
        '#     Write all artifacts in Spanish',
        '',
        '# Per-artifact rules (optional)',
        '#   rules:',
        '#     proposal:',
        '#       - Always state what is out of scope',
        '',
        '# Per-operation guidance (optional)',
        '#   operations:',
        '#     apply:',
      ],
      note: 'Todo viene comentado: sin contexto, OpenSpec genera artefactos genéricos.',
    },
    split: {
      deduce: ['Stack y versión de .NET', 'Convenciones de tests', 'Estructura de proyectos', 'Estilo y nombres'],
      only: ['Idioma de los artefactos', 'Ticketing y nombre del cambio', 'Equipos y sistemas afectados', 'Normativa y decisiones ya tomadas'],
      target: 'context y rules',
      note: 'La regla de la propia plantilla: solo restricciones que un agente no puede inferir leyendo el código.',
    },
    agent: {
      title: 'EL AGENTE DE GOBIERNO',
      steps: [
        { label: 'Explora la solución', desc: 'Deduce el stack, las convenciones de código y de tests, y la estructura.' },
        { label: 'Pregunta cuando hay dudas', desc: 'No da nada por sentado: lo que no puede deducir, te lo pregunta.' },
        { label: 'Fusiona la documentación interna', desc: 'Si ya existe, la integra con lo que ve en el código y aclara las contradicciones.' },
        { label: 'Propone el borrador', desc: 'Ya genera copilot-instructions, skills y agentes. El borrador de config.yaml es el siguiente paso.', pending: true },
        { label: 'Tú revisas y apruebas', desc: 'El borrador no se aplica solo: la decisión es del equipo.' },
      ],
      footer: 'Agente de gobierno · probado con equipos .NET · cubre todo el stack salvo pipelines (Jenkins, Azure DevOps)',
    },
    example: {
      title: 'EJEMPLO GENÉRICO · config.yaml',
      lines: [
        'context: |',
        '  Artefactos en español; identificadores en inglés.',
        '  Tickets: <ISSUE_TRACKER>, clave al inicio del cambio.',
        '  Sistemas y equipos afectados: <A>, <B>.',
        '  Prohibido: <librería X> (licencia).',
        'rules:',
        '  proposal:',
        '    - Impacto en seguridad y datos.',
        '    - Cambios incompatibles en APIs.',
        '  tasks:',
        '    - Máximo ~2 horas; tests Arrange/Act/Assert.',
        'operations:',
        '  apply:',
        '    guidance:',
        '      - Build y tests antes de marcar la tarea.',
      ],
      note: 'Los valores entre <…> los rellena cada equipo. Qué va en context, en rules y en operations.',
    },
  },
  init: {
    kicker: 'UNA VEZ POR PROYECTO', title: 'Inicializar el proyecto',
    note: 'En la carpeta del proyecto. Inicializa cada proyecto en el que vayas a usar OpenSpec.',
    steps: [
      { index: '01 / Proyecto', tag: 'UNA VEZ', surface: 'TERMINAL', title: 'Inicializar un proyecto', cmd: 'openspec init',
        desc: 'Asistente interactivo: pregunta qué herramientas usas. Elige GitHub Copilot.', check: 'guía+artículo+CLI' },
      { index: '02 / Sin preguntas', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Inicializar sin asistente', cmd: 'openspec init --tools github-copilot',
        desc: 'Elige la herramienta por parámetro. Útil en scripts o para repetirlo sin preguntas.', check: 'solo CLI',
        note: 'Comprobado ejecutándolo en OpenSpec 1.14.1; ni la guía ni el artículo lo mencionan.' },
    ],
  },

  generated: {
    kicker: 'SALIDA REAL DEL INIT', title: 'Qué genera el init',
    note: 'Comprobado con OpenSpec 1.14.1 y GitHub Copilot.',
    groups: [
      { title: 'PARA COPILOT', note: 'Seis prompts y seis skills: son los comandos /opsx-* del chat.',
        items: ['.github/prompts/opsx-*.prompt.md', '.github/skills/openspec-*/SKILL.md'] },
      { title: 'LA ESTRUCTURA DE OPENSPEC', note: 'specs/ es la fuente de verdad; cada cambio vive en changes/ hasta que se archiva.',
        items: ['openspec/specs/', 'openspec/changes/archive/', 'openspec/config.yaml'] },
    ],
  },

  chat: {
    kicker: 'DEL BORRADOR AL ARCHIVO', title: 'Trabaja en un cambio',
    note: 'Los comandos /opsx-* se usan en el campo de chat de GitHub Copilot en VS Code. Con Copilot el separador es un guion.',
    steps: [
      { index: '03 / Explorar', tag: 'OPCIONAL', surface: CHAT, title: 'Madurar una idea', cmd: '/opsx-explore', strip: 0,
        desc: 'Investiga posibilidades y aclara decisiones antes de formalizar el alcance. No crea artefactos.', check: 'guía+artículo+CLI' },
      { index: '04 / Proponer', tag: 'POR CAMBIO', surface: CHAT, title: 'Crear el plan', cmd: '/opsx-propose', strip: 1,
        desc: 'Describe qué quieres cambiar. Genera la propuesta, la especificación, el diseño y las tareas.', check: 'guía+artículo+CLI' },
      { index: 'Revisar', tag: 'OPCIONAL', surface: CHAT, title: 'Revisar el plan', cmd: '/opsx-update', strip: 1,
        desc: 'Revisa los artefactos existentes de un cambio para mantener la coherencia. No implementa código.', check: 'guía+CLI',
        note: 'Está en la guía y se genera en el init, pero el artículo no lo lista.' },
      { index: '05 / Aplicar', tag: 'POR CAMBIO', surface: CHAT, title: 'Implementar las tareas', cmd: '/opsx-apply', strip: 2,
        desc: 'Con el plan listo, recorre las tareas del cambio e implementa la solución.', check: 'guía+artículo+CLI' },
      { index: '06 / Sincronizar', tag: 'OPCIONAL', surface: CHAT, title: 'Actualizar las especificaciones principales', cmd: '/opsx-sync', strip: 3,
        desc: 'Aplica las especificaciones delta de este cambio a las especificaciones principales sin archivarlo.', check: 'discrepancia',
        note: 'La guía lo pone como paso del flujo; el artículo lo sitúa en el perfil expandido y dice que archivar ya fusiona las delta specs. Con Copilot el init sí genera /opsx-sync.' },
      { index: '07 / Archivar', tag: 'POR CAMBIO', surface: CHAT, title: 'Concluir un cambio', cmd: '/opsx-archive', strip: 4,
        desc: 'Después de implementar y revisar, archiva el contexto del cambio concluido.', check: 'guía+artículo+CLI' },
    ],
    summaryLead: 'En el orden habitual:',
    summary: 'explora si hace falta, propone para generar el plan, aplica para implementar y archiva después de revisar.',
  },

  cli: {
    kicker: 'CONSULTA RÁPIDA', title: 'Comandos de terminal',
    note: 'Estos comandos se ejecutan en la terminal, dentro del proyecto OpenSpec. Ninguno es obligatorio.',
    steps: [
      { index: '01 / Cambios', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Listar cambios activos', cmd: 'openspec list', desc: 'Muestra los cambios en curso y sus estados.', check: 'guía+CLI' },
      { index: '02 / Especificaciones', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Listar capacidades', cmd: 'openspec list --specs', desc: 'Muestra las especificaciones principales disponibles en el proyecto.', check: 'guía+CLI' },
      { index: '03 / Progreso', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Seguir todos los cambios', cmd: 'openspec status --all', desc: 'Muestra el progreso de los artefactos de cada cambio activo.', check: 'guía+CLI' },
      { index: '04 / Inspección', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Inspeccionar un cambio', cmd: 'openspec show NOME-DA-MUDANCA --type change', desc: 'Muestra los detalles del cambio. Reemplaza NOME-DA-MUDANCA por el identificador real.', check: 'guía+CLI' },
      { index: '05 / Validación', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Validar cambios y especificaciones', cmd: 'openspec validate --all --strict', desc: 'Valida todos los cambios y las especificaciones con las comprobaciones estrictas.', check: 'guía+CLI' },
      { index: '06 / Instrucciones', tag: 'OPCIONAL', surface: 'TERMINAL', title: 'Actualizar las instrucciones de OpenSpec', cmd: 'openspec update', desc: 'Actualiza los archivos de instrucciones del proyecto; no revisa el plan como /opsx-update.', check: 'guía+artículo+CLI' },
    ],
  },

  limits: {
    title: 'Dónde duele',
    lead: 'Dónde duele',
    items: [
      'Mantener specs y código alineados es el dolor más real.',
      'Tratar la spec como intocable devuelve a un waterfall.',
      'Escribir specs quita tiempo de programar: tiene que compensar en revisiones.',
      'Para un prototipo o un proyecto pequeño, basta con vibe coding.',
    ],
    note: 'Fuente: artículo de Webreactiva sobre OpenSpec. No es una limitación de la herramienta, sino de cómo se usa.',
  },
};
