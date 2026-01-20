import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";

// Initialize Sentry for error tracking and performance monitoring
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 1.0, // 100% in dev, reduce to 0.1 in production
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% when errors occur
    environment: import.meta.env.MODE,
  });
}

const ensureFavicon = () => {
	const href = "/favicon.ico";
	const existing = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

	if (existing) {
		existing.href = href;
	} else {
		const link = document.createElement("link");
		link.rel = "icon";
		link.href = href;
		document.head.appendChild(link);
	}
};

// Register service worker for offline support and caching
const registerServiceWorker = () => {
	if (!('serviceWorker' in navigator)) {
		console.log('Service Worker not supported');
		return;
	}

	navigator.serviceWorker
		.register('/sw.js', { scope: '/' })
		.then((registration) => {
			console.log('✅ Service Worker registered for offline support');

			// Check for updates every minute
			setInterval(() => {
				registration.update();
			}, 60000);
		})
		.catch((error) => {
			console.log('⚠️ Service Worker registration failed:', error);
		});
};

ensureFavicon();
registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
