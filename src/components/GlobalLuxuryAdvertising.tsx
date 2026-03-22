import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Globe, Monitor, BookOpen, MapPin, CheckCircle, ArrowRight } from "lucide-react";

import heroImg from "@/assets/global-luxury-hero.jpg";
import digitalImg from "@/assets/marketing-digital.jpg";
import printImg from "@/assets/marketing-print.png";
import localImg from "@/assets/marketing-local.jpg";

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

/* helper: stagger class */
const stagger = (visible: boolean, delay: number) =>
  `transition-all duration-[1000ms] cubic-bezier(0.16,1,0.3,1) ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }` + (delay ? ` delay-[${delay}ms]` : "");

/* Since Tailwind can't JIT arbitrary delay classes reliably, use inline styles */
const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

const revealScaleStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
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
  "80+ International Sites",
];

const marketingCards = [
  {
    title: "Digital Experience",
    description: "Immersive digital presentation designed to capture attention and engage qualified buyers.",
    image: digitalImg,
    icon: Monitor,
  },
  {
    title: "Print & Editorial",
    description: "High-design collateral and editorial-quality marketing materials that elevate the property's perception.",
    image: printImg,
    icon: BookOpen,
  },
  {
    title: "Local Presence",
    description: "Strategic on-the-ground marketing that creates visibility, credibility, and momentum where it matters.",
    image: localImg,
    icon: MapPin,
  },
];

const benefits = [
  "Attracts more qualified and affluent buyers",
  "Increases perceived value and competitive interest",
  "Supports stronger offers and reduced time on market",
];

const authorityStats = [
  { label: "75+ Countries Reached", icon: Globe },
  { label: "Millions of Monthly Luxury Buyers" },
  { label: "Global Distribution Network" },
  { label: "Affluent Buyer Targeting" },
];

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

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  1 · HERO STRIP                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={(node: HTMLDivElement | null) => { heroRef.current = node; (hero.ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
        className="relative min-h-[60vh] md:min-h-[65vh] flex items-center overflow-hidden"
      >
        {/* BG image with slow zoom */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Global luxury real estate marketing collage"
            className="w-full h-full object-cover will-change-transform"
            style={{ transform: `scale(${heroZoom})`, transition: "transform 0.1s linear" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[#0C0F24]/55" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-28 md:py-36">
          <div className="max-w-2xl">
            <p
              className="text-minimal text-gold mb-5 font-extrabold"
              style={revealStyle(hero.visible, 0)}
            >
              GLOBAL LUXURY ADVERTISING
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-primary-foreground leading-[1.08] mb-6"
              style={revealStyle(hero.visible, 200)}
            >
              Your Property,
              <br />
              <span className="italic">Everywhere</span> It Matters
            </h2>
            <p
              className="text-primary-foreground/70 text-lg md:text-xl max-w-xl leading-relaxed"
              style={revealStyle(hero.visible, 420)}
            >
              Strategically positioned across the world's most influential luxury media, digital, and print platforms.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  2 · PLATFORM EXPOSURE                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-background" ref={platforms1.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left – text */}
            <div style={revealStyle(platforms1.visible, 0)}>
              <p className="text-minimal text-gold mb-4 font-extrabold">GLOBAL REACH</p>
              <h2 className="text-3xl md:text-5xl font-display font-light text-architectural mb-6">
                Featured Across Recognized Luxury Media
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Your home is positioned across an elite network of luxury, financial, and international real estate platforms designed to maximize visibility among affluent buyers.
              </p>

              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-foreground text-sm"
                    style={revealStyle(platforms1.visible, 200 + i * 60)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right – staggered visual cards */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {[digitalImg, printImg, localImg, heroImg].map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded group cursor-default ${
                    i === 0 ? "col-span-2 aspect-[16/9]" :
                    i === 3 ? "col-span-2 aspect-[16/7]" :
                    "aspect-[4/3]"
                  }`}
                  style={revealScaleStyle(platforms1.visible, 300 + i * 150)}
                >
                  <img
                    src={img}
                    alt="Luxury marketing creative"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  3 · MARKETING EXECUTION – 3 CARDS                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-secondary/40" ref={cards.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" style={revealStyle(cards.visible, 0)}>
              <p className="text-minimal text-gold mb-4 font-extrabold">MARKETING EXECUTION</p>
              <h2 className="text-3xl md:text-5xl font-display font-light text-architectural">
                Three Pillars of Premium Presentation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {marketingCards.map((card, i) => (
                <div
                  key={card.title}
                  className="group bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-architectural transition-all duration-500 hover:-translate-y-1"
                  style={revealScaleStyle(cards.visible, 200 + i * 180)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-2.5 mb-3">
                      <card.icon className="w-4 h-4 text-gold" />
                      <h3 className="text-lg font-display font-medium">{card.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  4 · WHY THIS MATTERS                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-32 bg-background" ref={why.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold" style={revealStyle(why.visible, 0)}>
              WHY THIS MATTERS
            </p>
            <h2
              className="text-3xl md:text-5xl font-display font-light text-architectural mb-6"
              style={revealStyle(why.visible, 150)}
            >
              Luxury Exposure That Helps Drive Better Results
            </h2>
            <p
              className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
              style={revealStyle(why.visible, 300)}
            >
              Effective marketing is not just about visibility — it's about reaching the right buyers, elevating perceived value, and creating the conditions for stronger offers.
            </p>

            <div className="space-y-5 max-w-lg mx-auto text-left">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={revealStyle(why.visible, 450 + i * 120)}
                >
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-foreground leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  5 · AUTHORITY STAT STRIP                                      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-muted/50 border-y border-border/40" ref={stats.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {authorityStats.map((s, i) => (
              <div
                key={i}
                className="text-center md:border-r last:border-0 border-border/40"
                style={revealStyle(stats.visible, i * 120)}
              >
                <p
                  className="text-[11px] uppercase font-medium text-muted-foreground"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  6 · CTA                                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-32 bg-background" ref={cta.ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold" style={revealStyle(cta.visible, 0)}>
              CUSTOM STRATEGY
            </p>
            <h2
              className="text-3xl md:text-5xl font-display font-light text-architectural mb-6"
              style={revealStyle(cta.visible, 150)}
            >
              See Your Property Marketing Plan
            </h2>
            <p
              className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto"
              style={revealStyle(cta.visible, 300)}
            >
              Discover how your home would be positioned, presented, and promoted to attract the right buyers.
            </p>
            <div style={revealStyle(cta.visible, 450)}>
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-white px-12 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-architectural"
              >
                GET MY PROPERTY MARKETING PLAN
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalLuxuryAdvertising;
