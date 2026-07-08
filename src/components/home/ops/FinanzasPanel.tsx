import { useEffect, useRef, useState } from 'react';
import { CreditCard, Landmark, Scale, ShieldAlert, TrendingUp, Wallet } from 'lucide-react';
import type { AiAgent, LiveEvent } from './types';
import { fmtTime } from './types';
import { AgentGrid, AlertBanner, EventFeed, GaugeBar, KpiStrip, Panel, PanelTitle } from './shared';
import { SectorPhotoGrid } from './SectorPhotoGrid';
import { CollectionAutomationFlow, FraudDetectionPipeline } from './visuals/FraudCollectionFlows';
import { OPS_PHOTO_SETS } from '@/lib/opsImages';

const FIN_AGENTS: AiAgent[] = [
  { id: 'f1', name: 'Agente Cobranza', role: 'Recuperación', status: 'active', task: '47 promesas de pago hoy · 12 vencen en 2 h · WhatsApp activo' },
  { id: 'f2', name: 'Agente Riesgo', role: 'Scoring', status: 'watch', task: '3 clientes subieron a riesgo alto · revisión manual sugerida' },
  { id: 'f3', name: 'Agente Seguros', role: 'Pólizas', status: 'active', task: '8 renovaciones esta semana · 2 sin documentación · recordatorio enviado' },
  { id: 'f4', name: 'Agente Fraude', role: 'AML/KYC', status: 'alert', task: 'Transacción atípica $284k · patrón fuera de perfil · bloqueo preventivo' },
  { id: 'f5', name: 'Agente Cartera', role: 'Portafolio', status: 'active', task: 'Rebalanceo automático · 94% dentro de política de riesgo' },
  { id: 'f6', name: 'Agente Compliance', role: 'Regulatorio', status: 'active', task: 'CNBV · PLD · reporte diario generado · sin hallazgos' },
];

const FIN_EVENTS_POOL = [
  { tone: 'crit' as const, text: 'FRAUDE · TX-88421 · $284,000 · patrón atípico · cuenta congelada 15 min', agent: 'Agente Fraude' },
  { tone: 'warn' as const, text: 'COBRANZA · Cliente GPO-119 · mora 67 días · escalado a jurídico sugerido', agent: 'Agente Cobranza' },
  { tone: 'warn' as const, text: 'RIESGO · Score 742 → 612 · sector construcción · límite crédito revisar', agent: 'Agente Riesgo' },
  { tone: 'info' as const, text: 'SEGUROS · Póliza AUT-4421 · renovación en 5 días · cotización enviada', agent: 'Agente Seguros' },
  { tone: 'ok' as const, text: 'RECAUDACIÓN · $1.2M capturado hoy · 89% meta diaria · canal SPEI', agent: 'Agente Cartera' },
  { tone: 'info' as const, text: 'COMPLIANCE · Reporte PLD · 0 alertas · archivo listo para auditoría', agent: 'Agente Compliance' },
];

type AgingBucket = { label: string; amount: number; pct: number; tone: 'ok' | 'warn' | 'crit' };

const AGING: AgingBucket[] = [
  { label: '0–30 días', amount: 18.4, pct: 62, tone: 'ok' },
  { label: '31–60 días', amount: 5.2, pct: 18, tone: 'warn' },
  { label: '61–90 días', amount: 3.1, pct: 10, tone: 'warn' },
  { label: '+90 días', amount: 2.9, pct: 10, tone: 'crit' },
];

type CollectionRow = {
  id: string;
  client: string;
  balance: string;
  daysLate: number;
  score: number;
  channel: string;
  status: string;
  tone: 'ok' | 'warn' | 'crit';
};

const COLLECTIONS: CollectionRow[] = [
  { id: 'CX-4412', client: 'Distribuidora Norte SA', balance: '$842,000', daysLate: 12, score: 78, channel: 'WhatsApp', status: 'Promesa hoy', tone: 'warn' },
  { id: 'CX-3387', client: 'Grupo Constructora MX', balance: '$1.24M', daysLate: 67, score: 42, channel: 'Llamada IA', status: 'Escalado', tone: 'crit' },
  { id: 'CX-5521', client: 'Logística del Bajío', balance: '$318,500', daysLate: 0, score: 91, channel: 'SPEI', status: 'Al corriente', tone: 'ok' },
  { id: 'CX-2290', client: 'Fintech Capital', balance: '$156,200', daysLate: 34, score: 58, channel: 'Email', status: 'Negociación', tone: 'warn' },
  { id: 'CX-6614', client: 'Seguros Patrimonio', balance: '$92,800', daysLate: 8, score: 85, channel: 'WhatsApp', status: 'Recordatorio', tone: 'ok' },
];

