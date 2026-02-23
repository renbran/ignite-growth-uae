import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import PremiumIcon from "./PremiumIcon";
import { SECTION_ICON_MAP } from "@/lib/iconMapping";

const HERO_VIDEO_SOURCE = "/videos/logo-intro-2025-720p.mp4";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldUseVideo, setShouldUseVideo] = useState(true);

  // Handle navigation to section (works cross-page)
  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // Skip heavy video on data-saver or very slow connections
  useEffect(() => {
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })?.connection;


    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;    
    if (prefersReducedMotion || (connection && (connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g"))) {
      setShouldUseVideo(false);
    }
  }, []);

  // Handle video autoplay immediately - hero video is critical content, no lazy loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldUseVideo) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // Play video immediately with autoplay
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay error:", err);
        });
      }
    };

    if (video.readyState >= 2) {
      handleLoadedData();
    } else {
      video.addEventListener("loadeddata", handleLoadedData);
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [isMuted, shouldUseVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[max(4rem,var(--header-offset))] scroll-snap-align start" style={{ scrollSnapType: 'y mandatory', scrollSnapAlign: 'start', willChange: 'transform, opacity' }}>
      {/* Futuristic Pattern Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/55 to-background/65"></div>
      </div>
      {/* Static Logo Image */}
      <div className="absolute inset-0 flex items-center justify-center hero-video-container">
        <img
          src="/images/hero/sgc-tech-ai-logo.png"
          alt="SGC TECH AI logo"
          className="w-full h-full max-w-[95vw] max-h-[95vh] object-cover opacity-80 hero-video-filter translate-z-0 rounded-2xl"
          loading="eager"
          decoding="sync"
          style={{
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transition: 'opacity 0.7s cubic-bezier(0.4,0,0.6,1)',
          }}
        />
      </div>
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/55 to-background/65 animate-pulse-slow"></div>
      <div className="absolute inset-0 shadow-inner hero-shadow-overlay"></div>
      <div className="absolute inset-0 grid-pattern opacity-10 z-0"></div>
      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in stagger-3">
            <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] md:text-[clamp(3rem,8vw,6rem)] lg:text-[clamp(4rem,10vw,7rem)] leading-tight">
              <span className="typewriter-line text-gradient-logo block typewriter-delay-0">
                UAE's Fastest ERP Implementation
              </span>
            </h1>
            <p className="typewriter-line text-[clamp(1rem,3vw,2rem)] text-foreground-muted font-display typewriter-delay-1-5">
              Intelligent Infrastructure Deployed in 14 Days.
            </p>
            <p className="typewriter-line text-[clamp(1rem,3vw,2rem)] font-display typewriter-delay-3">
              <span className="text-success font-bold">Guaranteed ROI in 6 Months.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm md:text-base animate-fade-in stagger-6">
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon src={SECTION_ICON_MAP.hero.speedBadge.url} alt={SECTION_ICON_MAP.hero.speedBadge.alt} size="sm" />
              <span className="group-hover:text-gradient transition-all">14-Day Deployments</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon src={SECTION_ICON_MAP.hero.growthBadge.url} alt={SECTION_ICON_MAP.hero.growthBadge.alt} size="sm" />
              <span className="group-hover:text-gradient transition-all">200% Faster Than Industry</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon src={SECTION_ICON_MAP.hero.roiBadge.url} alt={SECTION_ICON_MAP.hero.roiBadge.alt} size="sm" />
              <span className="group-hover:text-gradient transition-all">Guaranteed ROI</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 animate-fade-in stagger-7">
            <Button
              variant="hero"
              size="xl"
              className="group interactive-button bg-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-navy))] shadow-glow hover:brightness-110 hover:shadow-glow rounded-sm"
            >
              Book Free Consultation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="interactive-button" asChild>
              <Link to="/resources">
                See How It Works
              </Link>
            </Button>
          </div>
          <div className="pt-8 animate-fade-in stagger-8">
            <p className="text-xs sm:text-sm text-foreground-subtle mb-4 uppercase tracking-wider">
              Trusted by Enterprise Leaders in UAE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60">
              <div className="text-foreground-subtle font-display font-bold text-[clamp(0.8rem,2vw,1.2rem)]">Healthcare</div>
              <div className="text-foreground-subtle font-display font-bold text-[clamp(0.8rem,2vw,1.2rem)]">Hospitality</div>
              <div className="text-foreground-subtle font-display font-bold text-[clamp(0.8rem,2vw,1.2rem)]">Real Estate</div>
              <div className="text-foreground-subtle font-display font-bold text-[clamp(0.8rem,2vw,1.2rem)]">Construction</div>
              <div className="text-foreground-subtle font-display font-bold text-[clamp(0.8rem,2vw,1.2rem)]">Manufacturing</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
    </section>
  );
};

export default Hero;