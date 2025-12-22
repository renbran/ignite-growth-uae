import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PremiumServices = () => {
  const services = [
    {
      iconPath: "https://i.postimg.cc/nrhmmyVj/01-ai-neural-network.webp",
      title: "AI Neural Intelligence",
      description: "Cutting-edge neural network solutions for enterprise automation",
    },
    {
      iconPath: "https://i.postimg.cc/sxgWWkfS/02-cloud-integration.webp",
      title: "Cloud Integration",
      description: "Seamless integration with your existing cloud infrastructure",
    },
    {
      iconPath: "https://i.postimg.cc/3NxGGsrg/03-cloud-storage.webp",
      title: "Secure Cloud Storage",
      description: "Enterprise-grade security for your most critical data",
    },
    {
      iconPath: "https://i.postimg.cc/3NxGGsrC/04-lightning-speed.webp",
      title: "Lightning Fast Speed",
      description: "Performance optimization that delivers results in milliseconds",
    },
    {
      iconPath: "https://i.postimg.cc/bJTbsyhF/05-security-shield-left.webp",
      title: "Advanced Security",
      description: "Multi-layer security protocols protecting your infrastructure",
    },
    {
      iconPath: "https://i.postimg.cc/JnqJGrLS/06-security-shield-right.webp",
      title: "Zero Breach Guarantee",
      description: "Industry-leading security with 99.99% uptime SLA",
    },
    {
      iconPath: "https://i.postimg.cc/85HWjpS2/07-global-transform.webp",
      title: "Global Transformation",
      description: "Worldwide deployment across multiple geographic regions",
    },
    {
      iconPath: "https://i.postimg.cc/gJDRnzWf/08-data-analytics.webp",
      title: "Advanced Analytics",
      description: "Real-time insights and predictive intelligence",
    },
    {
      iconPath: "https://i.postimg.cc/FRZc7rvt/09-automation-gears.webp",
      title: "Smart Automation",
      description: "Eliminate manual processes with intelligent automation",
    },
    {
      iconPath: "https://i.postimg.cc/Ssr8JS4p/10-rocket-launch.webp",
      title: "Rapid Deployment",
      description: "Go live in days, not months",
    },
    {
      iconPath: "https://i.postimg.cc/G2QYHLRr/11-achievement-trophy.webp",
      title: "Proven Excellence",
      description: "Award-winning solutions trusted by industry leaders",
    },
    {
      iconPath: "https://i.postimg.cc/XJ8FpjW4/12-growth-chart.webp",
      title: "Exponential Growth",
      description: "Scale your operations without scaling your costs",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent font-mono text-sm tracking-wider uppercase mb-4 block">
            Premium Services Portfolio
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-foreground">Enterprise Solutions With </span>
            <span className="text-gradient">Premium Finish</span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Industry-leading features at affordable enterprise pricing. Position yourself as the premium service provider.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-sm p-8 hover:border-accent transition-all duration-300 hover-lift animate-fade-in hover:shadow-lg"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon with Premium Glossy Finish */}
              <div className="icon-wrapper-premium w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                <img
                  src={service.iconPath}
                  alt={service.title}
                  className="icon-image-gold w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Accent Line */}
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent to-primary transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-card/50 to-muted/30 border border-border rounded-sm p-12">
          <h3 className="font-display font-bold text-3xl mb-4 text-foreground">
            Ready to Transform Your Enterprise?
          </h3>
          <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
            Get access to our complete premium services portfolio. All features designed for maximum ROI and minimal implementation time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/pricing">
                View Premium Pricing →
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/solutions">
                Explore All Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
