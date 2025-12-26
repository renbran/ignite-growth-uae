# News Carousel - Integration Examples

## Overview

The `NewsCarousel` component is already integrated into your app globally (in `App.tsx`). However, here are examples for advanced use cases.

---

## Current Integration (Already Done ✅)

### In `src/App.tsx`:

```tsx
import NewsCarousel from "@/components/NewsCarousel";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ... other providers ... */}
      <BrowserRouter>
        <ScrollToTop />
        <NewsCarousel />  {/* ← Renders on ALL pages */}
        <Routes>
          {/* Your routes here */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Result**: Carousel appears on every page automatically ✅

---

## Advanced Scenarios

### Scenario 1: Hide Carousel on Specific Pages

Create a context provider:

```tsx
// src/context/NewsCarouselContext.tsx
import { createContext, useContext, useState } from "react";

interface NewsCarouselContextType {
  isHidden: boolean;
  hide: () => void;
  show: () => void;
}

export const NewsCarouselContext = createContext<NewsCarouselContextType>(null);

export const useNewsCarousel = () => {
  const context = useContext(NewsCarouselContext);
  if (!context) throw new Error("useNewsCarousel must be used within provider");
  return context;
};

export const NewsCarouselProvider = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <NewsCarouselContext.Provider
      value={{
        isHidden,
        hide: () => setIsHidden(true),
        show: () => setIsHidden(false),
      }}
    >
      {children}
    </NewsCarouselContext.Provider>
  );
};
```

Then in your page:

```tsx
// src/pages/SomeSpecificPage.tsx
import { useEffect } from "react";
import { useNewsCarousel } from "@/context/NewsCarouselContext";

const SomeSpecificPage = () => {
  const { hide, show } = useNewsCarousel();

  useEffect(() => {
    hide(); // Hide on this page
    return () => show(); // Show when leaving
  }, []);

  return <div>{/* Page content */}</div>;
};
```

---

### Scenario 2: Show Different News on Different Pages

Create page-specific news configurations:

```tsx
// src/config/homePageNews.ts
import { NewsItem } from "./newsConfig";

export const homePageNews: NewsItem[] = [
  {
    id: 1,
    title: "Welcome to SGC TECH AI",
    description: "Discover transformation solutions",
    date: "Dec 23, 2025",
    category: "announcement",
    link: "/solutions",
  },
  // More home-specific news...
];
```

```tsx
// src/pages/Index.tsx
import { useEffect } from "react";
import { useNewsCarousel } from "@/context/NewsCarouselContext";
import { homePageNews } from "@/config/homePageNews";

const Index = () => {
  // Load home-specific news
  useEffect(() => {
    // You'd need to add a context method for this
    // setNews(homePageNews);
  }, []);

  return <div>{/* Page content */}</div>;
};
```

---

### Scenario 3: Add Analytics Tracking

Modify `src/components/NewsCarousel.tsx`:

```tsx
const handleNewsClick = (item: NewsItem) => {
  // Track event
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "news_carousel_click", {
      news_id: item.id,
      news_title: item.title,
      news_category: item.category,
    });
  }

  // Navigate
  if (item.link) {
    window.open(item.link);
  }
};

// In the JSX:
<div
  className="flex-1 cursor-pointer transition-all duration-300 group"
  onClick={() => handleNewsClick(currentItem)}
>
  {/* Content */}
</div>
```

---

### Scenario 4: Integrate with CMS/API

Create a custom hook to fetch news:

```tsx
// src/hooks/useNewsFromAPI.ts
import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/config/newsConfig";

export const useNewsFromAPI = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json() as Promise<NewsItem[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

Then modify `NewsCarousel.tsx`:

```tsx
import { useNewsFromAPI } from "@/hooks/useNewsFromAPI";

const NewsCarousel = () => {
  const { data: newsItems = [] } = useNewsFromAPI();

  if (newsItems.length === 0) return null;

  // Rest of component...
};
```

---

### Scenario 5: Add Loading State

```tsx
// In NewsCarousel.tsx
const { data: newsItems = [], isLoading } = useNewsFromAPI();

if (isLoading) {
  return (
    <div className="sticky top-0 z-40 bg-background/95 h-16 flex items-center justify-center">
      <div className="animate-pulse">Loading news...</div>
    </div>
  );
}

if (newsItems.length === 0) return null;

// Normal carousel...
```

---

### Scenario 6: Add Pagination for Old News

```tsx
// src/pages/News.tsx
import { useState } from "react";
import { newsItems } from "@/config/newsConfig";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsArchive = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const paginatedNews = newsItems.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const maxPages = Math.ceil(newsItems.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">News Archive</h1>

      <div className="space-y-4">
        {paginatedNews.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer"
            onClick={() => item.link && window.open(item.link)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-foreground-muted">{item.description}</p>
                <p className="text-xs text-foreground-muted mt-2">{item.date}</p>
              </div>
              <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="p-2 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span>
          Page {page + 1} of {maxPages}
        </span>
        <button
          onClick={() => setPage(Math.min(maxPages - 1, page + 1))}
          disabled={page === maxPages - 1}
          className="p-2 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NewsArchive;
```

---

### Scenario 7: Email Notification System

```tsx
// src/integrations/emailNotifications.ts
import { supabase } from "@/integrations/supabase/client";
import { NewsItem } from "@/config/newsConfig";

export const notifyNewsSubscribers = async (newsItem: NewsItem) => {
  // Get all subscribers
  const { data: subscribers } = await supabase
    .from("news_subscribers")
    .select("email")
    .eq("active", true);

  if (!subscribers || subscribers.length === 0) return;

  // Send emails
  for (const subscriber of subscribers) {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: subscriber.email,
        subject: `New ${newsItem.category}: ${newsItem.title}`,
        template: "news-notification",
        data: newsItem,
      }),
    });
  }
};
```

---

### Scenario 8: Search & Filter News

```tsx
// src/components/NewsFilter.tsx
import { useState } from "react";
import { newsItems } from "@/config/newsConfig";

const NewsFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-border rounded-lg"
      />

      {/* Category Filter */}
      <div className="flex gap-2">
        {["announcement", "update", "news"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === cat ? "bg-accent text-white" : "bg-foreground/10"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="p-3 border border-border rounded-lg">
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-sm text-foreground-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFilter;
```

---

## Summary

The carousel is **already globally integrated**. Use these examples only if you need:

- ✅ Page-specific news
- ✅ Hide carousel on certain pages
- ✅ API/CMS integration
- ✅ Analytics tracking
- ✅ News archive pages
- ✅ Email notifications
- ✅ Search & filtering

For most use cases, just **update `src/config/newsConfig.ts`** and you're done! 🚀
