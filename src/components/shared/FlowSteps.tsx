import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export type FlowStep = { paso: string; detalle: string };

export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative ml-1">
      <span aria-hidden className="absolute left-[11px] top-1 bottom-1 w-px bg-line" />
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <motion.li
            key={s.paso}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="relative flex gap-4 pb-5 last:pb-0"
          >
            <span
              className={`relative z-10 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                last ? 'bg-accent text-white' : 'bg-white text-accent ring-1 ring-accent/40'
              }`}
            >
              {last ? <Check size={13} /> : i + 1}
            </span>
            <div className="-mt-0.5">
              <p className="text-[15px] font-semibold text-ink">{s.paso}</p>
              <p className="text-[13px] text-ink-3">{s.detalle}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
