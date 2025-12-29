import { useEffect } from 'react';

/**
 * Hook to monitor and report web vitals for slow network optimization
 * Helps identify performance bottlenecks
 */
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Measure Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
          
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', lcpValue);
          }
          
          // Send to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'page_view', {
              'page_title': document.title,
              'page_path': window.location.pathname,
              'lcp': lcpValue,
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        return () => lcpObserver.disconnect();
      } catch (e) {
        console.debug('LCP monitoring not supported');
      }
    }

    // Measure First Input Delay (FID) / Interaction to Next Paint (INP)
    if ('PerformanceObserver' in window) {
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('FID/INP:', entry.processingDuration);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input', 'event'] });
        
        return () => fidObserver.disconnect();
      } catch (e) {
        console.debug('FID monitoring not supported');
      }
    }

    // Measure Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry) => {
            const layoutEntry = entry as PerformanceEntryWithValue;
            if (!layoutEntry.hadRecentInput) {
              clsValue += layoutEntry.value;
              if (process.env.NODE_ENV === 'development') {
                console.log('CLS:', clsValue);
              }
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        return () => clsObserver.disconnect();
      } catch (e) {
        console.debug('CLS monitoring not supported');
      }
    }

    // Measure navigation timing
    window.addEventListener('load', () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Time:', pageLoadTime + 'ms');
        console.log('Connect Time:', connectTime + 'ms');
        console.log('Render Time:', renderTime + 'ms');
      }
    });
  }, []);
};

interface PerformanceEntryWithValue extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
}
