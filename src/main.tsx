import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./index.css";

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="architecture-theme">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}

