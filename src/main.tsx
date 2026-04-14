import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./index.css";

const rootElement = document.getElementById("root");

const hasHydratableMarkup = (root: HTMLElement) => {
  const elementChildren = Array.from(root.children);
  return elementChildren.some((child) => child.tagName !== "NOSCRIPT");
};

const app = (
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="architecture-theme">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement && hasHydratableMarkup(rootElement)) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}

