import { useEffect, useRef, useState } from 'react';
import { Activity, FlaskConical, HeartPulse, Monitor, Stethoscope, Syringe, Users } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { AgentGrid, AlertBanner, EventFeed, GaugeBar, KpiStrip, Panel, PanelTitle } from './shared';
import { SectorPhotoGrid } from './SectorPhotoGrid';
import { VitalsAIMonitor } from './visuals/VitalsAIMonitor';
import { Render3DShowcase } from './visuals/Render3DShowcase';
import { OPS_PHOTO_SETS, RENDER_3D_SETS } from '@/lib/opsImages';

const SALUD_AGENTS: AiAgent[] = [
  { id: 's0', name: 'Agente Vitales', role: 'Monitoreo 24/7', status: 'alert', task: 'Signos vitales en vivo · alerta automática a médicos · URG-442 escalado' },
  { id: 's1', name: 'Agente Citas', role: 'Agenda', status: 'active', task: '142 citas hoy · 8 reprogramaciones · recordatorios WhatsApp enviados' },
  { id: 's2', name: 'Agente Triage', role: 'Urgencias', status: 'watch', task: 'Cola Urgencias · 4 pacientes · tiempo espera 28 min · priorizando' },
  { id: 's3', name: 'Agente Laboratorio', role: 'LIS', status: 'active', task: '67 muestras en proceso · 12 resultados listos · notificación automática' },
  { id: 's4', name: 'Agente Farmacia', role: 'Dispensación', status: 'active', task: '23 recetas pendientes · 2 interacciones detectadas · médico alertado' },
  { id: 's5', name: 'Agente Epidemiología', role: 'Prevención', status: 'watch', task: 'Vigilancia epidemiológica · 3 patrones detectados · protocolo preventivo activo' },
];

const SALUD_EVENTS_POOL = [
  { tone: 'crit' as const, text: 'VITALES · URG-442 · SpO2 88% · Agente Vitales → Dr. López alertado en 38s', agent: 'Agente Vitales' },
  { tone: 'crit' as const, text: 'TRIAGE · Paciente URG-442 · escalado a médico de guardia', agent: 'Agente Triage' },
  { tone: 'warn' as const, text: 'LAB · Muestra LAB-8821 · hemograma crítico · médico notificado vía app', agent: 'Agente Laboratorio' },
  { tone: 'warn' as const, text: 'EPIDEMIO · 3 casos similares · zona Polanco · vigilancia reforzada', agent: 'Agente Epidemiología' },
  { tone: 'info' as const, text: 'CITAS · Dr. Martínez · slot 15:30 liberado · lista de espera notificada', agent: 'Agente Citas' },
  { tone: 'ok' as const, text: 'FARMACIA · Receta RX-9912 · dispensada · inventario actualizado', agent: 'Agente Farmacia' },
  { tone: 'info' as const, text: 'FACTURACIÓN · GNP-442 · autorización aprobada · $18,400 cubiertos', agent: 'Agente Facturación' },
];

type Appointment = {
  time: string;
  patient: string;
  doctor: string;
  type: string;
  status: string;
  tone: 'ok' | 'warn' | 'crit';
};

const APPOINTMENTS: Appointment[] = [
  { time: '14:00', patient: 'María G. · 42a', doctor: 'Dr. Hernández', type: 'Consulta general', status: 'En sala', tone: 'ok' },
  { time: '14:30', patient: 'Carlos R. · 67a', doctor: 'Dra. López', type: 'Cardiología', status: 'Retraso 12m', tone: 'warn' },
  { time: '15:00', patient: 'Ana P. · 8a', doctor: 'Dr. Ruiz', type: 'Pediatría', status: 'Confirmada', tone: 'ok' },
  { time: '15:30', patient: 'URG-442', doctor: 'Urgencias', type: 'Triage nivel 2', status: 'Prioridad', tone: 'crit' },
  { time: '16:00', patient: 'Roberto M. · 55a', doctor: 'Dr. Vega', type: 'Laboratorio', status: 'Muestra enviada', tone: 'ok' },
];

type LabSample = { id: string; test: string; patient: string; eta: string; status: string; tone: 'ok' | 'warn' | 'crit' };

