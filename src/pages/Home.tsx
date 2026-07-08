import { Suspense, lazy } from 'react';
import { Seo, organizationJsonLd, websiteJsonLd } from '@/components/shared/Seo';
import { LazyMount } from '@/components/shared/LazyMount';
import { Hero } from '@/components/home/Hero';
import { BeforeAfter } from '@/components/home/BeforeAfter';
import { CasosPorArea } from '@/components/home/CasosPorArea';
import { ServiciosPreview } from '@/components/home/ServiciosPreview';
import { CTA } from '@/components/home/CTA';

const DashboardConfianza = lazy(() =>
  import('@/components/home/DashboardConfianza').then((m) => ({ default: m.DashboardConfianza }))
);

export default function Home() {
  return (
    <>
      <Seo
        title="AI Nexus — Automatiza tu empresa con IA | Agentes y automatizaciones"
        description="Creamos agentes de IA, automatizaciones y dashboards que conectan tus ventas, operación y atención al cliente. Vende más, responde 24/7 y reduce tareas manuales — sin cambiar tus herramientas."
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <Hero />
      <BeforeAfter />
      <CasosPorArea />
      <ServiciosPreview />
      <LazyMount minHeight={720}>
        <Suspense fallback={<div className="container-x py-20 text-center text-ink-3">Cargando demo…</div>}>
          <DashboardConfianza />
        </Suspense>
      </LazyMount>
      <CTA />
    </>
  );
}
