import { motion } from 'framer-motion';

type Variant = 'chat' | 'voice' | 'flow' | 'dashboard' | 'custom';

const ACCENTS = ['#3B6EA5', '#4F6FD8', '#2D8B8B', '#5B6EA5', '#3B6EA5'];

export function ServiceMockup({ variant, index = 0 }: { variant: Variant; index?: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  if (variant === 'chat') {
    return (
      <div className="mt-4 rounded-lg border border-line bg-bg-alt p-3">
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-ink px-2.5 py-1.5 text-[10px] text-white">
            ¿Tienen disponible el producto?
          </div>
        </div>
        <div className="mt-2 flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-bg-elevated px-2.5 py-1.5 text-[10px] text-ink-2 shadow-sm">
            Sí, te agendo una cita hoy. ¿Mañana 10am?
          </div>
        </div>
        <span className="badge-demo mt-2 inline-block">DEMO</span>
      </div>
    );
  }

  if (variant === 'voice') {
    return (
      <div className="mt-4 flex h-16 items-end justify-center gap-1 rounded-lg border border-line bg-bg-alt px-4 pb-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full"
            style={{ backgroundColor: accent }}
            animate={{ height: [8, 12 + (i % 5) * 6, 8] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.04 }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'flow') {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-line bg-bg-alt p-4">
        {['Pedido', 'IA', 'CRM'].map((l, i) => (
          <div key={l} className="flex items-center gap-2">
            <div
              className="rounded-lg border px-2 py-1 text-[10px] font-medium"
              style={{ borderColor: accent, color: accent }}
            >
              {l}
            </div>
            {i < 2 && <span className="text-ink-3">→</span>}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-bg-alt p-3">
        {['↑12%', '↓8%', '+24'].map((m) => (
          <div key={m} className="rounded-md bg-bg-elevated p-2 text-center text-[11px] font-bold text-accent">
            {m}
          </div>
        ))}
        <p className="col-span-3 text-center text-[9px] text-ink-3">Simulación</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-dashed border-accent/40 bg-accent-soft/30 p-4 text-center text-[11px] text-accent">
      Sistema a la medida
    </div>
  );
}
