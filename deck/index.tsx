import { defineDeck } from 'beatdeck';
import '../themes/neutral.css';
import './deck.css';
import { config } from './deck.config';
import { SCENES } from './scenes';
import { Open } from './scenes/01-Open';
import { OpenSpec } from './scenes/02-OpenSpec';
import { OpenSpecFlow } from './scenes/03-OpenSpecFlow';
import { OpenSpecCli } from './scenes/04-OpenSpecCli';
import { SpecKit } from './scenes/05-SpecKit';
import { SpecKitFlow } from './scenes/06-SpecKitFlow';
import { SpecKitCli } from './scenes/07-SpecKitCli';
import { End } from './scenes/08-End';

/** Every layer of the stage, back to front. All stay mounted; each shows itself for its own scene. */
function Stage() {
  return (
    <>
      <Open />
      <OpenSpec />
      <OpenSpecFlow />
      <OpenSpecCli />
      <SpecKit />
      <SpecKitFlow />
      <SpecKitCli />
      <End />
    </>
  );
}

export default defineDeck({
  id: 'openspec-y-spec-kit-en-la-practica',
  title: config.title,
  lang: 'es',
  scenes: SCENES,
  Stage,
  fonts: ['400 100px "Inter Variable"', '600 100px "Inter Variable"', '400 32px "JetBrains Mono Variable"'],
  qrUrl: config.qrUrl,
});
