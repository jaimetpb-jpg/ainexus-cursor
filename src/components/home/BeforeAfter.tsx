import { Reveal } from '@/components/shared/Reveal';
import { Check, X } from 'lucide-react';

const HOY = [
  'Respondes lo mismo todo el día',
  'Excel y reportes a mano',
  'Pierdes clientes fuera de horario',
  'Equipo saturado de tareas',
  'Herramientas sin conectar',
  'Nadie detecta errores a tiempo',
];

const CON = [
  'Un agente responde 24/7',
  'Dashboards en tiempo real',
  'Cero fugas, seguimiento solo',
  'Tu equipo solo hace lo que aporta',
  'Todo integrado en un sistema',
  'La IA detecta errores y oportunidades',
];

export function BeforeAfter() {
  return (
    <section className="border-b border-line bg-bg py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">El cambio</p>
          <h2 className="mt-2 max-w-2xl text-[28px] font-bold text-ink md:text-[44px]">
            De procesos manuales a operación inteligente.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-2xl border border-line">
              <img
                src="/images/before-after-traditional.jpg"
                alt="Operación manual tradicional"
                loading="lazy"
                className="h-52 w-full object-cover sm:h-60"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
              <div className="relative p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-3">Hoy</p>
                <ul className="mt-4 space-y-3">
                  {HOY.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-ink-2">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bg-soft text-ink-3">
                        <X size={13} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-accent/35">
              <img
                src="/images/before-after-ainexus.jpg"
                alt="Operación con AI Nexus"
                loading="lazy"
                className="h-52 w-full object-cover sm:h-60"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent-soft to-transparent" />
              <div className="relative p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">Con AI Nexus</p>
                <ul className="mt-4 space-y-3">
                  {CON.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                        <Check size={13} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ink-3">
            Ejemplo ilustrativo: empresas que automatizan estos procesos suelen recuperar
            <span className="font-semibold text-ink-2"> varias horas por empleado a la semana</span> y
            responden en <span className="font-semibold text-ink-2">segundos</span>, no en horas.
            <span className="badge-demo ml-2">ejemplo</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
