import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { chunkRetry } from "@/lib/chunkRetry";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const HomeCommunitiesScroll = lazy(chunkRetry(() => import("@/components/HomeCommunitiesScroll")));

const CommunitiesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-background" style={{ padding: "clamp(48px, 7vw, 96px) 0 0" }}>
      <div className="h-12 md:h-20" aria-hidden="true" />
      <div className="container mx-auto px-6">
        <div className="max-w-[1320px] mx-auto">
          <div
            ref={headerRef}
            className="text-center"
            style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}
          >
            {/* Eyebrow flanked by gold hairlines, editorial masthead */}
            <div
              className="flex items-center justify-center gap-4 md:gap-6 mb-8"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span
                aria-hidden="true"
                style={{ display: "block", width: "clamp(32px, 6vw, 64px)", height: "1px", background: "#b9a06c" }}
              />
              <p
                className="text-gold m-0"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                }}
              >
                <span>Featured Neighborhoods</span>
              </p>
              <span
                aria-hidden="true"
                style={{ display: "block", width: "clamp(32px, 6vw, 64px)", height: "1px", background: "#b9a06c" }}
              />
            </div>

            {/* Display headline, dramatically larger with italic accent */}
            <h2
              className="font-display font-normal"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(2.25rem, 5.4vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: "0.005em",
                color: "hsl(var(--foreground))",
                marginBottom: "clamp(20px, 2.5vw, 32px)",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
              }}
            >
              <span>Where Austin </span>
              <span style={{ fontStyle: "italic", fontFamily: '"Cinzel", serif' }}>lives</span>
              <span> well.</span>
            </h2>

            {/* Editorial supporting line */}
            <p
              className="mx-auto"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontWeight: 300,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.65,
                letterSpacing: "0.01em",
                color: "hsl(var(--muted-foreground))",
                maxWidth: "560px",
                marginBottom: "clamp(28px, 3.5vw, 40px)",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
              }}
            >
              A curated atlas of the city's most coveted enclaves, each shaped by its own identity and quiet authority.
            </p>

            {/* Ornamental divider, hairline + diamond + hairline */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center gap-3 mx-auto"
              style={{
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.9s ease 0.5s",
                maxWidth: "180px",
              }}
            >
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #b9a06c)" }} />
              <span style={{ width: "5px", height: "5px", transform: "rotate(45deg)", border: "1px solid #b9a06c" }} />
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #b9a06c)" }} />
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[400px] bg-primary" />}>
        <HomeCommunitiesScroll />
      </Suspense>

      {/* Editorial CTA, italic call, hairline rule, gold-bordered button, supporting line */}
      <div className="container mx-auto px-6">
        <ScrollReveal delay={200}>
          <div className="text-center mx-auto" style={{ padding: "clamp(64px, 8vw, 104px) 0", maxWidth: "640px" }}>
            <p
              className="text-gold mb-5"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              AUSTIN MICRO MARKETS
            </p>
            <p
              className="font-display"
              style={{
                fontFamily: '"Cinzel", serif',
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)",
                lineHeight: 1.3,
                color: "hsl(var(--foreground) / 0.92)",
                marginBottom: "clamp(28px, 3vw, 40px)",
                whiteSpace: "pre-line",
              }}
            >
              {"each neighborhood has a story.\nOne discerning point of view.\u00A0"}
            </p>
            <span
              aria-hidden="true"
              className="block mx-auto"
              style={{ width: "32px", height: "1px", background: "#b9a06c", marginBottom: "clamp(28px, 3vw, 40px)" }}
            />
            <Link to="/communities" className="cta-luxury">
              EXPLORE EVERY COMMUNITY
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CommunitiesSection;
