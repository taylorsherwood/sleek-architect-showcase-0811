import { useEffect, useRef, useState } from "react";

const REALSCOUT_SCRIPT_SRC = "https://em.realscout.com/widgets/realscout-web-components.umd.js";
const REALSCOUT_SCRIPT_ID = "realscout-web-components-script";

const RealScoutSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = "";

      const widget = document.createElement("realscout-advanced-search");
      widget.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");

      containerRef.current.appendChild(widget);
      setIsReady(true);
      setHasError(false);
    };

    const onScriptReady = () => {
      if (window.customElements?.get("realscout-advanced-search")) {
        mountWidget();
        return;
      }

      window.setTimeout(() => {
        if (window.customElements?.get("realscout-advanced-search")) {
          mountWidget();
        } else if (!cancelled) {
          setHasError(true);
        }
      }, 250);
    };

    if (window.customElements?.get("realscout-advanced-search")) {
      mountWidget();
      return () => {
        cancelled = true;
      };
    }

    let script = document.getElementById(REALSCOUT_SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = REALSCOUT_SCRIPT_ID;
      script.src = REALSCOUT_SCRIPT_SRC;
      script.async = true;
      script.onload = onScriptReady;
      script.onerror = () => {
        if (!cancelled) setHasError(true);
      };
      document.head.appendChild(script);
    } else if (window.customElements?.get("realscout-advanced-search")) {
      mountWidget();
    } else {
      script.addEventListener("load", onScriptReady, { once: true });
      script.addEventListener("error", () => {
        if (!cancelled) setHasError(true);
      }, { once: true });
    }

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <h2 className="font-display text-3xl font-light tracking-tight text-primary-foreground md:text-5xl">
              Search Austin Properties
            </h2>
          </div>

          <div className="w-full">
            <div
              ref={containerRef}
              className="w-full"
              style={{ position: "relative", zIndex: 1, pointerEvents: "auto" }}
            />

            {!isReady && !hasError && (
              <p className="mt-4 text-center text-sm text-primary-foreground/70">
                Loading property search…
              </p>
            )}

            {hasError && (
              <p className="mt-4 text-center text-sm text-primary-foreground/70">
                Property search is temporarily unavailable. Please refresh the page.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealScoutSearch;

