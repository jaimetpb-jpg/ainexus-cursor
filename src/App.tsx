import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme';
import { AuthModalProvider } from '@/components/layout/AuthModal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import Home from '@/pages/Home';

const Servicios = lazy(() => import('@/pages/Servicios'));
const Sectores = lazy(() => import('@/pages/Sectores'));
const Noticias = lazy(() => import('@/pages/Noticias'));
const NoticiaDetalle = lazy(() => import('@/pages/NoticiaDetalle'));
const Articulos = lazy(() => import('@/pages/Articulos'));
const ArticuloDetalle = lazy(() => import('@/pages/ArticuloDetalle'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (pathname !== '/login' && pathname !== '/registro') {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

function AuthRoutes() {
  return <Home />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthModalProvider>
        <ScrollManager />
        <Navbar />
        <main>
          <Suspense fallback={<div className="container-x py-32 text-ink-3">Cargando…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/sectores" element={<Sectores />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
              <Route path="/articulos" element={<Articulos />} />
              <Route path="/articulos/:slug" element={<ArticuloDetalle />} />
              <Route path="/login" element={<AuthRoutes />} />
              <Route path="/registro" element={<AuthRoutes />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileBottomBar />
      </AuthModalProvider>
    </ThemeProvider>
  );
}
