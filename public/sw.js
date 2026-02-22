// Service Worker for offline support and intelligent caching
// This file needs to be in public/sw.js

const CACHE_NAME = 'ignite-growth-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Network first, fall back to cache (for API calls and dynamic content)
  networkFirst: async (request) => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      return cached || new Response('Offline - Content not available', { status: 503 });
    }
  },

  // Cache first, fall back to network (for static assets)
  cacheFirst: async (request) => {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return new Response('Offline - Asset not available', { status: 503 });
    }
  },

  // Stale while revalidate (best for performance)
  staleWhileRevalidate: async (request) => {
    const cached = await caches.match(request);
    const fetchPromise = fetch(request)
      .then(async (response) => {
        // If the response is invalid, just return it (or cached fallback handled below)
        const isCacheable = response && (response.ok || response.type === 'opaque');
        if (!isCacheable) {
          return response;
        }

        // Clone immediately before any async work to avoid "body used" errors
        const responseClone = response.clone();
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, responseClone);
        } catch (err) {
          // Don't crash the SW if caching fails; log and continue
          console.warn('SW cache put failed:', err);
        }
        return response;
      })
      .catch((err) => {
        // If network fetch fails, fall back to cache when possible
        console.warn('SW fetch failed in staleWhileRevalidate:', err);
        return cached || new Response('Offline - Resource not available', { status: 503 });
      });

    // Return cached response immediately if available, while refreshing in background
    return cached || fetchPromise;
  },
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.warn('Failed to cache static assets:', error);
      });
    })
  );
  // Force service worker to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external domains (except APIs we control)
  if (url.origin !== self.location.origin && !url.hostname.includes('supabase')) {
    return;
  }


  // Skip video/audio files — too large for Cache Storage
  // Browser handles video range-requests natively without SW interference
  if (
    request.destination === 'video' ||
    request.destination === 'audio' ||
    url.pathname.startsWith('/videos/') ||
    url.pathname.startsWith('/audio/') ||
    /.(mp4|webm|mov|mp3|wav|ogg)$/.test(url.pathname)
  ) {
    return;
  }
  // Strategy routing
  if (request.destination === 'document') {
    // HTML pages - network first
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    // Static assets - cache first
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else if (request.destination === 'image') {
    // Images - stale while revalidate
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
  } else if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    // API calls - network first
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else {
    // Default - stale while revalidate
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
  }
});

// Message event - allow clients to control cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
