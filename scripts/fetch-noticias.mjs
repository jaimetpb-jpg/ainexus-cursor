import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'src/data/noticias.rss.json');
const manifestPath = join(root, 'src/data/content-routes.json');

const FEEDS = [
  { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', category: 'innovacion' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss/', category: 'innovacion' },
  { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: 'innovacion' },
];

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseRssXml(xml, sourceName, category) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) && items.length < 5) {
    const block = match[1];
    const title = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim();
    const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim();
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim();
    const desc = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)?.[1]?.trim();
    if (!title || !link) continue;
    const excerpt = stripHtml(desc || title).slice(0, 200);
    const date = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
    const slug = `rss-${slugify(title)}`;
    items.push({
      slug,
      title: stripHtml(title).slice(0, 120),
      excerpt,
      body: [
        { type: 'p', text: excerpt },
        { type: 'p', text: `Fuente original: ${sourceName}. Lee el artículo completo en el enlace externo.` },
      ],
      date,
      category,
      tags: ['RSS', sourceName, 'IA'],
      image: '/images/hero-control-tower.webp',
      readMin: 3,
      source: sourceName,
      sourceUrl: link,
      external: true,
    });
  }
  return items;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'AINexusBot/1.0 (+https://ainexus.com.mx)' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssXml(xml, feed.name, feed.category);
  } catch (e) {
    console.warn(`  ⚠ RSS ${feed.name}:`, e.message);
    return [];
  }
}

const ARTICULO_SLUGS = [
  { slug: 'whatsapp-logistica-respuesta-inmediata', title: 'Cómo un agente de WhatsApp aceleró la respuesta en logística', description: 'Caso de logística con agente NexusChat y respuesta 24/7.' },
  { slug: 'cobranza-ia-finanzas-seguimiento', title: 'Automatización de cobranza con IA', description: 'Seguimiento inteligente de cartera sin presionar al cliente.' },
  { slug: 'dashboard-manufactura-tiempo-real', title: 'Dashboard en tiempo real en manufactura', description: 'De Excel semanal a torre de control operativa.' },
  { slug: 'ia-salud-citas-triage', title: 'IA en salud: triage de citas', description: 'Recepción sin saturación con agente de citas.' },
  { slug: 'inmobiliaria-leads-calificados', title: 'Inmobiliaria: leads calificados', description: 'De portales fríos a visitas con intención real.' },
  { slug: 'construccion-inspecciones-ia', title: 'Construcción: inspecciones con IA', description: 'Calidad y EPP documentados en tiempo real.' },
  { slug: 'retail-inventario-automatizado', title: 'Retail: inventario omnicanal', description: 'Sincronización tienda y e-commerce.' },
  { slug: 'agro-riego-datos-clima', title: 'Agro: riego con datos de clima', description: 'Alertas para técnicos de campo.' },
];

const SEED_META = [
  { slug: 'agentes-voz-ia-empresas-2026', title: 'Agentes de voz con IA 2026', description: 'La nueva frontera del servicio 24/7 para empresas en México.' },
  { slug: 'automatizacion-n8n-erp-sin-codigo', title: 'Automatización n8n sin código', description: 'Conecta ERP, WhatsApp y hojas de cálculo.' },
  { slug: 'copilotos-ventas-whatsapp-ia', title: 'Copilotos de ventas en WhatsApp', description: 'Del chat manual al pipeline automático.' },
  { slug: 'ia-manufactura-datos-tiempo-real', title: 'IA en manufactura', description: 'Señales en tiempo real para plantas.' },
  { slug: 'regulacion-ia-latam-empresas', title: 'Regulación IA en LATAM', description: 'Qué preparar tu empresa en 2026.' },
  { slug: 'multimodal-ia-atencion-cliente', title: 'IA multimodal en atención', description: 'Texto, voz e imágenes en un flujo.' },
  { slug: 'agentes-ia-logistica-rutas', title: 'Agentes IA en logística', description: 'Alertas de ruta y combustible.' },
  { slug: 'futuro-trabajo-ia-colaborativa', title: 'Humanos + agentes IA', description: 'El futuro del trabajo colaborativo.' },
];

async function main() {
  console.log('Fetching RSS feeds…');
  const all = [];
  for (const feed of FEEDS) {
    const items = await fetchFeed(feed);
    console.log(`  ✓ ${feed.name}: ${items.length} items`);
    all.push(...items);
  }
  const seen = new Set();
  const unique = all.filter((i) => {
    if (seen.has(i.slug)) return false;
    seen.add(i.slug);
    return true;
  });
  unique.sort((a, b) => b.date.localeCompare(a.date));
  writeFileSync(outPath, JSON.stringify(unique.slice(0, 12), null, 2));
  console.log(`✓ ${unique.length} RSS items → noticias.rss.json`);

  const noticiasRoutes = [
    { path: '/noticias', title: 'Noticias de IA y automatización | AI Nexus', description: 'Últimas noticias sobre agentes de IA, automatización empresarial e innovación tecnológica en México.' },
    ...SEED_META.map((s) => ({
      path: `/noticias/${s.slug}`,
      title: `${s.title} | Noticias AI Nexus`,
      description: s.description,
    })),
    ...unique.slice(0, 12).map((n) => ({
      path: `/noticias/${n.slug}`,
      title: `${n.title} | Noticias AI Nexus`,
      description: n.excerpt.slice(0, 155),
    })),
  ];

  const articulosRoutes = [
    { path: '/articulos', title: 'Artículos: IA en empresas | AI Nexus', description: 'Casos reales de cómo la inteligencia artificial ayudó a empresas en México: logística, finanzas, salud y más.' },
    ...ARTICULO_SLUGS.map((a) => ({
      path: `/articulos/${a.slug}`,
      title: `${a.title} | Artículos AI Nexus`,
      description: a.description,
    })),
  ];

  writeFileSync(
    manifestPath,
    JSON.stringify({ noticias: noticiasRoutes, articulos: articulosRoutes }, null, 2)
  );
  console.log('✓ content-routes.json written');
}

main().catch((e) => {
  console.warn('RSS fetch failed, using seed only:', e.message);
  writeFileSync(outPath, '[]');
  writeFileSync(
    manifestPath,
    JSON.stringify({
      noticias: [{ path: '/noticias', title: 'Noticias | AI Nexus', description: 'Noticias de IA.' }, ...SEED_META.map((s) => ({ path: `/noticias/${s.slug}`, title: s.title, description: s.description }))],
      articulos: [{ path: '/articulos', title: 'Artículos | AI Nexus', description: 'Casos de IA.' }, ...ARTICULO_SLUGS.map((a) => ({ path: `/articulos/${a.slug}`, title: a.title, description: a.description }))],
    }, null, 2)
  );
});
