import { useEffect, useRef, useState } from 'react';
import { Handshake, Home, Key, MapPin, Users } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { OPS_PHOTO_SETS, RENDER_3D_SETS } from '@/lib/opsImages';
import { AgentGrid, AlertBanner, EventFeed, KpiStrip, Panel, PanelTitle } from './shared';
import { SectorPhotoGrid } from './SectorPhotoGrid';
import { LandAnalysisMap, ProspectPipeline } from './visuals/InmobiliariaVisuals';
import { Render3DShowcase } from './visuals/Render3DShowcase';

const INMO_AGENTS: AiAgent[] = [
  { id: 'i1', name: 'Agente Prospección', role: 'MCP · leads', status: 'active', task: '124 leads de 6 plataformas · 67 calificados por IA · 28 visitas agendadas' },
  { id: 'i2', name: 'Agente Clientes', role: 'CRM', status: 'active', task: 'Seguimiento post-visita · 11 ofertas activas · 4 cierres en pipeline' },
  { id: 'i3', name: 'Agente Terrenos', role: 'Análisis GIS', status: 'watch', task: 'LT-551 score 72 · ROI 22% · due diligence en curso' },
  { id: 'i4', name: 'Agente Valuación', role: 'AVM', status: 'active', task: 'CMA automático · comparables en 2 km · precio sugerido actualizado' },
  { id: 'i5', name: 'Agente Legal', role: 'Contratos', status: 'active', task: '3 escrituras en proceso · checklist notarial 94% completo' },
  { id: 'i6', name: 'Agente Oportunidades', role: 'Detección', status: 'alert', task: 'Nueva oportunidad MCP · casa en Polanco 18% bajo mercado · alerta enviada' },
];

const INMO_EVENTS = [
  { tone: 'ok' as const, text: 'CIERRE · Casa Lomas · $8.2M · comisión registrada · cliente satisfecho', agent: 'Agente Clientes' },
  { tone: 'info' as const, text: 'MCP · Inmuebles24 · lead calificado · presupuesto $5–7M · visita mañana 11:00', agent: 'Agente Prospección' },
  { tone: 'warn' as const, text: 'TERRENO · LT-551 · score bajó a 72 · revisar permisos de uso de suelo', agent: 'Agente Terrenos' },
  { tone: 'ok' as const, text: 'OPORTUNIDAD · Depto Roma · 18% bajo AVM · Agente Oportunidades notificó al equipo', agent: 'Agente Oportunidades' },
  { tone: 'info' as const, text: 'VALUACIÓN · Terreno Querétaro · $12.4M · 4 comparables · informe PDF generado', agent: 'Agente Valuación' },
];

type Listing = {
  id: string;
  property: string;
  type: string;
  price: string;
  client: string;
  stage: string;
  tone: 'ok' | 'warn' | 'crit';
};

const LISTINGS: Listing[] = [
  { id: 'PROP-442', property: 'Casa Lomas · 420m²', type: 'Venta', price: '$8.2M', client: 'Familia Vázquez', stage: 'Cierre', tone: 'ok' },
  { id: 'PROP-318', property: 'Depto Polanco · 180m²', type: 'Venta', price: '$5.4M', client: 'Inv. Capital MX', stage: 'Oferta', tone: 'warn' },
  { id: 'PROP-551', property: 'Terreno Querétaro · 4.2ha', type: 'Terreno', price: '$12.4M', client: 'Desarrolladora Norte', stage: 'Due diligence', tone: 'warn' },
  { id: 'PROP-229', property: 'Local comercial · 220m²', type: 'Venta', price: '$3.1M', client: 'Retail Group', stage: 'Visita', tone: 'ok' },
  { id: 'PROP-661', property: 'Casa Roma · 310m²', type: 'Oportunidad', price: '$4.8M', client: 'Nuevo lead MCP', stage: 'Calificado', tone: 'ok' },
];

