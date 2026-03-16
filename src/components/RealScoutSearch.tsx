import { useEffect, useRef } from "react";

const RealScoutSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = document.createElement("realscout-advanced-search");
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    containerRef.current.appendChild(el);

    return () => {
      if (containerRef.current && el.parentNode === containerRef.current) {
        containerRef.current.removeChild(el);
      }
    };
  }, []);

  return (
    <section className="relative bg-primary overflow-hidden -mt-px">
      {/* No top gradient needed — hero bleeds directly into this bg */}

      <div className="relative container mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-24">
        {/* Typography block */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.4em] mb-7 font-normal"
            style={{ color: "hsl(42 30% 58%)" }}
          >
            AUSTIN LUXURY REAL ESTATE
          </p>

          <h2
            className="font-display font-light leading-[1.06] mb-6"
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
              color: "hsl(42 15% 90%)",
              letterSpacing: "-0.015em",
            }}
          >
            Find Exceptional Homes
            <br />
            <span className="italic" style={{ color: "hsl(42 30% 62%)" }}>
              in Austin
            </span>
          </h2>

          <div
            className="w-10 h-px mx-auto mb-7"
            style={{ background: "hsl(42 30% 55% / 0.2)" }}
          />

          <p
            className="text-[13px] md:text-sm font-light max-w-sm mx-auto leading-[1.8] tracking-[0.02em]"
            style={{ color: "hsl(42 10% 60% / 0.5)" }}
          >
            Search luxury homes, land, and investment opportunities
            with a smarter home search experience.
          </p>
        </div>

        {/* Widget container — floating above the dark bg */}
        <div className="max-w-[50rem] mx-auto">
          <div
            ref={containerRef}
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              boxShadow:
                "0 30px 70px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default RealScoutSearch;
