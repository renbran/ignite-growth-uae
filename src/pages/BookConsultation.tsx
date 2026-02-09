import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const BookConsultation = () => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    const initializeCal = () => {
      const Cal = (window as typeof window & { Cal?: any }).Cal;
      if (!Cal) return;

      Cal("init", "15min", { origin: "https://app.cal.com" });
      Cal.ns["15min"]("inline", {
        elementOrSelector: "#my-cal-inline-15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "sgctechai/15min",
      });
      Cal.ns["15min"]("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0b46e5" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    script.onload = initializeCal;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <BackgroundAnimation />
      <Header />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
              Book Your Free Consultation
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
              Schedule a personalized consultation with our ERP experts. Discover how we can transform your business in just 14 days.
            </p>
          </div>

          {/* Cal.com Inline Widget */}
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div id="my-cal-inline-15min" className="cal-inline-container"></div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center animate-fade-in">
            <p className="text-sm text-foreground-muted mb-4">
              Join hundreds of businesses across UAE that have already transformed with us
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="text-foreground-subtle font-semibold">Healthcare</span>
              <span className="text-foreground-subtle font-semibold">Hospitality</span>
              <span className="text-foreground-subtle font-semibold">Real Estate</span>
              <span className="text-foreground-subtle font-semibold">Construction</span>
              <span className="text-foreground-subtle font-semibold">Manufacturing</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookConsultation;
