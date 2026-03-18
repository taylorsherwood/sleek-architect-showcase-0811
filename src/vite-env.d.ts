/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }

  namespace JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-encoded-id": string;
      };
    }
  }
}
