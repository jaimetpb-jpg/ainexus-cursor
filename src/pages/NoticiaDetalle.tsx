import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Seo, breadcrumbJsonLd, newsArticleJsonLd } from '@/components/shared/Seo';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ContentBreadcrumb, ContentHero } from '@/components/content/ContentHero';
import { ContentCTA } from '@/components/content/ContentCTA';
import { RelatedContent } from '@/components/content/RelatedContent';
import { getNoticia, getNoticiasSorted } from '@/data/noticias';
import { SITE_URL } from '@/lib/site';
import { track } from '@/lib/analytics';

export default function NoticiaDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const noticia = slug ? getNoticia(slug) : undefined;

  useEffect(() => {
    if (noticia) track('view_article', { type: 'noticia', slug: noticia.slug });
  }, [noticia]);

  if (!noticia) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-xl font-bold">Noticia no encontrada</h1>
        <Link to="/noticias" className="mt-4 inline-block text-accent hover:underline">
          Volver a noticias
        </Link>
      </div>
    );
  }

  const related = getNoticiasSorted()
    .filter((n) => n.slug !== noticia.slug && !n.external)
    .slice(0, 3)
    .map((n) => ({ title: n.title, href: `/noticias/${n.slug}`, excerpt: n.excerpt }));

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', url: SITE_URL },
      { name: 'Noticias', url: `${SITE_URL}/noticias` },
      { name: noticia.title, url: `${SITE_URL}/noticias/${noticia.slug}` },
    ]),
    newsArticleJsonLd({
      title: noticia.title,
      description: noticia.excerpt,
      date: noticia.date,
      image: `${SITE_URL}${noticia.image}`,
      url: `${SITE_URL}/noticias/${noticia.slug}`,
    }),
  ];

  return (
    <>
      <Seo
        title={`${noticia.title} | Noticias AI Nexus`}
        description={noticia.excerpt}
        path={`/noticias/${noticia.slug}`}
        jsonLd={jsonLd}
      />
      <ContentBreadcrumb
        items={[{ label: 'Inicio', href: '/' }, { label: 'Noticias', href: '/noticias' }, { label: noticia.title }]}
      />
      <ContentHero
        badge="Noticias"
        title={noticia.title}
        subtitle={noticia.excerpt}
        date={noticia.date}
        readMin={noticia.readMin}
        category={noticia.category}
      />
      <article className="container-x max-w-3xl py-10">
        {noticia.image && (
          <img src={noticia.image} alt="" className="mb-8 w-full rounded-xl border border-line object-cover md:max-h-80" loading="lazy" />
        )}
        <ArticleBody blocks={noticia.body} />
        {noticia.external && noticia.sourceUrl && (
          <a
            href={noticia.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent px-4 py-2 text-[14px] font-semibold text-accent hover:bg-accent/5"
          >
            Leer en {noticia.source || 'fuente original'} <ExternalLink size={16} />
          </a>
        )}
        <p className="mt-8 text-[12px] text-ink-3">Por Equipo AI Nexus · Actualizado {noticia.date}</p>
        <ContentCTA
          place={`noticia_${noticia.slug}`}
          message={`Hola, leí la noticia "${noticia.title}" y quiero explorar agentes de IA para mi empresa.`}
        />
        <RelatedContent items={related} />
      </article>
    </>
  );
}
