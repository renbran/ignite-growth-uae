# Mobile Video & Responsiveness Testing Guide

## 🎬 Changes Made for Mobile Video Support

### 1. **HeroVideoIntro.tsx**
- ✅ Added `muted` attribute (required for autoplay on mobile)
- ✅ Added `controls={false}` to hide default player controls
- ✅ Already has `playsInline` for native mobile playback

### 2. **Hero.tsx**
- ✅ Added `controls={false}` to hide default controls on background video
- ✅ Has `muted`, `autoPlay`, `loop`, `playsInline` for proper autoplay
- ✅ Preload set to "auto" for faster loading

---

## 📱 Mobile Testing Checklist

### **Browser DevTools Mobile Testing**

1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Test These Devices:**
   - ✅ iPhone 12/13/14 (375px width)
   - ✅ iPhone SE (375px width)
   - ✅ iPad (768px width)
   - ✅ Pixel 5 (393px width)
   - ✅ Galaxy S21 (360px width)

### **Video Playback Issues - Troubleshooting**

#### Problem: Intro video won't play on mobile
**Root Cause:** Browser autoplay policy restrictions  
**Solutions to test:**
- [ ] Video is muted (✅ already applied)
- [ ] playsInline attribute present (✅ already applied)
- [ ] No autoplay attribute on intro (user must tap) - ✅ by design
- [ ] Check Network tab: video file size reasonable? (720p ~2-3MB)
- [ ] Check Console: any CORS errors?

#### Problem: Background hero video freezes
**Root Cause:** Large video file, memory pressure  
**Solutions to test:**
- [ ] Try 720p version first (faster load)
- [ ] Fallback to lower quality working
- [ ] Check if video plays with audio enabled
- [ ] Monitor Network throttling (3G speed)

#### Problem: Videos not loading at all
**Root Cause:** Incorrect file paths or MIME types  
**Solutions to test:**
- [ ] Verify video files exist: `/public/videos/logo-intro-2025*.mp4`
- [ ] Check Network tab → Videos requests (304 OK or 200?)
- [ ] Inspect console for specific errors
- [ ] Verify server responds with correct MIME type: `video/mp4`

---

## 🧪 Recommended Testing Flows

### **Test 1: Intro Video on Mobile**
```
1. Open site on mobile device (or DevTools mobile view)
2. Hero intro overlay appears with "Tap to Begin"
3. Tap play button
4. Video plays (with or without audio)
5. Either: Video ends → auto-advance OR tap Skip
6. Verify no stuck screens or white flash
```

### **Test 2: Background Hero Video**
```
1. Scroll past intro
2. Background hero video should be playing (muted)
3. Test volume toggle button (bottom-right)
4. Tap to unmute → audio plays
5. Tap to mute → audio stops
6. Video continues playing in background
```

### **Test 3: Mobile Responsiveness**
```
Intro Video:
- [ ] Mobile (320px): Video scales properly, text readable
- [ ] Tablet (768px): Video centered, good aspect ratio
- [ ] Desktop (1024px+): Video large but not excessive

Footer:
- [ ] Mobile: Single column, clean layout
- [ ] Tablet: 2 columns
- [ ] Desktop: 4 columns

Forms:
- [ ] Input fields tap-friendly (min 44px height)
- [ ] Buttons responsive and clickable
- [ ] No horizontal scroll
```

### **Test 4: Network Throttling (Simulate Slow Networks)**
```
1. DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Reload page
4. Time to load intro video: should be < 5s
5. Hero should still be interactive
6. No timeouts or "video failed to load"
```

---

## 🎨 Video Files Location & Specs

```
public/videos/
├── logo-intro-2025-720p.mp4    (Optimized, ~2-3MB)
├── logo-intro-2025.mp4          (Fallback, higher quality)
└── hero-bg-*.mp4                (Background videos)
```

**Recommended Format:**
- Codec: H.264 (AVC)
- Resolution: 1280×720 (720p)
- Frame Rate: 30fps
- Bitrate: 4-6 Mbps
- Audio: AAC 128kbps
- Container: MP4

---

## 🚀 Quick Launch Mobile Testing

### **Option 1: Local Device Testing**
```bash
# Note the Network URL from dev server output
# Example: http://192.168.0.153:8080/

# Open on your phone's browser (same WiFi)
# E.g., type in address bar: 192.168.0.153:8080
```

### **Option 2: DevTools Emulation**
```
1. Press F12 (DevTools)
2. Press Ctrl+Shift+M (Toggle Device Toolbar)
3. Select device → test responsiveness
4. Use Console to check for errors
5. Use Network tab to monitor video loads
```

---

## 🔧 Debugging Commands (Browser Console)

```javascript
// Check if video element exists
document.querySelector('video')

// Get video source
document.querySelector('video').src

// Check video ready state
// 0 = nothing, 1 = metadata, 2 = current data, 3 = future data, 4 = enough
document.querySelector('video').readyState

// Check if video can play
document.querySelector('video').canPlayType('video/mp4')
// Returns: "" (no), "maybe", or "probably"

// Force play (if permitted)
document.querySelector('video').play()

// Check muted state
document.querySelector('video').muted

// Monitor video events
document.querySelector('video').addEventListener('play', () => console.log('Playing'))
document.querySelector('video').addEventListener('error', (e) => console.log('Error:', e))
document.querySelector('video').addEventListener('loadstart', () => console.log('Loading...'))
```

---

## 📊 Performance Metrics to Track

| Metric | Target | Current |
|--------|--------|---------|
| Intro Video Load Time | < 3s | ❓ Test |
| First Frame (Video) | < 1s | ❓ Test |
| Page Interactive (Mobile 3G) | < 3s | ❓ Test |
| Video Play Success Rate | 95%+ | ❓ Test |
| Intro Completion Rate | 60%+ | ❓ Test |

---

## 🎯 Next Steps if Videos Still Don't Play

1. **Check Console (F12 → Console tab)** for error messages
2. **Network Tab (F12 → Network)** → look for video requests
   - Verify they return 200 (not 404/403)
   - Check file size is reasonable (not 0 bytes)
3. **Test with older video codec** (VP9/WebM as fallback)
4. **Check browser compatibility:**
   - Chrome/Chromium: ✅ MP4
   - Safari iOS: ✅ MP4 (most reliable)
   - Firefox: ✅ MP4
   - Edge: ✅ MP4
5. **Reduce video quality** if connection is poor
6. **Add fallback image** if video fails to load

---

## 📝 Notes

- Videos require `muted` attribute for autoplay policy compliance
- `playsInline` ensures videos play inline on iOS (not fullscreen)
- `controls={false}` hides browser default controls
- Intro video is manually triggered (no autoplay) - better UX
- Background hero video autoplays muted, can be unmuted by user

**Last Updated:** January 11, 2026
