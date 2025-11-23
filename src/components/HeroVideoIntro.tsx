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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Fade out before transitioning
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    const handleError = () => {
      console.error("Logo reveal video failed to load - skipping to next stage");
      handleEnded();
    };

    const handleCanPlay = () => {
      // Try to play with sound first
      video.volume = 0.7; // Set to 70% volume
      video.muted = false;
      
      video.play().catch((error) => {
        console.warn("Autoplay with sound blocked, trying muted:", error);
        // If autoplay with sound fails, start muted and enable sound after
        video.muted = true;
        video.play().then(() => {
          // Unmute after a brief delay
          setTimeout(() => {
            video.muted = false;
            video.volume = 0.7;
            setAudioEnabled(true);
          }, 100);
        }).catch((err) => {
          console.error("All autoplay attempts failed:", err);
          // Last resort: show play button overlay
          handleEnded();
        });
      });
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
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
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Native HTML5 Video - Full Control with Audio */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
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
