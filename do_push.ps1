# Refresh PATH from registry
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

# Find Git executable
$git = (Get-Command git -ErrorAction SilentlyContinue).Path
if (-not $git) {
    $candidates = @(
        "C:\Program Files\Git\cmd\git.exe",
        "C:\Program Files\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) {
            $git = $c
            break
        }
    }
}

Write-Host "Found Git: $git"
& $git --version

# Set git config credential helper so Windows Credential Manager / Web browser popup works
& $git config --global credential.helper manager

# Set remote origin
& $git remote set-url origin https://github.com/mohamedibrahimx123/Task-A2Z-company-.git

Write-Host "Attempting push to origin main..."
& $git push -u origin main
