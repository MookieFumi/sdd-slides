import { Scene, useScene } from 'beatdeck';
import { OS } from '../content';
import { BlockIntro, Card, RouteList, SectionOpen } from '../parts';

function OpenSpec_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      {/* 02.1 portada del bloque */}
      <BlockIntro on={at(0)} out={past(0)} eyebrow={OS.eyebrow} lines={['OpenSpec', 'en la práctica.']} lead={OS.lead} />
      {/* 02.2 flujo típico */}
      <RouteList on={at(1)} out={past(1)} title={OS.routeTitle} steps={OS.route} note={OS.routeNote} />
      {/* 02.3 preparar */}
      <SectionOpen on={at(2)} out={past(2)} kicker={OS.prepKicker} title={OS.prepTitle} note={OS.prepNote} />
      {/* 02.4–02.5 instalar e inicializar */}
      {OS.prep.map((s, i) => <Card key={s.cmd} on={at(3 + i)} out={past(3 + i)} step={s} />)}
    </>
  );
}

/** 02 OPENSPEC — portada, flujo, preparar el entorno. */
export const OpenSpec = () => <Scene index={1}><OpenSpec_ /></Scene>;
