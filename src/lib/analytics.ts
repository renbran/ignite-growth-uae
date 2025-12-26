/**
 * Analytics utilities for tracking user behavior
 * Supports PostHog and Google Analytics
 */

import posthog from "posthog-js";

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (globalThis.window !== undefined && posthog.__loaded) {
    posthog.capture(eventName, properties);
  }

  // Also send to GA4 if available
  globalThis.window?.gtag?.("event", eventName, properties);
};

// Track page views
export const trackPageView = (path: string) => {
  if (globalThis.window !== undefined && posthog.__loaded) {
    posthog.capture("$pageview", { path });
  }

  globalThis.window?.gtag?.("event", "page_view", { page_path: path });
};

// Identify user (for authenticated users)
export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (globalThis.window !== undefined && posthog.__loaded) {
    posthog.identify(userId, traits);
  }
};

// Reset on logout
export const resetUser = () => {
  if (globalThis.window !== undefined && posthog.__loaded) {
    posthog.reset();
  }
};

// Custom tracking for carousel interactions
export const trackCarouselClick = (newsItem: {
  id: number;
  title: string;
  category: string;
}) => {
  trackEvent("carousel_news_clicked", {
    news_id: newsItem.id,
    news_title: newsItem.title,
    category: newsItem.category,
  });
};

export const trackCarouselNavigation = (direction: "prev" | "next", currentIndex: number) => {
  trackEvent("carousel_navigation", {
    direction,
    current_index: currentIndex,
  });
};

export const trackCarouselClosed = () => {
  trackEvent("carousel_closed");
};

// CTA tracking
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("cta_clicked", {
    cta_name: ctaName,
    location,
  });
};

// Form tracking
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent("form_submitted", {
    form_name: formName,
    success,
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
