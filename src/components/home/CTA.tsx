import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Search, Wrench, Rocket, CalendarClock } from 'lucide-react';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { Reveal } from '@/components/shared/Reveal';
import { GUARANTEE, waLink, CALENDLY_URL } from '@/lib/site';
import { track } from '@/lib/analytics';

const PASOS = [
  { icon: Search, t: 'Detectamos una oportunidad', d: 'Vemos qué proceso te cuesta más tiempo o dinero.' },
  { icon: Wrench, t: 'Creamos una demo con tus herramientas', d: 'Un prototipo real, sin cambiar tu operación.' },
  { icon: Rocket, t: 'Implementamos y optimizamos', d: 'La IA trabaja, se monitorea y mejora con el tiempo.' },
];

export function CTA() {
  const [form, setForm] = useState({ nombreOEmpresa: '', contacto: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track('lead_form_submit', { hasName: !!form.nombreOEmpresa });
    toast.success('¡Gracias! Te contactamos por WhatsApp muy pronto.');
    setForm({ nombreOEmpresa: '', contacto: '' });
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-bg py-16 md:py-24 pb-28 md:pb-24">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-40" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow text-center">Cómo trabajamos</p>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
            {PASOS.map((p) => (
              <div key={p.t} className="rounded-2xl border border-line bg-bg-elevated p-5 text-center shadow-card transition-transform hover:-translate-y-0.5">
                <span className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
                  <p.icon size={16} />
                </span>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">{p.t}</h3>
                <p className="mt-1 text-[13px] text-ink-3">{p.d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 rounded-3xl border border-line bg-ink p-8 text-white md:grid-cols-[1.05fr_1fr] md:p-12">
            <div>
              <h2 className="text-[26px] font-bold md:text-[34px]">
                ¿Qué proceso de tu empresa quieres automatizar primero?
              </h2>
              <p className="mt-3 text-[15px] text-white/70">
                Cuéntanos qué proceso quieres mejorar y te damos una primera orientación — sin costo y sin compromiso.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink('Hola, quiero automatizar un proceso de mi empresa. ¿Me pueden orientar?')}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('whatsapp_click', { place: 'cta' })}
                  className="btn btn-wa"
                >
                  <WhatsAppIcon size={18} /> Hablar por WhatsApp
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('calendly_click', { place: 'cta' })}
                  className="btn btn-ghost"
                >
                  <CalendarClock size={17} /> Agendar llamada
                </a>
              </div>
              <p className="mt-4 text-[13px] text-white/50">✓ {GUARANTEE}</p>
            </div>

            <form onSubmit={submit} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="text-[13px] text-white/60">¿Prefieres que te contactemos? (opcional)</p>
              <div className="mt-3 space-y-2.5">
                {[
                  { k: 'nombreOEmpresa', ph: 'Nombre o empresa' },
                  { k: 'contacto', ph: 'WhatsApp o correo' },
                ].map((f) => (
                  <input
                    key={f.k}
                    value={form[f.k as keyof typeof form]}
                    onChange={(e) => setForm((s) => ({ ...s, [f.k]: e.target.value }))}
                    placeholder={f.ph}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none placeholder:text-white/40 focus:border-accent"
                  />
                ))}
              </div>
              <button type="submit" className="btn btn-wa mt-3 w-full">
                Solicitar diagnóstico
              </button>
              <p className="mt-2 text-center text-[11px] text-white/40">Sin campos obligatorios.</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
