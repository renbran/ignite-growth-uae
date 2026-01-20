# 📱 Mobile Video Hero - Quick Reference

## 🎯 Core Problem
Current hero video wastes mobile data (5-8MB) and drains battery due to:
- No connection-aware video selection
- Always auto-plays (battery drain)
- Single high-res video for all devices
- No lazy loading

## ✅ Solution Summary

### 3-Tier Video Strategy
```
Mobile (480p)          → 0.8-1.2 MB   [Ultra-Light HEVC]
Tablet (720p)          → 2-3 MB       [Standard H.264]
Desktop (1080p+)       → 4-6 MB       [Premium HEVC]
```

### Key Changes
1. **Detect connection** → Choose right video
2. **Lazy load** → Only play when visible
3. **Disable autoplay on mobile** → Save battery
4. **Pause when hidden** → Respect user (tab switch)
5. **Responsive sizing** → Don't scale up on small screens

## 📊 Expected Results

| Metric | Improvement |
| --- | --- |
| Mobile data usage | 60-80% reduction |
| Battery impact | 70-80% better |
| Load time | 2-3 seconds |
| User experience | Much better |

## 🚀 Implementation Priority

**PHASE 1 (Week 1-2):**
- [ ] Encode ultra-light 360p variant
- [ ] Add connection detection to Hero.tsx
- [ ] Disable autoplay on mobile
- [ ] Implement visibility pause

**PHASE 2 (Week 3):**
- [ ] Create 720p variant
- [ ] Add lazy load with Intersection Observer
- [ ] Test on real devices

**PHASE 3 (Week 4):**
- [ ] Deploy to production
- [ ] Monitor analytics
- [ ] Fine-tune based on data

## 💻 Code Changes (Minimal)

### Hero.tsx Changes
```tsx
// 1. Detect connection and select video
const connection = navigator.connection;
const isMobile = window.innerWidth < 768;

// 2. Choose video based on connection
const videoSource = connection?.saveData 
  ? 'ultra-light' 
  : isMobile 
    ? 'standard' 
    : 'premium';

// 3. Disable autoplay on mobile
<video autoPlay={!isMobile} />

// 4. Pause when hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videoRef.current?.pause();
  else videoRef.current?.play();
});
```

## 📁 Files to Encode

Create these in `/public/videos/`:
- `logo-intro-2025-360p.mp4` (Ultra-light: 0.8MB)
- `logo-intro-2025-720p.mp4` (Standard: 2.5MB)
- `logo-intro-2025-1080p.mp4` (Premium: 5MB)

## 🧪 How to Test

1. **Chrome DevTools** → Network → Throttle to "Slow 3G"
2. **Watch video load** → Should use 360p version
3. **Check DevTools** → Network tab → Size should be <2MB
4. **Test on real phone** → Should feel smooth and fast

## 📈 Metrics to Track

- Time to first video frame
- Video completion rate
- Mobile vs desktop performance
- Battery drain comparison
- Data usage per session

---

**For complete details, see:** [MOBILE_VIDEO_OPTIMIZATION_STRATEGY.md](./MOBILE_VIDEO_OPTIMIZATION_STRATEGY.md)
