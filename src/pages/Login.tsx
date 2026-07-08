import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Logo } from '@/components/layout/Logo';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track('auth_login_attempt', {});
    toast.info('Portal de clientes en lanzamiento. Te contactamos por WhatsApp para acceso anticipado.', {
      action: {
        label: 'WhatsApp',
        onClick: () => window.open(waLink('Hola, quiero acceso al portal de clientes AI Nexus.'), '_blank'),
      },
    });
  };

  return (
    <>
      <Seo title="Iniciar sesión | AI Nexus" description="Accede al portal de clientes AI Nexus." path="/login" />
      <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-bg-alt py-12">
        <div className="container-x w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl border border-line bg-bg-elevated p-8 shadow-card">
            <h1 className="flex items-center gap-2 text-xl font-bold text-ink">
              <LogIn size={22} className="text-accent" /> Iniciar sesión
            </h1>
            <p className="mt-2 text-sm text-ink-3">Dashboards, agentes y reportes de tu cuenta AI Nexus.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="login-email" className="text-xs font-semibold text-ink-2">
                  Correo
                </label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="login-pass" className="text-xs font-semibold text-ink-2">
                  Contraseña
                </label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    id="login-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-full">
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-3">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="font-semibold text-accent hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
