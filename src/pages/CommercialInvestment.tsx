import { Link } from "react-router-dom";
import { lazy, Suspense, useRef, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import expCommercialLogo from "@/assets/exp-commercial-logo-horizontal-white.webp";
import gillisStreet from "@/assets/commercial-gillis-street.jpg";
import sanJoseAve from "@/assets/commercial-san-jose-ave.jpg";
import bremserAve from "@/assets/commercial-bremser-ave.jpg";
import killeenPortfolio from "@/assets/commercial-killeen-portfolio.jpg";
import s11thStreet from "@/assets/commercial-s-11th-street.webp";

const Footer = lazy(() => import("@/components/Footer"));
import LandCrossLinks from "@/components/LandCrossLinks";


const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const ctaStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
  fontWeight: 500 as const,
};

const faqs = [
  {
    question: "What types of commercial investment properties are available in Austin?",
    answer: "Austin offers a wide range of commercial investment opportunities including multifamily apartment complexes, retail centers, Class A and B office buildings, industrial and logistics facilities, mixed-use developments, and development land across the metro's high-growth corridors."
  },
  {
    question: "What cap rates should I expect for Austin investment properties?",
    answer: "Cap rates in Austin vary by asset class. Multifamily properties typically trade at 4.5–5.5%, Class A office at 5.0–6.5%, suburban retail at 5.5–7.0%, and industrial at 5.0–6.0%. Value-add opportunities may offer higher cap rates with NOI improvement potential."
  },
  {
    question: "Is Austin a good market for commercial real estate investment?",
    answer: "Yes. Austin consistently ranks among the top U.S. metros for commercial investment thanks to robust population growth, an expanding tech economy, no state income tax, and strong in-migration trends that drive sustained demand across all asset classes."
  },
  {
    question: "Does Echelon Property Group work with out-of-state investors?",
    answer: "Absolutely. We provide comprehensive market orientation, submarket analysis, property tours, and end-to-end transaction management for out-of-state and international investors seeking Austin commercial and investment real estate."
  },
];

const CommercialHeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayedOnce = useRef(false);
  const [useVideo] = useState(() => window.innerWidth >= 768);
  const [videoReady, setVideoReady] = useState(false);

  // Play video as soon as it's ready
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = () => {
      video.play().then(() => setVideoReady(true)).catch(() => {
        setTimeout(() => {
          video.muted = true;
          video.play()?.then(() => setVideoReady(true)).catch(() => {});
        }, 800);
      });
    };

    if (video.readyState >= 2) attemptPlay();
    else video.addEventListener("loadeddata", attemptPlay, { once: true });
  }, [useVideo]);

  // Re-trigger playback when user scrolls back to top
  useEffect(() => {
    if (!useVideo) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasPlayedOnce.current) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [useVideo]);

  // Mark first play complete when video ends; pause on last frame
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => {
      hasPlayedOnce.current = true;
      video.pause();
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [useVideo]);

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      {useVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/commercial-hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/images/commercial-hero-poster-mobile.webp"
          alt="Austin commercial real estate"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={780}
          height={585}
        />
      )}
    </div>
  );
};

