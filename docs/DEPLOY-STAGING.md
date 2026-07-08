# Deploy a staging (Hostinger)

**Producción (`ainexus.com.mx/public_html`) no se toca** hasta GO/NO-GO del dueño.

## Build local

```bash
cd C:\dev\ainexus-cursor
npm run build
```

El contenido a subir está en `dist/`.

## Opción A — Subdominio staging (recomendado)

1. En hPanel → Dominios → Subdominios, crear `staging.ainexus.com.mx`
2. Apuntar document root a una carpeta vacía (ej. `public_html/staging-cursor`)
3. Subir **todo el contenido de `dist/`** vía File Manager o SFTP:
   - `index.html`
   - `servicios/index.html`
   - `sectores/index.html`
   - `assets/`
   - `images/`
   - `sitemap.xml`, `robots.txt`, `favicon.svg`

## Opción B — Carpeta en el mismo dominio

Subir a `public_html/cursor-preview/` y visitar `https://ainexus.com.mx/cursor-preview/`

> Si usas subcarpeta, cambiar `base` en `vite.config.ts` a `/cursor-preview/` y rebuild.

## Nginx / Apache

Para SPA con prerender, el servidor debe servir `index.html` por carpeta:

```
location /servicios/ {
  try_files $uri $uri/ /servicios/index.html;
}
location /sectores/ {
  try_files $uri $uri/ /sectores/index.html;
}
location / {
  try_files $uri $uri/ /index.html;
}
```

## Verificación post-deploy

- [ ] `/` carga Home con 6 secciones
- [ ] `/servicios` y `/sectores` responden sin 404
- [ ] `sitemap.xml` accesible
- [ ] Lighthouse mobile ≥ 90 en las 3 rutas
- [ ] WhatsApp abre con `525525787385`

## MCP Hostinger

El MCP puede listar sitios (`hosting_listWebsitesV1`) pero **no incluye subida de archivos estáticos**. El deploy requiere File Manager, SFTP o rsync manual.

Sitio detectado: `ainexus.com.mx` → `/home/u106756730/domains/ainexus.com.mx/public_html`
