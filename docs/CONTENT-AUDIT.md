# Content audit — OpenSpec y Spec Kit en la práctica

Fuentes (en `reference/`, solo lectura):
- `guia-uso-open-spec-es.html` — guía de OpenSpec.
- `guia-uso-github-spec-kit-es.html` — guía de GitHub Spec Kit v1.1.0 (consultada el 6 oct 2026).
- `guias-texto.md` — texto de ambas guías sin etiquetas HTML, usado solo para `npm run verify -- --source=…`.

Regla: la fuente decide **qué** se dice; el tema neutro decide **cómo** se ve. Todo el texto de escena sale de
`deck/content.ts`, copiado de las guías. Estructura acordada: un bloque por herramienta (OpenSpec y luego Spec Kit),
cada uno con portada, preparar, flujo en el chat de Copilot y comandos de terminal.

## Datos (nunca adivinar)

| Dato | Valor | Fuente |
| --- | --- | --- |
| Título | OpenSpec y Spec Kit en la práctica | pedido del usuario + títulos de las guías |
| Subtítulo | Guía de uso | nombre de los archivos de las guías |
| Ponente | Miguel Ángel | perfil del usuario (sin apellido ni cargo) |
| Evento · ciudad · fecha | Sin nombre de evento · Madrid · 9 oct 2026 | indicado por el usuario el 9 oct 2026 |
| Destino del QR | ninguno (el usuario eligió cierre solo con preguntas) | decisión del usuario |
| Versión de Spec Kit | v1.1.0, consultada el 6 oct 2026 | guía de Spec Kit |

## Guía → beats

### OpenSpec (escenas 2–4)

| Parte de la guía | Beat(s) | Estado | Notas |
| --- | --- | --- | --- |
| Hero: título, "Desde la preparación del proyecto hasta el archivo del cambio." | 2.1 | kept | |
| Hero: "Encuentra el comando adecuado y úsalo con un clic." | — | cut | habla de los botones Copiar, que no existen en la charla |
| Hero: flujo típico (Explorar > Proponer > Aplicar > Sincronizar > Archivar) + nota de Explorar opcional | 2.2 | kept | |
| Prepara el entorno + nota | 2.3 | kept | |
| 01 Instalar OpenSpec (`npm install -g @fission-ai/openspec@latest`) | 2.4 | kept | |
| 02 Inicializar un proyecto (`openspec init`) | 2.5 | kept | |
| Trabaja en un cambio + nota de `/opsx-*` | 3.1 | kept | |
| 03 Explorar, 04 Proponer, 05 Aplicar, 06 Sincronizar, 07 Archivar | 3.2–3.6 | kept | franja del flujo al pie con el paso activo |
| Acción de apoyo: Revisar el plan (`/opsx-update`) | 3.7 | kept | sin paso activo en la franja |
| Nota "En el orden habitual" | 3.8 | kept | franja con todos los pasos encendidos |
| Comandos de terminal + nota | 4.1 | kept | |
| 01–06: `openspec list`, `list --specs`, `status --all`, `show NOME-DA-MUDANCA --type change`, `validate --all --strict`, `update` | 4.2–4.7 | kept | la lista de comandos se acumula en pantalla |

### Spec Kit (escenas 5–7)

| Parte de la guía | Beat(s) | Estado | Notas |
| --- | --- | --- | --- |
| Hero: título, versión v1.1.0, "Desde la preparación del proyecto hasta la convergencia." | 5.1 | kept | "Consultada el 6 oct 2026" está en la nota del presentador y en la tarjeta de instalación |
| Hero: "Configura Spec Kit en Windows y guía cada funcionalidad desde GitHub Copilot Chat." | — | cut | lo cubren 5.3 (Windows) y 6.1 (Copilot Chat) |
| Hero: flujo SDD (Especificar > Planificar > Desglosar > Implementar > Converger) + nota de constitución y controles | 5.2 | kept | |
| Prepara el entorno + nota (Python 3.11, uv, Copilot, PowerShell en Windows) | 5.3 | kept | |
| 01 Instalar uv (`python --version`) | 5.4 | kept | ver preguntas abiertas |
| 02 Instalar Spec Kit v1.1.0 | 5.5 | kept | comando de 83 caracteres a tamaño reducido para que quepa íntegro |
| 03 Crear un proyecto con Copilot | 5.6 | kept | |
| Trabaja en una funcionalidad + nota | 6.1 | kept | |
| 01 Constitución, 02 Especificar, 03 Plan, 04 Tareas, 05 Implementar, 06 Converger | 6.2–6.7 | kept | |
| Controles opcionales: Aclarar, Checklist, Analizar | 6.8–6.10 | kept | cada uno señala en la franja tras qué paso va, según la "Ruta breve" |
| Nota "Ruta breve" | 6.11 | kept | |
| Comandos de terminal + nota | 7.1 | kept | |
| 01–03: `specify check`, `specify version`, `specify self check` | 7.2–7.4 | kept | |
| (no está en las guías) | 8.1 | new | cierre "¿Preguntas?" sin QR |

### Elementos de la página que no se llevan al escenario

Cabecera y navegación (Preparar · Flujo · Terminal), botones y mensajes de "Copiar", pie de página y el enlace
a la guía oficial de uv (la dirección se conserva en la nota del presentador de 5.3).

## Artefactos reales

Ninguno: las guías no contienen imágenes ni logos. No se ha dibujado ningún logo de OpenSpec, Spec Kit, GitHub ni Copilot.

## Preguntas abiertas

- [ ] La tarjeta "Instalar uv" de la guía de Spec Kit muestra el comando `python --version` (comprueba Python, no instala uv). Se ha respetado la guía tal cual; conviene revisarla.
- [ ] En la guía de OpenSpec, el identificador de ejemplo es `NOME-DA-MUDANCA` (portugués) dentro de un texto en español. Se mantiene literal por ser parte del comando.
- [ ] ¿El apellido o cargo del ponente debe ir en la portada?

## Decisiones tomadas en nombre del ponente

- Ponente "Miguel Ángel", sin apellido ni cargo, y subtítulo "Guía de uso".
- Los comandos de terminal llevan un prompt `>` decorativo dibujado con CSS (no forma parte del texto, que es exactamente el de la guía); los comandos del chat de Copilot se muestran sin prompt.
- Se han quitado las comillas de código de la guía (`/opsx-*`, `/opsx-update`, `tasks.md`, `spec.md`…) en los textos de apoyo, porque en escena no hay formato Markdown.
- Las URL que aparecen en escena o en notas (`git+https://github.com/github/spec-kit.git@v1.1.0` y la guía de uv) viven en `deck/deck.config.ts` para que la comprobación sin conexión las trate como texto; no se descargan.
- Tema neutro y acento azul por defecto: no se ha aplicado la paleta verde/naranja de las guías porque no se indicó marca.
