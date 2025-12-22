import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AudioSplashScreen from "./AudioSplashScreen";
import PremiumIcon from "./PremiumIcon";
import { SECTION_ICON_MAP } from "@/lib/iconMapping";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

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

  // Handle splash screen entry - enables audio
  const handleEnterSite = () => {
    setShowSplash(false);
    setAudioEnabled(true);
  };

  // Handle video autoplay with audio after user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !audioEnabled) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.muted = false; // Enable audio after user interaction
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
  }, [audioEnabled]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
      {/* Audio Splash Screen */}
      {showSplash && <AudioSplashScreen onEnter={handleEnterSite} />}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Futuristic Pattern Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero/futuristic-circuit-pattern.png')",
            filter: 'brightness(0.4) contrast(1.4) saturate(1.1)'
          }}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80"></div>
      </div>
      
      {/* Background Video Logo - Performance Optimized */}
      <div className="absolute inset-0 z-0">
        {/* Optimized glow backdrop */}
        <div className="absolute inset-0 flex items-center justify-center will-change-transform">
          <div className="w-full h-full bg-gradient-radial from-accent/15 via-primary/8 to-transparent opacity-60"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center hero-video-container">
          <video
            ref={videoRef}
            className={`w-full h-full object-contain transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-70" : "opacity-0"
            }`}
            style={{
              filter: 'drop-shadow(0 0 60px rgba(0, 255, 255, 0.5)) contrast(1.15) brightness(1.1)',
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero/sgc-tech-ai-logo.png"
          >
            <source src="/videos/logo-intro-2025.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Lighter Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/65 to-background"></div>
      </div>

      {/* Animated Grid Pattern Overlay - Reduced Opacity */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0"></div>

      {/* Mute/Unmute Button - Fixed Position */}
      <button
        onClick={toggleMute}
        className="fixed top-24 right-4 z-50 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-transform duration-200 border border-border/50 hover:border-accent/50 group hover:scale-105"
        aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        title={isMuted ? "Unmute background video" : "Mute background video"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-foreground-muted group-hover:text-accent transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-accent group-hover:text-accent-secondary transition-colors" />
        )}
      </button>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Main Headline with Typewriter Effect */}
          <div className="space-y-4 animate-fade-in stagger-3">
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight">
              <span className="typewriter-line text-gradient block" style={{ animationDelay: '0s' }}>
                UAE's Fastest ERP Implementation
              </span>
            </h1>
            <p className="typewriter-line text-xl md:text-2xl lg:text-3xl text-foreground-muted font-display" style={{ animationDelay: '1.5s' }}>
              Intelligent Infrastructure Deployed in 14 Days.
            </p>
            <p className="typewriter-line text-xl md:text-2xl lg:text-3xl font-display" style={{ animationDelay: '3s' }}>
              <span className="text-success font-bold">Guaranteed ROI in 6 Months.</span>
            </p>
          </div>

          {/* Value Props with Premium Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base animate-fade-in stagger-6">
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon 
                src={SECTION_ICON_MAP.hero.speedBadge.url}
                alt={SECTION_ICON_MAP.hero.speedBadge.alt}
                size="sm"
              />
              <span className="group-hover:text-gradient transition-all">14-Day Deployments</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon 
                src={SECTION_ICON_MAP.hero.growthBadge.url}
                alt={SECTION_ICON_MAP.hero.growthBadge.alt}
                size="sm"
              />
              <span className="group-hover:text-gradient transition-all">200% Faster Than Industry</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors group">
              <PremiumIcon 
                src={SECTION_ICON_MAP.hero.roiBadge.url}
                alt={SECTION_ICON_MAP.hero.roiBadge.alt}
                size="sm"
              />
              <span className="group-hover:text-gradient transition-all">Guaranteed ROI</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in stagger-7">
            <Button
              variant="hero"
              size="xl"
              className="group interactive-button"
              onClick={() => handleSectionNavigation("contact")}
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

          {/* Trust Indicators */}
          <div className="pt-8 animate-fade-in stagger-8">
            <p className="text-xs text-foreground-subtle mb-4 uppercase tracking-wider">
              Trusted by Enterprise Leaders in UAE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-foreground-subtle font-display font-bold text-lg">Healthcare</div>
              <div className="text-foreground-subtle font-display font-bold text-lg">Hospitality</div>
              <div className="text-foreground-subtle font-display font-bold text-lg">Real Estate</div>
              <div className="text-foreground-subtle font-display font-bold text-lg">Construction</div>
              <div className="text-foreground-subtle font-display font-bold text-lg">Manufacturing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
    </section>
    </>
  );
};

export default Hero;