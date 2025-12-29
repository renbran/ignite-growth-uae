/**
 * Cache Control Headers for Cloudflare Pages
 * Add to public/_headers file
 * This file defines optimal caching strategies for different asset types
 */

export const cacheHeaderConfig = {
  // HTML pages - revalidate frequently
  html: {
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    'CDN-Cache-Control': 'max-age=3600',
  },

  // JavaScript/CSS - long-term caching with hash
  assets: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'CDN-Cache-Control': 'max-age=31536000',
  },

  // Images - moderate caching
  images: {
    'Cache-Control': 'public, max-age=604800, s-maxage=604800',
    'CDN-Cache-Control': 'max-age=604800',
  },

  // Fonts - very long caching
  fonts: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'CDN-Cache-Control': 'max-age=31536000',
  },

  // API calls - no caching
  api: {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'CDN-Cache-Control': 'max-age=0',
  },
};

export default cacheHeaderConfig;
