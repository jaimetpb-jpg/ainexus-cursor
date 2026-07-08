# Deploy — AI Nexus

## Producción (VPS)

El sitio en vivo (`https://ainexus.com.mx`) se sirve desde el **VPS Hostinger**, no desde el hosting compartido.

| Elemento | Valor |
|----------|--------|
| IP | `2.24.204.193` |
| SSH | `ssh nexus` |
| Carpeta web | `/docker/ainexus/html` |
| Contenedor | `ainexus-ainexus-1` |
| nginx config | `/docker/ainexus/nginx.conf` |

### Deploy rápido

```powershell
cd C:\dev\ainexus-cursor
npm run build
.\scripts\deploy-vps.ps1
```

El script hace backup, sube `dist/` y reinicia el contenedor nginx.

### Deploy manual

```powershell
cd C:\dev\ainexus-cursor
npm run build
tar.exe -a -cf dist_deploy.zip -C dist .
scp dist_deploy.zip nexus:/tmp/
```

```bash
# En el VPS (usar comillas simples en PowerShell para que date se ejecute en remoto)
ssh nexus 'tar czf /docker/ainexus/html_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /docker/ainexus html'
ssh nexus 'rm -rf /docker/ainexus/html/* && cd /docker/ainexus/html && unzip -o /tmp/dist_deploy.zip && rm /tmp/dist_deploy.zip'
ssh nexus 'docker restart ainexus-ainexus-1'
```

### Verificación post-deploy

- [ ] `https://ainexus.com.mx/` — hero nuevo, dashboards, modal Log in/Sign up
- [ ] `https://ainexus.com.mx/servicios/` — sin 404
- [ ] `https://ainexus.com.mx/sectores/` — sin 404
- [ ] `https://ainexus.com.mx/sitemap.xml` accesible
- [ ] WhatsApp abre con `525525787385`
- [ ] Subdominios del VPS (n8n, dify, llm, wa) siguen respondiendo

### Rollback

```bash
ssh nexus 'cd /docker/ainexus && tar xzf html_backup_YYYYMMDD_HHMMSS.tar.gz'
ssh nexus 'docker restart ainexus-ainexus-1'
```

---

## Staging (hosting compartido — opcional)

**No afecta producción** mientras el DNS apunte al VPS.

### Build local

```bash
cd C:\dev\ainexus-cursor
npm run build
```

El contenido a subir está en `dist/`.

### Opción A — Subdominio staging

1. En hPanel → Dominios → Subdominios, crear `staging.ainexus.com.mx`
2. Apuntar document root a una carpeta vacía (ej. `public_html/staging-cursor`)
3. Subir **todo el contenido de `dist/`** vía File Manager o SFTP

### Opción B — Carpeta en el mismo dominio

Subir a `public_html/cursor-preview/` y visitar `https://ainexus.com.mx/cursor-preview/`

> Si usas subcarpeta, cambiar `base` en `vite.config.ts` a `/cursor-preview/` y rebuild.

Sitio compartido detectado: `ainexus.com.mx` → `/home/u106756730/domains/ainexus.com.mx/public_html`
