# 📱 HeroVideoIntro - Mobile Device Testing Matrix

## Quick Reference: What to Test on Each Device

---

## 🎯 Critical Test Devices

### Tier 1: MUST TEST (Essential)

#### iPhone SE (2nd Gen) - 375px width
```
Screen: 5.81" diagonal
Resolution: 1125 x 2436 px
Device Pixel Ratio: 3
Test Case: [✓] Standard phone
```
**What to test:**
- Video loads and plays smoothly
- Play button centered properly
- Skip button is touch-friendly (min 44px)
- No layout shift when rotating

---

#### Samsung Galaxy A12 - 360px width
```
Screen: 6.5" diagonal
Resolution: 720 x 1600 px
Device Pixel Ratio: 2
Test Case: [✓] Budget Android phone
```
**What to test:**
- Video doesn't crop or distort
- Buffering indicator shows
- Touch events work smoothly
- No stuttering during playback

---

#### iPhone 6/7/8 (Older) - 375px width
```
Screen: 4.7" diagonal
Resolution: 750 x 1334 px
Device Pixel Ratio: 2
Test Case: [✓] Legacy device
```
**What to test:**
- Video plays without stuttering
- Memory usage is acceptable
- No crashes or freezes
- Audio syncs with video

---

#### Device Under 320px Width
```
Screen: < 5" diagonal
Resolution: 320 x 568 px or similar
Device Pixel Ratio: 1-2
Test Case: [!] EDGE CASE - very old phones
```
**What to test:**
- Video visible (not cut off)
- Play button scales down
- No overflow or layout breaking
- Text readable (if any)

---

### Tier 2: SHOULD TEST (Important)

#### iPhone 12 - 390px width
```
Screen: 6.1" diagonal
Resolution: 1170 x 2532 px
Device Pixel Ratio: 3
Test Case: [✓] Modern phone
```
**What to test:**
- Optimal sizing performance
- Fast playback without buffering
- Rotation transitions smooth
- Audio plays without delay

---

#### Google Pixel 6a - 412px width
```
Screen: 6.1" diagonal
Resolution: 1080 x 2340 px
Device Pixel Ratio: 2.75
Test Case: [✓] High-quality Android
```
**What to test:**
- Video quality is sharp
- Touch responsiveness fast
- Battery usage reasonable
- No thermal throttling

---

#### iPad - 768px width (Tablet)
```
Screen: 9.7" diagonal
Resolution: 2048 x 1536 px
Device Pixel Ratio: 2
Test Case: [✓] Larger screen
```
**What to test:**
- Video scales properly on large screen
- Play button not oversized
- Skip button positioned correctly
- Landscape orientation works

---

### Tier 3: NICE TO TEST (Bonus)

#### Ultra-wide Display - 1024px+ width
```
Screen: Desktop/laptop monitor
Resolution: 1920x1080 or larger
Test Case: [✓] Desktop browser
```
**What to test:**
- Video doesn't become tiny
- Max-width constraint works
- Centered properly
- Performance is good

---

## 🔄 Orientation Testing

### Portrait Mode (Primary)
```
Width:  Variable (360-800px)
Height: Variable (600-1000px)
Ratio:  9:16 (tall)

✓ Video should:
  - Fill screen width with padding
  - Respect max-h-[75vh]
  - Center perfectly
  - Play buttons visible
```

### Landscape Mode (Secondary)
```
Width:  Variable (600-1200px)
Height: Variable (300-600px)
Ratio:  16:9 (wide)

✓ Video should:
  - Constrain to max-h-[70vh]
  - Leave room for status bar
  - Play button stay centered
  - No UI cutoff
```

### Rotation Handling
```
Portrait → Landscape:
  ✓ Video resizes smoothly
  ✓ No layout breaking
  ✓ Playback continues
  ✓ Touch controls reposition

Landscape → Portrait:
  ✓ Video scales back up
  ✓ Video doesn't restart
  ✓ Audio continues uninterrupted
  ✓ No visual glitches
```

