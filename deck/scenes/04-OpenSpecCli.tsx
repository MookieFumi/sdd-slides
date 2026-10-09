import { Scene, useScene } from 'beatdeck';
import { OS } from '../content';
import { CliCard, CliList, SectionOpen } from '../parts';

function OpenSpecCli_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      {/* 04.1 apertura */}
      <SectionOpen on={at(0)} out={past(0)} kicker={OS.cliKicker} title={OS.cliTitle} note={OS.cliNote} />
      {/* 04.2–04.7 un comando por beat; la lista se acumula */}
      {OS.cli.map((s, i) => <CliCard key={s.cmd} on={at(1 + i)} out={past(1 + i)} step={s} />)}
      <CliList steps={OS.cli} k={here ? b - 1 : -1} show={here && b >= 1} />
    </>
  );
}

/** 04 OPENSPEC · TERMINAL — consulta rápida de la CLI. */
export const OpenSpecCli = () => <Scene index={3}><OpenSpecCli_ /></Scene>;
