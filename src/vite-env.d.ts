/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "realscout-advanced-search": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "agent-encoded-id": string;
    };
  }
}
