import { useEffect, useRef, useState } from 'react';
import { Activity, Fuel, Gauge, MapPin, Radio, Satellite, Video } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { AgentGrid, AlertBanner, EventFeed, GaugeBar, KpiStrip, Panel, PanelTitle } from './shared';
import { OPS_IMAGES } from '@/lib/opsImages';
import { CameraFeed } from './CameraFeed';
import { FleetMap } from './FleetMap';

const LOG_AGENTS: AiAgent[] = [
  { id: 'a1', name: 'Agente Flota', role: 'Rastreo GPS', status: 'active', task: 'Monitoreando 24 unidades · posición cada 15s' },
  { id: 'a2', name: 'Agente Rutas', role: 'Optimización', status: 'active', task: 'Recalculando ETA en carretera México–Querétaro' },
  { id: 'a3', name: 'Agente Combustible', role: 'Análisis', status: 'watch', task: 'MX-19 consumo +18% vs ruta plan · investigando' },
  { id: 'a4', name: 'Agente Cámaras', role: 'Visión IA', status: 'alert', task: 'MX-07 parada no autorizada · clip archivado' },
  { id: 'a5', name: 'Agente Satélite', role: 'Emergencia', status: 'active', task: 'Enlace Starlink activo · botón pánico listo' },
  { id: 'a6', name: 'Agente Seguridad', role: 'Flotillas', status: 'watch', task: 'Geocercas nocturnas · 2 unidades en zona restringida · protocolo activo' },
];

const LOG_EVENTS_POOL = [
  { tone: 'warn' as const, text: 'MX-14 · ZONA RESTRINGIDA · ingreso 22:14 · Agente Seguridad notificó supervisor', agent: 'Agente Seguridad' },
  { tone: 'crit' as const, text: 'MX-07 · PARADA NO AUTORIZADA · 4 min sin movimiento · cámara cabina activa', agent: 'Agente Cámaras' },
  { tone: 'warn' as const, text: 'MX-19 · DESVÍO DE RUTA · +2.4 km fuera de geocerca · supervisor notificado', agent: 'Agente Rutas' },
  { tone: 'warn' as const, text: 'MX-24 · MOTOR APAGADO · turn-off detectado fuera de punto de descanso', agent: 'Agente Flota' },
  { tone: 'info' as const, text: 'MX-01 · trazabilidad OK · POD pre-validado · cliente notificado', agent: 'Agente Entregas' },
  { tone: 'crit' as const, text: 'BOTÓN PÁNICO · simulación satelital · enlace de emergencia verificado', agent: 'Agente Satélite' },
  { tone: 'ok' as const, text: 'MX-12 · 847 km hoy · combustible dentro de rango · sin alertas', agent: 'Agente Combustible' },
];

type FleetRow = {
  id: string;
  location: string;
  speed: number;
  fuel: number;
  roadHrs: number;
  eta: string;
  status: string;
  statusTone: 'ok' | 'warn' | 'crit';
  tirePsi: number;
  tireStatus: 'ok' | 'warn' | 'crit';
  fatigue: number;
  reflexMs: number;
};

