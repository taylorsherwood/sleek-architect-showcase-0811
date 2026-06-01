import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import landRanchHeroAsset from "@/assets/land-ranch-home-intro-v2.jpg.asset.json";
const landRanchHeroImg = landRanchHeroAsset.url;

const highlightCards = [
  {
    title: "Legacy Ranches",
    body: "Large acreage holdings, recreational properties, and generational land assets.",
  },
  {
    title: "Development Opportunities",
    body: "Infill projects, development tracts, assemblage opportunities, and investment land.",
  },
  {
    title: "Exotic Wildlife Ranches",
    body: "Axis deer, blackbuck, zebra, and unique recreational ownership opportunities.",
  },
];

const LandRanchHomeIntro = () => {
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reducedMotion) return;

    const wrap = imageWrapRef.current;
    if (!wrap) return;
    const img = wrap.querySelector("img");
    if (!img) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const progress = -rect.top / (window.innerHeight + rect.height);
      const y = progress * 48; // subtle 48px parallax shift
      img.style.transform = `translateY(${y}px) scale(1.08)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-secondary overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left — cinematic imagery with subtle parallax */}
        <div
          ref={imageWrapRef}
          className="relative overflow-hidden min-h-[420px] md:min-h-[520px] lg:min-h-0"
        >
          <img
            src={landRanchHeroImg}
            alt="Texas Hill Country ranch land at golden hour with rolling pastures and oak trees"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{ transform: "scale(1.08)" }}
            loading="lazy"
            decoding="async"
            width={1024}
            height={1280}
          />
          {/* Very faint gradient edge for smooth transition to content on mobile */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(245,243,239,0) 70%, rgba(245,243,239,0.85) 100%)",
            }}
          />
        </div>

        {/* Right — editorial content */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "28px",
                  height: "1px",
                  background: "#b9a06c",
                }}
              />
              <p
                className="text-gold m-0"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                }}
              >
                Land, Ranch & Development
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              className="font-display font-normal"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(1.85rem, 3.6vw, 2.85rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "0.02em",
                color: "hsl(var(--foreground))",
                marginBottom: "clamp(20px, 2.2vw, 28px)",
              }}
            >
              Beyond Luxury{" "}
              <span style={{ fontStyle: "italic", fontFamily: '"Cinzel", serif' }}>
                Homes
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p
              className="max-w-[520px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontWeight: 300,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.75,
                letterSpacing: "0.01em",
                color: "hsl(var(--muted-foreground))",
                marginBottom: "clamp(28px, 3vw, 40px)",
              }}
            >
              Echelon advises buyers, sellers, investors, and landowners across
              some of Central Texas&apos; most sought-after ranch, recreational,
              development, and acreage markets. From legacy Hill Country ranches
              and hunting properties to infill opportunities and large-scale land
              acquisitions, our advisory approach extends well beyond traditional
              residential real estate.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-12 md:mb-14">
              <Link
                to="/land-ranch"
                className="inline-block text-center px-8 py-3.5 transition-all duration-300"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  border: "1px solid hsl(var(--gold))",
                  color: "hsl(var(--gold))",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--gold))";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "hsl(var(--gold))";
                }}
              >
                Explore Land & Ranch
              </Link>

              <Link
                to="/land-ranch/hill-country-ranches"
                className="relative inline-flex items-center text-muted-foreground/50 hover:text-gold transition-colors duration-[450ms] group/link"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                View Hill Country Ranches
                <span
                  aria-hidden="true"
                  className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1"
                >
                  →
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Three refined highlight cards */}
          <ScrollReveal delay={260}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {highlightCards.map((card) => (
                <Link
                  key={card.title}
                  to="/land-ranch"
                  className="group block p-5 md:p-6 border transition-all duration-500 ease-out hover:-translate-y-[3px]"
                  style={{
                    borderColor: "rgba(12, 15, 36, 0.08)",
                    background: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(185, 160, 108, 0.55)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.75)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px -12px rgba(12, 15, 36, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(12, 15, 36, 0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h4
                    className="font-display text-sm font-medium mb-2 transition-colors duration-300 group-hover:text-gold"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "0.82rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontWeight: 300,
                      fontSize: "0.82rem",
                      lineHeight: 1.65,
                      color: "hsl(var(--muted-foreground) / 0.85)",
                    }}
                  >
                    {card.body}
                  </p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LandRanchHomeIntro;
