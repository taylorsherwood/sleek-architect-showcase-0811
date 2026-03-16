import { createElement, useEffect, useState } from "react";

const REALSCOUT_SCRIPT_ID = "realscout-web-components-script";

const RealScoutSearch = () => {
  const [scriptReady, setScriptReady] = useState(
    typeof window !== "undefined" && !!window.customElements?.get("realscout-advanced-search")
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.customElements?.get("realscout-advanced-search")) {
      setScriptReady(true);
      setHasError(false);
      return;
    }

    const script = document.getElementById(REALSCOUT_SCRIPT_ID) as HTMLScriptElement | null;

    const verifyWidget = () => {
      window.setTimeout(() => {
        if (window.customElements?.get("realscout-advanced-search")) {
          setScriptReady(true);
          setHasError(false);
        } else {
          setHasError(true);
        }
      }, 250);
    };

    if (script) {
      script.addEventListener("load", verifyWidget, { once: true });
      script.addEventListener(
        "error",
        () => {
          setHasError(true);
        },
        { once: true }
      );
      return;
    }

    setHasError(true);
  }, []);

  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 text-center">
            <h2 className="font-display text-3xl font-light tracking-tight text-primary-foreground md:text-5xl">
              Search Austin Properties
            </h2>
          </header>

          <div className="w-full" style={{ position: "relative", zIndex: 1, pointerEvents: "auto" }}>
            {scriptReady
              ? createElement("realscout-advanced-search", {
                  "agent-encoded-id": "QWdlbnQtMjg5NDU2",
                })
              : hasError
                ? (
                  <p className="text-center text-sm text-primary-foreground/70">
                    Property search is temporarily unavailable. Please refresh the page.
                  </p>
                )
                : (
                  <p className="text-center text-sm text-primary-foreground/70">
                    Loading property search…
                  </p>
                )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealScoutSearch;

