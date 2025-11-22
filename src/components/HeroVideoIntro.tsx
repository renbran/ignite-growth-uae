import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

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
      console.error("Logo intro video failed to load - skipping to next stage");
      handleEnded();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Auto-play the video with sound
    video.muted = false;
    video.volume = 1.0;
    video.play().catch((error) => {
      console.warn("Autoplay with sound failed, trying muted:", error);
      // If autoplay with sound fails, try muted as fallback
      video.muted = true;
      video.play().catch((err) => {
        console.error("All autoplay attempts failed:", err);
      });
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
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
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        preload="auto"
        aria-label="SGC TECH AI logo animation"
      >
        <source src="/videos/sgc-tech-ai-logo-intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
