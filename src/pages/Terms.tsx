import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import { GoldGradientDef } from "@/components/GoldIcon";

const Terms = () => {
  return (
    <div className="page-container min-h-screen relative">
      <GoldGradientDef />
      <BackgroundAnimation />
      <BackgroundPatterns pattern="circuit" opacity={0.08} position="top" className="left-0 z-0" />
      <Header />
      <main className="pt-32 pb-4xl relative z-10">
        {/* Hero */}
        <section className="container text-center mb-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-lg">
            Terms of Service
          </div>
          <h1 className="text-gradient mb-lg">Clear Terms. Fair Use.</h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            These terms govern the use of our website and services. By accessing this site, you agree to the
            terms below.
          </p>
        </section>

        {/* Terms Content */}
        <section className="container mb-4xl">
          <div className="glass rounded-2xl p-3xl space-y-xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Use of Services</h2>
              <p className="text-foreground-muted">
                Content is provided for informational purposes. Do not misuse the site, attempt unauthorized access,
                or engage in activities that disrupt operations.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Intellectual Property</h2>
              <p className="text-foreground-muted">
                All trademarks, logos, and content on this site are owned by SGC TECH AI / Scholarix Global or its
                partners. Do not reproduce without permission.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Limitation of Liability</h2>
              <p className="text-foreground-muted">
                We strive for accuracy but make no warranties regarding completeness of information. We are not liable
                for any indirect damages arising from site usage.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-md">Contact</h2>
              <p className="text-foreground-muted">
                Questions about these terms? Contact us at <span className="text-accent">info@sgctech.ai</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
