# Video Compression Script for SGC TECH AI Logo Reveal

## Quick Solution: Online Compression

Since ffmpeg is not installed, use one of these **free online tools** to compress the video:

### Option 1: CloudConvert (Recommended)
1. Go to: https://cloudconvert.com/mp4-converter
2. Upload: `Logo reveal.mp4` (60.77 MB)
3. Settings:
   - **Format**: MP4
   - **Video Codec**: H.264
   - **Quality**: High (CRF 23-26)
   - **Audio Codec**: AAC
   - **Audio Bitrate**: 128 kbps
   - **Resolution**: Keep original (or 1920x1080 if higher)
   - **Target Size**: ~20 MB
4. Download compressed file
5. Save as: `logo-reveal-compressed.mp4`

### Option 2: FreeConvert.com
1. Go to: https://www.freeconvert.com/video-compressor
2. Upload video
3. Set compression level: Medium-High
4. Download result

### Option 3: Clideo
1. Go to: https://clideo.com/compress-video
2. Upload video
3. Choose compression preset
4. Download

---

## Alternative: Install ffmpeg and Compress Locally

### Step 1: Download ffmpeg
1. Go to: https://www.gyan.dev/ffmpeg/builds/
2. Download: `ffmpeg-release-essentials.zip`
3. Extract to: `C:\ffmpeg`
4. Add to PATH:
   ```powershell
   $env:Path += ";C:\ffmpeg\bin"
   [Environment]::SetEnvironmentVariable("Path", $env:Path, "Machine")
   ```

### Step 2: Compress Video
Once ffmpeg is installed, run this command:

```powershell
# Navigate to video location
cd "D:\RUNNING APPS\website\ignite-growth-uae"

# High Quality Compression (~18-20 MB)
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart "logo-reveal-compressed.mp4"

# Medium Quality (~12-15 MB)
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k -movflags +faststart "logo-reveal-compressed.mp4"

# Lower Quality (~8-10 MB) - Still acceptable
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 30 -preset fast -c:a aac -b:a 96k -movflags +faststart "logo-reveal-compressed.mp4"
```

**Explanation of parameters**:
- `-crf 26-30`: Quality (lower = better quality, higher file size)
- `-preset slow`: Compression efficiency (slower = smaller file)
- `-b:a 128k`: Audio bitrate (128 kbps = good quality)
- `-movflags +faststart`: Optimizes for web streaming

### Step 3: Copy to Public Folder
```powershell
Copy-Item "logo-reveal-compressed.mp4" "public/videos/logo-reveal.mp4" -Force
```

---

## Once Compressed:

After you have the compressed video (using online tool or ffmpeg), **let me know** and I'll:

1. ✅ Update the code to use native HTML5 video (no YouTube)
2. ✅ Enable autoplay with audio at 70% volume
3. ✅ Add proper fallback for browsers that block autoplay
4. ✅ Ensure video quality is appropriate for enterprise presentation
5. ✅ Deploy immediately

---

## Expected Results:

| Method | File Size | Quality | Recommendation |
|--------|-----------|---------|----------------|
| CloudConvert (High) | ~18-22 MB | Excellent | ✅ **Best choice** |
| CloudConvert (Medium) | ~12-15 MB | Very Good | ✅ Good balance |
| FreeConvert | ~15-20 MB | Good | ✅ Acceptable |
| ffmpeg CRF 26 | ~18-20 MB | Excellent | ✅ Professional quality |
| ffmpeg CRF 28 | ~12-15 MB | Very Good | ✅ Recommended |
| ffmpeg CRF 30 | ~8-10 MB | Good | 🟡 Slight quality loss |

**Recommendation**: Aim for **15-20 MB** with **CRF 26-28** for the best balance of quality and file size.

---

## What I'll Implement Next:

```typescript
// HeroVideoIntro.tsx - Native HTML5 Video with Audio
<video
  autoPlay
  playsInline
  preload="auto"
  volume={0.7} // 70% volume
  onEnded={handleComplete}
>
  <source src="/videos/logo-reveal.mp4" type="video/mp4" />
</video>
```

**Advantages over YouTube**:
- ✅ No external dependencies
- ✅ Full control over playback
- ✅ Better autoplay reliability
- ✅ No YouTube branding concerns
- ✅ Professional presentation
- ✅ Faster loading (no API scripts)

**Once you have the compressed video ready, I'll implement this immediately!**
