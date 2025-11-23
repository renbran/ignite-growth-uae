import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CEOMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CEOMessageModal = ({ isOpen, onClose }: CEOMessageModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay for smooth entrance animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-all duration-300",
        isVisible ? "bg-black bg-opacity-80 backdrop-blur-sm" : "bg-transparent"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "relative max-w-4xl w-full bg-gradient-to-br from-[#0A1628] to-[#1e3a8a] rounded-2xl shadow-2xl transition-all duration-500 transform",
          "border-2 border-[#4fc3f7] shadow-glow",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[rgba(79,195,247,0.2)] border border-[#4fc3f7] text-[#4fc3f7] hover:bg-[rgba(79,195,247,0.3)] transition-all"
          aria-label="Close CEO message"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-gradient mb-3">
              A Message from Our Founder
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#39ff14] mx-auto"></div>
          </div>

          {/* CEO Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#4fc3f7] border-opacity-30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#39ff14] flex items-center justify-center text-black font-display text-2xl font-bold">
              SG
            </div>
            <div>
              <h3 className="text-xl font-display text-white">Shaik Gouse</h3>
              <p className="text-[#4fc3f7] text-sm">Founder & CEO, SGC TECH AI</p>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Welcome to <span className="text-[#4fc3f7] font-semibold">SGC TECH AI</span> – where innovation meets transformation.
            </p>
            
            <p>
              For over a decade, I've witnessed businesses struggle with outdated systems, inefficient processes, and missed opportunities. That's why I founded SGC TECH AI – to bridge the gap between traditional business operations and AI-powered excellence.
            </p>

            <p>
              Our mission is simple yet powerful: <span className="text-[#39ff14] font-semibold">Transform your business in 14 days</span> with guaranteed 150-200% ROI. We don't just promise results – we deliver them through our proven, battle-tested AI implementation framework.
            </p>

            <p>
              Whether you're in manufacturing, healthcare, retail, or finance, we've helped companies like yours achieve:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>40% reduction in operational costs</li>
              <li>60% faster decision-making</li>
              <li>99.9% accuracy in AI-powered insights</li>
              <li>Complete digital transformation in under 2 weeks</li>
            </ul>

            <p className="text-white font-semibold">
              The future of business is AI-native. The question isn't <em>if</em> you'll transform – it's <em>when</em>.
            </p>

            <p className="text-[#4fc3f7] italic">
              Let's build the future together.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleClose}
              className={cn(
                "bg-gradient-to-r from-[#4fc3f7] to-[#39ff14]",
                "text-black px-8 py-4 rounded-full",
                "font-display text-lg font-bold uppercase tracking-wider",
                "transition-all duration-300 transform hover:scale-105",
                "shadow-glow hover:shadow-[0_0_30px_rgba(79,195,247,0.6)]"
              )}
            >
              Let's Transform Your Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessageModal;
