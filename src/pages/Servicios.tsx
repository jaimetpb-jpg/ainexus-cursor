import { Seo } from '@/components/shared/Seo';
import { Reveal } from '@/components/shared/Reveal';
import { FlowDiagram } from '@/components/shared/FlowDiagram';
import { IntegrationsGrid } from '@/components/shared/IntegrationsGrid';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { VoiceDemoButton } from '@/components/shared/VoiceDemoButton';
import { SERVICIOS } from '@/data/servicios';
import { SITE_URL, waLink } from '@/lib/site';
import { SERVICE_IMAGES, onImgError } from '@/lib/images';
import { track } from '@/lib/analytics';

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: SERVICIOS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.productName,
      description: s.descripcion,
      provider: { '@type': 'Organization', name: 'AI Nexus', url: SITE_URL },
    },
  })),
};

export default function ServiciosPage() {
  return (
    <>
      <Seo
        title="Servicios de IA para empresas | AI Nexus"
        description="Agentes de WhatsApp, voz, automatizaciones, dashboards y sistemas de IA a la medida. Sin cambiar las herramientas que ya usas."
        path="/servicios"
        jsonLd={servicesJsonLd}
      />

      <section className="relative overflow-hidden border-b border-line py-16 md:py-24">
        <img
          src={SERVICE_IMAGES.nexusflow.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          onError={(e) => onImgError(e, SERVICE_IMAGES.nexusflow.fallback)}
        />
        <div className="pointer-events-none absolute inset-0 hero-mesh opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/70" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">Servicios</p>
            <h1 className="mt-3 max-w-3xl text-[32px] font-bold text-ink md:text-[52px]">
              Inteligencia artificial que{' '}
              <span className="text-gradient">ejecuta procesos</span>, no solo responde preguntas.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] text-ink-2">
              Cada servicio está diseñado para un trabajo concreto en tu empresa. Sin jerga técnica innecesaria.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-12 md:py-16">
        <div className="container-x space-y-10">
          {SERVICIOS.map((s, i) => {
            const img = SERVICE_IMAGES[s.id];
            return (
            <Reveal key={s.id} delay={(i % 2) * 0.05}>
              <article id={s.id} className="card scroll-mt-24 overflow-hidden shadow-card">
                {img && (
                  <div className="relative h-48 overflow-hidden md:h-56">
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => onImgError(e, img.fallback)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white shadow-glow">
                        <s.icon size={24} />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold uppercase text-accent">{s.productName}</p>
                        <h2 className="text-xl font-bold text-ink">{s.titulo}</h2>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid gap-0 xl:grid-cols-[1fr_1.2fr]">
                  <div className="p-6 md:p-10">
                    {!img && (
                    <div className="flex items-center gap-3">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-glow">
                        <s.icon size={26} />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">{s.productName}</p>
                        <h2 className="text-[24px] font-bold text-ink">{s.titulo}</h2>
                        <p className="text-[13px] text-ink-3">{s.tipo}</p>
                      </div>
                    </div>
                    )}
                    {img && <p className="text-[13px] text-ink-3">{s.tipo}</p>}
                    <p className="mt-5 text-[16px] text-ink-2">{s.descripcion}</p>
                    {s.voz && <VoiceDemoButton className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-2 text-[14px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white" />}
                    <p className="mt-5 text-[13px] font-semibold uppercase tracking-wide text-ink-3">El problema</p>
                    <p className="mt-1 text-[15px] text-ink-2">{s.problema}</p>
                    <ul className="mt-5 space-y-2.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[14px] text-ink-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(`Hola, me interesa ${s.productName} para mi empresa.`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track('whatsapp_click', { place: `servicio_${s.id}` })}
                      className="btn btn-wa mt-8"
                    >
                      <WhatsAppIcon size={17} /> Quiero esto en mi empresa
                    </a>
                  </div>
                  <div className="border-t border-line bg-bg-alt p-6 md:border-l md:border-t-0 md:p-10">
                    <p className="mb-5 text-[12px] font-semibold uppercase tracking-wide text-ink-3">
                      Cómo funciona <span className="badge-demo ml-1">demo</span>
                    </p>
                    <FlowDiagram steps={s.flujo} activeIndex={s.flujo.length - 1} />
                  </div>
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-14">
        <div className="container-x">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-3">
            Integraciones
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-ink md:text-3xl">
            Conecta todo lo que ya usas
          </h2>
          <IntegrationsGrid />
        </div>
      </section>
    </>
  );
}
