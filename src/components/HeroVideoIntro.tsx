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

    // Try to unmute after video starts playing
    const attemptUnmute = () => {
      setTimeout(() => {
        if (video.paused) return; // Don't unmute if video isn't playing
        
        video.muted = false;
        video.volume = 0.7;
        setAudioEnabled(true);
        console.log("Audio enabled at 70% volume");
      }, 500);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      attemptUnmute();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [onComplete]);

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
      {/* Video Container - Full screen with proper aspect ratio handling */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          preload="auto"
          autoPlay
          muted
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

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className={cn(
          "fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[10000]",
          "bg-[rgba(79,195,247,0.2)] border-2 border-[#4fc3f7]",
          "text-[#4fc3f7] px-4 py-2 md:px-6 md:py-3",
          "font-mono text-xs md:text-sm uppercase tracking-wider",
          "transition-all duration-300",
          "hover:bg-[rgba(79,195,247,0.3)] hover:shadow-glow hover:-translate-y-0.5",
          "focus:outline-none focus:ring-2 focus:ring-[#4fc3f7] focus:ring-offset-2 focus:ring-offset-black"
        )}
        aria-label="Skip logo introduction"
      >
        Skip Intro →
      </button>
    </div>
  );
};

export default HeroVideoIntro;
