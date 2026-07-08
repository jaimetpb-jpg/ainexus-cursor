import { OPS_FALLBACK, OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';

type CameraFeedProps = {
  unitId: string;
  label: string;
  status: 'live' | 'alert' | 'off';
  image?: string;
  fallback?: string;
};

export function CameraFeed({
  unitId,
  label,
  status,
  image = OPS_IMAGES.logistics.highway,
  fallback = OPS_FALLBACK.logistics.highway,
}: CameraFeedProps) {
  const border =
    status === 'alert'
      ? 'border-[#ff5765]/50'
      : status === 'off'
        ? 'border-[#54667e]/40'
        : 'border-[#1b2735]';

  return (
    <div className={`relative overflow-hidden rounded-lg border ${border} bg-[#0a0f16]`}>
      <img
        src={image}
        alt={`Cámara ${unitId}`}
        className="h-32 w-full object-cover brightness-90 contrast-110 md:h-36"
        loading="lazy"
        onError={(e) => onImgError(e, fallback)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
        }}
      />

      <div className="absolute left-2 top-2 flex items-center gap-1.5">
        {status === 'live' && (
          <span className="flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#ff5765]">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#ff5765]" />
            REC
          </span>
        )}
        {status === 'alert' && (
          <span className="rounded bg-[#ff5765]/90 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
            ALERTA
          </span>
        )}
        {status === 'off' && (
          <span className="rounded bg-[#54667e]/80 px-1.5 py-0.5 font-mono text-[8px] text-white">APAGADO</span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
        <p className="font-mono text-[11px] font-bold text-white drop-shadow">{unitId}</p>
        <p className="font-mono text-[9px] text-[#c3d0e0]">{label}</p>
      </div>

      <div className="absolute right-2 top-2 font-mono text-[8px] font-semibold text-[#46d08a] drop-shadow">
        {status === 'live' ? 'HD · 30fps' : status === 'alert' ? 'MOTION' : '—'}
      </div>
    </div>
  );
}
