import { CalendarClock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CALENDLY_URL, waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

export function MobileBottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-line bg-white md:hidden">
      <a
        href="tel:+525525787385"
        className="flex flex-1 flex-col items-center justify-center text-ink-3"
      >
        <span className="text-xs font-medium">Llamar</span>
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('whatsapp_click', { place: 'mobile_bar' })}
        className="flex flex-1 flex-col items-center justify-center text-whatsapp"
      >
        <WhatsAppIcon size={20} />
        <span className="text-xs font-medium">WhatsApp</span>
      </a>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('calendly_click', { place: 'mobile_bar' })}
        className="flex flex-1 flex-col items-center justify-center text-ink-3"
      >
        <CalendarClock size={20} />
        <span className="text-xs font-medium">Agendar</span>
      </a>
    </nav>
  );
}
