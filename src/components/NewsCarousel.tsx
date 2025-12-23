import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { newsItems as configuredNewsItems } from "@/config/newsConfig";

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  const newsItems = configuredNewsItems;

  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, isVisible, newsItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    setAutoplay(false);
  };

  const currentItem = newsItems[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-accent/20 text-accent";
      case "update":
        return "bg-cyan-500/20 text-cyan-400";
      case "news":
        return "bg-emerald-500/20 text-emerald-400";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-background via-background to-background/95 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 min-h-16">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 p-2 text-foreground-muted hover:text-accent transition-colors hover:bg-accent/10 rounded-lg"
            aria-label="Previous news"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Content */}
          <div
            className="flex-1 cursor-pointer transition-all duration-300 group"
            onClick={() => currentItem.link && window.open(currentItem.link)}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="flex items-center gap-3">
              {/* Category Badge */}
              <span
                className={`${getCategoryColor(currentItem.category)} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide flex-shrink-0`}
              >
                {currentItem.category}
              </span>

              {/* News Content */}
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-foreground-muted truncate">
                  {currentItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoplay(false);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-accent w-6"
                    : "bg-foreground-muted/30 w-1.5 hover:bg-foreground-muted/50"
                }`}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 p-2 text-foreground-muted hover:text-accent transition-colors hover:bg-accent/10 rounded-lg"
            aria-label="Next news"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <ChevronRight size={20} />
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-2 text-foreground-muted hover:text-foreground transition-colors hover:bg-foreground/10 rounded-lg"
            aria-label="Close news carousel"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
