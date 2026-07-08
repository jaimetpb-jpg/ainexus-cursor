import { useEffect, useState } from 'react';
import { Box, Layers } from 'lucide-react';
import { onImgError } from '@/lib/images';

export type Render3DItem = {
  id: string;
  title: string;
  sub: string;
  image: string;
  fallback: string;
  progress?: number;
};

/** Showcase 3D preventa con animación Ken Burns — inmobiliaria y salud */
export function Render3DShowcase({ items, sector }: { items: Render3DItem[]; sector: 'inmobiliaria' | 'salud' }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);

  const accent = sector === 'salud' ? '#3fd0e8' : '#7eb3e8';

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-[#3b6ea5]/40 bg-[#0a0f16]">
        <div className="relative h-44 overflow-hidden md:h-52">
          {items.map((it, i) => (
            <img
              key={it.id}
              src={it.image}
              alt={it.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
                i === active ? 'animate-hero-kenburns opacity-100' : 'opacity-0'
              }`}
              onError={(e) => onImgError(e, it.fallback)}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-[#0a0f16]/30" />
          <span
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold text-white shadow-lg"
            style={{ backgroundColor: `${accent}cc` }}
          >
            <Layers size={11} className="animate-pulse" />
            RENDER 3D · PREVENTA
          </span>
          <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-[8px] text-white">
            SIMULACIÓN · recorrido virtual
          </span>
        </div>

        <div className="border-t border-[#1b2735] p-3">
          <p className="font-mono text-[11px] font-bold text-white">{item.title}</p>
          <p className="font-mono text-[9px] text-[#8295ad]">{item.sub}</p>
          {item.progress !== undefined && (
            <div className="mt-2">
              {item.progress >= 100 ? (
                <p className="font-mono text-[9px] font-bold text-[#46d08a]">✓ Interior acabado · tour virtual disponible</p>
              ) : (
                <>
                  <div className="flex justify-between font-mono text-[8px] text-[#54667e]">
                    <span>Avance de obra virtual</span>
                    <span style={{ color: accent }}>{item.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-[#1b2735] bg-[#121a25]">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%`, backgroundColor: accent }} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            onClick={() => setActive(i)}
            className={`flex flex-1 items-center gap-2 rounded-lg border p-2 text-left transition-all ${
              i === active ? 'border-[#3b6ea5] bg-[#3b6ea5]/15' : 'border-[#1b2735] bg-[#121a25] hover:border-[#3b6ea5]/40'
            }`}
          >
            <Box size={12} className={i === active ? 'text-[#7eb3e8]' : 'text-[#54667e]'} />
            <span className="font-mono text-[8px] font-bold text-white">{it.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
