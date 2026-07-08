# VISUAL-COMPARISON — Tema A vs Tema B

Comparación visual para que elijas la dirección antes de staging.

**Proyecto:** `C:\dev\ainexus-cursor`  
**Fecha:** 2026-07-07

---

## Cómo ver ambas variantes

```bash
cd C:\dev\ainexus-cursor
npm run dev
```

| Variante | URL | Estilo |
|----------|-----|--------|
| **A — Premium claro** | http://localhost:5173/?theme=a | Relevance / Sierra / Lumis · blanco + #3B6EA5 |
| **B — Cinematográfico oscuro** | http://localhost:5173/?theme=b | Mirage / Quest · negro + glow azul |

**Toggle:** botón **Tema A / Tema B** en la navbar (guarda preferencia en `localStorage`).

---

## Resumen

| Aspecto | Tema A | Tema B |
|---------|--------|--------|
| Fondo | Blanco / gris claro | Negro `#0A0A0A` |
| Hero foto | `hero-cinematic-mx.webp` (cálida) | `hero-control-tower.webp` (más dramática) |
| Legibilidad CEO | Máxima, corporativa | Más impacto, estilo premium tech |
| Cumple skill original (paleta clara) | **Sí** | Parcial (oscuro, pero sin lime Kimi) |
| Referencias del usuario | Relevance, Sierra, Lumis, Stratic | Mirage, Quest, Kimi mejorado |

---

## Qué cambió vs build anterior

### Hero (100vh)
- Pantalla completa con foto de fondo visible + mesh animado
- Titular grande con **24/7** en gradiente
- Cards flotantes (Lead calificado, Cita, Dashboard) — todas etiquetadas **DEMO / Simulación**
- Chat WhatsApp en shell tipo app (AIStarterkit)
- Animaciones de entrada (framer-motion)

### Imágenes
- 21 JPG → **WebP** optimizado (`npm run images`)
- Nuevas: `hero-cinematic-mx.webp`, `hero-control-tower.webp`
- BeforeAfter con fotos reales
- Sectores: cards horizontales estilo Mirage con fotos full-bleed

### Secciones
- **CasosPorArea:** diagramas de nodos tipo Relevance + strip L1–L4
- **ServiciosPreview:** cards con mockups UI (chat, voz, flujo, dashboard)
- **Servicios:** diagramas grandes + grid de integraciones
- **CTA:** pasos con iconos + fondo mesh

### Animaciones
- Reveal con blur + translate
- Navbar glassmorphism
- Marquee herramientas
- Floating cards en hero (respeta `prefers-reduced-motion`)

---

## Performance (build 2026-07-07)

| Métrica | Valor |
|---------|-------|
| Bundle inicial gzip | **102 KB** |
| CSS gzip | 7 KB |
| recharts | Lazy |
| Imágenes | WebP + fallback JPG onError |

> Ejecutar Lighthouse en ambos temas antes de producción.

---

## Reglas respetadas

- [x] Sin precios
- [x] Sin testimonios / nombres de clientes
- [x] Sin contadores fake en hero
- [x] WhatsApp `525525787385`
- [x] Garantía única
- [x] Demos etiquetados DEMO / Simulación / ejemplo
- [x] Home 6 secciones (mismo copy blueprint)

---

## Recomendación

| Si priorizas… | Elige |
|---------------|-------|
| Claridad para dueño no técnico, GO según skill | **Tema A** |
| Impacto visual máximo, competir con sitios Framer | **Tema B** |
| No decides aún | Prueba ambos en móvil y desktop |

**Siguiente paso:** Dime **A** o **B** y dejamos una sola variante para staging en Hostinger.
