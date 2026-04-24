import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type Scene = {
  name: string;
  slug: string;
  meta: string;
  insight: string;
  image: string;
  index: string;
};

const SCENES: Scene[] = [
  {
    index: "01",
    name: "Westlake",
    slug: "westlake-hills",
    meta: "Hill Country · Eanes ISD",
    insight:
      "Estate privacy, topographical scarcity, and long-term luxury demand.",
    image: "/static-assets/community-westlake-hills.webp",
  },
  {
    index: "02",
    name: "Tarrytown",
    slug: "tarrytown",
    meta: "Central Austin · Heritage",
    insight:
      "Central Austin heritage, quiet streets, and enduring resale strength.",
    image: "/static-assets/community-tarrytown.webp",
  },
  {
    index: "03",
    name: "Downtown Austin",
    slug: "downtown-austin",
    meta: "Skyline · Walkable",
    insight:
      "Vertical living, walkability, skyline energy, and lock-and-leave convenience.",
    image: "/static-assets/community-downtown.webp",
  },
  {
    index: "04",
    name: "Lake Austin",
    slug: "lake-austin",
    meta: "Waterfront · Private Access",
    insight:
      "Waterfront scarcity, private access, and lifestyle-driven value.",
    image: "/static-assets/community-lake-austin.webp",
  },
  {
    index: "05",
    name: "Barton Creek",
    slug: "barton-creek",
    meta: "Gated · Golf · Resort",
    insight:
      "Gated privacy, acreage feel, golf access, and resort-style living.",
    image: "/static-assets/community-barton-creek.webp",
  },
];

const MapBackdrop = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1600 900"
  >
    <defs>
      <pattern id="ame-grid" width="44" height="44" patternUnits="userSpaceOnUse">
        <path
          d="M 44 0 L 0 0 0 44"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />
      </pattern>
      <radialGradient id="ame-fade" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(8,11,26,0.55)" />
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#ame-grid)" />
    <g fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1">
      <path d="M -50 320 Q 200 260 420 300 T 880 280 T 1320 320 T 1700 300" />
      <path d="M -50 380 Q 220 330 460 360 T 920 340 T 1360 380 T 1700 360" />
      <path d="M -50 460 Q 260 410 500 440 T 980 420 T 1420 460 T 1700 440" />
      <path d="M -50 540 Q 240 500 480 520 T 940 500 T 1400 540 T 1700 520" />
      <path d="M -50 620 Q 280 580 520 600 T 1000 580 T 1440 620 T 1700 600" />
    </g>
    <g fill="none" stroke="#b9a06c" strokeOpacity="0.18" strokeWidth="1.25">
      <path d="M 200 480 Q 380 420 560 480 T 940 500 Q 1080 520 1180 470" />
      <path d="M 220 500 Q 400 440 580 500 T 960 520 Q 1100 540 1200 490" />
    </g>
    <rect width="1600" height="900" fill="url(#ame-fade)" />
  </svg>
);

