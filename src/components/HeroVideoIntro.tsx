import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const INTRO_VIDEO_SOURCES = [
  "/videos/logo-intro-2025-720p.mp4",
  "/videos/logo-intro-2025.mp4",
];

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);

  useEffect(() => {
    // Skip the intro on data-saver or very slow connections
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })?.connection;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    if (connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
      setIsVisible(false);
      onComplete();
    }
  }, [onComplete]);

  const handleVideoClick = () => {
    // Start playing the video (audio will sync via onTimeUpdate)
    const video = videoRef.current;
    if (!video) {
      console.error("❌ Video ref not found");
      return;
    }

    if (!isPlaying) {
      console.log("📍 User clicked - starting video playback");
      setIsPlaying(true);
      
      // Set src if not already set
      if (!video.src) {
        video.src = INTRO_VIDEO_SOURCES[videoSourceIndex];
      }

      video.play().then(() => {
        console.log("✅ Video started. Duration:", video.duration, "seconds");
        if (window.trackVideoEvent) {
          window.trackVideoEvent('video_start', 'Logo Reveal Video');
        }
      }).catch((error) => {
        console.error("❌ Video play failed:", error);
      });
    }
  };

  const handleSkip = () => {
    // Track skip action
    if (window.trackVideoEvent) {
      window.trackVideoEvent('video_skip', 'Logo Reveal Video');
    }
    
    // Stop video
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] transition-opacity duration-1000",
        "bg-black",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Mobile-First Video Container - Responsive to all screens */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <video
          ref={videoRef}
          className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[800px] h-auto max-h-[70vh] object-contain cursor-pointer"
          playsInline
          preload="auto"
          poster="/images/hero/sgc-tech-ai-logo.png"
          onClick={handleVideoClick}
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video) {
              console.log("✅ Logo video loaded. Duration:", video.duration, "seconds");
            }
          }}
          onError={() => {
            const nextIndex = videoSourceIndex + 1;
            if (nextIndex < INTRO_VIDEO_SOURCES.length) {
              setVideoSourceIndex(nextIndex);
              const video = videoRef.current;
              if (video) {
                video.src = INTRO_VIDEO_SOURCES[nextIndex];
              }
              setIsPlaying(false);
              return;
            }

            setHasError(true);
            setIsVisible(false);
            setTimeout(() => onComplete(), 500);
          }}
          onEnded={() => {
            console.log("✅ Video ended");
            if (window.trackVideoEvent) {
              window.trackVideoEvent('video_complete', 'Logo Reveal Video');
            }
            setIsVisible(false);
            setTimeout(() => {
              onComplete();
            }, 1000);
          }}
          aria-label="SGC TECH AI Logo Reveal"
          src={videoSrc ?? undefined}
        />

        {/* Mobile-First Play Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 to-black/90 cursor-pointer touch-manipulation z-10"
            onClick={handleVideoClick}
          >
            {/* Play Button - Optimized for Mobile Touch */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-2 sm:mb-3 active:scale-95 transition-transform shadow-xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {/* CTA Text - Concise for Mobile */}
            <p className="text-white text-sm sm:text-base md:text-lg font-semibold">Tap to Begin</p>
            <p className="text-white/60 text-xs sm:text-sm mt-1 px-4 text-center">Watch the transformation</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white max-w-xs sm:max-w-sm">
            <p className="text-base sm:text-lg md:text-xl mb-2">Unable to load video</p>
            <p className="text-xs sm:text-sm text-gray-400">Redirecting to main content...</p>
          </div>
        </div>
      )}

      {/* Video has built-in audio - no separate audio elements needed */}

      {/* Skip Button - Mobile-First Simple */}
      <button
        onClick={handleSkip}
        className={cn(
          "fixed bottom-4 right-4 z-[10000]",
          "min-w-[70px] min-h-[44px] px-4 py-2.5",
          "bg-white/10 backdrop-blur-sm border border-white/20",
          "text-white text-sm font-medium",
          "rounded-full",
          "active:scale-95 transition-transform touch-manipulation",
          "shadow-lg"
        )}
        aria-label="Skip introduction"
      >
        Skip
      </button>
    </div>
  );
};

export default HeroVideoIntro;
