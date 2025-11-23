import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveEducationProps {
  isActive: boolean;
  className?: string;
}

const InteractiveEducation = ({ isActive, className }: InteractiveEducationProps) => {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen transition-opacity duration-1500",
        "bg-gradient-to-b from-[#0c1e34] via-[#1e3a8a] to-[#0c1e34]",
        "py-20 px-4 md:px-8 overflow-hidden",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Section Title */}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-center text-gradient mb-20 uppercase tracking-wider animate-title-glitch">
        How We Transform Your Business
      </h2>

      {/* Component 1: Timeline */}
      <TransformationTimeline />

      {/* Component 2: ROI Calculator */}
      <ROICalculator />

      {/* Component 3: Comparison Slider */}
      <ComparisonSlider />

      {/* Component 4: Stats Counter */}
      <StatsCounter />

      {/* Final CTA */}
      <FinalCTA />
    </section>
  );
};

// ==========================================
// COMPONENT 1: TRANSFORMATION TIMELINE
// ==========================================
const TransformationTimeline = () => {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setActiveItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      day: "Day 1-2",
      phase: "Discovery & Strategy",
      icon: "🎯",
      description: "Deep dive into your business operations, pain points, and goals. We map your current workflows and identify optimization opportunities.",
      deliverables: [
        "Complete business process audit",
        "Pain point identification",
        "Custom transformation roadmap",
        "Team alignment workshop",
      ],
    },
    {
      day: "Day 3-5",
      phase: "System Configuration",
      icon: "🔧",
      description: "AI-accelerated setup of your industry-specific ERP modules. Our pre-designed templates are customized to your exact needs.",
      deliverables: [
        "Core modules installation",
        "AI model training on your data",
        "Workflow automation setup",
        "Integration with existing tools",
      ],
    },
    {
      day: "Day 6-8",
      phase: "Data Migration & Testing",
      icon: "📊",
      description: "AI-powered data migration with automatic cleaning and validation. Comprehensive testing ensures everything works perfectly.",
      deliverables: [
        "Complete data migration",
        "AI-powered data cleaning",
        "System testing & validation",
        "Performance optimization",
      ],
    },
    {
      day: "Day 9-11",
      phase: "Team Training",
      icon: "👥",
      description: "Comprehensive training for your entire team. Our AI tutors provide personalized learning paths for each team member.",
      deliverables: [
        "Role-specific training sessions",
        "AI-powered learning modules",
        "Documentation & resources",
        "Change management support",
      ],
    },
    {
      day: "Day 12-14",
      phase: "Go-Live & Optimization",
      icon: "🚀",
      description: "Smooth transition to your new system with real-time support. Immediate optimization based on actual usage patterns.",
      deliverables: [
        "Production launch",
        "Real-time monitoring",
        "Immediate issue resolution",
        "Performance fine-tuning",
      ],
    },
  ];

  return (
    <div ref={timelineRef} className="max-w-6xl mx-auto mb-32 relative">
      <h3 className="font-display text-3xl text-[#4fc3f7] text-center mb-16 uppercase tracking-wide">
        14-Day Transformation Journey
      </h3>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-20 bottom-0 w-1 bg-gradient-to-b from-[#4fc3f7] to-transparent hidden lg:block" />

      <div className="space-y-20">
        {timelineData.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={cn(
              "timeline-item relative opacity-0 translate-y-12 transition-all duration-800",
              activeItems.includes(index) && "opacity-100 translate-y-0"
            )}
          >
            {/* Timeline node */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-16 h-16 bg-[#0c1e34] border-4 border-[#4fc3f7] rounded-full z-10 shadow-[0_0_20px_rgba(79,195,247,0.6)]">
              <span className="text-2xl">{item.icon}</span>
            </div>

            {/* Content */}
            <div
              className={cn(
                "bg-[rgba(30,58,138,0.3)] border-2 border-[#4fc3f7] rounded-lg p-8",
                "backdrop-blur-md shadow-xl hover:shadow-[0_15px_40px_rgba(79,195,247,0.3)]",
                "hover:scale-[1.02] transition-all duration-300",
                index % 2 === 0 ? "lg:mr-[55%]" : "lg:ml-[55%]"
              )}
            >
              <div className="lg:hidden flex items-center gap-4 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <div className="font-mono text-sm text-[#00FFF0] uppercase tracking-wider">
                  {item.day}
                </div>
              </div>

              <div className="hidden lg:block font-mono text-sm text-[#00FFF0] uppercase tracking-wider mb-2">
                {item.day}
              </div>

              <h4 className="font-display text-2xl text-[#4fc3f7] mb-4 font-bold">
                {item.phase}
              </h4>

              <p className="text-base leading-relaxed mb-6 opacity-90">
                {item.description}
              </p>

              <ul className="space-y-3">
                {item.deliverables.map((deliverable, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm opacity-90">
                    <span className="text-[#00FFF0] font-bold">✓</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 2: ROI CALCULATOR
// ==========================================
const ROICalculator = () => {
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(100);

  const monthlySaved = Math.round(hours * 4 * 0.4);
  const monthlyCost = monthlySaved * rate;
  const annualCost = monthlyCost * 12;
  const firstYearInvestment = 22987;
  const payback = (firstYearInvestment / monthlyCost).toFixed(1);
  const roi = Math.round(((annualCost - firstYearInvestment) / firstYearInvestment) * 100);

  return (
    <div className="max-w-5xl mx-auto mb-32 relative">
      <div className="bg-[rgba(30,58,138,0.2)] border-2 border-[#4fc3f7] rounded-xl p-10 md:p-16 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 animate-pattern-slide pointer-events-none" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #4fc3f7 10px, #4fc3f7 11px),
                                repeating-linear-gradient(-45deg, transparent, transparent 10px, #4fc3f7 10px, #4fc3f7 11px)`
             }} 
        />

        <div className="relative z-10">
          <h3 className="font-display text-3xl text-[#4fc3f7] text-center mb-4 uppercase tracking-wide">
            Calculate Your ROI
          </h3>
          <p className="text-center text-lg mb-12 opacity-90">
            See exactly how much time and money you'll save with SGC TECH AI
          </p>

          {/* Inputs */}
          <div className="space-y-10 mb-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Number of Employees</span>
                <span className="font-display text-2xl text-[#00FFF0]">{employees}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full h-2 bg-[rgba(79,195,247,0.2)] rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                           [&::-webkit-slider-thumb]:bg-[#4fc3f7] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#00FFF0] 
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(79,195,247,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Hours on Manual Tasks (per week)</span>
                <span className="font-display text-2xl text-[#00FFF0]">{hours}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 bg-[rgba(79,195,247,0.2)] rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                           [&::-webkit-slider-thumb]:bg-[#4fc3f7] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#00FFF0] 
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(79,195,247,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Average Hourly Rate (AED)</span>
                <span className="font-display text-2xl text-[#00FFF0]">{rate}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={rate}
                onChange={(e) => setRate(parseInt(e.target.value))}
                className="w-full h-2 bg-[rgba(79,195,247,0.2)] rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                           [&::-webkit-slider-thumb]:bg-[#4fc3f7] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#00FFF0] 
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(79,195,247,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-[rgba(12,30,52,0.8)] border-2 border-[#00FFF0] rounded-lg p-8 shadow-[0_0_30px_rgba(0,255,240,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Time Saved Monthly</div>
                <div className="font-display text-4xl font-black text-[#00FFF0] animate-number-pulse">{monthlySaved}</div>
                <div className="text-sm opacity-70 mt-1">hours</div>
              </div>

              <div className="text-center">
                <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Cost Savings Monthly</div>
                <div className="font-display text-4xl font-black text-[#00FFF0] animate-number-pulse">
                  AED {monthlyCost.toLocaleString()}
                </div>
                <div className="text-sm opacity-70 mt-1">per month</div>
              </div>

              <div className="text-center">
                <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Annual Savings</div>
                <div className="font-display text-4xl font-black text-[#00FFF0] animate-number-pulse">
                  AED {annualCost.toLocaleString()}
                </div>
                <div className="text-sm opacity-70 mt-1">per year</div>
              </div>

              <div className="text-center">
                <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Payback Period</div>
                <div className="font-display text-4xl font-black text-[#00FFF0] animate-number-pulse">
                  {parseFloat(payback) < 1 ? "< 1" : payback}
                </div>
                <div className="text-sm opacity-70 mt-1">month</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[rgba(40,167,69,0.2)] to-[rgba(40,167,69,0.1)] border-2 border-[#28a745] rounded-lg p-8 text-center">
              <div className="text-sm text-[#28a745] uppercase tracking-wider font-bold mb-4">Your Estimated ROI</div>
              <div className="font-display text-6xl font-black text-[#28a745] mb-4">{roi.toLocaleString()}%</div>
              <div className="text-base opacity-90">
                Based on first-year savings vs. investment. Most clients see even higher returns.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 3: COMPARISON SLIDER
// ==========================================
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div className="max-w-6xl mx-auto mb-32">
      <h3 className="font-display text-3xl text-[#4fc3f7] text-center mb-16 uppercase tracking-wide">
        Traditional vs. SGC TECH AI
      </h3>

      <div
        ref={containerRef}
        className="relative w-full h-[600px] md:h-[500px] bg-[rgba(12,30,52,0.6)] border-2 border-[#4fc3f7] rounded-xl overflow-hidden cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* Before (Traditional) */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-br from-[rgba(255,107,107,0.2)] to-[rgba(255,107,107,0.1)] p-8 md:p-12 overflow-hidden transition-all duration-300"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="bg-[rgba(255,107,107,0.3)] border-2 border-[#FF6B6B] text-[#FF6B6B] px-6 py-3 font-display text-sm md:text-base font-bold uppercase tracking-wider rounded inline-block mb-8">
            Traditional Approach
          </div>
          
          <div className="space-y-8 mt-12">
            {[
              { label: "Implementation Time", value: "6-12 Months", desc: "Lengthy deployment with uncertain timeline" },
              { label: "Setup Cost", value: "AED 50,000+", desc: "High upfront investment required" },
              { label: "Monthly Cost", value: "AED 10,000+", desc: "Expensive ongoing maintenance" },
              { label: "ROI Guarantee", value: "None", desc: "No accountability for results" },
            ].map((metric, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="text-sm opacity-80 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className="font-display text-3xl font-black text-[#FF6B6B] mb-2">{metric.value}</div>
                <div className="text-sm opacity-70">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* After (SGC TECH AI) */}
        <div
          className="absolute top-0 right-0 h-full bg-gradient-to-br from-[rgba(40,167,69,0.2)] to-[rgba(40,167,69,0.1)] p-8 md:p-12 overflow-hidden transition-all duration-300"
          style={{ width: `${100 - sliderPosition}%` }}
        >
          <div className="bg-[rgba(40,167,69,0.3)] border-2 border-[#28a745] text-[#28a745] px-6 py-3 font-display text-sm md:text-base font-bold uppercase tracking-wider rounded inline-block mb-8 float-right">
            SGC TECH AI
          </div>
          
          <div className="space-y-8 mt-12 clear-both">
            {[
              { label: "Implementation Time", value: "14 Days", desc: "AI-accelerated deployment, production-ready" },
              { label: "Setup Cost", value: "AED 4,999", desc: "Fixed pricing for first 50 partners" },
              { label: "Monthly Cost", value: "From AED 799", desc: "Transparent, affordable pricing" },
              { label: "ROI Guarantee", value: "150-200%", desc: "Or full refund - we put our money where our mouth is" },
            ].map((metric, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="text-sm opacity-80 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className="font-display text-3xl font-black text-[#28a745] mb-2">{metric.value}</div>
                <div className="text-sm opacity-70">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 h-full w-1 bg-gradient-to-b from-[#4fc3f7] to-[#00FFF0] shadow-[0_0_20px_rgba(79,195,247,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#4fc3f7] border-4 border-[#00FFF0] rounded-full shadow-[0_0_30px_rgba(79,195,247,1)] flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-[#0c1e34] border-b-[8px] border-b-transparent -ml-2" />
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#0c1e34] border-b-[8px] border-b-transparent -mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 4: STATS COUNTER
// ==========================================
const StatsCounter = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll<HTMLElement>(".stat-counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toString();
        }
      }, 16);
    });
  };

  const stats = [
    { icon: "⚡", value: 14, label: "Days to Production" },
    { icon: "💰", value: 200, label: "% ROI Guaranteed" },
    { icon: "⏱️", value: 80, label: "Hours Saved Monthly" },
    { icon: "📊", value: 90, label: "% Error Reduction" },
    { icon: "🚀", value: 300, label: "% Forecast Improvement" },
    { icon: "🎯", value: 100, label: "% Client Satisfaction" },
  ];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto mb-32 relative">
      <div className="bg-[rgba(30,58,138,0.2)] border-2 border-[#4fc3f7] rounded-xl p-12 md:p-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(79,195,247,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(0,255,240,0.1)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative z-10">
          <h3 className="font-display text-3xl text-[#4fc3f7] text-center mb-16 uppercase tracking-wide">
            Proven Results Across Industries
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[rgba(12,30,52,0.6)] border-2 border-[#4fc3f7] rounded-lg p-8 text-center relative overflow-hidden group
                           hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,195,247,0.4)] hover:border-[#00FFF0] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(79,195,247,0.2)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                
                <div className="text-5xl mb-6 filter drop-shadow-[0_0_20px_rgba(79,195,247,0.6)]">{stat.icon}</div>
                <div className="font-display text-6xl font-black text-[#00FFF0] stat-counter mb-4" data-target={stat.value}>
                  0
                </div>
                <div className="text-sm uppercase tracking-wider opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 5: FINAL CTA
// ==========================================
const FinalCTA = () => {
  return (
    <div className="max-w-5xl mx-auto text-center px-4">
      <h3 className="font-display text-4xl md:text-5xl text-[#4fc3f7] mb-8 uppercase tracking-wide animate-title-glitch">
        Ready to End the 3 AM Nightmare?
      </h3>
      
      <p className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
        Join 8 forward-thinking businesses who've already secured their Launch Partner status.
        Lock in lifetime pricing protection today.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
        <a
          href="#contact"
          className="bg-[#4fc3f7] text-[#0A0A0A] px-12 py-5 font-mono text-lg font-bold uppercase tracking-wider
                     border-2 border-[#4fc3f7] hover:bg-[#00FFF0] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(79,195,247,0.8)]
                     transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Book Free Consultation</span>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        </a>

        <a
          href="#pricing"
          className="bg-transparent text-[#4fc3f7] px-12 py-5 font-mono text-lg font-bold uppercase tracking-wider
                     border-2 border-[#4fc3f7] hover:bg-[rgba(79,195,247,0.1)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(79,195,247,0.4)]
                     transition-all duration-300"
        >
          View Pricing Options
        </a>
      </div>

      <div className="inline-block bg-[rgba(255,193,7,0.1)] border-2 border-[#ffc107] rounded-lg p-6">
        <div className="font-display text-sm text-[#ffc107] uppercase tracking-wider mb-2">
          <span className="text-3xl font-black animate-number-pulse">42</span> of 50 Launch Partner Spots Remaining
        </div>
      </div>
    </div>
  );
};

export default InteractiveEducation;
