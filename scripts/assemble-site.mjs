// Une las dos charlas y la portada en un solo sitio estático: site/ → /, /openspec/, /spec-kit/
import { cpSync, mkdirSync, rmSync } from 'node:fs';
rmSync('site', { recursive: true, force: true });
mkdirSync('site', { recursive: true });
cpSync('landing/index.html', 'site/index.html');
cpSync('dist-openspec', 'site/openspec', { recursive: true });
cpSync('dist-spec-kit', 'site/spec-kit', { recursive: true });
console.log('site/ listo: index.html, openspec/, spec-kit/');
