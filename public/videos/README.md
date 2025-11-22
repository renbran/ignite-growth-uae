# Video Assets - Hero Section

## Required Video Files

Place the following video files in this directory:

### 1. Logo Intro Video
**Filename:** `sgc-tech-ai-logo-intro.mp4`

**Specifications:**
- Duration: 6 seconds exactly
- Resolution: 1920x1080 (Full HD)
- Format: MP4 (H.264 codec)
- File Size: < 5MB (optimized for web)
- Audio: Optional subtle sound design
- Aspect Ratio: 16:9
- Frame Rate: 60fps
- Background: Pure black (#0A0A0A)
- Content: Logo animation ONLY (no text overlays)

**Optimization Command:**
```bash
ffmpeg -i logo-intro-raw.mp4 \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -vf scale=1920:1080 \
  -movflags +faststart \
  sgc-tech-ai-logo-intro.mp4
```

### 2. Founder Voiceover Video
**Filename:** `founder-3am-truth-speech.mp4`

**Specifications:**
- Duration: 2.5-3 minutes
- Resolution: 1920x1080 (Full HD)
- Format: MP4 (H.264 codec)
- File Size: < 50MB (compressed but high quality)
- Audio: Crystal clear, -3dB peak normalization
- Aspect Ratio: 16:9
- Frame Rate: 30fps or 60fps
- Background: Dark gradient or simple setting
- Captions: Embedded or separate VTT file
- Poster Image: High-quality thumbnail at 0:01 mark

**Optimization Command:**
```bash
ffmpeg -i founder-speech-raw.mp4 \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 192k \
  -vf scale=1920:1080 \
  -movflags +faststart \
  founder-3am-truth-speech.mp4
```

### 3. Compressed Versions (Optional - for slower connections)
**Filenames:**
- `sgc-tech-ai-logo-intro-compressed.mp4`
- `founder-3am-truth-speech-compressed.mp4`

**Optimization Command:**
```bash
ffmpeg -i sgc-tech-ai-logo-intro.mp4 \
  -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 96k \
  -vf scale=1280:720 \
  -movflags +faststart \
  sgc-tech-ai-logo-intro-compressed.mp4
```

## Current Status

⚠️ **PLACEHOLDER FILES NEEDED** - Upload your video files to this directory before deploying.

## Testing Checklist

- [ ] Logo intro plays automatically on page load
- [ ] Logo intro has no audio conflicts
- [ ] Voiceover video loads after intro ends
- [ ] Both videos play on iOS/Android devices
- [ ] Videos work in Chrome, Firefox, Safari, Edge
- [ ] File sizes are optimized for web delivery
