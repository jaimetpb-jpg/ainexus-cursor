# Dónde está guardado el proyecto AI Nexus

Actualizado: 2026-07-08

## Local (desarrollo activo)

| Qué | Ruta |
|-----|------|
| **Código fuente + Git** | `C:\dev\ainexus-cursor` |
| Rama principal | `main` |
| GitHub | https://github.com/jaimetpb-jpg/ainexus-cursor |
| Último deploy prod | `fea2589` — rediseño + fix FraudCollectionFlows |

Comandos:
```bash
cd C:\dev\ainexus-cursor
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Nube — respaldo OneDrive (sincronizado)

| Qué | Ruta |
|-----|------|
| **Copia espejo del código** | `C:\Users\Dell\OneDrive\Desktop\pagina de nexus\ainexus-cursor` |
| Sincroniza a | Tu cuenta Microsoft OneDrive en la nube |

> Sin `node_modules` ni `dist` en la copia (más liviana). Para trabajar: `npm install` en esa carpeta o usar `C:\dev\ainexus-cursor`.

## Producción — VPS Hostinger (sitio en vivo)

| Qué | Dónde |
|-----|--------|
| **Dominio** | `https://ainexus.com.mx` |
| DNS A record | `2.24.204.193` (VPS) |
| SSH | `ssh nexus` → `root@2.24.204.193` (clave `~/.ssh/nexus_vps_new`) |
| Carpeta web activa | `/docker/ainexus/html` |
| Contenedor | `ainexus-ainexus-1` (nginx:alpine, puerto 127.0.0.1:8082) |
| Config nginx | `/docker/ainexus/nginx.conf` |
| Proxy HTTPS | Traefik → contenedor ainexus |

Deploy automatizado:
```powershell
cd C:\dev\ainexus-cursor
.\scripts\deploy-vps.ps1
```

Rollback (restaurar sitio anterior):
```bash
ssh nexus 'cd /docker/ainexus && tar xzf html_backup_YYYYMMDD_HHMMSS.tar.gz'
ssh nexus 'docker restart ainexus-ainexus-1'
```

## Hosting compartido (NO es producción actual)

| Qué | Dónde |
|-----|--------|
| Usuario Hostinger | `u106756730` |
| Carpeta | `/home/u106756730/domains/ainexus.com.mx/public_html` |

El DNS de `ainexus.com.mx` apunta al **VPS**, no al hosting compartido. Cambios en `public_html` no afectan el sitio en vivo.
