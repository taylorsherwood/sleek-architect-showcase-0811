import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Monitor, BookOpen, MapPin, CheckCircle } from "lucide-react";

import heroImg from "@/assets/global-luxury-hero.jpg";
import digitalImg from "@/assets/marketing-digital.jpg";
import printImg from "@/assets/marketing-print.jpg";
import localImg from "@/assets/marketing-local.jpg";
import collageImg from "@/assets/marketing-collage-spaced.jpg";
import expLuxuryLogo from "@/assets/exp-luxury-logo-white.png";

/* ------------------------------------------------------------------ */
/*  Scroll-triggered reveal hook                                       */
/* ------------------------------------------------------------------ */

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* Inline style helpers */
const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
});

const revealScaleStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
});

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const platforms = [
  "Robb Report",
  "Mansion Global",
  "Wall Street Journal",
  "Barron's",
  "JamesEdition",
  "MarketWatch",
  "Unique Homes",
  "LuxuryEstate",
  "UPMKT",
  "80+ International Sites"
];

const marketingCards = [
  {
    title: "Digital Experience",
    description: "Immersive digital presentation designed to capture attention and engage qualified buyers.",
    image: digitalImg,
    icon: Monitor
  },
  {
    title: "Print & Editorial",
    description: "High-design collateral and editorial-quality materials that elevate perception.",
    image: printImg,
    icon: BookOpen
  },
  {
    title: "Local Presence",
    description: "Strategic on-the-ground marketing that creates visibility and momentum where it matters.",
    image: localImg,
    icon: MapPin
  }
];

const benefits = [
  "More qualified buyers competing for your home",
  "Higher perceived value → stronger offers",
  "Faster sales with less friction"
];

const authorityStats = [
  { label: "Global Reach Across 75+ Countries" },
  { label: "Millions of Affluent Buyers Monthly" },
  { label: "Premium Media Network Distribution" },
  { label: "Affluent Buyer Targeting" }
];

