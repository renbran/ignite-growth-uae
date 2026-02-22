import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    sitemap({
      hostname: "https://sgctech.ai",
      generateRobotsTxt: false,
      exclude: [
        "/404",
        "/test-video",
        "/downloads/erp-buyers-guide-2025",
        "/downloads/erp-implementation-checklist",
        "/downloads/uae-vat-compliance-audit-kit",
      ],
      dynamicRoutes: [
        "/solutions",
        "/industries",
        "/pricing",
        "/about",
        "/resources",
        "/book-consultation",
        "/free-trial",
        "/privacy",
        "/terms",
        "/article/ai-automation-data-entry-reduction",
        "/article/vat-phase-2-compliance-guide",
        "/article/erp-implementation-failures",
        "/article/real-estate-crm-integration",
        "/article/measuring-digital-transformation-roi",
        "/article/legacy-to-cloud-manufacturing",
      ],
      priority: 0.8,
      changefreq: "weekly",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // esbuild is Vite's built-in minifier: 10x faster and far less memory than terser
    minify: 'esbuild',
    // Increase chunk size warning limit (we're optimizing)
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Smart code splitting for better caching
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`,
        // Manual chunks for better control and caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-slot',
          ],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-utils': ['clsx', 'class-variance-authority', 'tailwind-merge', 'date-fns'],
          'vendor-analytics': ['posthog-js'],
        },
      },
    },
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
  },
}));
