import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");

  useEffect(() => {
    const dismiss = () => {
      setPhase("fade");
      setTimeout(() => setPhase("gone"), 400);
    };

    // Dismiss when page is fully loaded, or after 700ms max
    if (document.readyState === "complete") {
      dismiss();
      return;
    }

    const onLoad = () => dismiss();
    const timer = setTimeout(dismiss, 700);
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <>
      <style>{`
        @keyframes sgc-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes sgc-dot-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1);   }
        }
        .sgc-loader-text {
          background: linear-gradient(
            90deg,
            #C9A84C 0%,
            #F5E6A3 40%,
            #C9A84C 55%,
            #B8942A 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sgc-shimmer 1.4s linear infinite;
        }
        .sgc-dot { animation: sgc-dot-pulse 1.2s ease-in-out infinite; }
        .sgc-dot:nth-child(2) { animation-delay: 0.2s; }
        .sgc-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
        style={{
          backgroundColor: "#0A1628",
          opacity: phase === "fade" ? 0 : 1,
          transition: "opacity 0.4s ease-out",
        }}
      >
        {/* Brand name with gold shimmer sweep */}
        <div className="flex flex-col items-center gap-6 select-none">
          <span
            className="sgc-loader-text text-4xl sm:text-5xl font-black tracking-widest"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            SGC TECH AI
          </span>

          {/* Tagline */}
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#C9A84C80", fontFamily: "Inter, sans-serif" }}
          >
            Machine Speed · Human Expertise
          </span>

          {/* Three gold pulsing dots */}
          <div className="flex items-center gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="sgc-dot block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#C9A84C" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
