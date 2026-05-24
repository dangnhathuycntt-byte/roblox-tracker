$ErrorActionPreference = "Stop"
$ProjectDir = "C:\Users\Administrator\Projects\roblox-tracker"
$StandaloneDir = "$ProjectDir\.next\standalone\Projects\roblox-tracker"

Write-Host "=== Stopping rbx-server ===" -ForegroundColor Cyan
Stop-Service rbx-server -Force
Start-Sleep -Seconds 2

Write-Host "=== Building Next.js ===" -ForegroundColor Cyan
Set-Location $ProjectDir
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

Write-Host "=== Copying static assets ===" -ForegroundColor Cyan
Copy-Item -Path "$ProjectDir\.next\static" -Destination "$StandaloneDir\.next\static" -Recurse -Force
if (Test-Path "$ProjectDir\public") {
    Copy-Item -Path "$ProjectDir\public" -Destination "$StandaloneDir\public" -Recurse -Force
}

Write-Host "=== Starting rbx-server ===" -ForegroundColor Cyan
Start-Service rbx-server
Start-Sleep -Seconds 4

$status = (Get-Service rbx-server).Status
if ($status -ne "Running") { throw "Service failed to start: $status" }

try {
    $r = Invoke-WebRequest -Uri "http://localhost:3000/api/accounts?pageSize=1" -UseBasicParsing -TimeoutSec 5
    $total = ($r.Content | ConvertFrom-Json).pagination.total
    Write-Host ""
    Write-Host "=== Deploy complete! ===" -ForegroundColor Green
    Write-Host "Service:  rbx-server Running"
    Write-Host "API:      $total accounts"
    Write-Host "URL:      https://rbx.dixxie.store/dashboard"
} catch {
    Write-Host "=== Warning: API health check failed ===" -ForegroundColor Yellow
    Write-Host "Service is running but API didn't respond. Check logs."
}
