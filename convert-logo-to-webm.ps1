# Convert Logo Video to Transparent WebM
# This script converts your logo video to WebM format with transparency support

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Logo Video to Transparent WebM Converter" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if FFmpeg is installed
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegPath) {
    Write-Host "❌ FFmpeg not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install FFmpeg first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://ffmpeg.org/download.html" -ForegroundColor White
    Write-Host "2. Or install via Chocolatey: choco install ffmpeg" -ForegroundColor White
    Write-Host "3. Or install via winget: winget install ffmpeg" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ FFmpeg found: $($ffmpegPath.Source)" -ForegroundColor Green
Write-Host ""

# Input file
$inputFile = "Logo reveal.mp4"
$outputFile = "public\videos\logo-reveal-transparent.webm"

# Check if input exists
if (-not (Test-Path $inputFile)) {
    Write-Host "❌ Input file not found: $inputFile" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please ensure 'Logo reveal.mp4' is in the project root." -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 Input:  $inputFile" -ForegroundColor White
Write-Host "📁 Output: $outputFile" -ForegroundColor White
Write-Host ""

# Get input file size
$inputSize = (Get-Item $inputFile).Length / 1MB
Write-Host "📊 Input size: $([math]::Round($inputSize, 2)) MB" -ForegroundColor White
Write-Host ""

Write-Host "🔄 Converting to WebM with transparency support..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes depending on video length..." -ForegroundColor Gray
Write-Host ""

# Convert to WebM with transparency support
# Note: If your source MP4 doesn't have transparency, this will preserve the video
# but you'll need to edit it in After Effects/Premiere to add true transparency

$ffmpegArgs = @(
    "-i", $inputFile,
    "-c:v", "libvpx-vp9",           # VP9 codec
    "-pix_fmt", "yuva420p",          # Pixel format with alpha
    "-b:v", "2M",                    # Bitrate 2 Mbps
    "-crf", "30",                    # Quality (0-63, lower=better)
    "-auto-alt-ref", "0",            # Disable alt-ref frames
    "-metadata:s:v:0", "alpha_mode=1", # Enable alpha metadata
    "-y",                            # Overwrite output
    $outputFile
)

try {
    & ffmpeg $ffmpegArgs 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        $outputSize = (Get-Item $outputFile).Length / 1MB
        
        Write-Host ""
        Write-Host "✅ Conversion complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Output size: $([math]::Round($outputSize, 2)) MB" -ForegroundColor White
        Write-Host "💾 Compression: $([math]::Round((1 - ($outputSize / $inputSize)) * 100, 1))% reduction" -ForegroundColor Green
        Write-Host ""
        Write-Host "📁 File saved: $outputFile" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "⚠️  IMPORTANT NOTE:" -ForegroundColor Yellow
        Write-Host "   If your original MP4 has a solid background, this WebM will too." -ForegroundColor White
        Write-Host "   To get TRUE transparency, you need to:" -ForegroundColor White
        Write-Host "   1. Edit video in After Effects/Premiere" -ForegroundColor White
        Write-Host "   2. Remove/make background transparent" -ForegroundColor White
        Write-Host "   3. Export as MOV (ProRes 4444) with alpha" -ForegroundColor White
        Write-Host "   4. Then run this script again on the MOV file" -ForegroundColor White
        Write-Host ""
        Write-Host "🚀 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. Test locally: npm run dev" -ForegroundColor White
        Write-Host "   2. Open: http://localhost:8080/" -ForegroundColor White
        Write-Host "   3. Deploy: npm run build; npx wrangler pages deploy dist --project-name=ignite-growth-uae" -ForegroundColor White
        Write-Host ""
        
    } else {
        Write-Host "❌ Conversion failed!" -ForegroundColor Red
        Write-Host "   Check the error messages above." -ForegroundColor Yellow
        exit 1
    }
    
} catch {
    Write-Host "❌ Error during conversion: $_" -ForegroundColor Red
    exit 1
}

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Conversion Complete!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
