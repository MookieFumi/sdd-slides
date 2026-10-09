import { Scene, useScene } from 'beatdeck';
import { SK } from '../content';
import { BlockIntro, Card, RouteList, SectionOpen } from '../parts';

function SpecKit_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      {/* 05.1 portada del bloque */}
      <BlockIntro on={at(0)} out={past(0)} eyebrow={SK.eyebrow} lines={['Spec Kit', 'en la práctica.']} lead={SK.lead} tag={SK.version} />
      {/* 05.2 flujo SDD */}
      <RouteList on={at(1)} out={past(1)} title={SK.routeTitle} steps={SK.route} note={SK.routeNote} />
      {/* 05.3 preparar */}
      <SectionOpen on={at(2)} out={past(2)} kicker={SK.prepKicker} title={SK.prepTitle} note={SK.prepNote} />
      {/* 05.4–05.6 requisitos, CLI, proyecto */}
      {SK.prep.map((s, i) => <Card key={s.cmd} on={at(3 + i)} out={past(3 + i)} step={s} />)}
    </>
  );
}

/** 05 SPEC KIT — portada, flujo SDD, preparar el entorno. */
export const SpecKit = () => <Scene index={4}><SpecKit_ /></Scene>;
