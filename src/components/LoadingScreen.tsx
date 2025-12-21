import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after a longer delay to allow video to start loading
    // This ensures the video has time to begin loading before we show the page
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-100 transition-opacity duration-500 pointer-events-none loading-screen">
      {/* Logo container with animated glow and rotation */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer glow rings */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-400 animate-spin opacity-60" />
        <div className="absolute inset-0 rounded-full border border-transparent border-b-emerald-400 border-l-purple-400 animate-spin-reverse opacity-40" />

        {/* Logo with rotation */}
        <div className="relative w-24 h-24 animate-spin-slow">
          <img
            src="/sgc-tech-ai-logo-full-color.png"
            alt="Loading"
            className="w-full h-full object-contain drop-shadow-lg drop-shadow-cyan-500/50"
          />
        </div>

        {/* Center glow effect */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-xl opacity-60 animate-glow-pulse" />
      </div>

      {/* Loading text with animation */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <p className="text-cyan-400 text-lg font-semibold animate-pulse">
          Loading Experience...
        </p>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
