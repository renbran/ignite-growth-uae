# Three-Stage Hero Section - Visual Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER LANDS ON SITE                          │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Has seen intro before? │
                    │  (localStorage check)   │
                    └──┬──────────────────┬───┘
                       │                  │
                   YES │                  │ NO
                       │                  │
         ┌─────────────▼──┐          ┌───▼────────────────────────────┐
         │  SKIP TO       │          │  STAGE 1: LOGO INTRO           │
         │  HERO CONTENT  │          │                                │
         │  (Stage 3)     │          │  ├─ 6-second logo animation    │
         └────────────────┘          │  ├─ Full-screen video          │
                                     │  ├─ No overlays                │
                                     │  ├─ Auto-play, muted           │
                                     │  └─ Skip button (bottom-right) │
                                     └───┬────────────────────────────┘
                                         │
                           ┌─────────────▼─────────────┐
                           │  User clicks Skip?        │
                           │  OR Video ends naturally? │
                           └─┬─────────────────────┬───┘
                             │                     │
              ┌──────────────┘                     └──────────────┐
              │                                                    │
    ┌─────────▼─────────────────────────────────────────────┐    │
    │  TRANSITION: 1-second fade                            │    │
    │  • Logo intro fades out                               │    │
    │  • Voiceover stage fades in                          │    │
    └─────────┬─────────────────────────────────────────────┘    │
              │                                                    │
              │                                                    │
    ┌─────────▼────────────────────────────────────────────┐    │
    │  STAGE 2: FOUNDER VOICEOVER                          │◄────┘
    │                                                       │
    │  ├─ 2.5-3 minute founder message                    │
    │  ├─ Particle background animation (50 particles)    │
    │  ├─ Video controls enabled                          │
    │  ├─ Progress bar at bottom                          │
    │  ├─ Captions/subtitles available                    │
    │  └─ Skip button (bottom-right)                      │
    └─────────┬────────────────────────────────────────────┘
              │
┌─────────────▼─────────────┐
│  User clicks Skip?        │
│  OR Video ends naturally? │
└─┬─────────────────────┬───┘
  │                     │
  └─────────┬───────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│  TRANSITION: 1.5-second fade                              │
│  • Voiceover stage fades out                             │
│  • Hero content fades in                                 │
└───────────┬───────────────────────────────────────────────┘
            │
            │
┌───────────▼──────────────────────────────────────────────┐
│  STAGE 3: HERO CONTENT                                   │
│                                                           │
│  ├─ Static logo (SVG)                                   │
│  ├─ Headline: "Intelligent Infrastructure..."          │
│  ├─ Subheadline                                         │
│  ├─ Tagline: "End the 3 AM Nightmare..."              │
│  ├─ CTA Buttons:                                        │
│  │   • "Book Free Consultation" (primary)              │
│  │   • "View Launch Partner Pricing" (secondary)       │
│  ├─ Trust Indicators (4 boxes):                         │
│  │   • 14-Day Deployment                               │
│  │   • 150-200% ROI Guaranteed                         │
│  │   • Built by Engineers                              │
│  │   • UAE-Focused Solutions                           │
│  ├─ Scroll indicator (bounces, fades on scroll)        │
│  ├─ Animated background (glow orbs, grid pattern)      │
│  └─ Staggered entrance animations                      │
└───────────┬──────────────────────────────────────────────┘
            │
            │
┌───────────▼──────────────────────────────────────────────┐
│  USER SCROLLS DOWN                                       │
│  • Scroll indicator fades out                           │
│  • Continues to Value Proposition section               │
└──────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
HeroOrchestrator (Master Controller)
├─ manages stage state: "intro" | "voiceover" | "content"
├─ handles localStorage for return visitors
├─ provides onComplete callbacks
│
├─ HeroVideoIntro (Stage 1)
│   ├─ <video> element with logo animation
│   ├─ Skip button with click handler
│   ├─ Auto-play on mount
│   ├─ Error handling
│   └─ Fade-out transition
│
├─ FounderVoiceover (Stage 2)
│   ├─ <video> element with founder speech
│   ├─ Particle background (50 animated divs)
│   ├─ Progress bar (updates via timeupdate event)
│   ├─ Video controls enabled
│   ├─ Skip button
│   ├─ Caption track (<track> element)
│   └─ Fade-in/out transitions
│
└─ HeroContentStage (Stage 3)
    ├─ Logo image (SVG with PNG fallback)
    ├─ Headline (Orbitron font, gradient text)
    ├─ Subheadline (Inter font)
    ├─ Tagline (Share Tech Mono, uppercase)
    ├─ CTA buttons (shadcn/ui Button components)
    ├─ Trust indicators grid (4 items, responsive)
    ├─ Scroll indicator (with bounce animation)
    ├─ Background effects:
    │   ├─ Hexagonal grid pattern
    │   ├─ Animated glow orbs (2)
    │   └─ Gradient background
    └─ Staggered entrance animations (0.3s delays)
