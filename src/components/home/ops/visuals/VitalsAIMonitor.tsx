import { useEffect, useRef, useState } from 'react';
import { Activity, Bell, Bot, Stethoscope, Zap } from 'lucide-react';
import { OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';

type VitalState = {
  hr: number;
  spo2: number;
  bpSys: number;
  bpDia: number;
  temp: number;
};

type AlertLevel = 'normal' | 'warn' | 'crit';

function getAlert(v: VitalState): AlertLevel {
  if (v.spo2 < 90 || v.hr > 120 || v.hr < 50 || v.bpSys > 160) return 'crit';
  if (v.spo2 < 94 || v.hr > 100 || v.temp > 38.5) return 'warn';
  return 'normal';
}

function EcgWaveform({ alert }: { alert: AlertLevel }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      phaseRef.current += 0.12;

      ctx.fillStyle = '#0a0f16';
      ctx.fillRect(0, 0, w, h);

      const color = alert === 'crit' ? '#ff5765' : alert === 'warn' ? '#f2b33d' : '#46d08a';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x / w) * 8 + phaseRef.current;
        let y = h / 2 + Math.sin(t * 3) * 4;
        const beat = Math.sin(t * 0.8);
        if (beat > 0.92) y -= 22 * Math.pow(beat - 0.92, 0.3) * 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [alert]);

  return <canvas ref={canvasRef} className="h-16 w-full rounded-lg border border-[#1b2735]" aria-label="Electrocardiograma en vivo" />;
}

