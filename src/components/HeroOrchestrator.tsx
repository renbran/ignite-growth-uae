import { useState, useEffect } from "react";
import HeroVideoIntro from "./HeroVideoIntro";
import FounderVoiceover from "./FounderVoiceover";
import InteractiveEducation from "./InteractiveEducation";

type HeroStage = "intro" | "education";

const HeroOrchestrator = () => {
  const [currentStage, setCurrentStage] = useState<HeroStage>("intro");

  const handleIntroComplete = () => {
    setCurrentStage("education");
  };

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
