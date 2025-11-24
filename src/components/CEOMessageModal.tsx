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
          "relative w-full",
          "max-w-[92vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl",
          "max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh]",
          "bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900",
          "rounded-2xl sm:rounded-3xl",
          "shadow-2xl transition-all duration-500 transform",
          "border border-blue-500/30 shadow-blue-500/20",
          "overflow-hidden flex flex-col",
          "backdrop-blur-xl",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Modern Professional */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 active:scale-95 transition-all touch-manipulation shadow-lg"
          aria-label="Close message"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scrollable Content - Mobile First */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-5 md:p-6">
            {/* Header - Modern Professional */}
            <div className="text-center mb-4 sm:mb-5 md:mb-6">
              <h2 className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 px-3 leading-tight">
                A Message from Our Founder
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-white/70 text-xs sm:text-sm mt-2 px-4">Why we're here to transform your business</p>
            </div>

            {/* Video Player - Portrait & Landscape Optimized */}
            <div className="relative w-full bg-black rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4" style={{ aspectRatio: '16/9', maxHeight: '50vh' }}>
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

              {/* Play Button Overlay - Professional */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/70 to-black/50 cursor-pointer touch-manipulation backdrop-blur-sm"
                  onClick={handleVideoClick}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-blue-500/50 hover:shadow-blue-500/80">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button - Modern CTA */}
            <div className="text-center mt-2">
              <button
                onClick={handleClose}
                className={cn(
                  "min-w-[120px] min-h-[44px] sm:min-w-[140px] sm:min-h-[48px]",
                  "text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full",
                  "font-sans text-sm sm:text-base font-semibold",
                  "border border-white/30 bg-white/10 hover:bg-white/20",
                  "backdrop-blur-md",
                  "transition-all duration-300",
                  "active:scale-95 touch-manipulation",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessageModal;
