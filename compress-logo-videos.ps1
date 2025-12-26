# Logo Video Compressor for SGC TECH AI
# Reduces video file sizes for faster web loading

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Logo Video Compression Utility" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if FFmpeg is installed
$ffmpegInstalled = $null -ne (Get-Command ffmpeg -ErrorAction SilentlyContinue)

if (-not $ffmpegInstalled) {
    Write-Host "FFmpeg not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Quick Install Options:" -ForegroundColor Yellow
    Write-Host "  Option 1: choco install ffmpeg -y" -ForegroundColor White
    Write-Host "  Option 2: winget install ffmpeg" -ForegroundColor White
    Write-Host ""
    
    $installNow = Read-Host "Install FFmpeg via Chocolatey now? (Y/N)"
    
    if ($installNow -eq "Y" -or $installNow -eq "y") {
        Write-Host ""
        Write-Host "Installing FFmpeg..." -ForegroundColor Cyan
        choco install ffmpeg -y
        
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        Write-Host "FFmpeg installed! Continuing..." -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "Please install FFmpeg and run this script again." -ForegroundColor Yellow
        Write-Host ""
        exit
    }
}

# Define paths
$videosDir = "public\videos"
$originalFiles = @(
    "logo-intro-2025.mp4",
    "logo-reveal.mp4",
    "logo-reveal-final.mp4",
    "logo-reveal-v2.mp4",
    "Untitled.mp4"
)

Write-Host "Current Video Sizes:" -ForegroundColor Yellow
Write-Host ""

Get-ChildItem "$videosDir\*.mp4" | Where-Object { $originalFiles -contains $_.Name } | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  $($_.Name): $sizeMB MB" -ForegroundColor White
}

Write-Host ""
$compress = Read-Host "Compress these videos? (Y/N)"

if ($compress -ne "Y" -and $compress -ne "y") {
    Write-Host ""
    Write-Host "Compression cancelled." -ForegroundColor Yellow
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "Starting Compression..." -ForegroundColor Cyan
Write-Host ""

$compressedCount = 0

foreach ($file in $originalFiles) {
    $inputPath = Join-Path $videosDir $file
    
    if (Test-Path $inputPath) {
        $outputPath = Join-Path $videosDir "compressed-$file"
        $originalSize = (Get-Item $inputPath).Length / 1MB
        $originalSizeMB = [math]::Round($originalSize, 2)
        
        Write-Host "Processing: $file - Original Size: $originalSizeMB MB" -ForegroundColor Yellow
        
        # Build ffmpeg command
        $ffmpegCmd = "ffmpeg -i `"$inputPath`" -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p -an -y `"$outputPath`""
        
        Invoke-Expression $ffmpegCmd 2>&1 | Out-Null
        
        if (Test-Path $outputPath) {
            $newSize = (Get-Item $outputPath).Length / 1MB
            $newSizeMB = [math]::Round($newSize, 2)
            $reduction = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
            
            Write-Host "  Compressed: $newSizeMB MB (Reduced by $reduction percent)" -ForegroundColor Green
            
            # Replace original with compressed version
            Remove-Item $inputPath -Force
            Rename-Item $outputPath $file
            
            $compressedCount++
        } else {
            Write-Host "  Compression failed for $file" -ForegroundColor Red
        }
        
        Write-Host ""
    }
}

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Compression Complete!" -ForegroundColor Green
Write-Host "Files compressed: $compressedCount" -ForegroundColor White
Write-Host ""

Write-Host "New Video Sizes:" -ForegroundColor Yellow
Write-Host ""

$totalSize = 0
Get-ChildItem "$videosDir\*.mp4" | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    $totalSize += $sizeMB
    Write-Host "  $($_.Name): $sizeMB MB" -ForegroundColor White
}

$totalSizeRounded = [math]::Round($totalSize, 2)
Write-Host ""
Write-Host "Total videos size: $totalSizeRounded MB" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Test the videos in browser" -ForegroundColor White
Write-Host "  2. Run: bun run dev" -ForegroundColor White
Write-Host "  3. Check video quality and loading speed" -ForegroundColor White
Write-Host "  4. Commit and deploy if satisfied" -ForegroundColor White
Write-Host ""
