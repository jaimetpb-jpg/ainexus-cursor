# Deploy dist/ to ainexus.com.mx VPS (nginx container)
# Usage: .\scripts\deploy-vps.ps1 [-SkipBuild]

param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $ProjectRoot

$sshHost = "nexus"
$remoteHtml = "/docker/ainexus/html"
$zipName = "dist_deploy.zip"
$zipPath = Join-Path $ProjectRoot $zipName

Write-Host "==> AI Nexus VPS deploy" -ForegroundColor Cyan

if (-not $SkipBuild) {
    Write-Host "==> Building..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed" }
}

if (-not (Test-Path "dist/index.html")) {
    throw "dist/index.html not found. Run npm run build first."
}

Write-Host "==> Creating archive..." -ForegroundColor Yellow
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
tar.exe -a -cf $zipName -C dist .
$sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 1)
Write-Host "    $zipName ($sizeMb MB)"

Write-Host "==> Backing up current site on VPS..." -ForegroundColor Yellow
$backupCmd = 'tar czf /docker/ainexus/html_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /docker/ainexus html && ls -lh /docker/ainexus/html_backup_*.tar.gz | tail -1'
ssh -o BatchMode=yes -o ConnectTimeout=20 $sshHost $backupCmd

Write-Host "==> Uploading..." -ForegroundColor Yellow
scp -o BatchMode=yes $zipPath "${sshHost}:/tmp/"

Write-Host "==> Deploying to $remoteHtml..." -ForegroundColor Yellow
$deployCmd = "rm -rf ${remoteHtml}/* && cd ${remoteHtml} && unzip -o /tmp/${zipName} && rm /tmp/${zipName} && du -sh ${remoteHtml}"
ssh -o BatchMode=yes $sshHost $deployCmd

Write-Host "==> Restarting nginx container..." -ForegroundColor Yellow
ssh -o BatchMode=yes $sshHost "docker restart ainexus-ainexus-1"

Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

Write-Host "==> Done. Verify:" -ForegroundColor Green
Write-Host "    https://ainexus.com.mx/"
Write-Host "    https://ainexus.com.mx/servicios/"
Write-Host "    https://ainexus.com.mx/sectores/"
