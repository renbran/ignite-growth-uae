import { useEffect } from 'react';

/**
 * Hook to register and manage the service worker
 * Enables offline support and intelligent caching
 */
export const useServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported in this browser');
      return;
    }

    // Register service worker
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New service worker is ready, show update notification
                console.log(
                  'New service worker available. Refresh to update.'
                );

                // Optional: Send message to user
                if (window.confirm(
                  'A new version of the site is available. Refresh to update?'
                )) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });

    // Listen for controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed');
    });
  }, []);
};

export default useServiceWorker;
