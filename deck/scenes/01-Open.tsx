import { Reveal, Scene, useScene } from 'beatdeck';
import { config } from '../deck.config';

function Open_() {
  const { here, b } = useScene();
  const title = here && b === 1;
  return (
    <>
      {/* 01.1 standby: nothing but a quiet mark */}
      <div style={{ position: 'absolute', left: 952, top: 532, width: 16, height: 16, background: 'var(--accent)', opacity: here && b === 0 ? 1 : 0, transition: 'opacity 400ms' }} />

      {/* 01.2 title */}
      {config.subtitle && (
        <Reveal on={title} x={168} y={250}>
          <div className="t-eyebrow">// {config.subtitle}</div>
        </Reveal>
      )}
      <Reveal on={title} x={150} y={320} delay={120} ms={1100}>
        <div className="t-statement" style={{ fontSize: 190 }}>OpenSpec</div>
        <div className="t-statement" style={{ fontSize: 190 }}>y Spec Kit</div>
        <div className="t-statement" style={{ fontSize: 190 }}>en la práctica<span style={{ color: 'var(--accent)' }}>.</span></div>
      </Reveal>
      {config.author && (
        <Reveal on={title} x={168} y={900} delay={400}>
          <div className="t-meta" style={{ fontSize: 22 }}>{config.author} · {config.place} · {config.date}</div>
        </Reveal>
      )}
    </>
  );
}

/** 01 OPEN — standby, then the title. */
export const Open = () => <Scene index={0}><Open_ /></Scene>;
