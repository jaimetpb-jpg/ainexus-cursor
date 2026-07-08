import { useEffect, useState } from 'react';

/** Loop cinematográfico — Ken Burns suave (estilo video, sin distracción) */
const HERO_LOOP = [
  '/images/hero-particles-bg.jpg',
  '/images/ops-logistics-highway.webp',
  '/images/ops-mfg-assembly.webp',
  '/images/industry-realstate.jpg',
] as const;

const INTERVAL_MS = 5500;

export function HeroVideoBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_LOOP.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {HERO_LOOP.map((src, i) => {
        const active = i === index;
        return (
          <img
            key={src}
            src={src}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
              active ? 'animate-hero-kenburns' : ''
            }`}
            style={{ opacity: active ? 1 : 0, zIndex: active ? 1 : 0 }}
          />
        );
      })}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.25) 68%, rgba(0,0,0,0.12) 100%)',
        }}
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/20" />
    </div>
  );
}

/** @deprecated Usar HeroVideoBackground */
export const HeroSlideshow = HeroVideoBackground;

export const HERO_SLIDESHOW = HERO_LOOP;
