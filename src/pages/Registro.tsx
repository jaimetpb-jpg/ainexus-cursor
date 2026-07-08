import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Logo } from '@/components/layout/Logo';
import { waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track('auth_signup_attempt', {});
    toast.success('¡Gracias! Te avisamos cuando tu portal esté listo.', {
      action: {
        label: 'Agendar demo',
        onClick: () => window.open(waLink('Hola, quiero crear mi cuenta en AI Nexus y ver una demo.'), '_blank'),
      },
    });
    setForm({ nombre: '', email: '', password: '' });
  };

  return (
    <>
      <Seo title="Crear cuenta | AI Nexus" description="Regístrate en AI Nexus para dashboards y agentes IA." path="/registro" />
      <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-bg-alt py-12">
        <div className="container-x w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl border border-line bg-bg-elevated p-8 shadow-card">
            <h1 className="flex items-center gap-2 text-xl font-bold text-ink">
              <UserPlus size={22} className="text-accent" /> Crear cuenta
            </h1>
            <p className="mt-2 text-sm text-ink-3">Empieza con diagnóstico sin costo y demo en vivo de tu sector.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="reg-nombre" className="text-xs font-semibold text-ink-2">
                  Nombre o empresa
                </label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    id="reg-nombre"
                    value={form.nombre}
                    onChange={(e) => setForm((s) => ({ ...s, nombre: e.target.value }))}
                    placeholder="Tu nombre o empresa"
                    className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="reg-email" className="text-xs font-semibold text-ink-2">
                  Correo
                </label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder="tu@empresa.com"
                    className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="reg-pass" className="text-xs font-semibold text-ink-2">
                  Contraseña
                </label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
                  <input
                    id="reg-pass"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
              <button type="submit" className="btn bg-accent w-full text-white hover:bg-accent/90">
                Crear cuenta gratis
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-3">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-semibold text-accent hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
