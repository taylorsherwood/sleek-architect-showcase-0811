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
    <section className="relative bg-primary overflow-hidden">
      {/* Architectural grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6 py-14 md:py-20">
        {/* Typography block */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] mb-6 font-medium"
            style={{ color: "hsl(42 37% 62%)" }}>
            AUSTIN LUXURY REAL ESTATE
          </p>

          <h2 className="text-[1.75rem] md:text-[2.75rem] lg:text-[3.25rem] font-display font-light leading-[1.1] mb-5"
            style={{ color: "hsl(42 20% 92%)" }}>
            Find Exceptional Homes
            <br />
            <span className="italic font-normal" style={{ color: "hsl(42 37% 67%)" }}>
              in Austin
            </span>
          </h2>

          <div className="w-12 h-px mx-auto mb-6" style={{ background: "hsl(42 37% 62% / 0.3)" }} />

          <p className="text-sm md:text-[15px] font-light max-w-md mx-auto leading-[1.7] tracking-wide"
            style={{ color: "hsl(42 10% 70% / 0.6)" }}>
            Search luxury homes, land, and investment opportunities
            with a smarter home search experience.
          </p>
        </div>

        {/* Widget container — architectural framing */}
        <div className="max-w-[52rem] mx-auto px-2 md:px-0">
          <div className="relative">
            {/* Outer glow frame */}
            <div className="absolute -inset-px rounded-2xl opacity-20 pointer-events-none"
              style={{ background: "linear-gradient(135deg, hsl(42 37% 67% / 0.2), transparent 40%, transparent 60%, hsl(42 37% 67% / 0.1))" }}
            />

            <div
              ref={containerRef}
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

export default RealScoutSearch;