export function LogisticsPanel() {
  const [fuelTotal, setFuelTotal] = useState(2847);
  const [roadHrs, setRoadHrs] = useState(312);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);
  const onlineUnits = 21;

  const fleetRows: FleetRow[] = [
    { id: 'MX-01', location: 'Carretera 57 · km 184', speed: 78, fuel: 62, roadHrs: 6.2, eta: '14:32', status: 'En ruta', statusTone: 'ok', tirePsi: 102, tireStatus: 'ok', fatigue: 22, reflexMs: 310 },
    { id: 'MX-07', location: 'Carretera 40 · geocerca', speed: 0, fuel: 41, roadHrs: 5.8, eta: '—', status: 'Parada', statusTone: 'crit', tirePsi: 88, tireStatus: 'warn', fatigue: 71, reflexMs: 520 },
    { id: 'MX-12', location: 'Carretera 45 · km 92', speed: 82, fuel: 55, roadHrs: 7.1, eta: '15:10', status: 'En ruta', statusTone: 'ok', tirePsi: 98, tireStatus: 'ok', fatigue: 38, reflexMs: 340 },
    { id: 'MX-19', location: 'Desvío · +2.4 km', speed: 48, fuel: 28, roadHrs: 4.3, eta: '16:05', status: 'Desvío', statusTone: 'warn', tirePsi: 76, tireStatus: 'crit', fatigue: 55, reflexMs: 410 },
    { id: 'MX-24', location: 'Base CDMX · patio', speed: 0, fuel: 88, roadHrs: 0, eta: '—', status: 'Apagado', statusTone: 'warn', tirePsi: 105, tireStatus: 'ok', fatigue: 8, reflexMs: 280 },
  ];

  const tiresOk = fleetRows.filter((r) => r.tireStatus === 'ok').length;
  const tiresWarn = fleetRows.filter((r) => r.tireStatus === 'warn').length;
  const tiresCrit = fleetRows.filter((r) => r.tireStatus === 'crit').length;
  const avgFatigue = Math.round(fleetRows.reduce((a, r) => a + r.fatigue, 0) / fleetRows.length);
  const highFatigue = fleetRows.filter((r) => r.fatigue >= 60).length;

  useEffect(() => {
    setEvents([
      { id: 1, time: fmtTime(), ...LOG_EVENTS_POOL[0], tone: LOG_EVENTS_POOL[0].tone },
      { id: 2, time: fmtTime(new Date(Date.now() - 8000)), ...LOG_EVENTS_POOL[1], tone: LOG_EVENTS_POOL[1].tone },
      { id: 3, time: fmtTime(new Date(Date.now() - 20000)), ...LOG_EVENTS_POOL[2], tone: LOG_EVENTS_POOL[2].tone },
    ]);
    const id = setInterval(() => {
      const ev = LOG_EVENTS_POOL[Math.floor(Math.random() * LOG_EVENTS_POOL.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
      setFuelTotal((f) => f + Math.round(Math.random() * 4));
      setRoadHrs((h) => Math.round((h + 0.1) * 10) / 10);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const alertCount = 3;

  return (
    <div className="space-y-4">
      <KpiStrip
        items={[
          { label: 'Unidades activas', value: `${onlineUnits}/24`, sub: 'GPS en línea' },
          { label: 'Km recorridos hoy', value: '4,218', sub: 'trazabilidad completa' },
          { label: 'Combustible', value: `${fuelTotal.toLocaleString()} L`, sub: 'consumo monitoreado' },
          { label: 'Horas carretera', value: `${roadHrs} h`, sub: 'turnos activos' },
          { label: 'Desvíos', value: '1', sub: 'MX-19 fuera de ruta', alert: true },
          { label: 'Alertas activas', value: String(alertCount + 1), sub: 'parada + desvío', alert: true },
          { label: 'Llantas', value: `${tiresOk}/${fleetRows.length}`, sub: tiresCrit ? `${tiresCrit} crítica` : `${tiresWarn} baja presión`, alert: tiresCrit > 0 || tiresWarn > 0 },
          { label: 'Cansancio flota', value: `${avgFatigue}%`, sub: highFatigue ? `${highFatigue} conductor(es) alto` : 'reflejos OK', alert: highFatigue > 0 },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelTitle tag="GPS · geocercas · SIMULACIÓN">
            <span className="flex items-center gap-2">
              <MapPin size={13} className="text-[#3fd0e8]" /> Mapa de flota en tiempo real
            </span>
          </PanelTitle>
          <FleetMap />

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse font-mono text-[10px]">
              <thead>
                <tr className="border-b border-[#1b2735] text-[#54667e]">
                  <th className="py-2 text-left font-medium">Unidad</th>
                  <th className="py-2 text-left font-medium">Ubicación</th>
                  <th className="py-2 text-right font-medium">km/h</th>
                  <th className="py-2 text-right font-medium">Comb.</th>
                  <th className="py-2 text-right font-medium">Hrs</th>
                  <th className="py-2 text-right font-medium">ETA</th>
                  <th className="py-2 text-right font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {fleetRows.map((r) => (
                  <tr key={r.id} className="border-b border-[#1b2735]/60 text-[#c3d0e0]">
                    <td className="py-2 font-semibold text-white">{r.id}</td>
                    <td className="py-2">{r.location}</td>
                    <td className="py-2 text-right">{r.speed}</td>
                    <td className="py-2 text-right">{r.fuel}%</td>
                    <td className="py-2 text-right">{r.roadHrs}</td>
                    <td className="py-2 text-right">{r.eta}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          r.statusTone === 'crit'
                            ? 'bg-[#ff5765]/15 text-[#ff5765]'
                            : r.statusTone === 'warn'
                              ? 'bg-[#f2b33d]/15 text-[#f2b33d]'
                              : 'bg-[#46d08a]/15 text-[#46d08a]'
                        }`}
                      >
                        {r.status}
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
            <PanelTitle tag="visión IA · DVR">
              <span className="flex items-center gap-2">
                <Video size={13} className="text-[#7eb3e8]" /> Cámaras en cabina y carga
              </span>
            </PanelTitle>
            <div className="grid grid-cols-2 gap-2">
              <CameraFeed unitId="MX-07" label="Cabina · parada detectada" status="alert" image={OPS_IMAGES.logistics.cabin} />
              <CameraFeed unitId="MX-01" label="Carretera · en movimiento" status="live" image={OPS_IMAGES.logistics.highway} />
              <CameraFeed unitId="MX-19" label="Carga · desvío activo" status="live" image={OPS_IMAGES.logistics.cargo} />
              <CameraFeed unitId="MX-24" label="Patio · motor apagado" status="off" image={OPS_IMAGES.logistics.yard} />
            </div>
          </Panel>

          <Panel>
            <PanelTitle>Alertas críticas</PanelTitle>
            <div className="space-y-2">
              <AlertBanner tone="crit">MX-07 · PARADA · 4 min sin movimiento · Agente Cámaras grabando</AlertBanner>
              <AlertBanner tone="warn">MX-19 · DESVÍO · fuera de geocerca · ruta recalculada</AlertBanner>
              <AlertBanner tone="warn">MX-24 · TURN OFF · motor apagado · ubicación registrada</AlertBanner>
              <AlertBanner tone="info">
                <span className="flex items-center gap-1.5">
                  <Satellite size={11} /> Emergencia satelital · enlace activo · botón pánico verificado
                </span>
              </AlertBanner>
            </div>
          </Panel>
        </div>
      </div>

      <Panel>
        <PanelTitle tag="TPMS · visión cabina · SIMULACIÓN">
          <span className="flex items-center gap-2">
            <Gauge size={13} className="text-[#3fd0e8]" /> Estado de llantas y nivel de cansancio
          </span>
        </PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fleetRows.map((r) => (
            <div key={`tire-${r.id}`} className="rounded-lg border border-[#1b2735] bg-[#121a25] p-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold text-white">{r.id}</p>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    r.fatigue >= 60 ? 'bg-[#ff5765]/15 text-[#ff5765]' : r.fatigue >= 40 ? 'bg-[#f2b33d]/15 text-[#f2b33d]' : 'bg-[#46d08a]/15 text-[#46d08a]'
                  }`}
                >
                  Cansancio {r.fatigue}%
                </span>
              </div>
              <div className="mt-2 space-y-2">
                <GaugeBar
                  label={`Presión llantas · ${r.tirePsi} PSI`}
                  value={r.tirePsi}
                  max={110}
                  unit=" PSI"
                  warnAt={90}
                  critAt={80}
                />
                <GaugeBar label="Nivel de cansancio" value={r.fatigue} max={100} unit="%" warnAt={50} critAt={65} />
                <div className="flex items-center justify-between font-mono text-[9px] text-[#54667e]">
                  <span className="flex items-center gap-1">
                    <Activity size={10} className="text-[#7eb3e8]" /> Reflejo {r.reflexMs} ms
                  </span>
                  <span
                    className={
                      r.tireStatus === 'crit' ? 'text-[#ff5765]' : r.tireStatus === 'warn' ? 'text-[#f2b33d]' : 'text-[#46d08a]'
                    }
                  >
                    {r.tireStatus === 'crit' ? 'Llanta crítica' : r.tireStatus === 'warn' ? 'Revisar llanta' : 'Llantas OK'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <AlertBanner tone={highFatigue > 0 ? 'warn' : 'info'}>
            Agente Seguridad · {highFatigue > 0 ? `MX-07 cansancio ${fleetRows.find((r) => r.id === 'MX-07')?.fatigue}% · pausa sugerida · reflejos ${fleetRows.find((r) => r.id === 'MX-07')?.reflexMs} ms` : 'Reflejos dentro de rango · SIMULACIÓN'}
          </AlertBanner>
        </div>
      </Panel>

      <Panel>
        <PanelTitle tag="consumo por unidad">
          <span className="flex items-center gap-2">
            <Fuel size={13} className="text-[#f2b33d]" /> Combustible y tiempo en carretera
          </span>
        </PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fleetRows.slice(0, 3).map((r) => (
            <div key={r.id} className="rounded-lg border border-[#1b2735] bg-[#121a25] p-3">
              <p className="font-mono text-[11px] font-bold text-white">{r.id}</p>
              <div className="mt-2 space-y-2">
                <GaugeBar label="Combustible restante" value={r.fuel} max={100} unit="%" warnAt={30} critAt={15} />
                <GaugeBar label="Horas en carretera" value={r.roadHrs} max={10} unit=" h" warnAt={8} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelTitle tag="6 agentes activos">
          <span className="flex items-center gap-2">
            <Radio size={13} className="text-[#46d08a]" /> Agentes IA · flota y seguridad
          </span>
        </PanelTitle>
        <AgentGrid agents={LOG_AGENTS} />
      </Panel>

      <Panel>
        <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
        <EventFeed events={events} />
        <div className="mt-3">
          <AlertBanner tone="warn">VEREDICTO · 2 ALERTAS ACTIVAS · supervisor en loop · SIMULACIÓN</AlertBanner>
        </div>
      </Panel>
    </div>
  );
}
