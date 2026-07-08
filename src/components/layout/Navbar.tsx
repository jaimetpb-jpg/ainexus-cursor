import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { useAuthModal } from './AuthModal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { NAV, waLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { useTheme } from '@/lib/theme';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { open: openAuth } = useAuthModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-shadow ${
        scrolled ? 'border-line shadow-card' : 'border-transparent'
      }`}
      style={{ backgroundColor: 'var(--navbar-bg)' }}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-3">
        <Logo />

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) =>
            n.href.startsWith('/#') ? (
              <a key={n.label} href={n.href} className="text-[14px] font-medium text-ink-2 transition-colors hover:text-ink">
                {n.label}
              </a>
            ) : (
              <Link key={n.label} to={n.href} className="text-[14px] font-medium text-ink-2 transition-colors hover:text-ink">
                {n.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => openAuth('login')}
            className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-ink-2 transition-colors hover:text-accent"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="rounded-lg border border-accent/40 bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
            title={theme === 'a' ? 'Tema oscuro' : 'Tema claro'}
            aria-label="Cambiar tema"
          >
            {theme === 'a' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('whatsapp_click', { place: 'navbar' })}
            className="btn btn-dark hidden lg:inline-flex"
          >
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button type="button" onClick={() => openAuth('login')} className="rounded-lg px-2 py-1.5 text-[12px] font-semibold text-ink-2">
            Log in
          </button>
          <button type="button" onClick={() => openAuth('signup')} className="rounded-lg bg-accent px-2 py-1.5 text-[12px] font-semibold text-white">
            Sign up
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-2"
            aria-label="Cambiar tema"
          >
            {theme === 'a' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg-elevated md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {NAV.map((n) =>
              n.href.startsWith('/#') ? (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-[15px] font-medium text-ink-2 hover:bg-bg-alt">
                  {n.label}
                </a>
              ) : (
                <Link key={n.label} to={n.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-[15px] font-medium text-ink-2 hover:bg-bg-alt">
                  {n.label}
                </Link>
              ),
            )}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('whatsapp_click', { place: 'navbar_mobile' })}
              className="btn btn-dark mt-2 w-full"
            >
              <WhatsAppIcon size={17} /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
