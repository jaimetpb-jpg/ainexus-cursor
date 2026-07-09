import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { CATEGORY_LABELS, type ContentCategory } from '@/data/contentTypes';

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  date?: string;
  readMin?: number;
  category?: ContentCategory;
};

export function ContentHero({ badge, title, subtitle, date, readMin, category }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-accent/8 via-bg to-bg-alt py-14 md:py-20">
      <div className="container-x relative z-10 max-w-3xl">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
          {badge}
        </span>
        {category && (
          <span className="ml-2 inline-flex rounded-full border border-line px-2 py-1 text-[10px] font-medium text-ink-3">
            {CATEGORY_LABELS[category]}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-ink-2">{subtitle}</p>
        {(date || readMin) && (
          <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-ink-3">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(date + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {readMin && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {readMin} min lectura
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function ContentBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x py-3 text-[13px] text-ink-3">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link to={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function FeaturedStrip({ title, href }: { title: string; href: string }) {
  return (
    <Link
      to={href}
      className="group flex items-center justify-between rounded-xl border border-accent/25 bg-accent/5 px-5 py-4 transition hover:border-accent/50"
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Destacado</p>
        <p className="mt-1 font-semibold text-ink group-hover:text-accent">{title}</p>
      </div>
      <ArrowRight size={18} className="text-accent transition group-hover:translate-x-1" />
    </Link>
  );
}
