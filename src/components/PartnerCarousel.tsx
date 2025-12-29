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

// Standardized partner logos
const partnerLogos = [
  {
    src: "https://i.postimg.cc/0ymf5D2W/11-achievement-trophy.png",
    alt: "Achievement Trophy",
    label: "Achievement",
  },
  {
    src: "https://i.postimg.cc/4xt54VNw/AHS.png",
    alt: "AHS",
    label: "AHS",
  },
  {
    src: "https://i.postimg.cc/8zWHkMPb/AM.png",
    alt: "AM",
    label: "AM",
  },
  {
    src: "https://i.postimg.cc/qvnLByM2/Continental-Invesstment-LMD.png",
    alt: "Continental Investment LMD",
    label: "Continental Investment",
  },
  {
    src: "https://i.postimg.cc/W4v7dzdq/Dubai-holdings.png",
    alt: "Dubai Holdings",
    label: "Dubai Holdings",
  },
  {
    src: "https://i.postimg.cc/d0Y9h3hT/Eiger-Marvel.png",
    alt: "Eiger Marvel",
    label: "Eiger Marvel",
  },
  {
    src: "https://i.postimg.cc/g0HH8phn/GJ-PROPERTIES.png",
    alt: "GJ Properties",
    label: "GJ Properties",
  },
  {
    src: "https://i.postimg.cc/3wFFmhGW/GJ-REAL-ESTATE.png",
    alt: "GJ Real Estate",
    label: "GJ Real Estate",
  },
  {
    src: "https://i.postimg.cc/ZKWHgXGg/image.png",
    alt: "Brand Icon",
    label: "Brand Icon",
  },
  {
    src: "https://i.postimg.cc/TPJJgxbm/LMD.png",
    alt: "LMD",
    label: "LMD",
  },
  {
    src: "https://i.postimg.cc/3wFFmhGZ/OSUS.png",
    alt: "OSUS",
    label: "OSUS",
  },
  {
    src: "https://i.postimg.cc/xd33MQmR/Urban-properties.png",
    alt: "Urban Properties",
    label: "Urban Properties",
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
            <p className="text-sm uppercase tracking-wide text-foreground-subtle">Partners</p>
            <h3 className="text-2xl font-bold text-foreground">Trusted by industry leaders</h3>
            <p className="text-foreground-muted text-sm md:text-base">A curated set of partner logos displayed in a clean, consistent carousel.</p>
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
            {partnerLogos.map((feature, idx) => (
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
