import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const BookConsultation = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
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

          {/* Calendly Inline Widget */}
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/scholarixglobal-q7ct/book-a-free-consultation?background_color=072846&text_color=f9f9f9&primary_color=10d5bf" 
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
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
