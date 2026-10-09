import { config } from './deck.config';
import { OPENSPEC } from './content';
import { buildDeck } from '../_shared/scenes';

export default buildDeck(OPENSPEC, config, { guide: 'guia-uso-open-spec-es.html', article: 'webreactiva.com/blog/openspec' });
