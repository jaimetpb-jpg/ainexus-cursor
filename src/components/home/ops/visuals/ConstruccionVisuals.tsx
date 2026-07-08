import { useEffect, useState } from 'react';
import { Camera, HardHat, Package, Shield, TrendingUp } from 'lucide-react';
import { OPS_IMAGES, OPS_PHOTO_SETS } from '@/lib/opsImages';
import { CameraFeed } from '../CameraFeed';
import { SectorPhotoGrid } from '../SectorPhotoGrid';

const PHASES = [
  { name: 'Cimentación', pct: 100 },
  { name: 'Estructura', pct: 78 },
  { name: 'Instalaciones', pct: 42 },
  { name: 'Acabados', pct: 12 },
  { name: 'Entrega', pct: 0 },
];

const MATERIALS = [
  { name: 'Acero estructural', qty: '284 t', pct: 72, color: '#7eb3e8' },
  { name: 'Concreto premezclado', qty: '1,240 m³', pct: 58, color: '#54667e' },
  { name: 'Piso porcelanato', qty: '8,400 m²', pct: 34, color: '#f2b33d' },
  { name: 'Tablaroca / drywall', qty: '12,000 m²', pct: 41, color: '#46d08a' },
];

export function ConstructionProgress() {
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setDelay((d) => !d), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-3">
      <SectorPhotoGrid photos={[...OPS_PHOTO_SETS.construccion]} cols={2} />

      <div className="space-y-2">
        {PHASES.map((p) => (
          <div key={p.name}>
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-[#c3d0e0]">{p.name}</span>
              <span className={p.pct < 50 && delay && p.name === 'Instalaciones' ? 'text-[#f2b33d]' : 'text-[#46d08a]'}>
                {p.pct}%
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${p.pct}%`,
                  backgroundColor: p.pct < 50 && delay && p.name === 'Instalaciones' ? '#f2b33d' : '#3b6ea5',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#1b2735] bg-[#121a25] p-3">
        <p className="mb-2 flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase text-[#7eb3e8]">
          <Package size={11} /> Inventario de materiales · control IA
        </p>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <div key={m.name}>
              <div className="flex justify-between font-mono text-[9px]">
                <span className="text-[#c3d0e0]">{m.name}</span>
                <span style={{ color: m.color }}>{m.qty} · {m.pct}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-[#1b2735] bg-[#0a0f16]">
                <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConstructionAICameras() {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setAlert((a) => !a), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-2">
      <p className="font-mono text-[9px] text-[#54667e]">Cámaras IA · vistas aéreas + calidad en tiempo real</p>
      <div className="grid grid-cols-2 gap-2">
        <CameraFeed
          unitId="DRON-A1"
          label="Torre · vista aérea A"
          status="live"
          image={OPS_IMAGES.construccion.aerial1}
          fallback={OPS_IMAGES.construccion.aerial1Fb}
        />
        <CameraFeed
          unitId="DRON-A2"
          label="Torre · vista aérea B"
          status="live"
          image={OPS_IMAGES.construccion.aerial2}
          fallback={OPS_IMAGES.construccion.aerial2Fb}
        />
        <CameraFeed
          unitId="AI-HLM"
          label="Casco IA · supervisor"
          status="live"
          image={OPS_IMAGES.construccion.aiWorker}
          fallback={OPS_IMAGES.construccion.aiWorkerFb}
        />
        <CameraFeed
          unitId="CAM-N2"
          label={alert ? 'Hormigón · defecto IA' : 'Calidad · OK'}
          status={alert ? 'alert' : 'live'}
          image={OPS_IMAGES.construccion.quality}
          fallback={OPS_IMAGES.construccion.qualityFb}
        />
      </div>
      {alert && (
        <div className="rounded-lg border border-[#ff5765]/40 bg-[#ff5765]/10 px-3 py-2 font-mono text-[9px] text-[#ff5765]">
          <span className="flex items-center gap-1.5 font-bold">
            <Camera size={11} /> Agente Calidad · fisura losa P3 · tablet IA notificó supervisor
          </span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 font-mono text-[8px]">
        <div className="flex items-center gap-1 rounded border border-[#1b2735] bg-[#121a25] p-2">
          <HardHat size={12} className="text-[#f2b33d]" />
          <span>Cascos IA 24</span>
        </div>
        <div className="flex items-center gap-1 rounded border border-[#1b2735] bg-[#121a25] p-2">
          <Shield size={12} className="text-[#46d08a]" />
          <span>0 incidentes</span>
        </div>
        <div className="flex items-center gap-1 rounded border border-[#1b2735] bg-[#121a25] p-2">
          <TrendingUp size={12} className="text-[#7eb3e8]" />
          <span>+2% vs plan</span>
        </div>
      </div>
    </div>
  );
}
