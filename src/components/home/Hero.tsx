import { useRef, useState } from 'react';
import { LayoutDashboard, Mic, Play, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { VoiceDemoButton } from '@/components/shared/VoiceDemoButton';
import { GUARANTEE, waLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { scrollToDashboardSector } from '@/lib/dashboardNav';
import { agentReply, GREETING, AGENT_QUICK_REPLIES, type ChatMsg } from '@/data/agentDemo';
import { HeroVideoBackground } from '@/components/home/HeroSlideshow';
import type { Sector } from '@/components/home/ops/types';

const QUICK_SECTORS: { id: Sector; label: string }[] = [
  { id: 'logistica', label: 'Logística' },
  { id: 'manufactura', label: 'Manufactura' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'salud', label: 'Salud' },
  { id: 'inmobiliaria', label: 'Inmobiliaria' },
  { id: 'construccion', label: 'Construcción' },
];

const VOICE_SCRIPT =
  'Hola, buenos días. Gracias por llamar a AI Nexus. ¿Le parece bien si agendamos una cita? ¿Qué día y horario le facilita más? Por ejemplo, ¿le acomoda mañana por la mañana o prefiere por la tarde?';

type DemoTab = 'whatsapp' | 'voz';

export function Hero() {
  const [tab, setTab] = useState<DemoTab>('whatsapp');
  const [msgs, setMsgs] = useState<ChatMsg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setInput('');
    setMsgs((m) => [...m, { from: 'user', text: clean }]);
    track('demo_hero_send', { text: clean.slice(0, 40) });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: agentReply(clean) }]);
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 850);
  };

  const goDashboard = () => {
    track('hero_dashboard_click', {});
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goVoice = () => {
    setTab('voz');
    track('hero_voice_tab', {});
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-line bg-ink">
      <HeroVideoBackground />

      <div className="container-x relative z-10 flex min-h-[100dvh] flex-col justify-center py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles size={14} className="text-[#7eb3e8]" /> Agencia de IA · México
            </span>

            <h1 className="mt-5 text-[32px] font-bold leading-[1.05] text-white sm:text-[42px] lg:text-[48px]">
              Tu empresa atiende, vende y opera{' '}
              <span className="text-[#7eb3e8]">24/7 con agentes IA</span>
            </h1>

            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/85">
              WhatsApp, voz, automatizaciones y dashboards conectados a lo que ya usas. Prueba el agente o entra al demo en un clic.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={goDashboard} className="btn bg-accent text-white hover:bg-accent/90">
                <LayoutDashboard size={18} /> Ver dashboard en vivo
              </button>
              <button
                type="button"
                onClick={goVoice}
                className="btn border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Play size={16} fill="currentColor" /> Escuchar agente de voz
              </button>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_click', { place: 'hero' })}
                className="btn btn-wa"
              >
                <WhatsAppIcon size={18} /> Agendar por WhatsApp
              </a>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[13px] text-white/55">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#7eb3e8]" />
              {GUARANTEE}
            </p>
          </div>

          <div ref={demoRef} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={goDashboard}
                className="group rounded-xl border-2 border-[#3b6ea5]/60 bg-[#3b6ea5]/20 p-4 text-left backdrop-blur-md transition-all hover:border-[#7eb3e8] hover:bg-[#3b6ea5]/35"
              >
                <LayoutDashboard size={22} className="text-[#7eb3e8]" />
                <p className="mt-2 text-sm font-bold text-white">Dashboard LIVE</p>
                <p className="mt-1 text-[11px] text-white/60">6 sectores · mapa · planta · fraude</p>
                <span className="mt-2 inline-block rounded bg-[#46d08a]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#46d08a]">
                  1 CLIC → DEMO
                </span>
              </button>
              <button
                type="button"
                onClick={goVoice}
                className="group rounded-xl border-2 border-white/25 bg-white/10 p-4 text-left backdrop-blur-md transition-all hover:border-[#7eb3e8]/60 hover:bg-white/15"
              >
                <div className="flex items-center gap-2">
                  <Play size={20} className="text-[#7eb3e8]" fill="currentColor" />
                  <Mic size={18} className="text-[#7eb3e8]/70" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">Voz IA · NexusVox</p>
                <p className="mt-1 text-[11px] text-white/60">Agenda citas y pregunta horario</p>
                <span className="mt-2 inline-block rounded bg-white/15 px-2 py-0.5 font-mono text-[9px] font-bold text-white/80">
                  ESCÚCHALO
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/15 bg-[#141414]/95 shadow-2xl backdrop-blur-md">
              <div className="flex border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setTab('whatsapp')}
                  className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                    tab === 'whatsapp' ? 'border-b-2 border-whatsapp bg-white/5 text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <WhatsAppIcon size={14} /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setTab('voz')}
                  className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                    tab === 'voz' ? 'border-b-2 border-[#7eb3e8] bg-white/5 text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Mic size={14} /> Voz
                </button>
              </div>

              {tab === 'whatsapp' ? (
                <>
                  <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp text-[#06301a]">
                      <WhatsAppIcon size={14} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">Agente WhatsApp</p>
                      <p className="flex items-center gap-1 text-[10px] text-white/50">
                        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" /> en línea · DEMO
                      </p>
                    </div>
                  </div>

                  <div ref={scrollRef} className="h-[148px] space-y-2 overflow-y-auto px-3 py-3" aria-live="polite">
                    {msgs.map((m, i) => (
                      <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                        <div
                          className={
                            m.from === 'user'
                              ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-1.5 text-[12px] text-white'
                              : 'max-w-[88%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-1.5 text-[12px] text-white/90'
                          }
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex gap-1 px-2 py-2">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white/40" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 border-t border-white/10 px-2 py-1.5">
                    {AGENT_QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70 hover:border-accent hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      send(input);
                    }}
                    className="flex gap-2 border-t border-white/10 px-2 py-2"
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Prueba: Quiero agendar una cita…"
                      className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/35"
                    />
                    <button type="submit" aria-label="Enviar" className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white">
                      <Send size={14} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="px-4 py-5">
                  <p className="text-xs font-semibold text-[#7eb3e8]">NexusVox · Asistente telefónico · es-MX</p>
                  <p className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] leading-relaxed text-white/90">
                    &ldquo;{VOICE_SCRIPT}&rdquo;
                  </p>
                  <VoiceDemoButton className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent/90" />
                  <p className="mt-3 text-center font-mono text-[10px] text-white/45">SIMULACIÓN · mismo flujo que WhatsApp</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="w-full text-[10px] font-bold uppercase tracking-wider text-white/45">Ir al dashboard:</span>
              {QUICK_SECTORS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToDashboardSector(s.id)}
                  className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75 backdrop-blur-sm transition-colors hover:border-[#7eb3e8] hover:text-white"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
