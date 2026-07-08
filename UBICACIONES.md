# Dónde está guardado el proyecto AI Nexus

Actualizado: 2026-07-07

## Local (desarrollo activo)

| Qué | Ruta |
|-----|------|
| **Código fuente + Git** | `C:\dev\ainexus-cursor` |
| Rama actual | `redesign-home` |
| Último commit | `cfb9763` — rediseño home, dashboards, auth modal |

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

## Nube — sitio web (Hostinger)

| Qué | Dónde |
|-----|--------|
| **Producción actual** | `https://ainexus.com.mx` |
| Servidor | Hostinger · usuario `u106756730` |
| Carpeta web | `/home/u106756730/domains/ainexus.com.mx/public_html` |

**Este rediseño NO está en producción aún.** Cuando apruebes, el build (`dist/`) irá primero a **staging** (subdominio) y después al swap en `public_html`.

## Pendiente (si quieres repo Git en la nube)

- GitHub / GitLab: aún sin `remote`. Si me das la URL del repo, conecto y hago `push`.
