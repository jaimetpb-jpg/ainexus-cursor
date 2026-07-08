import { useState } from 'react';
import { INTEGRATIONS, INTEGRATIONS_MARQUEE, type Integration } from '@/data/integrations';

function IntegrationLogo({ item, size = 20 }: { item: Integration; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="grid place-items-center rounded-md font-bold text-white"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.45,
          backgroundColor: item.brandColor,
        }}
        aria-hidden
      >
        {item.fallbackLetter}
      </span>
    );
  }

  return (
    <img
      src={item.logo}
      alt={item.name}
      width={size}
      height={size}
      className="object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function LogoChip({ item, size = 'md' }: { item: Integration; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const imgSize = size === 'sm' ? 20 : 24;
  return (
    <div
      className={`grid ${dim} shrink-0 place-items-center rounded-xl border border-line bg-white shadow-card transition-transform hover:scale-110`}
      title={item.name}
    >
      <IntegrationLogo item={item} size={imgSize} />
    </div>
  );
}

function OrbitRing({
  items,
  radius,
  duration,
  reverse,
}: {
  items: Integration[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  const step = 360 / items.length;
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        animation: `${reverse ? 'orbit-reverse' : 'orbit'} ${duration}s linear infinite`,
      }}
    >
      {items.map((item, i) => {
        const angle = step * i;
        return (
          <div
            key={item.id}
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
            }}
          >
            <div
              style={{
                animation: `${reverse ? 'orbit' : 'orbit-reverse'} ${duration}s linear infinite`,
              }}
            >
              <LogoChip item={item} size="sm" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function IntegrationsOrbit() {
  const inner = INTEGRATIONS.slice(0, 8);
  const outer = INTEGRATIONS.slice(8, 18);

  return (
    <div className="relative mx-auto mt-10 flex min-h-[340px] max-w-3xl items-center justify-center md:min-h-[400px]">
      <OrbitRing items={inner} radius={95} duration={42} />
      <OrbitRing items={outer} radius={155} duration={58} reverse />

      <div className="relative z-10 max-w-[220px] px-4 text-center md:max-w-xs">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">Integraciones</p>
        <p className="mt-2 text-[22px] font-bold leading-tight text-ink md:text-[26px]">
          Conecta todo lo que ya usas
        </p>
        <p className="mt-2 text-[13px] text-ink-3">Sin migrar datos. Sin exportar a mano.</p>
      </div>
    </div>
  );
}

export function IntegrationsGrid() {
  return (
    <div className="mt-4">
      <IntegrationsOrbit />
      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 md:gap-4">
        {INTEGRATIONS.map((item) => (
          <LogoChip key={item.id} item={item} />
        ))}
      </div>
      <p className="mt-6 text-center text-[12px] text-ink-3">
        +50 herramientas más · ERP, CRM, mensajería, pagos y facturación en México
      </p>
    </div>
  );
}

export function IntegrationsMarquee() {
  const items = [...INTEGRATIONS_MARQUEE, ...INTEGRATIONS_MARQUEE];
  return (
    <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-4">
        {items.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 shadow-sm"
          >
            <IntegrationLogo item={item} size={22} />
            <span className="sr-only">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
