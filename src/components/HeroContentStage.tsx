import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, DollarSign, Wrench, MapPin } from "lucide-react";

interface HeroContentStageProps {
  isActive: boolean;
  className?: string;
}

const HeroContentStage = ({ isActive, className }: HeroContentStageProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center px-5 py-20 transition-opacity duration-1500",
        "bg-gradient-to-br from-[#0c1e34] via-[#1e3a8a] to-[#0c1e34]",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Hexagonal grid background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(79, 195, 247, 0.03) 50px, rgba(79, 195, 247, 0.03) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(79, 195, 247, 0.03) 50px, rgba(79, 195, 247, 0.03) 51px)
          `,
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#4fc3f7] blur-[80px] opacity-20 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#00FFF0] blur-[80px] opacity-20 animate-pulse-glow-delayed pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-10 max-w-[1400px] w-full text-center space-y-10">
        {/* Logo (static version after animation) */}
        <div className="mx-auto max-w-[400px] mb-10 animate-fade-in-up stagger-1">
          <img
            src="/images/hero/sgc-tech-ai-logo.svg"
            alt="SGC TECH AI Logo"
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(79,195,247,0.5)]"
            onError={(e) => {
              // Fallback if SVG doesn't exist
              (e.target as HTMLImageElement).src = "/images/hero/sgc-tech-ai-logo.png";
            }}
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#4fc3f7] leading-tight mb-8 animate-fade-in-up stagger-2 tracking-wide">
          Intelligent Infrastructure.
          <br />
          Instant Impact.
        </h1>

        {/* Subheadline */}
        <p className="font-body text-lg md:text-xl lg:text-2xl text-[#e8f4fd] leading-relaxed max-w-[800px] mx-auto mb-10 opacity-95 animate-fade-in-up stagger-3">
          AI-Native Technology Deployed in 14 Days with Guaranteed ROI.
          <br />
          Stop waiting for transformation. Start building your future today.
        </p>

        {/* Tagline */}
        <div className="font-mono text-sm md:text-base lg:text-lg text-[#00FFF0] uppercase tracking-[3px] mb-12 animate-fade-in-up stagger-4">
          End the 3 AM Nightmare • Build Your Freedom
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 animate-fade-in-up stagger-5">
          <Button
            variant="hero"
            size="xl"
            className="group relative overflow-hidden min-w-[250px]"
            asChild
          >
            <a href="#contact">
              Book Free Consultation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="min-w-[250px] border-2 border-[#4fc3f7] text-[#4fc3f7] hover:bg-[rgba(79,195,247,0.1)]"
            asChild
          >
            <a href="#pricing">View Launch Partner Pricing</a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[900px] mx-auto animate-fade-in-up stagger-6">
          <div className="bg-[rgba(30,58,138,0.3)] border-2 border-[#4fc3f7] p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-[#00FFF0] group">
            <Zap size={40} className="text-[#4fc3f7] drop-shadow-[0_0_10px_rgba(79,195,247,0.6)] group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-[#e8f4fd] text-center leading-tight">
              14-Day Deployment
            </div>
          </div>

          <div className="bg-[rgba(30,58,138,0.3)] border-2 border-[#4fc3f7] p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-[#00FFF0] group">
            <DollarSign size={40} className="text-[#4fc3f7] drop-shadow-[0_0_10px_rgba(79,195,247,0.6)] group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-[#e8f4fd] text-center leading-tight">
              150-200% ROI Guaranteed
            </div>
          </div>

          <div className="bg-[rgba(30,58,138,0.3)] border-2 border-[#4fc3f7] p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-[#00FFF0] group">
            <Wrench size={40} className="text-[#4fc3f7] drop-shadow-[0_0_10px_rgba(79,195,247,0.6)] group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-[#e8f4fd] text-center leading-tight">
              Built by Engineers
            </div>
          </div>

          <div className="bg-[rgba(30,58,138,0.3)] border-2 border-[#4fc3f7] p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-[#00FFF0] group">
            <MapPin size={40} className="text-[#4fc3f7] drop-shadow-[0_0_10px_rgba(79,195,247,0.6)] group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-[#e8f4fd] text-center leading-tight">
              UAE-Focused Solutions
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-opacity duration-300",
          "animate-fade-in-up stagger-7 animate-bounce-slow",
          showScrollIndicator ? "opacity-70" : "opacity-0"
        )}
      >
        <div className="w-[30px] h-[50px] border-2 border-[#4fc3f7] rounded-[25px] relative shadow-[0_0_10px_rgba(79,195,247,0.3)]">
          <div className="absolute w-1.5 h-1.5 bg-[#4fc3f7] rounded-full top-2.5 left-1/2 -translate-x-1/2 animate-scroll-dot shadow-[0_0_5px_#4fc3f7]" />
        </div>
      </div>
    </div>
  );
};

export default HeroContentStage;
