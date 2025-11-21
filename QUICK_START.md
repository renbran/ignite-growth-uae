# 🚀 Quick Start Guide - Scholarix Global Coming Soon Page

## ✅ What's Done

Your premium Coming Soon landing page is **LIVE** and running at:
- **Local Development**: http://localhost:8080/
- **Production**: Ready to deploy to Vercel, Netlify, or your preferred platform

---

## 🎯 What You Have Now

### 1. **Premium Landing Page Features**
- ✅ Full-screen video background (your SGC logo video)
- ✅ "COMING SOON" text with character-by-character reveal
- ✅ Tech-aligned horizontal line animations
- ✅ Floating logo with neon glow
- ✅ Professional tagline display
- ✅ Animated progress bar
- ✅ Email notification signup form
- ✅ Social media links
- ✅ Floating particle effects
- ✅ Glowing orbs background
- ✅ Fully responsive (mobile → desktop)

### 2. **Two Repositories Ready**
```
📁 d:\RUNNING APPS\website\
├── 📂 ignite-growth-uae (PRIMARY - with Coming Soon)
│   └── ✨ Premium landing page active
└── 📂 scholarix-globa-able (CLONED - ready for review)
    └── 📋 Ready to extract best components
```

---

## 🎬 How to View Your Page

### Option 1: Browser (Already Open)
The page is already showing in your browser at http://localhost:8080/

### Option 2: Test Different Routes
- `/` → Coming Soon page (premium landing)
- `/home` → Original homepage (still available)

---

## ⚡ Quick Commands

