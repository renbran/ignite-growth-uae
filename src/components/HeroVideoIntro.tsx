import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audio1Ref = useRef<HTMLAudioElement>(null);
  const audio2Ref = useRef<HTMLAudioElement>(null);
  const audio3Ref = useRef<HTMLAudioElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // GIF-based logo animation - no video event listeners needed
    // Audio and animation handled in onLoad callback
  }, [onComplete]);

  const playAudioSequence = () => {
    const audio1 = audio1Ref.current;
    const audio2 = audio2Ref.current;
    const audio3 = audio3Ref.current;

    console.log("playAudioSequence called");
    console.log("Audio refs:", { audio1: !!audio1, audio2: !!audio2, audio3: !!audio3 });

    if (audio1 && audio2 && audio3) {
      // Set volume for all audio elements
      audio1.volume = 0.8;
      audio2.volume = 0.8;
      audio3.volume = 0.8;

      console.log("Playing audio sequence...");

      // Play first sound immediately
      audio1.play().then(() => {
        setAudioEnabled(true);
        console.log("✅ Sound effect 1 playing");
      }).catch(err => {
        console.error("❌ Audio 1 play failed:", err);
      });

      // Play second sound after 1.5 seconds
      setTimeout(() => {
        audio2.play().then(() => {
          console.log("✅ Sound effect 2 playing");
        }).catch(err => {
          console.error("❌ Audio 2 play failed:", err);
        });
      }, 1500);

      // Play third sound after 3 seconds
      setTimeout(() => {
        audio3.play().then(() => {
          console.log("✅ Sound effect 3 playing");
        }).catch(err => {
          console.error("❌ Audio 3 play failed:", err);
        });
      }, 3000);
    } else {
      console.error("❌ Audio elements not found!");
    }
  };

  const handleVideoClick = () => {
    // For GIF-based animation, play audio sequence on click
    if (!isPlaying) {
      console.log("User clicked - starting logo reveal with audio");
      setIsPlaying(true);
      playAudioSequence();
      
      // Track video start
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_start', 'Logo Reveal Animation');
      }
      
      // Auto-complete after GIF duration (5 seconds)
      setTimeout(() => {
        if (window.trackVideoEvent) {
          window.trackVideoEvent('video_complete', 'Logo Reveal Animation');
        }
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 5000);
    }
  };

  const handleSkip = () => {
    // Track skip action
    if (window.trackVideoEvent) {
      window.trackVideoEvent('video_skip', 'Logo Reveal Animation');
    }
    // Stop all audio
    [audio1Ref, audio2Ref, audio3Ref].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
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
      {/* Mobile-First Logo Container - Responsive to all screens */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <img
          ref={videoRef as any}
          src="/images/com--unscreen.gif"
          alt="SGC TECH AI Logo Reveal"
          className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[800px] h-auto max-h-[70vh] object-contain cursor-pointer"
          onClick={handleVideoClick}
          onLoad={() => {
            console.log("Logo GIF loaded and ready");
          }}
        />

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

      {/* Hidden Audio Elements - 3 Sound Effects Synced with Logo Animation */}
      <audio ref={audio1Ref} preload="auto" loop={false}>
        <source src="/audio/1-c6d18217.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={audio2Ref} preload="auto" loop={false}>
        <source src="/audio/2-c6d18217.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={audio3Ref} preload="auto" loop={false}>
        <source src="/audio/3-c6d18217.mp3" type="audio/mpeg" />
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
