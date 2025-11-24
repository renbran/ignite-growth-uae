# Transparent Logo Video Setup Guide

## Overview
Your website is now configured to support transparent background videos. The video will display with alpha channel transparency over a gradient background.

## Current Status
✅ Code updated to support WebM with transparency  
✅ Gradient background applied (slate-950 → blue-950 → slate-950)  
⏳ Need to upload transparent video file  

---

## Option 1: Using Adobe After Effects / Premiere Pro

### Export Settings:
1. **Format**: QuickTime (MOV)
2. **Codec**: Apple ProRes 4444 (supports alpha)
3. **Include Alpha Channel**: ✅ Yes
4. **Resolution**: 1920x1080 or your original size

### Then Convert to WebM:
```bash
# Using FFmpeg (free tool)
ffmpeg -i logo-reveal-transparent.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 2M -auto-alt-ref 0 logo-reveal-transparent.webm
```

**Download FFmpeg**: https://ffmpeg.org/download.html

---

## Option 2: Using DaVinci Resolve (Free)

### Export Settings:
1. **Format**: QuickTime
2. **Codec**: DNxHR HQX (supports alpha)
3. **Alpha Mode**: Premultiplied
4. **Quality**: High

### Then Convert to WebM:
Same FFmpeg command as above.

---

## Option 3: Online Tools

### Kapwing (Browser-based, Free)
1. Go to: https://www.kapwing.com/tools/remove-background
2. Upload your logo reveal video
3. Remove background (automatic AI)
4. Export as WebM with transparency
5. Download result

### Unscreen (Browser-based)
1. Go to: https://www.unscreen.com/
2. Upload video
3. Download as WebM
4. Use free tier (watermark) or paid (no watermark)

---

## Option 4: Create New Animation with Transparent BG

### Using Canva (Easiest for Non-Designers):
1. Create new video project (1920x1080)
2. Make background transparent
3. Add your logo with animation
4. Export as WebM (Pro feature) or MP4 then convert

### Using Figma (Free):
1. Design animated logo in Figma
2. Use plugin "Animate Figma" or "Motion"
3. Export as video with transparent background

---

## Quick Fix: Upload Your Video

### Step 1: Prepare Video File
- **Filename**: `logo-reveal-transparent.webm`
- **Format**: WebM with VP9 codec and alpha channel
- **Recommended size**: < 5MB (compress if larger)

### Step 2: Upload to Project
```powershell
# Place your video here:
D:\RUNNING APPS\website\ignite-growth-uae\public\videos\logo-reveal-transparent.webm
```

### Step 3: Deploy
```powershell
cd "D:\RUNNING APPS\website\ignite-growth-uae"
git add public/videos/logo-reveal-transparent.webm
git commit -m "[VIDEO] Add transparent logo reveal video (WebM with alpha)"
git push origin main
npm run build
npx wrangler pages deploy dist --project-name=ignite-growth-uae
```

---

## FFmpeg Installation & Usage

### Windows (PowerShell):
```powershell
# Download from https://ffmpeg.org/download.html
# Or use Chocolatey:
choco install ffmpeg

# Convert MOV to WebM with transparency:
ffmpeg -i logo-reveal.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 2M -auto-alt-ref 0 -metadata:s:v:0 alpha_mode="1" logo-reveal-transparent.webm

# Optimize file size:
ffmpeg -i logo-reveal.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 1M -crf 30 -auto-alt-ref 0 logo-reveal-transparent.webm
```

### Parameters Explained:
- `-c:v libvpx-vp9`: VP9 codec (best for web)
- `-pix_fmt yuva420p`: Pixel format with alpha channel
- `-b:v 2M`: Bitrate (2 Mbps, adjust for quality)
- `-crf 30`: Quality (0-63, lower = better, 30 = good balance)
- `-auto-alt-ref 0`: Disable alt-ref frames (fixes some playback issues)

---

## Fallback Behavior

The code now supports **progressive enhancement**:

1. **Browser supports WebM + transparency**: Shows `logo-reveal-transparent.webm` with alpha
2. **Browser doesn't support WebM**: Falls back to `logo-reveal.mp4` (solid background)
3. **Older browsers**: Shows error message with skip button

**Browser Support**:
- ✅ Chrome/Edge (Chromium): Full WebM support
- ✅ Firefox: Full WebM support
- ✅ Safari 14.1+: WebM support (may vary)
- ⚠️ Safari < 14.1: Falls back to MP4
- ⚠️ iOS Safari: Limited WebM (will use MP4)

---

## Background Customization

Want a different background color/gradient?

### Edit the gradient in `HeroVideoIntro.tsx`:

**Current (Dark Blue)**:
```tsx
"bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"
```

**Options**:

**Pure Black**:
```tsx
"bg-black"
```

**Dark Navy**:
```tsx
"bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
```

**Midnight Blue to Purple**:
```tsx
"bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950"
```

**Animated Gradient** (subtle):
```tsx
"bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 animate-gradient-slow"
```

Then add to `index.css`:
```css
@keyframes gradient-slow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-slow {
  background-size: 200% 200%;
  animation: gradient-slow 15s ease infinite;
}
```

---

## Troubleshooting

### Video not showing?
1. Check filename: `logo-reveal-transparent.webm` (exact match)
2. Check file location: `public/videos/` folder
3. Check browser console for errors
4. Verify WebM has alpha channel: `ffmpeg -i video.webm` (should show `yuva420p`)

### Transparent background not working?
1. Verify WebM has alpha: Look for `yuva420p` pixel format
2. Re-export with correct settings
3. Test in Chrome first (best WebM support)

### File size too large?
```powershell
# Compress further (adjust -crf: 0=best quality, 63=smallest):
ffmpeg -i input.webm -c:v libvpx-vp9 -pix_fmt yuva420p -crf 35 -b:v 0 output.webm
```

### Video quality poor?
```powershell
# Increase bitrate and lower CRF:
ffmpeg -i input.webm -c:v libvpx-vp9 -pix_fmt yuva420p -crf 25 -b:v 3M output.webm
```

---

## Quick Test

After uploading your transparent video:

1. Open: http://localhost:8080/ or https://sgctech.ai
2. Logo video should play with gradient background visible
3. If transparent areas look correct, you're done!

---

## Need Help?

**Can't create transparent video?**  
Send me your logo and I can recommend the best approach or tools.

**Video plays but no transparency?**  
The file might not have an alpha channel. Re-export with alpha enabled.

**Want a different background?**  
Just let me know the color/gradient you prefer!

---

**Status**: Ready for transparent video upload  
**Next Step**: Place `logo-reveal-transparent.webm` in `public/videos/` folder  
**Test**: http://localhost:8080/
