import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OdooFreeTrial from "@/components/OdooFreeTrial";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import { Button } from "@/components/ui/button";
import { Check, Clock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Go live fast",
    description: "Get your managed Odoo environment set up within 24 hours.",
    icon: Zap,
  },
  {
    title: "No credit card",
    description: "Start the 4-week trial with zero payment risk.",
    icon: Shield,
  },
  {
    title: "Guided onboarding",
    description: "We help you map processes and configure modules.",
    icon: Check,
  },
  {
    title: "Cancel anytime",
    description: "Stay in control with flexible trial terms.",
    icon: Clock,
  },
];

const FreeTrial = () => {
  return (
    <div className="page-container min-h-screen relative bg-background text-foreground">
      <SEO
        title="Start Free Odoo Trial — 4-Week Managed Odoo Environment"
        description="Start your 4-week free Odoo ERP trial with no credit card required. Get a managed Odoo environment live in 24 hours with guided onboarding from SGC TECH AI experts."
        keywords="free Odoo trial, try Odoo ERP free, Odoo free trial UAE, plug and play Odoo apps trial, Odoo 4-week trial"
        canonical="https://sgctech.ai/free-trial"
      />
      <BackgroundAnimation />
      <BackgroundPatterns
        pattern="hexagon"
        opacity={0.12}
        position="full"
        className="left-0 top-0 z-0"
      />
      <Header />
      <main className="relative overflow-hidden z-10">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background-secondary"
          aria-hidden="true"
        />

        <section className="relative z-10 pt-24 md:pt-28 pb-16">
          <div className="container px-4">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
                  Campaign Exclusive • Limited Slots
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-gradient">
                    Start Your 4-Week Odoo Free Trial
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-foreground-muted">
                    Launch a managed Odoo ERP instance with AI automation. No credit card required. Fast setup, secure hosting, and expert onboarding included.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Button asChild variant="hero" size="lg">
                    <a href="#free-trial">Start Free Trial</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="glass rounded-xl border border-border/60 p-5 text-left shadow-sm"
                    >
                      <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
                  <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1">Fast-loading page • No background video</span>
                  <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1">GDPR-ready • Enterprise-grade security</span>
                </div>
              </div>

              <div className="glass rounded-2xl border border-border/60 p-6" id="free-trial">
                <OdooFreeTrial compact showIntro={false} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FreeTrial;
