import { useEffect, useMemo, useState } from 'react';
import { Seo } from '@/components/shared/Seo';
import { Reveal } from '@/components/shared/Reveal';
import { ArticleCard, ArticleGrid, CategoryFilter } from '@/components/content/ArticleCard';
import { ContentHero } from '@/components/content/ContentHero';
import { CATEGORY_LABELS } from '@/data/contentTypes';
import { getFeaturedNoticias, getNoticiasSorted } from '@/data/noticias';
import { SITE_URL } from '@/lib/site';
import { track } from '@/lib/analytics';

const FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'Todas' },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label })),
];

export default function NoticiasPage() {
  const [filter, setFilter] = useState('all');
  const all = getNoticiasSorted();
  const featured = getFeaturedNoticias()[0];

  const filtered = useMemo(() => {
    if (filter === 'all') return all;
    return all.filter((n) => n.category === filter);
  }, [all, filter]);

  useEffect(() => {
    track('view_article', { type: 'noticias_list' });
  }, []);

  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Noticias de IA y automatización',
    itemListElement: filtered.slice(0, 10).map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: n.external && n.sourceUrl ? n.sourceUrl : `${SITE_URL}/noticias/${n.slug}`,
      name: n.title,
    })),
  };

  return (
    <>
      <Seo
        title="Noticias de IA y automatización | AI Nexus"
        description="Últimas noticias sobre agentes de IA, automatización empresarial e innovación tecnológica en México y LATAM."
        path="/noticias"
        jsonLd={listJsonLd}
      />
      <ContentHero
        badge="Noticias"
        title="Innovación en agentes IA y automatización"
        subtitle="Tendencias, lanzamientos y análisis para empresas que quieren operar con inteligencia artificial de verdad."
      />
      <section className="container-x py-10 md:py-14">
        {featured && (
          <Reveal className="mb-10">
            <ArticleCard
              title={featured.title}
              excerpt={featured.excerpt}
              image={featured.image}
              href={featured.external && featured.sourceUrl ? featured.sourceUrl : `/noticias/${featured.slug}`}
              date={featured.date}
              readMin={featured.readMin}
              tags={featured.tags}
              category={featured.category}
              external={featured.external}
              source={featured.source}
            />
          </Reveal>
        )}
        <CategoryFilter
          categories={FILTERS}
          active={filter}
          onChange={(id) => {
            setFilter(id);
            track('filter_category', { section: 'noticias', category: id });
          }}
        />
        <div className="mt-8">
          <ArticleGrid>
            {filtered.map((n) => (
              <Reveal key={n.slug}>
                <ArticleCard
                  title={n.title}
                  excerpt={n.excerpt}
                  image={n.image}
                  href={n.external && n.sourceUrl ? n.sourceUrl : `/noticias/${n.slug}`}
                  date={n.date}
                  readMin={n.readMin}
                  tags={n.tags}
                  category={n.category}
                  external={n.external}
                  source={n.source}
                />
              </Reveal>
            ))}
          </ArticleGrid>
        </div>
      </section>
    </>
  );
}
