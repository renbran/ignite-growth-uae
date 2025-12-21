# PowerShell script to download icons
$icons = @(
    @{url="https://i.postimg.cc/nrhmmyVj/01-ai-neural-network.webp"; name="01-ai-neural-network.webp"},
    @{url="https://i.postimg.cc/sxgWWkfS/02-cloud-integration.webp"; name="02-cloud-integration.webp"},
    @{url="https://i.postimg.cc/3NxGGsrg/03-cloud-storage.webp"; name="03-cloud-storage.webp"},
    @{url="https://i.postimg.cc/3NxGGsrC/04-lightning-speed.webp"; name="04-lightning-speed.webp"},
    @{url="https://i.postimg.cc/bJTbsyhF/05-security-shield-left.webp"; name="05-security-shield-left.webp"},
    @{url="https://i.postimg.cc/JnqJGrLS/06-security-shield-right.webp"; name="06-security-shield-right.webp"},
    @{url="https://i.postimg.cc/85HWjpS2/07-global-transform.webp"; name="07-global-transform.webp"},
    @{url="https://i.postimg.cc/gJDRnzWf/08-data-analytics.webp"; name="08-data-analytics.webp"},
    @{url="https://i.postimg.cc/FRZc7rvt/09-automation-gears.webp"; name="09-automation-gears.webp"},
    @{url="https://i.postimg.cc/Ssr8JS4p/10-rocket-launch.webp"; name="10-rocket-launch.webp"},
    @{url="https://i.postimg.cc/G2QYHLRr/11-achievement-trophy.webp"; name="11-achievement-trophy.webp"},
    @{url="https://i.postimg.cc/XJ8FpjW4/12-growth-chart.webp"; name="12-growth-chart.webp"},
    @{url="https://i.postimg.cc/hjrxfDnS/13-mobile-responsive.webp"; name="13-mobile-responsive.webp"},
    @{url="https://i.postimg.cc/wvVJ7qzq/14-target-precision.webp"; name="14-target-precision.webp"},
    @{url="https://i.postimg.cc/RFRfNSmZ/15-partnership-handshake.webp"; name="15-partnership-handshake.webp"},
    @{url="https://i.postimg.cc/JnqJGr8n/16-time-efficiency.webp"; name="16-time-efficiency.webp"},
    @{url="https://i.postimg.cc/tT5PYqbJ/17-financial-roi.webp"; name="17-financial-roi.webp"},
    @{url="https://i.postimg.cc/V6RMdfwJ/18-data-security.webp"; name="18-data-security.webp"},
    @{url="https://i.postimg.cc/gJDRnzpX/19-global-network.webp"; name="19-global-network.webp"},
    @{url="https://i.postimg.cc/DZgs8vhb/20-support-24-7.webp"; name="20-support-24-7.webp"},
    @{url="https://i.postimg.cc/2ySWWsj8/21-ai-brain.webp"; name="21-ai-brain.webp"},
    @{url="https://i.postimg.cc/qqvKKPBR/22-innovation-network.webp"; name="22-innovation-network.webp"},
    @{url="https://i.postimg.cc/QCd772NC/23-smart-solutions.webp"; name="23-smart-solutions.webp"},
    @{url="https://i.postimg.cc/vTZnnJ8c/24-visibility-scope.webp"; name="24-visibility-scope.webp"}
)

$outputDir = "public/icons"

Write-Host "Downloading icons to $outputDir..." -ForegroundColor Cyan

foreach ($icon in $icons) {
    $outputPath = Join-Path $outputDir $icon.name
    Write-Host "Downloading $($icon.name)..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $icon.url -OutFile $outputPath -UseBasicParsing
        Write-Host "  Downloaded successfully" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "All icons downloaded!" -ForegroundColor Green
