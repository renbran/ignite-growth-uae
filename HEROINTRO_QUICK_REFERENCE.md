# 🎬 HeroVideoIntro - Quick Reference Card

## The 3-Step Implementation

### STEP 1: Component Code (15 min)
```
Replace src/components/HeroVideoIntro.tsx
with code from HEROINTRO_OPTIMIZED_IMPLEMENTATION.md
```

### STEP 2: Video Files (5 min)
```
Create: public/videos/sgc-tech-ai-logo-intro-720p.mp4 (~1.5-2MB)
Create: public/videos/sgc-tech-ai-logo-intro-360p.mp4 (~400-600KB)
```

### STEP 3: Test on Phone (10 min)
```
npm run dev
Open on phone: http://YOUR-COMPUTER-IP:5173
Verify: Video loads, plays, touches work
```

---

## Device Sizing Reference

```
320px:  95vw max-width, 85vh max-height, w-12 h-12 button
360px:  90vw max-width, 75vh max-height, w-14 h-14 button
768px:  80vw max-width, 80vh max-height, w-16 h-16 button
1280px: 80vw max-width, 80vh max-height, w-20 h-20 button
```

---

## Connection-Aware Quality

```
Data Saver:   SKIP splash entirely
2G Network:   SKIP splash entirely
3G Network:   Use 360p video (fallback)
4G Network:   Use 720p video (primary)
```

---

## Touch Debounce Logic

```
Tap 1:  Play video ✅
Tap 2 (< 300ms):  Ignored (debounced)
Tap 3 (> 300ms):  Play again ✅
```

---

## Buffer Monitoring

```
0-20%:    Show "Buffering video..." message
20-100%:  Show "Click to Play" button
100%:     Video ready to play immediately
```

---

## Video Encoding Commands

### High Quality (720p)
```bash
ffmpeg -i input.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 -crf 20 -preset fast \
  -c:a aac -b:a 128k \
  -t 5 \
  output-720p.mp4
```

### Low Quality (360p - Fallback)
```bash
ffmpeg -i input.mp4 \
  -vf "scale=640:360" \
  -c:v libx264 -crf 23 -preset fast \
  -c:a aac -b:a 96k \
  -t 5 \
  output-360p.mp4
```

---

## Testing Checklist - Minimal

```
☐ Splash appears on page load
☐ Video loads and plays
☐ Single tap → plays
☐ Double tap → ignored
☐ Skip button works
☐ Rotate phone → resizes properly
☐ No crashes or errors
```

---

## Testing on Phone (From Desktop)

```bash
# 1. Get your computer IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# 2. Start dev server
npm run dev

# 3. Open on phone browser
http://YOUR-COMPUTER-IP:5173

# 4. Verify it works
```

---

## Common Issues - Quick Fixes

| Issue | Fix |
|-------|-----|
| Video won't load | Check file paths in component |
| Video looks wrong | Ensure source is square (1:1 aspect) |
| Touch not working | Verify buffer is 20%+, check console |
| Crashes on rotate | Update to new component code |
| Performance slow | Reduce video bitrate, shorter duration |

---

## File Locations

```
src/components/HeroVideoIntro.tsx        ← Update this
public/videos/sgc-tech-ai-logo-intro-720p.mp4    ← Create this
public/videos/sgc-tech-ai-logo-intro-360p.mp4    ← Create this
src/index.css                            ← Optional additions
```

---

## Performance Targets

```
Video Load Time:     < 3 seconds (mobile 4G)
Time to Playable:    < 2 seconds
Playback Success:    98%+ (up from 75%)
Touch Response:      < 100ms (down from 500ms+)
```

---

## Optimization Tiers

### Tier 1: MUST DO
- ✅ Device-aware sizing
- ✅ Debounced touch
- ✅ Orientation handler

### Tier 2: SHOULD DO
- ✅ Buffer monitoring
- ✅ Loading states
- ✅ Connection detection

### Tier 3: NICE TO HAVE
- ✅ Advanced error recovery
- ✅ Performance optimization
- ✅ Analytics tracking

---

## CSS Classes Used

```
Responsive padding:     p-4 sm:p-6 md:p-8 lg:p-10
Text sizes:            text-xs sm:text-sm
Flex centering:        flex items-center justify-center
Grid layout:           grid grid-cols-1 md:grid-cols-2
Animations:            animate-spin, duration-300
Touch targets:         min-w-[44px] min-h-[44px]
```

---

## Import Statements in Component

```typescript
import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";

// That's it! No external dependencies needed beyond what you have
```

---

## State Variables to Know

```typescript
isVisible:        Splash screen shown/hidden
isPlaying:        Video currently playing
isLoadingVideo:   Attempting to play
isBuffering:      Video stalled, waiting for buffer
readyToPlay:      At least 20% buffered
videoSizeConfig:  Responsive sizing config
videoSourceIndex: Primary (0) or fallback (1) video
lastTapTime:      For debounce logic
```

