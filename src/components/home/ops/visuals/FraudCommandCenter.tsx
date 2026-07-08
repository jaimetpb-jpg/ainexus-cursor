import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';

/** Centro antifraude — analista revisando pantallas IA (sin robots) */
export function FraudCommandCenter() {
  const [alertFlash, setAlertFlash] = useState(false);

  useEffect(() => {
    const a = setInterval(() => setAlertFlash((f) => !f), 1400);
    return () => clearInterval(a);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#ff5765]/30">
      <img
        src={OPS_IMAGES.finance.fraud}
        alt=""
        className="h-36 w-full object-cover object-[center_40%] brightness-[1.15] contrast-105 saturate-110 md:h-44"
        onError={(e) => onImgError(e, OPS_IMAGES.finance.fraudFb)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16]/80 via-[#0a0f16]/20 to-transparent" />

      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#ff5765]/90 px-2.5 py-1 font-mono text-[8px] font-bold text-white">
        <ShieldAlert size={10} className={alertFlash ? 'animate-pulse' : ''} />
        ANTIFRAUDE IA · SIMULACIÓN
      </span>

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        <span
          className={`rounded border px-2 py-1 font-mono text-[8px] font-bold backdrop-blur-md ${
            alertFlash ? 'border-[#ff5765]/60 bg-[#ff5765]/20 text-[#ff5765]' : 'border-[#3b6ea5]/40 bg-[#0a0f16]/85 text-[#7eb3e8]'
          }`}
        >
          {alertFlash ? '● TX bloqueada · Score 94' : '● Analista + pantallas IA activas'}
        </span>
        <span className="rounded border border-[#46d08a]/40 bg-[#0a0f16]/85 px-2 py-1 font-mono text-[8px] text-[#46d08a] backdrop-blur-md">
          Revisión humana en curso
        </span>
      </div>

      <p className="absolute bottom-0 left-0 right-0 bg-[#0a0f16]/90 px-3 py-2 font-mono text-[10px] font-bold text-[#ff5765]">
        Centro antifraude · monitoreo 24/7 · analistas revisando detectores IA
      </p>
    </div>
  );
}
