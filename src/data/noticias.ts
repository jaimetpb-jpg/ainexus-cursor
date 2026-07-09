import type { NoticiaItem } from './contentTypes';
import { NOTICIAS_SEED } from './noticias.seed';
import rssRaw from './noticias.rss.json';

const rssItems = rssRaw as NoticiaItem[];

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export function getNoticiasSorted(): NoticiaItem[] {
  const seedSlugs = new Set(NOTICIAS_SEED.map((n) => n.slug));
  const merged = [
    ...rssItems.filter((r) => !seedSlugs.has(r.slug)),
    ...NOTICIAS_SEED,
  ];
  return merged.sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoticia(slug: string): NoticiaItem | undefined {
  return getNoticiasSorted().find((n) => n.slug === slug);
}

export function getFeaturedNoticias(): NoticiaItem[] {
  return getNoticiasSorted().filter((n) => n.featured).slice(0, 3);
}

export { slugFromTitle };
