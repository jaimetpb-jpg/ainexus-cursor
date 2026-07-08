import type { ReactNode } from 'react';
import { Bot, Zap, AlertTriangle } from 'lucide-react';
import type { AiAgent, EventTone, LiveEvent } from './types';
import { TONE_DOT } from './types';

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`ops-panel-live rounded-xl border border-[#1b2735] bg-gradient-to-b from-[#0e141d] to-[#0b1119] p-4 ${className}`}>
      {children}
    </div>
  );
}

/** Indicador pulsante — sensación de sistema en vivo */
export function LiveIndicator({ label = 'LIVE', color = '#46d08a' }: { label?: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold" style={{ color }}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ backgroundColor: color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      </span>
      {label}
    </span>
  );
}

export function PanelTitle({ children, tag }: { children: ReactNode; tag?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8295ad]">{children}</h3>
      {tag && <span className="font-mono text-[9px] text-[#54667e]">{tag}</span>}
    </div>
  );
}

export function KpiStrip({ items }: { items: { label: string; value: string; sub?: string; alert?: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((k) => (
        <div
          key={k.label}
          className={`rounded-xl border bg-gradient-to-b from-[#0e141d] to-[#0b1119] p-3 ${
            k.alert ? 'border-[#ff5765]/40' : 'border-[#1b2735]'
          }`}
        >
          <p className="font-mono text-[8px] uppercase tracking-wider text-[#54667e]">{k.label}</p>
          <p className={`mt-1 font-mono text-xl font-bold tracking-tight md:text-2xl ${k.alert ? 'text-[#ff5765]' : 'text-white'}`}>
            {k.value}
          </p>
          {k.sub && <p className="mt-0.5 font-mono text-[9px] text-[#54667e]">{k.sub}</p>}
          {!k.alert && (
            <span className="mt-1.5 inline-block h-px w-8 animate-ops-breathe bg-[#3b6ea5]/40" />
          )}
        </div>
      ))}
    </div>
  );
}

export function EventFeed({ events }: { events: LiveEvent[] }) {
  return (
    <div className="max-h-[300px] space-y-0 overflow-y-auto">
      {events.map((ev) => (
        <div key={ev.id} className="flex gap-2 border-b border-[#1b2735] py-2.5 text-[12px] last:border-0">
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[ev.tone]}`} />
          <div className="min-w-0 flex-1">
            <p className="leading-snug text-[#c3d0e0]">{ev.text}</p>
            <p className="mt-1 font-mono text-[9px] text-[#54667e]">
              {ev.time}
              <span className="ml-2 rounded border border-[#1b2735] bg-[#0a0f16] px-1.5 py-0.5">{ev.agent}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AgentGrid({ agents }: { agents: AiAgent[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 2xl:grid-cols-6">
      {agents.map((a) => (
        <div
          key={a.id}
          className={`rounded-lg border p-2.5 ${
            a.status === 'alert'
              ? 'border-[#ff5765]/35 bg-[#ff5765]/5'
              : a.status === 'watch'
                ? 'border-[#f2b33d]/30 bg-[#f2b33d]/5'
                : 'border-[#1b2735] bg-[#121a25]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`grid h-8 w-8 place-items-center rounded-lg border ${
                a.status === 'alert'
                  ? 'border-[#ff5765]/40 bg-[#ff5765]/10 text-[#ff5765]'
                  : 'border-[#3b6ea5]/30 bg-[#3b6ea5]/10 text-[#7eb3e8]'
              }`}
            >
              {a.status === 'alert' ? <AlertTriangle size={14} /> : <Bot size={14} />}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold">{a.name}</p>
              <p className="font-mono text-[8px] text-[#54667e]">{a.role}</p>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-[10px] leading-snug text-[#8295ad]">{a.task}</p>
          <p className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-[#46d08a]">
            <Zap size={8} /> {a.status === 'alert' ? 'escalado' : a.status === 'watch' ? 'vigilando' : 'activo'}
          </p>
        </div>
      ))}
    </div>
  );
}

export function GaugeBar({
  label,
  value,
  max,
  unit,
  warnAt,
  critAt,
  direction = 'low',
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  warnAt?: number;
  critAt?: number;
  /** 'low' = alert when value rises (higher is worse); 'high' = alert when value drops (higher is better) */
  direction?: 'high' | 'low';
}) {
  const pct = Math.min(100, (value / max) * 100);
  const color =
    critAt !== undefined && (direction === 'high' ? value <= critAt : value >= critAt)
      ? '#ff5765'
      : warnAt !== undefined && (direction === 'high' ? value <= warnAt : value >= warnAt)
        ? '#f2b33d'
        : '#3b6ea5';
  return (
    <div>
      <div className="flex justify-between font-mono text-[9px]">
        <span className="text-[#54667e]">{label}</span>
        <span style={{ color }}>
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function AlertBanner({ tone, children }: { tone: EventTone; children: ReactNode }) {
  const styles: Record<EventTone, string> = {
    ok: 'border-[#46d08a]/30 bg-[#46d08a]/8 text-[#46d08a]',
    warn: 'border-[#f2b33d]/30 bg-[#f2b33d]/8 text-[#f2b33d]',
    crit: 'border-[#ff5765]/35 bg-[#ff5765]/10 text-[#ff5765]',
    info: 'border-[#3b6ea5]/30 bg-[#3b6ea5]/10 text-[#7eb3e8]',
  };
  return (
    <div className={`rounded-lg border px-3 py-2 font-mono text-[10px] font-semibold ${styles[tone]}`}>{children}</div>
  );
}
