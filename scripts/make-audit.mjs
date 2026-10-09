// Genera docs/CONTRASTE.md a partir de los datos de las dos charlas (decks/*/content.ts).
import { build } from 'esbuild';
import { writeFileSync, mkdirSync } from 'node:fs';
mkdirSync('artifacts/tmp', { recursive: true });
const load = async (name, exp) => {
  const out = `artifacts/tmp/${name}.mjs`;
  await build({ entryPoints: [`decks/${name}/content.ts`], bundle: true, format: 'esm', outfile: out, logLevel: 'silent' });
  return (await import(`../${out}`))[exp];
};
const talks = [await load('openspec', 'OPENSPEC'), await load('spec-kit', 'SPECKIT')];
const sections = ['req', 'install', 'init', 'chat', 'cli'];
const names = { req: 'Requisitos', install: 'Instalación', init: 'Init del proyecto', chat: 'Flujo en el chat', cli: 'Terminal' };
let md = `# Contraste de contenido\n\nGenerado por \`npm run audit\`. Cada fila: dato mostrado, si es obligatorio u opcional y con qué fuentes coincide.\nFuentes: guía propia (\`reference/\`), artículo de Webreactiva y salida real de la CLI (\`reference/datos-reales.md\`).\n`;
for (const t of talks) {
  md += `\n## ${t.name} ${t.version}\n`;
  for (const k of sections) {
    md += `\n### ${names[k]}\n\n| Paso | Etiqueta | Comando | Contraste | Nota |\n| --- | --- | --- | --- | --- |\n`;
    for (const s of t[k].steps) md += `| ${s.title} | ${s.tag || 'obligatorio'} | ${s.cmd ? '`' + s.cmd.replace(/\|/g, '\\|') + '`' : '—'} | ${s.check} | ${s.note ?? ''} |\n`;
  }
  md += `\n### Qué genera el init\n\n` + t.generated.groups.map((g) => `- **${g.title}**: ${g.items.map((i) => '`' + i + '`').join(', ')}`).join('\n') + '\n';
  md += `\n### Dónde duele (artículo)\n\n` + t.limits.items.map((i) => `- ${i}`).join('\n') + '\n';
}
writeFileSync('docs/CONTRASTE.md', md);
console.log('docs/CONTRASTE.md');
