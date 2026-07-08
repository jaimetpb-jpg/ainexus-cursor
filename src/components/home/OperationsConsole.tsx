import { useEffect, useState } from 'react';
import { Building2, Factory, HardHat, HeartPulse, Landmark, Truck } from 'lucide-react';
import { track } from '@/lib/analytics';
import { isSector, parseDashboardHash } from '@/lib/dashboardNav';
import type { Sector } from './ops/types';
import { fmtTime } from './ops/types';
import { LogisticsPanel } from './ops/LogisticsPanel';
import { ManufacturingPanel } from './ops/ManufacturingPanel';
import { FinanzasPanel } from './ops/FinanzasPanel';
import { SaludPanel } from './ops/SaludPanel';
import { InmobiliariaPanel } from './ops/InmobiliariaPanel';
import { ConstruccionPanel } from './ops/ConstruccionPanel';
import { LiveIndicator } from './ops/shared';

export const OPS_SECTORS: {
  id: Sector;
  label: string;
  icon: typeof Truck;
  title: string;
  backhaul: string;
  agents: string;
}[] = [
  { id: 'logistica', label: 'Logística', icon: Truck, title: 'Centro de control de flota', backhaul: 'GPS + satélite · Starlink', agents: '6/6 activos' },
  { id: 'manufactura', label: 'Manufactura', icon: Factory, title: 'Centro de monitoreo de planta', backhaul: 'Sensores · OPC-UA · MQTT', agents: '5/5 activos' },
  { id: 'finanzas', label: 'Finanzas', icon: Landmark, title: 'Centro de riesgo y cobranza', backhaul: 'Core bancario · APIs fintech', agents: '6/6 activos' },
  { id: 'salud', label: 'Salud', icon: HeartPulse, title: 'Centro clínico operativo', backhaul: 'HL7 · FHIR · LIS · PACS', agents: '6/6 activos' },
  { id: 'inmobiliaria', label: 'Inmobiliaria', icon: Building2, title: 'Agencia · compra-venta y terrenos', backhaul: 'MCP · CRM · GIS · AVM', agents: '6/6 activos' },
  { id: 'construccion', label: 'Construcción', icon: HardHat, title: 'Supervisión de obra en tiempo real', backhaul: 'Cámaras IA · BIM · CMMS', agents: '6/6 activos' },
];

const meta = (s: Sector) => OPS_SECTORS.find((x) => x.id === s)!;

function SectorPanel({ sector }: { sector: Sector }) {
  switch (sector) {
    case 'logistica':
      return <LogisticsPanel />;
    case 'manufactura':
      return <ManufacturingPanel />;
    case 'finanzas':
      return <FinanzasPanel />;
    case 'salud':
      return <SaludPanel />;
    case 'inmobiliaria':
      return <InmobiliariaPanel />;
    case 'construccion':
      return <ConstruccionPanel />;
  }
}

/** Tabs visibles sobre fondo claro — fuera del dashboard oscuro */
export function OpsSectorTabs({
  sector,
  onSector,
}: {
  sector: Sector;
  onSector: (s: Sector) => void;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-3">
        Elige un sector · demo en vivo
      </p>
      <div className="flex flex-wrap gap-2">
        {OPS_SECTORS.map((s) => {
          const Icon = s.icon;
          const active = sector === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                onSector(s.id);
                track('demo_dashboard_toggle', { view: s.id });
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all ${
                active
                  ? 'border-accent bg-accent text-white shadow-glow'
                  : 'border-line bg-white text-ink-2 hover:border-accent/40 hover:text-ink'
              }`}
            >
              <Icon size={16} className={active ? 'text-white' : 'text-accent'} />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OperationsConsole() {
  const [sector, setSector] = useState<Sector>('logistica');
  const [clock, setClock] = useState(fmtTime());
  const current = meta(sector);

  useEffect(() => {
    const id = setInterval(() => setClock(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fromHash = parseDashboardHash();
    if (fromHash) setSector(fromHash);

    const onSector = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (isSector(detail)) setSector(detail);
    };
    const onHash = () => {
      const s = parseDashboardHash();
      if (s) setSector(s);
    };

    window.addEventListener('nexus-dashboard-sector', onSector);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('nexus-dashboard-sector', onSector);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  return (
    <div>
      <OpsSectorTabs sector={sector} onSector={setSector} />

      <div className="overflow-hidden rounded-2xl border border-[#1b2735] bg-[#06090e] text-[#e9eff7] shadow-2xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#1b2735] bg-[#080c12]/90 px-4 py-3 backdrop-blur-md md:px-5">
          <div className="border-r border-[#1b2735] pr-4">
            <p className="text-sm font-bold tracking-wide">
              NEXUS<span className="text-[#7eb3e8]">·OPS</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#54667e]">{current.title}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#54667e]">Enlace</p>
            <p className="font-mono text-xs font-semibold text-[#46d08a]">
              <LiveIndicator />
              <span className="ml-1.5">{clock}</span>
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#54667e]">Backhaul</p>
            <p className="font-mono text-xs text-[#7eb3e8]">{current.backhaul}</p>
          </div>
          <div className="hidden md:block">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#54667e]">Agentes IA</p>
            <p className="font-mono text-xs font-semibold text-[#7eb3e8]">{current.agents}</p>
          </div>
          <div className="ml-auto">
            <span className="rounded-full border border-[#3b6ea5]/40 bg-[#3b6ea5]/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#7eb3e8]">
              SIMULACIÓN
            </span>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <SectorPanel sector={sector} />
        </div>
      </div>
    </div>
  );
}
