/**
 * Premium Gold Icon Mapping System
 * Strategic deployment of icons across all pages with best relational matches
 */

export interface IconConfig {
  url: string;
  name: string;
  bestFor: string[];
  alt: string;
}

export const PREMIUM_ICONS: Record<string, IconConfig> = {
  // AI & Intelligence
  aiNeuralNetwork: {
    url: "/icons/industry/01-ai-neural-network.png",
    name: "AI Neural Network",
    bestFor: ["ai-features", "machine-learning", "intelligent-systems"],
    alt: "AI Neural Network - Advanced Intelligence"
  },
  aiBrain: {
    url: "/icons/industry/21-ai-brain.png",
    name: "AI Brain",
    bestFor: ["innovation", "ai-solutions", "smart-features"],
    alt: "AI Brain - Intelligent Solutions"
  },
  
  // Cloud & Infrastructure
  cloudIntegration: {
    url: "/icons/industry/02-cloud-integration.png",
    name: "Cloud Integration",
    bestFor: ["cloud-services", "integration", "connectivity"],
    alt: "Cloud Integration - Seamless Connectivity"
  },
  cloudStorage: {
    url: "/icons/industry/03-cloud-storage.png",
    name: "Cloud Storage",
    bestFor: ["data-storage", "cloud-infrastructure", "scalability"],
    alt: "Cloud Storage - Scalable Infrastructure"
  },
  
  // Performance & Speed
  lightningSpeed: {
    url: "/icons/industry/04-lightning-speed.png",
    name: "Lightning Speed",
    bestFor: ["performance", "fast-deployment", "speed"],
    alt: "Lightning Speed - Rapid Deployment"
  },
  rocketLaunch: {
    url: "/icons/industry/10-rocket-launch.png",
    name: "Rocket Launch",
    bestFor: ["transformation", "launch", "growth"],
    alt: "Rocket Launch - Rapid Growth"
  },
  
  // Security
  securityShieldLeft: {
    url: "/icons/industry/05-security-shield.png",
    name: "Security Shield",
    bestFor: ["security", "protection", "compliance"],
    alt: "Security Shield - Enterprise Protection"
  },
  securityShieldRight: {
    url: "/icons/industry/05-security-shield.png",
    name: "Security Shield Right",
    bestFor: ["data-security", "privacy", "safety"],
    alt: "Security Shield - Data Protection"
  },
  dataSecurity: {
    url: "/icons/industry/18-data-security.png",
    name: "Data Security",
    bestFor: ["data-protection", "encryption", "secure-systems"],
    alt: "Data Security - Protected Systems"
  },
  
  // Global & Network
  globalTransform: {
    url: "/icons/industry/07-global-transform.png",
    name: "Global Transform",
    bestFor: ["global-reach", "transformation", "worldwide"],
    alt: "Global Transform - Worldwide Solutions"
  },
  globalNetwork: {
    url: "/icons/industry/19-global-network.png",
    name: "Global Network",
    bestFor: ["connectivity", "network", "global-presence"],
    alt: "Global Network - Connected Enterprise"
  },
  innovationNetwork: {
    url: "/icons/industry/22-innovation-network.png",
    name: "Innovation Network",
    bestFor: ["innovation", "networking", "collaboration"],
    alt: "Innovation Network - Collaborative Innovation"
  },
  
  // Analytics & Data
  dataAnalytics: {
    url: "/icons/industry/08-data-analytics.png",
    name: "Data Analytics",
    bestFor: ["analytics", "insights", "data-driven"],
    alt: "Data Analytics - Actionable Insights"
  },
  growthChart: {
    url: "/icons/industry/12-growth-chart.png",
    name: "Growth Chart",
    bestFor: ["growth", "metrics", "performance"],
    alt: "Growth Chart - Measurable Results"
  },
  
  // Automation & Efficiency
  automationGears: {
    url: "/icons/industry/09-automation-gears.png",
    name: "Automation Gears",
    bestFor: ["automation", "efficiency", "processes"],
    alt: "Automation Gears - Streamlined Operations"
  },
  timeEfficiency: {
    url: "/icons/industry/16-time-efficiency.png",
    name: "Time Efficiency",
    bestFor: ["efficiency", "time-saving", "productivity"],
    alt: "Time Efficiency - Optimized Workflow"
  },
  smartSolutions: {
    url: "/icons/industry/23-smart-solutions.png",
    name: "Smart Solutions",
    bestFor: ["intelligent-solutions", "smart-systems", "optimization"],
    alt: "Smart Solutions - Intelligent Optimization"
  },
  
  // Achievement & ROI
  achievementTrophy: {
    url: "/icons/industry/11-achievement-trophy.png",
    name: "Achievement Trophy",
    bestFor: ["success", "achievement", "excellence"],
    alt: "Achievement Trophy - Proven Success"
  },
  financialROI: {
    url: "/icons/industry/17-financial-roi.png",
    name: "Financial ROI",
    bestFor: ["roi", "financial", "returns"],
    alt: "Financial ROI - Guaranteed Returns"
  },
  
  // Precision & Strategy
  mobileResponsive: {
    url: "/icons/industry/13-mobile-responsive.png",
    name: "Mobile Responsive",
    bestFor: ["mobile", "responsive", "accessibility"],
    alt: "Mobile Responsive - Accessible Anywhere"
  },
  targetPrecision: {
    url: "/icons/industry/14-target-precision.png",
    name: "Target Precision",
    bestFor: ["precision", "targeting", "accuracy"],
    alt: "Target Precision - Accurate Solutions"
  },
  visibilityScope: {
    url: "/icons/industry/24-visibility-scope.png",
    name: "Visibility Scope",
    bestFor: ["visibility", "strategy", "navigation"],
    alt: "Visibility Scope - Strategic Vision"
  },
  
  // Partnership & Support
  partnershipHandshake: {
    url: "/icons/industry/15-partnership-handshake.png",
    name: "Partnership Handshake",
    bestFor: ["partnership", "collaboration", "trust"],
    alt: "Partnership - Trusted Collaboration"
  },
  support247: {
    url: "/icons/industry/20-support-24-7.png",
    name: "24/7 Support",
    bestFor: ["support", "customer-service", "availability"],
    alt: "24/7 Support - Always Available"
  }
};

