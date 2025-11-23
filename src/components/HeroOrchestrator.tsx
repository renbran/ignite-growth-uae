import { useState, useEffect } from "react";
import HeroVideoIntro from "./HeroVideoIntro";
import FounderVoiceover from "./FounderVoiceover";
import InteractiveEducation from "./InteractiveEducation";

type HeroStage = "intro" | "voiceover" | "education";

const HeroOrchestrator = () => {
  const [currentStage, setCurrentStage] = useState<HeroStage>("intro");
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before (return visitor detection)
    const seenIntro = localStorage.getItem("sgc_seen_intro");
    
    if (seenIntro === "true") {
      // Skip directly to education section for return visitors
      setHasSeenIntro(true);
      setCurrentStage("education");
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
    setCurrentStage("education");
  };

  // If return visitor, only show education stage
  if (hasSeenIntro && currentStage === "education") {
    return <InteractiveEducation isActive={true} />;
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

      {/* Stage 3: Interactive Education Section */}
      {currentStage === "education" && (
        <InteractiveEducation isActive={true} />
      )}
    </div>
  );
};

export default HeroOrchestrator;
