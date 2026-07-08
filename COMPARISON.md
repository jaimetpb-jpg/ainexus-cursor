# COMPARISON: ainexus-cursor vs ainexus-claude

Evaluación objetiva lado a lado para decidir GO/NO-GO antes de staging.

**Fecha:** 2026-07-06  
**Cursor:** `C:\dev\ainexus-cursor` (rama `redesign-home`)  
**Claude:** `C:\dev\ainexus-claude`

---

## Resumen ejecutivo

| Criterio | Claude | Cursor | Ganador |
|----------|--------|--------|---------|
| Claridad empresario (1–5) | 4 | **5** | Cursor |
| Demo hero funcional | Sí | Sí | Empate |
| Profundidad Sectores/Servicios | Sectores (6 áreas proceso) | **8 industrias + /servicios** | **Cursor** |
| Imágenes reales | No | **Sí (zip AINEXUS)** | **Cursor** |
| SEO técnico | Helmet SPA | **Prerender + sitemap + JSON-LD** | **Cursor** |
| Performance mobile | ~142 KB gzip inicial | **~99 KB gzip inicial** | **Cursor** |
| Lighthouse local (preview) | — | Perf 58 · A11y 96 · BP 100 · SEO 100 | Validar en staging |
| Honestidad (sin claims falsos) | Sí | Sí | Empate |

**Recomendación:** **GO para staging** con versión Cursor como candidata principal.

---

## 1. Claridad para empresario no técnico (1–5)

| | Claude | Cursor |
|---|--------|--------|
| Puntuación | 4 | **5** |
| Notas | Copy claro, sin precios | + página `/servicios` dedicada, sectores por industria reconocible, etiquetas "ejemplo ilustrativo" / "Simulación" visibles |

---

## 2. Demo hero funcional

| | Claude | Cursor |
|---|--------|--------|
| Chat interactivo | Sí | Sí |
| Flujo vertical iluminado | Sí | Sí |
| Sin contadores fake en hero | Sí | Sí |
| `aria-live` | Sí | Sí |

---

## 3. Profundidad Sectores / Servicios

| | Claude | Cursor |
|---|--------|--------|
| Rutas | `/` + `/sectores` | `/` + **`/servicios`** + `/sectores` |
| Sectores | 6 áreas de proceso (Ventas, Atención…) | **8 verticales industriales** (Minería, Automotriz, Agro…) |
| Servicios | Solo preview en Home | **6 cards expandibles** con flujo SVG + CTA por servicio |
| Franja herramientas | No | Sí (WhatsApp, Gmail, HubSpot, Odoo, SAP) |

---

## 4. Uso de imágenes reales

| | Claude | Cursor |
|---|--------|--------|
| Hero background | No | `hero-particles-bg.jpg` |
| Sectores | Solo íconos Lucide | **Fotos industriales** con overlay |
| OG image | Genérico | `og-image.jpg` del zip |

---

## 5. SEO técnico

| | Claude | Cursor |
|---|--------|--------|
| react-helmet-async | Sí | Sí |
| Prerender estático | No | **Sí** (`dist/servicios/index.html`, `dist/sectores/index.html`) |
| sitemap.xml | No | **Sí** |
| robots.txt | No | **Sí** |
| JSON-LD | Básico | Organization + WebSite (Home) + ItemList/Service (`/servicios`) |

---

## 6. Performance mobile (build 2026-07-06)

| Métrica | Claude (ref.) | Cursor |
|---------|---------------|--------|
| Bundle inicial gzip | ~142 KB | **99.11 KB** (`index-*.js`) |
| recharts | Lazy | Lazy (`LazyMount` + `React.lazy`) |
| framer-motion | Chunk separado | Chunk separado (133 KB, lazy en páginas) |
| CSS gzip | — | 5.82 KB |

> Lighthouse mobile ≥90: ejecutar con `npm run preview` + Lighthouse CLI en cada ruta antes de producción.

---

## 7. Honestidad

| Regla | Claude | Cursor |
|-------|--------|--------|
| Sin precios | ✓ | ✓ |
| Sin testimonios / nombres clientes | ✓ | ✓ |
| Sin contadores fake hero | ✓ | ✓ |
| Dashboard etiquetado "Simulación" | ✓ | ✓ |
| WhatsApp unificado `525525787385` | ✓ | ✓ |
| Garantía única | ✓ | ✓ |
| Paleta blanco/grafito/#3B6EA5 | ✓ | ✓ |

---

## Definition of Done (checklist)

- [x] `npm run build` limpio
- [x] `dist/` con HTML estático por ruta (prerender post-build)
- [x] Bundle inicial < 150 KB gzip
- [x] `prefers-reduced-motion` desactiva animaciones infinitas
- [x] Cero precios, cero lime/dark Kimi, cero placeholders `871XXXXXXX`
- [ ] Lighthouse mobile ≥ 90 en `/`, `/servicios`, `/sectores` (validar en preview local)

---

## Cómo probar localmente

```bash
cd C:\dev\ainexus-cursor
npm run dev          # http://localhost:5173
npm run build
npm run preview      # http://localhost:4173
```

---

## Próximo paso

1. Subir `dist/` a subdominio staging en Hostinger (sin tocar `ainexus.com.mx`)
2. Correr Lighthouse en staging
3. Decisión GO/NO-GO del dueño