/* ------------------------------------------------------------------ */
/*  Smooth parallax drift (RAF-based, no re-renders)                   */
/* ------------------------------------------------------------------ */
function useParallaxDrift(factor = 0.06) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const drift = (viewCenter - center) * factor;
      el.style.transform = `translateY(${drift}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [factor]);

  return containerRef;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const GlobalLuxuryAdvertising = () => {
  /* Hero zoom */
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroZoom, setHeroZoom] = useState(1);
  const hero = useScrollReveal(0.1);

  useEffect(() => {
    const handleScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height)));
      setHeroZoom(1 + progress * 0.08);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const platforms1 = useScrollReveal(0.12);
  const cards = useScrollReveal(0.1);
  const why = useScrollReveal(0.15);
  const stats = useScrollReveal(0.2);
  const cta = useScrollReveal(0.15);
  const collageParallaxRef = useParallaxDrift(0.06);

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  1 · HERO STRIP                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={(node: HTMLDivElement | null) => { heroRef.current = node; (hero.ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">

        {/* BG image with slow zoom */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Global luxury real estate marketing collage"
            className="w-full h-full object-cover will-change-transform"
            style={{ transform: `scale(${heroZoom})`, transition: "transform 0.1s linear" }}
            loading="lazy"
            decoding="async"
            sizes="100vw"
            width={1920}
            height={1080}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0C0F24]/55" />
          {/* Bottom gradient for text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C0F24]/70 to-transparent" />
          {/* Bottom-right vignette to balance removed logo */}
          <div
            className="absolute bottom-0 right-0 w-2/3 h-2/3 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(12,15,36,0.35) 0%, transparent 70%)" }}
          />
        </div>

        {/* Subtle left-side text integration gradient */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(12,15,36,0.25) 0%, transparent 80%)" }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="max-w-2xl ml-2 md:ml-4">
              {/* Eyebrow */}
              <p
                className="text-minimal text-gold mb-3 font-extrabold"
                style={revealStyle(hero.visible, 0)}>
                GLOBAL LUXURY ADVERTISING
              </p>

              {/* Seller hook — more space above */}
              <p
                className="text-primary-foreground/75 text-sm md:text-base font-light mt-5 mb-4"
                style={{
                  ...revealStyle(hero.visible, 150),
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                }}>
                Positioned to Achieve Maximum Value
              </p>

              {/* Divider — shorter, subtler */}
              <div
                className="mb-5"
                style={{
                  ...revealStyle(hero.visible, 300),
                  width: 48,
                  height: 1,
                  background: "#b8a06d",
                }}
              />

              {/* Headline */}
              <h2
                className="text-5xl md:text-7xl lg:text-[5.2rem] font-display font-normal text-primary-foreground leading-[1.05] mb-6"
                style={revealStyle(hero.visible, 420)}>
                Your Property,
                <br />
                <span className="italic text-primary-foreground/90">Everywhere It</span> Matters
              </h2>

              {/* Subheadline */}
              <p
                className="text-primary-foreground/60 text-lg md:text-xl leading-[1.7]"
                style={{ ...revealStyle(hero.visible, 620), maxWidth: "20rem" }}>
                Strategically positioned across the world's most influential luxury media, digital, and print platforms.
              </p>
            </div>

            {/* CTA Box */}
            <div
              className="lg:mr-8 xl:mr-16 shrink-0"
              style={revealStyle(hero.visible, 700)}>
              <div className="bg-background/10 backdrop-blur-md border border-primary-foreground/15 p-8 md:p-10 max-w-sm">
                <p className="text-minimal text-gold mb-3 font-extrabold">VALUATION REPORT</p>
                <h3 className="text-2xl md:text-3xl font-display font-normal text-primary-foreground mb-4 leading-tight">
                  What Is Your Property Worth?
                </h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed mb-8">
                  Request a complimentary, confidential valuation combining real-time market data and neighborhood-level expertise.
                </p>
                <Link
                  to="/home-value-austin"
                  className="inline-block text-minimal bg-gold hover:bg-gold text-white px-8 py-3.5 transition-colors duration-300 w-full text-center">
                  GET YOUR VALUE ESTIMATE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  2 · PLATFORM EXPOSURE                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-18 bg-background relative overflow-hidden" ref={platforms1.ref}>
        {/* ── Oversized WSJ anchor mark — nearly imperceptible ── */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
          style={{
            opacity: platforms1.visible ? 1 : 0,
            transition: "opacity 1.8s cubic-bezier(0.16,1,0.3,1) 200ms",
          }}>
          <span
            className="absolute font-display font-normal uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.2rem)",
              letterSpacing: "0.14em",
              right: "5%",
              top: "54%",
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, hsl(35 18% 55% / 0.015) 0%, hsl(35 18% 55% / 0.03) 60%, hsl(35 18% 55% / 0.03) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Wall Street Journal
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left – text */}
            <div className="max-w-[480px]" style={revealStyle(platforms1.visible, 0)}>
              <p className="text-minimal text-gold mb-4" style={{ letterSpacing: "0.14em" }}>LUXURY SYNDICATION</p>
              <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-5">
                Featured Across <br /> Recognized Luxury Media
              </h2>
              <p
                className="text-foreground/75 mb-10 max-w-[410px]"
                style={{ lineHeight: 1.7, fontSize: "15px", letterSpacing: "0.01em", ...revealStyle(platforms1.visible, 200) }}>
                Your property is positioned within a curated network of the world's most influential luxury, financial, and real estate platforms — strategically selected to reach qualified, high-intent buyers globally.
              </p>

              {/* Publication proof block */}
              <div style={revealStyle(platforms1.visible, 400)}>
                <p className="text-minimal text-gold mb-3" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>
                  SELECT MEDIA DISTRIBUTION
                </p>
                <div
                  className="mb-5"
                  style={{ width: 28, height: 1, background: "#b8a06d" }}
                />
                <p className="text-foreground/85 text-sm tracking-[0.06em] font-medium" style={{ lineHeight: 2.4 }}>
                  Robb Report · Mansion Global · Wall Street Journal · Barron's
                  <br />
                  JamesEdition · MarketWatch · Unique Homes · LuxuryEstate
                </p>
              </div>

              {/* Stat line */}
              <div className="mt-12 pt-7" style={{ ...revealStyle(platforms1.visible, 550), borderTop: "1px solid hsl(var(--border))" }}>
                <p className="text-minimal text-gold mb-3" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>
                  GLOBAL REACH
                </p>
                <p className="text-foreground flex items-baseline gap-2.5" ref={globalReachRef}>
                  <span className="text-4xl md:text-5xl font-display font-normal" style={{ letterSpacing: "0.02em" }}>{globalReachCount}+</span>
                  <span className="text-muted-foreground text-[11px] tracking-[0.1em] uppercase">International Distribution Channels</span>
                </p>
              </div>
            </div>

            {/* Right – collage image with smooth parallax drift */}
            <div
              className="overflow-hidden group cursor-default bg-primary"
              style={revealScaleStyle(platforms1.visible, 300)}>
              <div
                ref={collageParallaxRef}
                className="will-change-transform"
                style={{ transition: "transform 0.1s linear" }}>
                <img
                  src={collageImg}
                  alt="Luxury marketing collage featuring Robb Report, Wall Street Journal, Mansion Global, UPMKT, and eXp Luxury"
                  className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  3 · MARKETING EXECUTION – 3 CARDS                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-secondary" ref={cards.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" style={revealStyle(cards.visible, 0)}>
              <p className="text-minimal text-gold mb-4 font-extrabold">MARKETING EXECUTION</p>
              <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural">
                Three Pillars of Premium Presentation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
              {marketingCards.map((card, i) =>
                <div
                  key={card.title}
                  className="group bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-architectural transition-all duration-500 hover:-translate-y-1"
                  style={revealScaleStyle(cards.visible, 200 + i * 180)}>
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      width={800}
                      height={533}
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-2.5 mb-3">
                      <card.icon className="w-4 h-4 text-gold" />
                      <h3 className="text-base font-display font-medium">{card.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{card.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  4 · WHY THIS MATTERS                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-background" ref={why.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold" style={revealStyle(why.visible, 0)}>
              WHY THIS MATTERS
            </p>
            <h2
              className="text-3xl md:text-5xl font-display font-normal text-architectural mb-6"
              style={revealStyle(why.visible, 150)}>
              Luxury Exposure That Drives Better Results
            </h2>
            <p
              className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
              style={revealStyle(why.visible, 300)}>
              Effective marketing is not just about visibility — it's about reaching the right buyers, elevating perceived value, and creating the conditions for stronger offers.
            </p>

            <div className="space-y-5 max-w-lg mx-auto text-left">
              {benefits.map((b, i) =>
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={revealStyle(why.visible, 450 + i * 120)}>
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-foreground leading-relaxed">{b}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  5 · AUTHORITY STAT STRIP                                      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-secondary border-y border-border/40" ref={stats.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {authorityStats.map((s, i) =>
              <div
                key={i}
                className="text-center md:border-r last:border-0 border-border/40"
                style={revealStyle(stats.visible, i * 120)}>
                <p
                  className="text-[11px] uppercase font-medium text-muted-foreground"
                  style={{ letterSpacing: "0.16em" }}>
                  {s.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  6 · CTA                                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-background" ref={cta.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold" style={revealStyle(cta.visible, 0)}>
              CUSTOM STRATEGY
            </p>
            <h2
              className="text-3xl md:text-5xl font-display font-normal text-architectural mb-6"
              style={revealStyle(cta.visible, 150)}>
              See Your Property Marketing Plan
            </h2>
            <p
              className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto"
              style={revealStyle(cta.visible, 300)}>
              Discover how your home would be positioned, presented, and promoted to attract the right buyers.
            </p>
            <div style={revealStyle(cta.visible, 450)}>
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-white px-12 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-architectural">
                GET MY CUSTOM MARKETING PLAN
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalLuxuryAdvertising;
