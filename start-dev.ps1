$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Start-Process powershell -WorkingDirectory (Join-Path $root 'backend') -ArgumentList @(
  '-NoExit',
  '-Command',
  'npm run dev'
)

Start-Process powershell -WorkingDirectory $root -ArgumentList @(
  '-NoExit',
  '-Command',
  'npm run dev'
)

Write-Host 'Backend and frontend terminals started.'