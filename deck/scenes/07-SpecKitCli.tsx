import { Scene, useScene } from 'beatdeck';
import { SK } from '../content';
import { CliCard, CliList, SectionOpen } from '../parts';

function SpecKitCli_() {
  const { here, b } = useScene();
  const at = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      {/* 07.1 apertura */}
      <SectionOpen on={at(0)} out={past(0)} kicker={SK.cliKicker} title={SK.cliTitle} note={SK.cliNote} />
      {/* 07.2–07.4 un comando por beat; la lista se acumula */}
      {SK.cli.map((s, i) => <CliCard key={s.cmd} on={at(1 + i)} out={past(1 + i)} step={s} />)}
      <CliList steps={SK.cli} k={here ? b - 1 : -1} show={here && b >= 1} y={600} size={56} />
    </>
  );
}

/** 07 SPEC KIT · TERMINAL — consulta rápida de la CLI. */
export const SpecKitCli = () => <Scene index={6}><SpecKitCli_ /></Scene>;
