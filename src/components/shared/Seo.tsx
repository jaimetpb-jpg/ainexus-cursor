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
  description:
    'Agentes de IA, automatizaciones y dashboards para empresas en México.',
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
