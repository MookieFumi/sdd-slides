/**
 * Texto de las dos guías, copiado carácter por carácter de
 * reference/guia-uso-open-spec-es.html y reference/guia-uso-github-spec-kit-es.html.
 * Las escenas importan de aquí; nunca se reescribe a mano en ellas.
 */

import { config } from './deck.config';

export interface Step {
  /** "03 / Explorar" */
  index: string;
  /** Dónde se ejecuta: TERMINAL, CHAT DE COPILOT, POWERSHELL... */
  surface: string;
  title: string;
  cmd: string;
  desc: string;
}

/* ───────────────────────────── OpenSpec ───────────────────────────── */

export const OS = {
  eyebrow: 'FLUJO DE TRABAJO',
  title: 'OpenSpec en la práctica.',
  lead: 'Desde la preparación del proyecto hasta el archivo del cambio.',
  routeTitle: 'Flujo típico del cambio',
  route: ['Explorar', 'Proponer', 'Aplicar', 'Sincronizar', 'Archivar'],
  routeNote: 'Explorar es opcional; úsalo cuando necesites madurar la idea.',

  prepKicker: 'ANTES DE EMPEZAR',
  prepTitle: 'Prepara el entorno',
  prepNote: 'Instala la herramienta una vez. Inicializa cada proyecto en el que vayas a usar OpenSpec.',
  prep: [
    {
      index: '01 / Herramienta', surface: 'TERMINAL', title: 'Instalar OpenSpec',
      cmd: 'npm install -g @fission-ai/openspec@latest',
      desc: 'Instala la CLI de forma global. Ejecútalo en CMD o PowerShell.',
    },
    {
      index: '02 / Proyecto', surface: 'TERMINAL', title: 'Inicializar un proyecto',
      cmd: 'openspec init',
      desc: 'En la carpeta del proyecto, crea la estructura de OpenSpec necesaria para empezar.',
    },
  ] as Step[],

  flowKicker: 'DEL BORRADOR AL ARCHIVO',
  flowTitle: 'Trabaja en un cambio',
  flowNote: 'Los comandos opsx-* se usan en el campo de chat de GitHub Copilot en VS Code.',
  flow: [
    {
      index: '03 / Explorar', surface: 'CHAT DE COPILOT', title: 'Madurar una idea',
      cmd: 'opsx-explore',
      desc: 'Investiga posibilidades y aclara decisiones antes de formalizar el alcance. Es opcional.',
    },
    {
      index: '04 / Proponer', surface: 'CHAT DE COPILOT', title: 'Crear el plan',
      cmd: 'opsx-propose',
      desc: 'Describe qué quieres cambiar. Genera la propuesta, la especificación, el diseño y las tareas.',
    },
    {
      index: '05 / Aplicar', surface: 'CHAT DE COPILOT', title: 'Implementar las tareas',
      cmd: 'opsx-apply',
      desc: 'Con el plan listo, recorre las tareas del cambio e implementa la solución.',
    },
    {
      index: '06 / Sincronizar', surface: 'CHAT DE COPILOT', title: 'Actualizar las especificaciones principales',
      cmd: 'opsx-sync',
      desc: 'Aplica las especificaciones delta de este cambio a las especificaciones principales sin archivarlo.',
    },
    {
      index: '07 / Archivar', surface: 'CHAT DE COPILOT', title: 'Concluir un cambio',
      cmd: 'opsx-archive',
      desc: 'Después de implementar y revisar, archiva el contexto del cambio concluido.',
    },
  ] as Step[],
  support: {
    index: 'ACCIÓN DE APOYO', surface: 'CHAT DE COPILOT', title: 'Revisar el plan',
    cmd: 'opsx-update',
    desc: 'Revisa los artefactos existentes de un cambio para mantener la coherencia. No implementa código.',
  } as Step,
  flowSummaryLead: 'En el orden habitual:',
  flowSummary: 'explora si hace falta, propone para generar el plan, aplica para implementar, sincroniza las especificaciones principales y archiva después de revisar.',

  cliKicker: 'CONSULTA RÁPIDA',
  cliTitle: 'Comandos de terminal',
  cliNote: 'Estos comandos se ejecutan en la terminal, dentro del proyecto OpenSpec.',
  cli: [
    {
      index: '01 / Cambios', surface: 'TERMINAL', title: 'Listar cambios activos',
      cmd: 'openspec list',
      desc: 'Muestra los cambios en curso y sus estados.',
    },
    {
      index: '02 / Especificaciones', surface: 'TERMINAL', title: 'Listar capacidades',
      cmd: 'openspec list --specs',
      desc: 'Muestra las especificaciones principales disponibles en el proyecto.',
    },
    {
      index: '03 / Progreso', surface: 'TERMINAL', title: 'Seguir todos los cambios',
      cmd: 'openspec status --all',
      desc: 'Muestra el progreso de los artefactos de cada cambio activo.',
    },
    {
      index: '04 / Inspección', surface: 'TERMINAL', title: 'Inspeccionar un cambio',
      cmd: 'openspec show NOME-DA-MUDANCA --type change',
      desc: 'Muestra los detalles del cambio. Reemplaza NOME-DA-MUDANCA por el identificador real.',
    },
    {
      index: '05 / Validación', surface: 'TERMINAL', title: 'Validar cambios y especificaciones',
      cmd: 'openspec validate --all --strict',
      desc: 'Valida todos los cambios y las especificaciones con las comprobaciones estrictas.',
    },
    {
      index: '06 / Instrucciones', surface: 'TERMINAL', title: 'Actualizar las instrucciones de OpenSpec',
      cmd: 'openspec update',
      desc: 'Actualiza los archivos de instrucciones del proyecto; no revisa el plan como opsx-update.',
    },
  ] as Step[],
};

