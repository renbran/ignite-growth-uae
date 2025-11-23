# Quick Video Compression for Windows (No ffmpeg needed)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SGC TECH AI - Video Compression Helper" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$sourceVideo = "D:\RUNNING APPS\website\ignite-growth-uae\Logo reveal.mp4"
$outputVideo = "D:\RUNNING APPS\website\ignite-growth-uae\public\videos\logo-reveal.mp4"

Write-Host "Since ffmpeg is not installed, please use one of these FREE online tools:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1: CloudConvert (Recommended)" -ForegroundColor Green
Write-Host "  1. Open: https://cloudconvert.com/mp4-converter"
Write-Host "  2. Upload your video: $sourceVideo"
Write-Host "  3. Settings: Quality = High, Target size = 20MB"
Write-Host "  4. Download the compressed file"
Write-Host "  5. Save as: logo-reveal-compressed.mp4"
Write-Host ""
Write-Host "Option 2: Online Video Compressor" -ForegroundColor Green
Write-Host "  - https://www.freeconvert.com/video-compressor"
Write-Host "  - https://clideo.com/compress-video"
Write-Host "  - https://www.videosmaller.com/"
Write-Host ""
Write-Host "Target: 15-20 MB (from current 60.77 MB)" -ForegroundColor Yellow
Write-Host ""

$continue = Read-Host "Have you compressed the video? (Y/N)"

if ($continue -eq "Y" -or $continue -eq "y") {
    Write-Host "`nPlease select the compressed video file..." -ForegroundColor Cyan
    
    Add-Type -AssemblyName System.Windows.Forms
    $openFileDialog = New-Object System.Windows.Forms.OpenFileDialog
    $openFileDialog.InitialDirectory = "D:\RUNNING APPS\website\ignite-growth-uae"
    $openFileDialog.Filter = "MP4 files (*.mp4)|*.mp4|All files (*.*)|*.*"
    $openFileDialog.Title = "Select Compressed Video"
    
    if ($openFileDialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        $compressedFile = $openFileDialog.FileName
        $fileSize = (Get-Item $compressedFile).Length / 1MB
        
        Write-Host "`nSelected file: $compressedFile" -ForegroundColor Green
        Write-Host "File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Green
        
        if ($fileSize -gt 25) {
            Write-Host "`nWARNING: File is still over 25 MB!" -ForegroundColor Red
            Write-Host "Cloudflare Pages limit is 25 MB. Please compress more." -ForegroundColor Red
            exit
        }
        
        # Create videos directory if it doesn't exist
        $videoDir = "D:\RUNNING APPS\website\ignite-growth-uae\public\videos"
        if (!(Test-Path $videoDir)) {
            New-Item -ItemType Directory -Path $videoDir -Force | Out-Null
        }
        
        # Copy file
        Copy-Item $compressedFile $outputVideo -Force
        
        Write-Host "`n✅ Video copied successfully!" -ForegroundColor Green
        Write-Host "Location: $outputVideo" -ForegroundColor Green
        Write-Host "`nReady to build and deploy!" -ForegroundColor Cyan
    }
}
else {
    Write-Host "`nPlease compress the video first using one of the online tools above." -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
}
