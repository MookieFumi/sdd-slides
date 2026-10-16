import { Reveal, Scene, defineDeck, useScene } from 'beatdeck';
import type { BeatDef, SceneDef } from 'beatdeck';
import '../../themes/mookie.css';
import './deck.css';
import { BlockIntro, CodeBlock, Card, CliCard, CliList, RouteList, RouteStrip, SectionOpen, Split, Summary, Tree } from './parts';
import type { Step, TalkData } from './types';

export interface DeckConfig {
  title: string; subtitle: string; author: string; place: string; date: string; qrUrl: string; qrLabel: string;
}

/** Los once apartados, en este orden, son idénticos en las dos charlas. */
export function buildDeck(d: TalkData, config: DeckConfig, sources: { guide: string; article: string }) {
  const where = (s: Step) =>
    s.surface.includes('COPILOT') ? 'Se escribe en el chat de GitHub Copilot (VS Code), no en la terminal.' : 'Se ejecuta en la terminal.';
  const stepBeat = (ref: string, s: Step): BeatDef => ({
    name: s.cmd || s.title, ref: `${ref} · ${s.index}`, source: `${s.title}. ${s.desc} [contraste: ${s.check}]`,
    note: [where(s), s.tag === 'OPCIONAL' ? 'PASO OPCIONAL.' : '', s.note ?? ''].filter(Boolean).join(' '),
  });
  const sect = (ref: string, c: { title: string; note: string }, cue?: string): BeatDef => ({
    name: c.title.toLowerCase(), ref, source: c.note, note: cue,
  });

  function Portada() {
    const { here, b } = useScene();
    const title = here && b === 1;
    return (
      <>
        <div className="mk-brand" style={{ position: 'absolute', left: 760, top: 500, fontSize: 96, opacity: here && b === 0 ? 1 : 0, transition: 'opacity 400ms' }}><span className="mk-path">~/</span>mookie<span className="mk-cursor" /></div>
        <Reveal on={title} x={168} y={250}><div className="t-eyebrow">// {config.subtitle}</div></Reveal>
        <Reveal on={title} x={150} y={320} delay={120} ms={1100}>
          <div className="t-statement" style={{ fontSize: 240 }}>{d.name}</div>
          <div className="t-statement" style={{ fontSize: 150 }}>en la práctica<span style={{ color: 'var(--accent)' }}>.</span></div>
        </Reveal>
        <Reveal on={title} x={168} y={900} delay={400}>
          <div className="t-meta" style={{ fontSize: 22 }}>{config.author} · {config.place} · {config.date}</div>
        </Reveal>
        <Reveal on={title} x={168} y={170} delay={300}>
          <div className="mk-prompt" style={{ fontSize: 30 }}><span className="u">mookie</span><span className="s">@</span><span className="h">dev</span><span className="s">:</span><span className="p">~</span><span className="s">$</span> cat {d.id}.md</div>
        </Reveal>
      </>
    );
  }

  function Flujo() {
    const { here, b } = useScene();
    return (
      <>
        <BlockIntro on={here && b === 0} out={here && b > 0} eyebrow={d.eyebrow} lines={[d.name, 'en la práctica.']} lead={d.lead} tag={d.version} />
        <RouteList on={here && b === 1} out={here && b > 1} title={d.routeTitle} steps={d.route} note={d.routeNote} />
      </>
    );
  }

  /** Apartado de cartas: apertura + un paso por beat. */
  const cards = (c: { kicker: string; title: string; note: string; steps: Step[] }) => {
    function S() {
      const { here, b } = useScene();
      return (
        <>
          <SectionOpen on={here && b === 0} out={here && b > 0} kicker={c.kicker} title={c.title} note={c.note} />
          {c.steps.map((s, i) => <Card key={s.title} on={here && b === i + 1} out={here && b > i + 1} step={s} />)}
        </>
      );
    }
    return S;
  };

  function Prep() {
    const { here, b } = useScene();
    const p = d.prep!;
    return (
      <>
        <SectionOpen on={here && b === 0} out={here && b > 0} kicker={p.kicker} title={p.title} note={p.note} />
        <CodeBlock on={here && b === 1} out={here && b > 1} title={p.template.title} lines={p.template.lines} note={p.template.note} />
        <Split on={here && b === 2} out={here && b > 2} deduce={p.split.deduce} only={p.split.only} target={p.split.target} note={p.split.note} />
        <CodeBlock on={here && b === 3} out={here && b > 3} title={p.example.title} lines={p.example.lines} note={p.example.note} />
      </>
    );
  }

  function Genera() {
    const { here, b } = useScene();
    const g = d.generated;
    return (
      <>
        <SectionOpen on={here && b === 0} out={here && b > 0} kicker={g.kicker} title={g.title} note={g.note} />
        {g.groups.map((x, i) => <Tree key={x.title} on={here && b === i + 1} out={here && b > i + 1} title={x.title} items={x.items} note={x.note} />)}
        {g.split && <Split on={here && b === g.groups.length + 1} out={false} deduce={g.split.deduce} only={g.split.only} target={g.split.target} note={g.split.note} />}
      </>
    );
  }

  function Chat() {
    const { here, b } = useScene();
    const c = d.chat;
    const n = c.steps.length;
    const cur = b >= 1 && b <= n ? c.steps[b - 1] : undefined;
    const opt = cur?.tag === 'OPCIONAL';
    const ownSlot = cur && cur.strip !== undefined && !(opt && !d.route[cur.strip].opt);
    return (
      <>
        <SectionOpen on={here && b === 0} out={here && b > 0} kicker={c.kicker} title={c.title} note={c.note} />
        {c.steps.map((s, i) => <Card key={s.title} on={here && b === i + 1} out={here && b > i + 1} step={s} />)}
        <Summary on={here && b === n + 1} out={here && b > n + 1} lead={c.summaryLead} body={c.summary} />
        <RouteStrip
          show={here && b >= 1 && b <= n + 1} steps={d.route}
          active={cur && ownSlot ? cur.strip! : -1} all={b === n + 1}
          ghost={cur && !ownSlot && cur.strip !== undefined ? cur.strip : -1} ghostLabel={cur?.cmd ?? ''}
        />
      </>
    );
  }

  function Terminal_() {
    const { here, b } = useScene();
    const c = d.cli;
    const k = b - 1;
    return (
      <>
        <SectionOpen on={here && b === 0} out={here && b > 0} kicker={c.kicker} title={c.title} note={c.note} />
        {c.steps.map((s, i) => <CliCard key={s.cmd} on={here && b === i + 1} out={here && b > i + 1} step={s} />)}
        <CliList steps={c.steps} k={k} show={here && b >= 1} y={c.steps.length > 5 ? 520 : 580} size={c.steps.length > 5 ? 40 : 44} />
      </>
    );
  }

  const prepBeats: BeatDef[] = d.prep ? [
    sect('prepara el terreno', d.prep, 'Apartado opcional: recomendaciones previas al init.'),
    { name: 'lo que deja el init', ref: 'plantilla real del init', source: d.prep.template.lines.join(' '), note: d.prep.template.note },
    { name: 'qué va y qué no', ref: 'plantilla real del init', source: `${d.prep.split.deduce.join('. ')}. ${d.prep.split.only.join('. ')}.`, note: d.prep.split.note },
    { name: 'ejemplo', ref: 'propio', source: d.prep.example.lines.join(' '), note: d.prep.example.note },
  ] : [];
  const splitBeats: BeatDef[] = d.generated.split ? [
    { name: 'qué va y qué no', ref: 'plantilla real del init', source: `${d.generated.split.deduce.join('. ')}. ${d.generated.split.only.join('. ')}.`, note: d.generated.split.note },
  ] : [];

  /** Escenas en orden; el índice de cada una sale de su posición. */
  const ORDER: { title: string; beats: BeatDef[]; Body: () => JSX.Element }[] = [
    { title: 'PORTADA', beats: [{ name: 'standby', note: 'Pantalla en calma mientras la gente se sienta. El primer clic empieza la charla.' }, { name: 'title' }], Body: Portada },
    { title: 'EL FLUJO', beats: [
      { name: 'portada', ref: `${sources.guide} · hero`, source: `${d.name} ${d.lead}` },
      { name: 'flujo', ref: `${sources.guide} + ${sources.article} · flujo`, source: `${d.route.map((r) => r.label).join(' > ')}. ${d.routeNote}` },
    ], Body: Flujo },
    { title: 'REQUISITOS', beats: [sect('requisitos', d.req), ...d.req.steps.map((s) => stepBeat('requisitos', s))], Body: cards(d.req) },
    { title: 'INSTALACIÓN', beats: [sect('instalación', d.install), ...d.install.steps.map((s) => stepBeat('instalación', s))], Body: cards(d.install) },
    ...(d.prep ? [{ title: 'PREPARA EL TERRENO', beats: prepBeats, Body: Prep }] : []),
    { title: 'INIT DEL PROYECTO', beats: [sect('init', d.init), ...d.init.steps.map((s) => stepBeat('init', s))], Body: cards(d.init) },
    { title: 'QUÉ GENERA EL INIT', beats: [sect('init real', d.generated), ...d.generated.groups.map((g) => ({ name: g.title.toLowerCase(), ref: 'salida real del init', source: g.items.join(' '), note: g.note })), ...splitBeats], Body: Genera },
    { title: 'FLUJO EN EL CHAT', beats: [sect('chat', d.chat), ...d.chat.steps.map((s) => stepBeat('chat', s)), { name: 'resumen', source: `${d.chat.summaryLead} ${d.chat.summary}` }], Body: Chat },
    { title: 'TERMINAL', beats: [sect('terminal', d.cli), ...d.cli.steps.map((s) => stepBeat('terminal', s))], Body: Terminal_ },
  ];
  const SCENES: SceneDef[] = ORDER.map((o, i) => ({ id: String(i + 1).padStart(2, '0'), title: o.title, beats: o.beats }));

  function Stage() {
    return (
      <>
        <div className="mk-brand" aria-hidden="true" style={{ position: 'absolute', right: 72, bottom: 44, fontSize: 24, color: 'var(--ink-3)' }}><span className="mk-path">~/</span>mookie</div>
        <Scene index={0}><Portada /></Scene>
        <Scene index={1}><Flujo /></Scene>
        {ORDER.map((o, i) => <Scene key={o.title} index={i}><o.Body /></Scene>)}
      </>
    );
  }

  return defineDeck({
    id: d.id, title: config.title, lang: 'es', scenes: SCENES, Stage,
    fonts: ['400 100px "Geist Variable"', '700 100px "Geist Variable"', '400 32px "Geist Mono Variable"', '700 32px "Geist Mono Variable"'],
    qrUrl: config.qrUrl,
  });
}
