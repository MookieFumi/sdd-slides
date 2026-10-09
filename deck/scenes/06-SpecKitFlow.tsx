import { Scene, useScene } from 'beatdeck';
import { SK } from '../content';
import { Card, RouteStrip, SectionOpen, Summary } from '../parts';

function SpecKitFlow_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  const n = SK.flow.length;     // 6 skills: constitución (beat 1) + 5 pasos (beats 2..6)
  const m = SK.optional.length; // 3 controles opcionales (beats 7..9)
  const active = b >= 2 && b <= n ? b - 2 : -1;
  const opt = b > n && b <= n + m ? b - n - 1 : -1;
  return (
    <>
      {/* 06.1 apertura */}
      <SectionOpen on={at(0)} out={past(0)} kicker={SK.flowKicker} title={SK.flowTitle} note={SK.flowNote} />
      {/* 06.2–06.7 constitución, especificar, planificar, desglosar, implementar, converger */}
      {SK.flow.map((s, i) => <Card key={s.cmd} on={at(1 + i)} out={past(1 + i)} step={s} />)}
      {/* 06.8–06.10 controles opcionales */}
      {SK.optional.map((s, i) => <Card key={s.cmd} on={at(n + 1 + i)} out={past(n + 1 + i)} step={s} />)}
      {/* 06.11 ruta breve */}
      <Summary on={at(n + m + 1)} out={past(n + m + 1)} lead={SK.flowSummaryLead} body={SK.flowSummary} body2={SK.flowSummary2} />
      {/* franja del flujo, del beat 2 al 11 */}
      <RouteStrip
        show={here && b >= 1 && b <= n + m + 1} steps={SK.route} active={active} all={b === n + m + 1}
        ghost={opt >= 0 ? SK.optionalAfterIndex[opt] : -1} ghostLabel={opt >= 0 ? SK.optionalAfter[opt] : ''}
      />
    </>
  );
}

/** 06 SPEC KIT · FLUJO — los skills /speckit-* en Copilot Chat. */
export const SpecKitFlow = () => <Scene index={5}><SpecKitFlow_ /></Scene>;
