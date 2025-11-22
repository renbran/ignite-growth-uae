import { useState, useEffect } from "react";
import HeroVideoIntro from "./HeroVideoIntro";
import FounderVoiceover from "./FounderVoiceover";
import HeroContentStage from "./HeroContentStage";

type HeroStage = "intro" | "voiceover" | "content";

const HeroOrchestrator = () => {
  const [currentStage, setCurrentStage] = useState<HeroStage>("intro");
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before (return visitor detection)
    const seenIntro = localStorage.getItem("sgc_seen_intro");
    
    if (seenIntro === "true") {
      // Skip directly to hero content for return visitors
      setHasSeenIntro(true);
      setCurrentStage("content");
    }
  }, []);

  const handleIntroComplete = () => {
    setCurrentStage("voiceover");
    // Mark as seen after first visit
    if (!hasSeenIntro) {
      localStorage.setItem("sgc_seen_intro", "true");
      setHasSeenIntro(true);
    }
  };

  const handleVoiceoverComplete = () => {
    setCurrentStage("content");
  };

  // If return visitor, only show content stage
  if (hasSeenIntro && currentStage === "content") {
    return <HeroContentStage isActive={true} />;
  }

  return (
    <div className="hero-orchestrator-wrapper">
      {/* Stage 1: Logo Intro Animation */}
      {currentStage === "intro" && (
        <HeroVideoIntro onComplete={handleIntroComplete} />
      )}

      {/* Stage 2: Founder Voiceover */}
      {currentStage === "voiceover" && (
        <FounderVoiceover onComplete={handleVoiceoverComplete} />
      )}

      {/* Stage 3: Hero Content */}
      {currentStage === "content" && (
        <HeroContentStage isActive={true} />
      )}
    </div>
  );
};

export default HeroOrchestrator;