function AgingChart() {
  return (
    <div className="space-y-2">
      {AGING.map((b) => {
        const color = b.tone === 'crit' ? '#ff5765' : b.tone === 'warn' ? '#f2b33d' : '#46d08a';
        return (
          <div key={b.label}>
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-[#54667e]">{b.label}</span>
              <span style={{ color }}>${b.amount}M · {b.pct}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.pct}%`, backgroundColor: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RiskHeatmap() {
  const cells = [
    ['Bajo', 'Bajo', 'Medio', 'Alto'],
    ['Bajo', 'Medio', 'Medio', 'Alto'],
    ['Medio', 'Medio', 'Alto', 'Crítico'],
    ['Medio', 'Alto', 'Crítico', 'Crítico'],
  ];
  const color = (v: string) =>
    v === 'Crítico' ? '#ff5765' : v === 'Alto' ? '#f2b33d' : v === 'Medio' ? '#3b6ea5' : '#46d08a';
  return (
    <div className="grid grid-cols-4 gap-1">
      {cells.flat().map((v, i) => (
        <div
          key={i}
          className="flex h-8 items-center justify-center rounded font-mono text-[8px] font-bold text-white/90"
          style={{ backgroundColor: `${color(v)}33`, border: `1px solid ${color(v)}66` }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

export function FinanzasPanel() {
  const [recovered, setRecovered] = useState(1.24);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    setEvents([
      { id: 1, time: fmtTime(), ...FIN_EVENTS_POOL[0], tone: FIN_EVENTS_POOL[0].tone },
      { id: 2, time: fmtTime(new Date(Date.now() - 12000)), ...FIN_EVENTS_POOL[1], tone: FIN_EVENTS_POOL[1].tone },
    ]);
    eventId.current = 2;
    const id = setInterval(() => {
      const ev = FIN_EVENTS_POOL[Math.floor(Math.random() * FIN_EVENTS_POOL.length)];
      setEvents((e) => [
        { id: ++eventId.current, time: fmtTime(), tone: ev.tone, text: ev.text, agent: ev.agent },
        ...e.slice(0, 9),
      ]);
      setRecovered((r) => Math.round((r + Math.random() * 0.02) * 100) / 100);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <KpiStrip
        items={[
          { label: 'Cartera vigente', value: '$29.6M', sub: 'MXN · 847 clientes' },
          { label: 'Mora +30 días', value: '11.2%', sub: '$3.3M en riesgo', alert: true },
          { label: 'Recuperado hoy', value: `$${recovered}M`, sub: 'cobranza multicanal' },
          { label: 'Pólizas activas', value: '1,284', sub: 'renovaciones 8 pend.' },
          { label: 'Score promedio', value: '74', sub: 'índice de riesgo IA' },
          { label: 'Alertas fraude', value: '1', sub: 'bloqueo preventivo', alert: true },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel className="border-[#ff5765]/25 shadow-[0_0_32px_rgba(255,87,101,0.08)]">
          <PanelTitle tag="antifraude · tiempo real">
            <span className="flex items-center gap-2">
              <ShieldAlert size={13} className="text-[#ff5765]" /> Detección de fraude con IA · pipeline visible
            </span>
          </PanelTitle>
          <FraudDetectionPipeline />
        </Panel>

        <Panel className="border-[#46d08a]/25 shadow-[0_0_32px_rgba(70,208,138,0.08)]">
          <PanelTitle tag="cobranza automatizada">
            <span className="flex items-center gap-2">
              <Wallet size={13} className="text-[#46d08a]" /> Cobranza multicanal · agentes IA en acción
            </span>
          </PanelTitle>
          <CollectionAutomationFlow />
        </Panel>
      </div>

      <Panel>
        <PanelTitle tag="sistema legal · recuperación">
          <span className="flex items-center gap-2">
            <Landmark size={13} className="text-[#7eb3e8]" /> Centros financieros · legal IA, fraude y cobranza
          </span>
        </PanelTitle>
        <SectorPhotoGrid photos={[...OPS_PHOTO_SETS.finance]} cols={4} />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelTitle tag="cobranza · SIMULACIÓN">
            <span className="flex items-center gap-2">
              <Wallet size={13} className="text-[#46d08a]" /> Pipeline de cobranza activa
            </span>
          </PanelTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse font-mono text-[10px]">
              <thead>
                <tr className="border-b border-[#1b2735] text-[#54667e]">
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">Cliente</th>
                  <th className="py-2 text-right">Saldo</th>
                  <th className="py-2 text-right">Mora</th>
                  <th className="py-2 text-right">Score</th>
                  <th className="py-2 text-left">Canal</th>
                  <th className="py-2 text-right">Estado</th>
                </tr>
              </thead>
              <tbody>
                {COLLECTIONS.map((r) => (
                  <tr key={r.id} className="border-b border-[#1b2735]/60 text-[#c3d0e0]">
                    <td className="py-2 font-semibold text-white">{r.id}</td>
                    <td className="py-2">{r.client}</td>
                    <td className="py-2 text-right">{r.balance}</td>
                    <td className="py-2 text-right">{r.daysLate}d</td>
                    <td className="py-2 text-right">{r.score}</td>
                    <td className="py-2">{r.channel}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          r.tone === 'crit'
                            ? 'bg-[#ff5765]/15 text-[#ff5765]'
                            : r.tone === 'warn'
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
            <PanelTitle tag="antigüedad de saldos">
              <span className="flex items-center gap-2">
                <TrendingUp size={13} className="text-[#7eb3e8]" /> Aging de cartera
              </span>
            </PanelTitle>
            <AgingChart />
          </Panel>

          <Panel>
            <PanelTitle tag="matriz de riesgo">
              <span className="flex items-center gap-2">
                <Scale size={13} className="text-[#f2b33d]" /> Mapa de riesgo crediticio
              </span>
            </PanelTitle>
            <RiskHeatmap />
            <p className="mt-2 font-mono text-[9px] text-[#54667e]">Eje X: exposición · Eje Y: probabilidad de default · IA actualiza cada 4 h</p>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle tag="seguros · fintech">
            <span className="flex items-center gap-2">
              <ShieldAlert size={13} className="text-[#3fd0e8]" /> Pólizas y productos financieros
            </span>
          </PanelTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { product: 'Crédito empresarial', active: 312, renewal: 4, rate: '18.4% APR' },
              { product: 'Seguro flotilla', active: 89, renewal: 2, rate: '94% siniestralidad OK' },
              { product: 'Factoraje', active: 56, renewal: 1, rate: '$4.2M colocado' },
              { product: 'Línea revolvente', active: 124, renewal: 3, rate: 'Utilización 67%' },
            ].map((p) => (
              <div key={p.product} className="rounded-lg border border-[#1b2735] bg-[#121a25] p-3">
                <p className="text-[11px] font-semibold text-white">{p.product}</p>
                <p className="mt-1 font-mono text-[9px] text-[#54667e]">{p.active} activos · {p.renewal} por renovar</p>
                <p className="mt-2 font-mono text-[10px] text-[#7eb3e8]">{p.rate}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle tag="indicadores del día">
            <span className="flex items-center gap-2">
              <CreditCard size={13} className="text-[#46d08a]" /> KPIs operativos
            </span>
          </PanelTitle>
          <div className="space-y-3">
            <GaugeBar label="Tasa de recuperación" value={67} max={100} unit="%" warnAt={50} critAt={35} direction="high" />
            <GaugeBar label="Promesas cumplidas" value={78} max={100} unit="%" warnAt={60} direction="high" />
            <GaugeBar label="Cobertura seguros" value={94} max={100} unit="%" direction="high" />
            <GaugeBar label="Exposición riesgo alto" value={11} max={100} unit="%" warnAt={8} critAt={15} />
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle tag="6 agentes activos">
          <span className="flex items-center gap-2">
            <Landmark size={13} className="text-[#7eb3e8]" /> Agentes IA · finanzas, cobranza y riesgo
          </span>
        </PanelTitle>
        <AgentGrid agents={FIN_AGENTS} />
      </Panel>

      <Panel>
        <PanelTitle>Bitácora · clasificada por IA</PanelTitle>
        <EventFeed events={events} />
        <div className="mt-3 space-y-2">
          <AlertBanner tone="crit">FRAUDE · TX bloqueada · revisión humana en curso · SIMULACIÓN</AlertBanner>
          <AlertBanner tone="warn">COBRANZA · 3 cuentas en mora crítica · estrategia multicanal activa</AlertBanner>
        </div>
      </Panel>
    </div>
  );
}
