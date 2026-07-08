import { Building2, Factory, HardHat, HeartPulse, Landmark, Truck } from 'lucide-react';
import type { Sector } from '@/components/home/ops/types';
import { scrollToDashboardSector } from '@/lib/dashboardNav';
import { track } from '@/lib/analytics';

const SECTORS: { id: Sector; label: string; icon: typeof Truck; image: string; hint: string }[] = [
  { id: 'logistica', label: 'Logística', icon: Truck, image: '/images/ops-logistics-highway.webp', hint: 'Flota · rutas · GPS' },
  { id: 'manufactura', label: 'Manufactura', icon: Factory, image: '/images/ops-mfg-assembly.webp', hint: 'Planta · sensores · OEE' },
  { id: 'finanzas', label: 'Finanzas', icon: Landmark, image: '/images/ops-finance-legal-ai.webp', hint: 'Fraude · cobranza IA' },
  { id: 'salud', label: 'Salud', icon: HeartPulse, image: '/images/ops-health-or.webp', hint: 'Vitales · alertas clínicas' },
  { id: 'inmobiliaria', label: 'Inmobiliaria', icon: Building2, image: '/images/ops-realestate-interior-luxury.webp', hint: '3D · interior · MCP' },
  { id: 'construccion', label: 'Construcción', icon: HardHat, image: '/images/ops-construction-aerial1.webp', hint: 'Obra · cámaras IA' },
];

export function DashboardSectorRail() {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <p className="eyebrow">Explora por industria</p>
      <h3 className="mt-1 text-[20px] font-bold text-ink md:text-[24px]">Un clic y entras al dashboard de tu sector</h3>
      <p className="mt-2 max-w-2xl text-[14px] text-ink-2">
        Cada tarjeta abre la demo en vivo del sector — mapa de flota, planta, antifraude, clínica, inmobiliaria o construcción.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SECTORS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                track('hero_sector_click', { sector: s.id });
                scrollToDashboardSector(s.id);
              }}
              className="group relative overflow-hidden rounded-xl border border-line bg-white text-left shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-28"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Icon size={12} className="text-[#7eb3e8]" />
                  {s.label}
                </span>
                <span className="mt-0.5 block font-mono text-[9px] text-white/70">{s.hint}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
