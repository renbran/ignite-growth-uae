/// <reference types="vite/client" />

// Global window extensions for analytics
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  trackVideoEvent?: (action: string, label: string) => void;
  trackConversion?: (eventName: string, value?: number) => void;
}
