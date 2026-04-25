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
    name: "Downtown",
    slug: "downtown-austin",
    meta: "Skyline · Walkable",
    insight:
      "Vertical living, walkability, and lock-and-leave convenience.",
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
        rootMargin: "-38% 0px -38% 0px",
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
        : "opacity 850ms ease, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
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
    <section
      aria-labelledby="ame-heading"
      className="relative bg-[hsl(222_40%_8%)] text-warm-cream"
    >
      <div className="px-6 pt-20 md:pt-28 pb-10 md:pb-14">
        <div className="max-w-[760px] mx-auto text-center">
          <p
            className="text-gold mb-5"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Explore The Market
          </p>
          <h2
            id="ame-heading"
            className="font-display font-normal text-warm-cream leading-[1.05] tracking-[0.015em] mb-6"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)" }}
          >
            Austin Is Not <span className="text-gold italic">One Market</span>
          </h2>
          <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
          <p
            className="text-warm-cream/72 mx-auto leading-[1.75]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "15px",
              letterSpacing: "0.012em",
              maxWidth: "620px",
            }}
          >
            Each neighborhood carries its own rhythm, constraints, buyer
            psychology, and long-term value profile. Echelon helps clients read
            those differences before making a move.
          </p>
        </div>
      </div>

      {/* Desktop sticky-scroll experience */}
      <div className="hidden lg:block px-8 lg:px-12 pb-20 lg:pb-24">
        <div className="max-w-[1480px] mx-auto grid grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="col-span-7 sticky top-24 h-[calc(100vh-7rem)] min-h-[600px] max-h-[760px]">
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
                          ? "scale(1.035) translateY(-1%)"
                          : "scale(0.985) translateY(1%)",
                      transition: imageTransition,
                      willChange: "opacity, transform",
                    }}
                    aria-hidden={isActive ? undefined : true}
                  >
                    <img
                      src={scene.image}
                      alt={isActive ? `${scene.name}, Austin` : ""}
                      width={1600}
                      height={1100}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                      sizes="58vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,11,26,0.12) 0%, rgba(8,11,26,0.20) 44%, rgba(8,11,26,0.88) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(8,11,26,0.24) 0%, rgba(8,11,26,0.06) 46%, rgba(8,11,26,0.34) 100%)",
                      }}
                    />
                  </div>
                );
              })}

              <div className="absolute top-8 left-10 right-10 z-10 flex items-center gap-4">
                {SCENES.map((scene, index) => {
                  const isActive = index === active;
                  return (
                    <div key={scene.slug} className="flex items-center gap-2">
                      <span
                        className="block h-px"
                        style={{
                          width: isActive ? 36 : 14,
                          background: isActive ? "#b9a06c" : "rgba(255,255,255,0.28)",
                          transition: reducedMotion
                            ? "none"
                            : "width 500ms ease, background 500ms ease",
                        }}
                      />
                      <span
                        className={isActive ? "text-gold" : "text-warm-cream/36"}
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "10.5px",
                          letterSpacing: "0.26em",
                          textTransform: "uppercase",
                          transition: reducedMotion ? "none" : "color 400ms ease",
                        }}
                      >
                        {scene.index}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-10 lg:p-14">
                <p
                  className="text-warm-cream/80 mb-3"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  {activeScene.meta}
                </p>
                <h3
                  className="font-display text-warm-cream leading-[1.0] mb-5"
                  style={{
                    fontSize: "clamp(52px, 6.4vw, 96px)",
                    fontWeight: 400,
                    letterSpacing: "0.005em",
                    textShadow: "0 2px 22px rgba(0,0,0,0.45)",
                  }}
                >
                  {activeScene.name}
                </h3>
                <p
                  className="text-warm-cream/85 max-w-[560px] leading-[1.65] mb-6"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "16px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {activeScene.insight}
                </p>
                <Link
                  to={`/communities/${activeScene.slug}`}
                  className="inline-flex items-center gap-3 text-warm-cream"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #b9a06c",
                    paddingBottom: 5,
                  }}
                >
                  Advisory On {activeScene.name}{" "}
                  <span className="text-gold">→</span>
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
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

          <div className="col-span-5">
            <div className="pt-4">
              {SCENES.map((scene, index) => {
                const isActive = index === active;
                return (
                  <article
                    key={scene.slug}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    className="min-h-[54vh] flex items-center border-b border-white/10"
                  >
                    <div
                      className="max-w-[560px] py-14"
                      style={{
                        opacity: isActive ? 1 : 0.46,
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
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
                      <h4
                        className="font-display text-warm-cream leading-[1.06] mb-5"
                        style={{ fontSize: "clamp(34px, 3.4vw, 48px)", fontWeight: 400 }}
                      >
                        {scene.name}
                      </h4>
                      <p
                        className="text-warm-cream/72 leading-[1.75] mb-7"
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
                        className="inline-flex items-center gap-2 text-warm-cream"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "10.5px",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
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
            </div>
          </div>
        </div>

        <div className="max-w-[1480px] mx-auto mt-10 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end border-t border-white/10 pt-10">
          <div className="max-w-[640px]">
            <p
              className="text-gold mb-3"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Five Micro-Markets · Five Decisions
            </p>
            <p
              className="text-warm-cream/72 leading-[1.75]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "15px",
                letterSpacing: "0.01em",
              }}
            >
              The right Austin property strategy changes by school district,
              terrain, walkability, waterfront scarcity, privacy, and
              long-term liquidity. Start with the market, then choose the
              property.
            </p>
          </div>
          <div className="flex items-center gap-4">
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

      {/* Tablet and mobile keep Lovable's stable image-led editorial layout. */}
      <div className="lg:hidden px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1480px] mx-auto">
          <div className="grid gap-4 md:gap-6">
            {SCENES.map((scene, index) => (
              <Link
                key={scene.slug}
                to={`/communities/${scene.slug}`}
                className="group relative block overflow-hidden min-h-[380px] md:min-h-[460px]"
                aria-label={`Explore ${scene.name}`}
              >
                <img
                  src={scene.image}
                  alt={`${scene.name}, Austin`}
                  width={1000}
                  height={760}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,11,26,0.12) 0%, rgba(8,11,26,0.24) 44%, rgba(8,11,26,0.88) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                  <p
                    className="text-gold mb-3"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "10px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                    }}
                  >
                    {scene.index} · {scene.meta}
                  </p>
                  <h3
                    className="font-display text-warm-cream leading-[1.04] mb-4"
                    style={{ fontSize: "clamp(36px, 9vw, 60px)", fontWeight: 400 }}
                  >
                    {scene.name}
                  </h3>
                  <p
                    className="text-warm-cream/80 leading-[1.65] max-w-[560px]"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "15px",
                    }}
                  >
                    {scene.insight}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
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
    </section>
  );
};

export default AustinMarketExplorer;
