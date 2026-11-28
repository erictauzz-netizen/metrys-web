import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');
const templatePath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] Erro: dist/index.html não encontrado. Execute vite build primeiro.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Identifica o arquivo entry-server gerado no dist-ssr
let entryServerFile = path.resolve(distSsrDir, 'entry-server.js');
if (!fs.existsSync(entryServerFile)) {
  entryServerFile = path.resolve(distSsrDir, 'entry-server.mjs');
}

if (!fs.existsSync(entryServerFile)) {
  console.error('[prerender] Erro: arquivo entry-server não encontrado em dist-ssr.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(entryServerFile).href);

const routesToPrerender = [
  '/',
  '/solucoes/crm-b2b',
  '/solucoes/agentes-ia-whatsapp-voz',
  '/solucoes/automacoes-integracoes-erp',
  '/solucoes/software-sob-medida',
  '/404',
];

console.log('[prerender] Iniciando pré-renderização estática (SSG) de 6 rotas...');

for (const route of routesToPrerender) {
  const { appHtml, meta, schemaJson } = render(route);

  let html = template;

  // Substitui título
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Substitui meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${meta.description}"`
  );

  // Substitui Open Graph
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${meta.title}"`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${meta.description}"`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${meta.canonical}"`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"/i,
    `<meta property="og:image:alt" content="${meta.title}"`
  );

  // Substitui Twitter Card
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
    `<meta name="twitter:title" content="${meta.title}"`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
    `<meta name="twitter:description" content="${meta.description}"`
  );

  // Preload da imagem Hero APENAS na rota Home '/'
  if (route !== '/') {
    html = html.replace(
      /\s*<!--\s*LCP Preload Hero Image\s*-->\s*/i,
      '\n'
    );
    html = html.replace(
      /\s*<link\s+rel="preload"\s+as="image"\s+href="\/images\/hero-systems-integrated\.webp"[^>]*>\s*/i,
      '\n'
    );
  }

  // Tratamento específico para /404 vs rotas indexáveis
  if (route === '/404') {
    // Substitui o meta robots existente por noindex, follow (sem duplicar tags)
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      '<meta name="robots" content="noindex, follow" />'
    );
    // Omite/remove link canonical na página 404
    html = html.replace(
      /\s*<!--\s*Canonical\s*-->\s*/i,
      '\n'
    );
    html = html.replace(
      /\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/i,
      '\n'
    );
  } else {
    // Substitui Canonical autorreferente
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/i,
      `<link rel="canonical" href="${meta.canonical}"`
    );
  }

  // Substitui JSON-LD Schema
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${schemaJson}\n    </script>`
  );

  // Remove preload inline emitido pelo React 19 renderToString (já declarado em <head> na Home)
  const cleanedAppHtml = appHtml.replace(
    /<link\s+rel="preload"\s+as="image"\s+href="\/images\/hero-systems-integrated\.webp"[^>]*\/?>/gi,
    ''
  );

  // Injeta o HTML estático no root
  html = html.replace('<div id="root"></div>', `<div id="root">${cleanedAppHtml}</div>`);

  let targetPath;
  if (route === '/') {
    targetPath = path.resolve(distDir, 'index.html');
  } else if (route === '/404') {
    targetPath = path.resolve(distDir, '404.html');
  } else {
    const routeFolder = path.resolve(distDir, route.replace(/^\//, ''));
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    targetPath = path.resolve(routeFolder, 'index.html');
  }

  fs.writeFileSync(targetPath, html, 'utf-8');
  const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`[prerender] ✓ ${route} -> ${path.relative(rootDir, targetPath)} (${sizeKb} KB)`);
}

// Limpa pasta intermediária dist-ssr
try {
  fs.rmSync(distSsrDir, { recursive: true, force: true });
  console.log('[prerender] ✓ Limpeza de dist-ssr concluída.');
} catch (err) {
  console.warn('[prerender] Aviso ao limpar dist-ssr:', err.message);
}

console.log('[prerender] Pré-renderização SSG concluída com sucesso!');
