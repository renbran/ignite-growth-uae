# 🎬 Logo Video Compression Guide

## Current Problem
Your logo videos are **23-25MB each** - way too large for web!
**Target:** Under 2MB per video for fast loading.

---

## 📊 Current Video Sizes

| Video | Size | Status |
|-------|------|--------|.\compress-logo-videos.ps1
| logo-intro-2025.mp4 | 25MB | ❌ Too large |
| logo-reveal.mp4 | 23MB | ❌ Too large |
| logo-reveal-final.mp4 | 23MB | ❌ Too large |
| logo-reveal-v2.mp4 | 23MB | ❌ Too large |
| Untitled.mp4 | 25MB | ❌ Too large |
| sgc-logo-intro.mp4 | 4.2MB | ⚠️ Can optimize |
| sgc-tech-ai-logo-intro.mp4 | 4.3MB | ⚠️ Can optimize |
| showcase-video.mp4 | 3.7MB | ✅ Good |

**Total:** ~135MB → **Target:** <15MB

---

## Option 1: Install FFmpeg & Run Automated Script

### Install FFmpeg (Choose one):

**A. Using Chocolatey (Recommended):**
```powershell
# Run PowerShell as Administrator
choco install ffmpeg -y
```

**B. Using Winget:**
```powershell
winget install ffmpeg
```

**C. Manual Installation:**
1. Download: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to System PATH
4. Restart PowerShell

### Run Compression Script:
```powershell
cd D:\GitHub\webpages\ignite-growth-uae
.\compress-logo-videos.ps1
```

---

## Option 2: Online Compression (No Install Needed)

### Best Free Tools:

#### 1. **CloudConvert** (Recommended)
- URL: https://cloudconvert.com/mp4-converter
- Quality: High
- Max file size: 1GB (free)

**Steps:**
1. Upload video (e.g., `logo-reveal.mp4`)
2. Click "Settings" gear icon
3. Set:
   - **Video Codec:** H.264
   - **Quality:** High
   - **Resolution:** 1280x720 (or keep original if smaller)
   - **Target size:** 2MB
4. Click "Convert"
5. Download compressed file
6. Replace original in `public/videos/`

#### 2. **FreeConvert**
- URL: https://www.freeconvert.com/video-compressor
- Steps: Upload → Set target size (2MB) → Compress → Download

#### 3. **Clideo**
- URL: https://clideo.com/compress-video
- Steps: Upload → Auto-compress → Download

---

## Option 3: Use Handbrake (Desktop App)

### Download & Install:
- https://handbrake.fr/downloads.php

### Settings:
1. Open video in Handbrake
2. **Preset:** Fast 720p30
3. **Video Tab:**
   - Codec: H.264
   - Framerate: Same as source
   - Quality (RF): 28 (good balance)
4. **Dimensions:**
   - Width: 1280 (max)
   - Keep aspect ratio
5. Click "Start Encode"

---

## Recommended Compression Settings

For logo videos (5-10 seconds):

| Setting | Value | Why |
|---------|-------|-----|
| **Resolution** | 1280x720 | Good quality, smaller size |
| **Codec** | H.264 (x264) | Best compatibility |
| **Quality (CRF)** | 28 | Good visual quality |
| **Audio** | Remove | Logo videos don't need audio |
| **Framerate** | 30fps | Smooth, not excessive |
| **Target Size** | 1-2MB | Fast loading |

---

## After Compression Checklist

### 1. Test Video Quality
```powershell
# Start dev server
cd D:\GitHub\webpages\ignite-growth-uae
bun run dev
```
- Open http://localhost:8080
- Check if video looks good
- Ensure smooth playback

### 2. Verify File Sizes
```powershell
cd public/videos
dir *.mp4 | Select-Object Name, @{Name="MB";Expression={[math]::Round($_.Length/1MB, 2)}}
```

### 3. Performance Check
- Loading screen should appear for <1 second
- Video should play immediately after loading
- No stuttering or pixelation

### 4. Deploy
```powershell
git add public/videos/*.mp4
git commit -m "Optimize logo videos for web performance"
git push
```

---

## Expected Results

### Before:
- Total videos: ~135MB
- Loading time: 5-10 seconds (slow connection)
- Page load: Heavy, slow

### After:
- Total videos: <15MB
- Loading time: <2 seconds
- Page load: Fast, smooth
- Better SEO (Google rewards fast sites)

---

## Compression Formula (FFmpeg Command)

If you want to compress manually via command line:

```powershell
ffmpeg -i "input.mp4" `
  -vf scale=1280:-2 `
  -c:v libx264 `
  -crf 28 `
  -preset slow `
  -movflags +faststart `
  -pix_fmt yuv420p `
  -an `
  "output.mp4"
```

**Parameters Explained:**
- `-vf scale=1280:-2` = Resize to 1280px width, auto height
- `-c:v libx264` = Use H.264 codec
- `-crf 28` = Quality (18=high, 28=good, 32=lower)
- `-preset slow` = Better compression (takes longer)
- `-movflags +faststart` = Optimize for web streaming
- `-pix_fmt yuv420p` = Maximum compatibility
- `-an` = Remove audio

---

## Troubleshooting

### Video looks pixelated after compression?
- Increase quality: CRF 23 instead of 28
- Keep higher resolution: 1920x1080

### File still too large?
- Lower resolution: 960x540
- Increase CRF: 30-32
- Reduce framerate: 24fps

### Video won't play in browser?
- Ensure H.264 codec
- Add `-pix_fmt yuv420p` flag
- Check for corruption

---

## Quick Action Plan

1. **Choose compression method** (FFmpeg script, online tool, or Handbrake)
2. **Compress 5 large videos** (the 23-25MB ones)
3. **Replace files** in `public/videos/`
4. **Test locally** (`bun run dev`)
5. **Verify quality** (playback, loading speed)
6. **Deploy** to production

---

## Need Help?

- FFmpeg not working? Use online tools (no install needed)
- Videos look bad? Adjust CRF to 23-25
- Still too slow? Contact me for further optimization

**Goal:** Get total video size under 15MB for lightning-fast loading! ⚡
