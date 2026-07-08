import { useEffect, useState } from 'react';
import { Seo } from '@/components/shared/Seo';
import { Reveal } from '@/components/shared/Reveal';
import { FlowDiagram } from '@/components/shared/FlowDiagram';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { OPS_SECTORS } from '@/components/home/OperationsConsole';
import { INDUSTRIAS, JPG_FALLBACK } from '@/data/industrias';
import { getSectorImpact } from '@/data/sectorImpact';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import {
  ArrowDown,
  ArrowUp,
  Bot,
  Check,
  LayoutDashboard,
  Package,
  Search,
  Wrench,
  Workflow,
  X,
  Zap,
} from 'lucide-react';

const IMPLEMENTACION = [
  { icon: Search, t: 'Diagnóstico sin costo', d: 'Mapeamos tu proceso y priorizamos el mayor ROI.' },
  { icon: Wrench, t: 'Demo con tus herramientas', d: 'Agentes y dashboard conectados a lo que ya usas.' },
  { icon: Package, t: 'Implementación guiada', d: 'Puesta en marcha, capacitación y monitoreo continuo.' },
];

export default function SectoresPage() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIAS[active];
  const impact = getSectorImpact(ind.slug);

  useEffect(() => {
    track('sector_view', { place: 'sectores_page' });
  }, []);

  return (
    <>
      <Seo
        title="Sectores e industrias — IA aplicada en todo México | AI Nexus"
        description="Soluciones de IA para minería, automotriz, logística, manufactura, finanzas, salud, inmobiliaria, construcción y más."
        path="/sectores"
      />

      <section className="relative overflow-hidden border-b border-line py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 hero-mesh opacity-50" aria-hidden />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">Sectores · todo México</p>
            <h1 className="mt-3 max-w-3xl text-[32px] font-bold text-ink md:text-[48px]">
              En tu sector, la IA <span className="text-gradient">reduce costos</span>, aumenta ingresos y{' '}
              <span className="text-gradient">sistematiza</span> lo que hoy es manual
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] text-ink-2">
              11 industrias con agentes especializados + 6 mega dashboards en vivo. Aquí ves qué resolvemos, cómo lo
              hacemos y qué cambia en tu operación.
              <span className="badge-demo ml-2">ejemplos ilustrativos</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink('Hola, quiero saber cómo la IA aplica a mi sector.')}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_click', { place: 'sectores_hero' })}
                className="btn btn-wa"
              >
                <WhatsAppIcon size={18} /> Cuéntame mi caso por sector
              </a>
              <a href="/#dashboard" className="btn btn-ghost">
                <LayoutDashboard size={16} /> Ver dashboards en vivo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 dashboards en vivo */}
      <section className="border-b border-line bg-bg-alt py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Mega dashboards</p>
            <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">6 centros de control en tiempo real</h2>
            <p className="mt-2 max-w-2xl text-[15px] text-ink-2">
              Cada sector tiene un dashboard demo con mapas, sensores, agentes IA y alertas. Haz clic y entra al demo en
              un clic desde el inicio.
              <span className="badge-demo ml-2">simulación</span>
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPS_SECTORS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`/#dashboard-${s.id}`}
                  onClick={() => track('hero_dashboard_click', { from: `sectores_${s.id}` })}
                  className="group rounded-2xl border border-line bg-bg-elevated p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-white shadow-glow">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[9px] font-bold text-accent">
                      LIVE
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{s.label}</h3>
                  <p className="mt-1 text-[13px] text-ink-3">{s.title}</p>
                  <p className="mt-3 text-[12px] font-semibold text-accent group-hover:underline">
                    Abrir dashboard →
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cómo implementamos */}
      <section className="border-b border-line bg-bg py-10 md:py-12">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-3">
            {IMPLEMENTACION.map((step, i) => (
              <Reveal key={step.t} delay={i * 0.06}>
                <div className="flex gap-4 rounded-xl border border-line bg-bg-elevated p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <step.icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-bold text-accent">0{i + 1}</p>
                    <h3 className="mt-0.5 font-semibold text-ink">{step.t}</h3>
                    <p className="mt-1 text-[13px] text-ink-3">{step.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selector industrias */}
      <section className="sticky top-[60px] z-30 border-b border-line bg-bg-alt/95 py-4 backdrop-blur-md md:top-[68px]">
        <div className="container-x">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-3">Industrias · detalle por sector</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {INDUSTRIAS.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => {
                  setActive(i);
                  track('sector_view', { sector: s.slug, place: 'sectores_tabs' });
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                  active === i
                    ? 'border-accent bg-accent text-white shadow-glow'
                    : 'border-line bg-bg-elevated text-ink-2 hover:border-accent/40'
                }`}
              >
                <s.icon size={16} />
                {s.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detalle conversión */}
      <section className="bg-bg py-12 md:py-16">
        <div className="container-x">
          <Reveal key={ind.slug}>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-line lg:min-h-[520px]">
                <img
                  src={ind.imagen}
                  alt={ind.nombre}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    const fb = JPG_FALLBACK[ind.slug];
                    if (fb) (e.target as HTMLImageElement).src = `/images/industry-${fb}.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white shadow-glow">
                      <ind.icon size={22} />
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold text-white md:text-3xl">{ind.nombre}</h2>
                      <p className="mt-1 text-sm text-white/85">{ind.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-xl border border-line bg-bg-alt p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-error">El problema hoy</p>
                  <p className="mt-2 text-[15px] font-medium text-ink">{ind.problema}</p>
                  <div className="my-4 h-px bg-line" />
                  <p className="text-[11px] font-bold uppercase tracking-wide text-accent">Cómo lo resolvemos</p>
                  <p className="mt-2 text-[15px] font-medium text-ink">{ind.solucion}</p>
                </div>

                {impact && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-line bg-bg-elevated p-4">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-error">
                        <ArrowDown size={14} /> Reducir
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {impact.reducir.map((r) => (
                          <li key={r} className="text-[12px] leading-snug text-ink-2">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-line bg-bg-elevated p-4">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#16a34a]">
                        <ArrowUp size={14} /> Aumentar
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {impact.aumentar.map((r) => (
                          <li key={r} className="text-[12px] leading-snug text-ink-2">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-line bg-bg-elevated p-4">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-accent">
                        <Workflow size={14} /> Sistematizar
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {impact.sistematizar.map((r) => (
                          <li key={r} className="text-[12px] leading-snug text-ink-2">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {impact && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-ink-3">
                        <Bot size={14} className="text-accent" /> Agentes IA especializados
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {impact.agentes.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-ink-3">
                        <Zap size={14} className="text-accent" /> Automatizaciones
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {impact.automatizaciones.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-line bg-bg-elevated px-2.5 py-1 text-[11px] font-medium text-ink-2"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {ind.productos.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] font-bold uppercase text-ink-3">Productos Nexus recomendados</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {ind.productos.map((p) => (
                        <a
                          key={p}
                          href="/servicios"
                          className="rounded-lg border border-line bg-bg-elevated px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-accent hover:text-accent"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-error">Dolores comunes</p>
                    <ul className="mt-2 space-y-2">
                      {ind.painPoints.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-[13px] text-ink-2">
                          <X size={14} className="mt-0.5 shrink-0 text-error" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">Qué implementamos</p>
                    <ul className="mt-2 space-y-2">
                      {ind.solutions.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[13px] text-ink-2">
                          <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">Beneficios para tu equipo</p>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {ind.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2 rounded-lg border border-line bg-bg-alt px-3 py-2 text-[12px] text-ink-2">
                        <Check size={13} className="mt-0.5 shrink-0 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl bg-accent-soft/70 p-4">
                  <p className="text-[11px] font-semibold text-accent">
                    Resultado esperado <span className="badge-demo">ejemplo</span>
                  </p>
                  <p className="mt-1 font-medium text-ink">{ind.resultado}</p>
                </div>

                <FlowDiagram steps={ind.flujo} activeIndex={ind.flujo.length - 1} />

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waLink(`Hola, me interesa la IA para el sector ${ind.nombre.toLowerCase()} en mi empresa.`)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track('whatsapp_click', { place: `sector_${ind.slug}` })}
                    className="btn btn-wa flex-1"
                  >
                    <WhatsAppIcon size={17} /> Quiero esto para {ind.nombre}
                  </a>
                  {impact?.demoSector && (
                    <a
                      href={`/#dashboard-${impact.demoSector}`}
                      className="btn btn-ghost flex-1"
                      onClick={() => track('hero_dashboard_click', { from: `sector_${ind.slug}` })}
                    >
                      <LayoutDashboard size={16} /> Ver demo en vivo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid todos los sectores */}
      <section className="border-t border-line bg-bg-alt py-12 md:py-16">
        <div className="container-x">
          <h2 className="text-center text-xl font-bold text-ink md:text-2xl">Elige tu sector y ve el impacto</h2>
          <p className="mt-2 text-center text-sm text-ink-3">
            Reducir · Aumentar · Sistematizar — con agentes IA a la medida
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {INDUSTRIAS.map((s, i) => {
              const imp = getSectorImpact(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    window.scrollTo({ top: 520, behavior: 'smooth' });
                  }}
                  className="group overflow-hidden rounded-xl border border-line bg-bg-elevated text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={s.imagen}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const fb = JPG_FALLBACK[s.slug];
                        if (fb) (e.target as HTMLImageElement).src = `/images/industry-${fb}.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated to-transparent" />
                    {imp?.demoSector && (
                      <span className="absolute right-2 top-2 rounded bg-accent/90 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
                        DEMO
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <s.icon size={16} className="text-accent" />
                      <span className="text-sm font-semibold text-ink">{s.nombre}</span>
                    </div>
                    {imp && (
                      <p className="mt-1.5 line-clamp-2 text-[11px] text-ink-3">
                        ↓ {imp.reducir[0]} · ↑ {imp.aumentar[0]}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
