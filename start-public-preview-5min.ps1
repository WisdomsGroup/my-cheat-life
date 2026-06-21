$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Program Files\nodejs\node.exe"
$cloudflared = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Cloudflare.cloudflared_Microsoft.Winget.Source_8wekyb3d8bbwe\cloudflared.exe"
$port = 4173
$expiresAt = (Get-Date).AddMinutes(5)

$urlFile = Join-Path $root "public-url.txt"
$statusFile = Join-Path $root "public-preview-status.txt"
$serverOut = Join-Path $root "server.out.log"
$serverErr = Join-Path $root "server.err.log"
$tunnelOut = Join-Path $root "tunnel.out.log"
$tunnelErr = Join-Path $root "tunnel.err.log"

Remove-Item -LiteralPath $urlFile, $statusFile, $serverOut, $serverErr, $tunnelOut, $tunnelErr -Force -ErrorAction SilentlyContinue

if (-not (Test-Path -LiteralPath $node)) {
  throw "Node.js not found: $node"
}

if (-not (Test-Path -LiteralPath $cloudflared)) {
  throw "cloudflared not found: $cloudflared"
}

"starting" | Set-Content -LiteralPath $statusFile -Encoding utf8

$server = Start-Process `
  -FilePath $node `
  -ArgumentList "`"$root\serve-local.mjs`"" `
  -WorkingDirectory $root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $serverOut `
  -RedirectStandardError $serverErr `
  -PassThru

Start-Sleep -Seconds 2

$tunnel = Start-Process `
  -FilePath $cloudflared `
  -ArgumentList "tunnel --url http://127.0.0.1:$port --no-autoupdate" `
  -WorkingDirectory $root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $tunnelOut `
  -RedirectStandardError $tunnelErr `
  -PassThru

$deadline = (Get-Date).AddSeconds(45)
$publicUrl = $null

while ((Get-Date) -lt $deadline -and -not $publicUrl) {
  Start-Sleep -Milliseconds 500
  $combined = ""
  if (Test-Path -LiteralPath $tunnelOut) {
    $combined += Get-Content -LiteralPath $tunnelOut -Raw -ErrorAction SilentlyContinue
  }
  if (Test-Path -LiteralPath $tunnelErr) {
    $combined += "`n"
    $combined += Get-Content -LiteralPath $tunnelErr -Raw -ErrorAction SilentlyContinue
  }

  $match = [regex]::Match($combined, "https://[-a-zA-Z0-9]+\.trycloudflare\.com")
  if ($match.Success) {
    $publicUrl = $match.Value
  }
}

if (-not $publicUrl) {
  "failed" | Set-Content -LiteralPath $statusFile -Encoding utf8
  if ($tunnel -and -not $tunnel.HasExited) { Stop-Process -Id $tunnel.Id -Force }
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
  throw "Could not create Cloudflare tunnel URL."
}

$publicUrl | Set-Content -LiteralPath $urlFile -Encoding utf8
"live until $($expiresAt.ToString("yyyy-MM-dd HH:mm:ss"))" | Set-Content -LiteralPath $statusFile -Encoding utf8

Start-Sleep -Seconds 300

if ($tunnel -and -not $tunnel.HasExited) { Stop-Process -Id $tunnel.Id -Force }
if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }

"expired at $((Get-Date).ToString("yyyy-MM-dd HH:mm:ss"))" | Set-Content -LiteralPath $statusFile -Encoding utf8
