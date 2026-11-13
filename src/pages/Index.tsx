import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
const BookingModal = lazy(() => import("@/components/BookingModal"));
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  localBusinessSchema,
  createBreadcrumbSchema,
} from "@/components/SchemaMarkup";

// Retry once on a transient chunk-fetch failure (stale hashed module after a
// deploy or flaky network) so the homepage never blanks out.
const importHomeBelowFold = () =>
  import("@/components/HomeBelowFold").catch(
    () =>
      new Promise<typeof import("@/components/HomeBelowFold")>((resolve, reject) => {
        setTimeout(() => {
          import("@/components/HomeBelowFold").then(resolve).catch(reject);
        }, 600);
      })
  );

const HomeBelowFold = lazy(importHomeBelowFold);

/* ─────────────────────────────────────────────
   SECTION 1, HERO
   ───────────────────────────────────────────── */

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
  // After hydration, re-evaluate on client to enable video on desktop
  const [skipVideo, setSkipVideo] = useState(INITIAL_SKIP_VIDEO);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSkipVideo(mobile || reducedMotion);

    // Warm the below-fold chunk during idle so animations are ready by the time
    // the user scrolls. Falls back to setTimeout where requestIdleCallback is missing.
    const prefetch = () => { void importHomeBelowFold(); };
    const ric = (window as any).requestIdleCallback;
    const handle = ric ? ric(prefetch, { timeout: 2500 }) : window.setTimeout(prefetch, 1500);
    return () => {
      if (ric && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
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
        .then(() => {})
        .catch(() => {
          setTimeout(() => {
            video.muted = true;
            video.play()?.catch(() => {});
          }, RETRY_DELAY);
        });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }
  }, []);

  return (
    <>
    <section ref={sectionRef} id="hero-section" className="home-editorial-hero relative overflow-hidden bg-primary">
      <img
        src="/images/hero-mobile-austin-v2.webp"
        alt="Austin Texas skyline"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        loading="eager" fetchPriority="high" decoding="async" width={780} height={1385}
      />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none hidden md:block">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="hero-bg-video" tabIndex={-1} width={1920} height={1080}>
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="home-editorial-shade absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 flex h-full items-center pb-16 md:pb-24 lg:pb-32 px-6 pt-32">
        <div className="home-hero-glass mx-auto max-w-4xl text-center text-primary-foreground px-6 py-10 md:px-14 md:py-14">
          <p className="text-xs text-gold uppercase mb-5">STRATEGIC AUSTIN REAL ESTATE ADVISORY</p>
          <h1 className="font-display font-normal text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">Echelon Property Group</h1>
          <p className="text-base md:text-lg mb-3">Access Austin&apos;s most exceptional real estate</p>
          <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Luxury homes, ranch land, redevelopment opportunities, commercial property and private market access.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button variant="outline" className="home-advisory-button rounded-none h-auto py-3.5 px-5 text-[10px] md:text-xs" onClick={() => setBookingOpen(true)}>
              BOOK A 15-MINUTE ADVISORY CALL
            </Button>
            <Button asChild variant="outline" className="home-private-button rounded-none h-auto py-3.5 px-5 text-[10px] md:text-xs">
              <Link to="/off-market-real-estate-austin">ACCESS PRIVATE OPPORTUNITIES →</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="home-editorial-shortcuts absolute z-10 bottom-8 md:bottom-10 inset-x-0 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 md:gap-10">
          {[
            { number: "01", label: "Featured Properties", href: "/search" },
            { number: "02", label: "Private Access", href: "/off-market-real-estate-austin" },
            { number: "03", label: "Explore Austin", href: "/communities" },
          ].map((item) => (
            <Button asChild variant="link" key={item.number} className="home-shortcut h-auto p-0 justify-center whitespace-normal text-primary-foreground hover:text-gold">
              <Link to={item.href}>
                <span className="text-gold text-[10px]">{item.number}</span>
                <span className="font-display text-xs md:text-base font-normal">{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
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
   SECTION 1B, SEARCH (RealScout Simple Search)
   ───────────────────────────────────────────── */

const REALSCOUT_URL = "https://taylorsherwood.realscout.com/";

const SearchSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // First render always matches the prerendered mobile-first markup
  // (SSR has no viewport). Re-evaluate after mount; on desktop the
  // embedded RealScout widget mounts then, with no hydration mismatch.
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

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
    <section className="search-section bg-background relative z-20" style={{ overflow: 'visible', padding: "clamp(16px, 2.4vw, 24px) 0 clamp(6px, 1vw, 12px)" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-minimal text-gold mb-3">
            EXPLORE THE MARKET
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] font-normal text-foreground leading-[1.1] tracking-[0.03em] mb-3">
            Search {"\n"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-5 font-light max-w-md mx-auto">
            Homes, estates, ranch land, and investment property across Austin and the surrounding Hill Country.&nbsp;
          </p>
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
            <div ref={containerRef} className="flex justify-center relative max-w-xl mx-auto search-widget-frame" style={{ minHeight: 60, zIndex: 10 }} />
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
      title=""
      description="Echelon Property Group is the Austin luxury and investment real estate practice of founder Taylor Sherwood, serving buyers, sellers, and investors across Central Texas."
      author="Taylor Sherwood"
      ogTitle="Echelon Property Group | Taylor Sherwood, Austin Luxury Realtor"
      ogDescription="Echelon Property Group is the Austin luxury and investment real estate practice of founder Taylor Sherwood, serving buyers, sellers, and investors across Central Texas."
    />

    <SchemaMarkup schema={localBusinessSchema} />
    <SchemaMarkup schema={createBreadcrumbSchema([{ name: "Home", url: "https://www.echelonpropertygroup.com/" }])} />

    <Navigation editorialHome />
    <Hero />
    <div className="h-12 md:h-20 bg-background" aria-hidden="true" />
    <SearchSection />
    <div className="h-12 md:h-20 bg-secondary" aria-hidden="true" />

    <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
      <HomeBelowFold />
    </Suspense>
  </div>
);

export default Index;
