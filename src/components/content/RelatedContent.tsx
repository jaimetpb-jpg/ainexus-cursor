import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type RelatedItem = { title: string; href: string; excerpt: string };

export function RelatedContent({ items, title = 'También te puede interesar' }: { items: RelatedItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <aside className="mt-12 rounded-xl border border-line bg-bg-alt p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-ink">{title}</h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="group block">
              <p className="font-semibold text-ink group-hover:text-accent">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-[13px] text-ink-3">{item.excerpt}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-accent">
                Leer <ArrowRight size={12} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
