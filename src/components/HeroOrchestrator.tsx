import { useState, useEffect } from "react";
import HeroVideoIntro from "./HeroVideoIntro";
import FounderVoiceover from "./FounderVoiceover";
import InteractiveEducation from "./InteractiveEducation";

type HeroStage = "intro" | "education";

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
    setCurrentStage("education");
    // Mark as seen after first visit
    if (!hasSeenIntro) {
      localStorage.setItem("sgc_seen_intro", "true");
      setHasSeenIntro(true);
    }
  };

  // If return visitor, only show education stage
  if (hasSeenIntro && currentStage === "education") {
    return <InteractiveEducation isActive={true} />;
  }

  return (
    <div className="hero-orchestrator-wrapper">
      {/* Stage 1: Logo Reveal + CEO Message (Merged) */}
      {currentStage === "intro" && (
        <HeroVideoIntro onComplete={handleIntroComplete} />
      )}

      {/* Stage 2: Interactive Education Section */}
      {currentStage === "education" && (
        <InteractiveEducation isActive={true} />
      )}
    </div>
  );
};

export default HeroOrchestrator;
