import { Reveal, Terminal } from 'beatdeck';
import type { Step } from './types';

/** Superficies donde el comando se escribe en una terminal (el resto va al chat de Copilot). */
const SHELL = ['TERMINAL', 'POWERSHELL', 'WINDOWS', 'CMD O POWERSHELL'];
export const isShell = (s: Step) => SHELL.includes(s.surface);

/** Tamaño de un comando de terminal para que quepa en 1620 px de ancho (mono ≈ 0.6 em por carácter). */
const termSize = (cmd: string, max = 96) => Math.max(30, Math.min(max, Math.floor(1620 / ((cmd.length + 2) * 0.605))));

/** Tamaño de un titular `t-statement` (nowrap) que quepa en 1620 px. */
const statementSize = (text: string, max = 170) => Math.min(max, Math.floor(1620 / (text.length * 0.52)));

const TITLE_STYLE: React.CSSProperties = { width: 1620 };

/* ── Aperturas ─────────────────────────────────────────────────────────── */

/** Portada de un bloque: etiqueta, titular en dos líneas, frase de apoyo y (opcional) versión. */
export function BlockIntro({ on, out, eyebrow, lines, lead, tag }: {
  on: boolean; out: boolean; eyebrow: string; lines: [string, string]; lead: string; tag?: string;
}) {
  return (
    <>
      <Reveal on={on} out={out} x={168} y={300}>
        <div className="t-eyebrow">// {eyebrow}</div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={370} delay={120} ms={1100}>
        <div className="t-statement" style={{ fontSize: 200 }}>{lines[0]}</div>
        <div className="t-statement" style={{ fontSize: 200 }}>{lines[1]}</div>
      </Reveal>
      <Reveal on={on} out={out} x={168} y={840} delay={400} style={{ width: 1500 }}>
        <div style={{ fontSize: 40, lineHeight: 1.3, color: 'var(--ink-2)' }}>{lead}</div>
      </Reveal>
      {tag && (
        <Reveal on={on} out={out} x={1560} y={300} delay={300}>
          <div className="t-meta" style={{ fontSize: 28 }}>{tag}</div>
        </Reveal>
      )}
    </>
  );
}

/** Apertura de sección: etiqueta, titular grande y la nota de la sección. */
export function SectionOpen({ on, out, kicker, title, note, titleSize }: {
  on: boolean; out: boolean; kicker: string; title: string; note: string; titleSize?: number;
}) {
  return (
    <>
      <Reveal on={on} out={out} x={168} y={330}>
        <div className="t-eyebrow">// {kicker}</div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={400} delay={120} ms={1100}>
        <div className="t-statement" data-exact style={{ fontSize: titleSize ?? statementSize(title) }}>{title}</div>
      </Reveal>
      <Reveal on={on} out={out} x={168} y={700} delay={400} style={{ width: 1360 }}>
        <div style={{ fontSize: 44, lineHeight: 1.35, color: 'var(--ink-2)' }}>{note}</div>
      </Reveal>
    </>
  );
}

/** El flujo completo como lista grande: una línea por paso, con escalonado. */
export function RouteList({ on, out, title, steps, note }: {
  on: boolean; out: boolean; title: string; steps: { label: string; opt?: boolean }[]; note: string;
}) {
  const pitch = steps.length > 5 ? 98 : 112;
  const size = steps.length > 5 ? 84 : 96;
  return (
    <>
      <Reveal on={on} out={out} x={168} y={150}>
        <div className="t-eyebrow">// {title}</div>
      </Reveal>
      {steps.map((st, i) => { const s = st.label; return (
        <Reveal key={s} on={on} out={out} x={150} y={230 + i * pitch} delay={140 + i * 130}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 36 }}>
            <span className="mono" style={{ fontSize: 28, color: 'var(--accent)', width: 52 }}>{String(i + 1).padStart(2, '0')}</span>
            <span className="t-statement" style={{ fontSize: size, opacity: st.opt ? 0.6 : 1 }}>{s}</span>
            {st.opt && <span className="tag opt">OPCIONAL</span>}
          </div>
        </Reveal>
      ); })}
      <Reveal on={on} out={out} x={168} y={870} delay={900} style={{ width: 1500 }}>
        <div style={{ fontSize: 36, lineHeight: 1.35, color: 'var(--ink-2)' }}>{note}</div>
      </Reveal>
    </>
  );
}

