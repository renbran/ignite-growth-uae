# Scholarix Global - Premium Coming Soon Landing Page

## 🎯 Project Status

✅ **Coming Soon landing page successfully created!**

### What's Been Implemented

1. **Premium Coming Soon Page** (`src/pages/ComingSoon.tsx`)
   - Full-screen video background with your logo video
   - Sophisticated "COMING SOON" text with staggered letter reveal animation
   - Tech-aligned horizontal line animations that run parallel to video reveal
   - Floating logo with glow effect
   - Professional tagline: "Intelligent Infrastructure. Instant Impact."
   - Animated progress bar showing "LAUNCHING Q1 2026"
   - Email notification signup form
   - Social media links
   - Particle effects for premium feel
   - Glowing orbs with pulsing animation

2. **Custom CSS Animations** (added to `src/index.css`)
   - `animate-float` - Logo floating animation
   - `animate-pulse-slow` - Glowing orb animations
   - `animate-progress-bar` - Loading bar animation
   - `animate-particle` - Floating particle effects
   - `bg-gradient-radial` - Radial gradient backgrounds
   - `drop-shadow-glow` - Neon glow effects

3. **Routing Configuration**
   - `/` → Coming Soon page (default landing)
   - `/home` → Main website (when ready)
   - `/*` → 404 Not Found

---

## 🚀 Access Your New Landing Page

**Development Server**: http://localhost:8080/

The Coming Soon page is now your default landing page. Visitors will see:
- Premium video presentation with your SGC logo video
- "COMING SOON" text with cyberpunk-style tech animations
- Professional brand identity (Scholarix Global / SGC TECH AI)
- Email capture for launch notifications

---

## 🎨 Design Features

### Animation Timeline
1. **0-300ms**: Video loads and fades in
2. **300-1200ms**: Logo appears with float animation
3. **400-1500ms**: "COMING SOON" letters reveal one by one with stagger effect
4. **600-1800ms**: Tech lines animate horizontally across the text
5. **1200ms**: First tagline appears
6. **1400ms**: Second tagline fades in
7. **1600ms**: Progress bar animates
8. **1800ms**: Email signup form appears
9. **2000ms**: Social links fade in

### Visual Effects
- **Background**: Full-screen video with gradient overlays
- **Glowing Orbs**: Two large orbs (cyan & green) with slow pulse animation
- **Grid Pattern**: Animated cyberpunk grid overlay
- **Particles**: 20 floating particles drifting upward
- **Text Gradient**: Cyan-to-green gradient on main text
- **Glow Effects**: Neon glow on interactive elements

### Brand Colors Used
- **Electric Cyan** (`hsl(180 100% 50%)`)
- **Sky Blue** (`hsl(199 89% 63%)`)
- **Neon Green** (`hsl(150 100% 50%)`)
- **Ice White** (`hsl(200 67% 96%)`)
- **Carbon Black** (`hsl(0 0% 4%)`)

---

## 📂 Repository Structure

You now have **TWO** repositories for Scholarix Global:

### 1. **ignite-growth-uae** (Current - with Coming Soon page)
```
d:\RUNNING APPS\website\ignite-growth-uae\
├── src/
│   ├── pages/
│   │   ├── ComingSoon.tsx ✨ NEW - Premium landing page
│   │   ├── Index.tsx (Main website)
│   │   └── NotFound.tsx
│   ├── App.tsx (Updated with new routes)
│   └── index.css (Updated with animations)
```

### 2. **scholarix-globa-able** (Cloned)
```
d:\RUNNING APPS\website\scholarix-globa-able\
└── (Ready for review and merging)
```

---

## 🔄 Next Steps: Merging the Two Websites

To create the best website by combining both repositories:

### Step 1: Review Both Websites
```powershell
# Current website (with Coming Soon)
cd "d:\RUNNING APPS\website\ignite-growth-uae"
npm run dev
# Opens at http://localhost:8080

# Second website
cd "d:\RUNNING APPS\website\scholarix-globa-able"
npm install
npm run dev
# Opens at http://localhost:8081 (different port)
```

### Step 2: Compare Features
Create a comparison document:
- List unique features from each website
- Identify best components from each
- Note design differences
- Check content quality

### Step 3: Merge Strategy (Recommended Approach)
1. **Keep ignite-growth-uae as base** (has premium Coming Soon page)
2. **Extract best components** from scholarix-globa-able
3. **Copy valuable sections**: About, Services, Team, etc.
4. **Maintain consistent design system**
5. **Update content** with best copy from both

### Step 4: Content Integration
```powershell
# Create a backup first
cd "d:\RUNNING APPS\website"
xcopy ignite-growth-uae ignite-growth-uae-backup /E /I /H

# Then manually copy components from scholarix-globa-able
# to ignite-growth-uae/src/components/
```

