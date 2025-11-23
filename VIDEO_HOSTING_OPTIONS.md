# Video Hosting Options for Logo Reveal (60.77 MB)

## Problem
The logo reveal video (`Logo reveal.mp4`) is **60.77 MB**, which exceeds Cloudflare Pages' **25 MB file size limit**.

## Solutions

### Option 1: External Video Hosting (Recommended)

#### A. YouTube (Free, Reliable)
1. Upload video to YouTube as **Unlisted** or **Public**
2. Get embed URL or direct MP4 link
3. Update `HeroVideoIntro.tsx` with YouTube embed or URL
4. **Pros**: Free, fast CDN, reliable
5. **Cons**: YouTube branding (can be hidden with API)

#### B. Vimeo (Professional)
1. Upload to Vimeo (free or Pro account)
2. Get direct video URL
3. **Pros**: No branding, professional, privacy controls
4. **Cons**: Free tier has upload limits

#### C. Cloudflare R2 / AWS S3 (Cloud Storage)
1. Upload to object storage (R2, S3, Google Cloud Storage)
2. Get public URL or signed URL
3. Update video src to external URL
4. **Pros**: Full control, fast delivery, no branding
5. **Cons**: Requires cloud account, may incur costs

### Option 2: Video Compression (Local)

#### Using FFmpeg
```powershell
# Install ffmpeg (if not installed)
# Download from: https://ffmpeg.org/download.html

# Compress to ~15MB (high quality)
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k "logo-reveal-compressed.mp4"

# Compress to ~10MB (medium quality)
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 32 -preset slow -c:a aac -b:a 96k "logo-reveal-compressed.mp4"

# Compress to ~5MB (lower quality)
ffmpeg -i "Logo reveal.mp4" -c:v libx264 -crf 35 -preset slow -c:a aac -b:a 64k "logo-reveal-compressed.mp4"
```

**After compression**, copy to public folder:
```powershell
Copy-Item "logo-reveal-compressed.mp4" "D:\RUNNING APPS\website\ignite-growth-uae\public\videos\logo-reveal.mp4"
```

### Option 3: Split Video (If Applicable)

If the video contains:
1. **Logo reveal** (first 10-15 seconds)
2. **CEO message** (remaining duration)

**Workflow**:
1. Split into two files
2. Keep logo reveal locally (if under 25 MB)
3. Host CEO message externally or compress separately
4. Use sequential playback in HeroOrchestrator

### Option 4: Hybrid Approach (Recommended)

**Workflow**:
1. Compress logo reveal to ~10 MB for local hosting
2. Host full quality version externally as backup
3. Use local version for fast load, external for fallback

```typescript
// In HeroVideoIntro.tsx
<video>
  <source src="/videos/logo-reveal-compressed.mp4" type="video/mp4" />
  <source src="https://external-cdn.com/logo-reveal.mp4" type="video/mp4" />
</video>
```

## Recommended Next Steps

### For Quick Launch:
1. **Compress video locally** using FFmpeg (Option 2)
2. Target ~15-20 MB for acceptable quality
3. Deploy immediately

### For Best Quality:
1. **Upload to Cloudflare R2** (Option 1C)
2. Get public URL
3. Update `HeroVideoIntro.tsx` with external URL
4. No compression needed, unlimited size

### Current Code Changes Needed:

```typescript
// src/components/HeroVideoIntro.tsx
// Replace video source with external URL

<video
  ref={videoRef}
  className="w-full h-full object-contain"
  playsInline
  preload="auto"
  aria-label="SGC TECH AI logo reveal animation"
>
  {/* Option A: External URL (YouTube, Vimeo, R2, etc.) */}
  <source src="https://your-cdn.com/logo-reveal.mp4" type="video/mp4" />
  
  {/* Option B: Compressed local file */}
  <source src="/videos/logo-reveal-compressed.mp4" type="video/mp4" />
  
  Your browser does not support the video tag.
</video>
```

## Let Me Know Your Preference:

1. **"Compress it"** - I'll create compression script
2. **"Upload to [Platform]"** - I'll update code for external URL
3. **"Split it"** - I'll help separate logo reveal and CEO message
4. **"Use Cloudflare R2"** - I'll guide you through R2 setup

**Current Status**: Code updated to use new video, but deployment blocked by file size.