/* ───────────────────────────── Spec Kit ───────────────────────────── */

export const SK = {
  eyebrow: 'DESARROLLO GUIADO POR ESPECIFICACIONES',
  title: 'Spec Kit en la práctica.',
  version: 'v1.1.0',
  lead: 'Desde la preparación del proyecto hasta la convergencia.',
  routeTitle: 'Flujo SDD por funcionalidad',
  route: ['Especificar', 'Planificar', 'Desglosar', 'Implementar', 'Converger'],
  routeNote: 'La constitución se establece una vez por proyecto; los controles de calidad son opcionales.',

  prepKicker: 'ANTES DE EMPEZAR',
  prepTitle: 'Prepara el entorno',
  prepNote: 'Necesitas Python 3.11 o superior, uv y GitHub Copilot en VS Code. Spec Kit genera scripts PowerShell en Windows.',
  /** Enlace de la tarjeta "Instalar uv" (va en las notas del presentador). */
  uvUrl: config.uvGuideUrl,
  prep: [
    {
      index: '01 / Requisitos', surface: 'WINDOWS', title: 'Instalar uv',
      cmd: config.uvInstallCmd,
      desc: 'Instala Python 3.11+ y uv antes de continuar.',
    },
    {
      index: '02 / CLI', surface: 'POWERSHELL', title: 'Instalar Spec Kit v1.1.0',
      cmd: config.specKitInstallCmd,
      desc: 'Instala la CLI desde el repositorio oficial, fijada a la versión estable consultada el 6 de octubre de 2026.',
    },
    {
      index: '03 / Proyecto', surface: 'POWERSHELL', title: 'Crear un proyecto con Copilot',
      cmd: 'specify init mi-proyecto --integration copilot',
      desc: 'Inicializa una carpeta nueva con la integración de GitHub Copilot. Después, abre esa carpeta en VS Code.',
    },
  ] as Step[],

  flowKicker: 'DE LA IDEA A LA CONVERGENCIA',
  flowTitle: 'Trabaja en una funcionalidad',
  flowNote: 'Ejecuta cada skill por separado en Copilot Chat y revisa el resultado antes de continuar. No son comandos de terminal.',
  flow: [
    {
      index: '01 / Una vez por proyecto', surface: 'COPILOT CHAT', title: 'Establecer la constitución',
      cmd: 'speckit-constitution',
      desc: 'Define los principios del proyecto que orientarán y evaluarán las etapas siguientes.',
    },
    {
      index: '02 / Definir', surface: 'COPILOT CHAT', title: 'Especificar qué construir',
      cmd: 'speckit-specify',
      desc: 'Describe qué necesitas y por qué. Concéntrate en el comportamiento, no en la tecnología.',
    },
    {
      index: '03 / Diseñar', surface: 'COPILOT CHAT', title: 'Crear el plan técnico',
      cmd: 'speckit-plan',
      desc: 'Indica el stack, la arquitectura y las restricciones para generar los artefactos de diseño.',
    },
    {
      index: '04 / Desglosar', surface: 'COPILOT CHAT', title: 'Generar las tareas',
      cmd: 'speckit-tasks',
      desc: 'Convierte el diseño en tareas accionables y ordenadas según sus dependencias.',
    },
    {
      index: '05 / Construir', surface: 'COPILOT CHAT', title: 'Implementar las tareas',
      cmd: 'speckit-implement',
      desc: 'Ejecuta las tareas de tasks.md en orden de dependencias y valida el resultado.',
    },
    {
      index: '06 / Verificar', surface: 'COPILOT CHAT', title: 'Comprobar la convergencia',
      cmd: 'speckit-converge',
      desc: 'Compara la implementación con los artefactos. Si quedan brechas, agrega tareas y repite.',
    },
  ] as Step[],
  optional: [
    {
      index: 'CONTROL OPCIONAL', surface: 'COPILOT CHAT', title: 'Aclarar requisitos',
      cmd: 'speckit-clarify',
      desc: 'Resuelve ambigüedades en la especificación antes de planificar.',
    },
    {
      index: 'CONTROL OPCIONAL', surface: 'COPILOT CHAT', title: 'Revisar la calidad de requisitos',
      cmd: 'speckit-checklist',
      desc: 'Genera una lista para evaluar que los requisitos sean completos, claros y coherentes.',
    },
    {
      index: 'CONTROL OPCIONAL', surface: 'COPILOT CHAT', title: 'Analizar la coherencia',
      cmd: 'speckit-analyze',
      desc: 'Busca conflictos entre spec.md, plan.md y tasks.md antes de implementar.',
    },
  ] as Step[],
  /** Paso del flujo (0-based) tras el que va cada control opcional, según la nota "Ruta breve". */
  optionalAfter: ['después de especificar', 'después del plan', 'después de las tareas'],
  optionalAfterIndex: [0, 1, 2],
  flowSummaryLead: 'Ruta breve:',
  flowSummary: 'Constitución una vez por proyecto; después, especifica, planifica, genera tareas, implementa y converge por funcionalidad.',
  flowSummary2: 'En trabajos de producción puedes sumar los controles opcionales: aclarar después de especificar, checklist después del plan y analizar después de las tareas.',

  cliKicker: 'CONSULTA RÁPIDA',
  cliTitle: 'Comandos de terminal',
  cliNote: 'Estos comandos se ejecutan en PowerShell. El flujo SDD se ejecuta desde Copilot Chat.',
  cli: [
    {
      index: '01 / Diagnóstico', surface: 'POWERSHELL', title: 'Comprobar herramientas',
      cmd: 'specify check',
      desc: 'Verifica herramientas de agentes de codificación basados en CLI. Los agentes integrados en IDE, como Copilot, se omiten.',
    },
    {
      index: '02 / Versión', surface: 'POWERSHELL', title: 'Consultar la versión instalada',
      cmd: 'specify version',
      desc: 'Muestra la versión de Spec Kit CLI, Python, la plataforma y la arquitectura.',
    },
    {
      index: '03 / Actualizaciones', surface: 'POWERSHELL', title: 'Comprobar si hay una versión nueva',
      cmd: 'specify self check',
      desc: 'Consulta si hay una versión más reciente. Es una comprobación de solo lectura y no actualiza la instalación.',
    },
  ] as Step[],
};
