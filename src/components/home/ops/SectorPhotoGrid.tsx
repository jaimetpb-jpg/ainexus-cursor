import { onImgError } from '@/lib/images';

export type SectorPhoto = {
  id: string;
  label: string;
  sub?: string;
  image: string;
  fallback: string;
  status?: 'live' | 'alert' | 'off' | 'render3d';
};

type SectorPhotoGridProps = {
  photos: SectorPhoto[];
  cols?: 2 | 3 | 4;
};

/** Grid sectorial — LIVE solo rentas/bodegas; RENDER 3D para preventa; sin badge en fotos estáticas */
export function SectorPhotoGrid({ photos, cols = 2 }: SectorPhotoGridProps) {
  const grid = cols === 4 ? 'grid-cols-2 lg:grid-cols-4' : cols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2';

  return (
    <div className={`grid gap-2 ${grid}`}>
      {photos.map((p) => {
        const border =
          p.status === 'alert'
            ? 'border-[#ff5765]/50'
            : p.status === 'render3d'
              ? 'border-[#3b6ea5]/50'
              : p.status === 'live'
                ? 'border-[#46d08a]/40'
                : 'border-[#1b2735]';
        return (
          <div key={p.id} className={`group relative overflow-hidden rounded-lg border ${border} bg-[#0a0f16]`}>
            <img
              src={p.image}
              alt={p.label}
              className={`h-28 w-full object-cover brightness-90 contrast-105 md:h-32 ${
                p.status === 'render3d' ? 'group-hover:scale-105 transition-transform duration-700' : ''
              }`}
              loading="lazy"
              onError={(e) => onImgError(e, p.fallback)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            {p.status === 'live' && (
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#46d08a]">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#46d08a]" />
                LIVE
              </span>
            )}
            {p.status === 'render3d' && (
              <span className="absolute left-2 top-2 rounded bg-[#3b6ea5]/90 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
                3D · PREVENTA
              </span>
            )}
            {p.status === 'alert' && (
              <span className="absolute left-2 top-2 rounded bg-[#ff5765]/90 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
                ALERTA
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
              <p className="font-mono text-[10px] font-bold text-white drop-shadow">{p.id}</p>
              <p className="font-mono text-[9px] text-[#c3d0e0]">{p.label}</p>
              {p.sub && <p className="font-mono text-[8px] text-[#54667e]">{p.sub}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