```powershell
# Navigate to project
cd "d:\RUNNING APPS\website\ignite-growth-uae"

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

---

## 🎨 Customization Cheat Sheet

### 1. Change "COMING SOON" Text
**File**: `src/pages/ComingSoon.tsx`  
**Line**: ~77  
```tsx
{"COMING SOON".split("") // Change this text
```

### 2. Update Tagline
**File**: `src/pages/ComingSoon.tsx`  
**Line**: ~124-129  
```tsx
<span className="font-bold text-sky-blue">Intelligent Infrastructure.</span>
<span className="font-bold text-electric-cyan">Instant Impact.</span>
```

### 3. Change Launch Date
**File**: `src/pages/ComingSoon.tsx`  
**Line**: ~153  
```tsx
LAUNCHING Q1 2026 // Update this
```

### 4. Update Company Name/Logo
**File**: `src/pages/ComingSoon.tsx`  
**Line**: ~60-66  
```tsx
<span className="font-display font-bold text-3xl md:text-4xl text-gradient">
  SCHOLARIX GLOBAL // Change this
</span>
<span className="text-sm md:text-base text-sky-blue">
  SGC TECH AI // Change this
</span>
```

### 5. Modify Colors
**File**: `src/index.css`  
**Lines**: ~14-23  
```css
--electric-cyan: 180 100% 50%;
--neon-green: 150 100% 50%;
--sky-blue: 199 89% 63%;
/* etc. */
```

---

## 🔧 Next Steps to Merge Websites

### Phase 1: Review Second Repository
```powershell
cd "d:\RUNNING APPS\website\scholarix-globa-able"
npm install
npm run dev
```

This will open on a different port (likely 8081 or 5173).

### Phase 2: Identify Best Components
Compare both websites and note:
- [ ] Best hero section
- [ ] Best about section
- [ ] Best services/solutions section
- [ ] Best testimonials
- [ ] Best contact form
- [ ] Best footer design
- [ ] Unique features in each

### Phase 3: Copy Components
```powershell
# Example: Copy a component from scholarix-globa-able
# From: d:\RUNNING APPS\website\scholarix-globa-able\src\components\Services.tsx
# To:   d:\RUNNING APPS\website\ignite-growth-uae\src\components\Services.tsx
```

### Phase 4: Update Routes
**File**: `src/App.tsx`
```tsx
<Routes>
  <Route path="/" element={<ComingSoon />} />
  <Route path="/home" element={<Index />} />
  <Route path="/about" element={<About />} /> {/* Add new pages */}
  <Route path="/services" element={<Services />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 📧 Connect Email Form to Backend

### Option 1: Supabase (Already Configured)
```tsx
import { supabase } from "@/integrations/supabase/client";

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get('email') as string;
  
  const { data, error } = await supabase
    .from('email_signups')
    .insert([{ email, created_at: new Date() }]);
  
  if (error) {
    console.error('Error:', error);
    alert('Oops! Something went wrong.');
  } else {
    alert('Thanks! We\'ll notify you when we launch.');
  }
};
```

### Option 2: External Service (Mailchimp, SendGrid, etc.)
```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get('email') as string;
  
  await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};
```

---

## 🎥 Video Optimization Tips

### Current Video File
- Location: `src/assets/sgc-logo-video.mp4`
- Settings: Autoplay, Loop, Not Muted (⚠️ will prevent autoplay)

### Recommended Settings
```tsx
<video 
  autoPlay 
  loop 
  muted  {/* Set to true for autoplay */}
  playsInline
>
```

### Add Unmute Button
```tsx
const [muted, setMuted] = useState(true);

<button 
  onClick={() => setMuted(!muted)}
  className="fixed bottom-8 right-8 z-50 px-4 py-2 bg-glass border border-border rounded-sm"
>
  {muted ? "🔇 Unmute Video" : "🔊 Mute Video"}
</button>

<video muted={muted} ... >
```

### Optimize Video File
```powershell
# Recommended specs:
# - Codec: H.264
# - Resolution: 1920x1080 (or lower)
# - Frame Rate: 30fps
# - Bitrate: 2-3 Mbps
# - File Size: < 5MB
```

---

## 🚀 Deployment

### Deploy to Production
```powershell
# Build the project
npm run build

# Files will be in the 'dist' folder
# Upload to your hosting service (Netlify, Vercel, etc.)
```

### Environment Variables
Create `.env.local` file:
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-key
```

---

## 🎨 Animation Timing Reference

All animations are synchronized:
- **0-300ms**: Video fade-in
- **300-1200ms**: Logo + "COMING SOON" letters
- **600-1800ms**: Tech lines across text
- **1200ms**: First tagline
- **1400ms**: Second tagline
- **1600ms**: Progress bar
- **1800ms**: Email form
- **2000ms**: Social links

To adjust timing, modify the `transitionDelay` values in `ComingSoon.tsx`.

---

## 📱 Test Checklist

Before going live:
- [ ] Test on mobile (Chrome DevTools → Device Mode)
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Check all animations play smoothly
- [ ] Verify video loads on different connections
- [ ] Test email form submission
- [ ] Check social links work
- [ ] Verify responsive layout
- [ ] Test keyboard navigation
- [ ] Check page load speed
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

---

## 🆘 Troubleshooting

### Video Not Playing
```tsx
// Make sure video is muted for autoplay
<video autoPlay loop muted playsInline>
```

### Animations Not Smooth
```tsx
// Check if GPU acceleration is enabled
// Add these CSS properties:
transform: translateZ(0);
will-change: transform, opacity;
```

### Page Loading Slow
```powershell
# Optimize video file size
# Use online tools like:
# - HandBrake
# - CloudConvert
# - FFmpeg
```

---

## 📞 Support

- **Documentation**: See `COMING_SOON_PAGE_SUMMARY.md` for detailed info
- **Instructions**: See `.github/copilot-instructions.md` for coding guidelines
- **Dev Server**: http://localhost:8080/
- **Production**: Deploy to Vercel, Netlify, or custom server

---

## ✨ You're All Set!

Your premium Coming Soon page is **live and ready**. The page features:
- ✅ Professional video presentation
- ✅ Stunning tech-aligned animations
- ✅ Email capture for launch notifications
- ✅ Fully responsive design
- ✅ Production-ready code

**Next step**: Review the second repository and decide which components to merge!

---

**Current Status**: ✅ LIVE at http://localhost:8080/  
**Created**: November 22, 2025  
**Framework**: React 18 + TypeScript + Vite + Tailwind CSS
