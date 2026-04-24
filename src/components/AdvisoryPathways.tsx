import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  cta: { label: string; to: string };
  image: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    index: "01",
    kicker: "Buyer Advisory",
    title: "Buy With Clarity",
    body: "Understand pricing, neighborhood nuance, property quality, and negotiation leverage before stepping into the market.",
    bullets: [
      "Private and public listing strategy",
      "Neighborhood-by-neighborhood guidance",
      "Offer strategy and negotiation support",
    ],
    cta: { label: "Start Your Search", to: "/buy" },
    image: "/static-assets/community-tarrytown.webp",
    alt: "Tarrytown luxury home representing Austin buyer advisory",
  },
  {
    index: "02",
    kicker: "Seller Advisory",
    title: "Sell With Leverage",
    body: "Bring your property to market with intentional positioning, elevated presentation, and a plan for reaching qualified demand.",
    bullets: [
      "Pricing and positioning strategy",
      "Launch preparation and presentation",
      "Public and private buyer demand",
    ],
    cta: { label: "Plan Your Sale", to: "/sell" },
    image: "/static-assets/community-westlake-hills.webp",
    alt: "Westlake Hills estate representing Austin seller advisory",
  },
  {
    index: "03",
    kicker: "Investment Advisory",
    title: "Invest With Signal",
    body: "Evaluate Austin opportunities through rental dynamics, appreciation potential, liquidity, and exit strategy.",
    bullets: [
      "Acquisition criteria",
      "Micro-market analysis",
      "Hold, lease, or exit planning",
    ],
    cta: { label: "Discuss Investment Goals", to: "/invest" },
    image: "/static-assets/community-spanish-oaks.webp",
    alt: "Spanish Oaks property representing Austin investment advisory",
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

const AdvisoryPathways = () => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // IntersectionObserver-driven step detection (no scroll listener)
  useEffect(() => {
    if (reducedMotion) return;
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (steps.length === 0) return;

    const visible = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target, entry.intersectionRatio);
        }
        let bestIdx = 0;
        let bestRatio = -1;
        steps.forEach((el, i) => {
          const r = visible.get(el) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        });
        setActive((prev) => (prev === bestIdx ? prev : bestIdx));
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.01, 0.5, 1],
      }
    );
    steps.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reducedMotion]);

  const fadeTransition = useMemo(
    () => (reducedMotion ? "none" : "opacity 900ms ease-out, transform 900ms ease-out"),
    [reducedMotion]
  );
  const copyTransition = useMemo(
    () =>
      reducedMotion
        ? "none"
        : "opacity 700ms ease-out, transform 700ms ease-out",
    [reducedMotion]
  );

  return (
    <section
      aria-labelledby="advisory-pathways-heading"
      className="relative bg-background"
    >
      {/* Intro band */}
      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
            ADVISORY PATHWAYS
          </p>
          <h2
            id="advisory-pathways-heading"
            className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-display font-normal text-architectural leading-[1.1] tracking-[0.02em] mb-5"
          >
            Move Through Austin Real Estate With{" "}
            <span className="text-gold italic">Strategy</span>
          </h2>
          <p
            className="text-muted-foreground mx-auto leading-[1.7] max-w-2xl"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "15px",
              letterSpacing: "0.015em",
            }}
          >
            Buying, selling, and investing in Austin each demand a different
            posture. Echelon shifts mode based on what you're trying to
            accomplish — and the leverage required to get there.
          </p>
        </div>
      </div>

      {/* DESKTOP — Sticky-scroll pathway */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{
          height: reducedMotion ? "auto" : `${STEPS.length * 90}vh`,
        }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-secondary">
          <div className="relative h-full container mx-auto px-6">
            <div className="grid grid-cols-12 gap-10 lg:gap-14 h-full items-center">
              {/* Left — sticky visual stack */}
              <div className="col-span-6 relative h-[78vh] max-h-[680px] overflow-hidden">
                {STEPS.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.title}
                      className="absolute inset-0"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "scale(1)"
                          : i < active
                            ? "scale(1.04) translateY(-2%)"
                            : "scale(0.98) translateY(2%)",
                        transition: fadeTransition,
                        willChange: "opacity, transform",
                      }}
                      aria-hidden={isActive ? undefined : true}
                    >
                      <img
                        src={s.image}
                        alt={isActive ? s.alt : ""}
                        width={1200}
                        height={1500}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={i === 0 ? "high" : "low"}
                        sizes="(max-width: 1280px) 50vw, 600px"
                      />
                      {/* subtle inner vignette */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 80px 30px rgba(8,11,26,0.18)",
                        }}
                      />
                      {/* corner step index */}
                      <div className="absolute top-5 left-5 flex items-center gap-3">
                        <span className="block w-8 h-px bg-gold" />
                        <span
                          className="text-warm-cream"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "10.5px",
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            textShadow: "0 1px 6px rgba(0,0,0,0.45)",
                          }}
                        >
                          {s.index} · {s.kicker}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right — sticky copy column */}
              <div className="col-span-6 relative h-[78vh] max-h-[680px]">
                {/* Step ticker */}
                <ul className="mb-8 space-y-3">
                  {STEPS.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <li
                        key={s.title}
                        className="flex items-center gap-3"
                        style={{
                          opacity: isActive ? 1 : 0.4,
                          transition: reducedMotion
                            ? "none"
                            : "opacity 500ms ease",
                        }}
                      >
                        <span
                          className="block h-px"
                          style={{
                            width: isActive ? 36 : 14,
                            background: isActive
                              ? "#b9a06c"
                              : "hsl(var(--foreground) / 0.35)",
                            transition: reducedMotion
                              ? "none"
                              : "width 700ms ease, background 700ms ease",
                          }}
                        />
                        <span
                          className="text-foreground/85"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "10.5px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontWeight: isActive ? 500 : 300,
                          }}
                        >
                          {s.index} · {s.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Animated copy */}
                <div className="relative" style={{ minHeight: 460 }}>
                  {STEPS.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <div
                        key={s.title}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? "translateY(0)"
                            : i < active
                              ? "translateY(-18px)"
                              : "translateY(18px)",
                          transition: copyTransition,
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                        aria-hidden={isActive ? undefined : true}
                      >
                        <h3
                          className="font-display text-architectural leading-[1.04] tracking-[0.01em] mb-5"
                          style={{
                            fontSize: "clamp(34px, 3.6vw, 52px)",
                            fontWeight: 400,
                          }}
                        >
                          {s.title}
                        </h3>
                        <p
                          className="text-foreground/75 leading-[1.7] mb-7 max-w-[520px]"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "16px",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {s.body}
                        </p>
                        <ul className="space-y-3 mb-9">
                          {s.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-3 text-foreground/80"
                              style={{
                                fontFamily: '"Jost", sans-serif',
                                fontSize: "14px",
                                letterSpacing: "0.01em",
                              }}
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[10px] inline-block w-3 h-px bg-gold flex-shrink-0"
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={s.cta.to}
                          className="inline-flex items-center gap-3 group/cta"
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "11px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          <span className="relative pb-1">
                            {s.cta.label}
                            <span className="absolute left-0 bottom-0 h-px w-full bg-gold" />
                          </span>
                          <span
                            className="text-gold"
                            style={{
                              transition: reducedMotion
                                ? "none"
                                : "transform 500ms ease",
                            }}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom progress rail */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/10">
            <div
              className="h-full bg-gold"
              style={{
                width: `${((active + 1) / STEPS.length) * 100}%`,
                transition: reducedMotion ? "none" : "width 500ms ease-out",
              }}
            />
          </div>
        </div>

        {/* IO step anchors — siblings of sticky child so they traverse the viewport */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  top: `${(i / STEPS.length) * 100}%`,
                  height: `${100 / STEPS.length}%`,
                  left: 0,
                  right: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* MOBILE — stacked panels (also serves as SEO-readable fallback) */}
      <div className="md:hidden">
        {STEPS.map((s, i) => (
          <article
            key={s.title}
            className="relative w-full bg-secondary border-t border-border/40"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={s.image}
                alt={s.alt}
                width={780}
                height={585}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,11,26,0.10) 0%, rgba(8,11,26,0.55) 100%)",
                }}
              />
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="block w-7 h-px bg-gold" />
                <span
                  className="text-warm-cream"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  {s.index} · {s.kicker}
                </span>
              </div>
            </div>
            <div className="px-6 py-10">
              <h3
                className="font-display text-architectural mb-4 leading-[1.06]"
                style={{ fontSize: "30px", fontWeight: 400 }}
              >
                {s.title}
              </h3>
              <p
                className="text-foreground/75 leading-[1.7] mb-6"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "15px",
                }}
              >
                {s.body}
              </p>
              <ul className="space-y-2.5 mb-7">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-foreground/80"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "14px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] inline-block w-3 h-px bg-gold flex-shrink-0"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={s.cta.to}
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "hsl(var(--foreground))",
                  borderBottom: "1px solid #b9a06c",
                  paddingBottom: 4,
                }}
              >
                {s.cta.label} <span className="text-gold">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryPathways;
