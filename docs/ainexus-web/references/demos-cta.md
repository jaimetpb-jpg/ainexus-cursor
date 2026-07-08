# Demos y CTA — AI Nexus

## Filosofía de los demos
El diferenciador es **mostrar la IA funcionando**, no describirla. Pero en Fase 1 nunca deben verse rotos: si no hay backend, usan *fallback* simulado suave. La demo debe entenderse sin instrucciones, en <15s, en un teléfono.

## Demo 1 — Agente WhatsApp (Hero)
- Mini-chat: el visitante escribe y recibe respuesta.
- **Fase 1 (fallback):** respuestas simuladas de un array local, delay 600–900ms, indicador "escribiendo…". Nunca mostrar error; si algo falla, caer al fallback.
- **Preparar Fase 2:** hook `useAgentDemo()` que lee `VITE_DEMO_AGENT_URL` (Evolution API + LiteLLM del VPS). Sin env → fallback. Nunca hardcodear claves; usar variables de entorno.
- Al responder: animar los chips de flujo en secuencia (stagger ~120ms).
- A11y: `aria-live="polite"` en el área de respuestas.

## Demo 2 — Dashboard joya (Sección 5)
- **recharts** (ya instalado). 3 números grandes con count-up (Productividad↑/Costos↓/Oportunidades↑) + tarjetas con estados de color (success/warning/error).
- Interactivo: toggle vista día/semana/área. Datos demo **etiquetados "simulación"**.
- Reutilizar patrones de dashboards existentes de NEXUS, re-vestidos premium.
- Lazy-load todo el bloque (`dynamic import`). Mobile: cards verticales con número grande.

## Demo 3 — Voz ("Escúchalo")
- Botón en la card de agente de voz que reproduce un audio comprimido (`.mp3`/`.ogg`), `<audio preload="none">`, lazy, sin autoplay. Estados play/pausa.

## CTA — WhatsApp-first (triple CTA)
- **Número:** 55 2578 7385 (solo WhatsApp).
- **Link:** `https://wa.me/525525787385?text=Hola,%20quiero%20automatizar%20un%20proceso%20de%20mi%20empresa`
- **Triple CTA:** Hero (`Hablar por WhatsApp`) + barra sticky inferior en mobile (`MobileBottomBar`) + botón flotante (`WhatsAppSticky`). Todos al mismo wa.me con mensaje pre-llenado.
- Secundario: `Agendar llamada` → Calendly (`calendly.com/ainexus`) o WhatsApp.
- Form opcional: máx 3 campos (Nombre · Empresa · WhatsApp/correo), nunca obligatorio, `react-hook-form + zod`, toast con `sonner`.
- **Sin precios en ninguna parte de la Home.**

## Insight de conversión (respaldado)
En México 94% usa WhatsApp y el click-to-WhatsApp convierte 3–5x mejor que formularios; pocos competidores lo hacen bien. Por eso WhatsApp es la acción #1 y el formulario es opcional y mínimo.