// Section-to-Icon Mapping Strategy
export const SECTION_ICON_MAP = {
  // Hero Section
  hero: {
    speedBadge: PREMIUM_ICONS.lightningSpeed,
    growthBadge: PREMIUM_ICONS.growthChart,
    roiBadge: PREMIUM_ICONS.financialROI,
  },
  
  // Value Proposition
  valueProposition: {
    navigate: PREMIUM_ICONS.visibilityScope,
    innovate: PREMIUM_ICONS.aiBrain,
    transform: PREMIUM_ICONS.rocketLaunch,
    speed: PREMIUM_ICONS.lightningSpeed,
    roi: PREMIUM_ICONS.financialROI,
    guarantee: PREMIUM_ICONS.securityShieldRight,
  },
  
  // Industries
  industries: {
    healthcare: PREMIUM_ICONS.dataSecurity,
    hospitality: PREMIUM_ICONS.smartSolutions,
    realEstate: PREMIUM_ICONS.globalTransform,
    construction: PREMIUM_ICONS.automationGears,
    manufacturing: PREMIUM_ICONS.innovationNetwork,
    retail: PREMIUM_ICONS.dataAnalytics,
  },
  
  // Services/Solutions
  services: {
    ai: PREMIUM_ICONS.aiNeuralNetwork,
    cloud: PREMIUM_ICONS.cloudIntegration,
    automation: PREMIUM_ICONS.automationGears,
    analytics: PREMIUM_ICONS.dataAnalytics,
    security: PREMIUM_ICONS.securityShieldLeft,
    integration: PREMIUM_ICONS.cloudStorage,
  },
  
  // Features/Benefits
  features: {
    speed: PREMIUM_ICONS.lightningSpeed,
    accuracy: PREMIUM_ICONS.targetPrecision,
    efficiency: PREMIUM_ICONS.timeEfficiency,
    growth: PREMIUM_ICONS.growthChart,
    mobile: PREMIUM_ICONS.mobileResponsive,
    support: PREMIUM_ICONS.support247,
  },
  
  // About/Trust
  about: {
    partnership: PREMIUM_ICONS.partnershipHandshake,
    achievement: PREMIUM_ICONS.achievementTrophy,
    global: PREMIUM_ICONS.globalNetwork,
    innovation: PREMIUM_ICONS.innovationNetwork,
  },
  
  // Pricing/ROI
  pricing: {
    roi: PREMIUM_ICONS.financialROI,
    speed: PREMIUM_ICONS.rocketLaunch,
    guarantee: PREMIUM_ICONS.achievementTrophy,
    support: PREMIUM_ICONS.support247,
  }
};

// Helper function to get icon for specific use case
export const getIconForContext = (context: string): IconConfig | undefined => {
  for (const icon of Object.values(PREMIUM_ICONS)) {
    if (icon.bestFor.includes(context)) {
      return icon;
    }
  }
  return undefined;
};