export function InmobiliariaPanel() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    setEvents([{ id: 1, time: fmtTime(), ...INMO_EVENTS[3], tone: INMO_EVENTS[3].tone }]);
    const id = setInterval(() => {
      const ev = INMO_EVENTS[Math.floor(Math.random() * INMO_EVENTS.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <KpiStrip
        items={[
          { label: 'Propiedades activas', value: '47', sub: 'venta · terrenos · locales' },
          { label: 'Leads MCP hoy', value: '124', sub: '6 plataformas conectadas' },
          { label: 'Pipeline valor', value: '$84M', sub: '11 ofertas activas' },
          { label: 'Cierres mes', value: '4', sub: 'meta 6 · 67%' },
          { label: 'Terrenos analizados', value: '18', sub: 'scoring IA en mapa' },
          { label: 'Oportunidades', value: '2', sub: 'bajo precio de mercado', alert: true },
        ]}
      />

      <Panel className="border-[#3b6ea5]/30">
        <PanelTitle tag="preventa · render 3D animado">
          <span className="flex items-center gap-2">
            <Home size={13} className="text-[#7eb3e8]" /> Desarrollo inmobiliario · recorrido virtual
          </span>
        </PanelTitle>
        <Render3DShowcase items={[...RENDER_3D_SETS.inmobiliaria]} sector="inmobiliaria" />
      </Panel>

      <Panel>
        <PanelTitle tag="LIVE solo rentas · bodegas y locales">
          <span className="flex items-center gap-2">
            <Home size={13} className="text-[#7eb3e8]" /> Propiedades y operaciones en curso
          </span>
        </PanelTitle>
        <SectorPhotoGrid photos={[...OPS_PHOTO_SETS.inmobiliaria]} cols={4} />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelTitle tag="compra-venta · SIMULACIÓN">
            <span className="flex items-center gap-2">
              <Handshake size={13} className="text-[#7eb3e8]" /> Cartera de propiedades y clientes
            </span>
          </PanelTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] border-collapse font-mono text-[10px]">
              <thead>
                <tr className="border-b border-[#1b2735] text-[#54667e]">
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">Propiedad</th>
                  <th className="py-2 text-left">Tipo</th>
                  <th className="py-2 text-right">Precio</th>
                  <th className="py-2 text-left">Cliente</th>
                  <th className="py-2 text-right">Etapa</th>
                </tr>
              </thead>
              <tbody>
                {LISTINGS.map((r) => (
                  <tr key={r.id} className="border-b border-[#1b2735]/60 text-[#c3d0e0]">
                    <td className="py-2 font-semibold text-white">{r.id}</td>
                    <td className="py-2">{r.property}</td>
                    <td className="py-2">{r.type}</td>
                    <td className="py-2 text-right">{r.price}</td>
                    <td className="py-2">{r.client}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          r.tone === 'crit' ? 'bg-[#ff5765]/15 text-[#ff5765]' : r.tone === 'warn' ? 'bg-[#f2b33d]/15 text-[#f2b33d]' : 'bg-[#46d08a]/15 text-[#46d08a]'
                        }`}
                      >
                        {r.stage}
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
            <PanelTitle tag="pipeline de prospección">
              <span className="flex items-center gap-2">
                <Users size={13} className="text-[#46d08a]" /> Embudo comercial · MCP
              </span>
            </PanelTitle>
            <ProspectPipeline />
          </Panel>
        </div>
      </div>

      <Panel className="border-[#3fd0e8]/25">
        <PanelTitle tag="análisis GIS · Google Maps style">
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-[#3fd0e8]" /> Compra de terrenos · scoring IA en mapa
          </span>
        </PanelTitle>
        <LandAnalysisMap />
      </Panel>

      <Panel>
        <PanelTitle tag="6 agentes activos">
          <span className="flex items-center gap-2">
            <Key size={13} className="text-[#7eb3e8]" /> Agentes IA · agencia inmobiliaria
          </span>
        </PanelTitle>
        <AgentGrid agents={INMO_AGENTS} />
      </Panel>

      <Panel>
        <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
        <EventFeed events={events} />
        <div className="mt-3">
          <AlertBanner tone="info">Sin renta vacacional · enfoque compra-venta, terrenos y prospección MCP · SIMULACIÓN</AlertBanner>
        </div>
      </Panel>
    </div>
  );
}
