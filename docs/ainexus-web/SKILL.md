---
name: ainexus-web
description: >-
  Estándar único de verdad para el sitio web de AI Nexus (ainexus.com.mx): una
  agencia mexicana de IA (agentes, automatizaciones, sistemas de IA a la medida)
  para dueños/CEOs/gerentes NO técnicos. Úsalo SIEMPRE que se trabaje en el sitio
  de AINEXUS o su Home — diseño, copy, tokens de color, secciones, demos, dashboard,
  CTA de WhatsApp, performance o deploy — aunque no se mencione este skill por
  nombre. Cúbrelo también cuando aparezcan señales como: "la página de nexus",
  "ainexus", "el sitio", "el rediseño", "la home", "el hero", "el dashboard demo",
  "los agentes", "sección de servicios", o cuando se edite el proyecto Vite en
  app/ (React + shadcn + GSAP). Evita re-derivar decisiones ya cerradas: aquí
  están. Si una petición contradice estas reglas, señálalo con franqueza antes
  de proceder.
---

# AI Nexus — Estándar del Sitio Web

## Filosofía (leer primero, aplica a TODO)

**Decide por lo mejor para el cliente y la conversión, nunca por ego ni por lucir capacidad técnica.** El objetivo del sitio no es demostrar que somos avanzados; es que un empresario NO técnico entienda el beneficio en segundos y contacte. Cuando haya que elegir entre "impresionante" y "claro que convierte", gana claro que convierte. Un hero 3D espectacular que confunde o carga lento es peor que una demo simple que se entiende. Si algo se agrega solo porque "se ve pro", quítalo.

**Cero Mislead / franqueza:** si una instrucción choca con estas reglas (p.ej. "mete precios", "ponlo oscuro y futurista", "más animaciones 3D"), dilo directo y explica por qué baja conversión, luego deja decidir al dueño. No adules. No inventes cifras.

**No se roba, se mejora:** tomar lo mejor de cada referencia y adaptarlo; nunca copiar un sitio entero (evitar el "Frankenstein visual").

## Quién es el cliente
Dueños, CEOs, directores y gerentes de empresas medianas en México/LATAM. **No** son programadores ni founders tech. La mayoría verá el sitio en **mobile**. No saben qué es CRM, ERP, API, LLM, SaaS ni "agente". Lenguaje: simple, visual, orientado a dinero/tiempo/control.

## Columna vertebral (una sola idea)
> AI Nexus conecta inteligencia artificial con tus procesos para vender más, responder más rápido y operar con menos tareas manuales — y tú siempre tienes el control.

Servicios = **capacidades de IA** (agentes, agentes de voz, asistentes, automatizaciones, sistemas de IA a la medida). Ventas/atención/operación/inventario/ecommerce son el **dónde** se aplican, no el servicio.

## Reglas duras (do / don't)

**SÍ:**
- Fondo **blanco + gris claro + grafito**, un solo acento **azul suave `#3B6EA5`** usado con mesura.
- Máximo **6 secciones** en la Home. Lo demás va a pestañas internas.
- **Mostrar** el beneficio (demos, flujos visuales, dashboard, antes/después), no solo describirlo.
- Primero el **beneficio entendible**, después el término técnico en chiquito ("Ventas y clientes *(antes llamado CRM)*").
- **WhatsApp-first**: triple CTA (hero + barra sticky mobile + botón flotante), todos a `wa.me/525525787385`.
- Supervisión reencuadrada: *"La IA ejecuta y se monitorea sola. Tú tienes el control, sin estar vigilando."*
- Premium **pero ligero**: SVG/Lottie/CSS/GSAP, imágenes WebP/AVIF, lazy-load, Lighthouse mobile ≥90.
- Números de demo etiquetados **"ejemplo / simulación"** hasta tener casos reales.
- Garantía visible: *"Consultoría y diagnóstico sin costo · 30 días de garantía de satisfacción."*

**NO:**
- ❌ Verde/lima, dark dominante, azul eléctrico, violeta, look gamer/cyberpunk, robots genéricos, fotos de stock.
- ❌ Precios en la Home.
- ❌ Tecnicismos en la Home (SSO/SAML/OTEL/BDR/LLM…) → van a página de Tecnología.
- ❌ Formularios largos (máx 3 campos, nunca obligatorios).
- ❌ WebGL/3D pesado (mata mobile).
- ❌ Más de 6 secciones; listar 9 servicios en el hero.
- ❌ Cifras presentadas como resultados reales sin serlo.

## La Home en 6 secciones
1. **Hero + demo viva** — titular de resultado + mini-chat (responde) + flujo vertical + CTA WhatsApp.
2. **Antes / Después** — auto-reconocimiento del empresario.
3. **Casos por área** — tabs (Ventas/Atención/Logística/Manufactura/Ecommerce/Admin) con timeline vertical mobile.
4. **Servicios de IA** — cards por trabajo (no por taxonomía) + franja "conectamos tus herramientas".
5. **Dashboard joya + Confianza** — dashboard interactivo (Productividad↑/Costos↓/Oportunidades↑) + supervisión + seguridad simple + garantía.
6. **CTA** — cómo trabajamos (3 pasos) + WhatsApp + form opcional 3 campos.

El copy exacto y el layout están en `references/home-blueprint.md`.

## Cómo usar las referencias
Lee el archivo que aplique a la tarea; no cargues todo si no hace falta:
- `references/design-tokens.md` — colores, tipografía, uso del acento, qué reemplazar en el repo.
- `references/home-blueprint.md` — las 6 secciones con copy exacto y comportamiento mobile.
- `references/stack-setup.md` — stack real (Vite/React/shadcn/GSAP/recharts), setup previo (fuera de OneDrive, git, npm), deploy estático a Hostinger.
- `references/demos-cta.md` — demo del hero (con fallback), dashboard joya (recharts), demo de voz, triple CTA y número WhatsApp.
- `references/definition-of-done.md` — checklist de QA y GO/NO-GO antes de tocar producción.

## Fases
- **Fase 1 (ahora):** mock premium + estructura + performance. Demos con *fallback* simulado (nunca se ven rotos).
- **Fase 2 (después):** cablear demos reales al VPS (Evolution API + LiteLLM + n8n), voz real, datos reales del dashboard, i18n EN, landings verticales por industria para SEO.

## Antes de tocar producción
`ainexus.com.mx` en vivo NO se toca. Todo en rama `redesign-home` → build estático → **staging** → veredicto GO/NO-GO (ver `references/definition-of-done.md`) → recién ahí el swap, con aprobación del dueño.
