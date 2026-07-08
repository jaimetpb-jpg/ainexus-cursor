import { useState } from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';

const PLOTS = [
  { id: 'LT-442', zone: 'Corredor Querétaro', ha: 4.2, score: 91, price: '$12.4M', roi: '18%', tone: 'ok' as const },
  { id: 'LT-318', zone: 'Zona industrial León', ha: 8.1, score: 84, price: '$22.1M', roi: '14%', tone: 'ok' as const },
  { id: 'LT-551', zone: 'Periferia CDMX sur', ha: 2.8, score: 72, price: '$38.5M', roi: '22%', tone: 'warn' as const },
  { id: 'LT-229', zone: 'Riviera Veracruz', ha: 12.0, score: 88, price: '$8.9M', roi: '16%', tone: 'ok' as const },
];

const MCP_PLATFORMS = ['Inmuebles24', 'Propiedades.com', 'Lamudi', 'Vivanuncios', 'Metros Cúbicos', 'Portal MCP'];

/** Mapa de análisis de terrenos estilo Google Maps + scoring IA */
export function LandAnalysisMap() {
  const [selected, setSelected] = useState(0);
  const plot = PLOTS[selected];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-[#1b2735]">
        <img
          src={OPS_IMAGES.inmobiliaria.land}
          alt=""
          className="h-40 w-full object-cover md:h-48"
          onError={(e) => onImgError(e, OPS_IMAGES.inmobiliaria.landFb)}
        />
        <div className="absolute inset-0 bg-[#0a0f16]/30" />
        {PLOTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(i)}
            className={`absolute font-mono text-[8px] font-bold transition-transform hover:scale-110 ${
              i === 0 ? 'left-[18%] top-[35%]' : i === 1 ? 'left-[45%] top-[28%]' : i === 2 ? 'left-[62%] top-[55%]' : 'left-[28%] top-[68%]'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                selected === i ? 'border-[#3fd0e8] bg-[#3fd0e8] text-black' : 'border-white bg-[#ff5765] text-white'
              }`}
            >
              <MapPin size={10} />
            </span>
          </button>
        ))}
        <div className="absolute bottom-2 left-2 right-2 rounded-lg border border-[#1b2735]/80 bg-[#0a0f16]/90 p-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] font-bold text-white">{plot.id} · {plot.zone}</p>
          <p className="font-mono text-[9px] text-[#7eb3e8]">
            Score IA {plot.score}/100 · {plot.ha} ha · ROI proyectado {plot.roi} · {plot.price}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {MCP_PLATFORMS.map((p) => (
          <span key={p} className="rounded-full border border-[#3b6ea5]/40 bg-[#3b6ea5]/10 px-2 py-0.5 font-mono text-[8px] text-[#7eb3e8]">
            MCP · {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProspectPipeline() {
  const stages = [
    { stage: 'Lead MCP', count: 124, pct: 100 },
    { stage: 'Calificado IA', count: 67, pct: 54 },
    { stage: 'Visita agendada', count: 28, pct: 23 },
    { stage: 'Oferta', count: 11, pct: 9 },
    { stage: 'Cierre', count: 4, pct: 3 },
  ];
  return (
    <div className="space-y-2">
      {stages.map((s) => (
        <div key={s.stage}>
          <div className="flex justify-between font-mono text-[9px]">
            <span className="text-[#c3d0e0]">{s.stage}</span>
            <span className="text-[#7eb3e8]">{s.count} · {s.pct}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#3b6ea5] to-[#3fd0e8]" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
      <p className="flex items-center gap-1 font-mono text-[8px] text-[#54667e]">
        <TrendingUp size={10} /> Agente Prospección · oportunidades detectadas en 6 plataformas vía MCP
      </p>
    </div>
  );
}
