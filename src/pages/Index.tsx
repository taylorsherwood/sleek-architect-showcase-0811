import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
const BookingModal = lazy(() => import("@/components/BookingModal"));
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  realEstateAgentSchema,
  localBusinessSchema,
  taylorSherwoodSchema,
  createBreadcrumbSchema,
} from "@/components/SchemaMarkup";

const HomeBelowFold = lazy(() => import("@/components/HomeBelowFold"));

/* ─────────────────────────────────────────────
   SECTION 1 — HERO
   ───────────────────────────────────────────── */

const FALLBACK_TIMEOUT = 4000;
const RETRY_DELAY = 800;



// Safe SSR/prerender default: skip video (mobile-first).
// Client-side hydration enables video only on desktop.
const getIsMobile = () =>
  typeof window !== "undefined"
    ? window.matchMedia("(max-width: 767px)").matches
    : true; // SSR → treat as mobile so <video> is never prerendered

const INITIAL_IS_MOBILE = getIsMobile();
const INITIAL_SKIP_VIDEO = INITIAL_IS_MOBILE || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

const Hero = () => {
  const [videoReady, setVideoReady] = useState(false);
  // After hydration, re-evaluate on client to enable video on desktop
  const [isMobileHero, setIsMobileHero] = useState(INITIAL_IS_MOBILE);
  const [skipVideo, setSkipVideo] = useState(INITIAL_SKIP_VIDEO);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobileHero(mobile);
    setSkipVideo(mobile || reducedMotion);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Play video as soon as it's ready
  useEffect(() => {
    if (skipVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = () => {
      video.play()
        .then(() => setVideoReady(true))
        .catch(() => {
          setTimeout(() => {
            video.muted = true;
            video.play()?.then(() => setVideoReady(true)).catch(() => {});
          }, RETRY_DELAY);
        });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }
  }, []);

  // Re-trigger text animation on visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (delay: string) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  // Default to desktop poster; once ready, use the correct one
  const posterSrc = isMobileHero ? "/images/hero-mobile-austin-v2.webp" : "/images/hero-poster.webp";

  return (
    <>
    <section ref={sectionRef} id="hero-section" className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-primary">
      {/* Video — src injected after LCP image loads */}
      {!skipVideo && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 1 }}>
          <video ref={videoRef} autoPlay muted loop playsInline preload="metadata"
            className={`hero-bg-video transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            style={{ willChange: "opacity" }} tabIndex={-1}
            width={1920} height={1080}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Poster image — mobile only (desktop uses video directly, no placeholder) */}
      {skipVideo && (
        <img
          src={posterSrc}
          alt="Austin Texas skyline"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          style={{ zIndex: 0 }}
          loading="eager"
          fetchPriority="high"
          width={780}
          height={1385}
        />
      )}

      {/* Left-to-right gradient overlay for text readability */}
      {/* Mobile: stronger overlay for text readability */}
      <div className="absolute inset-0 md:hidden" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,14,25,0.35) 0%, rgba(10,14,25,0.45) 45%, rgba(10,14,25,0.70) 100%)' }} />
      {/* Desktop: gradient only on left half */}
      <div className="absolute inset-y-0 left-0 w-1/2 hidden md:block" style={{
        zIndex: 1,
        background: `linear-gradient(to right, rgba(10,14,25,0.50) 0%, rgba(10,14,25,0.35) 50%, rgba(10,14,25,0.10) 85%, transparent 100%)`
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-40 md:pb-36 lg:pb-44 pt-36 md:pt-32 lg:pt-48">
        <div className="max-w-[780px] md:max-w-[620px] lg:max-w-[780px] relative">
          {/* Gold line + kicker */}
          <div style={anim("0s")} className="mb-5 mt-4 md:mt-5 lg:mt-6">
            
            <p style={{
              fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
              color: "hsl(38 45% 72%)",
              textShadow: "0 1px 6px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)"
            }}>
              STRATEGIC AUSTIN REAL ESTATE ADVISORY
            </p>
          </div>

          <h1 className="font-display mb-7 md:mb-5 lg:mb-7 text-[27px] md:text-[clamp(30px,4vw,52px)] lg:text-[clamp(32px,4vw,52px)]" style={{
            ...anim("0.15s"), fontWeight: 400, lineHeight: 1.12, letterSpacing: "0.02em",
            color: "rgba(250,248,244,0.98)",
            textShadow: "0 2px 12px rgba(0,0,0,0.45), 0 6px 30px rgba(0,0,0,0.30), 0 0 60px rgba(0,0,0,0.15)",
            whiteSpace: "pre-wrap"
          }}>
            Access austin's most<br className="md:hidden" /> Exclusive PROPERTIES
          </h1>

          <p className="max-w-[480px] mb-20 md:mb-16 lg:mb-20 leading-[1.7]" style={{
            ...anim("0.3s"),
            fontFamily: '"Jost", sans-serif', fontWeight: 400, fontSize: "15.5px",
            letterSpacing: "0.04em", color: "rgba(250,248,244,0.95)",
            textShadow: "0 1px 8px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)",
            whiteSpace: "pre-wrap"
          }}>
            {"Private listings & off-market opportunities.\nElevated real estate representation."}
          </p>

          {/* CTA Buttons */}
          <div className="inline-flex flex-col items-center" style={anim("0.4s")}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(3px) translateZ(0)";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.color = "#b9a06c";
                }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0) translateZ(0)"; e.currentTarget.style.background = "#b9a06c"; e.currentTarget.style.borderColor = "#b9a06c"; e.currentTarget.style.color = "#fff"; }}
                className="inline-block text-center px-6 py-[14px] cursor-pointer"
                style={{
                  fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
                  border: "2px solid #b9a06c", color: "#fff",
                  background: "#b9a06c",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  transform: "translateX(0) translateZ(0)", willChange: "transform, box-shadow",
                  transition: "transform 250ms ease, box-shadow 250ms ease, background 250ms ease, border-color 250ms ease",
                }}
              >
                BOOK A 15-MINUTE ADVISORY CALL
              </button>
              <Link to="/off-market-real-estate-austin"
                className="inline-block text-center px-6 py-[14px]"
                style={{
                  fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 400,
                  border: "1px solid rgba(255,255,255,0.52)", color: "rgba(255,255,255,0.95)",
                  background: "rgba(10,14,25,0.28)",
                  transform: "translateX(0) translateZ(0)", willChange: "transform, background, border-color",
                  transition: "transform 250ms ease, background 250ms ease, border-color 250ms ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(3px) translateZ(0)"; e.currentTarget.style.background = "#0C0F24"; e.currentTarget.style.borderColor = "#0C0F24"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0) translateZ(0)"; e.currentTarget.style.background = "rgba(10,14,25,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.52)"; e.currentTarget.style.color = "rgba(255,255,255,0.95)"; }}
              >
                CONNECT ME WITH OFF-MARKET PROPERTIES →
              </Link>
            </div>
            <p style={{ ...anim("0.5s"), fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", marginTop: "6px", textTransform: "uppercase", textShadow: "0 0 12px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.15)", whiteSpace: "pre-wrap" }}>
              {"\n\n"}
            </p>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 3 }}>
        <span style={{
          fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "hsl(var(--warm-cream))",
        }}>
          Discover Austin
        </span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
    {bookingOpen ? (
      <Suspense fallback={null}>
        <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      </Suspense>
    ) : null}
    </>
  );
};

/* ─────────────────────────────────────────────
   SECTION 1B — SEARCH (RealScout Simple Search)
   ───────────────────────────────────────────── */

const REALSCOUT_URL = "https://taylorsherwood.realscout.com/";

const SearchSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = INITIAL_IS_MOBILE;

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const el = document.createElement("realscout-simple-search") as any;
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjI1MDUw");
    el.setAttribute("data-search-type", "buy");
    container.appendChild(el);

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, [isMobile]);

  return (
    <section className="bg-secondary relative z-20" style={{ overflow: 'visible', padding: "clamp(24px, 4vw, 48px) 0 clamp(32px, 4vw, 48px)" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-minimal text-gold mb-4">
            EXPLORE THE MARKET
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] font-normal text-foreground leading-[1.1] tracking-[0.03em] mb-10">
            Find Your Next <span className="text-gold italic">Chapter</span>
          </h2>
          {isMobile ? (
            <a
              href={REALSCOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-luxury inline-block"
            >
              SEARCH NOW
            </a>
          ) : (
            <div ref={containerRef} className="flex justify-center relative max-w-2xl mx-auto" style={{ minHeight: 60, zIndex: 10 }} />
          )}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   PAGE COMPOSITION
   ───────────────────────────────────────────── */

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Austin Luxury Real Estate and Investment Advisory"
      description="Austin luxury real estate advisory. Off-market access, investment strategy, and expert service for luxury homes, land, and commercial property."
      ogTitle="Austin Luxury Real Estate and Investment Advisory | Echelon Property Group"
      ogDescription="Strategic real estate advisory across Austin's most exclusive markets. Off-market deals, investment property, land development, and luxury homes."
    />
    <SchemaMarkup schema={realEstateAgentSchema} />
    <SchemaMarkup schema={localBusinessSchema} />
    <SchemaMarkup schema={taylorSherwoodSchema} />
    <SchemaMarkup schema={createBreadcrumbSchema([{ name: "Home", url: "https://www.echelonpropertygroup.com/" }])} />

    <Navigation />
    <Hero />
    <div className="h-10 md:h-16 bg-background" aria-hidden="true" />
    <SearchSection />

    <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
      <HomeBelowFold />
    </Suspense>
  </div>
);

export default Index;
