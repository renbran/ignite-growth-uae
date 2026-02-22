import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Industries from "@/components/Industries";
import PremiumServices from "@/components/PremiumServices";
import ROICalculator from "@/components/ROICalculator";
import OdooFreeTrial from "@/components/OdooFreeTrial";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import PartnerCarousel from "@/components/PartnerCarousel";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <SEO
        title="AI-Powered Odoo ERP for Real Estate"
        description="Deploy AI-powered Odoo ERP for real estate in 14 days. Plug-and-play modules for property developers, property managers, and trading companies. 14-day money-back guarantee."
        keywords="AI-powered Odoo ERP real estate, Odoo implementation UAE, real estate ERP software, plug and play Odoo apps, Odoo real estate management"
        canonical="https://sgctech.ai/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SGC TECH AI",
            url: "https://sgctech.ai",
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: "https://sgctech.ai/resources?q={search_term_string}" },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does Odoo ERP implementation take?",
                acceptedAnswer: { "@type": "Answer", text: "SGC TECH AI deploys Odoo ERP in 14 days using AI automation for configuration, data migration, and user training." },
              },
              {
                "@type": "Question",
                name: "Is there a money-back guarantee?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. SGC TECH AI offers a 14-day money-back guarantee on all Odoo ERP implementations." },
              },
              {
                "@type": "Question",
                name: "Do you support real estate companies in the UAE?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. We specialize in Odoo ERP for real estate development, property management, and related industries in the UAE and GCC." },
              },
              {
                "@type": "Question",
                name: "What is included in the free Odoo trial?",
                acceptedAnswer: { "@type": "Answer", text: "Our 4-week free Odoo trial includes a fully managed Odoo environment live within 24 hours, guided onboarding, and no credit card required." },
              },
            ],
          },
        ]}
      />
      <BackgroundAnimation />
      
      {/* Hero section pattern */}
      <BackgroundPatterns 
        pattern="circuit" 
        opacity={0.1} 
        position="top"
        className="left-0 top-0 z-0"
      />
      
      <Header />
      <main>
        <Hero />
        <PartnerCarousel />
        
        {/* Value Proposition pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="hexagon" 
            opacity={0.12} 
            position="center"
            className="left-0 z-0"
          />
          <ValueProposition />
        </div>
        
        {/* Premium Services pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="circuit" 
            opacity={0.1} 
            position="center"
            className="left-0 z-0"
          />
          <PremiumServices />
        </div>
        
        {/* Industries pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="geometric" 
            opacity={0.08} 
            position="bottom"
            className="left-0 z-0"
          />
          <Industries />
        </div>
        
        {/* ROI Calculator pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="circuit" 
            opacity={0.1} 
            position="center"
            className="left-0 z-0"
          />
          <ROICalculator />
        </div>
        
        {/* Odoo Free Trial pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="hexagon" 
            opacity={0.12} 
            position="center"
            className="left-0 z-0"
          />
          <OdooFreeTrial />
        </div>
        
        {/* Contact Form pattern */}
        <div className="relative">
          <BackgroundPatterns 
            pattern="hexagon" 
            opacity={0.15} 
            position="full"
            className="left-0 z-0"
          />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;