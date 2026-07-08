import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, Lock, Mail, User, UserPlus, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

type AuthTab = 'login' | 'signup';

type AuthModalContextValue = {
  open: (tab: AuthTab) => void;
  close: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<AuthTab | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const open = useCallback((t: AuthTab) => {
    setTab(t);
    track('auth_nav_click', { action: t === 'login' ? 'login' : 'signup' });
  }, []);

  const close = useCallback(() => {
    setTab(null);
    if (pathname === '/login' || pathname === '/registro') {
      navigate('/', { replace: true });
    }
  }, [navigate, pathname]);

  useEffect(() => {
    if (pathname === '/login') setTab('login');
    else if (pathname === '/registro') setTab('signup');
  }, [pathname]);

  useEffect(() => {
    if (!tab) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [tab, close]);

  return (
    <AuthModalContext.Provider value={{ open, close }}>
      {children}
      {tab && <AuthModalCard tab={tab} onTab={setTab} onClose={close} />}
    </AuthModalContext.Provider>
  );
}

function AuthModalCard({
  tab,
  onTab,
  onClose,
}: {
  tab: AuthTab;
  onTab: (t: AuthTab) => void;
  onClose: () => void;
}) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [signup, setSignup] = useState({ nombre: '', email: '', password: '' });

  const submitLogin = (e: FormEvent) => {
    e.preventDefault();
    track('auth_login_attempt', {});
    toast.info('Portal de clientes en lanzamiento. Te contactamos por WhatsApp para acceso anticipado.', {
      action: {
        label: 'WhatsApp',
        onClick: () => window.open(waLink('Hola, quiero acceso al portal de clientes AI Nexus.'), '_blank'),
      },
    });
  };

  const submitSignup = (e: FormEvent) => {
    e.preventDefault();
    track('auth_signup_attempt', {});
    toast.success('¡Gracias! Te avisamos cuando tu portal esté listo.', {
      action: {
        label: 'Agendar demo',
        onClick: () => window.open(waLink('Hola, quiero crear mi cuenta en AI Nexus y ver una demo.'), '_blank'),
      },
    });
    setSignup({ nombre: '', email: '', password: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button type="button" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar" />
      <div className="relative w-full max-w-[400px] rounded-2xl border border-line bg-bg-elevated p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-ink-3 hover:bg-bg-alt hover:text-ink"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="mb-5 flex justify-center">
          <Logo variant="icon" />
        </div>

        <div className="mb-5 flex rounded-lg border border-line bg-bg-alt p-1">
          <button
            type="button"
            onClick={() => onTab('login')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-[13px] font-semibold transition-colors ${
              tab === 'login' ? 'bg-accent text-white' : 'text-ink-3 hover:text-ink'
            }`}
          >
            <LogIn size={14} /> Log in
          </button>
          <button
            type="button"
            onClick={() => onTab('signup')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-[13px] font-semibold transition-colors ${
              tab === 'signup' ? 'bg-accent text-white' : 'text-ink-3 hover:text-ink'
            }`}
          >
            <UserPlus size={14} /> Sign up
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <h2 id="auth-modal-title" className="text-lg font-bold text-ink">
              Iniciar sesión
            </h2>
            <p className="mt-1 text-[13px] text-ink-3">Dashboards, agentes y reportes de tu cuenta.</p>
            <form onSubmit={submitLogin} className="mt-4 space-y-3">
              <Field icon={Mail} id="modal-login-email" type="email" label="Correo" placeholder="tu@empresa.com" value={loginEmail} onChange={setLoginEmail} />
              <Field icon={Lock} id="modal-login-pass" type="password" label="Contraseña" placeholder="••••••••" value={loginPass} onChange={setLoginPass} />
              <button type="submit" className="btn btn-dark w-full">
                Entrar
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 id="auth-modal-title" className="text-lg font-bold text-ink">
              Crear cuenta
            </h2>
            <p className="mt-1 text-[13px] text-ink-3">Diagnóstico sin costo y demo en vivo de tu sector.</p>
            <form onSubmit={submitSignup} className="mt-4 space-y-3">
              <Field icon={User} id="modal-reg-nombre" label="Nombre o empresa" placeholder="Tu nombre o empresa" value={signup.nombre} onChange={(v) => setSignup((s) => ({ ...s, nombre: v }))} />
              <Field icon={Mail} id="modal-reg-email" type="email" label="Correo" placeholder="tu@empresa.com" value={signup.email} onChange={(v) => setSignup((s) => ({ ...s, email: v }))} />
              <Field icon={Lock} id="modal-reg-pass" type="password" label="Contraseña" placeholder="Mínimo 8 caracteres" value={signup.password} onChange={(v) => setSignup((s) => ({ ...s, password: v }))} />
              <button type="submit" className="btn w-full bg-accent text-white hover:bg-accent/90">
                Crear cuenta gratis
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  icon: typeof Mail;
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[11px] font-semibold text-ink-2">
        {label}
      </label>
      <div className="relative mt-1">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-line bg-bg py-2 pl-9 pr-3 text-[13px] outline-none focus:border-accent"
        />
      </div>
    </div>
  );
}
