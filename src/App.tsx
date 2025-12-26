import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, lazy, Suspense } from "react";
import posthog from "posthog-js";
import WhatsAppButton from "@/components/WhatsAppButton";
import LoadingScreen from "@/components/LoadingScreen";
import SmokeAurora from "@/components/SmokeAurora";
import JotFormChatbot from "@/components/JotFormChatbot";
import ScrollToTop from "@/components/ScrollToTop";
import NewsCarousel from "@/components/NewsCarousel";
import Index from "./pages/Index";

// Lazy load non-critical routes for better performance
const Solutions = lazy(() => import("./pages/Solutions"));
const Industries = lazy(() => import("./pages/Industries"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const BookConsultation = lazy(() => import("./pages/BookConsultation"));
const Article = lazy(() => import("./pages/Article"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  // Initialize PostHog
  useEffect(() => {
    if (import.meta.env.VITE_POSTHOG_KEY) {
      posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
        api_host: import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com",
        loaded: (posthog) => {
          if (import.meta.env.DEV) posthog.debug();
        },
      });
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmokeAurora />
      <LoadingScreen />
      <WhatsAppButton />
      <JotFormChatbot />
      <BrowserRouter>
        <ScrollToTop />
        <NewsCarousel />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/article/:slug" element={<Article />} />
            {/* Catch-all 404 route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
