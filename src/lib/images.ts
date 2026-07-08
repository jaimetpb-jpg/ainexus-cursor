import type { SyntheticEvent } from 'react';

/** Imágenes Kimi + derivadas WebP — rutas centralizadas con fallback JPG */
const w = (name: string) => `/images/${name}.webp`;
const j = (name: string) => `/images/${name}.jpg`;

export const IMAGES = {
  heroCinematic: w('hero-cinematic-mx'),
  heroParticles: w('hero-particles-bg'),
  heroControl: w('hero-control-tower'),
  partnersNetwork: w('partners-network'),
  beforeTraditional: w('before-after-traditional'),
  beforeAinexus: w('before-after-ainexus'),
  og: w('og-image'),
  careers: w('careers-hero'),
  industry: (slug: string) => w(`industry-${slug}`),
  caseStudy: (slug: string) => w(`case-${slug}`),
} as const;

/** Fallback JPG si WebP no carga */
export const FALLBACK = {
  hero: j('hero-particles-bg'),
  partners: j('partners-network'),
  industry: (slug: string) => j(`industry-${slug}`),
  caseStudy: (slug: string) => j(`case-${slug}`),
} as const;

export const HERO_INDUSTRY_STRIP = [
  { label: 'Minería', src: IMAGES.industry('mining'), fb: FALLBACK.industry('mining') },
  { label: 'Automotriz', src: IMAGES.industry('automotive'), fb: FALLBACK.industry('automotive') },
  { label: 'Agro', src: IMAGES.industry('agro'), fb: FALLBACK.industry('agro') },
  { label: 'Logística', src: '/images/ops-logistics-highway.webp', fb: '/images/ops-logistics-highway.png' },
  { label: 'Corporativo', src: IMAGES.industry('corporate'), fb: FALLBACK.industry('corporate') },
] as const;

export const SERVICE_IMAGES: Record<string, { src: string; fallback: string }> = {
  nexuschat: { src: w('service-whatsapp'), fallback: '/images/service-whatsapp.png' },
  nexusvox: { src: '/images/ops-logistics-highway.webp', fallback: '/images/ops-logistics-highway.png' },
  nexusflow: { src: w('service-automation'), fallback: '/images/service-automation.png' },
  nexusdata: { src: IMAGES.caseStudy('mining-result'), fallback: j('case-mining-result') },
  asistente: { src: IMAGES.industry('corporate'), fallback: FALLBACK.industry('corporate') },
  custom: { src: IMAGES.beforeAinexus, fallback: j('before-after-ainexus') },
};

export const AREA_IMAGES: Record<string, { src: string; fallback: string }> = {
  ventas: { src: IMAGES.caseStudy('automotive'), fallback: FALLBACK.caseStudy('automotive') },
  atencion: { src: IMAGES.industry('education'), fallback: FALLBACK.industry('education') },
  logistica: { src: '/images/ops-logistics-yard.webp', fallback: '/images/ops-logistics-yard.png' },
  manufactura: { src: '/images/ops-mfg-assembly.webp', fallback: '/images/ops-mfg-assembly.png' },
  ecommerce: { src: IMAGES.industry('automotive'), fallback: FALLBACK.industry('automotive') },
  administracion: { src: IMAGES.industry('corporate'), fallback: FALLBACK.industry('corporate') },
};

export function onImgError(e: SyntheticEvent<HTMLImageElement>, fallback: string) {
  const el = e.currentTarget;
  if (!el.dataset.fallback) {
    el.dataset.fallback = '1';
    el.src = fallback;
  }
}
