# Download Missing Industry Icons
# Created: December 22, 2025

$iconDir = "public/icons/industry"
New-Item -ItemType Directory -Force -Path $iconDir | Out-Null

$icons = @{
    "11-achievement-trophy.png" = "https://i.postimg.cc/YSXgxFMz/11-achievement-trophy.png"
    "24-visibility-scope.png" = "https://i.postimg.cc/hjfmZGt5/24-visibility-scope.png"
}

Write-Host "Downloading Missing Icons..." -ForegroundColor Cyan

foreach ($icon in $icons.GetEnumerator()) {
    $fileName = $icon.Key
    $url = $icon.Value
    $destination = Join-Path $iconDir $fileName
    
    try {
        Write-Host "Downloading $fileName..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $destination -ErrorAction Stop
        Write-Host "  Saved to $destination" -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Done!" -ForegroundColor Green
