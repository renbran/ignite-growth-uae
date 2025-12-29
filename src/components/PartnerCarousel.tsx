import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Standardized feature icons/logos
const featureLogos = [
  {
    src: "https://i.postimg.cc/SxZ6VdsV/01-ai-neural-network.png",
    alt: "AI & Neural Network",
    label: "AI Intelligence",
  },
  {
    src: "https://i.postimg.cc/sgnYKmxC/02-cloud-integration.png",
    alt: "Cloud Integration",
    label: "Cloud Integration",
  },
  {
    src: "https://i.postimg.cc/Vk7q4gv8/03-cloud-storage.png",
    alt: "Cloud Storage",
    label: "Cloud Storage",
  },
  {
    src: "https://i.postimg.cc/SxZ6VdRQ/04-lightning-speed.png",
    alt: "Lightning Speed",
    label: "Lightning Speed",
  },
  {
    src: "https://i.postimg.cc/y8fmnjxs/05-security-shield-left.png",
    alt: "Security Left",
    label: "Enterprise Security",
  },
  {
    src: "https://i.postimg.cc/d0L8fCZq/06-security-shield-right.png",
    alt: "Security Right",
    label: "Data Protection",
  },
  {
    src: "https://i.postimg.cc/W4hMyZqN/07-global-transform.png",
    alt: "Global Transformation",
    label: "Global Transform",
  },
  {
    src: "https://i.postimg.cc/fbJxPdSy/08-data-analytics.png",
    alt: "Data Analytics",
    label: "Advanced Analytics",
  },
  {
    src: "https://i.postimg.cc/d0L8fCZD/09-automation-gears.png",
    alt: "Automation",
    label: "Smart Automation",
  },
  {
    src: "https://i.postimg.cc/mrtQn91c/10-rocket-launch.png",
    alt: "Rocket Launch",
    label: "Fast Deployment",
  },
  {
    src: "https://i.postimg.cc/cJrQz3tw/11-achievement-trophy.png",
    alt: "Achievement",
    label: "Excellence",
  },
  {
    src: "https://i.postimg.cc/rpKSH4R1/12-growth-chart.png",
    alt: "Growth Chart",
    label: "Scalable Growth",
  },
];

const PartnerCarousel = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="container relative py-12 md:py-16">
      <div className="glass rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-foreground-subtle">Capabilities</p>
            <h3 className="text-2xl font-bold text-foreground">Enterprise-Grade Features</h3>
            <p className="text-foreground-muted text-sm md:text-base">Comprehensive suite of tools and services for business transformation</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-subtle">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>Auto-rotating carousel</span>
          </div>
        </div>

        <Carousel 
          opts={{ align: "start", loop: true }} 
          plugins={[autoplayPlugin.current]}
          className="relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featureLogos.map((feature, idx) => (
              <CarouselItem 
                key={idx} 
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-2 md:pl-4"
              >
                <div className={cn(
                  "flex flex-col items-center justify-center gap-3 p-4 rounded-lg",
                  "bg-gradient-to-br from-background-elevated/40 to-background/40",
                  "border border-border/50 hover:border-accent/50",
                  "transition-all duration-300 hover:shadow-glow cursor-pointer",
                  "group"
                )}>
                  <div className="relative h-16 w-16 flex items-center justify-center">
                    <img
                      src={feature.src}
                      alt={feature.alt}
                      className="max-h-16 max-w-16 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-center text-foreground-muted group-hover:text-accent transition-colors duration-300 font-medium">
                    {feature.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default PartnerCarousel;
