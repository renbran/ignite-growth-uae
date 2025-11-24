/// <reference types="vite/client" />

// Global window extensions for analytics
interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  trackVideoEvent?: (action: string, label: string) => void;
  trackConversion?: (eventName: string, value?: number) => void;
}
