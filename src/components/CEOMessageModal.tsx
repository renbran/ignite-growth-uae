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
        "p-3 sm:p-4 md:p-6",
        isVisible ? "bg-black bg-opacity-90 backdrop-blur-sm" : "bg-transparent pointer-events-none"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "relative w-full mx-auto",
          "max-w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl",
          "max-h-[85vh] sm:max-h-[90vh]",
          "bg-gradient-to-br from-[#0A1628] to-[#1e3a8a]",
          "rounded-lg sm:rounded-xl md:rounded-2xl",
          "shadow-2xl transition-all duration-500 transform",
          "border border-[#4fc3f7] sm:border-2 shadow-glow",
          "overflow-hidden",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] text-[#4fc3f7] hover:bg-[rgba(79,195,247,0.3)] active:scale-95 transition-all touch-manipulation"
          aria-label="Close CEO message"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Content Wrapper */}
        <div className="overflow-y-auto max-h-[85vh] sm:max-h-[90vh]">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Header */}
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
              <h2 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl text-gradient mb-2 px-2">
                A Message from SGC TECH AI
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#4fc3f7] to-[#39ff14] mx-auto"></div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-md sm:rounded-lg overflow-hidden mb-3 sm:mb-4">
            <video
              ref={videoRef}
              className="w-full h-full object-contain cursor-pointer touch-manipulation"
              playsInline
              preload="auto"
              autoPlay
              muted
              onClick={handleVideoClick}
              aria-label="CEO Founder Message Video"
              controlsList="nodownload"
            >
              <source src="/videos/founder-3am-truth-speech.mp4" type="video/mp4" />
              <p className="text-center text-white p-2 sm:p-4 text-xs sm:text-base">
                Your browser does not support the video tag.
              </p>
            </video>

            {/* Click to play overlay when video is paused */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer touch-manipulation"
                onClick={handleVideoClick}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#4fc3f7] flex items-center justify-center hover:bg-[#03a9f4] active:scale-95 transition-all transform hover:scale-110">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

            {/* Skip/Close Button */}
            <div className="text-center">
              <button
                onClick={handleClose}
                className={cn(
                  "text-[#4fc3f7] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full",
                  "font-mono text-xs sm:text-sm uppercase tracking-wider",
                  "border border-[#4fc3f7] bg-[rgba(79,195,247,0.1)]",
                  "transition-all duration-300 hover:bg-[rgba(79,195,247,0.2)]",
                  "active:scale-95 touch-manipulation"
                )}
              >
                Skip →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessageModal;
