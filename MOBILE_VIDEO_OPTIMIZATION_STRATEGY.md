# 🎯 Deep Mobile Video Hero Section Optimization Strategy

## Current State Analysis

### Current Implementation Issues:
1. **Video Codec & Size**: Using MP4 without mobile-specific encoding
2. **Bandwidth**: No adaptive bitrate switching based on connection type
3. **Mobile Viewport**: Videos may waste bandwidth on smaller screens
4. **Battery**: Auto-play consumes significant battery on mobile
5. **Data Usage**: No consideration for data-saver mode indicators
6. **Network Latency**: No graceful fallback for poor connections
7. **CPU Usage**: Video decoding strains mobile processors
8. **Memory**: Full-res videos may cause memory issues on low-end devices

---

## 📊 Mobile Performance Targets

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Hero Load Time | < 3s | Unknown | To measure |
| Mobile Score | 90+ | Unknown | To measure |
| Video Start | < 2s | Unknown | To measure |
| First Paint | < 1.5s | Unknown | To measure |
| Data Usage (hero) | < 2MB | ~5-8MB | High gap |
| Battery Impact | Minimal | High | High gap |

---

## 🎬 Multi-Tier Video Strategy (Recommended)

### Tier 1: Ultra-Light (Mobile First)
- **Format**: HEVC/H.265 (30-40% smaller)
- **Resolution**: 360p/480p
- **Bitrate**: 500-800 kbps
- **Codec**: hevc (auto fallback to h264)
- **Size**: ~0.8-1.2 MB
- **Use Case**: Mobile, slow connections, data-saver mode

### Tier 2: Standard (Tablets & Mid-Range)
- **Format**: H.264/AVC
- **Resolution**: 720p
- **Bitrate**: 1.5-2 Mbps
- **Codec**: h264
- **Size**: ~2-3 MB
- **Use Case**: Tablets, WiFi, regular connections

### Tier 3: Premium (Desktop & High-Speed)
- **Format**: HEVC/H.265
- **Resolution**: 1080p-1440p
- **Bitrate**: 4-6 Mbps
- **Codec**: hevc
- **Size**: ~4-6 MB
- **Use Case**: Desktop, high-speed connections

---

## 🔧 Implementation Strategy

### Phase 1: Connection Detection & Source Selection
```typescript
// Detect connection type and select appropriate video
function getOptimalVideoSource() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = connection?.saveData;
  const effectiveType = connection?.effectiveType;
  const downlink = connection?.downlink; // Mbps

  if (saveData) return 'ultra-light'; // Respect user's data preference
  if (effectiveType === '4g' || downlink > 2.5) return 'premium';
  if (effectiveType === '3g' || downlink > 1) return 'standard';
  return 'ultra-light'; // Default to light for safety
}
```

### Phase 2: Progressive Enhancement
1. **Start with poster image** (50-100KB)
2. **Load appropriate video source** based on connection
3. **Show video when loaded** (smooth transition)
4. **Fallback to static image** if video fails

### Phase 3: Lazy Loading with Intersection Observer
```typescript
// Don't autoplay hero video until visible
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  });
  
  if (videoRef.current) observer.observe(videoRef.current);
  return () => observer.disconnect();
}, []);
```

### Phase 4: Responsive Video Dimensions
```tsx
// Adjust video canvas based on device
<video
  className="w-full h-auto max-h-[70vh] object-contain"
  style={{
    maxWidth: isMobile ? '100vw' : '90vw', // Prevent scaling
    maxHeight: isMobile ? '60vh' : '80vh'
  }}
/>
```

---

## 📱 Mobile-Specific Optimizations

### 1. **Disable Autoplay on Mobile**
```typescript
// Better approach: Require user interaction or visibility
const shouldAutoplay = !isMobile && videoIsVisible;
```

