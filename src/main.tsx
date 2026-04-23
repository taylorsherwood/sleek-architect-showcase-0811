import { StrictMode, useLayoutEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./index.css";

const rootElement = document.getElementById("root");
const routePendingAttribute = "data-route-pending";

const hasHydratableMarkup = (root: HTMLElement) => {
  const elementChildren = Array.from(root.children);
  return elementChildren.some((child) => child.tagName !== "NOSCRIPT");
};

const getServerRenderedPath = () => {
  const canonicalHref = document
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href");

  if (!canonicalHref) return null;

  try {
    return new URL(canonicalHref, window.location.origin).pathname;
  } catch {
    return null;
  }
};

const shouldHydrate = (root: HTMLElement) => {
  if (!hasHydratableMarkup(root)) return false;

  const requestedPath = window.location.pathname;
  const serverRenderedPath = getServerRenderedPath();

  if (!serverRenderedPath) return true;

  return requestedPath === serverRenderedPath;
};

const revealInitialRoute = () => {
  document.documentElement.removeAttribute(routePendingAttribute);
};

const RouteReady = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    revealInitialRoute();
  }, []);

  return children;
};

const app = (
  <StrictMode>
    <RouteReady>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="architecture-theme">
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </RouteReady>
  </StrictMode>
);

if (rootElement) {
  if (shouldHydrate(rootElement)) {
    hydrateRoot(rootElement, app);
  } else {
    rootElement.replaceChildren();
    createRoot(rootElement).render(app);
  }
}

