# Generate Favicon from AI Brain Icon
# Created: December 22, 2025
# Requires: ImageMagick (https://imagemagick.org/script/download.php)

$sourceIcon = "public/icons/industry/21-ai-brain.png"
$faviconDir = "favicon"
$publicDir = "public"

Write-Host "Generating Favicon from AI Brain Icon..." -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
try {
    $magickVersion = magick -version 2>&1 | Select-Object -First 1
    Write-Host "Using ImageMagick: $magickVersion" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: ImageMagick not found!" -ForegroundColor Red
    Write-Host "Please install ImageMagick from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host "Or use online converter: https://favicon.io/favicon-converter/" -ForegroundColor Yellow
    exit 1
}

# Create directories
New-Item -ItemType Directory -Force -Path $faviconDir | Out-Null
New-Item -ItemType Directory -Force -Path "$publicDir/icons" | Out-Null

Write-Host "Generating favicon sizes..." -ForegroundColor Yellow

# Generate favicon.ico (multi-size)
magick $sourceIcon -define icon:auto-resize=16,32,48,64 "$publicDir/favicon.ico"
Write-Host "  Created favicon.ico (16x16, 32x32, 48x48, 64x64)" -ForegroundColor Green

# Generate PNG favicons
magick $sourceIcon -resize 16x16 "$faviconDir/favicon-16x16.png"
Write-Host "  Created favicon-16x16.png" -ForegroundColor Green

magick $sourceIcon -resize 32x32 "$faviconDir/favicon-32x32.png"
Write-Host "  Created favicon-32x32.png" -ForegroundColor Green

# Generate Apple Touch Icon
magick $sourceIcon -resize 180x180 "$faviconDir/apple-touch-icon.png"
Write-Host "  Created apple-touch-icon.png (180x180)" -ForegroundColor Green

# Generate Android Chrome icons
magick $sourceIcon -resize 192x192 "$faviconDir/android-chrome-192x192.png"
Write-Host "  Created android-chrome-192x192.png" -ForegroundColor Green

magick $sourceIcon -resize 512x512 "$faviconDir/android-chrome-512x512.png"
Write-Host "  Created android-chrome-512x512.png" -ForegroundColor Green

# Copy to public directory
Copy-Item "$faviconDir/favicon-16x16.png" "$publicDir/" -Force
Copy-Item "$faviconDir/favicon-32x32.png" "$publicDir/" -Force
Copy-Item "$faviconDir/apple-touch-icon.png" "$publicDir/" -Force
Copy-Item "$faviconDir/android-chrome-192x192.png" "$publicDir/" -Force
Copy-Item "$faviconDir/android-chrome-512x512.png" "$publicDir/" -Force

Write-Host ""
Write-Host "Favicon Generation Complete!" -ForegroundColor Green
Write-Host "Files created in:" -ForegroundColor Cyan
Write-Host "  - favicon/ (source files)" -ForegroundColor White
Write-Host "  - public/ (deployment files)" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update index.html with favicon links" -ForegroundColor White
Write-Host "2. Update site.webmanifest with icon paths" -ForegroundColor White
Write-Host "3. Test on different devices" -ForegroundColor White
