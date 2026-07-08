import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const SITE_URL = 'https://ainexus.com.mx';

const routes = [
  {
    path: '/',
    title: 'AI Nexus — Automatiza tu empresa con IA | Agentes y automatizaciones',
    description:
      'Creamos agentes de IA, automatizaciones y dashboards que conectan tus ventas, operación y atención al cliente. Vende más, responde 24/7 y reduce tareas manuales.',
  },
  {
    path: '/servicios',
    title: 'Servicios de IA para empresas | AI Nexus',
    description:
      'Agentes de WhatsApp, voz, automatizaciones, dashboards y sistemas de IA a la medida. Sin cambiar las herramientas que ya usas.',
  },
  {
    path: '/sectores',
    title: 'Sectores e industrias — IA aplicada | AI Nexus',
    description:
      'Soluciones de IA para minería, automotriz, agropecuario, logística, inmobiliario, educativo, legal y corporativo.',
  },
];

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');

function fixAssetPaths(html, depth) {
  if (depth === 0) return html;
  const prefix = '../'.repeat(depth);
  return html
    .replaceAll('./assets/', `${prefix}assets/`)
    .replaceAll('href="./favicon.svg"', `href="${prefix}favicon.svg"`);
}

function injectMeta(html, route) {
  const url = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`;
  let out = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="description" content="${route.description}" />`
  );

  if (out.includes('property="og:title"')) {
    out = out.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${route.title}" />`
    );
  } else {
    out = out.replace('</head>', `  <meta property="og:title" content="${route.title}" />\n  </head>`);
  }

  if (out.includes('property="og:description"')) {
    out = out.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${route.description}" />`
    );
  } else {
    out = out.replace('</head>', `  <meta property="og:description" content="${route.description}" />\n  </head>`);
  }

  if (out.includes('rel="canonical"')) {
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  } else {
    out = out.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  }

  if (!out.includes('property="og:url"')) {
    out = out.replace('</head>', `  <meta property="og:url" content="${url}" />\n  </head>`);
  } else {
    out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  }

  return out;
}

for (const route of routes) {
  if (route.path === '/') continue;
  const depth = route.path.split('/').filter(Boolean).length;
  const dir = join(dist, ...route.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  const html = fixAssetPaths(injectMeta(indexHtml, route), depth);
  writeFileSync(join(dir, 'index.html'), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.path === '/' ? SITE_URL : `${SITE_URL}${r.path}`}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

const robotsSrc = join(__dirname, '..', 'public', 'robots.txt');
if (existsSync(robotsSrc)) {
  copyFileSync(robotsSrc, join(dist, 'robots.txt'));
}

console.log('✓ Prerender HTML for /servicios and /sectores');
console.log('✓ sitemap.xml and robots.txt written to dist/');
