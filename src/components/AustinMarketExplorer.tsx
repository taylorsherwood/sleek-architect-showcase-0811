import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

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
    insight: "Waterfront scarcity, private access, and lifestyle-driven value.",
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

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};

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
        <stop offset="100%" stopColor="rgba(8,11,26,0.60)" />
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
    <g fill="none" stroke="#b9a06c" strokeOpacity="0.18" strokeWidth="1.15">
      <path d="M 140 500 Q 320 430 520 480 T 940 510 Q 1110 530 1240 470" />
      <path d="M 120 560 Q 300 500 500 545 T 920 575 Q 1090 595 1220 535" />
    </g>
    <rect width="1600" height="900" fill="url(#ame-fade)" />
  </svg>
);

const AustinMarketExplorer = () => {
  const reducedMotion = usePrefersReducedMotion();
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const steps = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!steps.length) return;

    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target, entry.intersectionRatio);
        });

        let bestIndex = active;
        let bestRatio = -1;

        steps.forEach((step, index) => {
          const ratio = visible.get(step) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        setActive((prev) => (prev === bestIndex ? prev : bestIndex));
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [reducedMotion, active]);

  const imageTransition = useMemo(
    () =>
      reducedMotion
        ? "none"
        : "opacity 900ms ease, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
    [reducedMotion]
  );

  const copyTransition = useMemo(
    () =>
      reducedMotion
        ? "none"
        : "opacity 650ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
    [reducedMotion]
  );

  return (
    <section aria-labelledby="ame-heading" className="relative bg-background">
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

      <div className="hidden md:grid md:grid-cols-12 bg-[hsl(222_40%_8%)]">
        <div className="col-span-7 relative min-h-screen">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0">
              {SCENES.map((scene, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={scene.slug}
                    className="absolute inset-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "scale(1) translateY(0)"
                        : index < active
                          ? "scale(1.04) translateY(-1.5%)"
                          : "scale(0.985) translateY(1.5%)",
                      transition: imageTransition,
                      willChange: "opacity, transform",
                    }}
                    aria-hidden={isActive ? undefined : true}
                  >
                    <img
                      src={scene.image}
                      alt=""
                      width={1600}
                      height={900}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(8,11,26,0.82) 0%, rgba(8,11,26,0.54) 34%, rgba(8,11,26,0.28) 68%, rgba(8,11,26,0.52) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,11,26,0.34) 0%, rgba(8,11,26,0.08) 30%, rgba(8,11,26,0.12) 70%, rgba(8,11,26,0.62) 100%)",
                      }}
                    />
                  </div>
                );
              })}
              <div className="absolute inset-0 opacity-75 mix-blend-screen">
                <MapBackdrop />
              </div>
            </div>

            <div className="relative z-10 h-full px-10 lg:px-14 py-14 flex flex-col justify-center">
              <div className="max-w-[620px] ml-auto lg:ml-28 xl:ml-36">
                <div className="mb-10">
                  <ul className="space-y-4">
                    {SCENES.map((scene, index) => {
                      const isActive = index === active;
                      return (
                        <li
                          key={scene.slug}
                          className="flex items-center gap-3"
                          style={{
                            opacity: isActive ? 1 : 0.32,
                            transition: reducedMotion ? "none" : "opacity 500ms ease",
                          }}
                        >
                          <span
                            className="block h-px"
                            style={{
                              width: isActive ? 56 : 18,
                              background: isActive ? "#b9a06c" : "rgba(255,255,255,0.28)",
                              transition: reducedMotion
                                ? "none"
                                : "width 700ms ease, background 700ms ease",
                            }}
                          />
                          <span
                            className="text-warm-cream"
                            style={{
                              fontFamily: '"Jost", sans-serif',
                              fontSize: "10.5px",
                              letterSpacing: "0.24em",
                              textTransform: "uppercase",
                              fontWeight: isActive ? 500 : 300,
                            }}
                          >
                            {scene.index} {scene.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="relative min-h-[280px] lg:min-h-[320px]">
                  {SCENES.map((scene, index) => {
                    const isActive = index === active;
                    return (
                      <div
                        key={scene.slug}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? "translateY(0)"
                            : index < active
                              ? "translateY(-18px)"
                              : "translateY(18px)",
                          transition: copyTransition,
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
                          {scene.meta}
                        </p>
                        <h3
                          className="font-display text-warm-cream leading-[1.04] tracking-[0.01em] mb-6"
                          style={{
                            fontSize: "clamp(42px, 5.2vw, 76px)",
                            fontWeight: 400,
                            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                          }}
                        >
                          {scene.name}
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
                          {scene.insight}
                        </p>
                        <Link
                          to={`/communities/${scene.slug}`}
                          className="inline-flex items-center gap-3"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "11px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#fff",
                          }}
                        >
                          <span className="relative pb-1">
                            Advisory On {scene.name}
                            <span className="absolute left-0 bottom-0 h-px w-full bg-gold" />
                          </span>
                          <span className="text-gold" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
              <div
                className="h-full bg-gold"
                style={{
                  width: `${((active + 1) / SCENES.length) * 100}%`,
                  transition: reducedMotion ? "none" : "width 500ms ease-out",
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-5 relative bg-[hsl(222_40%_8%)]/98 backdrop-blur-[2px]">
          {SCENES.map((scene, index) => (
            <article
              key={scene.slug}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="min-h-[88vh] flex items-center border-b border-white/8"
            >
              <div className="px-8 lg:px-12 xl:px-14 py-16 max-w-[30rem]">
                <p
                  className="text-gold mb-4"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  {scene.index} · {scene.meta}
                </p>
                <h3
                  className="font-display text-warm-cream leading-[1.06] tracking-[0.01em] mb-5"
                  style={{ fontSize: "clamp(30px, 3.3vw, 44px)", fontWeight: 400 }}
                >
                  {scene.name}
                </h3>
                <p
                  className="text-warm-cream/78 leading-[1.7] mb-7"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "15px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {scene.insight}
                </p>
                <Link
                  to={`/communities/${scene.slug}`}
                  className="inline-flex items-center gap-2"
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
                  Advisory On {scene.name} <span className="text-gold">→</span>
                </Link>
              </div>
            </article>
          ))}

          <div className="px-8 lg:px-12 xl:px-14 py-16 flex flex-col sm:flex-row sm:flex-wrap items-start gap-4 bg-[hsl(222_40%_8%)]">
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
                transition: reducedMotion ? "none" : "background 250ms ease, color 250ms ease",
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
                border: "1px solid rgba(255,255,255,0.28)",
                color: "#fff",
                background: "transparent",
                transition: reducedMotion
                  ? "none"
                  : "background 250ms ease, border-color 250ms ease, color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
              }}
            >
              View Active Listings
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-[hsl(222_40%_8%)]">
        {SCENES.map((scene, index) => (
          <article
            key={scene.slug}
            className="relative w-full overflow-hidden border-t border-white/8"
            style={{ minHeight: "82vh" }}
          >
            <img
              src={scene.image}
              alt={`${scene.name}, Austin`}
              width={780}
              height={1040}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,11,26,0.28) 0%, rgba(8,11,26,0.52) 50%, rgba(8,11,26,0.86) 100%)",
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
                {scene.index} · {scene.meta}
              </p>
              <h3
                className="font-display text-warm-cream mb-4 leading-[1.05]"
                style={{ fontSize: "38px", fontWeight: 400 }}
              >
                {scene.name}
              </h3>
              <p
                className="text-warm-cream/85 mb-6 leading-[1.6]"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "15px",
                }}
              >
                {scene.insight}
              </p>
              <Link
                to={`/communities/${scene.slug}`}
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
                Advisory On {scene.name} <span className="text-gold">→</span>
              </Link>
            </div>
          </article>
        ))}

        <div className="px-6 py-12 flex flex-col items-start gap-4">
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
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#fff",
              background: "transparent",
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
