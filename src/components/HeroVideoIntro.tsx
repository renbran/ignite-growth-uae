import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoIntroProps {
  onComplete: () => void;
  className?: string;
}

const HeroVideoIntro = ({ onComplete, className }: HeroVideoIntroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      const ytPlayer = new (window as any).YT.Player(iframeRef.current, {
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
          mute: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(70); // Safe volume at 70%
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              handleEnded();
            }
          },
          onError: () => {
            console.error("YouTube video failed to load - skipping to next stage");
            handleEnded();
          }
        }
      });
      setPlayer(ytPlayer);
    };

    const handleEnded = () => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (player) {
      player.stopVideo();
    }
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* YouTube IFrame - Fullscreen without branding */}
      <div className="relative w-full h-full overflow-hidden">
        <iframe
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '100vw',
            height: '100vh',
            border: 'none',
            pointerEvents: 'none',
          }}
          title="SGC TECH AI Logo Reveal and CEO Message"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
