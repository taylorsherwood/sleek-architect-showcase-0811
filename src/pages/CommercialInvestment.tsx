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
    <div className="min-h-screen bg-background">
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

      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0">
          <CommercialHeroVideo />
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to bottom, rgba(10,14,25,0.35) 0%, rgba(10,14,25,0.45) 45%, rgba(10,14,25,0.70) 100%)' }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, rgba(10,14,25,0.7) 0%, rgba(10,14,25,0.45) 40%, rgba(10,14,25,0.15) 65%, transparent 85%)' }} />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-xl py-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">COMMERCIAL & INVESTMENT</p>
            <h1 className="text-3xl sm:text-3xl sm:text-5xl md:text-7xl font-display font-normal text-warm-cream mb-5 sm:mb-8">
              Austin Commercial & Investment Real Estate
            </h1>
            <p className="text-xl text-warm-cream/80 max-w-3xl">
              Multifamily, retail, office, land development, and income-producing investment
              opportunities across the Austin metro.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-primary-foreground px-8 py-4 transition-colors duration-300"
              >
                DISCUSS AN ACQUISITION
              </Link>
              <Link
                to="/austin-multifamily-report-2026"
                className="inline-block text-minimal border border-primary-foreground/50 text-primary-foreground hover:bg-gold hover:text-white hover:border-gold px-8 py-4 transition-colors duration-300"
              >
                2026 MULTI FAMILY REPORT
              </Link>
            </div>
            <div className="mt-12 inline-flex flex-col items-start">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2.5 font-normal">Brokered with</span>
              <a href="https://www.expcommercial.com" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center px-6 py-3 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-white/[0.1] transition-colors duration-300">
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
      <section className="py-16 md:py-24 bg-background border-t border-border">
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
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={gillisStreet}
                    alt="4314 Gillis Street, Austin TX 78745 — 24-unit multifamily"
                    title="4314 Gillis Street — 24-unit multifamily investment, Austin TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    MULTIFAMILY
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$2,500,000</span>
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
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={sanJoseAve}
                    alt="10811 San Jose Ave, Del Valle TX — 3.06 acres redevelopment land"
                    title="10811 San Jose Ave — development land opportunity, Del Valle TX"
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
                  <Link
                    to="/contact"
                    className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                    style={ctaStyle}
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>

              {/* 717 S. 11th St */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={s11thStreet}
                    alt="717 S. 11th St, Temple TX — 6-unit multifamily"
                    title="717 S. 11th St — multifamily investment, Temple TX"
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
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={killeenPortfolio}
                    alt="Small Killeen Rental Portfolio — 9 rentable units, 100% occupied"
                    title="Small Killeen Rental Portfolio — rental investment, Killeen TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    RENTAL PORTFOLIO
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
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={bremserAve}
                    alt="709/711/713 Bremser Ave, Killeen TX — 3 individual rental homes"
                    title="709/711/713 Bremser Ave — rental homes, Killeen TX"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                    RENTAL PORTFOLIO
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$240,000</span>
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
                  <Link
                    to="/contact"
                    className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                    style={ctaStyle}
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Private Market Opportunities ── */}
      <section className="py-16 md:py-24 bg-secondary border-t border-border">
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
                  type: "Retail Center",
                  name: "Anchored Neighborhood Center",
                  location: "Cedar Park, TX",
                  price: "$6,750,000",
                  capRate: "6.2%",
                  sqft: "32,000",
                  highlights: "95% occupied, NNN leases, high-growth suburban submarket"
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
                  className="border-2 border-border bg-card p-8 hover:border-gold transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-secondary px-3 py-1 text-muted-foreground" style={labelStyle}>{listing.type}</span>
                    <span className="text-lg font-light text-foreground ">{listing.price}</span>
                  </div>
                  <h3 className="text-xl font-display font-normal text-foreground mb-2">
                    {listing.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{listing.location}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>CAP RATE</p>
                      <p className="text-foreground font-medium text-sm ">{listing.capRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={labelStyle}>SIZE</p>
                      <p className="text-foreground font-medium text-sm ">{listing.sqft}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{listing.highlights}</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      to="/contact"
                      className="text-gold hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase"
                    >
                      REQUEST DETAILS →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Search ── */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold mb-4 font-bold" style={labelStyle}>INVESTMENT SEARCH</p>
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-6">
                  Find Your Next Austin Investment Property
                </h2>
                <p className="text-muted-foreground text-sm md:text-[0.925rem] leading-relaxed mb-6">
                  Whether you're targeting multifamily acquisitions, NNN retail, value-add office,
                  or development land, our team provides institutional-grade deal sourcing and
                  underwriting for individual and portfolio-level investors.
                </p>
                <ul className="space-y-3.5 mb-8">
                  {[
                    "Multifamily & apartment complexes",
                    "Retail & restaurant NNN investments",
                    "Office & creative workspace",
                    "Industrial & logistics facilities",
                    "Development land & entitled parcels",
                    "Mixed-use & build-to-rent projects"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span className="text-muted-foreground text-[0.925rem] font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-block bg-primary text-primary-foreground hover:bg-gold px-8 py-4 transition-all duration-300 ease-out active:scale-[0.98]"
                  style={labelStyle}
                >
                  SHARE YOUR INVESTMENT CRITERIA
                </Link>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Assets Under Advisory", value: "$85M+" },
                  { label: "Average Cap Rate (Multifamily)", value: "5.2%" },
                  { label: "Active Austin Submarkets", value: "12+" },
                  { label: "Investor Clients Served", value: "50+" }
                ].map((stat, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <p className="text-muted-foreground mb-2" style={labelStyle}>{stat.label}</p>
                    <p className="text-3xl md:text-4xl font-light text-foreground ">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Overview + FAQ ── */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
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
      <section className="py-16 md:py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <p className="text-gold mb-4 font-bold" style={labelStyle}>GET STARTED</p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4">
            Looking for a Commercial Acquisition?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed  mb-8">
            Share your criteria for multifamily, retail, office, land, or value-add investments
            in Austin and surrounding markets.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground hover:bg-gold px-10 py-4 transition-all duration-300 ease-out active:scale-[0.98]"
              style={labelStyle}
            >
              SHARE INVESTMENT CRITERIA
            </Link>
            <Link
              to="/contact"
              className="inline-block border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary px-10 py-4 transition-all duration-300 ease-out"
              style={labelStyle}
            >
              CONTACT TAYLOR SHERWOOD
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CommercialInvestment;
