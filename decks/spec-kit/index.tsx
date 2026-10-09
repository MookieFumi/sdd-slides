import { config } from './deck.config';
import { SPECKIT } from './content';
import { buildDeck } from '../_shared/scenes';

export default buildDeck(SPECKIT, config, { guide: 'guia-uso-github-spec-kit-es.html', article: 'webreactiva.com/blog/spec-kit' });
