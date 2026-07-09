export type ContentCategory = 'agentes' | 'automatizacion' | 'innovacion' | 'empresas' | 'casos';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] };

export type NoticiaItem = {
  slug: string;
  title: string;
  excerpt: string;
  body: ContentBlock[];
  date: string;
  category: ContentCategory;
  tags: string[];
  image: string;
  readMin: number;
  featured?: boolean;
  source?: string;
  sourceUrl?: string;
  external?: boolean;
};

export type ArticuloItem = {
  slug: string;
  title: string;
  excerpt: string;
  body: ContentBlock[];
  date: string;
  sector: string;
  tags: string[];
  image: string;
  readMin: number;
  featured?: boolean;
  problem: string;
  solution: string;
  outcome: string;
};

export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  agentes: 'Agentes IA',
  automatizacion: 'Automatización',
  innovacion: 'Innovación',
  empresas: 'Empresas',
  casos: 'Casos',
};
