import { useEffect, useRef, useState, useCallback } from "react";

const RealScoutSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [fadeProgress, setFadeProgress] = useState(0);

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

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const fadeZone = sectionHeight * 0.3;
    const distFromBottom = rect.bottom - window.innerHeight;

    if (distFromBottom > 0) {
      setFadeProgress(0);
    } else {
      const progress = Math.min(1, Math.abs(distFromBottom) / fadeZone);
      setFadeProgress(progress);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative bg-primary overflow-hidden -mt-px">
      <div className="relative container mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-24">
        {/* Typography block */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.4em] mb-7 font-normal"
            style={{ color: "hsl(42 45% 65%)" }}
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
            <span className="italic" style={{ color: "hsl(42 45% 68%)" }}>
              in Austin
            </span>
          </h2>

          <p
            className="text-[13px] md:text-sm font-light max-w-sm mx-auto leading-[1.8] tracking-[0.02em]"
            style={{ color: "hsl(42 10% 75% / 0.55)" }}
          >
            Search luxury homes, land, and investment opportunities
            with a smarter home search experience.
          </p>
        </div>

        {/* Widget container */}
        <div className="max-w-[50rem] mx-auto">
          <div
            ref={containerRef}
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              boxShadow: "0 20px 50px -15px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* Scroll-driven bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none transition-none"
        style={{
          zIndex: 2,
          height: `${6 + fadeProgress * 18}rem`,
          opacity: 0.3 + fadeProgress * 0.7,
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default RealScoutSearch;
