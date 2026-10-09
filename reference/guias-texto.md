# Fuente: guia-uso-open-spec-es.html

O

OpenSpec / Guía de campo

Referencia rápidapara el día a día

FLUJO DE TRABAJO

OpenSpecen la práctica.

Desde la preparación del proyecto hasta el archivo del cambio. Encuentra el comando adecuado y úsalo con un clic.

Flujo típico del cambio

Explorar

Proponer

Aplicar

Sincronizar

Archivar

Explorar es opcional; úsalo cuando necesites madurar la idea.

Preparar

Trabajar en un cambio

Comandos de terminal

ANTES DE EMPEZAR

Prepara el entorno

Instala la herramienta una vez. Inicializa cada proyecto en el que vayas a usar OpenSpec.

01 / Herramienta

TERMINAL

Instalar OpenSpec

Instala la CLI de forma global. Ejecútalo en CMD o PowerShell.

npm install -g @fission-ai/openspec@latest

Copiar

02 / Proyecto

TERMINAL

Inicializar un proyecto

En la carpeta del proyecto, crea la estructura de OpenSpec necesaria para empezar.

openspec init

Copiar

DEL BORRADOR AL ARCHIVO

Trabaja en un cambio

Los comandos `/opsx-*` se usan en el campo de chat de GitHub Copilot en VS Code.

03 / Explorar

CHAT DE COPILOT

Madurar una idea

Investiga posibilidades y aclara decisiones antes de formalizar el alcance. Es opcional.

/opsx-explore

Copiar

04 / Proponer

CHAT DE COPILOT

Crear el plan

Describe qué quieres cambiar. Genera la propuesta, la especificación, el diseño y las tareas.

/opsx-propose

Copiar

05 / Aplicar

CHAT DE COPILOT

Implementar las tareas

Con el plan listo, recorre las tareas del cambio e implementa la solución.

/opsx-apply

Copiar

06 / Sincronizar

CHAT DE COPILOT

Actualizar las especificaciones principales

Aplica las especificaciones delta de este cambio a las especificaciones principales sin archivarlo.

/opsx-sync

Copiar

07 / Archivar

CHAT DE COPILOT

Concluir un cambio

Después de implementar y revisar, archiva el contexto del cambio concluido.

/opsx-archive

Copiar

ACCIÓN DE APOYO

CHAT DE COPILOT

Revisar el plan

Revisa los artefactos existentes de un cambio para mantener la coherencia. No implementa código.

/opsx-update

Copiar

En el orden habitual: explora si hace falta, propone para generar el plan, aplica para implementar, sincroniza las especificaciones principales y archiva después de revisar.

CONSULTA RÁPIDA

Comandos de terminal

Estos comandos se ejecutan en la terminal, dentro del proyecto OpenSpec.

01 / Cambios

TERMINAL

Listar cambios activos

Muestra los cambios en curso y sus estados.

openspec list

Copiar

02 / Especificaciones

TERMINAL

Listar capacidades

Muestra las especificaciones principales disponibles en el proyecto.

openspec list --specs

Copiar

03 / Progreso

TERMINAL

Seguir todos los cambios

Muestra el progreso de los artefactos de cada cambio activo.

openspec status --all

Copiar

04 / Inspección

TERMINAL

Inspeccionar un cambio

Muestra los detalles del cambio. Reemplaza NOME-DA-MUDANCA por el identificador real.

openspec show NOME-DA-MUDANCA --type change

Copiar

05 / Validación

TERMINAL

Validar cambios y especificaciones

Valida todos los cambios y las especificaciones con las comprobaciones estrictas.

openspec validate --all --strict

Copiar

06 / Instrucciones

TERMINAL

Actualizar las instrucciones de OpenSpec

Actualiza los archivos de instrucciones del proyecto; no revisa el plan como `/opsx-update`.

openspec update

Copiar

OpenSpec / Referencia de comandos

Una guía local. Sin dependencias externas.

# Fuente: guia-uso-github-spec-kit-es.html

S

GitHub Spec Kit / Guía de campo

Versión v1.1.0Consultada el 6 oct 2026

DESARROLLO GUIADO POR ESPECIFICACIONES

Spec Kiten la práctica.

Desde la preparación del proyecto hasta la convergencia. Configura Spec Kit en Windows y guía cada funcionalidad desde GitHub Copilot Chat.

Flujo SDD por funcionalidad

Especificar

