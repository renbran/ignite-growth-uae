import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

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
