import { motion } from 'framer-motion';
import { IMAGES, HERO_INDUSTRY_STRIP, FALLBACK, onImgError } from '@/lib/images';

/** Orbes animados de fondo */
export function OrbBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-[#5B8FC7]/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-whatsapp/15 blur-2xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
    </div>
  );
}

/** Panel visual grande — foto Kimi + miniaturas de sectores */
export function HeroVisualStack() {
  return (
    <div className="relative">
      {/* Imagen principal tipo Mirage/Kimi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-line shadow-card-hover ring-1 ring-white/10"
      >
        <div className="relative aspect-[4/5] min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
          <img
            src={IMAGES.partnersNetwork}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => onImgError(e, FALLBACK.partners)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Control operativo con IA
            </p>
            <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
              Ventas, operación y atención en un solo sistema
            </p>
            <span className="badge-demo mt-2 inline-block bg-white/15 text-white">Simulación visual</span>
          </div>
        </div>
      </motion.div>

      {/* Strip de industrias Kimi */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {HERO_INDUSTRY_STRIP.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-line shadow-card sm:h-24 sm:w-32"
          >
            <img
              src={item.src}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => onImgError(e, item.fb)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
            <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Segunda imagen flotante — caso de éxito genérico */}
      <motion.div
        className="absolute -left-4 top-8 z-10 hidden w-36 overflow-hidden rounded-2xl border-2 border-bg-elevated shadow-card lg:block xl:-left-8 xl:w-44"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <img
          src={IMAGES.caseStudy('mining')}
          alt=""
          className="aspect-square w-full object-cover"
          onError={(e) => onImgError(e, FALLBACK.caseStudy('mining'))}
        />
        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
        <span className="absolute bottom-2 left-2 rounded bg-ink/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
          Minería · DEMO
        </span>
      </motion.div>

      <motion.div
        className="absolute -right-3 bottom-24 z-10 hidden w-32 overflow-hidden rounded-2xl border-2 border-bg-elevated shadow-card lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
      >
        <img
          src={IMAGES.caseStudy('automotive')}
          alt=""
          className="aspect-[4/3] w-full object-cover"
          onError={(e) => onImgError(e, FALLBACK.caseStudy('automotive'))}
        />
        <span className="absolute bottom-2 left-2 rounded bg-ink/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
          Ventas · DEMO
        </span>
      </motion.div>
    </div>
  );
}
