import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  realEstateAgentSchema,
  localBusinessSchema,
  taylorSherwoodSchema,
  organizationSchema,
  websiteSchema,
  createBreadcrumbSchema,
} from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPhoneNumber, getPhoneDigits, getTimestamp } from "@/lib/formUtils";
import taylorBoatImg from "@/assets/taylor-headshot.png";

const Footer = lazy(() => import("@/components/Footer"));

/* ─────────────────────────────────────────────
   SECTION 1 — HERO
   ───────────────────────────────────────────── */

const FALLBACK_TIMEOUT = 4000;
const RETRY_DELAY = 800;

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowFallback(true);
      return;
    }
    requestAnimationFrame(() => setVideoSrc("/videos/hero-video.mp4"));
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) { setShowFallback(true); return; }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const fallbackTimer = setTimeout(() => {
      if (!videoReady) setShowFallback(true);
    }, FALLBACK_TIMEOUT);

    const attemptPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => { video.playbackRate = 0.85; setVideoReady(true); setShowFallback(false); })
          .catch(() => {
            setTimeout(() => {
              video.muted = true;
              video.defaultMuted = true;
              const retry = video.play();
              if (retry !== undefined) {
                retry.then(() => { video.playbackRate = 0.85; setVideoReady(true); setShowFallback(false); })
                  .catch(() => setShowFallback(true));
              } else setShowFallback(true);
            }, RETRY_DELAY);
          });
      } else setShowFallback(true);
    };

    const onReady = () => attemptPlay();
    if (video.readyState >= 2) attemptPlay();
    else video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", () => setShowFallback(true));

    return () => { clearTimeout(fallbackTimer); video.removeEventListener("loadeddata", onReady); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc]);


  const anim = (delay: string) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <section ref={sectionRef} id="hero-section" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary">
      {/* Video */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster="/images/hero-poster.jpg"
          className={`hero-bg-video transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          style={{ filter: "brightness(0.82) contrast(1.08)" }} tabIndex={-1}>
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {showFallback && !videoReady && (
        <img src="/images/hero-poster.jpg" alt="Austin Texas skyline" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} loading="eager" />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.05) 100%),
                      linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35) 100%)`
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-36 md:pt-44 lg:pt-48 pb-16">
        <div className="max-w-[580px]" style={{ filter: "drop-shadow(0 0 80px rgba(0,0,0,0.5))" }}>
          <p className="text-warm-cream/45 mb-7 font-semibold" style={{
            ...anim("0s"),
            fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase",
            textShadow: "0 0 20px rgba(12,15,36,0.7)"
          }}>
            STRATEGIC AUSTIN REAL ESTATE ADVISORY
          </p>

          <h1 className="font-display font-medium text-warm-cream mb-10" style={{
            ...anim("0.15s"), lineHeight: 1.08, letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}>
            <span className="block" style={{ fontSize: "clamp(2.4rem, 5vw, 4.8rem)" }}>Access Austin's</span>
            <span className="block italic" style={{ fontSize: "clamp(2.8rem, 5.8vw, 5.6rem)", marginTop: "-0.05em" }}>Most Exclusive Homes</span>
          </h1>

          <p className="text-warm-cream/55 max-w-[440px] mb-12 leading-[1.7] font-normal" style={{
            ...anim("0.3s"), fontFamily: '"Raleway", sans-serif', fontSize: "0.95rem",
            textShadow: "0 2px 9px rgba(0,0,0,0.5)"
          }}>
            Private listings, off-market opportunities, and elevated real estate representation.
          </p>

          <div className="flex flex-col sm:flex-row gap-5" style={anim("0.4s")}>
            <Link to="/austin-luxury-homes-for-sale"
              className="hero-cta-btn inline-block bg-warm-cream text-foreground px-12 py-[1.1rem] text-center hover:bg-gold hover:text-white border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600 }}>
              EXPLORE LUXURY HOMES
            </Link>
            <Link to="/off-market-real-estate-austin"
              className="hero-cta-btn inline-block bg-transparent border border-warm-cream/20 text-warm-cream/70 px-12 py-[1.1rem] text-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 400 }}>
              REQUEST OFF-MARKET ACCESS
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 1B — SEARCH (RealScout Simple Search)
   ───────────────────────────────────────────── */

const SearchSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const widget = document.createElement("realscout-simple-search");
    widget.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    el.appendChild(widget);
    return () => {
      if (el.contains(widget)) el.removeChild(widget);
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="container mx-auto px-6 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-gold/70 font-medium mb-2" style={{
              fontFamily: '"Raleway", sans-serif', fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase"
            }}>
              Search Properties
            </p>
            <p className="text-muted-foreground/50 font-light" style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.8rem" }}>
              Explore available homes across Austin
            </p>
          </div>
          <div ref={containerRef} className="flex justify-center" style={{ minHeight: 60 }} />
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 2 — MICRO-TRUST STRIP
   ───────────────────────────────────────────── */

const TrustStrip = () => (
  <section className="hidden md:block bg-background border-b border-border/20">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto flex items-center justify-center gap-14 py-5">
        {[
          { icon: "/static-assets/exp-realty-luxury-logo.png", text: "eXp Luxury Division" },
          { icon: null, text: "Certified Luxury Home Marketing Specialist" },
          { icon: null, text: "$100M+ Career Sales Volume" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon && <img src={item.icon} alt={item.text} className="h-5 w-auto object-contain opacity-50" loading="lazy" />}
            <span className="text-muted-foreground/50 font-normal" style={{
              fontFamily: '"Raleway", sans-serif', fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase"
            }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 3 — ADVISOR POSITIONING
   ───────────────────────────────────────────── */

const AdvisorSection = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Headshot */}
          <ScrollReveal>
            <div className="relative group">
              <div className="overflow-hidden rounded-[3px]" style={{ boxShadow: "0 16px 40px -12px hsl(var(--foreground) / 0.1)" }}>
                <img
                  src={taylorBoatImg}
                  alt="Taylor Sherwood — Austin luxury real estate advisor and founder of Echelon Property Group"
                  title="Taylor Sherwood, Echelon Property Group"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.01]"
                  style={{ filter: "brightness(0.93)" }}
                  loading="lazy" decoding="async"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <div className="max-w-[480px]">
            <ScrollReveal>
              <p className="text-minimal text-gold mb-6 font-extrabold tracking-[0.22em]">
                STRATEGIC REAL ESTATE ADVISOR
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2 className="font-display text-[1.85rem] md:text-[2.6rem] font-normal text-foreground leading-[1.06] tracking-[-0.015em] mb-6">
                Luxury Real Estate,
                <br />
                <span className="italic">Without the Noise</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="text-foreground/90 text-lg md:text-[1.2rem] font-medium leading-[1.45] mb-10">
                We don't sell homes. We deliver access, strategy, and discretion.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="space-y-4 mb-10">
                <p className="text-foreground/70 text-[15px] leading-[1.8] font-light">
                  You don't need more listings — you need a smarter approach.
                </p>
                <p className="text-foreground/70 text-[15px] leading-[1.8] font-light">
                  I work with a select group of clients to acquire and position high-value
                  properties across Austin — including private and off-market opportunities
                  not publicly available.
                </p>
                <p className="text-foreground/70 text-[15px] leading-[1.8] font-light">
                  Every decision is guided by market intelligence, negotiation leverage,
                  and a clear understanding of long-term value.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <Link to="/contact"
                  className="inline-block border border-foreground/30 text-foreground px-10 py-[0.9rem] hover:bg-gold hover:text-white hover:border-gold transition-all duration-[400ms]"
                  style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
                  WORK WITH ME
                </Link>
                <Link to="/past-transactions"
                  className="inline-flex items-center text-muted-foreground/55 hover:text-gold transition-colors duration-[400ms] pt-3 sm:pt-0 sm:self-center"
                  style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                  VIEW PAST TRANSACTIONS →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 4 — FEATURED PROPERTIES
   ───────────────────────────────────────────── */

const properties = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,495,000",
    beds: 4, baths: 4, sqft: "4,147",
    link: "https://www.villagovernorshill.com",
    badge: "Private Listing",
  },
  {
    image: "/static-assets/listing-3.jpg",
    address: "Ranch Estate on 42 Acres",
    location: "Texas Hill Country",
    price: "$5M+",
    beds: 4, baths: 5, sqft: "5,800",
    link: "#",
    badge: "Private Market Opportunity",
  },
];

const FeaturedProperties = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-minimal text-gold mb-5 font-extrabold tracking-[0.22em]">FEATURED LISTINGS</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-light text-foreground/90 mb-5 leading-[1.1] tracking-[-0.01em]">
              Exceptional <span className="italic">Properties</span>
            </h2>
            <p className="text-muted-foreground/60 text-[15px] max-w-lg font-light leading-[1.8]">
              A curated selection of luxury homes, including private and off-market opportunities.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {properties.map((p, i) => {
              const isExternal = p.link.startsWith("http");
              const Wrapper = isExternal ? "a" : "div";
              const wrapperProps = isExternal ? { href: p.link, target: "_blank" as const, rel: "noopener noreferrer" } : {};
              return (
                <Wrapper key={i} {...wrapperProps} className="group block cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/3] transition-shadow duration-[500ms] group-hover:shadow-[0_12px_30px_-8px_hsl(var(--foreground)/0.1)]">
                    <img src={p.image} alt={p.address}
                      className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                      loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {/* Price */}
                    <div className="absolute bottom-5 right-6">
                      <span className="text-white font-display text-lg font-light tracking-[0.02em]"
                        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                        {p.price}
                      </span>
                    </div>

                    {/* Badge */}
                    {p.badge && (
                      <div className="absolute top-5 left-5 bg-background/80 backdrop-blur-sm px-3.5 py-1.5">
                        <span className="text-[8px] tracking-[0.22em] uppercase text-muted-foreground/70 font-normal">{p.badge}</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms]">
                      <span className="text-white border border-white/30 px-10 py-3.5 backdrop-blur-md bg-black/25 font-normal"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: '"Raleway", sans-serif' }}>
                        View Property
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 px-1">
                    <h3 className="text-[15px] font-display font-medium text-foreground/85 mb-1 tracking-[0.01em]">{p.address}</h3>
                    <p className="text-muted-foreground/50 text-[13px] font-light">{p.location}</p>
                    <div className="flex gap-4 text-[12px] text-muted-foreground/40 mt-2.5 font-light tracking-[0.02em]">
                      <span>{p.beds} Beds</span>
                      <span className="text-border/60 text-[4px] leading-[2.5]">●</span>
                      <span>{p.baths} Baths</span>
                      <span className="text-border/60 text-[4px] leading-[2.5]">●</span>
                      <span>{p.sqft} Sq Ft</span>
                    </div>
                  </div>
                </Wrapper>
              );
            })}

            {/* Off-market card */}
            <Link to="/off-market-real-estate-austin" className="group block md:col-span-2 md:max-w-[calc(50%-1.25rem)]">
              <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center transition-all duration-[600ms] group-hover:from-gold group-hover:via-gold group-hover:to-gold/80">
                <img src="/static-assets/echelon-logo-gold-square.png" alt="Echelon Property Group"
                  className="w-1/2 h-auto object-contain transition-all duration-[500ms] group-hover:brightness-0 group-hover:invert"
                  loading="lazy" decoding="async" />
              </div>
              <div className="mt-5 px-1 text-center">
                <h3 className="text-[15px] font-display font-medium mb-1.5 text-foreground/85 group-hover:text-muted-foreground transition-colors duration-[400ms]">
                  Access Off-Market Opportunities
                </h3>
                <p className="text-[13px] text-muted-foreground/50 font-light leading-relaxed">
                  Exclusive private listings not publicly advertised. →
                </p>
              </div>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/austin-luxury-homes-for-sale"
              className="inline-block border border-foreground/15 text-foreground px-10 py-[0.9rem] hover:bg-gold hover:text-white hover:border-gold transition-all duration-[400ms]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
              EXPLORE ALL LISTINGS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 5 — TESTIMONIALS (DARK)
   ───────────────────────────────────────────── */

const testimonials = [
  {
    quote: "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
    name: "James & Sarah Mitchell",
    context: "Sold in Barton Creek",
  },
  {
    quote: "Taylor was fantastic to work with! He really understood what I was looking for and showed me great options that fit my specific criteria. When I was ready to make an offer, he helped things move quickly to meet a tight closing date.",
    name: "Meredith Taylor",
    context: "Purchased in Austin",
  },
  {
    quote: "Taylor's deep understanding of Austin's investment landscape helped us identify a property that exceeded our return expectations. His analysis was institutional-grade and his negotiation saved us significantly on the acquisition.",
    name: "David Chen",
    context: "Investment Property, Austin",
  },
  {
    quote: "Taylor was incredible to work with! He's knowledgeable, responsive, and genuinely cares about getting the best results for his clients. Highly recommend him to anyone buying or selling in Austin.",
    name: "Yaniv Dotan",
    context: "Purchased and sold in Barton Creek",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-32" style={{ background: "#F8F7F5" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-minimal font-extrabold tracking-[0.22em] mb-5" style={{ color: "#C6A85B" }}>CLIENT EXPERIENCES</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-light leading-[1.1] tracking-[-0.01em]" style={{ color: "#1A1C20" }}>
              Trusted by Buyers, Sellers, and <span className="italic">Investors</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={100 + i * 60}>
              <div className="rounded-[3px] px-7 py-7 flex flex-col justify-between h-full transition-all duration-[500ms] hover:-translate-y-[2px]"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}>
                <p className="text-[15px] leading-[1.8] font-light italic mb-5" style={{ color: "#1A1C20" }}>
                  "{t.quote}"
                </p>
                <div>
                  <div className="h-px mb-4" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)" }} />
                  <p className="font-display text-[0.95rem] tracking-[0.01em]" style={{ color: "#1A1C20" }}>{t.name}</p>
                  <p className="text-[0.58rem] mt-1 font-light tracking-[0.14em] uppercase" style={{ color: "rgba(198,168,91,0.7)" }}>{t.context}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 6 — COMMUNITIES
   ───────────────────────────────────────────── */

const communities = [
  { name: "Barton Creek", descriptor: "Golf, privacy, Hill Country estates", image: "/static-assets/community-barton-creek.jpg", slug: "barton-creek" },
  { name: "Lake Austin", descriptor: "Waterfront living at its finest", image: "/static-assets/community-lake-austin.jpg", slug: "lake-austin" },
  { name: "Westlake Hills", descriptor: "Scenic bluffs, top-rated schools", image: "/static-assets/community-westlake-hills.jpg", slug: "westlake-hills" },
  { name: "Tarrytown", descriptor: "Old Austin charm, central location", image: "/static-assets/community-tarrytown.jpg", slug: "tarrytown" },
  { name: "Rollingwood", descriptor: "Intimate enclave near Zilker", image: "/static-assets/community-rollingwood.jpg", slug: "rollingwood" },
  { name: "Spanish Oaks", descriptor: "Gated Hill Country luxury", image: "/static-assets/community-spanish-oaks.jpg", slug: "spanish-oaks" },
];

const CommunitiesSection = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-5 font-extrabold tracking-[0.22em]">SELECT COMMUNITIES</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-light text-foreground/90 leading-[1.1] tracking-[-0.01em]">
              Explore Austin's Most <span className="italic">Sought-After</span> Communities
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger={60}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {communities.map((c) => (
              <Link key={c.slug} to={`/communities/${c.slug}`} className="group relative overflow-hidden aspect-[3/4] transition-shadow duration-[500ms] hover:shadow-[0_12px_30px_-8px_hsl(var(--foreground)/0.1)]">
                <img src={c.image} alt={`Luxury homes in ${c.name}, Austin`}
                  className="community-tile-img absolute inset-0 w-full h-full object-cover"
                  loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 via-[45%] to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-warm-cream font-display text-lg md:text-xl font-medium tracking-[0.03em] leading-[1.1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] mb-1.5">
                    {c.name}
                  </h3>
                  <p className="text-warm-cream/50 text-[0.5rem] font-normal tracking-[0.08em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {c.descriptor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/communities"
              className="inline-block border border-foreground/15 text-foreground px-10 py-[0.9rem] hover:bg-gold hover:text-white hover:border-gold transition-all duration-[400ms]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
              VIEW ALL COMMUNITIES
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 7 — INSIGHTS & AUTHORITY
   ───────────────────────────────────────────── */

const insights = [
  { to: "/moving-to-austin-texas", title: "Moving to Austin, Texas", excerpt: "Everything you need to know about relocating to Austin — neighborhoods, lifestyle, and what to expect.", category: "Relocation" },
  { to: "/best-luxury-neighborhoods-austin-texas", title: "Best Luxury Neighborhoods in Austin", excerpt: "A comprehensive guide to Austin's most prestigious communities and what makes each one unique.", category: "Neighborhoods" },
  { to: "/austin-luxury-market-report", title: "Austin Luxury Real Estate Market Report", excerpt: "Quarterly insights on pricing, inventory, and luxury segment performance across Austin.", category: "Market Report" },
  { to: "/best-neighborhoods-in-austin-texas", title: "Best Neighborhoods in Austin", excerpt: "A guide to Austin's top neighborhoods for families, professionals, and investors.", category: "Neighborhoods" },
];

const InsightsSection = () => (
  <section className="py-16 md:py-20 pb-10 md:pb-14 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-5 font-extrabold tracking-[0.22em]">MARKET INTELLIGENCE</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-light text-foreground/90 leading-[1.1] tracking-[-0.01em]">
              Insights & <span className="italic">Market Intelligence</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger={70}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {insights.map((article) => (
              <Link key={article.to} to={article.to} className="group block bg-card border border-border/20 rounded-[2px] overflow-hidden
                transition-all duration-[500ms] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-8px_hsl(var(--foreground)/0.06)]">
                <div className="p-6 flex flex-col h-full">
                  <p className="text-gold/80 text-[0.5rem] tracking-[0.22em] uppercase font-semibold mb-3">{article.category}</p>
                  <h3 className="font-display text-[15px] font-medium text-foreground/80 mb-3 leading-[1.35] group-hover:text-gold transition-colors duration-[400ms] tracking-[0.01em]">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground/50 text-[13px] font-light leading-[1.75] flex-1">{article.excerpt}</p>
                  <span className="mt-5 text-gold/50 text-[0.5rem] tracking-[0.22em] uppercase font-semibold group-hover:text-gold transition-colors duration-[400ms]">
                    READ MORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/blog"
              className="inline-block border border-foreground/15 text-foreground px-10 py-[0.9rem] hover:bg-gold hover:text-white hover:border-gold transition-all duration-[400ms]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
              EXPLORE ALL INSIGHTS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 8 — LEAD CAPTURE
   ───────────────────────────────────────────── */

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const body = new URLSearchParams({
        name, email, lead_source: "Homepage Off-Market CTA",
        page_url: window.location.href, submitted_at: getTimestamp(),
      });
      await fetch(ZAPIER_WEBHOOK, { method: "POST", body });
      setSubmitted(true);
    } catch { /* silent */ }
    setLoading(false);
  };

  return (
    <section className="py-10 md:py-14" style={{ background: "#F8F7F5" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[460px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-3 font-extrabold tracking-[0.22em]" style={{ fontSize: "0.6rem" }}>EXCLUSIVE ACCESS</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-2xl md:text-[1.85rem] font-light mb-3 leading-[1.15] tracking-[-0.01em]" style={{ color: "#1A1C20" }}>
              Get Access to <span className="italic">Off-Market</span> Opportunities
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[14px] font-light leading-[1.7] mb-7 max-w-[380px] mx-auto" style={{ color: "rgba(26,28,32,0.65)" }}>
              Be the first to see private listings and exclusive opportunities before they hit the market.
            </p>

            {submitted ? (
              <div className="py-6">
                <p className="font-display text-lg font-light" style={{ color: "#C6A85B" }}>Thank you for requesting access.</p>
                <p className="text-sm mt-2 font-light" style={{ color: "rgba(26,28,32,0.55)" }}>We'll be in touch shortly with exclusive opportunities.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[420px] mx-auto">
                <div className="flex flex-col gap-2.5 mb-3">
                  <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Raleway", sans-serif', background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "4px", color: "#1A1C20", }} />
                  <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Raleway", sans-serif', background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "4px", color: "#1A1C20", }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 text-white disabled:opacity-50 transition-all duration-[250ms] ease-out hover:-translate-y-[1px] active:translate-y-0"
                  style={{
                    fontFamily: '"Raleway", sans-serif', fontSize: "12px", letterSpacing: "0.12em", fontWeight: 500,
                    background: "#0C0F24", borderRadius: "4px",
                  }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "#C6A85B"; e.currentTarget.style.color = "#0C0F24"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0C0F24"; e.currentTarget.style.color = "#FFFFFF"; }}>
                  {loading ? "Sending..." : "Unlock Private Access"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 9 — FINAL CTA
   ───────────────────────────────────────────── */

const FinalCTA = () => (
  <section className="py-24 md:py-32 bg-primary">
    <div className="container mx-auto px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <ScrollReveal>
          <p className="text-minimal text-gold mb-5 font-extrabold tracking-[0.22em]">GET STARTED</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-light text-primary-foreground/90 mb-5 leading-[1.1] tracking-[-0.01em]">
            Work With <span className="italic">Echelon Property Group</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-primary-foreground/40 text-[15px] font-light leading-[1.8] mb-12 max-w-[400px] mx-auto">
            Luxury real estate, redefined through strategy, access, and execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/buy"
              className="inline-block bg-warm-cream text-foreground px-12 py-[1rem] text-center hover:bg-gold hover:text-white transition-all duration-[400ms]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600 }}>
              BUY PROPERTY
            </Link>
            <Link to="/sell"
              className="inline-block border border-primary-foreground/15 text-primary-foreground/60 px-12 py-[1rem] text-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-[400ms]"
              style={{ fontFamily: '"Raleway", sans-serif', fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 400 }}>
              SELL PROPERTY
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   NOSCRIPT FALLBACK (for crawlers)
   ───────────────────────────────────────────── */

const NoscriptFallback = () => (
  <noscript>
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-light mb-6">Austin Luxury Real Estate Services</h2>
        <p className="mb-4">Echelon Property Group provides full-service luxury real estate advisory across Austin, Texas.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Luxury residential sales in Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and Rollingwood</li>
          <li>Off-market and private listing opportunities</li>
          <li>Commercial real estate and multifamily investment</li>
          <li>Land acquisition and development advisory</li>
        </ul>
        <p>2105 East MLK Blvd Ste 227, Austin, Texas 78702</p>
        <p>Email: <a href="mailto:taylor@echelonpropertygroup.com">Send an Email</a></p>
        <p>Phone: <a href="tel:+15126613843">(512) 661-3843</a></p>
      </div>
    </section>
  </noscript>
);

/* ─────────────────────────────────────────────
   PAGE COMPOSITION
   ───────────────────────────────────────────── */

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Austin Luxury Real Estate and Investment Advisory"
      description="Data-driven Austin luxury real estate advisory. Off-market access, investment strategy, and high-touch service for luxury homes, land, and commercial property."
      ogTitle="Austin Luxury Real Estate and Investment Advisory | Echelon Property Group"
      ogDescription="Strategic real estate advisory across Austin's most exclusive markets. Off-market deals, investment property, land development, and luxury homes."
    />
    <SchemaMarkup schema={organizationSchema} />
    <SchemaMarkup schema={realEstateAgentSchema} />
    <SchemaMarkup schema={localBusinessSchema} />
    <SchemaMarkup schema={taylorSherwoodSchema} />
    <SchemaMarkup schema={websiteSchema} />
    <SchemaMarkup schema={createBreadcrumbSchema([{ name: "Home", url: "https://www.echelonpropertygroup.com/" }])} />

    <Navigation />
    <Hero />
    <SearchSection />
    <TrustStrip />
    <AdvisorSection />
    <FeaturedProperties />

    <NoscriptFallback />

    <TestimonialsSection />
    <CommunitiesSection />
    <InsightsSection />
    <LeadCapture />
    <FinalCTA />

    <Suspense fallback={<div className="min-h-[100px]" />}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