---

## Key Props

```typescript
onComplete: () => void  ← Required: Called when splash ends
```

**Usage in parent:**
```tsx
<HeroVideoIntro onComplete={() => showMainContent()} />
```

---

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ iOS Safari 14+  
✅ Chrome Android (all modern)  

---

## Performance Monitoring

### DevTools Network Tab
1. Open: F12 → Network
2. Set throttle: "Slow 3G" or "4G"
3. Reload page
4. Watch video download progress
5. Verify smooth playback

### DevTools Performance
1. Open: F12 → Performance
2. Record while splash plays
3. Check: No long tasks, smooth 60fps
4. Look for: Smooth animations

---

## Accessibility Checklist

```
☐ Play button min 44px (touch target)
☐ Skip button min 44px (touch target)
☐ ARIA labels on buttons
☐ aria-live announcements
☐ Keyboard support works
☐ Color contrast adequate
```

---

## Debug Console Commands

When testing on phone, these logs show in console (F12):

```javascript
// ✅ Success signs
"✅ Video ready to play (20% buffered)"
"✅ Video playing"
"✅ Video finished playing"

// ⚠️ Warning signs
"⏳ Video still buffering..."
"❌ Video error:"
"❌ All video sources failed"

// ℹ️ Info signs
"📡 Data Saver mode detected"
"📡 3G connection detected - using lower quality"
"⏭️ Skipping intro"
```

---

## File Sizes Reference

### Video Targets
```
720p quality:  < 2MB per 5 seconds
360p quality:  < 600KB per 5 seconds
Average:       ~400KB per second
```

### If Too Large
- Reduce CRF value from 20 to 23-26
- Reduce duration from 5s to 3s
- Reduce resolution (640x360 to 480x270)
- Reduce audio bitrate to 64k

---

## Mobile Testing Devices

### Priority 1 (Must Test)
- iPhone SE or similar (375px)
- Samsung Galaxy A12 (360px)
- iPhone 6/7/8 (375px)

### Priority 2 (Should Test)
- iPhone 12 (390px)
- Google Pixel 6a (412px)
- iPad (768px+)

### Priority 3 (Nice to Test)
- Very small phone (320px)
- Foldable phone (if available)

---

## CSS Media Queries Reference

```css
@media (max-width: 640px) { /* Mobile */ }
@media (min-width: 641px) and (max-width: 768px) { /* Tablet */ }
@media (min-width: 769px) { /* Desktop */ }
@media (prefers-reduced-motion: reduce) { /* Accessibility */ }
```

---

## TypeScript Key Interfaces

```typescript
interface VideoSizeConfig {
  maxWidth: string;        // e.g., "90vw"
  maxHeight: string;       // e.g., "75vh"
  padding: string;         // e.g., "1rem"
  playButtonSize: string;  // e.g., "w-16 h-16"
  videoMargin: string;     // e.g., "0"
}

interface HeroVideoIntroProps {
  onComplete: () => void;
}
```

---

## API Usage Reference

### Navigator Connection API
```javascript
const connection = navigator.connection;
connection.saveData           // Boolean: data saver enabled?
connection.effectiveType      // String: "2g" | "3g" | "4g"
connection.downlink           // Number: Mbps estimate
```

### Video Buffered API
```javascript
video.buffered.length                  // Number of buffer ranges
video.buffered.end(0)                  // End time of first range
video.duration                         // Total video duration
(buffered / duration) * 100            // Percentage buffered
```

### Window API
```javascript
window.innerWidth            // Viewport width
window.innerHeight           // Viewport height
screen.orientation.type      // "portrait-primary" etc
navigator.mediaDevices       // Camera/mic permissions
```

---

## Version Compatibility

```
React:        18.0+
TypeScript:   4.5+
Tailwind CSS: 3.0+
lucide-react: 0.200+
```

---

## Debugging Workflow

1. **Component won't import?**
   - Check console for TS errors
   - Verify lucide-react installed
   - Verify import paths

2. **Video won't load?**
   - Check Network tab (F12)
   - Verify video file exists
   - Check CORS headers

3. **Touch not working?**
   - Check console logs
   - Verify readyToPlay = true
   - Try slower throttle

4. **Looks weird on phone?**
   - Check computed styles (Inspect)
   - Verify max-w and max-h values
   - Compare with test matrix

---

## One-Liner Tests

```bash
# Does component compile?
npm run lint

# Dev server running?
npm run dev

# Can you reach from phone?
ping YOUR-COMPUTER-IP

# Video files exist?
ls -la public/videos/

# Check file sizes
du -h public/videos/*.mp4
```

---

## Rollback Plan

If something breaks:

1. Backup new version
2. Revert to previous HeroVideoIntro.tsx
3. Deploy old version
4. Identify issue in new code
5. Fix and test again
6. Re-deploy

**Time to rollback: < 5 minutes**

---

**Print this card for quick reference while implementing!** 📋

