import { Scene, useScene } from 'beatdeck';
import { OS } from '../content';
import { Card, RouteStrip, SectionOpen, Summary } from '../parts';

function OpenSpecFlow_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  const n = OS.flow.length; // 5 pasos del flujo en los beats 1..5
  const active = b >= 1 && b <= n ? b - 1 : -1;
  return (
    <>
      {/* 03.1 apertura */}
      <SectionOpen on={at(0)} out={past(0)} kicker={OS.flowKicker} title={OS.flowTitle} note={OS.flowNote} />
      {/* 03.2–03.6 explorar, proponer, aplicar, sincronizar, archivar */}
      {OS.flow.map((s, i) => <Card key={s.cmd} on={at(1 + i)} out={past(1 + i)} step={s} />)}
      {/* 03.7 acción de apoyo */}
      <Card on={at(n + 1)} out={past(n + 1)} step={OS.support} />
      {/* 03.8 orden habitual */}
      <Summary on={at(n + 2)} out={past(n + 2)} lead={OS.flowSummaryLead} body={OS.flowSummary} />
      {/* franja del flujo, del beat 2 al 7 */}
      <RouteStrip show={here && b >= 1 && b <= n + 2} steps={OS.route} active={active} all={b === n + 2} />
    </>
  );
}

/** 03 OPENSPEC · CAMBIO — los comandos /opsx-* en el chat de Copilot. */
export const OpenSpecFlow = () => <Scene index={2}><OpenSpecFlow_ /></Scene>;
