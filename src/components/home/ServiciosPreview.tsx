import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { ServiceMockup } from '@/components/shared/ServiceMockup';
import { VoiceDemoButton } from '@/components/shared/VoiceDemoButton';
import { IntegrationsMarquee } from '@/components/shared/IntegrationsGrid';
import { SERVICIOS_PREVIEW } from '@/data/servicios';
import { SERVICE_IMAGES, onImgError } from '@/lib/images';

const MOCKUP: Record<string, 'chat' | 'voice' | 'flow' | 'dashboard' | 'custom'> = {
  nexuschat: 'chat',
  nexusvox: 'voice',
  nexusflow: 'flow',
  nexusdata: 'dashboard',
  asistente: 'custom',
};

const CARD_TINTS = [
  'from-accent/10 to-transparent',
  'from-indigo-500/10 to-transparent',
  'from-teal-600/10 to-transparent',
  'from-blue-600/10 to-transparent',
  'from-accent/12 to-transparent',
];

export function ServiciosPreview() {
  return (
    <section id="servicios" className="border-b border-line bg-bg py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Servicios</p>
          <h2 className="mt-2 max-w-2xl text-[28px] font-bold text-ink md:text-[44px]">
            Servicios de inteligencia artificial para tu empresa.
          </h2>
          <p className="mt-3 max-w-xl text-[16px] text-ink-2">
            Los diseñamos a la medida — sin cambiar lo que ya usas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS_PREVIEW.map((s, i) => {
            const img = SERVICE_IMAGES[s.id];
            return (
              <Reveal key={s.id} delay={i * 0.04}>
                <div
                  className={`group card relative h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card-hover bg-gradient-to-b ${CARD_TINTS[i % CARD_TINTS.length]}`}
                >
                  {img && (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={img.src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => onImgError(e, img.fallback)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/40 to-transparent" />
                      <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-bg-elevated/90 text-accent shadow-sm backdrop-blur-sm">
                        <s.icon size={20} />
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-[17px] font-semibold text-ink">{s.titulo}</h3>
                    <p className="mt-0.5 text-[12px] font-medium uppercase tracking-wide text-ink-3">{s.tipo}</p>
                    <p className="mt-2 text-[14px] text-ink-2 line-clamp-2">{s.descripcion}</p>
                    <ServiceMockup variant={MOCKUP[s.id] ?? 'flow'} index={i} />
                    {s.voz && <VoiceDemoButton />}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.2}>
            <div className="relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-card">
              <img
                src={SERVICE_IMAGES.nexusflow.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                onError={(e) => onImgError(e, SERVICE_IMAGES.nexusflow.fallback)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
              <div className="relative">
                <p className="text-[15px] text-white/90">
                  Se aplica a <b className="text-white">ventas, atención, operación, inventario,
                  finanzas y ecommerce</b> — en cualquier sector.
                </p>
                <Link
                  to="/servicios"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all"
                >
                  Ver todos los servicios <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-12 text-center text-sm font-medium text-ink-3">
            Conectamos la IA con las herramientas que ya usa tu empresa
          </p>
          <IntegrationsMarquee />
        </Reveal>
      </div>
    </section>
  );
}
