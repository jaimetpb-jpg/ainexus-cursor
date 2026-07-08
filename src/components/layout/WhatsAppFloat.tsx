import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      onClick={() => track('whatsapp_click', { place: 'float' })}
      className="fixed z-50 bottom-20 right-5 md:bottom-6 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-[#06301a] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
      style={{ bottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
