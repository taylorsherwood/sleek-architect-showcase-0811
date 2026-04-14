import { createElement, useEffect, useRef, useState } from "react";

const GOLD_HSL = "hsl(41, 36%, 57%)";
const REALSCOUT_URL = "https://taylorsherwood.realscout.com/";

const RealScoutSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const injectStyles = () => {
      const widget = el.querySelector("realscout-advanced-search");
      if (!widget?.shadowRoot) return;

      if (widget.shadowRoot.querySelector("#rs-custom-styles")) return;

      const style = document.createElement("style");
      style.id = "rs-custom-styles";
      style.textContent = `
        button[type="submit"],
        .search-button,
        [class*="search"] button,
        [class*="Submit"],
        [class*="submit"],
        input[type="submit"] {
          background-color: ${GOLD_HSL} !important;
          border-color: ${GOLD_HSL} !important;
        }
      `;
      widget.shadowRoot.appendChild(style);
    };

    injectStyles();
    const observer = new MutationObserver(() => injectStyles());
    observer.observe(el, { childList: true, subtree: true });

    const timers = [500, 1500, 3000].map((ms) =>
      setTimeout(injectStyles, ms)
    );

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [isMobile]);

  return (
    <section id="realscout-search" className="bg-background pt-16 pb-12 md:pt-20 md:pb-16">
      <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <header className="mb-12 md:mb-16 text-center">
              <p
                className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-5 font-medium text-foreground/40"
              >
                Explore the Market
              </p>
              <h3
                className="font-display text-3xl md:text-[2.8rem] font-light leading-[1.1] tracking-[-0.01em] text-foreground"
              >
                Find Your Next
                <span className="italic text-[hsl(var(--gold))]"> Chapter</span>
              </h3>
              <p className="mt-4 text-sm md:text-[15px] text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
                Search luxury homes, land, and investment opportunities across Austin's most coveted neighborhoods.
              </p>
            </header>
          </div>

          {isMobile ? (
            <div className="text-center">
              <a
                href={REALSCOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-luxury inline-block"
              >
                SEARCH NOW
              </a>
            </div>
          ) : (
            <div ref={containerRef} className="mx-auto max-w-5xl" style={{ minHeight: 120 }}>
              {createElement("realscout-advanced-search", {
                "agent-encoded-id": "QWdlbnQtMjg5NDU2",
              })}
              <noscript>
                <p className="text-center text-muted-foreground py-4">
                  <a href={REALSCOUT_URL} className="underline">Search Austin homes on our listings portal →</a>
                </p>
              </noscript>
            </div>
          )}
      </div>
    </section>
  );
};

export default RealScoutSearch;