const CommercialInvestment = () => {
  return (
    <div className="commercial-theme min-h-screen" style={{ backgroundColor: "#1B1E24" }}>
      <SEOHead
        title="Austin Commercial Investment | Echelon Property Group"
        description="Austin commercial and investment real estate: multifamily, retail, office, land, and income-producing properties. Expert advisory from Echelon Property Group."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Listings", url: "https://www.echelonpropertygroup.com/listings" },
        { name: "Commercial Investment", url: "https://www.echelonpropertygroup.com/listings/commercial-investment-austin" }
      ])} />
      <Navigation />

      {/* Hero — Gillis OM treatment: full-bleed image, kicker over hairline, brass-outline CTAs */}
      <section className="relative w-full min-h-[760px] md:min-h-[860px] lg:min-h-[920px] overflow-hidden flex items-end pt-32 md:pt-36">
        <div className="absolute inset-0">
          <CommercialHeroVideo />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(27,30,36,0.55) 0%, rgba(27,30,36,0.30) 30%, rgba(27,30,36,0.55) 70%, rgba(27,30,36,0.88) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full container mx-auto px-6 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <p className="cm-kicker cm-hero-glow mb-6" style={{ color: "rgba(247,245,242,0.85)" }}>
              INVESTOR MEMORANDUM · ECHELON COMMERCIAL &amp; INVESTMENT
            </p>

            <h1
              className="font-display text-warm-cream uppercase leading-[1.05] mb-6 cm-hero-glow"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
                letterSpacing: "0.03em",
                fontWeight: 500,
              }}
            >
              Austin Commercial<br className="hidden md:block" /> &amp; Investment Real Estate
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-warm-cream/70 text-[11px] md:text-xs tracking-[0.22em] uppercase cm-hero-glow mb-10">
              <span>Multifamily</span>
              <span style={{ color: "#A68A5B" }}>·</span>
              <span>Development Land</span>
              <span style={{ color: "#A68A5B" }}>·</span>
              <span>Income-Producing Assets</span>
              <span style={{ color: "#A68A5B" }}>·</span>
              <span>Off-Market Pipeline</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-white/15 pt-8 max-w-3xl mb-12">
              {[
                { label: "Assets Under Advisory", value: "$85M+" },
                { label: "Active Submarkets", value: "12+" },
                { label: "Avg Cap (Multifamily)", value: "5.2%" },
                { label: "Investor Clients", value: "50+" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="cm-kicker cm-hero-glow mb-2" style={{ color: "rgba(247,245,242,0.6)" }}>{s.label}</p>
                  <p className="font-display text-warm-cream cm-hero-glow" style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)", letterSpacing: "0.03em" }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 cm-hero-glow">
              <Link
                to="/contact"
                className="cm-kicker text-warm-cream px-8 py-4 transition-colors duration-300"
                style={{ background: "#252932", border: "1px solid #A68A5B" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(166,138,91,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#252932"; }}
              >
                Discuss an Acquisition
              </Link>
              <Link
                to="/austin-multifamily-report-2026"
                className="cm-kicker text-warm-cream/90 px-8 py-4 transition-colors duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
              >
                2026 Multifamily Report
              </Link>
            </div>

            <div className="mt-12 inline-flex flex-col items-start">
              <span className="cm-kicker mb-2.5" style={{ color: "rgba(247,245,242,0.55)" }}>Brokered with</span>
              <a href="https://www.expcommercial.com" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center px-6 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-300">
                <img
                  src={expCommercialLogo}
                  alt="eXp Commercial"
                  className="h-10 md:h-12 w-auto object-contain"
                  loading="eager"
                />
              </a>
            </div>
          </div>
        </div>
      </section>




      {/* ── Current Commercial Listings ── */}
      <section className="cm-surface-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>CURRENT INVENTORY</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-4">
                Current Commercial Listings
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto">
                Available commercial, land, and investment opportunities represented by Echelon Property Group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gillis Street */}
              <div className="cm-listing-card border border-border/60 overflow-hidden group bg-card hover:border-gold transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={gillisStreet}
                    alt="4314 Gillis Street, Austin TX 78745, 24-unit multifamily"
                    title="4314 Gillis Street, 24-unit multifamily investment, Austin TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    MULTIFAMILY
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$2,495,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">
                    4314 Gillis Street
                  </h3>
                  <p className="text-muted-foreground mb-2 ">Austin, TX 78745</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">Value-Add Multifamily</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">24</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                    24-unit value-add multifamily opportunity in South Austin. Well-positioned for rent growth and operational improvements in a high-demand rental corridor.
                  </p>
                  <Link
                    to="/contact"
                    className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                    style={ctaStyle}
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>

              {/* San Jose Ave */}
              <a href="https://www.10811sanjose.com" target="_blank" rel="noopener noreferrer" className="cm-listing-card border border-border/60 overflow-hidden group bg-card hover:border-gold transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={sanJoseAve}
                    alt="10811 San Jose Ave, Del Valle TX, 3.06 acres redevelopment land"
                    title="10811 San Jose Ave, development land opportunity, Del Valle TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    DEVELOPMENT LAND
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$1,600,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">
                    10811 San Jose Ave
                  </h3>
                  <p className="text-muted-foreground mb-2 ">Del Valle, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">Redevelopment Land</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">3.06 Acres</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                    3.06-acre redevelopment parcel with existing mobile homes and zero zoning restrictions. Ideal for ground-up multifamily, mixed-use, or commercial development in the high-growth Del Valle corridor.
                  </p>
                  <span className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={ctaStyle}>
                    VIEW PROPERTY WEBSITE
                  </span>
                </div>
              </a>

              {/* 717 S. 11th St */}
              <div className="cm-listing-card border border-border/60 overflow-hidden group bg-card hover:border-gold transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={s11thStreet}
                    alt="717 S. 11th St, Temple TX, 6-unit multifamily"
                    title="717 S. 11th St, multifamily investment, Temple TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    MULTIFAMILY
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">Price Upon Request</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">
                    717 S. 11th St.
                  </h3>
                  <p className="text-muted-foreground mb-2 ">Temple, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">6-Unit Multifamily</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>CONDITION</p>
                      <p className="text-foreground font-medium text-sm ">Recently Renovated</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                    Recently renovated 6-unit multifamily property in Temple, TX. Contact for pricing and additional details.
                  </p>
                  <Link
                    to="/contact"
                    className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                    style={ctaStyle}
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>

              {/* Small Killeen Rental Portfolio */}
              <div className="cm-listing-card border border-border/60 overflow-hidden group bg-card hover:border-gold transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={killeenPortfolio}
                    alt="Small Killeen Rental Portfolio, 9 rentable units, 100% occupied"
                    title="Small Killeen Rental Portfolio, rental investment, Killeen TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    SOLD
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$550,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">
                    Small Killeen Rental Portfolio
                  </h3>
                  <p className="text-muted-foreground mb-2 ">Killeen, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">9 Rentable Units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>OCCUPANCY</p>
                      <p className="text-foreground font-medium text-sm ">100% Occupied</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                    9-unit rental portfolio in Killeen, TX. Fully occupied with a 14% cap rate.
                  </p>
                  <Link
                    to="/contact"
                    className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                    style={ctaStyle}
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>

              {/* 709/711/713 Bremser Ave */}
              <a href="https://www.bremserportfolio.com" target="_blank" rel="noopener noreferrer" className="cm-listing-card border border-border/60 overflow-hidden group bg-card hover:border-gold transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={bremserAve}
                    alt="709/711/713 Bremser Ave, Killeen TX, 3 individual rental homes"
                    title="709/711/713 Bremser Ave, rental homes, Killeen TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    RENTAL PORTFOLIO
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$199,900</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">
                    709/711/713 Bremser Ave
                  </h3>
                  <p className="text-muted-foreground mb-2 ">Killeen, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">3 Individual Homes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>INCOME</p>
                      <p className="text-foreground font-medium text-sm ">Rental Income</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                    Three individual rental homes on Bremser Ave in Killeen, TX. Opportunity to acquire a small residential rental portfolio.
                  </p>
                  <span className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={ctaStyle}>
                    VIEW PROPERTY WEBSITE
                  </span>
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ── Private Market Opportunities ── */}
      <section className="cm-surface-graphite py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>PRIVATE MARKET</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-4">
                Private Market Opportunities
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto">
                Select off-market and discreetly marketed opportunities may be available upon request.
                These properties are not publicly advertised and are shared exclusively with qualified buyers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  type: "Multifamily",
                  name: "24-Unit Value-Add Complex",
                  location: "East Riverside, Austin",
                  price: "$4,200,000",
                  capRate: "5.8%",
                  sqft: "18,400",
                  highlights: "Strong rent growth corridor, proximity to Oracle HQ"
                },
                {
                  type: "Development Site",
                  name: "Kyle I-35 Development Land",
                  location: "Kyle, TX",
                  price: "$97,000,000",
                  capRate: "TBD",
                  sqft: "138 Acres",
                  highlights: "Full utilities and entitlements completed. I-35 corridor anchored by brand new Buc-ee's Store"
                },
                {
                  type: "Development Land",
                  name: "Mixed-Use Entitled Parcel",
                  location: "I-35 Corridor, Austin",
                  price: "$2,850,000",
                  capRate: "—",
                  sqft: "3.2 Acres",
                  highlights: "Entitled for 120 residential units + 8,000 SF retail"
                },
                {
                  type: "Office",
                  name: "Class B+ Creative Office",
                  location: "East Austin",
                  price: "$3,400,000",
                  capRate: "6.8%",
                  sqft: "14,200",
                  highlights: "Value-add opportunity, emerging tech corridor"
                },
              ].map((listing, index) => (
                <div
                  key={index}
                  className="cm-mem-card p-10 md:p-12 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="px-3 py-1.5"
                      style={{ ...labelStyle, color: "#B5946A", border: "1px solid rgba(156,123,74,0.45)", letterSpacing: "0.34em" }}
                    >
                      {listing.type}
                    </span>
                    <span style={labelStyle} className="text-muted-foreground">CONFIDENTIAL</span>
                  </div>
                  <h3 className="text-2xl md:text-[1.65rem] font-display font-light text-foreground mb-1.5 leading-snug">
                    {listing.name}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-sm">{listing.location}</p>

                  <div className="cm-brass-rule mb-7" />

                  <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div>
                      <p className="text-muted-foreground mb-2" style={labelStyle}>Price</p>
                      <p className="text-foreground font-display font-light text-lg md:text-xl tracking-tight">{listing.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2" style={labelStyle}>Cap Rate</p>
                      <p className="text-foreground font-display font-light text-lg md:text-xl tracking-tight">{listing.capRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2" style={labelStyle}>Size</p>
                      <p className="text-foreground font-display font-light text-lg md:text-xl tracking-tight">{listing.sqft}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                    <span style={{ ...labelStyle, color: "#B5946A" }} className="block mb-2">Investment Thesis</span>
                    {listing.highlights}
                  </p>
                  <div className="pt-6 border-t border-border">
                    <Link
                      to="/contact"
                      className="text-gold hover:text-gold transition-colors text-xs tracking-[0.22em] uppercase inline-flex items-center gap-2 group/link"
                    >
                      Request Offering Memorandum
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Search ── */}
      <section className="cm-surface-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16 items-start">
              <div className="md:col-span-5">
                <p className="cm-kicker mb-6" style={{ color: "#A68A5B" }}>Investment Search</p>
                <h2 className="font-display uppercase leading-[1.1] mb-8" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", letterSpacing: "0.03em", fontWeight: 500 }}>
                  Find Your Next Austin Investment Property
                </h2>
                <div className="cm-brass-rule w-12 mb-8" />
                <p className="text-foreground/80 leading-relaxed mb-8 max-w-prose">
                  Whether you're targeting multifamily acquisitions, NNN retail, value-add office,
                  or development land, our team provides institutional-grade deal sourcing and
                  underwriting for individual and portfolio-level investors.
                </p>
                <Link
                  to="/contact"
                  className="cm-kicker inline-block px-8 py-4 transition-colors duration-300"
                  style={{ background: "#1B1E24", color: "#F7F5F2", border: "1px solid #A68A5B" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(166,138,91,0.12)"; (e.currentTarget as HTMLElement).style.color = "#1B1E24"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1B1E24"; (e.currentTarget as HTMLElement).style.color = "#F7F5F2"; }}
                >
                  Share Your Investment Criteria
                </Link>
              </div>
              <div className="md:col-span-7">
                <p className="cm-kicker mb-6" style={{ color: "#A68A5B" }}>Asset Classes Underwritten</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-foreground/10">
                  {[
                    { t: "Multifamily", b: "5+ doors · value-add and stabilized" },
                    { t: "Retail & NNN", b: "Single-tenant, strip centers, restaurants" },
                    { t: "Office & Creative", b: "Class B/B+ in-fill, owner-user" },
                    { t: "Industrial & Logistics", b: "Flex, warehouse, last-mile" },
                    { t: "Development Land", b: "Entitled parcels and raw acreage" },
                    { t: "Mixed-Use & BTR", b: "Vertical and horizontal projects" },
                  ].map((row, i) => (
                    <div
                      key={row.t}
                      className={`py-7 px-1 sm:px-4 border-b border-foreground/10 ${i % 2 === 0 ? "sm:border-r sm:border-foreground/10" : ""}`}
                    >
                      <p className="font-display text-lg md:text-xl tracking-[0.03em] mb-1.5" style={{ fontWeight: 500 }}>{row.t}</p>
                      <p className="text-sm text-foreground/65 leading-relaxed">{row.b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Market Overview + FAQ ── */}
      <section className="cm-surface-graphite py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>MARKET OVERVIEW</p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-14">
              Austin Investment Market Insights
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-display font-normal text-foreground mb-4">
                  Why Austin for Commercial Investment
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed  mb-4">
                  Austin has emerged as one of America's premier commercial real estate markets, driven by
                  explosive population growth, major corporate relocations from Apple, Tesla, Google, Meta,
                  and Oracle, and a business-friendly tax environment with no state income tax. The metro
                  area has added over 300,000 residents in the past five years, creating sustained demand
                  across every commercial asset class.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed ">
                  For investors, Austin offers compelling risk-adjusted returns relative to coastal gateway
                  markets. Cap rates remain attractive, rent growth continues to outpace national averages
                  in key submarkets, and the metro's diversifying economy reduces concentration risk that
                  historically challenged single-industry cities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-display font-normal text-foreground mb-4">
                  Austin Multifamily Investment Landscape
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed ">
                  Multifamily remains Austin's most active commercial investment sector. Strong job growth,
                  elevated mortgage rates sustaining rental demand, and Austin's quality-of-life appeal
                  create a favorable environment for apartment investors. Suburban corridors including
                  Cedar Park, Pflugerville, Round Rock, and Kyle/Buda offer the strongest rent growth
                  trajectories for value-add and ground-up development strategies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-display font-normal text-foreground mb-4">
                  Emerging Opportunity Zones
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed ">
                  East Austin continues its transformation as the city's most dynamic development corridor.
                  The I-35 expansion project is reshaping adjacent land values and accessibility. Southeast
                  Austin, anchored by Tesla's Gigafactory and Samsung's semiconductor campus, represents one
                  of the metro's highest-growth commercial corridors. Echelon Property Group helps investors
                  identify and capitalize on these evolving submarkets before institutional capital fully
                  prices in the opportunity.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>FAQ</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-14">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-foreground font-medium text-base mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed ">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cm-surface-charcoal py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="cm-kicker mb-6" style={{ color: "#A68A5B" }}>Engage Echelon</p>
          <h2 className="font-display uppercase leading-[1.1] mb-6" style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)", letterSpacing: "0.03em", fontWeight: 500 }}>
            Looking for a Commercial Acquisition?
          </h2>
          <div className="cm-brass-rule w-12 mx-auto mb-8" />
          <p className="text-foreground/75 leading-relaxed mb-10">
            Share your criteria for multifamily, retail, office, land, or value-add investments
            in Austin and surrounding markets.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="cm-kicker inline-block px-10 py-4 transition-colors duration-300"
              style={{ background: "#252932", color: "#F7F5F2", border: "1px solid #A68A5B" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(166,138,91,0.14)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#252932"; }}
            >
              Share Investment Criteria
            </Link>
            <Link
              to="/contact"
              className="cm-kicker inline-block px-10 py-4 transition-colors duration-300"
              style={{ color: "rgba(247,245,242,0.9)", border: "1px solid rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              Contact Taylor Sherwood
            </Link>
          </div>
        </div>
      </section>


      <LandCrossLinks
        variant="solid"
        cards={["development"]}
        eyebrow="ADJACENT ADVISORY"
        heading="Development Sites & Strategic Acreage"
        intro="Beyond core commercial product, we advise on infill assemblages, industrial outdoor storage, data center sites, and path-of-growth land across Central Texas."
      />

      {/* ── Footer ── */}
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>

    </div>
  );
};

export default CommercialInvestment;
