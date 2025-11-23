import { useState } from "react";
import HeroVideoIntro from "./HeroVideoIntro";
import CEOMessageModal from "./CEOMessageModal";
import InteractiveEducation from "./InteractiveEducation";

type HeroStage = "intro" | "ceoMessage" | "education";

const HeroOrchestrator = () => {
  const [currentStage, setCurrentStage] = useState<HeroStage>("intro");
  const [showCEOModal, setShowCEOModal] = useState(false);

  const handleIntroComplete = () => {
    // Show CEO message modal after video ends
    setCurrentStage("ceoMessage");
    setShowCEOModal(true);
  };

  const handleCEOModalClose = () => {
    setShowCEOModal(false);
    // Move to education section
    setTimeout(() => {
      setCurrentStage("education");
    }, 300);
  };

  return (
    <div className="hero-orchestrator-wrapper">
      {/* Stage 1: Logo Reveal Video */}
      {currentStage === "intro" && (
        <HeroVideoIntro onComplete={handleIntroComplete} />
      )}

      {/* Stage 2: CEO Message Modal (appears after video) */}
      <CEOMessageModal 
        isOpen={showCEOModal} 
        onClose={handleCEOModalClose} 
      />

      {/* Stage 3: Interactive Education Section */}
      {currentStage === "education" && (
        <InteractiveEducation isActive={true} />
      )}
    </div>
  );
};

export default HeroOrchestrator;
