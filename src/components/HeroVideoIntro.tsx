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
      {/* Video Container - Mobile optimized with proper scaling */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <video
          ref={videoRef}
          className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
          style={{
            maxWidth: '95vw',
            maxHeight: '95vh'
          }}
          playsInline
          preload="auto"
          autoPlay
          muted
          onClick={handleVideoClick}
          aria-label="SGC TECH AI Logo Reveal and CEO Message"
        >
          <source src="/videos/logo-reveal.mp4" type="video/mp4" />
          <p className="text-center text-white p-8">
            Your browser does not support the video tag.
            <button
              onClick={handleSkip}
              className="block mt-4 mx-auto text-[#4fc3f7] underline"
            >
              Skip to content
            </button>
          </p>
        </video>

        {/* Click to play overlay when video is paused */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
            onClick={handleVideoClick}
          >
            <div className="text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4fc3f7] flex items-center justify-center mb-3 sm:mb-4 mx-auto hover:bg-[#03a9f4] transition-all transform hover:scale-110 active:scale-95">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white text-base sm:text-lg font-semibold">Tap to Play</p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-md">
            <p className="text-xl mb-4">Unable to load video</p>
            <p className="text-sm text-gray-400 mb-6">Redirecting to main content...</p>
          </div>
        </div>
      )}

      {/* Audio indicator (shows when audio is enabled) */}
      {audioEnabled && (
        <div className="fixed top-4 left-4 z-[10001] bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] px-3 py-1 rounded text-xs text-[#4fc3f7] animate-fade-in">
          🔊 Audio On
        </div>
      )}

      {/* Skip button - Mobile optimized */}
      <button
        onClick={handleSkip}
        className={cn(
          "fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-10 md:right-10 z-[10000]",
          "bg-[rgba(79,195,247,0.2)] border-2 border-[#4fc3f7]",
          "text-[#4fc3f7] px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3",
          "font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider",
          "transition-all duration-300",
          "hover:bg-[rgba(79,195,247,0.3)] hover:shadow-glow hover:-translate-y-0.5",
          "active:scale-95 touch-manipulation",
          "focus:outline-none focus:ring-2 focus:ring-[#4fc3f7] focus:ring-offset-2 focus:ring-offset-black"
        )}
        aria-label="Skip logo introduction"
      >
        Skip →
      </button>
    </div>
  );
};

export default HeroVideoIntro;