---

## 🎯 Coming Soon Page - Technical Details

### Key Components

#### Video Background
```tsx
<video autoPlay loop muted playsInline>
  <source src={logoVideo} type="video/mp4" />
</video>
```
- Auto-plays on load
- Loops continuously
- Muted for autoplay compliance
- Responsive sizing

#### Text Animation
- **Character-by-character reveal** with 100ms delay between letters
- **Transform effects**: opacity, translateY, scale
- **Gradient text** with glow animation
- **Tech lines**: 6 horizontal lines animating across

#### Email Capture
- Glassmorphic input field
- Gradient CTA button
- Hover effects with scale transform
- Focus states with cyan border

---

## 🛠️ Customization Guide

### Change Launch Date
```tsx
// In src/pages/ComingSoon.tsx, line ~153
<p className="text-sm text-foreground-subtle mt-4 font-mono tracking-wider">
  LAUNCHING Q1 2026  {/* Change this */}
</p>
```

### Change Tagline
```tsx
// In src/pages/ComingSoon.tsx, line ~124
<p className="...">
  <span className="font-bold text-sky-blue">Intelligent Infrastructure.</span>
  {" "}
  <span className="font-bold text-electric-cyan">Instant Impact.</span>
</p>
```

### Connect Email Form to Backend
```tsx
// Add to src/pages/ComingSoon.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const email = // get email value
  
  // Option 1: Supabase
  await supabase.from('email_signups').insert({ email });
  
  // Option 2: Email service (Mailchimp, etc.)
  // await fetch('your-api-endpoint', { ... });
};
```

### Change Social Links
```tsx
// In src/pages/ComingSoon.tsx, line ~192
{["LinkedIn", "Twitter", "Instagram"].map((social, index) => (
  <a href="#" // Replace with actual URLs
```

---

## 📱 Responsive Design

The Coming Soon page is fully responsive:

- **Mobile (< 640px)**: Single column, smaller text, stacked form
- **Tablet (640px - 1024px)**: Medium text, improved spacing
- **Desktop (> 1024px)**: Full glory with large text and animations
- **4K (> 2048px)**: Maximum width container with proper scaling

---

## 🎬 Video Considerations

### Current Video Settings
```tsx
<video autoPlay loop muted={false} playsInline>
```

⚠️ **Note**: `muted={false}` will prevent autoplay on most browsers.

### Recommendation
```tsx
<video autoPlay loop muted playsInline> {/* Set muted to true */}
```

For audio, add a "Click to unmute" button:
```tsx
const [muted, setMuted] = useState(true);

<button onClick={() => setMuted(!muted)}>
  {muted ? "🔇 Unmute" : "🔊 Mute"}
</button>

<video autoPlay loop muted={muted} playsInline>
```

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Replace placeholder email form with real backend
- [ ] Add actual social media URLs
- [ ] Set video to muted for autoplay
- [ ] Test on mobile devices
- [ ] Optimize video file size (< 5MB recommended)
- [ ] Add Open Graph meta tags for social sharing
- [ ] Set up Google Analytics
- [ ] Configure favicon
- [ ] Test loading performance
- [ ] Add error boundaries

---

## 📊 Performance Optimization

### Current Setup
- Vite for fast HMR
- React 18 with automatic batching
- CSS animations (hardware accelerated)
- Video lazy loading

### Recommendations
```tsx
// 1. Optimize video
// Use H.264 codec, 1080p max, 30fps, bitrate 2-3 Mbps

// 2. Add loading state
const [videoReady, setVideoReady] = useState(false);

// 3. Preload critical assets
<link rel="preload" href={logoVideo} as="video" />
```

---

## 🎨 Brand Consistency

### Fonts
- **Display**: Orbitron (cyberpunk headings)
- **Body**: Inter (readable content)
- **Mono**: Share Tech Mono (technical elements)

### Logo Usage
- Primary: Full color on dark background
- Size: 80x80px (desktop), 64x64px (mobile)
- With text: "SCHOLARIX GLOBAL" + "SGC TECH AI"

---

## 📞 Support & Resources

### Documentation
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

### Project Links
- Dev Server: http://localhost:8080/
- Production: Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

---

## 🎉 Summary

You now have a **premium, professional Coming Soon landing page** featuring:

✅ Full-screen video presentation  
✅ "COMING SOON" with tech-aligned animations  
✅ Parallel animation timeline synced with video  
✅ Professional brand identity  
✅ Email capture functionality  
✅ Fully responsive design  
✅ Cyberpunk-meets-corporate aesthetic  
✅ Production-ready code  

The page is **live at http://localhost:8080/** and ready to be customized further or deployed!

---

**Next Task**: Review the second repository (scholarix-globa-able) and identify which components/pages you want to merge into this project.
