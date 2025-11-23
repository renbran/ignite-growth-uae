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
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.error("Video element not found");
      onComplete();
      return;
    }

    console.log("Video element created, src:", video.src);

    const handleEnded = () => {
      console.log("Video ended");
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      console.error("Video error code:", video.error?.code);
      console.error("Video error message:", video.error?.message);
      setHasError(true);
      // Skip to next section on error
      setTimeout(() => {
        onComplete();
      }, 2000);
    };

    const handleLoadedData = () => {
      console.log("Video data loaded, duration:", video.duration);
      console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight);
      video.volume = 0.7;
      
      // Try to play
      video.play()
        .then(() => {
          console.log("Video playing successfully");
          setIsPlaying(true);
          setShowPlayButton(false);
          // Try to unmute after a short delay
          setTimeout(() => {
            video.muted = false;
            video.volume = 0.7;
            setAudioEnabled(true);
            console.log("Audio unmuted");
          }, 1000);
        })
        .catch((err) => {
          console.warn("Autoplay failed, showing play button:", err);
          setShowPlayButton(true);
          setAudioEnabled(false);
        });
    };

    const handlePlay = () => {
      console.log("Video play event");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Video pause event");
      setIsPlaying(false);
    };

    const handleCanPlayThrough = () => {
      console.log("Video can play through");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [onComplete]);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 0.7;
    video.play()
      .then(() => {
        console.log("Manual play successful");
        setShowPlayButton(false);
        setIsPlaying(true);
        setAudioEnabled(true);
      })
      .catch((err) => {
        console.error("Manual play failed:", err);
        // Try muted playback
        video.muted = true;
        video.play().catch(console.error);
      });
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
      {/* Video Container - Full screen with proper aspect ratio handling */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover md:object-contain"
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

        {/* Manual Play Button Overlay */}
        {showPlayButton && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={handleManualPlay}
              className={cn(
                "bg-[#4fc3f7] hover:bg-[#03a9f4]",
                "text-black px-8 py-4 rounded-full",
                "font-bold text-lg uppercase tracking-wider",
                "transition-all duration-300 transform hover:scale-110",
                "shadow-glow flex items-center gap-3"
              )}
              aria-label="Play video"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Video
            </button>
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
