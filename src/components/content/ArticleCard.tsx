import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CATEGORY_LABELS, type ContentCategory } from '@/data/contentTypes';

type CardProps = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  readMin: number;
  tags?: string[];
  category?: ContentCategory;
  external?: boolean;
  source?: string;
};

export function ArticleCard({ title, excerpt, image, href, date, readMin, tags, category, external, source }: CardProps) {
  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg transition hover:border-accent/40 hover:shadow-card">
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-alt">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-2 py-0.5 text-[10px] font-bold text-accent backdrop-blur">
            {CATEGORY_LABELS[category]}
          </span>
        )}
        {external && (
          <span className="absolute right-3 top-3 rounded-full bg-bg/90 px-2 py-0.5 text-[10px] font-medium text-ink-3 backdrop-blur">
            {source || 'Externo'}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <time className="text-[11px] text-ink-3" dateTime={date}>
          {new Date(date + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
          {' · '}
          {readMin} min
        </time>
        <h2 className="mt-2 line-clamp-2 text-[15px] font-bold text-ink group-hover:text-accent">{title}</h2>
        <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink-3">{excerpt}</p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded bg-bg-alt px-1.5 py-0.5 text-[10px] text-ink-3">
                {t}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
          {external ? 'Leer fuente' : 'Leer más'}
          {external ? <ExternalLink size={14} /> : <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />}
        </span>
      </div>
    </article>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return (
    <Link to={href} className="block h-full">
      {inner}
    </Link>
  );
}

export function ArticleGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${
            active === c.id ? 'border-accent bg-accent text-white' : 'border-line text-ink-2 hover:border-accent/50'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
