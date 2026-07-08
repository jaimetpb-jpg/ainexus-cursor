import { useEffect, useRef, useState } from 'react';
import { Cpu, Gauge, Thermometer, Waves } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';
import { AgentGrid, AlertBanner, EventFeed, GaugeBar, KpiStrip, Panel, PanelTitle } from './shared';

type Machine = {
  id: string;
  name: string;
  image: string;
  health: number;
  temp: number;
  vibration: number;
  pressure: number;
  hoursOn: number;
  nextReview: string;
  power: 'on' | 'off' | 'standby';
  alert?: string;
};

const MFG_AGENTS: AiAgent[] = [
  { id: 'm1', name: 'Agente Vibración', role: 'SHM · OMA', status: 'alert', task: 'CNC-03 · 8.2 mm/s · umbral superado · revisión programada' },
  { id: 'm2', name: 'Agente Térmico', role: 'Temperatura', status: 'watch', task: 'Prensa P2 · 78°C · tendencia al alza · ventilación sugerida' },
  { id: 'm3', name: 'Agente Presión', role: 'Hidráulica', status: 'active', task: 'Línea 1 · 142 bar · dentro de rango operativo' },
  { id: 'm4', name: 'Agente Turnos', role: 'Energía', status: 'active', task: 'Recomienda apagar L4 en 22 min · turno bajo demanda' },
  { id: 'm5', name: 'Agente Predictivo', role: 'Mantenimiento', status: 'active', task: 'CNC-03 revisión en 6 h · refacciones en stock' },
];

const MFG_EVENTS_POOL = [
  { tone: 'crit' as const, text: 'CNC-03 · VIBRACIÓN CRÍTICA · 8.2 mm/s · paro preventivo sugerido', agent: 'Agente Vibración' },
  { tone: 'warn' as const, text: 'PRENSA P2 · TEMP 78°C · revisar lubricación antes del turno noche', agent: 'Agente Térmico' },
  { tone: 'warn' as const, text: 'LÍNEA 4 · APAGADO PROGRAMADO · en 22 min por baja demanda', agent: 'Agente Turnos' },
  { tone: 'info' as const, text: 'ROBOT R1 · 1,240 h operación · salud 94% · sin anomalías', agent: 'Agente Predictivo' },
  { tone: 'ok' as const, text: 'HORNO H1 · presión estable 142 bar · ciclo completado', agent: 'Agente Presión' },
  { tone: 'warn' as const, text: 'CNC-01 · REVISIÓN MAÑANA 06:00 · rodamientos · agenda confirmada', agent: 'Agente Predictivo' },
];

function VibrationChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(Array.from({ length: 100 }, () => 2 + Math.random() * 2));
  const spikeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spikeRef.current += 1;
      const arr = dataRef.current;
      arr.shift();
      let v = 2 + Math.sin(Date.now() / 400) * 1.2 + Math.random() * 0.8;
      if (spikeRef.current % 180 < 8) v = 7.5 + Math.random() * 2;
      arr.push(v);

      ctx.fillStyle = '#0a0f16';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(27,39,53,0.9)';
      for (let y = 0; y < h; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // umbral crítico
      const threshY = h - (7 / 10) * (h - 16) - 8;
      ctx.strokeStyle = 'rgba(255,87,101,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, threshY);
      ctx.lineTo(w, threshY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '500 8px ui-monospace';
      ctx.fillStyle = '#ff5765';
      ctx.fillText('UMBRAL 7.0 mm/s', w - 88, threshY - 4);

      ctx.beginPath();
      arr.forEach((val, i) => {
        const x = (i / (arr.length - 1)) * w;
        const y = h - (val / 10) * (h - 16) - 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = arr[arr.length - 1] > 7 ? '#ff5765' : '#3b6ea5';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '500 8px ui-monospace';
      ctx.fillStyle = '#54667e';
      ctx.fillText(`RMS ${arr[arr.length - 1].toFixed(2)} mm/s · CNC-03 · SIMULACIÓN`, 8, h - 6);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="h-[140px] w-full rounded-lg border border-[#1b2735] md:h-[160px]" aria-label="Vibración en vivo" />;
}

function MachineCard({ m }: { m: Machine }) {
  const powerColor =
    m.power === 'on' ? 'text-[#46d08a]' : m.power === 'standby' ? 'text-[#f2b33d]' : 'text-[#54667e]';
  const health = Math.round(m.health);
  const healthColor = health < 70 ? '#ff5765' : health < 85 ? '#f2b33d' : '#46d08a';

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        m.alert ? 'border-[#ff5765]/35 bg-[#ff5765]/5' : 'border-[#1b2735] bg-[#121a25]'
      }`}
    >
      <div className="relative h-24 overflow-hidden">
        <img
          src={m.image}
          alt={m.name}
          className={`h-full w-full object-cover brightness-95 contrast-105 ${m.id === 'CNC-03' ? 'object-[center_30%] scale-105' : ''}`}
          loading="lazy"
          onError={(e) => onImgError(e, m.image.replace('.webp', '.png'))}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121a25] via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2">
          <p className="font-mono text-[11px] font-bold text-white drop-shadow">{m.id}</p>
          <p className="text-[10px] text-white/80">{m.name}</p>
        </div>
        <span className={`absolute right-2 top-2 font-mono text-[8px] font-bold uppercase ${powerColor}`}>
          {m.power === 'on' ? 'ON' : m.power === 'standby' ? 'STBY' : 'OFF'}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold" style={{ color: healthColor }}>
            {health}%
          </span>
          <span className="font-mono text-[9px] text-[#54667e]">salud · monitoreo IA</span>
        </div>

        <div className="mt-3 space-y-2">
          <GaugeBar label="Temperatura" value={m.temp} max={m.temp > 200 ? 500 : 100} unit="°C" warnAt={m.temp > 200 ? 400 : 70} critAt={m.temp > 200 ? 450 : 85} />
          <GaugeBar label="Vibración" value={m.vibration} max={10} unit=" mm/s" warnAt={5} critAt={7} />
          {m.pressure > 0 && (
            <GaugeBar label="Presión" value={m.pressure} max={200} unit=" bar" warnAt={170} critAt={185} />
          )}
        </div>

        <div className="mt-2 flex justify-between font-mono text-[9px] text-[#54667e]">
          <span>{m.hoursOn.toLocaleString()} h operando</span>
          <span>Revisión: {m.nextReview}</span>
        </div>

        {m.alert && (
          <p className="mt-2 rounded border border-[#ff5765]/30 bg-[#ff5765]/10 px-2 py-1 font-mono text-[9px] text-[#ff5765]">
            {m.alert}
          </p>
        )}
      </div>
    </div>
  );
}

export function ManufacturingPanel() {
  const [machines, setMachines] = useState<Machine[]>([
    { id: 'CNC-01', name: 'Centro mecanizado', image: OPS_IMAGES.mfg.cnc, health: 91, temp: 54, vibration: 3.1, pressure: 138, hoursOn: 8420, nextReview: '06:00 mañana', power: 'on' },
    { id: 'CNC-03', name: 'Torno CNC', image: OPS_IMAGES.mfg.cnc, health: 62, temp: 71, vibration: 8.2, pressure: 145, hoursOn: 12100, nextReview: 'EN 6 H', power: 'on', alert: 'REVISIÓN URGENTE · vibración crítica' },
    { id: 'PRENSA P2', name: 'Prensa hidráulica', image: OPS_IMAGES.mfg.press, health: 78, temp: 78, vibration: 4.8, pressure: 152, hoursOn: 6800, nextReview: 'Turno noche', power: 'on', alert: 'Temperatura elevada · lubricar' },
    { id: 'HORNO H1', name: 'Horno industrial', image: OPS_IMAGES.mfg.furnace, health: 88, temp: 420, vibration: 1.2, pressure: 142, hoursOn: 15200, nextReview: '15 días', power: 'on' },
    { id: 'ROBOT R1', name: 'Brazo robótico', image: OPS_IMAGES.mfg.robot, health: 94, temp: 38, vibration: 0.9, pressure: 0, hoursOn: 1240, nextReview: '30 días', power: 'on' },
    { id: 'LÍNEA 4', name: 'Ensamble final', image: OPS_IMAGES.mfg.assembly, health: 85, temp: 42, vibration: 2.4, pressure: 0, hoursOn: 3200, nextReview: '—', power: 'standby', alert: 'Apagado en 22 min · turno bajo' },
  ]);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    setEvents([
      { id: 1, time: fmtTime(), ...MFG_EVENTS_POOL[0], tone: MFG_EVENTS_POOL[0].tone },
      { id: 2, time: fmtTime(new Date(Date.now() - 10000)), ...MFG_EVENTS_POOL[1], tone: MFG_EVENTS_POOL[1].tone },
    ]);
    eventId.current = 2;
    const id = setInterval(() => {
      setMachines((prev) =>
        prev.map((m) => ({
          ...m,
          temp: Math.round(Math.max(20, m.temp + (Math.random() - 0.5) * 2) * 10) / 10,
          vibration:
            m.id === 'CNC-03'
              ? Math.round((7.5 + Math.random() * 1.5) * 10) / 10
              : Math.round(Math.max(0.5, m.vibration + (Math.random() - 0.5) * 0.4) * 10) / 10,
          pressure:
            m.pressure > 0 ? Math.round(Math.max(120, m.pressure + (Math.random() - 0.5) * 3) * 10) / 10 : 0,
          health:
            m.id === 'CNC-03'
              ? Math.round(58 + Math.random() * 8)
              : Math.round(Math.min(99, m.health + (Math.random() - 0.5) * 2)),
        }))
      );
      const ev = MFG_EVENTS_POOL[Math.floor(Math.random() * MFG_EVENTS_POOL.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const avgHealth = Math.round(machines.reduce((s, m) => s + m.health, 0) / machines.length);
  const maxVib = Math.max(...machines.map((m) => m.vibration));
  const reviewsDue = machines.filter((m) => m.alert).length;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-[#3b6ea5]/30">
        <img
          src={OPS_IMAGES.mfg.smartFactory}
          alt=""
          className="h-40 w-full object-cover md:h-44"
          onError={(e) => onImgError(e, OPS_IMAGES.mfg.smartFactoryFb)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16]/80 via-[#0a0f16]/35 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <p className="font-mono text-[11px] font-bold text-white">Planta inteligente · Industry 4.0 · gemelo digital</p>
          <p className="font-mono text-[9px] text-[#7eb3e8]">Sensores IoT · OPC-UA · MQTT · SIMULACIÓN</p>
        </div>
      </div>

      <KpiStrip
        items={[
          { label: 'Máquinas activas', value: `${machines.filter((m) => m.power === 'on').length}/6`, sub: 'monitoreo continuo' },
          { label: 'Salud promedio', value: `${avgHealth}%`, sub: 'índice fusionado IA', alert: avgHealth < 75 },
          { label: 'Temp máxima', value: '420°C', sub: 'Horno H1 · normal' },
          { label: 'Vibración máx', value: `${maxVib.toFixed(1)} mm/s`, sub: 'CNC-03 · crítico', alert: maxVib > 7 },
          { label: 'Horas operación', value: '45.2k', sub: 'acumulado planta' },
          { label: 'Revisiones', value: String(reviewsDue), sub: 'requieren atención', alert: reviewsDue > 0 },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelTitle tag="CNC-03 · turno actual">
            <span className="flex items-center gap-2">
              <Waves size={13} className="text-[#ff5765]" /> Vibración en tiempo real
            </span>
          </PanelTitle>
          <VibrationChart />
          <div className="mt-3 grid grid-cols-4 gap-2 font-mono text-[9px]">
            <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
              <p className="text-[#54667e]">RMS</p>
              <p className="text-lg font-bold text-[#ff5765]">8.2</p>
            </div>
            <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
              <p className="text-[#54667e]">PICO</p>
              <p className="text-lg font-bold text-[#f2b33d]">11.4</p>
            </div>
            <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
              <p className="text-[#54667e]">f DOM</p>
              <p className="text-lg font-bold text-[#3fd0e8]">42 Hz</p>
            </div>
            <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
              <p className="text-[#54667e]">Estado</p>
              <p className="text-sm font-bold text-[#ff5765]">ALERTA</p>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelTitle>Turnos · encendido / apagado</PanelTitle>
          <div className="space-y-2">
            {[
              { turn: 'Turno 1 · 06:00–14:00', status: 'Completado', machines: '6/6 encendidas', tone: 'ok' as const },
              { turn: 'Turno 2 · 14:00–22:00', status: 'En curso', machines: '5/6 activas · L4 standby', tone: 'info' as const },
              { turn: 'Turno 3 · 22:00–06:00', status: 'Programado', machines: 'Apagar L4 · mantener H1', tone: 'warn' as const },
            ].map((t) => (
              <div key={t.turn} className="rounded-lg border border-[#1b2735] bg-[#121a25] p-3">
                <p className="font-mono text-[10px] font-bold text-white">{t.turn}</p>
                <p className="mt-1 text-[10px] text-[#8295ad]">{t.machines}</p>
                <p className="mt-1 font-mono text-[9px] text-[#54667e]">{t.status}</p>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <AlertBanner tone="warn">Agente Turnos · apagar LÍNEA 4 en 22 min · demanda baja · ahorro energía</AlertBanner>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle tag="temperatura · vibración · presión · horas">
          <span className="flex items-center gap-2">
            <Cpu size={13} className="text-[#7eb3e8]" /> Salud de máquinas · monitoreo predictivo
          </span>
        </PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((m) => (
            <MachineCard key={m.id} m={m} />
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle tag="5 agentes activos">
            <span className="flex items-center gap-2">
              <Gauge size={13} className="text-[#46d08a]" /> Agentes IA · planta
            </span>
          </PanelTitle>
          <AgentGrid agents={MFG_AGENTS} />
        </Panel>

        <Panel>
          <PanelTitle>
            <span className="flex items-center gap-2">
              <Thermometer size={13} className="text-[#f2b33d]" /> Alertas de revisión
            </span>
          </PanelTitle>
          <div className="space-y-2">
            <AlertBanner tone="crit">CNC-03 · REVISIÓN URGENTE · rodamientos · vibración 8.2 mm/s</AlertBanner>
            <AlertBanner tone="warn">PRENSA P2 · lubricación · temp 78°C antes turno noche</AlertBanner>
            <AlertBanner tone="info">CNC-01 · revisión programada mañana 06:00 · agenda confirmada</AlertBanner>
            <AlertBanner tone="ok">HORNO H1 · presión estable · sin intervención requerida</AlertBanner>
          </div>
          <div className="mt-4">
            <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
            <EventFeed events={events} />
          </div>
        </Panel>
      </div>

      <AlertBanner tone="crit">
        VEREDICTO · 1 MÁQUINA EN ALERTA CRÍTICA (CNC-03) · paro preventivo recomendado · SIMULACIÓN
      </AlertBanner>
    </div>
  );
}
