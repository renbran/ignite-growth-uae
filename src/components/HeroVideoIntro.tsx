import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: any = null;
    let checkInterval: NodeJS.Timeout;

    const initPlayer = () => {
      // Check if YouTube API is already loaded
      if ((window as any).YT && (window as any).YT.Player) {
        createPlayer();
      } else {
        // Load YouTube IFrame API if not already loaded
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        
        // Wait for API to load
        (window as any).onYouTubeIframeAPIReady = createPlayer;
      }
    };

    const createPlayer = () => {
      if (!containerRef.current) return;

      try {
        player = new (window as any).YT.Player('youtube-player', {
          videoId: 'ja5Gb_MrtvQ',
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            disablekb: 1,
            playsinline: 1,
            mute: 1, // Start muted for autoplay, will unmute after
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: handlePlayerReady,
            onStateChange: handleStateChange,
            onError: handleError,
          }
        });
        playerRef.current = player;
      } catch (error) {
        console.error('Error creating YouTube player:', error);
        handleError();
      }
    };

    const handlePlayerReady = (event: any) => {
      setPlayerReady(true);
      try {
        // Unmute and set volume after player is ready
        event.target.unMute();
        event.target.setVolume(70);
        event.target.playVideo();
      } catch (error) {
        console.warn('Could not unmute, playing muted:', error);
      }
    };

    const handleStateChange = (event: any) => {
      if (event.data === (window as any).YT?.PlayerState?.ENDED) {
        handleVideoEnd();
      }
    };

    const handleError = () => {
      console.error("YouTube video failed to load - skipping to next stage");
      handleVideoEnd();
    };

    const handleVideoEnd = () => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    // Start initialization
    initPlayer();

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying player:', e);
        }
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (playerRef.current && playerRef.current.stopVideo) {
      try {
        playerRef.current.stopVideo();
      } catch (e) {
        console.warn('Error stopping video:', e);
      }
    }
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* YouTube Player Container - Fullscreen without branding */}
      <div className="relative w-full h-full overflow-hidden">
        <div 
          id="youtube-player"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {/* Overlay to prevent clicks on video */}
        <div className="absolute inset-0 pointer-events-none z-10" />
      </div>

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
        aria-label="Skip introduction"
      >
        Skip Intro →
      </button>
    </div>
  );
};

export default HeroVideoIntro;
