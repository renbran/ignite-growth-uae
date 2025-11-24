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
      // Auto-close modal when video ends
      handleClose();
    };

    const handlePlaying = () => {
      setIsPlaying(true);
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
          "relative w-full",
          "max-w-[340px] sm:max-w-lg md:max-w-2xl lg:max-w-3xl",
          "max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh]",
          "bg-gradient-to-br from-[#0A1628] to-[#1e3a8a]",
          "rounded-xl sm:rounded-2xl",
          "shadow-2xl transition-all duration-500 transform",
          "border-2 border-[#4fc3f7] shadow-glow",
          "overflow-hidden flex flex-col",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Larger Touch Target */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center rounded-full bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] text-[#4fc3f7] active:scale-95 transition-transform touch-manipulation"
          aria-label="Close CEO message"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Content - Mobile First */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-5 md:p-6">
            {/* Header - Compact on Mobile */}
            <div className="text-center mb-3 sm:mb-4 md:mb-5">
              <h2 className="font-display text-sm sm:text-base md:text-lg lg:text-xl text-gradient mb-1.5 sm:mb-2 px-2 leading-tight">
                A Message from SGC TECH AI
              </h2>
              <div className="w-10 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-[#4fc3f7] to-[#39ff14] mx-auto"></div>
            </div>

            {/* Video Player - Mobile Optimized */}
            <div className="relative aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
              <video
                ref={videoRef}
                className="w-full h-full object-contain cursor-pointer touch-manipulation"
                playsInline
                preload="auto"
                autoPlay
                muted
                onClick={handleVideoClick}
                aria-label="CEO Message Video"
                controlsList="nodownload"
              >
                <source src="/videos/founder-3am-truth-speech.mp4" type="video/mp4" />
                <p className="text-center text-white p-3 text-xs sm:text-sm">
                  Your browser does not support the video tag.
                </p>
              </video>

              {/* Play Button Overlay - Mobile First */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer touch-manipulation"
                  onClick={handleVideoClick}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#4fc3f7] flex items-center justify-center active:scale-95 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Skip Button - Mobile First with Better Touch Target */}
            <div className="text-center mt-1">
              <button
                onClick={handleClose}
                className={cn(
                  "min-w-[100px] min-h-[36px] sm:min-w-[120px] sm:min-h-[40px]",
                  "text-[#4fc3f7] px-5 py-2 sm:px-6 sm:py-2.5 rounded-full",
                  "font-mono text-xs sm:text-sm uppercase tracking-wide",
                  "border border-[#4fc3f7] bg-[rgba(79,195,247,0.1)]",
                  "transition-all duration-200",
                  "active:scale-95 touch-manipulation"
                )}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessageModal;