const AustinMarketExplorer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll progress → active scene (desktop sticky)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // total scrollable distance within the section
        const total = el.offsetHeight - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = scrolled / total; // 0 → 1
        // Map progress across SCENES.length steps
        const step = Math.min(
          SCENES.length - 1,
          Math.floor(progress * SCENES.length)
        );
        setActive((prev) => (prev === step ? prev : step));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      aria-labelledby="ame-heading"
      className="relative bg-background"
    >
      {/* Intro band */}
      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
            EXPLORE THE MARKET
          </p>
          <h2
            id="ame-heading"
            className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-display font-normal text-architectural leading-[1.1] tracking-[0.02em] mb-5"
          >
            Austin Is Not <span className="text-gold italic">One Market</span>
          </h2>
          <p
            className="text-muted-foreground mx-auto leading-[1.7] max-w-2xl"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "15px",
              letterSpacing: "0.015em",
            }}
          >
            Each neighborhood carries its own rhythm, constraints, buyer
            psychology, and long-term value profile. Scroll through the markets
            Echelon helps clients understand.
          </p>
        </div>
      </div>

      {/* DESKTOP — Sticky-scroll cinematic */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${SCENES.length * 80}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080B1A]">
          {/* Layered images — crossfade */}
          <div className="absolute inset-0">
            {SCENES.map((s, i) => (
              <div
                key={s.slug}
                className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i === active ? undefined : true}
              >
                <img
                  src={s.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                {/* image grading */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(8,11,26,0.78) 0%, rgba(8,11,26,0.55) 38%, rgba(8,11,26,0.30) 70%, rgba(8,11,26,0.55) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,11,26,0.30) 0%, rgba(8,11,26,0) 30%, rgba(8,11,26,0) 60%, rgba(8,11,26,0.55) 100%)",
                  }}
                />
              </div>
            ))}
            {/* Map texture overlay */}
            <div className="absolute inset-0 opacity-70 mix-blend-screen">
              <MapBackdrop />
            </div>
          </div>

          {/* Foreground content */}
          <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
            <div className="grid grid-cols-12 gap-8 w-full items-center">
              {/* Left — index ticker */}
              <div className="col-span-3 lg:col-span-2">
                <ul className="space-y-4">
                  {SCENES.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <li
                        key={s.slug}
                        className="flex items-center gap-3 transition-all duration-500"
                        style={{ opacity: isActive ? 1 : 0.38 }}
                      >
                        <span
                          className="block h-px transition-all duration-700"
                          style={{
                            width: isActive ? 36 : 14,
                            background: isActive ? "#b9a06c" : "rgba(255,255,255,0.5)",
                          }}
                        />
                        <span
                          className="text-warm-cream"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "10.5px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontWeight: isActive ? 500 : 300,
                          }}
                        >
                          {s.index} {s.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Center / right — active scene copy */}
              <div className="col-span-9 lg:col-span-7 lg:col-start-5 relative">
                {SCENES.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.slug}
                      className="absolute inset-0 transition-all duration-[900ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateY(0)"
                          : i < active
                            ? "translateY(-16px)"
                            : "translateY(16px)",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      aria-hidden={isActive ? undefined : true}
                    >
                      <p
                        className="text-gold mb-4"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "11px",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.meta}
                      </p>
                      <h3
                        className="font-display text-warm-cream leading-[1.04] tracking-[0.01em] mb-6"
                        style={{
                          fontSize: "clamp(40px, 5.4vw, 76px)",
                          fontWeight: 400,
                          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                        }}
                      >
                        {s.name}
                      </h3>
                      <p
                        className="text-warm-cream/85 max-w-[560px] leading-[1.65] mb-8"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "17px",
                          letterSpacing: "0.01em",
                          textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                        }}
                      >
                        {s.insight}
                      </p>
                      <Link
                        to={`/communities/${s.slug}`}
                        className="inline-flex items-center gap-3 group/cta"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "11px",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#fff",
                        }}
                      >
                        <span className="relative pb-1">
                          Advisory On {s.name}
                          <span className="absolute left-0 bottom-0 h-px w-full bg-gold scale-x-100 origin-left transition-transform duration-500" />
                        </span>
                        <span
                          className="text-gold transition-transform duration-500 group-hover/cta:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  );
                })}
                {/* spacer to reserve height */}
                <div aria-hidden="true" style={{ height: 360 }} />
              </div>
            </div>
          </div>

          {/* Bottom progress rail */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-gold transition-[width] duration-500 ease-out"
              style={{
                width: `${((active + 1) / SCENES.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* MOBILE — stacked step-by-step scenes */}
      <div className="md:hidden">
        {SCENES.map((s, i) => (
          <article
            key={s.slug}
            className="relative w-full overflow-hidden"
            style={{ minHeight: "82vh" }}
          >
            <img
              src={s.image}
              alt={`${s.name}, Austin`}
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,11,26,0.30) 0%, rgba(8,11,26,0.55) 55%, rgba(8,11,26,0.85) 100%)",
              }}
            />
            <div className="relative z-10 h-full min-h-[82vh] flex flex-col justify-end px-6 pb-12 pt-24">
              <p
                className="text-gold mb-3"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                {s.index} · {s.meta}
              </p>
              <h3
                className="font-display text-warm-cream mb-4 leading-[1.05]"
                style={{ fontSize: "38px", fontWeight: 400 }}
              >
                {s.name}
              </h3>
              <p
                className="text-warm-cream/85 mb-6 leading-[1.6]"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "15px",
                }}
              >
                {s.insight}
              </p>
              <Link
                to={`/communities/${s.slug}`}
                className="inline-flex items-center gap-2 self-start"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#fff",
                  borderBottom: "1px solid #b9a06c",
                  paddingBottom: 4,
                }}
              >
                Advisory On {s.name} <span className="text-gold">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Final CTAs */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/communities"
            className="inline-block text-center px-7 py-[14px]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              border: "2px solid #b9a06c",
              color: "#fff",
              background: "#b9a06c",
              transition: "background 250ms ease, color 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#b9a06c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#b9a06c";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Explore Austin Communities
          </Link>
          <Link
            to="/austin-luxury-homes-for-sale"
            className="inline-block text-center px-7 py-[14px]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 400,
              border: "1px solid hsl(var(--foreground) / 0.35)",
              color: "hsl(var(--foreground))",
              background: "transparent",
              transition:
                "background 250ms ease, border-color 250ms ease, color 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--foreground))";
              e.currentTarget.style.color = "hsl(var(--background))";
              e.currentTarget.style.borderColor = "hsl(var(--foreground))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "hsl(var(--foreground))";
              e.currentTarget.style.borderColor =
                "hsl(var(--foreground) / 0.35)";
            }}
          >
            View Active Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AustinMarketExplorer;
