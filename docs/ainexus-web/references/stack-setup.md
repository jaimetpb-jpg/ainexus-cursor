# Stack y Setup — AI Nexus (proyecto real)

## Stack real (verificado)
- **Vite 7 + React 19 + TypeScript** (SPA, client-side). NO es Next.js.
- Routing: `react-router-dom` v7 con **HashRouter**.
- Estilos: **Tailwind 3.4 + shadcn/ui (Radix)**.
- Animación: **framer-motion + GSAP (+ ScrollTrigger) + Lenis** (ya instalados).
- Datos/UI: **recharts** (para el dashboard joya), embla-carousel, sonner, react-hook-form + zod.
- Fuentes: Geist. i18n: ninguno (monolingüe español; EN es Fase 2).

## Ubicación
El proyecto real vive en `app/` dentro de la carpeta contenedora. NO confundir con el kit NEXUS FORGE (Next.js), que es otro proyecto.

## Setup previo OBLIGATORIO (Paso 0.5) — antes de tocar código
1. **Mover fuera de OneDrive** → `C:\dev\ainexus` (OneDrive corrompe node_modules/.git).
2. `git init` + commit inicial (hoy no hay control de versiones).
3. `npm install` dentro de `app/`.
4. Crear rama `redesign-home`.
5. `index.html`: `lang="en"` → `lang="es"`.
6. Reemplazar números WhatsApp viejos/placeholder por `525525787385` (ver demos-cta.md).

## Reconstruir, no parchar
Reconstruir `Home.tsx` desde cero con las 6 secciones sobre los tokens nuevos, en vez de editar quirúrgicamente las 14 secciones dark actuales. Conservar los componentes buenos: Navbar, Footer, WhatsAppSticky, MobileBottomBar, la librería shadcn/ui y el setup de GSAP/Lenis.

## Deploy
Hosting estático en Hostinger: `npm run build` → subir carpeta `dist/`. `base: './'` + HashRouter ya lo permiten. Preparar Cloudflare delante para CDN/caché. Producción (`ainexus.com.mx`) intacta hasta el swap aprobado.

## Performance (obligatorio)
Imágenes WebP/AVIF + lazy; animación GSAP/CSS/SVG; `dynamic import` para dashboard y demos; sin WebGL pesado; LCP <2.5s mobile; Lighthouse mobile ≥90; respetar `prefers-reduced-motion`.
