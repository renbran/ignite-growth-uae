import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FounderVoiceoverProps {
  onComplete: () => void;
  className?: string;
}

const FounderVoiceover = ({ onComplete, className }: FounderVoiceoverProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Fade in the voiceover stage
    setTimeout(() => setIsVisible(true), 100);

    // Generate particle positions
    const particleData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(particleData);

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    const handleEnded = () => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1500);
    };

    const handleError = () => {
      console.error("Voiceover video failed to load - skipping to next stage");
      handleEnded();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Start playing the video
    video.play().catch((error) => {
      console.warn("Voiceover autoplay failed:", error);
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
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
        "fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-1500",
        "bg-gradient-to-b from-[#0A0A0A] via-[#0c1e34] to-[#1e3a8a]",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-[#4fc3f7] rounded-full animate-float-particle"
            style={{
              left: `${particle.left}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              boxShadow: "0 0 10px #4fc3f7",
            }}
          />
        ))}
      </div>

      {/* Video container - responsive with proper aspect ratio and fit to screen */}
      <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[1400px] px-2 sm:px-4 md:px-6 lg:px-8 z-10">
        <div className="relative w-full bg-black/30 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            controls
            playsInline
            preload="metadata"
            poster="/images/hero/founder-video-poster.jpg"
            aria-label="Founder's message about SGC TECH AI mission"
          >
          <source src="/videos/founder-3am-truth-speech.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/captions/founder-speech-en.vtt"
            srcLang="en"
            label="English"
            default
          />
          <p className="visually-hidden">
            Founder speaking about the challenges entrepreneurs face and how
            SGC TECH AI provides solutions with guaranteed results.
          </p>
          Your browser does not support the video tag.
        </video>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#00FFF0] z-[10000] transition-all duration-100"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px #4fc3f7",
        }}
      />

      {/* Skip button - responsive positioning */}
      <button
        onClick={handleSkip}
        className={cn(
          "fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[10001]",
          "bg-[rgba(79,195,247,0.2)] border-2 border-[#4fc3f7]",
          "text-[#4fc3f7] px-4 py-2 md:px-6 md:py-3",
          "font-mono text-xs md:text-sm uppercase tracking-wider",
          "transition-all duration-300",
          "hover:bg-[rgba(79,195,247,0.3)] hover:shadow-glow hover:-translate-y-0.5",
          "focus:outline-none focus:ring-2 focus:ring-[#4fc3f7] focus:ring-offset-2 focus:ring-offset-black"
        )}
        aria-label="Skip founder message"
      >
        Skip to Content →
      </button>
    </div>
  );
};

export default FounderVoiceover;
