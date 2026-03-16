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

      {/* ── Subtle grain texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── Architectural line pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Radial spotlight behind search widget ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          bottom: "20%",
          transform: "translateX(-50%)",
          width: "70vw",
          maxWidth: "900px",
          height: "500px",
          background: "radial-gradient(ellipse at center, hsl(233 40% 14% / 0.7) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-24" style={{ zIndex: 1 }}>
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

          <div
            className="w-10 h-px mx-auto mb-7"
            style={{ background: "hsl(42 45% 65% / 0.25)" }}
          />

          <p
            className="text-[13px] md:text-sm font-light max-w-sm mx-auto leading-[1.8] tracking-[0.02em]"
            style={{ color: "hsl(42 10% 75% / 0.6)" }}
          >
            Search luxury homes, land, and investment opportunities
            with a smarter home search experience.
          </p>
        </div>

        {/* ── Glass widget container ── */}
        <div className="max-w-[50rem] mx-auto relative">
          {/* Soft glow behind the glass panel */}
          <div
            className="absolute -inset-8 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, hsl(233 40% 16% / 0.5) 0%, transparent 70%)",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: "0 20px 50px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              ref={containerRef}
              className="relative w-full rounded-2xl overflow-hidden"
            />
          </div>
        </div>
      </div>

      {/* Scroll-driven bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none transition-none"
        style={{
          zIndex: 2,
          height: `${6 + fadeProgress * 18}rem`,
          opacity: 0.3 + fadeProgress * 0.7,
          background: `linear-gradient(to bottom, transparent, hsl(var(--background)))`,
        }}
      />
    </section>
  );
};

export default RealScoutSearch;