---

## 📡 Connection Testing

### Test Setup in Chrome DevTools

#### Slow 2G (Skip Splash)
```
DevTools → Network Tab → Throttling
Set: Slow 2G
Expected: Splash skipped, main content shows immediately
```

#### 3G (Low Quality Video)
```
DevTools → Network Tab → Throttling
Set: Fast 3G
Expected: Lower quality 360p video loads, plays smoothly
```

#### 4G (High Quality)
```
DevTools → Network Tab → Throttling
Set: 4G
Expected: High quality 720p video loads, plays smoothly
```

#### Data Saver Mode
```
Chrome DevTools → Rendering → More Settings
Enable: "Emulate CSS media feature prefers-reduced-data"
Expected: Splash skipped entirely
```

---

## 🎬 Playback Scenarios

### Scenario 1: Fast Network, Fast Phone
```
Device:     iPhone 12
Connection: 4G (25 Mbps)
Expected:
  ✓ Video loads in < 2 seconds
  ✓ No buffering
  ✓ Smooth 60fps playback
  ✓ Immediate play when clicked
```

### Scenario 2: Slow Network, Old Phone
```
Device:     iPhone 6
Connection: 3G (5 Mbps)
Expected:
  ✓ Video loads in 3-5 seconds
  ✓ Buffering indicator shows
  ✓ Smooth playback after buffer
  ✓ No stuttering
```

### Scenario 3: Very Slow Network, Budget Phone
```
Device:     Galaxy A12
Connection: 2G (0.5 Mbps)
Expected:
  ✓ Splash skipped entirely
  ✓ Main content loads immediately
  ✓ No attempt to load video
```

### Scenario 4: Offline Then Online
```
Device:     iPhone 12
Connection: Offline → 4G
Expected:
  ✓ Page loads without video
  ✓ Reload page → video plays
  ✓ No persistent errors
```

---

## 🧪 Touch & Interaction Testing

### Test Case 1: Single Tap to Play
```
Action:     Tap video once
Expected:   
  ✓ Play button disappears
  ✓ Video starts playing
  ✓ Overlay fades out
  ✓ No audio delay
```

### Test Case 2: Double Tap While Buffering
```
Action:     Tap video twice quickly (< 300ms)
Expected:   
  ✓ Only one play attempt
  ✓ No double audio
  ✓ Video plays normally
  ✓ No errors in console
```

### Test Case 3: Tap Skip Button
```
Action:     Tap "Skip" button
Expected:   
  ✓ Splash closes immediately
  ✓ Main content shows
  ✓ Video stops/unloads
  ✓ No console errors
```

### Test Case 4: Tap While Playing
```
Action:     Tap video while it's playing
Expected:   
  ✓ Nothing happens (no restart)
  ✓ Video continues playing
  ✓ No errors
```

### Test Case 5: Touch Target Size
```
Action:     Try to tap play button on small phone
Expected:   
  ✓ Button min 44px height
  ✓ Button min 44px width
  ✓ Easy to tap accurately
  ✓ No accidental misses
```

---

## 🎨 Visual Verification Checklist

### Size & Layout
- [ ] Video fills screen width appropriately
- [ ] Video height doesn't exceed viewport
- [ ] No black bars on sides (unless design intent)
- [ ] Padding looks balanced
- [ ] Video doesn't crop/distort
- [ ] Play button centered
- [ ] Skip button positioned correctly
- [ ] No layout shift when rotating

### Appearance
- [ ] Video is sharp and clear
- [ ] Play button icon visible
- [ ] Skip button text readable
- [ ] Loading spinner animates smoothly
- [ ] Buffering indicator shows
- [ ] Overlay gradient looks correct
- [ ] Colors accurate

### Responsive
- [ ] 320px: Scaled down, still usable
- [ ] 360px: Normal size
- [ ] 480px: Good sizing
- [ ] 768px: Scaled appropriately
- [ ] 1024px+: Not oversized

