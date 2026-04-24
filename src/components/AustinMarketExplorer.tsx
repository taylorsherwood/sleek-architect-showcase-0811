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
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};

const MapBackdrop = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 h-full w-full pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1600 900"
  >
    <defs>
      <pattern id="ame-grid" width="44" height="44" patternUnits="userSpaceOnUse">
        <path
          d="M 44 0 L 0 0 0 44"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="1600" height="900" fill="url(#ame-grid)" />
    <g fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1">
      <path d="M -50 320 Q 200 260 420 300 T 880 280 T 1320 320 T 1700 300" />
      <path d="M -50 420 Q 260 360 500 400 T 980 390 T 1420 430 T 1700 410" />
      <path d="M -50 540 Q 240 500 480 520 T 940 500 T 1400 540 T 1700 520" />
    </g>
    <g fill="none" stroke="#b9a06c" strokeOpacity="0.22" strokeWidth="1.15">
      <path d="M 140 500 Q 320 430 520 480 T 940 510 Q 1110 530 1240 470" />
      <path d="M 120 560 Q 300 500 500 545 T 920 575 Q 1090 595 1220 535" />
    </g>
  </svg>
);

const AustinMarketExplorer = () => {
  const reducedMotion = usePrefersReducedMotion();
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeScene = SCENES[active];

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const nextIndex = steps.findIndex((step) => step === visibleEntry.target);
        if (nextIndex >= 0) {
          setActive((previous) => (previous === nextIndex ? previous : nextIndex));
        }
      },
      {
        rootMargin: "-36% 0px -36% 0px",
        threshold: [0, 0.35, 0.7, 1],
      }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const imageTransition = useMemo(
    () =>
      reducedMotion
        ? "none"
        : "opacity 850ms ease, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
    [reducedMotion]
  );

  const copyTransition = useMemo(
    () =>
      reducedMotion
        ? "none"
        : "opacity 500ms ease, transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
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

      <div className="hidden md:block bg-[hsl(222_40%_8%)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="col-span-7 sticky top-24 h-[calc(100vh-7rem)] min-h-[560px] max-h-[760px] py-8">
              <div className="relative h-full overflow-hidden bg-primary">
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
                            ? "scale(1.035) translateY(-1.5%)"
                            : "scale(0.985) translateY(1.5%)",
                        transition: imageTransition,
                        willChange: "opacity, transform",
                      }}
                      aria-hidden={isActive ? undefined : true}
                    >
                      <img
                        src={scene.image}
                        alt={isActive ? `${scene.name}, Austin` : ""}
                        width={1600}
                        height={1000}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "low"}
                        sizes="(max-width: 1280px) 58vw, 760px"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(8,11,26,0.78) 0%, rgba(8,11,26,0.30) 48%, rgba(8,11,26,0.64) 100%)",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(8,11,26,0.24) 0%, rgba(8,11,26,0.08) 42%, rgba(8,11,26,0.78) 100%)",
                        }}
                      />
                    </div>
                  );
                })}
                <div className="absolute inset-0 opacity-65 mix-blend-screen">
                  <MapBackdrop />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-10">
                  <ul className="flex flex-wrap gap-x-5 gap-y-3">
                    {SCENES.map((scene, index) => {
                      const isActive = index === active;
                      return (
                        <li
                          key={scene.slug}
                          className="flex items-center gap-2"
                          style={{
                            opacity: isActive ? 1 : 0.44,
                            transition: reducedMotion ? "none" : "opacity 450ms ease",
                          }}
                        >
                          <span
                            className="block h-px"
                            style={{
                              width: isActive ? 30 : 12,
                              background: isActive ? "#b9a06c" : "rgba(255,255,255,0.34)",
                              transition: reducedMotion
                                ? "none"
                                : "width 600ms ease, background 600ms ease",
                            }}
                          />
                          <span
                            className="text-warm-cream"
                            style={{
                              fontFamily: '"Jost", sans-serif',
                              fontSize: "10px",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              fontWeight: isActive ? 500 : 300,
                            }}
                          >
                            {scene.index}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="max-w-[620px]">
                    <p
                      className="text-gold mb-4"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "11px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                      }}
                    >
                      {activeScene.meta}
                    </p>
                    <h3
                      className="font-display text-warm-cream leading-[1.04] tracking-[0.01em] mb-5"
                      style={{
                        fontSize: "clamp(44px, 5.2vw, 82px)",
                        fontWeight: 400,
                        textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                      }}
                    >
                      {activeScene.name}
                    </h3>
                    <p
                      className="text-warm-cream/86 max-w-[560px] leading-[1.65]"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "17px",
                        letterSpacing: "0.01em",
                        textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                      }}
                    >
                      {activeScene.insight}
                    </p>
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

            <div className="col-span-5 py-8">
              {SCENES.map((scene, index) => {
                const isActive = index === active;
                return (
                  <article
                    key={scene.slug}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    className="min-h-[62vh] flex items-center border-b border-white/10"
                  >
                    <div
                      className="max-w-[30rem] py-12"
                      style={{
                        opacity: isActive ? 1 : 0.48,
                        transform: isActive ? "translateY(0)" : "translateY(8px)",
                        transition: copyTransition,
                      }}
                    >
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
                        style={{ fontSize: "clamp(30px, 3vw, 42px)", fontWeight: 400 }}
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
                );
              })}

              <div className="py-12 flex flex-col items-start gap-4">
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
