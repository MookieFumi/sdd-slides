// Concatena las fuentes de texto que usa `verify --source`: guías, datos reales de la CLI y extractos de los artículos.
import { readFileSync, writeFileSync } from 'node:fs';
const parts = ['guias-texto.md', 'datos-reales.md', 'articulos.md', 'propios.md'];
writeFileSync('artifacts/fuentes.md', parts.map((p) => readFileSync(`reference/${p}`, 'utf8')).join('\n\n'));
