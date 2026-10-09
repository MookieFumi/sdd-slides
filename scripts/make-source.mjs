// Concatena las fuentes de texto que usa `verify --source`: guías, datos reales de la CLI y extractos de los artículos.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
mkdirSync('artifacts', { recursive: true });
const parts = ['guias-texto.md', 'datos-reales.md', 'articulos.md', 'propios.md'];
writeFileSync('artifacts/fuentes.md', parts.map((p) => readFileSync(`reference/${p}`, 'utf8')).join('\n\n'));
