import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.error("Video element not found");
      onComplete();
      return;
    }

    const handleEnded = () => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    const handleError = () => {
      console.error("Video failed to load - skipping to next stage");
      setHasError(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    };

    const handlePlaying = () => {
      console.log("Video is now playing");
      setIsPlaying(true);
      // Try to unmute after video starts playing
      setTimeout(() => {
        if (!video.paused) {
          video.muted = false;
          video.volume = 0.7;
          setAudioEnabled(true);
          console.log("Audio enabled at 70% volume");
        }
      }, 500);
    };

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded, duration:", video.duration);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      // Force play if not already playing
      if (video.paused) {
        video.play().catch(err => {
          console.warn("Autoplay failed:", err);
          setIsPlaying(false);
        });
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [onComplete]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.muted = false;
      video.volume = 0.7;
      video.play().then(() => {
        setIsPlaying(true);
        setAudioEnabled(true);
        console.log("Manual play with audio");
      }).catch(err => {
        console.error("Manual play failed:", err);
      });
    }
  };

  const handleSkip = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] bg-black transition-opacity duration-1000",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Mobile-First Video Container */}
      <div className="absolute inset-0 flex items-center justify-center px-3 py-6 sm:p-8 md:p-12">
        <video
          ref={videoRef}
          className="w-full max-w-[280px] h-auto sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl object-contain cursor-pointer"
          playsInline
          preload="auto"
          autoPlay
          muted
          onClick={handleVideoClick}
          aria-label="SGC TECH AI Logo Reveal"
        >
          <source src="/videos/logo-reveal.mp4" type="video/mp4" />
          <p className="text-center text-white p-4 text-sm">
            Your browser does not support the video tag.
            <button
              onClick={handleSkip}
              className="block mt-2 mx-auto text-[#4fc3f7] underline text-xs"
            >
              Skip to content
            </button>
          </p>
        </video>

        {/* Play Button Overlay - Mobile First */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 cursor-pointer touch-manipulation"
            onClick={handleVideoClick}
          >
            {/* Play Button */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#4fc3f7] flex items-center justify-center mb-2 sm:mb-3 active:scale-95 transition-transform">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {/* Text */}
            <p className="text-white text-sm sm:text-base md:text-lg font-medium">Tap to Play</p>
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

      {/* Audio Indicator - Compact on Mobile */}
      {audioEnabled && (
        <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[10001] bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs text-[#4fc3f7] animate-fade-in">
          🔊 Audio
        </div>
      )}

      {/* Skip Button - Mobile First with Larger Touch Target */}
      <button
        onClick={handleSkip}
        className={cn(
          "fixed bottom-4 right-4 z-[10000]",
          "min-w-[80px] min-h-[36px] sm:min-w-[100px] sm:min-h-[40px] md:min-w-[120px] md:min-h-[44px]",
          "bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] sm:border-2",
          "text-[#4fc3f7] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3",
          "rounded-md sm:rounded-lg",
          "font-mono text-xs sm:text-sm md:text-base uppercase tracking-wide",
          "transition-all duration-200",
          "active:scale-95 touch-manipulation",
          "focus:outline-none focus:ring-2 focus:ring-[#4fc3f7]"
        )}
        aria-label="Skip logo introduction"
      >
        Skip
      </button>
    </div>
  );
};

export default HeroVideoIntro;
