import { QR, Reveal, Scene, defineDeck, qrConfigured, useScene } from 'beatdeck';
import type { BeatDef, SceneDef } from 'beatdeck';
import '../../themes/neutral.css';
import './deck.css';
import { AgentFlow, BlockIntro, Bullets, CodeBlock, Card, CliCard, CliList, RouteList, RouteStrip, SectionOpen, Split, Summary, Tree } from './parts';
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

  const SCENES: SceneDef[] = [
    { id: '01', title: 'PORTADA', beats: [{ name: 'standby', note: 'Pantalla en calma mientras la gente se sienta. El primer clic empieza la charla.' }, { name: 'title' }] },
    { id: '02', title: 'EL FLUJO', beats: [
      { name: 'portada', ref: `${sources.guide} · hero`, source: `${d.name} ${d.lead}` },
      { name: 'flujo', ref: `${sources.guide} + ${sources.article} · flujo`, source: `${d.route.map((r) => r.label).join(' > ')}. ${d.routeNote}` },
    ] },
    { id: '03', title: 'REQUISITOS', beats: [sect('requisitos', d.req), ...d.req.steps.map((s) => stepBeat('requisitos', s))] },
    { id: '04', title: 'INSTALACIÓN', beats: [sect('instalación', d.install), ...d.install.steps.map((s) => stepBeat('instalación', s))] },
    { id: '05', title: 'PREPARA EL TERRENO', beats: [
      sect('prepara el terreno', d.prep, 'Apartado opcional: recomendaciones previas al init.'),
      { name: 'lo que deja el init', ref: 'plantilla real del init', source: d.prep.template.lines.join(' '), note: d.prep.template.note },
      { name: 'qué va y qué no', ref: 'plantilla real del init', source: `${d.prep.split.deduce.join('. ')}. ${d.prep.split.only.join('. ')}.`, note: d.prep.split.note },
      { name: 'agente de gobierno', ref: 'propio', source: d.prep.agent.steps.map((x) => `${x.label}: ${x.desc}`).join(' '), note: d.prep.agent.footer },
      { name: 'ejemplo', ref: 'propio', source: d.prep.example.lines.join(' '), note: d.prep.example.note },
    ] },
    { id: '06', title: 'INIT DEL PROYECTO', beats: [sect('init', d.init), ...d.init.steps.map((s) => stepBeat('init', s))] },
    { id: '07', title: 'QUÉ GENERA EL INIT', beats: [sect('init real', d.generated), ...d.generated.groups.map((g) => ({ name: g.title.toLowerCase(), ref: 'salida real del init', source: g.items.join(' '), note: g.note }))] },
    { id: '08', title: 'FLUJO EN EL CHAT', beats: [sect('chat', d.chat), ...d.chat.steps.map((s) => stepBeat('chat', s)), { name: 'resumen', source: `${d.chat.summaryLead} ${d.chat.summary}` }] },
    { id: '09', title: 'TERMINAL', beats: [sect('terminal', d.cli), ...d.cli.steps.map((s) => stepBeat('terminal', s))] },
    { id: '10', title: 'CUÁNDO NO', beats: [{ name: d.limits.title.toLowerCase(), ref: `${sources.article} · críticas`, source: d.limits.items.join(' '), note: d.limits.note }] },
    { id: '11', title: 'PREGUNTAS', beats: [{ name: 'preguntas' }] },
  ];

  function Portada() {
    const { here, b } = useScene();
    const title = here && b === 1;
    return (
      <>
        <div style={{ position: 'absolute', left: 952, top: 532, width: 16, height: 16, background: 'var(--accent)', opacity: here && b === 0 ? 1 : 0, transition: 'opacity 400ms' }} />
        <Reveal on={title} x={168} y={250}><div className="t-eyebrow">// {config.subtitle}</div></Reveal>
        <Reveal on={title} x={150} y={320} delay={120} ms={1100}>
          <div className="t-statement" style={{ fontSize: 240 }}>{d.name}</div>
          <div className="t-statement" style={{ fontSize: 150 }}>en la práctica<span style={{ color: 'var(--accent)' }}>.</span></div>
        </Reveal>
        <Reveal on={title} x={168} y={900} delay={400}>
          <div className="t-meta" style={{ fontSize: 22 }}>{config.author} · {config.place} · {config.date}</div>
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
  const cards = (c: { kicker: string; title: string; note: string; steps: Step[] }, index: number) => {
    function S() {
      const { here, b } = useScene();
      return (
        <>
          <SectionOpen on={here && b === 0} out={here && b > 0} kicker={c.kicker} title={c.title} note={c.note} />
          {c.steps.map((s, i) => <Card key={s.title} on={here && b === i + 1} out={here && b > i + 1} step={s} />)}
        </>
      );
    }
    return () => <Scene index={index}><S /></Scene>;
  };

  function Prep() {
    const { here, b } = useScene();
    const p = d.prep;
    return (
      <>
        <SectionOpen on={here && b === 0} out={here && b > 0} kicker={p.kicker} title={p.title} note={p.note} />
        <CodeBlock on={here && b === 1} out={here && b > 1} title={p.template.title} lines={p.template.lines} note={p.template.note} />
        <Split on={here && b === 2} out={here && b > 2} deduce={p.split.deduce} only={p.split.only} target={p.split.target} note={p.split.note} />
        <AgentFlow on={here && b === 3} out={here && b > 3} title={p.agent.title} steps={p.agent.steps} footer={p.agent.footer} />
        <CodeBlock on={here && b === 4} out={here && b > 4} title={p.example.title} lines={p.example.lines} note={p.example.note} />
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

  function Limites() {
    const { here } = useScene();
    const l = d.limits;
    return <Bullets on={here} out={false} lead={l.title} items={l.items} note={l.note} />;
  }

  function Fin() {
    const { here } = useScene();
    const qr = qrConfigured(config.qrUrl);
    return (
      <>
        <Reveal on={here} x={160} y={380}>
          <div className="t-statement" style={{ fontSize: 220 }}>¿Preguntas<span style={{ color: 'var(--accent)' }}>?</span></div>
        </Reveal>
        <Reveal on={here} x={170} y={680} delay={200}><div className="t-meta" style={{ fontSize: 24 }}>{config.author}</div></Reveal>
        {qr && <Reveal on={here} x={1440} y={330} delay={300}><QR url={config.qrUrl} size={320} /></Reveal>}
      </>
    );
  }

  const Req = cards(d.req, 2);
  const Inst = cards(d.install, 3);
  const Init = cards(d.init, 5);

  function Stage() {
    return (
      <>
        <Scene index={0}><Portada /></Scene>
        <Scene index={1}><Flujo /></Scene>
        <Req /><Inst />
        <Scene index={4}><Prep /></Scene>
        <Init />
        <Scene index={6}><Genera /></Scene>
        <Scene index={7}><Chat /></Scene>
        <Scene index={8}><Terminal_ /></Scene>
        <Scene index={9}><Limites /></Scene>
        <Scene index={10}><Fin /></Scene>
      </>
    );
  }

  return defineDeck({
    id: d.id, title: config.title, lang: 'es', scenes: SCENES, Stage,
    fonts: ['400 100px "Inter Variable"', '600 100px "Inter Variable"', '400 32px "JetBrains Mono Variable"'],
    qrUrl: config.qrUrl,
  });
}