```

---

## State Machine

```
┌──────────────────────────────────────────────────────────┐
│  HeroOrchestrator State                                  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  currentStage: "intro" | "voiceover" | "content"        │
│  hasSeenIntro: boolean                                   │
│                                                           │
│  Stored in localStorage:                                 │
│    sgc_seen_intro: "true" | null                        │
│                                                           │
│  State Transitions:                                      │
│    "intro" ──onComplete──> "voiceover"                  │
│    "voiceover" ──onComplete──> "content"                │
│                                                           │
│  Skip Actions:                                           │
│    Any stage ──onComplete()──> Next stage               │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## Animation Timeline

```
STAGE 1: Logo Intro (0-6 seconds)
├─ 0s:    Component mounts, video starts playing
├─ 0-6s:  Logo animation plays
├─ 3s:    Voiceover video starts preloading (lazy load)
├─ 6s:    Video ends OR user clicks Skip
├─ 6-7s:  Fade-out transition (opacity: 1 → 0)
└─ 7s:    Stage 2 begins

STAGE 2: Voiceover (7-187 seconds / ~3min)
├─ 7s:     Component mounts with opacity: 0
├─ 7.1s:   Fade-in begins (opacity: 0 → 1)
├─ 7.1s:   50 particles spawn with random positions/delays
├─ 7.1s:   Video starts playing
├─ 7-187s: Progress bar updates in real-time
├─ 187s:   Video ends OR user clicks Skip
├─ 187-188.5s: Fade-out transition
└─ 188.5s: Stage 3 begins

STAGE 3: Hero Content (188.5+ seconds)
├─ 188.5s:     Component mounts with opacity: 0
├─ 188.6s:     Fade-in begins
├─ 188.9s:     Logo animates in (stagger-1)
├─ 189.1s:     Headline animates in (stagger-2)
├─ 189.3s:     Subheadline animates in (stagger-3)
├─ 189.5s:     Tagline animates in (stagger-4)
├─ 189.7s:     CTA buttons animate in (stagger-5)
├─ 189.9s:     Trust indicators animate in (stagger-6)
├─ 190.1s:     Scroll indicator animates in (stagger-7)
├─ 192.6s:     Scroll indicator starts bouncing
└─ Persistent: Glow orbs pulsing (8s loop)
```

---

## File Dependencies

```
Index.tsx
└─ imports HeroOrchestrator.tsx
    ├─ imports HeroVideoIntro.tsx
    │   └─ requires /videos/sgc-tech-ai-logo-intro.mp4
    │
    ├─ imports FounderVoiceover.tsx
    │   ├─ requires /videos/founder-3am-truth-speech.mp4
    │   ├─ requires /images/hero/founder-video-poster.jpg
    │   └─ requires /captions/founder-speech-en.vtt
    │
    └─ imports HeroContentStage.tsx
        ├─ requires /images/hero/sgc-tech-ai-logo.svg
        └─ requires /images/hero/sgc-tech-ai-logo.png (fallback)
```

---

## Responsive Breakpoints

```
Mobile:     < 640px
  ├─ Skip buttons: smaller, repositioned
  ├─ Trust indicators: single column
  ├─ CTAs: full width
  ├─ Font sizes: reduced (clamp() function)
  └─ Particles: fewer (performance)

Tablet:     641px - 1024px
  ├─ Trust indicators: 2 columns
  ├─ CTAs: side-by-side
  └─ Font sizes: medium

Desktop:    > 1024px
  ├─ Trust indicators: 4 columns
  ├─ Full animations enabled
  └─ Maximum font sizes
```

---

## Performance Metrics

```
Target Metrics:
├─ First Contentful Paint (FCP):    < 1.5s
├─ Largest Contentful Paint (LCP):  < 2.5s (logo intro)
├─ Time to Interactive (TTI):       < 3.0s
├─ Cumulative Layout Shift (CLS):   < 0.1
└─ Total Blocking Time (TBT):       < 300ms

Video Optimization:
├─ Logo Intro:        < 5MB (1920x1080, H.264, CRF 23)
├─ Founder Speech:    < 50MB (1920x1080, H.264, CRF 23)
├─ Poster Image:      < 200KB (JPEG, optimized)
└─ Preload Strategy:  Metadata only, lazy load on intro end
```

---

This visual documentation should help you understand the complete flow and architecture of the three-stage hero section. All components are production-ready and waiting for your video assets!
