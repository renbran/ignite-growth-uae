import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CEOMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CEOMessageModal = ({ isOpen, onClose }: CEOMessageModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay for smooth entrance animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const handleEnded = () => {
      // Track video completion
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_complete', 'CEO Message Video');
      }
      // Auto-close modal when video ends
      handleClose();
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      // Track CEO video start
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_start', 'CEO Message Video');
      }
      // Try to enable audio
      setTimeout(() => {
        video.muted = false;
        video.volume = 0.8;
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    const video = videoRef.current;
    if (video && !video.ended && video.currentTime > 0) {
      // Track if user skipped before completion
      if (window.trackVideoEvent) {
        window.trackVideoEvent('video_skip', 'CEO Message Video');
      }
    }
    if (video) {
      video.pause();
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.muted = false;
      video.volume = 0.8;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-300",
        "px-4 py-6 sm:p-6 md:p-8",
        isVisible ? "bg-black/95 backdrop-blur-sm" : "bg-transparent pointer-events-none"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "relative w-full mx-3",
          "max-w-[calc(100vw-24px)] sm:max-w-md md:max-w-xl lg:max-w-2xl",
          "bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900",
          "rounded-xl sm:rounded-2xl",
          "shadow-2xl transition-all duration-300 transform",
          "border border-blue-500/30",
          "overflow-hidden",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Mobile Touch Optimized */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white active:scale-90 transition-transform touch-manipulation"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container - Mobile First */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Header - Compact for Mobile */}
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="font-sans text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 px-2">
              A Message from Our Founder
            </h2>
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Video Player - Mobile Portrait Optimized */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden mb-3">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                playsInline
                preload="auto"
                autoPlay
                muted
                onClick={handleVideoClick}
                aria-label="CEO Message"
                controlsList="nodownload"
              >
                <source src="/videos/founder-3am-truth-speech.mp4" type="video/mp4" />
              </video>

              {/* Play Button - Mobile Optimized */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/70 cursor-pointer touch-manipulation"
                  onClick={handleVideoClick}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center active:scale-90 transition-transform shadow-xl">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button - Mobile Simple */}
          <div className="text-center">
            <button
              onClick={handleClose}
              className={cn(
                "min-w-[100px] min-h-[44px] px-6 py-2.5",
                "text-white text-sm font-medium",
                "border border-white/20 bg-white/10",
                "rounded-full",
                "active:scale-95 transition-transform touch-manipulation"
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessageModal;