---

## 📊 Performance Monitoring

### Network Performance
```
Metric Target:
  Video Load Time:  < 3 seconds (mobile 4G)
  Time to Playable: < 2 seconds
  Buffering Time:   < 1 second
  Total Video Size: < 2MB (720p)
```

### Device Performance
```
Metric Target:
  CPU Usage:      < 30% during play
  Memory Usage:   < 50MB
  Battery Impact: < 5% per minute
  Frame Rate:     60fps stable
```

### Touch Performance
```
Metric Target:
  Tap Response:   < 100ms
  Play Start:     < 200ms after tap
  Animation:      Smooth 60fps
```

---

## 🐛 Common Issues & How to Test

### Issue: Video Won't Play
**Test:**
1. Open Chrome DevTools → Console
2. Look for red error messages
3. Check Network tab → video file status
4. Try different browser
5. Try different device

### Issue: Video Crops/Distorts
**Test:**
1. Inspect video element (right-click → Inspect)
2. Check computed width/height
3. Rotate device and observe
4. Compare on different phones

### Issue: Play Button Not Responding
**Test:**
1. Check DevTools Console for errors
2. Verify readyToPlay is true (20% buffered)
3. Check if video preload="auto" working
4. Test slow throttle to see buffering

### Issue: Slow on Some Phones
**Test:**
1. Check Device Performance in DevTools
2. Profile with Performance tab
3. Test on actual slow device
4. Check if CPU throttling
5. Monitor battery impact

### Issue: Rotation Breaks Layout
**Test:**
1. Load page in portrait
2. Rotate to landscape
3. Video should resize (not restart)
4. Rotate back to portrait
5. Video should resize back
6. Try rapid rotation (5x quickly)

---

## ✅ Sign-Off Checklist

Before marking as "Complete":

### Devices Tested
- [ ] iPhone SE (375px)
- [ ] Samsung Galaxy A12 (360px)
- [ ] iPhone 6/7/8 (375px)
- [ ] At least one device < 320px
- [ ] iPad or tablet
- [ ] Desktop browser

### Connection Scenarios
- [ ] 4G (normal)
- [ ] 3G (lower quality)
- [ ] 2G (skip splash)
- [ ] Data Saver mode
- [ ] Slow throttle

### Orientations
- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Rotation transitions

### Interactions
- [ ] Single tap → play
- [ ] Double tap → single play only
- [ ] Skip button → closes
- [ ] Touch targets ≥ 44px

### Visuals
- [ ] No crop/distort
- [ ] Proper centering
- [ ] Responsive sizing
- [ ] Loading states work
- [ ] Smooth animations

### Performance
- [ ] No crashes
- [ ] No stuttering
- [ ] Memory reasonable
- [ ] Battery acceptable
- [ ] No console errors

---

## 🚀 Deployment Readiness

**Ready to deploy when:**
✅ All Tier 1 devices tested  
✅ All 3 connection scenarios pass  
✅ Rotation works smoothly  
✅ No crashes observed  
✅ Touch works on all devices  
✅ No console errors  
✅ Video quality acceptable  

**Yellow Flag If:**
⚠️ Crashes on any device  
⚠️ Stuttering during playback  
⚠️ Touch issues on specific phone  
⚠️ Aspect ratio distorts  

**Red Flag If:**
🚨 Works on desktop but not mobile  
🚨 High memory/battery usage  
🚨 Rotation breaks layout  
🚨 Touch events unreliable  

---

## 📞 Quick Support

If something breaks during testing:

1. **Check DevTools Console** - Most errors logged there
2. **Clear Cache** - Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. **Check Video File** - Ensure MP4 exists and loads
4. **Try Different Phone** - Verify issue is device-specific
5. **Revert Changes** - If recent code change caused issue
6. **Check Network** - Ensure internet connection stable

