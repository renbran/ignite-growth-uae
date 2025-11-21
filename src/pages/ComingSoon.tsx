import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import logoVideo from "@/assets/sgc-logo-video.mp4";
import video2 from "@/assets/sgc-video-2.mp4";
import video3 from "@/assets/sgc-video-3.mp4";
import scholarixLogo from "@/assets/scholarix-logo.png";
import voiceoverAudio from "@/assets/ElevenLabs_2025-11-21T23_10_26_Kal Jones_pvc_sp100_s50_sb75_se0_b_m2.mp3";

const ComingSoon = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  const videos = [logoVideo, video2, video3];
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Trigger text animation shortly after component mounts
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 300);
    
    // Trigger typewriter after initial fade-in
    const typewriterTimer = setTimeout(() => {
      setShowTypewriter(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(typewriterTimer);
    };
  }, []);

  // Video carousel effect - switch videos every 10 seconds with crossfade and 1s gap
  useEffect(() => {
    const videoTransitionInterval = setInterval(() => {
      // Start fade out
      setFadeOut(true);
      
      // After fade out, wait 1 second gap, then switch video and fade in
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      }, 800); // 800ms fade out duration
      
      // Fade back in after 1 second gap
      setTimeout(() => {
        setFadeOut(false);
      }, 1800); // 800ms fade + 1000ms gap
    }, 11000); // Switch every 11 seconds (10s play + 1s gap)

    return () => clearInterval(videoTransitionInterval);
  }, [videos.length]);

  const handleVideoLoadedData = () => {
    setVideoLoaded(true);
    // Auto-start audio when video loads with volume
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay prevented:', err);
        // If autoplay is blocked, try again with user interaction
        document.addEventListener('click', () => {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Retry failed:', e));
          }
        }, { once: true });
      });
    }
  };

  const handleVideoPlay = () => {
    // Sync audio with video
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(err => console.log('Audio play prevented:', err));
    }
  };

  const handleVideoPause = () => {
    // Pause audio when video pauses
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setAudioMuted(!audioMuted);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-carbon-black">
      {/* Video Background - KEPT CLEAN AND UNOBSTRUCTED */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideoIndex}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoadedData}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]",
            videoLoaded && !fadeOut ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        
        {/* Voiceover Audio - Synced with Video - Auto-plays */}
        <audio
          ref={audioRef}
          autoPlay
          loop
          preload="auto"
          playsInline
          style={{ display: 'none' }}
        >
          <source src={voiceoverAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        
        {/* Gradient Overlays - Heavier on edges to frame video clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/80 via-transparent to-carbon-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-carbon-black/70 via-transparent to-carbon-black/70"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0"></div>

      {/* Mute/Unmute Toggle Button - Always visible */}
      <button
        onClick={handleToggleMute}
        className="fixed bottom-8 right-8 z-50 bg-electric-cyan/20 hover:bg-electric-cyan/30 backdrop-blur-md border border-electric-cyan/50 rounded-full p-4 transition-all duration-300 hover:scale-110 electric-pulse group"
        aria-label={audioMuted ? "Unmute sound" : "Mute sound"}
      >
        {audioMuted ? (
          // Muted icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-electric-cyan group-hover:text-neon-green transition-colors"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          // Unmuted icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-electric-cyan group-hover:text-neon-green transition-colors"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        )}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-carbon-black/90 text-electric-cyan text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {audioMuted ? "Click to unmute" : "Click to mute"}
        </span>
      </button>

      {/* Glowing Orbs for Premium Metallic Blue Feel */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'hsl(210 100% 55% / 0.25)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow-delayed" style={{ backgroundColor: 'hsl(195 100% 60% / 0.25)' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'hsl(205 100% 65% / 0.2)' }}></div>

      {/* Main Content - Positioned to avoid video center */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* TOP SECTION: Logo positioned at top - appears before/above video focal point */}
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-8 md:pt-12">
          <div 
            className={cn(
              "flex items-center justify-center gap-4 transition-all duration-1000 transform",
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            )}
          >
            <img 
              src={scholarixLogo} 
              alt="Scholarix Global Logo" 
              className="h-16 w-16 md:h-20 md:w-20 animate-float drop-shadow-glow" 
            />
            <div className="flex flex-col items-start">
              <span className="font-display font-bold text-2xl md:text-3xl text-gradient leading-none tracking-wide">
                SCHOLARIX GLOBAL
              </span>
              <span className="text-xs md:text-sm text-sky-blue font-body tracking-wider mt-1">
                SGC TECH AI
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: VIDEO AREA - COMPLETELY EMPTY, NO TEXT ELEMENTS */}
        <div className="flex-1 min-h-[40vh] md:min-h-[50vh]">
          {/* This space intentionally left empty to showcase video without obstruction */}
        </div>

        {/* BOTTOM SECTION: All text content positioned below video area */}
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-8 md:pb-12">
          <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">

        {/* COMING SOON - Main Text with Typewriter Animation */}
        <div className="relative">
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none mb-4">
            <span 
              className={cn(
                "text-gradient electric-pulse inline-block transition-all duration-500",
                showTypewriter ? "animate-fade-in" : "opacity-0"
              )}
            >
              COMING SOON
            </span>
          </h1>

          {/* Tech Lines Animation */}
          <div className="absolute -inset-4 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute h-px bg-gradient-to-r from-transparent via-electric-cyan to-transparent transition-all duration-1000",
                  textVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
                style={{
                  top: `${i * 20}%`,
                  left: 0,
                  right: 0,
                  transitionDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Tagline with Parallel Animation */}
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
          <div
            className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-ice-white leading-relaxed transition-all duration-1000 transform",
              showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "2800ms" }}
          >
            <span className="font-bold text-gradient metallic-shine">Intelligent Infrastructure.</span>
            {" "}
            <span className="font-bold text-gradient metallic-shine">Instant Impact.</span>
          </div>

          <p
            className={cn(
              "text-sm sm:text-base md:text-lg text-foreground-muted leading-relaxed transition-all duration-1000 transform px-4 max-w-3xl mx-auto",
              showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "3200ms" }}
          >
            We're crafting something extraordinary. AI-native enterprise transformation 
            that delivers results in days, not months.
          </p>

          {/* Animated Progress Bar */}
          <div
            className={cn(
              "w-full max-w-md mx-auto mt-12 md:mt-16 transition-all duration-1000",
              showTypewriter ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "3600ms" }}
          >
            <div className="relative h-2 bg-background-secondary rounded-full overflow-hidden border border-border electric-pulse">
              <div className="absolute inset-0 metallic-shine animate-progress-bar"></div>
            </div>
            <p className="text-xs sm:text-sm text-gradient mt-3 font-mono tracking-wider font-bold">
              LAUNCHING Q1 2026
            </p>
          </div>
        </div>

        {/* Notification Sign-up (Optional - for future) */}
        <div
          className={cn(
            "mt-16 md:mt-20 transition-all duration-1000 transform",
            showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "4000ms" }}
        >
          <p className="text-xs sm:text-sm text-foreground-muted mb-3">
            Get notified when we launch
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 bg-background-glass backdrop-blur-md border-2 border-border rounded-sm text-sm text-foreground placeholder-foreground-subtle focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/50 transition-all outline-none electric-pulse"
            />
            <button className="w-full sm:w-auto px-6 py-3 metallic-shine text-carbon-black font-display font-bold text-sm rounded-sm electric-pulse transform hover:scale-105 transition-all uppercase tracking-wide">
              Notify Me
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div
          className={cn(
            "flex items-center justify-center gap-6 mt-12 md:mt-16 transition-all duration-1000 transform",
            showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "4400ms" }}
        >
          {["LinkedIn", "Twitter", "Instagram"].map((social, index) => (
            <a
              key={social}
              href="#"
              className="text-foreground-subtle hover:text-electric-cyan transition-all text-xs sm:text-sm font-body tracking-wider hover:scale-110"
            >
              {social}
            </a>
          ))}
        </div>

        {/* Additional Features Section */}
        <div
          className={cn(
            "mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto transition-all duration-1000 transform",
            showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "4800ms" }}
        >
          {[
            { icon: "⚡", title: "14-Day Launch", desc: "Production-ready in 2 weeks" },
            { icon: "📈", title: "150-200% ROI", desc: "Guaranteed returns" },
            { icon: "🤖", title: "AI-Native", desc: "Built for the future" }
          ].map((feature, index) => (
            <div
              key={index}
              className="glass p-4 rounded-sm border border-border hover:border-electric-blue transition-all electric-pulse"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-gradient font-display font-bold text-sm sm:text-base mb-1">
                {feature.title}
              </h3>
              <p className="text-foreground-muted text-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={cn(
            "mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16 transition-all duration-1000 transform",
            showTypewriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "5200ms" }}
        >
          {[
            { value: "50", label: "Launch Partners", suffix: "" },
            { value: "8", label: "Spots Left", suffix: "" },
            { value: "24/7", label: "Support", suffix: "" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-gradient metallic-shine font-display font-black text-2xl sm:text-3xl">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-foreground-subtle text-xs mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={cn(
            "mt-12 md:mt-16 mb-8 transition-all duration-1000 transform",
            showTypewriter ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{ transitionDelay: "5600ms" }}
        >
          <p className="text-foreground-muted text-xs mb-3">
            Early access advantage for our launch partners
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="metallic-shine px-6 py-2 text-carbon-black font-display font-bold text-xs rounded-sm electric-pulse transform hover:scale-105 transition-all uppercase tracking-wide">
              Reserve Your Spot
            </button>
            <button className="glass px-6 py-2 text-foreground font-display font-semibold text-xs rounded-sm border border-border hover:border-electric-blue transform hover:scale-105 transition-all uppercase tracking-wide">
              Learn More
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Particle Effect (Optional) */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-cyan rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