const LAB_QUEUE: LabSample[] = [
  { id: 'LAB-8821', test: 'Hemograma completo', patient: 'Carlos R.', eta: '14:45', status: 'Crítico', tone: 'crit' },
  { id: 'LAB-8822', test: 'Perfil lipídico', patient: 'María G.', eta: '15:10', status: 'En proceso', tone: 'ok' },
  { id: 'LAB-8823', test: 'PCR · Influenza', patient: 'Ana P.', eta: '15:30', status: 'En proceso', tone: 'ok' },
  { id: 'LAB-8824', test: 'Glucosa + HbA1c', patient: 'Roberto M.', eta: '16:00', status: 'Pendiente', tone: 'warn' },
];

function BedOccupancy() {
  const beds = [
    { ward: 'UCI', occupied: 8, total: 10 },
    { ward: 'Hospitalización A', occupied: 22, total: 28 },
    { ward: 'Hospitalización B', occupied: 18, total: 24 },
    { ward: 'Observación', occupied: 6, total: 8 },
  ];
  return (
    <div className="space-y-2">
      {beds.map((b) => {
        const pct = Math.round((b.occupied / b.total) * 100);
        const color = pct >= 90 ? '#ff5765' : pct >= 75 ? '#f2b33d' : '#46d08a';
        return (
          <div key={b.ward}>
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-[#54667e]">{b.ward}</span>
              <span style={{ color }}>
                {b.occupied}/{b.total} · {pct}%
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SaludPanel() {
  const [waitMin, setWaitMin] = useState(28);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    setEvents([
      { id: 1, time: fmtTime(), ...SALUD_EVENTS_POOL[0], tone: SALUD_EVENTS_POOL[0].tone },
      { id: 2, time: fmtTime(new Date(Date.now() - 10000)), ...SALUD_EVENTS_POOL[2], tone: SALUD_EVENTS_POOL[2].tone },
    ]);
    const id = setInterval(() => {
      const ev = SALUD_EVENTS_POOL[Math.floor(Math.random() * SALUD_EVENTS_POOL.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
      setWaitMin((w) => Math.max(12, Math.min(45, w + Math.round((Math.random() - 0.5) * 4))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const occupancy = 82;

  return (
    <div className="space-y-4">
      <KpiStrip
        items={[
          { label: 'Pacientes hoy', value: '187', sub: 'consulta + urgencias' },
          { label: 'Citas activas', value: '142', sub: '8 reprogramadas' },
          { label: 'Tiempo espera', value: `${waitMin} min`, sub: 'promedio urgencias', alert: waitMin > 25 },
          { label: 'Ocupación camas', value: `${occupancy}%`, sub: '54/66 disponibles', alert: occupancy > 80 },
          { label: 'Lab pendientes', value: '67', sub: '12 listos para envío' },
          { label: 'Prevención IA', value: '94%', sub: 'control absoluto activo' },
          { label: 'Alertas vitales', value: '1', sub: 'médico notificado', alert: true },
        ]}
      />

      <Panel className="border-[#3fd0e8]/30 shadow-[0_0_32px_rgba(63,208,232,0.08)]">
        <PanelTitle tag="control absoluto · prevención">
          <span className="flex items-center gap-2">
            <HeartPulse size={13} className="text-[#ff5765]" /> Monitor clínico avanzado · signos vitales → Agente IA → médico
          </span>
        </PanelTitle>
        <VitalsAIMonitor />
      </Panel>

      <Panel className="border-[#3b6ea5]/30">
        <PanelTitle tag="proyecto 3D · preventa">
          <span className="flex items-center gap-2">
            <Monitor size={13} className="text-[#3fd0e8]" /> Desarrollo hospitalario · recorrido virtual 3D
          </span>
        </PanelTitle>
        <Render3DShowcase items={[...RENDER_3D_SETS.salud]} sector="salud" />
      </Panel>

      <Panel>
        <PanelTitle tag="4 áreas · sin LIVE estático">
          <span className="flex items-center gap-2">
            <Monitor size={13} className="text-[#3fd0e8]" /> Instalaciones clínicas en vivo
          </span>
        </PanelTitle>
        <SectorPhotoGrid photos={[...OPS_PHOTO_SETS.health]} cols={4} />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelTitle tag="agenda del día · SIMULACIÓN">
            <span className="flex items-center gap-2">
              <Stethoscope size={13} className="text-[#3fd0e8]" /> Citas y consultas en curso
            </span>
          </PanelTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse font-mono text-[10px]">
              <thead>
                <tr className="border-b border-[#1b2735] text-[#54667e]">
                  <th className="py-2 text-left">Hora</th>
                  <th className="py-2 text-left">Paciente</th>
                  <th className="py-2 text-left">Médico</th>
                  <th className="py-2 text-left">Tipo</th>
                  <th className="py-2 text-right">Estado</th>
                </tr>
              </thead>
              <tbody>
                {APPOINTMENTS.map((a) => (
                  <tr key={a.time + a.patient} className="border-b border-[#1b2735]/60 text-[#c3d0e0]">
                    <td className="py-2 font-semibold text-white">{a.time}</td>
                    <td className="py-2">{a.patient}</td>
                    <td className="py-2">{a.doctor}</td>
                    <td className="py-2">{a.type}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          a.tone === 'crit'
                            ? 'bg-[#ff5765]/15 text-[#ff5765]'
                            : a.tone === 'warn'
                              ? 'bg-[#f2b33d]/15 text-[#f2b33d]'
                              : 'bg-[#46d08a]/15 text-[#46d08a]'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelTitle tag="hospital · 66 camas">
              <span className="flex items-center gap-2">
                <Users size={13} className="text-[#7eb3e8]" /> Ocupación por área
              </span>
            </PanelTitle>
            <BedOccupancy />
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle tag="LIS · laboratorio clínico">
            <span className="flex items-center gap-2">
              <FlaskConical size={13} className="text-[#7eb3e8]" /> Cola de laboratorio
            </span>
          </PanelTitle>
          <div className="space-y-2">
            {LAB_QUEUE.map((l) => (
              <div
                key={l.id}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                  l.tone === 'crit'
                    ? 'border-[#ff5765]/35 bg-[#ff5765]/5'
                    : 'border-[#1b2735] bg-[#121a25]'
                }`}
              >
                <div>
                  <p className="font-mono text-[10px] font-bold text-white">{l.id} · {l.test}</p>
                  <p className="font-mono text-[9px] text-[#54667e]">{l.patient} · ETA {l.eta}</p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ${
                    l.tone === 'crit' ? 'bg-[#ff5765]/15 text-[#ff5765]' : l.tone === 'warn' ? 'bg-[#f2b33d]/15 text-[#f2b33d]' : 'bg-[#46d08a]/15 text-[#46d08a]'
                  }`}
                >
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle tag="indicadores clínicos">
            <span className="flex items-center gap-2">
              <Activity size={13} className="text-[#46d08a]" /> KPIs operativos
            </span>
          </PanelTitle>
          <div className="space-y-3">
            <GaugeBar label="Satisfacción paciente" value={87} max={100} unit="%" warnAt={70} />
            <GaugeBar label="Autorizaciones aseguradora" value={89} max={100} unit="%" warnAt={75} />
            <GaugeBar label="Resultados lab en 4h" value={76} max={100} unit="%" warnAt={65} />
            <GaugeBar label="No-show citas" value={8} max={100} unit="%" warnAt={12} critAt={18} />
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle tag="6 agentes activos">
          <span className="flex items-center gap-2">
            <Syringe size={13} className="text-[#3fd0e8]" /> Agentes IA · salud privada y laboratorio
          </span>
        </PanelTitle>
        <AgentGrid agents={SALUD_AGENTS} />
      </Panel>

      <Panel>
        <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
        <EventFeed events={events} />
        <div className="mt-3 space-y-2">
          <AlertBanner tone="crit">TRIAGE · URG-442 priorizado · médico de guardia en camino · SIMULACIÓN</AlertBanner>
          <AlertBanner tone="info">Datos clínicos simulados · no constituyen información médica real</AlertBanner>
        </div>
      </Panel>
    </div>
  );
}
