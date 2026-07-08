import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap } from 'lucide-react';

export type FlowNode = { paso: string; detalle: string };

export function FlowDiagram({ steps, activeIndex = -1 }: { steps: FlowNode[]; activeIndex?: number }) {
  const cols = Math.min(steps.length, 3);

  return (
    <div
      className="relative overflow-x-auto rounded-xl border border-line bg-bg-alt/50 p-4 md:p-6"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Desktop: fila conectada */}
      <div className="hidden items-stretch gap-0 md:flex">
        {steps.map((s, i) => {
          const lit = activeIndex < 0 || i <= activeIndex;
          const isTrigger = i === 0;
          return (
            <div key={`${s.paso}-${i}`} className="flex min-w-0 flex-1 items-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`relative flex-1 rounded-xl border p-3 transition-colors ${
                  lit ? 'border-accent/40 bg-bg-elevated shadow-card' : 'border-line bg-bg-elevated/60 opacity-60'
                }`}
              >
                {isTrigger && (
                  <span className="mb-2 inline-flex items-center gap-1 rounded-md bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">
                    <Zap size={10} /> Trigger
                  </span>
                )}
                <p className="text-[13px] font-semibold leading-snug text-ink">{s.paso}</p>
                <p className="mt-1 text-[11px] text-ink-3">{s.detalle}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex shrink-0 flex-col items-center px-1" aria-hidden>
                  <div className="h-px w-6 bg-accent/50" />
                  <ArrowRight size={14} className="text-accent/70" />
                  <div className="h-px w-6 bg-accent/50" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: grid con flechas */}
      <div
        className="grid gap-3 md:hidden"
        style={{ gridTemplateColumns: `repeat(${Math.min(2, cols)}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => {
          const lit = activeIndex < 0 || i <= activeIndex;
          const isTrigger = i === 0;
          const showDown = i < steps.length - 1 && (i + 1) % 2 === 0;
          return (
            <div key={`m-${s.paso}-${i}`} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-xl border p-3 ${
                  lit ? 'border-accent/40 bg-bg-elevated shadow-card' : 'border-line bg-bg-elevated/60 opacity-60'
                }`}
              >
                {isTrigger && (
                  <span className="mb-2 inline-flex items-center gap-1 rounded-md bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">
                    <Zap size={10} /> Trigger
                  </span>
                )}
                <p className="text-[13px] font-semibold leading-snug text-ink">{s.paso}</p>
                <p className="mt-1 text-[11px] text-ink-3">{s.detalle}</p>
              </motion.div>
              {i < steps.length - 1 && i % 2 === 0 && (
                <ArrowRight size={14} className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-accent/60" />
              )}
              {showDown && (
                <ChevronDown size={16} className="mx-auto mt-1 text-accent/50" />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-ink-3">
        Flujo demostrativo · <span className="badge-demo inline-block">ejemplo</span>
      </p>
    </div>
  );
}

/** L1–L4 maturity strip (Relevance-inspired) */
export function MaturityStrip({ level = 3 }: { level?: number }) {
  const labels = ['Manual', 'Asistido', 'Automatizado', 'Optimizado'];
  return (
    <div className="flex gap-1 rounded-full border border-line bg-bg-alt p-1">
      {labels.map((l, i) => (
        <span
          key={l}
          className={`flex-1 rounded-full px-2 py-1 text-center text-[10px] font-semibold ${
            i + 1 === level ? 'bg-accent text-white' : i + 1 < level ? 'bg-accent-soft text-accent' : 'text-ink-3'
          }`}
        >
          L{i + 1}
        </span>
      ))}
    </div>
  );
}
