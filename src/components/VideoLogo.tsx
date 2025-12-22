import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VideoLogoProps {
  className?: string;
}

const VideoLogo = ({ className = "w-32 h-32" }: VideoLogoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Attempt autoplay
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className={`relative group ${className} flex items-center justify-center`}>
      {/* Video Container with Premium Glass Effect */}
      <div className="relative w-full h-full rounded-lg overflow-hidden border border-border/50 shadow-lg icon-wrapper-premium bg-background-secondary/40 backdrop-blur-md">
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/sgc-tech-ai-logo.png"
        >
          <source src="/videos/sgc-logo-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Glow Ring Animation */}
        <div className="absolute inset-2 border-2 border-accent/30 rounded-lg opacity-50 group-hover:opacity-70 transition-opacity pointer-events-none"></div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label={isMuted ? "Unmute" : "Mute"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-foreground-muted hover:text-accent transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-accent hover:text-accent-secondary transition-colors" />
        )}
      </button>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VideoLogo;
