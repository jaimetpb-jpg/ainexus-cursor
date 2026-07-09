import { useEffect, useMemo, useState } from 'react';
import { Seo } from '@/components/shared/Seo';
import { Reveal } from '@/components/shared/Reveal';
import { ArticleCard, ArticleGrid, CategoryFilter } from '@/components/content/ArticleCard';
import { ContentHero } from '@/components/content/ContentHero';
import { getArticulosSorted } from '@/data/articulos';
import { SITE_URL } from '@/lib/site';
import { track } from '@/lib/analytics';

const SECTORS = ['all', 'Logística', 'Finanzas', 'Manufactura', 'Salud', 'Inmobiliaria', 'Construcción', 'Retail', 'Agropecuario'];

export default function ArticulosPage() {
  const [filter, setFilter] = useState('all');
  const all = getArticulosSorted();
  const featured = all.find((a) => a.featured) ?? all[0];

  const filtered = useMemo(() => {
    if (filter === 'all') return all;
    return all.filter((a) => a.sector === filter);
  }, [all, filter]);

  useEffect(() => {
    track('view_article', { type: 'articulos_list' });
  }, []);

  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Artículos: cómo la IA ayudó a empresas',
    itemListElement: filtered.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/articulos/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <Seo
        title="Artículos: cómo la IA ayudó a empresas | AI Nexus"
        description="Casos y artículos sobre cómo agentes de IA y automatización mejoraron operaciones en logística, finanzas, salud, manufactura y más."
        path="/articulos"
        jsonLd={listJsonLd}
      />
      <ContentHero
        badge="Artículos"
        title="Cómo la IA está transformando empresas en México"
        subtitle="Casos reales: problema operativo, solución con agentes y automatización, y resultados cualitativos verificables."
      />
      <section className="container-x py-10 md:py-14">
        {featured && (
          <Reveal className="mb-10">
            <ArticleCard
              title={featured.title}
              excerpt={featured.excerpt}
              image={featured.image}
              href={`/articulos/${featured.slug}`}
              date={featured.date}
              readMin={featured.readMin}
              tags={[featured.sector, ...featured.tags.slice(0, 2)]}
            />
          </Reveal>
        )}
        <CategoryFilter
          categories={SECTORS.map((s) => ({ id: s, label: s === 'all' ? 'Todos' : s }))}
          active={filter}
          onChange={(id) => {
            setFilter(id);
            track('filter_category', { section: 'articulos', category: id });
          }}
        />
        <div className="mt-8">
          <ArticleGrid>
            {filtered.map((a) => (
              <Reveal key={a.slug}>
                <ArticleCard
                  title={a.title}
                  excerpt={a.excerpt}
                  image={a.image}
                  href={`/articulos/${a.slug}`}
                  date={a.date}
                  readMin={a.readMin}
                  tags={[a.sector, ...a.tags.slice(0, 2)]}
                />
              </Reveal>
            ))}
          </ArticleGrid>
        </div>
      </section>
    </>
  );
}
