import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/lib/site';

type Props = {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({ title, description, path = '/', jsonLd }: Props) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const image = `${SITE_URL}/images/og-image.jpg`;

  return (
    <Helmet>
      <html lang="es-MX" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Nexus',
  url: SITE_URL,
  description: 'Agentes de IA, automatizaciones y dashboards para empresas en México.',
  areaServed: ['MX', 'LATAM'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['Spanish', 'English'],
    telephone: '+52-55-2578-7385',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Nexus',
  url: SITE_URL,
  inLanguage: 'es-MX',
};

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function newsArticleJsonLd(opts: {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { '@type': 'Organization', name: 'AI Nexus', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'AI Nexus',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: opts.url,
  };
}

export function blogPostingJsonLd(opts: {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
  sector: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { '@type': 'Organization', name: 'AI Nexus' },
    publisher: { '@type': 'Organization', name: 'AI Nexus', url: SITE_URL },
    articleSection: opts.sector,
    mainEntityOfPage: opts.url,
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
