import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-slate-950">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gradient">
            See Our Solutions in Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Watch how we transform businesses with cutting-edge AI technology
          </p>
        </div>

        {/* Video Container - Mobile-First Responsive */}
        <div className="relative w-full max-w-5xl mx-auto animate-fade-in stagger-1">
          {/* Video Wrapper with aspect ratio */}
          <div className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/20">
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain bg-black cursor-pointer"
                playsInline
                preload="metadata"
                onClick={handleVideoClick}
                onEnded={handleVideoEnd}
                aria-label="SGC TECH AI Showcase Video"
              >
                <source src="/videos/showcase-video.mp4" type="video/mp4" />
                <p className="text-center text-white p-4 text-sm">
                  Your browser does not support the video tag.
                </p>
              </video>

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer transition-all hover:bg-black/50"
                  onClick={handlePlayPause}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center active:scale-95 transition-transform shadow-2xl">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Pause Overlay (shows when playing) */}
              {isPlaying && (
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handlePlayPause}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500/80 to-blue-700/80 flex items-center justify-center active:scale-95 transition-transform shadow-2xl">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl lg:rounded-2xl opacity-20 blur-2xl -z-10" />
        </div>

        {/* Call to Action Below Video */}
        <div className="mt-8 sm:mt-12 text-center animate-fade-in stagger-2">
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-4 sm:mb-6">
            Ready to transform your business?
          </p>
          <button className="inline-flex items-center justify-center min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all active:scale-95 shadow-lg shadow-blue-500/30 text-sm sm:text-base">
            Book Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
