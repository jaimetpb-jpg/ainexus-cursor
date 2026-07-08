# AINEXUS — Versión Cursor

Sitio web profesional para **ainexus.com.mx** (staging). Proyecto paralelo a `ainexus-claude`, construido con el skill `ainexus-web`.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 3.4
- react-router-dom (BrowserRouter)
- react-helmet-async + prerender post-build
- framer-motion, recharts (lazy), sonner

## Desarrollo

```bash
npm install
npm run dev
```

### Comparar temas visuales

- **Tema A (claro):** http://localhost:5173/?theme=a
- **Tema B (oscuro):** http://localhost:5173/?theme=b

Ver `VISUAL-COMPARISON.md` para elegir antes de staging.

## Build

```bash
npm run build
```

Genera `dist/` con:
- HTML prerenderizado para `/`, `/servicios`, `/sectores`
- `sitemap.xml` y `robots.txt`

## Estructura

- `src/pages/` — Home, Servicios, Sectores
- `src/components/home/` — 6 secciones del blueprint
- `src/data/` — servicios, industrias, casos demo
- `public/images/` — assets del zip AINEXUS
- `docs/ainexus-web/` — referencias del skill

## Reglas de negocio

- Sin precios en el sitio
- Sin testimonios ni nombres de clientes
- WhatsApp: `525525787385`
- Demos etiquetados como simulación / ejemplo ilustrativo

Ver `COMPARISON.md` para evaluación vs Claude.