### 2. **Reduce Video Dimensions on Mobile**
```css
/* Render video at device pixel ratio, not higher */
@media (max-width: 768px) {
  .hero-video {
    max-width: 100vw;
    max-height: 50vh; /* Smaller on mobile */
  }
}
```

### 3. **Disable Hardware Acceleration on Low-End Devices**
```typescript
// Detect low-end Android/iOS
if (isLowEndDevice()) {
  video.style.transform = 'none'; // Disable GPU acceleration
}
```

### 4. **Control Playback Quality**
```typescript
// Pause video when tab is hidden to save battery
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    videoRef.current?.pause();
  } else {
    videoRef.current?.play();
  }
});
```

### 5. **Respect User Preferences**
```typescript
// Respect reduced motion preference
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  useStaticImage(); // Show static image instead
}

// Respect data-saver mode
if (navigator.connection?.saveData) {
  useUltraLightVideo(); // Smallest possible version
}
```

---

## 🎥 Video Encoding Specifications

### Mobile-Optimized Encoding

#### Ultra-Light (Mobile)
```bash
ffmpeg -i input.mp4 \
  -vcodec hevc -preset medium \
  -crf 28 -b:v 800k -maxrate 1M -bufsize 2M \
  -s 480x270 -r 24 \
  -acodec aac -b:a 64k \
  -pix_fmt yuv420p \
  output-mobile.mp4
```

#### Standard (Tablet)
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 -preset fast \
  -crf 23 -b:v 2000k -maxrate 3M -bufsize 6M \
  -s 1280x720 -r 30 \
  -acodec aac -b:a 128k \
  output-tablet.mp4
```

#### Premium (Desktop)
```bash
ffmpeg -i input.mp4 \
  -vcodec hevc -preset slow \
  -crf 20 -b:v 5000k -maxrate 8M -bufsize 15M \
  -s 1920x1080 -r 30 \
  -acodec aac -b:a 192k \
  output-desktop.mp4
```

### WebM Alternative (VP9 - Better compression)
```bash
ffmpeg -i input.mp4 \
  -vcodec vp9 -preset 2 \
  -crf 30 -b:v 800k \
  -s 480x270 \
  -acodec libopus -b:a 64k \
  output-mobile.webm
```

---

## 🛠️ Recommended Component Changes

### 1. Add Adaptive Source Selection
```tsx
const HERO_VIDEO_SOURCES = {
  'ultra-light': '/videos/logo-intro-2025-360p.mp4',
  'standard': '/videos/logo-intro-2025-720p.mp4',
  'premium': '/videos/logo-intro-2025-1080p.mp4',
};

function getVideoSource() {
  const connection = navigator.connection;
  if (connection?.saveData) return HERO_VIDEO_SOURCES['ultra-light'];
  if (connection?.effectiveType === '4g') return HERO_VIDEO_SOURCES['premium'];
  return HERO_VIDEO_SOURCES['standard'];
}
```

### 2. Implement Lazy Load with Intersection Observer
```tsx
useEffect(() => {
  if (!videoRef.current) return;
  
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  });
  
  observer.observe(videoRef.current);
  return () => observer.disconnect();
}, []);
```

### 3. Control Playback Based on Visibility
```tsx
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      videoRef.current?.pause();
    } else {
      if (shouldAutoplay) videoRef.current?.play();
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibility);
  return () => document.removeEventListener('visibilitychange', handleVisibility);
}, [shouldAutoplay]);
```

### 4. Disable Autoplay on Mobile
```tsx
const isMobile = window.innerWidth < 768;
const shouldAutoplay = !isMobile;

<video
  autoPlay={shouldAutoplay}
  controls={isMobile} // Allow manual play on mobile
  playsInline
  {...otherProps}
/>
```

### 5. Responsive Poster Image
```tsx
<video
  poster={isMobile 
    ? '/images/hero/poster-mobile.jpg' 
    : '/images/hero/poster-desktop.jpg'}
