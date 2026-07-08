import { useEffect, useState } from 'react';
import { Ban, Bot, MessageSquare, Phone, ShieldAlert, Wallet } from 'lucide-react';
import { OPS_IMAGES } from '@/lib/opsImages';
import { onImgError } from '@/lib/images';
import { FraudCommandCenter } from './FraudCommandCenter';

/** Pipeline visible de detección de fraude en tiempo real */
export function FraudDetectionPipeline() {
  const [step, setStep] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [score, setScore] = useState(94);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 5);
      if (step === 3) {
        setBlocked(true);
        setScore(Math.round(12 + Math.random() * 8));
        setTimeout(() => setBlocked(false), 2500);
        setTimeout(() => setScore(94), 4000);
      }
    }, 1800);
    return () => clearInterval(id);
  }, [step]);

  const nodes = [
    { label: 'Transacción entrante', sub: 'TX-88421 · $284,000', icon: Wallet },
    { label: 'Perfil histórico', sub: '847 operaciones · baseline', icon: ShieldAlert },
    { label: 'ML · patrón atípico', sub: 'Fuera de horario · monto 3.2σ', icon: ShieldAlert },
    { label: 'Score de riesgo', sub: `Score ${score}/100`, icon: ShieldAlert },
    { label: blocked ? 'BLOQUEO ACTIVO' : 'Liberación', sub: blocked ? 'Cuenta congelada 15 min' : 'Dentro de política', icon: Ban },
  ];

  return (
    <div className="space-y-3">
      <FraudCommandCenter />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {nodes.map((n, i) => {
          const active = i <= step;
          const isBlock = i === 4 && blocked;
          return (
            <div key={n.label} className="flex flex-1 items-center gap-1">
              <div
                className={`flex flex-1 flex-col rounded-lg border p-2.5 transition-all ${
                  isBlock
                    ? 'animate-pulse border-[#ff5765] bg-[#ff5765]/15'
                    : active
                      ? 'border-[#3b6ea5] bg-[#3b6ea5]/10'
                      : 'border-[#1b2735] bg-[#121a25] opacity-50'
                }`}
              >
                <n.icon size={14} className={isBlock ? 'text-[#ff5765]' : active ? 'text-[#7eb3e8]' : 'text-[#54667e]'} />
                <p className="mt-1 font-mono text-[9px] font-bold text-white">{n.label}</p>
                <p className="font-mono text-[8px] text-[#54667e]">{n.sub}</p>
              </div>
              {i < nodes.length - 1 && <div className={`hidden h-0.5 w-4 sm:block ${active ? 'bg-[#3b6ea5]' : 'bg-[#1b2735]'}`} />}
            </div>
          );
        })}
      </div>

      {blocked && (
        <div className="rounded-lg border border-[#ff5765]/40 bg-[#ff5765]/10 px-3 py-2 font-mono text-[10px] text-[#ff5765]">
          Agente Fraude · bloqueo preventivo ejecutado · supervisor y compliance notificados · revisión humana en curso
        </div>
      )}
    </div>
  );
}

/** Flujo visible de cobranza automatizada con agentes IA */
export function CollectionAutomationFlow() {
  const [activeChannel, setActiveChannel] = useState(0);
  const channels = [
    { icon: MessageSquare, name: 'WhatsApp IA', msg: 'Hola, su pago vence hoy. ¿Agendamos SPEI?', sent: 47, converted: 31 },
    { icon: Phone, name: 'Llamada IA', msg: 'Negociación activa · promesa $842k · 18:00', sent: 12, converted: 8 },
    { icon: Wallet, name: 'SPEI automático', msg: 'Link de pago generado · recordatorio T+2h', sent: 28, converted: 22 },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveChannel((c) => (c + 1) % 3), 2800);
    return () => clearInterval(id);
  }, []);

  const ch = channels[activeChannel];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-[#46d08a]/30">
        <img
          src={OPS_IMAGES.finance.collections}
          alt=""
          className="h-20 w-full object-cover opacity-55"
          onError={(e) => onImgError(e, OPS_IMAGES.finance.collectionsFb)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] to-transparent" />
        <p className="absolute bottom-2 left-3 font-mono text-[9px] font-bold text-[#46d08a]">Centro de cobranza · agentes IA activos</p>
      </div>
      <div className="flex gap-2">
        {channels.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setActiveChannel(i)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-2 transition-all ${
              i === activeChannel ? 'border-[#46d08a] bg-[#46d08a]/10' : 'border-[#1b2735] bg-[#121a25]'
            }`}
          >
            <c.icon size={14} className={i === activeChannel ? 'text-[#46d08a]' : 'text-[#54667e]'} />
            <span className="font-mono text-[8px] font-bold">{c.name}</span>
            <span className="font-mono text-[8px] text-[#54667e]">{c.converted}/{c.sent}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#1b2735] bg-[#0a0f16] p-3">
        <div className="flex items-start gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#46d08a]/20 text-[#46d08a]">
            <Bot size={14} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9px] text-[#54667e]">Agente Cobranza · {ch.name} · en vivo</p>
            <p className="mt-1 rounded-lg rounded-tl-none border border-[#1b2735] bg-[#121a25] px-3 py-2 text-[11px] text-[#c3d0e0]">
              {ch.msg}
            </p>
            <p className="mt-2 font-mono text-[8px] text-[#46d08a]">
              ✓ Respuesta automática · calificación de intención · escalado si no paga en 2h
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-[9px]">
        <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
          <p className="text-[#54667e]">Recuperado hoy</p>
          <p className="text-sm font-bold text-[#46d08a]">$1.24M</p>
        </div>
        <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
          <p className="text-[#54667e]">Promesas activas</p>
          <p className="text-sm font-bold text-white">47</p>
        </div>
        <div className="rounded border border-[#1b2735] bg-[#121a25] p-2 text-center">
          <p className="text-[#54667e]">Tasa conversión</p>
          <p className="text-sm font-bold text-[#7eb3e8]">67%</p>
        </div>
      </div>
    </div>
  );
}
