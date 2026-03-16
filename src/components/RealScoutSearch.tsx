import { useEffect, useRef } from "react";

const RealScoutSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the RealScout advanced search web component
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
    <section className="relative bg-primary">
      {/* Subtle top fade connecting to hero */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p
            className="text-minimal mb-5"
            style={{ color: "hsl(42 37% 67%)" }}
          >
            AUSTIN LUXURY REAL ESTATE
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-[3.4rem] font-display font-light text-warm-cream leading-[1.12] mb-6">
            Find Exceptional Homes{" "}
            <span className="italic">in Austin</span>
          </h2>
          <p className="text-warm-cream/55 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Search luxury homes, land, and real estate opportunities with a
            smarter home search experience.
          </p>
        </div>

        {/* Search widget container — generous breathing room, soft integration */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="w-full rounded-lg overflow-hidden"
            style={{
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RealScoutSearch;
