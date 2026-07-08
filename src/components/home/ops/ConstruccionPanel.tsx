import { useEffect, useRef, useState } from 'react';
import { HardHat, Radio, Shield, Video, Wrench } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { AgentGrid, AlertBanner, EventFeed, GaugeBar, KpiStrip, Panel, PanelTitle } from './shared';
import { ConstructionAICameras, ConstructionProgress } from './visuals/ConstruccionVisuals';

const CONST_AGENTS: AiAgent[] = [
  { id: 'c1', name: 'Agente Avance', role: 'Supervisión', status: 'watch', task: 'Obra 62% global · Instalaciones 42% · riesgo retraso detectado' },
  { id: 'c2', name: 'Agente Calidad', role: 'Visión IA', status: 'alert', task: 'Fisura en losa P3 · cámara CAM-N2 · obra detenida zona B' },
  { id: 'c3', name: 'Agente Seguridad', role: 'EPP · accesos', status: 'active', task: 'EPP 98% cumplimiento · 0 incidentes · 142 trabajadores registrados' },
  { id: 'c4', name: 'Agente Cámaras', role: 'Tiempo real', status: 'active', task: '12 cámaras activas · análisis cada 30s · clips archivados automático' },
  { id: 'c5', name: 'Agente Cronograma', role: 'Planning', status: 'watch', task: 'Desviación +2 días en instalaciones · plan de recuperación sugerido' },
  { id: 'c6', name: 'Agente Materiales', role: 'Logística obra', status: 'active', task: 'Acero y concreto en tiempo · próximo pedido validado' },
];

const CONST_EVENTS = [
  { tone: 'crit' as const, text: 'CALIDAD · Fisura losa P3 · visión IA · supervisor notificado · zona B detenida', agent: 'Agente Calidad' },
  { tone: 'warn' as const, text: 'CRONOGRAMA · Instalaciones +2 días · Agente Avance sugiere turno extra', agent: 'Agente Cronograma' },
  { tone: 'ok' as const, text: 'SEGURIDAD · Inspección EPP · 98% OK · sin incidentes en 14 días', agent: 'Agente Seguridad' },
  { tone: 'info' as const, text: 'AVANCE · Estructura 78% · dentro de plan · próxima revisión mañana 07:00', agent: 'Agente Avance' },
  { tone: 'ok' as const, text: 'MATERIALES · Entrega acero · lote verificado · montaje P4 iniciado', agent: 'Agente Materiales' },
];

export function ConstruccionPanel() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    setEvents([{ id: 1, time: fmtTime(), ...CONST_EVENTS[0], tone: CONST_EVENTS[0].tone }]);
    eventId.current = 1;
    const id = setInterval(() => {
      const ev = CONST_EVENTS[Math.floor(Math.random() * CONST_EVENTS.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <KpiStrip
        items={[
          { label: 'Avance global', value: '62%', sub: 'Torre Reforma · 18 pisos' },
          { label: 'Trabajadores', value: '142', sub: 'en sitio ahora' },
          { label: 'Cámaras IA', value: '12/12', sub: 'análisis en vivo' },
          { label: 'Incidentes', value: '0', sub: '14 días sin accidentes' },
          { label: 'Desviación', value: '+2d', sub: 'instalaciones', alert: true },
          { label: 'Alertas calidad', value: '1', sub: 'fisura detectada', alert: true },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <PanelTitle tag="supervisión de obra">
            <span className="flex items-center gap-2">
              <HardHat size={13} className="text-[#f2b33d]" /> Avance por fase · prevención de retrasos
            </span>
          </PanelTitle>
          <ConstructionProgress />
        </Panel>

        <Panel className="border-[#ff5765]/25">
          <PanelTitle tag="cámaras IA · tiempo real">
            <span className="flex items-center gap-2">
              <Video size={13} className="text-[#ff5765]" /> Visión IA · calidad y seguridad en obra
            </span>
          </PanelTitle>
          <ConstructionAICameras />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle tag="indicadores de obra">
            <span className="flex items-center gap-2">
              <Wrench size={13} className="text-[#7eb3e8]" /> KPIs de construcción
            </span>
          </PanelTitle>
          <div className="space-y-3">
            <GaugeBar label="Cumplimiento cronograma" value={78} max={100} unit="%" warnAt={70} critAt={60} direction="high" />
            <GaugeBar label="Calidad inspecciones" value={94} max={100} unit="%" warnAt={85} direction="high" />
            <GaugeBar label="EPP y seguridad" value={98} max={100} unit="%" warnAt={90} direction="high" />
            <GaugeBar label="Desperdicio material" value={4} max={100} unit="%" warnAt={8} critAt={12} />
          </div>
        </Panel>

        <Panel>
          <PanelTitle tag="alertas activas">
            <span className="flex items-center gap-2">
              <Shield size={13} className="text-[#46d08a]" /> Prevención y respuesta
            </span>
          </PanelTitle>
          <div className="space-y-2">
            <AlertBanner tone="crit">CALIDAD · Fisura P3 · obra detenida zona B · supervisor en sitio</AlertBanner>
            <AlertBanner tone="warn">CRONOGRAMA · Instalaciones +2 días · plan de recuperación activo</AlertBanner>
            <AlertBanner tone="ok">SEGURIDAD · 0 incidentes · EPP 98% · SIMULACIÓN</AlertBanner>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle tag="6 agentes activos">
          <span className="flex items-center gap-2">
            <Radio size={13} className="text-[#46d08a]" /> Agentes IA · construcción y supervisión
          </span>
        </PanelTitle>
        <AgentGrid agents={CONST_AGENTS} />
      </Panel>

      <Panel>
        <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
        <EventFeed events={events} />
      </Panel>
    </div>
  );
}
