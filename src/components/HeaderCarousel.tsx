import { useRef } from "react";
import { CircuitBoard, Globe2, Radio, RadioTower, ShieldCheck, Sparkles } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface UpdateItem {
  id: string;
  category: string;
  title: string;
  tag: string;
  tone: "cyan" | "green" | "gold";
  icon: JSX.Element;
}

const updates: UpdateItem[] = [
  {
    id: "uae-ai-governance",
    category: "UAE Regulation",
    title: "AI assurance playbooks under review—align logs, model risk, and DPIA steps early.",
    tag: "Compliance · Jan 2026",
    tone: "cyan",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    id: "uae-cloud-latency",
    category: "UAE Tech",
    title: "New regional cloud zones trimming latency—target <30ms for ERP workloads in GCC.",
    tag: "Infrastructure",
    tone: "green",
    icon: <CircuitBoard className="w-4 h-4" />,
  },
  {
    id: "uae-e-invoice",
    category: "UAE Finance",
    title: "E-invoicing waves continue—test API integrations and archiving controls now.",
    tag: "Finance Ops",
    tone: "cyan",
    icon: <RadioTower className="w-4 h-4" />,
  },
  {
    id: "global-ai-standards",
    category: "Global AI",
    title: "ISO/IEC 42001 momentum—map AI governance controls to certification paths.",
    tag: "AI Governance",
    tone: "gold",
    icon: <Globe2 className="w-4 h-4" />,
  },
  {
    id: "software-sbom",
    category: "Software",
    title: "RFPs request SBOM-by-default—automate component inventories and attestations.",
    tag: "Security",
    tone: "green",
    icon: <CircuitBoard className="w-4 h-4" />,
  },
  {
    id: "genai-productivity",
    category: "AI Delivery",
    title: "Retrieval-augmented copilots cut ticket volume—keep human-in-loop approvals documented.",
    tag: "Productivity",
    tone: "cyan",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const toneBadge = {
  cyan: "border-[hsl(var(--electric-cyan)/0.35)] bg-[hsl(var(--electric-cyan)/0.12)] text-[hsl(var(--electric-cyan))]",
  green: "border-[hsl(var(--neon-green)/0.35)] bg-[hsl(var(--neon-green)/0.12)] text-[hsl(var(--neon-green))]",
  gold: "border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]",
};

const HeaderCarousel = () => {
  const autoplay = useRef(
    Autoplay({ delay: 3600, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="py-2">
      <div className="glass border border-border/60 rounded-xl bg-background/90 shadow-glow/30">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Live updates</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-[12px] text-foreground-muted">
            <Globe2 className="w-4 h-4" />
            <span>UAE Tech · AI · Software</span>
          </span>
        </div>

        <Carousel opts={{ loop: true }} plugins={[autoplay.current]}>
          <CarouselContent>
            {updates.map((update) => (
              <CarouselItem key={update.id} className="basis-full px-3 sm:px-4 py-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold",
                      toneBadge[update.tone]
                    )}
                  >
                    {update.icon}
                    <span>{update.category}</span>
                  </span>

                  <p className="flex-1 text-sm sm:text-base leading-snug text-foreground">
                    {update.title}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[12px] text-foreground-muted">
                    <Radio className="w-3.5 h-3.5 text-accent" />
                    <span>{update.tag}</span>
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default HeaderCarousel;
