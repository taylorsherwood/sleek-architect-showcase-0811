/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    "realscout-advanced-search": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "agent-encoded-id": string;
    };
  }
}
