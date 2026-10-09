// Une las dos charlas y la portada en un solo sitio estático: site/ → /, /openspec/, /spec-kit/
// Inyecta Cloudflare Web Analytics (sin cookies) solo en este paso: las compilaciones de cada charla
// (dist-*) siguen siendo 100 % offline, y por eso `check-offline` y `verify` no ven el script.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const { cloudflareWebAnalyticsToken: token } = JSON.parse(readFileSync('analytics.config.json', 'utf8'));

rmSync('site', { recursive: true, force: true });
mkdirSync('site', { recursive: true });
cpSync('landing/index.html', 'site/index.html');
cpSync('dist-openspec', 'site/openspec', { recursive: true });
cpSync('dist-spec-kit', 'site/spec-kit', { recursive: true });

const beacon = token
  ? `<!-- Cloudflare Web Analytics -->\n<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${token}"}'></script>\n<!-- End Cloudflare Web Analytics -->\n`
  : '';
for (const page of ['site/index.html', 'site/openspec/index.html', 'site/spec-kit/index.html']) {
  const html = readFileSync(page, 'utf8');
  if (!html.includes('</body>')) throw new Error(`${page}: no tiene </body>`);
  writeFileSync(page, html.replace('</body>', `${beacon}</body>`));
}
console.log(`site/ listo: index.html, openspec/, spec-kit/${token ? ' (con Cloudflare Web Analytics)' : ''}`);
