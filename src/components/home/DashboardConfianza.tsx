import { Reveal } from '@/components/shared/Reveal';

import { ShieldCheck, Lock, ScrollText } from 'lucide-react';

import { GUARANTEE } from '@/lib/site';

import { OperationsConsole } from '@/components/home/OperationsConsole';



export function DashboardConfianza() {

  return (

    <section id="dashboard" className="relative border-b border-line bg-bg-alt py-16 md:py-24">

      <div className="container-x relative">

        <Reveal>

          <p className="eyebrow">Demo en vivo</p>

          <h2 className="mt-2 max-w-2xl text-[28px] font-bold text-ink md:text-[40px]">
            Mega dashboards por industria: control absoluto con agentes IA y automatización.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-ink-2">
            Logística y manufactura · Finanzas con antifraude y cobranza IA · Salud con vitales en vivo y alerta a médicos ·
            Inmobiliaria con prospección MCP y análisis de terrenos · Construcción con cámaras IA y supervisión de obra.
            <span className="badge-demo ml-2">simulación</span>
          </p>

        </Reveal>



        <Reveal>

          <div className="mt-9">

            <OperationsConsole />

          </div>

        </Reveal>



        <div className="mt-10 grid gap-4 md:grid-cols-3">

          {[

            { icon: ShieldCheck, t: 'Supervisión humana', d: 'La IA ejecuta y se monitorea sola. Tú decides dónde actúa sola y dónde interviene tu equipo.' },

            { icon: Lock, t: 'Seguridad y datos', d: 'Cada automatización queda protegida y con accesos por rol. Tus datos en tu propio servidor.' },

            { icon: ScrollText, t: 'Trazabilidad total', d: 'Todo queda registrado: qué hizo la IA, cuándo y con qué resultado.' },

          ].map((c, i) => (

            <Reveal key={c.t} delay={i * 0.06}>

              <div className="card h-full p-6">

                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">

                  <c.icon size={20} />

                </span>

                <h3 className="mt-4 text-[16px] font-semibold text-ink">{c.t}</h3>

                <p className="mt-1.5 text-[14px] text-ink-2">{c.d}</p>

              </div>

            </Reveal>

          ))}

        </div>



        <Reveal>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-line bg-white px-5 py-4 text-sm font-medium text-ink-2">

            <span>✓ {GUARANTEE}</span>

          </div>

        </Reveal>

      </div>

    </section>

  );

}