Planificar

Desglosar

Implementar

Converger

La constitución se establece una vez por proyecto; los controles de calidad son opcionales.

Preparar

Flujo SDD

Comandos de terminal

ANTES DE EMPEZAR

Prepara el entorno

Necesitas Python 3.11 o superior, uv y GitHub Copilot en VS Code. Spec Kit genera scripts PowerShell en Windows.

01 / Requisitos

WINDOWS

Instalar uv

Instala Python 3.11+ y uv antes de continuar. Consulta la guía oficial de instalación de uv

.

python --version

Copiar

02 / CLI

POWERSHELL

Instalar Spec Kit v1.1.0

Instala la CLI desde el repositorio oficial, fijada a la versión estable consultada el 6 de octubre de 2026.

uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.1.0

Copiar

03 / Proyecto

POWERSHELL

Crear un proyecto con Copilot

Inicializa una carpeta nueva con la integración de GitHub Copilot. Después, abre esa carpeta en VS Code.

specify init mi-proyecto --integration copilot

Copiar

DE LA IDEA A LA CONVERGENCIA

Trabaja en una funcionalidad

Ejecuta cada skill por separado en Copilot Chat y revisa el resultado antes de continuar. No son comandos de terminal.

01 / Una vez por proyecto

COPILOT CHAT

Establecer la constitución

Define los principios del proyecto que orientarán y evaluarán las etapas siguientes.

/speckit-constitution

Copiar

02 / Definir

COPILOT CHAT

Especificar qué construir

Describe qué necesitas y por qué. Concéntrate en el comportamiento, no en la tecnología.

/speckit-specify

Copiar

03 / Diseñar

COPILOT CHAT

Crear el plan técnico

Indica el stack, la arquitectura y las restricciones para generar los artefactos de diseño.

/speckit-plan

Copiar

04 / Desglosar

COPILOT CHAT

Generar las tareas

Convierte el diseño en tareas accionables y ordenadas según sus dependencias.

/speckit-tasks

Copiar

05 / Construir

COPILOT CHAT

Implementar las tareas

Ejecuta las tareas de tasks.md

en orden de dependencias y valida el resultado.

/speckit-implement

Copiar

06 / Verificar

COPILOT CHAT

Comprobar la convergencia

Compara la implementación con los artefactos. Si quedan brechas, agrega tareas y repite.

/speckit-converge

Copiar

CONTROL OPCIONAL

COPILOT CHAT

Aclarar requisitos

Resuelve ambigüedades en la especificación antes de planificar.

/speckit-clarify

Copiar

CONTROL OPCIONAL

COPILOT CHAT

Revisar la calidad de requisitos

Genera una lista para evaluar que los requisitos sean completos, claros y coherentes.

/speckit-checklist

Copiar

CONTROL OPCIONAL

COPILOT CHAT

Analizar la coherencia

Busca conflictos entre spec.md

, plan.md

y tasks.md

antes de implementar.

/speckit-analyze

Copiar

Ruta breve: Constitución una vez por proyecto; después, especifica, planifica, genera tareas, implementa y converge por funcionalidad. En trabajos de producción puedes sumar los controles opcionales: aclarar después de especificar, checklist después del plan y analizar después de las tareas.

CONSULTA RÁPIDA

Comandos de terminal

Estos comandos se ejecutan en PowerShell. El flujo SDD se ejecuta desde Copilot Chat.

01 / Diagnóstico

POWERSHELL

Comprobar herramientas

Verifica herramientas de agentes de codificación basados en CLI. Los agentes integrados en IDE, como Copilot, se omiten.

specify check

Copiar

02 / Versión

POWERSHELL

Consultar la versión instalada

Muestra la versión de Spec Kit CLI, Python, la plataforma y la arquitectura.

specify version

Copiar

03 / Actualizaciones

POWERSHELL

Comprobar si hay una versión nueva

Consulta si hay una versión más reciente. Es una comprobación de solo lectura y no actualiza la instalación.

specify self check

Copiar

GitHub Spec Kit / SDD v1.1.0

Guía local. Comandos verificados el 6 de octubre de 2026.

# Ajustes pedidos por el ponente (9 oct 2026)

Estos textos no están en las guías originales. La tarjeta "Instalar uv" de la guía de Spec Kit pasa a mostrar
el instalador de uv para Windows de la guía oficial de uv (https://github.github.io/spec-kit/install/uv.html):

powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
