# Download Selected Industry Icons for SGC TECH AI
# Created: December 22, 2025

$iconDir = "public/icons/industry"
New-Item -ItemType Directory -Force -Path $iconDir | Out-Null

# Core AI and Technology Icons
$icons = @{
    "01-ai-neural-network.png" = "https://i.postimg.cc/Gp3GYKw1/01-ai-neural-network.png"
    "02-cloud-integration.png" = "https://i.postimg.cc/jj8Nhftj/02-cloud-integration.png"
    "03-cloud-storage.png" = "https://i.postimg.cc/hGCx0mc4/03-cloud-storage.png"
    "04-lightning-speed.png" = "https://i.postimg.cc/q7mnGK4M/04-lightning-speed.png"
    "05-security-shield.png" = "https://i.postimg.cc/JhTJQXMz/05-security-shield-left.png"
    "07-global-transform.png" = "https://i.postimg.cc/438t1cs7/07-global-transform.png"
    "08-data-analytics.png" = "https://i.postimg.cc/3wLpZGYy/08-data-analytics.png"
    "09-automation-gears.png" = "https://i.postimg.cc/zfdWkh8R/09-automation-gears.png"
    "10-rocket-launch.png" = "https://i.postimg.cc/wBWJkNgX/10-rocket-launch.png"
    "12-growth-chart.png" = "https://i.postimg.cc/QM65q7hq/12-growth-chart.png"
    "13-mobile-responsive.png" = "https://i.postimg.cc/s2nSJWsc/13-mobile-responsive.png"
    "14-target-precision.png" = "https://i.postimg.cc/mrdMS9Bj/14-target-precision.png"
    "15-partnership-handshake.png" = "https://i.postimg.cc/1tfF7z3F/15-partnership-handshake.png"
    "16-time-efficiency.png" = "https://i.postimg.cc/RFNtp0Zf/16-time-efficiency.png"
    "17-financial-roi.png" = "https://i.postimg.cc/JnGXYhzb/17-financial-roi.png"
    "18-data-security.png" = "https://i.postimg.cc/63yZbQpr/18-data-security.png"
    "19-global-network.png" = "https://i.postimg.cc/wv7N4Bjc/19-global-network.png"
    "20-support-24-7.png" = "https://i.postimg.cc/W3hZY41S/20-support-24-7.png"
    "21-ai-brain.png" = "https://i.postimg.cc/xCcmpd1t/21-ai-brain.png"
    "22-innovation-network.png" = "https://i.postimg.cc/V6dtZNkG/22-innovation-network.png"
    "23-smart-solutions.png" = "https://i.postimg.cc/ZRCNsq5s/23-smart-solutions.png"
}

Write-Host "Downloading Selected Industry Icons..." -ForegroundColor Cyan
Write-Host ""

$count = 0
$total = $icons.Count

foreach ($icon in $icons.GetEnumerator()) {
    $count++
    $fileName = $icon.Key
    $url = $icon.Value
    $destination = Join-Path $iconDir $fileName
    
    try {
        Write-Host "[$count/$total] Downloading $fileName..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $destination -ErrorAction Stop
        Write-Host "  Saved to $destination" -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed to download $fileName" -ForegroundColor Red
        Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Download Complete!" -ForegroundColor Green
Write-Host "Icons saved to: $iconDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "Icon Categories:" -ForegroundColor White
Write-Host "  AI and Machine Learning: 01, 21" -ForegroundColor Magenta
Write-Host "  Cloud and Infrastructure: 02, 03" -ForegroundColor Magenta
Write-Host "  Performance: 04, 16" -ForegroundColor Magenta
Write-Host "  Security: 05, 18" -ForegroundColor Magenta
Write-Host "  Transformation: 07, 10, 23" -ForegroundColor Magenta
Write-Host "  Analytics and Data: 08, 14" -ForegroundColor Magenta
Write-Host "  Automation: 09" -ForegroundColor Magenta
Write-Host "  Growth and ROI: 12, 17" -ForegroundColor Magenta
Write-Host "  Digital: 13, 19, 22" -ForegroundColor Magenta
Write-Host "  Partnership: 15, 20" -ForegroundColor Magenta
