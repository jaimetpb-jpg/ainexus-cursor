import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

type Props = {
  headline?: string;
  message?: string;
  place: string;
};

export function ContentCTA({
  headline = '¿Quieres implementar esto en tu empresa?',
  message = 'Hola, leí su contenido sobre IA y automatización y quiero explorar una solución para mi empresa.',
  place,
}: Props) {
  return (
    <div className="mt-10 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 md:p-8">
      <h2 className="text-lg font-bold text-ink md:text-xl">{headline}</h2>
      <p className="mt-2 text-[14px] text-ink-2">Consultoría y diagnóstico sin costo. Respuesta por WhatsApp en horario laboral.</p>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('click_cta_article', { place })}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-white transition hover:opacity-90"
      >
        <WhatsAppIcon size={18} />
        Hablar con AI Nexus
      </a>
    </div>
  );
}
