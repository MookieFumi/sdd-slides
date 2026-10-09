import type { BeatDef, SceneDef } from 'beatdeck';
import { OS, SK, type Step } from './content';

/**
 * The talk's beat map: scenes → beats. One click = one beat.
 * `ref` = where it comes from in the source, `source` = what the source says, `note` = speaker cue
 * (the presenter view shows all three; the audience never does).
 */

const OPEN_SPEC = 'guia-uso-open-spec-es.html';
const SPEC_KIT = 'guia-uso-github-spec-kit-es.html';

const where = (s: Step) =>
  s.surface === 'CHAT DE COPILOT' || s.surface === 'COPILOT CHAT'
    ? 'Se escribe en el chat de GitHub Copilot (VS Code), no en la terminal.'
    : 'Se ejecuta en la terminal.';

const stepBeat = (file: string, section: string, s: Step): BeatDef => ({
  name: s.cmd, ref: `${file} · ${section} · ${s.index}`, source: `${s.title}. ${s.desc}`, note: where(s),
});

const section = (file: string, ref: string, title: string, note: string, cue?: string): BeatDef => ({
  name: title.toLowerCase(), ref: `${file} · ${ref}`, source: note, note: cue,
});

export const SCENES: SceneDef[] = [
  {
    id: '01', title: 'OPEN',
    beats: [
      { name: 'standby', note: 'Pantalla en calma mientras la gente se sienta. El primer clic empieza la charla.' },
      { name: 'title', note: 'Dos guías de uso: OpenSpec primero, Spec Kit después.' },
    ],
  },
  {
    id: '02', title: 'OPENSPEC',
    beats: [
      { name: 'portada', ref: `${OPEN_SPEC} · hero`, source: `${OS.title} ${OS.lead}` },
      { name: 'flujo típico', ref: `${OPEN_SPEC} · hero · ${OS.routeTitle}`, source: `${OS.route.join(' > ')}. ${OS.routeNote}` },
      section(OPEN_SPEC, '#preparar', OS.prepTitle, OS.prepNote, 'La herramienta se instala una vez; cada proyecto se inicializa.'),
      ...OS.prep.map((s) => stepBeat(OPEN_SPEC, '#preparar', s)),
    ],
  },
  {
    id: '03', title: 'OPENSPEC · CAMBIO',
    beats: [
      section(OPEN_SPEC, '#workflow', OS.flowTitle, OS.flowNote, 'A partir de aquí, todo se escribe en el chat de Copilot.'),
      ...OS.flow.map((s) => stepBeat(OPEN_SPEC, '#workflow', s)),
      stepBeat(OPEN_SPEC, '#workflow', OS.support),
      { name: 'orden habitual', ref: `${OPEN_SPEC} · #workflow · nota`, source: `${OS.flowSummaryLead} ${OS.flowSummary}` },
    ],
  },
  {
    id: '04', title: 'OPENSPEC · TERMINAL',
    beats: [
      section(OPEN_SPEC, '#cli', OS.cliTitle, OS.cliNote),
      ...OS.cli.map((s) => stepBeat(OPEN_SPEC, '#cli', s)),
    ],
  },
  {
    id: '05', title: 'SPEC KIT',
    beats: [
      { name: 'portada', ref: `${SPEC_KIT} · hero`, source: `${SK.title} ${SK.lead} Versión ${SK.version}, consultada el 6 oct 2026.` },
      { name: 'flujo SDD', ref: `${SPEC_KIT} · hero · ${SK.routeTitle}`, source: `${SK.route.join(' > ')}. ${SK.routeNote}` },
      section(SPEC_KIT, '#preparar', SK.prepTitle, SK.prepNote, `Enlace de la guía oficial de uv: ${SK.uvUrl}`),
      ...SK.prep.map((s) => stepBeat(SPEC_KIT, '#preparar', s)),
    ],
  },
  {
    id: '06', title: 'SPEC KIT · FLUJO',
    beats: [
      section(SPEC_KIT, '#workflow', SK.flowTitle, SK.flowNote, 'Cada skill se ejecuta por separado y se revisa el resultado antes de seguir.'),
      ...SK.flow.map((s) => stepBeat(SPEC_KIT, '#workflow', s)),
      ...SK.optional.map((s) => stepBeat(SPEC_KIT, '#workflow', s)),
      { name: 'ruta breve', ref: `${SPEC_KIT} · #workflow · nota`, source: `${SK.flowSummaryLead} ${SK.flowSummary} ${SK.flowSummary2}` },
    ],
  },
  {
    id: '07', title: 'SPEC KIT · TERMINAL',
    beats: [
      section(SPEC_KIT, '#cli', SK.cliTitle, SK.cliNote),
      ...SK.cli.map((s) => stepBeat(SPEC_KIT, '#cli', s)),
    ],
  },
  {
    id: '08', title: 'END',
    beats: [
      { name: 'preguntas' },
    ],
  },
];
