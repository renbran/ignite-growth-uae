import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Automatically scrolls the window to the top when the route changes.
 * Also handles hash-based navigation for smooth scrolling to sections.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll if hash is present and not empty
    if (hash && hash.length > 1) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    // Otherwise, do nothing (no scroll on page open)
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