/* ── Tarjetas de comando ───────────────────────────────────────────────── */

export const TagChip = ({ tag }: { tag: Step['tag'] }) =>
  tag ? <span className={`tag ${tag === 'OPCIONAL' ? 'opt' : 'fill'}`}>{tag}</span> : null;

/** Un paso: dónde se ejecuta, etiqueta (una vez / por cambio / opcional), qué hace, el comando enorme y su descripción. */
export function Card({ on, out, step }: { on: boolean; out: boolean; step: Step }) {
  const shell = isShell(step);
  const hasCmd = step.cmd !== '';
  return (
    <>
      <Reveal on={on} out={out} x={150} y={110}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div className="t-eyebrow" style={{ fontSize: 26 }}>{step.index} // {step.surface}</div>
          <TagChip tag={step.tag} />
        </div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={200} delay={80} style={TITLE_STYLE}>
        <div className="t-editorial" data-exact style={{ fontSize: 80 }}>{step.title}</div>
      </Reveal>
      {hasCmd && (
        <Reveal on={on} out={out} x={150} y={shell ? 480 : 460} delay={200}>
          {shell ? (
            <Terminal className="sh" prompt="" size={termSize(step.cmd)} lines={[step.cmd]} />
          ) : (
            <div className="mono" data-exact style={{ fontSize: Math.min(112, statementSize(step.cmd, 112) * 1.1), fontWeight: 600, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>{step.cmd}</div>
          )}
        </Reveal>
      )}
      <Reveal on={on} out={out} x={150} y={hasCmd ? 690 : 420} delay={320} style={{ width: 1380 }}>
        <div style={{ fontSize: hasCmd ? 42 : 56, lineHeight: 1.35, color: 'var(--ink-2)' }}>{step.desc}</div>
      </Reveal>
    </>
  );
}

/** Variante para las listas de comandos de terminal: título y descripción cambian; los comandos se acumulan. */
export function CliCard({ on, out, step }: { on: boolean; out: boolean; step: Step }) {
  return (
    <>
      <Reveal on={on} out={out} x={150} y={110}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div className="t-eyebrow" style={{ fontSize: 26 }}>{step.index} // {step.surface}</div>
          <TagChip tag={step.tag} />
        </div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={170} delay={80} style={TITLE_STYLE}>
        <div className="t-editorial" data-exact style={{ fontSize: 76 }}>{step.title}</div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={300} delay={200} style={{ width: 1500 }}>
        <div style={{ fontSize: 38, lineHeight: 1.35, color: 'var(--ink-2)' }}>{step.desc}</div>
      </Reveal>
    </>
  );
}

/** Todos los comandos vistos hasta ahora; el actual en tinta plena y los anteriores atenuados. */
export function CliList({ steps, k, show, y = 560, size = 44 }: {
  steps: Step[]; k: number; show: boolean; y?: number; size?: number;
}) {
  return (
    <div style={{ position: 'absolute', left: 150, top: y, opacity: show ? 1 : 0, transition: 'opacity 500ms' }}>
      <Terminal className="sh" prompt="" size={size} lines={steps.map((s, i) => ({ t: s.cmd, on: k >= i, dim: k !== i }))} />
    </div>
  );
}

/* ── Franja del flujo ──────────────────────────────────────────────────── */

/**
 * Los pasos del flujo en una fila al pie. `active` = paso resaltado (-1 ninguno), `all` = todos resaltados,
 * `ghost` = paso al que se asocia un control opcional, con su `ghostLabel` debajo.
 */
export function RouteStrip({ show, steps: items, active, all = false, ghost = -1, ghostLabel = '' }: {
  show: boolean; steps: { label: string; opt?: boolean }[]; active: number; all?: boolean; ghost?: number; ghostLabel?: string;
}) {
  const steps = items.map((i) => i.label);
  return (
    <div style={{ position: 'absolute', left: 150, top: 890, display: 'flex', gap: 28, alignItems: 'flex-start', opacity: show ? 1 : 0, transition: 'opacity 500ms' }}>
      {steps.map((s, i) => {
        const lit = all || i === active;
        const ghosted = i === ghost;
        return (
          <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
            <div style={{ position: 'relative' }}>
              <div className="t-meta" style={{ fontSize: 30, color: lit ? 'var(--ink)' : ghosted ? 'var(--accent)' : 'var(--ink-3)', transition: 'color 400ms' }}>{s}{items[i].opt ? ' (opc.)' : ''}</div>
              <div style={{ height: 4, marginTop: 10, background: lit ? 'var(--accent)' : ghosted ? 'var(--accent)' : 'transparent', opacity: ghosted && !lit ? 0.5 : 1, transition: 'background 400ms, opacity 400ms' }} />
              {ghosted && ghostLabel && (
                <div className="t-meta" style={{ position: 'absolute', left: 0, top: 62, fontSize: 22, whiteSpace: 'nowrap', color: 'var(--accent)' }}>{ghostLabel}</div>
              )}
            </div>
            {i < steps.length - 1 && <div className="t-meta" style={{ fontSize: 30, color: 'var(--ink-3)' }}>›</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ── Cierre del flujo ──────────────────────────────────────────────────── */

export function Summary({ on, out, lead, body, body2 }: {
  on: boolean; out: boolean; lead: string; body: string; body2?: string;
}) {
  return (
    <>
      <Reveal on={on} out={out} x={168} y={240}>
        <div className="t-eyebrow">// {lead}</div>
      </Reveal>
      <Reveal on={on} out={out} x={150} y={330} delay={140} style={{ width: 1540 }}>
        <div className="t-editorial" style={{ fontSize: 66, lineHeight: 1.12 }}>{body}</div>
      </Reveal>
      {body2 && (
        <Reveal on={on} out={out} x={150} y={690} delay={420} style={{ width: 1540 }}>
          <div style={{ fontSize: 40, lineHeight: 1.35, color: 'var(--ink-2)' }}>{body2}</div>
        </Reveal>
      )}
    </>
  );
}

/* ── Qué genera el init ────────────────────────────────────────────────── */

export function Tree({ on, out, title, items, note }: {
  on: boolean; out: boolean; title: string; items: string[]; note: string;
}) {
  const size = Math.min(52, Math.floor(1620 / (Math.max(...items.map((i) => i.length)) * 0.62)));
  return (
    <>
      <Reveal on={on} out={out} x={150} y={130}>
        <div className="t-eyebrow" style={{ fontSize: 26 }}>{title}</div>
      </Reveal>
      {items.map((it, i) => (
        <Reveal key={it} on={on} out={out} x={150} y={250 + i * (size + 40)} delay={120 + i * 110}>
          <div className="tree-line" data-exact style={{ fontSize: size, fontWeight: 600, whiteSpace: 'nowrap' }}>{it}</div>
        </Reveal>
      ))}
      <Reveal on={on} out={out} x={150} y={800} delay={600} style={{ width: 1500 }}>
        <div style={{ fontSize: 38, lineHeight: 1.35, color: 'var(--ink-2)' }}>{note}</div>
      </Reveal>
    </>
  );
}

/** Lista de críticas / límites. */
export function Bullets({ on, out, lead, items, note }: {
  on: boolean; out: boolean; lead: string; items: string[]; note: string;
}) {
  return (
    <>
      <Reveal on={on} out={out} x={168} y={140}>
        <div className="t-eyebrow">// {lead}</div>
      </Reveal>
      {items.map((it, i) => (
        <Reveal key={it} on={on} out={out} x={150} y={230 + i * 165} delay={120 + i * 140} style={{ width: 1600 }}>
          <div className="t-editorial" style={{ fontSize: 46, lineHeight: 1.15 }}>{it}</div>
        </Reveal>
      ))}
      <Reveal on={on} out={out} x={168} y={900} delay={800} style={{ width: 1540 }}>
        <div style={{ fontSize: 32, lineHeight: 1.35, color: 'var(--ink-2)' }}>{note}</div>
      </Reveal>
    </>
  );
}
