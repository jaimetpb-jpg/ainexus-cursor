export type Sector = 'logistica' | 'manufactura' | 'finanzas' | 'salud' | 'inmobiliaria' | 'construccion';

export type EventTone = 'ok' | 'warn' | 'crit' | 'info';

export type LiveEvent = {
  id: number;
  time: string;
  tone: EventTone;
  text: string;
  agent: string;
};

export type AiAgent = {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'watch' | 'alert';
  task: string;
};

export function fmtTime(d = new Date()) {
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export const TONE_DOT: Record<EventTone, string> = {
  ok: 'bg-[#46d08a] shadow-[0_0_8px_#46d08a]',
  warn: 'bg-[#f2b33d] shadow-[0_0_8px_#f2b33d]',
  crit: 'bg-[#ff5765] shadow-[0_0_8px_#ff5765]',
  info: 'bg-[#3fd0e8] shadow-[0_0_8px_#3fd0e8]',
};

export const TONE_CHIP: Record<EventTone, string> = {
  ok: 'border-[#46d08a]/30 bg-[#46d08a]/10 text-[#46d08a]',
  warn: 'border-[#f2b33d]/30 bg-[#f2b33d]/10 text-[#f2b33d]',
  crit: 'border-[#ff5765]/35 bg-[#ff5765]/12 text-[#ff5765]',
  info: 'border-[#3fd0e8]/30 bg-[#3fd0e8]/10 text-[#3fd0e8]',
};
