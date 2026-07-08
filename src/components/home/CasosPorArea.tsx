import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { FlowDiagram, MaturityStrip } from '@/components/shared/FlowDiagram';
import { CASOS_AREA } from '@/data/casosArea';
import { AREA_IMAGES } from '@/lib/images';
import { track } from '@/lib/analytics';

export function CasosPorArea() {
  const [active, setActive] = useState(CASOS_AREA[0].slug);
  const area = CASOS_AREA.find((s) => s.slug === active)!;
  const banner = AREA_IMAGES[area.slug];

  return (
    <section id="casos" className="border-b border-line bg-bg-alt py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Casos por área</p>
          <h2 className="mt-2 max-w-3xl text-[28px] font-bold text-ink md:text-[44px]">
            Mira cómo la IA resuelve procesos completos, de principio a fin.
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {CASOS_AREA.map((s) => {
            const on = s.slug === active;
            const thumb = AREA_IMAGES[s.slug];
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => {
                  setActive(s.slug);
                  track('sector_view', { sector: s.slug, place: 'home_tabs' });
                }}
                className={`flex items-center gap-2 rounded-full border pr-4 transition-all ${
                  on
                    ? 'border-accent bg-accent text-white shadow-glow'
                    : 'border-line bg-bg-elevated text-ink-2 hover:border-accent/40'
                }`}
              >
                {thumb && (
                  <span className="relative m-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <img
                      src={thumb.fallback}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                )}
                <s.icon size={15} className={on ? 'text-white' : 'text-accent'} />
                <span className="py-2 text-sm font-medium">{s.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Banner visual del área activa */}
        {banner && (
          <Reveal key={`banner-${area.slug}`}>
            <div className="relative mt-6 h-48 overflow-hidden rounded-2xl border border-line sm:h-56 md:h-64">
              <img
                src={banner.fallback}
                alt={area.nombre}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <div className="flex items-center gap-2 text-white/80">
                  <area.icon size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wide">{area.nombre}</span>
                </div>
                <p className="mt-2 max-w-lg text-lg font-semibold text-white md:text-xl">{area.solucion}</p>
                <span className="badge-demo mt-2 inline-block bg-white/15 text-white">ejemplo ilustrativo</span>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal key={`${area.slug}-maturity`}>
          <div className="mt-5 max-w-md">
            <MaturityStrip level={3} />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal key={`${area.slug}-flow`}>
            <FlowDiagram steps={area.flujo} activeIndex={area.flujo.length - 1} />
          </Reveal>

          <Reveal key={`${area.slug}-r`} delay={0.05}>
            <div className="card flex h-full flex-col justify-between border-accent/20 bg-ink p-6 text-white md:p-8">
              <div>
                <p className="text-[13px] uppercase tracking-wide text-white/50">El problema</p>
                <p className="mt-1 text-[15px] text-white/90">{area.problema}</p>
              </div>
              <div className="mt-6 rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                <p className="text-[13px] uppercase tracking-wide text-white/50">
                  Resultado <span className="badge-demo bg-white/15 text-white">ejemplo</span>
                </p>
                <p className="mt-1 text-[15px] font-semibold">{area.resultado}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <Link
            to="/sectores"
            onClick={() => track('sector_view', { place: 'home_ver_sectores' })}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
          >
            Ver sectores e industrias <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
