/** Modelo común: las dos charlas rellenan exactamente la misma estructura. */

export type Tag = 'UNA VEZ' | 'POR CAMBIO' | 'POR FUNCIONALIDAD' | 'OPCIONAL' | '';

/** Contraste de cada dato con las dos fuentes (guía propia, artículo de Webreactiva) y con la CLI real. */
export type Check = 'guía+artículo+CLI' | 'guía+CLI' | 'artículo+CLI' | 'solo CLI' | 'solo guía' | 'solo artículo' | 'discrepancia';

export interface Step {
  /** "03 / Explorar" */
  index: string;
  tag: Tag;
  /** Dónde se ejecuta: TERMINAL, POWERSHELL, CHAT DE COPILOT… */
  surface: string;
  title: string;
  /** Vacío = paso sin comando (p. ej. un requisito sin comprobación). */
  cmd: string;
  desc: string;
  check: Check;
  /** Nota para el presentador: de dónde sale y cualquier diferencia entre fuentes. */
  note?: string;
  /** Posición en la franja del flujo (solo pasos del chat). */
  strip?: number;
}

export interface Limits { title: string; lead: string; items: string[]; note: string }

export interface TalkData {
  id: string;
  /** Nombre de la herramienta, p. ej. "OpenSpec". */
  name: string;
  version: string;
  eyebrow: string;
  lead: string;
  routeTitle: string;
  route: { label: string; opt?: boolean }[];
  routeNote: string;
  req: { kicker: string; title: string; note: string; steps: Step[] };
  install: { kicker: string; title: string; note: string; steps: Step[] };
  init: { kicker: string; title: string; note: string; steps: Step[] };
  generated: {
    kicker: string; title: string; note: string;
    groups: { title: string; items: string[]; note: string }[];
  };
  chat: {
    kicker: string; title: string; note: string; steps: Step[];
    summaryLead: string; summary: string;
  };
  cli: { kicker: string; title: string; note: string; steps: Step[] };
  limits: Limits;
}
