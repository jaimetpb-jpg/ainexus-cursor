# Design Tokens — AI Nexus

Regla del acento: `#3B6EA5` SOLO en CTAs, estado "en vivo" de demos y dato clave. Todo lo demás monocromo (blanco/gris/grafito). El sitio se siente premium por whitespace, tipografía y motion disciplinado — no por color ni 3D.

## Paleta (reemplaza la vieja dark+lime)
| Token | Valor | Uso |
|---|---|---|
| `bg` | `#FFFFFF` | Fondo base |
| `bg-alt` | `#F5F5F7` | Secciones alternas |
| `bg-soft` | `#ECECEE` | Cards, divisores |
| `text` | `#141414` | Titulares |
| `text-2` | `#2C2C2C` | Cuerpo |
| `accent` | `#3B6EA5` | CTAs, "en vivo", dato clave |
| `accent-soft` | `#E8EEF5` | Fondo de estado activo |
| `whatsapp` | `#25D366` | Botón WhatsApp |
| `success` | `#22C55E` | Estado Completado |
| `warning` | `#F59E0B` | Requiere revisión / Escalado |
| `error` | `#EF4444` | Error |

**Eliminar del proyecto:** `hero-dark #0A0A0A`, `cream #F5F0E8`, `lime #7CB342`, `lime-hover`, gradientes dark y glow lime.

## Dónde cambiarlo (repo Vite actual)
- `app/tailwind.config.js` → reemplazar la sección `colors` de marca por la tabla de arriba.
- `app/src/index.css` → variables shadcn: `--primary` = grafito `#141414`; `--accent` = `#3B6EA5` (HSL ≈ `209 47% 44%`); `--background` blanco. Fondos alternos con `bg-alt`, nunca dark.
- Verificar que NINGÚN componente use `bg-hero-dark`/`bg-cream`/`text-lime` tras el re-skin.

## Tipografía
- Titulares: **Geist** (ya instalado), grande, con aire.
- Cuerpo: Inter / neutra legible.
- `font-display: swap`, fuentes self-host.

## Contraste / accesibilidad
- Grafito sobre blanco cumple AA. Verificar `#3B6EA5` sobre blanco para texto pequeño (usar en botones/acentos, no en párrafos largos).
