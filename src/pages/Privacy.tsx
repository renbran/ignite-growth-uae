import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import { GoldGradientDef } from "@/components/GoldIcon";

const Privacy = () => {
  return (
    <div className="page-container min-h-screen relative">
      <SEO
        title="Privacy Policy"
        description="SGC TECH AI privacy policy. How we collect, use, and protect your personal data in compliance with UAE data protection regulations and GDPR."
        canonical="https://sgctech.ai/privacy"
      />
      <GoldGradientDef />
      <BackgroundAnimation />
      <BackgroundPatterns pattern="grid" opacity={0.08} position="top" className="left-0 z-0" />
      <Header />
      <main className="pt-32 pb-4xl relative z-10">
        {/* Hero */}
        <section className="container text-center mb-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-lg">
            Privacy Policy
          </div>
          <h1 className="text-gradient mb-lg">Your Privacy, Our Priority</h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            We respect your privacy and are committed to protecting your personal information. This policy
            explains what data we collect, how we use it, and your rights.
          </p>
        </section>

        {/* Policy Content */}
        <section className="container mb-4xl">
          <div className="glass rounded-2xl p-3xl space-y-xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Information We Collect</h2>
              <p className="text-foreground-muted">
                We may collect your name, email, phone number, company details, and any information submitted via our
                forms. We also collect basic analytics data to improve site performance and user experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">How We Use Information</h2>
              <p className="text-foreground-muted">
                We use your information to respond to inquiries, provide services, improve our products, and send
                updates you opt into. We do not sell your personal data.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Your Rights</h2>
              <p className="text-foreground-muted">
                You can request access, correction, or deletion of your data at any time. Contact us at
                <span className="text-accent"> info@sgctech.ai</span> for privacy requests.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Contact</h2>
              <p className="text-foreground-muted">
                For questions about this policy, reach us at Dubai, UAE or call +971 50 967 5518.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
