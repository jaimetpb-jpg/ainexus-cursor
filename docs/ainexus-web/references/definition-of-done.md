# Definition of Done — AI Nexus (QA antes del swap)

Correr en **staging**, no en producción. Entregar reporte GO/NO-GO. `ainexus.com.mx` no se toca hasta aprobación del dueño.

## Checklist
- [ ] Setup 0.5 hecho (fuera de OneDrive, git init + commit, npm install, rama `redesign-home`, `lang="es"`, número WhatsApp actualizado).
- [ ] `Home.tsx` reconstruido: 6 secciones con el copy exacto del blueprint.
- [ ] Tokens nuevos aplicados; CERO rastro de dark/lime/verde en toda la Home.
- [ ] Un solo acento `#3B6EA5`, usado solo en CTAs/estado-en-vivo/dato-clave.
- [ ] Demo del hero (fallback) fluido, sin errores visibles.
- [ ] Dashboard recharts interactivo con estados y 3 números; datos "simulación".
- [ ] Botón "Escúchalo" con audio lazy.
- [ ] Triple CTA al `wa.me/525525787385`; sin precios; garantía visible.
- [ ] Lenguaje sin tecnicismos en la Home (nada de SSO/SAML/LLM/BDR…).
- [ ] Números presentados como "ejemplo/simulación", ninguno como resultado real sin serlo.
- [ ] Mobile-first verificado en dispositivo real; touch targets ≥44px.
- [ ] Lighthouse mobile ≥90 (Performance/Accessibility/Best Practices/SEO); LCP <2.5s.
- [ ] `npm run build` limpio; `dist/` generado.
- [ ] `prefers-reduced-motion` respetado.

## Veredicto
- **GO** solo si todo lo anterior pasa.
- **NO-GO** si hay rastro de la paleta vieja, tecnicismos en Home, precios, demo rota, o Lighthouse <90. Listar qué falta y por qué.

## Anti-Frankenstein
Antes de entregar, revisar con ojos frescos: ¿cada sección demuestra un beneficio empresarial visible (vender más, responder más rápido, ahorrar tiempo, reducir errores, controlar mejor)? Si una sección no lo hace, sobra. ¿Se agregó algo solo porque "se ve pro"? Quitarlo.
