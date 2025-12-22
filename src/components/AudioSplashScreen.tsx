import { useState } from "react";
import { Volume2, ArrowRight } from "lucide-react";

interface AudioSplashScreenProps {
  onEnter: () => void;
}

const AudioSplashScreen = ({ onEnter }: AudioSplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Futuristic Circuit Pattern Backdrop */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero/ultra-hexagon-circuit.png')",
            filter: 'brightness(0.4) contrast(1.4) saturate(1.1)'
          }}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90"></div>
      </div>
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-primary/10 to-transparent blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-glow">
              <Volume2 className="w-12 h-12 md:w-16 md:h-16 text-background" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in stagger-2">
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-gradient">
            Welcome to SGC TECH AI
          </h1>
          <p className="text-xl md:text-2xl text-foreground-muted font-body max-w-2xl mx-auto">
            Experience the future of enterprise transformation with sound
          </p>
        </div>

        {/* Enter Button */}
        <div className="animate-fade-in stagger-3 pt-4">
          <button
            onClick={handleEnter}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-primary text-background font-display font-bold text-lg rounded-full shadow-glow hover:shadow-glow-green transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span>Click to Enter with Audio</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Hint Text */}
        <p className="text-sm text-foreground-subtle animate-fade-in stagger-4">
          🔊 Best experienced with sound on
        </p>
      </div>

      {/* Bottom Pulse Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
      </div>
    </div>
  );
};

export default AudioSplashScreen;