/** Monitor avanzado: signos vitales → Agente IA → alerta médico inmediata */
export function VitalsAIMonitor() {
  const [vitals, setVitals] = useState<VitalState>({ hr: 78, spo2: 96, bpSys: 128, bpDia: 82, temp: 36.8 });
  const [alertPulse, setAlertPulse] = useState(0);
  const [doctorNotified, setDoctorNotified] = useState(false);
  const [notifyStep, setNotifyStep] = useState(0);

  const alert = getAlert(vitals);
  const patient = 'URG-442 · Carlos R. · 67a';

  useEffect(() => {
    const id = setInterval(() => {
      setVitals(() => {
        const spike = Math.random() < 0.18;
        return {
          hr: spike ? Math.round(118 + Math.random() * 12) : Math.round(72 + Math.random() * 14),
          spo2: spike ? Math.round(84 + Math.random() * 5) : Math.round(94 + Math.random() * 5),
          bpSys: Math.round(118 + Math.random() * 18 + (spike ? 25 : 0)),
          bpDia: Math.round(75 + Math.random() * 12),
          temp: Math.round((36.4 + Math.random() * 1.2) * 10) / 10,
        };
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const level = getAlert(vitals);
    if (level === 'crit' || level === 'warn') {
      setAlertPulse((p) => p + 1);
      setNotifyStep(1);
      const t1 = setTimeout(() => setNotifyStep(2), 400);
      const t2 = setTimeout(() => setNotifyStep(3), 900);
      const t3 = setTimeout(() => {
        setNotifyStep(4);
        setDoctorNotified(true);
      }, 1400);
      const t4 = setTimeout(() => setDoctorNotified(false), 6000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
    setNotifyStep(0);
    return undefined;
  }, [vitals.hr, vitals.spo2, vitals.bpSys, vitals.temp, alertPulse]);

  const vitalColor = (key: keyof VitalState, val: number) => {
    if (key === 'spo2' && val < 90) return '#ff5765';
    if (key === 'spo2' && val < 94) return '#f2b33d';
    if (key === 'hr' && (val > 120 || val < 50)) return '#ff5765';
    if (key === 'hr' && val > 100) return '#f2b33d';
    if (key === 'bpSys' && val > 160) return '#ff5765';
    if (key === 'temp' && val > 38.5) return '#f2b33d';
    return '#46d08a';
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-[#1b2735]">
        <img
          src={OPS_IMAGES.health.or}
          alt=""
          className="h-28 w-full object-cover opacity-60 md:h-32"
          onError={(e) => onImgError(e, OPS_IMAGES.health.orFb)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-[#0a0f16]/80 to-transparent" />
        <div className="absolute left-3 top-3">
          <p className="font-mono text-[11px] font-bold text-white">{patient}</p>
          <p className="font-mono text-[9px] text-[#3fd0e8]">UCI · monitoreo continuo · SIMULACIÓN</p>
        </div>
        <div
          className={`absolute right-3 top-3 rounded-full px-2 py-1 font-mono text-[9px] font-bold ${
            alert === 'crit'
              ? 'animate-pulse bg-[#ff5765] text-white'
              : alert === 'warn'
                ? 'bg-[#f2b33d]/90 text-black'
                : 'bg-[#46d08a]/20 text-[#46d08a]'
          }`}
        >
          {alert === 'crit' ? 'CRÍTICO' : alert === 'warn' ? 'ATENCIÓN' : 'ESTABLE'}
        </div>
      </div>

      <EcgWaveform alert={alert} />

      <div className="grid grid-cols-5 gap-2">
        {(
          [
            ['FC', vitals.hr, 'lpm', 'hr'],
            ['SpO₂', vitals.spo2, '%', 'spo2'],
            ['TA', `${vitals.bpSys}/${vitals.bpDia}`, '', 'bpSys'],
            ['Temp', vitals.temp, '°C', 'temp'],
            ['Prev.', alert === 'crit' ? 42 : alert === 'warn' ? 71 : 94, '%', 'hr'],
          ] as const
        ).map(([label, val, unit, key]) => (
          <div key={label} className="rounded-lg border border-[#1b2735] bg-[#121a25] p-2 text-center">
            <p className="font-mono text-[8px] text-[#54667e]">{label}</p>
            <p className="font-mono text-lg font-bold" style={{ color: typeof val === 'number' ? vitalColor(key as keyof VitalState, val) : '#46d08a' }}>
              {val}
              <span className="text-[9px]">{unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Puente IA → médico — muy visible */}
      <div
        className={`rounded-xl border p-3 transition-all ${
          alert !== 'normal' ? 'border-[#ff5765]/50 bg-[#ff5765]/8 shadow-[0_0_24px_rgba(255,87,101,0.15)]' : 'border-[#1b2735] bg-[#0a0f16]'
        }`}
      >
        <p className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#7eb3e8]">
          Transmisión IA → médico de guardia
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {[
            { icon: Activity, label: 'Sensores', step: 1, active: notifyStep >= 1 || alert === 'normal' },
            { icon: Bot, label: 'Agente Vitales', step: 2, active: notifyStep >= 2 },
            { icon: Zap, label: 'Análisis IA', step: 3, active: notifyStep >= 3 },
            { icon: Bell, label: 'Alerta médico', step: 4, active: notifyStep >= 4 || doctorNotified },
            { icon: Stethoscope, label: 'Dr. en camino', step: 5, active: doctorNotified },
          ].map((node, i, arr) => (
            <div key={node.label} className="flex flex-1 items-center gap-1">
              <div
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 transition-all ${
                  node.active
                    ? node.step >= 4
                      ? 'border-[#ff5765] bg-[#ff5765]/15 text-[#ff5765]'
                      : 'border-[#3b6ea5] bg-[#3b6ea5]/15 text-[#7eb3e8]'
                    : 'border-[#1b2735] text-[#54667e]'
                }`}
              >
                <node.icon size={16} className={node.active && node.step >= 4 ? 'animate-pulse' : ''} />
                <span className="font-mono text-[8px] font-bold">{node.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`hidden h-0.5 flex-1 sm:block ${node.active ? 'bg-[#3b6ea5]' : 'bg-[#1b2735]'}`} />
              )}
            </div>
          ))}
        </div>
        {doctorNotified && (
          <p className="mt-3 animate-pulse rounded-lg border border-[#ff5765]/40 bg-[#ff5765]/10 px-3 py-2 font-mono text-[10px] font-bold text-[#ff5765]">
            ⚡ ALERTA ENVIADA · Dr. López notificado · push + intercom · tiempo respuesta 38s · SIMULACIÓN
          </p>
        )}
      </div>
    </div>
  );
}
