import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
      // Track video completion
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_complete', 'Logo Reveal Video');
      }
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
      // Track video start
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_start', 'Logo Reveal Video');
      }
      
      // Sync sound effect with video
      const audio = audioRef.current;
      if (audio) {
        setTimeout(() => {
          if (!video.paused) {
            // Sync audio to video timeline
            audio.currentTime = video.currentTime;
            audio.volume = 0.8; // Sound effect volume for impact
            audio.play().then(() => {
              setAudioEnabled(true);
              console.log("Sound effect synced and playing");
            }).catch(err => {
              console.warn("Audio play failed:", err);
            });
          }
        }, 100);
      }
    };

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded, duration:", video.duration);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      // Try to auto-play video (audio will sync on 'playing' event)
      if (video.paused) {
        video.play().catch(err => {
          console.warn("Autoplay failed (user interaction needed):", err);
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
    const audio = audioRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        // Sync sound effect with video
        if (audio) {
          audio.currentTime = video.currentTime;
          audio.volume = 0.8; // Sound effect volume
          audio.play().then(() => {
            setAudioEnabled(true);
            console.log("Manual play with synced sound effect");
          }).catch(err => {
            console.warn("Audio play failed:", err);
          });
        }
      }).catch(err => {
        console.error("Manual play failed:", err);
      });
    }
  };

  const handleSkip = () => {
    // Track skip action
    if (window.trackVideoEvent) {
      window.trackVideoEvent('video_skip', 'Logo Reveal Video');
    }
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      video.pause();
    }
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
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
          onClick={handleVideoClick}
          aria-label="SGC TECH AI Logo Reveal"
        >
          {/* WebM with alpha channel for transparent background */}
          <source src="/videos/logo-reveal-transparent.webm" type="video/webm" />
          {/* Fallback to MP4 for browsers that don't support WebM */}
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

        {/* Mobile-First Play Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 to-black/90 cursor-pointer touch-manipulation"
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

      {/* Hidden Audio Element - Sound Effect Synced with Video */}
      <audio
        ref={audioRef}
        preload="auto"
        loop={false}
      >
        <source src="/audio/logo-sound-effect.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Indicator - Compact on Mobile */}
      {audioEnabled && (
        <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[10001] bg-blue-500/20 border border-blue-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs text-blue-300 animate-fade-in backdrop-blur-sm">
          🎵 Audio
        </div>
      )}

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
