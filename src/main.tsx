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

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
