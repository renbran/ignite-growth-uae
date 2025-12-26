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
	const href = "/favicon.svg";
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

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
