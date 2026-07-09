import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo, blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/shared/Seo';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ContentBreadcrumb, ContentHero } from '@/components/content/ContentHero';
import { ContentCTA } from '@/components/content/ContentCTA';
import { RelatedContent } from '@/components/content/RelatedContent';
import { getArticulo, getArticulosSorted } from '@/data/articulos';
import { SITE_URL } from '@/lib/site';
import { track } from '@/lib/analytics';

export default function ArticuloDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const articulo = slug ? getArticulo(slug) : undefined;

  useEffect(() => {
    if (articulo) track('view_article', { type: 'articulo', slug: articulo.slug });
  }, [articulo]);

  if (!articulo) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-xl font-bold">Artículo no encontrado</h1>
        <Link to="/articulos" className="mt-4 inline-block text-accent hover:underline">
          Volver a artículos
        </Link>
      </div>
    );
  }

  const related = getArticulosSorted()
    .filter((a) => a.slug !== articulo.slug)
    .slice(0, 3)
    .map((a) => ({ title: a.title, href: `/articulos/${a.slug}`, excerpt: a.excerpt }));

  const faq = [
    { q: `¿Qué problema tenía la empresa de ${articulo.sector}?`, a: articulo.problem },
    { q: '¿Qué solución de IA se implementó?', a: articulo.solution },
    { q: '¿Cuál fue el resultado?', a: articulo.outcome },
  ];

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', url: SITE_URL },
      { name: 'Artículos', url: `${SITE_URL}/articulos` },
      { name: articulo.title, url: `${SITE_URL}/articulos/${articulo.slug}` },
    ]),
    blogPostingJsonLd({
      title: articulo.title,
      description: articulo.excerpt,
      date: articulo.date,
      image: `${SITE_URL}${articulo.image}`,
      url: `${SITE_URL}/articulos/${articulo.slug}`,
      sector: articulo.sector,
    }),
    faqJsonLd(faq),
  ];

  return (
    <>
      <Seo
        title={`${articulo.title} | Artículos AI Nexus`}
        description={articulo.excerpt}
        path={`/articulos/${articulo.slug}`}
        jsonLd={jsonLd}
      />
      <ContentBreadcrumb
        items={[{ label: 'Inicio', href: '/' }, { label: 'Artículos', href: '/articulos' }, { label: articulo.title }]}
      />
      <ContentHero
        badge={`Caso · ${articulo.sector}`}
        title={articulo.title}
        subtitle={articulo.excerpt}
        date={articulo.date}
        readMin={articulo.readMin}
      />
      <article className="container-x max-w-3xl py-10">
        <img src={articulo.image} alt="" className="mb-8 w-full rounded-xl border border-line object-cover md:max-h-80" loading="lazy" />
        <div className="mb-8 grid gap-4 rounded-xl border border-line bg-bg-alt p-5 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-bold uppercase text-ink-3">Problema</p>
            <p className="mt-1 text-[13px] text-ink-2">{articulo.problem}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-ink-3">Solución IA</p>
            <p className="mt-1 text-[13px] text-ink-2">{articulo.solution}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-ink-3">Resultado</p>
            <p className="mt-1 text-[13px] text-ink-2">{articulo.outcome}</p>
          </div>
        </div>
        <ArticleBody blocks={articulo.body} />
        <section className="mt-10 rounded-xl border border-line p-6">
          <h2 className="text-lg font-bold text-ink">Preguntas frecuentes</h2>
          <dl className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-ink">{item.q}</dt>
                <dd className="mt-1 text-[14px] text-ink-2">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="mt-8 text-[12px] text-ink-3">Por Equipo AI Nexus · Sector {articulo.sector}</p>
        <ContentCTA
          place={`articulo_${articulo.slug}`}
          headline={`¿Necesitas algo similar en ${articulo.sector}?`}
          message={`Hola, leí el caso de ${articulo.sector} ("${articulo.title}") y quiero explorar una solución de IA para mi empresa.`}
        />
        <RelatedContent items={related} title="Más casos de empresas" />
      </article>
    </>
  );
}