/>
```

---

## 🎯 Priority Optimization Checklist

### HIGH PRIORITY (Do First)
- [ ] Create ultra-light 360p video variant (mobile)
- [ ] Implement connection detection
- [ ] Add lazy load with Intersection Observer
- [ ] Disable autoplay on mobile
- [ ] Implement pause on visibility change

### MEDIUM PRIORITY (Do Next)
- [ ] Create 720p standard variant
- [ ] Add WebM format for better compression
- [ ] Optimize poster images (mobile vs desktop)
- [ ] Add preload strategy based on connection
- [ ] Implement HEVC encoding for premium tier

### LOW PRIORITY (Nice to Have)
- [ ] Add analytics for video performance
- [ ] Implement adaptive bitrate switching
- [ ] Create 1080p+ premium version
- [ ] Add fallback GIF animation
- [ ] Implement thumbnail/sprite preview

---

## 📈 Expected Improvements

| Optimization | Mobile Impact | Data Savings | Battery Impact |
|--------------|---------------|--------------|-----------------|
| Ultra-light variant | ✅✅✅ | 60-70% | ✅✅ |
| Lazy loading | ✅✅ | 20-30% | ✅✅✅ |
| Disable autoplay | ✅ | 10% | ✅✅✅ |
| Visibility control | ✅ | 5-15% | ✅✅ |
| Responsive dimensions | ✅ | 15-20% | ✅ |
| **TOTAL** | **✅✅✅** | **60-80%** | **✅✅✅** |

---

## 🧪 Testing Strategy

### 1. Connection Simulation
```bash
# Chrome DevTools > Network > Throttling
- Slow 3G: ~400 kbps
- 4G: ~4 Mbps
- Offline: No connection
```

### 2. Device Testing
- iPhone 12 (Low-end)
- iPhone 14 Pro (High-end)
- Samsung Galaxy A12 (Low-end)
- Samsung Galaxy S23 (High-end)
- iPad Air (Tablet)

### 3. Metrics to Monitor
- Time to First Video Frame (TTFVF)
- Video Load Time
- Time to Interactive (TTI)
- Battery drain rate
- Memory usage
- CPU usage
- Network bandwidth

### 4. Tools
- Google Lighthouse
- WebPageTest
- Chrome DevTools Performance
- Network throttling
- Battery usage monitoring

---

## 🚀 Rollout Plan

### Week 1: Preparation
- [ ] Encode 3 video variants
- [ ] Create WebM versions
- [ ] Design responsive poster images

### Week 2: Development
- [ ] Implement connection detection
- [ ] Add lazy loading
- [ ] Disable mobile autoplay
- [ ] Add visibility controls

### Week 3: Testing & Optimization
- [ ] Test on real devices
- [ ] Monitor performance metrics
- [ ] Fine-tune thresholds

### Week 4: Deployment & Monitoring
- [ ] Deploy to production
- [ ] Monitor analytics
- [ ] Gather user feedback
- [ ] Make adjustments

---

## 💡 Pro Tips

1. **Test on Real 4G/3G**: Throttling in DevTools is not accurate
2. **Measure Twice**: Before and after optimization
3. **Respect User Preferences**: Always check saveData flag
4. **Fallback Gracefully**: Always have static image backup
5. **Monitor Continuously**: Set up analytics for real-world performance
6. **Consider Data Costs**: In many markets, video data is expensive

---

## 📚 Resources

- [Video Optimization Guide](https://developers.google.com/web/fundamentals/media/video)
- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Web.dev Video Guide](https://web.dev/efficiently-load-third-party-javascript/)

---

## ✅ Next Steps

1. **Review this strategy** with the team
2. **Approve encoding specifications**
3. **Start with ultra-light variant** creation
4. **Implement connection detection** in Hero.tsx
5. **Test on mobile devices**
6. **Deploy and monitor**

---

*Last Updated: January 11, 2026*
*Status: Ready for Implementation*
