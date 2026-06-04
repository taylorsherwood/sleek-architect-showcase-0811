import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  createFAQSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import heroVideoAsset from "@/assets/hill-country-cinematic.mp4.asset.json";
const heroVideo = heroVideoAsset.url;
import heroPosterAsset from "@/assets/hill-country-ranches-hero.jpg.asset.json";
const heroPoster = heroPosterAsset.url;
import editorialImage from "@/assets/land-ranch-editorial-v2.jpg";
import advisoryRanchImage from "@/assets/land-ranch-editorial.jpg";
import exoticWildlifeImage from "@/assets/land-ranch-exotic-wildlife.jpg";
import exoticWildlifeVideoAsset from "@/assets/exotic-wildlife.mp4.asset.json";
const exoticWildlifeVideo = exoticWildlifeVideoAsset.url;
import catLuxuryRanches from "@/assets/cat-luxury-ranches.jpg";
import catRecreational from "@/assets/cat-recreational-land.jpg";
import catInvestment from "@/assets/cat-investment-acreage.jpg";
import catDevelopment from "@/assets/cat-development-opportunities.jpg";
import catHomesites from "@/assets/cat-hill-country-homesites.jpg";
import expLandRanchLogo from "@/assets/exp-land-ranch-logo.png";
import marketFredericksburgAsset from "@/assets/market-fredericksburg.jpg.asset.json";
import marketKerrvilleAsset from "@/assets/market-kerrville.jpg.asset.json";
import marketDrippingSpringsAsset from "@/assets/market-dripping-springs.jpg.asset.json";
const marketDrippingSprings = marketDrippingSpringsAsset.url;
import marketJohnsonCityAsset from "@/assets/market-johnson-city.jpg.asset.json";
const marketJohnsonCity = marketJohnsonCityAsset.url;
import marketMarbleFallsAsset from "@/assets/market-marble-falls.jpg.asset.json";
import marketBurnetAsset from "@/assets/market-burnet.webp.asset.json";
import marketLlanoAsset from "@/assets/market-llano.jpg.asset.json";
import marketLampasasAsset from "@/assets/market-lampasas.jpg.asset.json";
const marketFredericksburg = marketFredericksburgAsset.url;
const marketKerrville = marketKerrvilleAsset.url;
const marketMarbleFalls = marketMarbleFallsAsset.url;
const marketBurnet = marketBurnetAsset.url;
const marketLlano = marketLlanoAsset.url;
const marketLampasas = marketLampasasAsset.url;

import taylorPortrait from "@/assets/taylor-sherwood-land-ranch.jpg";
import echelonWatermarkLogo from "@/assets/echelon-watermark-logo.png";
import featuredLandListingImage from "@/assets/commercial-san-jose-ave.jpg";
const ExoticWildlifeGallery = lazy(() => import("@/components/land-ranch/ExoticWildlifeGallery"));
import ConfidentialOMGate from "@/components/land-ranch/ConfidentialOMGate";



const Footer = lazy(() => import("@/components/Footer"));
const LandRanchMap = lazy(() => import("@/components/LandRanchMap"));

const SITE = "https://www.echelonpropertygroup.com";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const categories = [
  {
    title: "Luxury Ranches",
    desc: "Large acreage estates featuring custom homes, water features, equestrian facilities, and recreational amenities.",
    image: catLuxuryRanches,
  },
  {
    title: "Recreational Land",
    desc: "Properties focused on hunting, fishing, wildlife habitat, trails, and outdoor recreation.",
    image: catRecreational,
  },
  {
    title: "Investment Acreage",
    desc: "Long-term land holdings positioned for appreciation and future growth.",
    image: catInvestment,
  },
  {
    title: "Development Opportunities",
    desc: "Properties with subdivision, redevelopment, commercial, or mixed-use potential.",
    image: catDevelopment,
  },
  {
    title: "Hill Country Homesites",
    desc: "Scenic parcels suited for custom residential construction.",
    image: catHomesites,
  },
  {
    title: "Off-Market Opportunities",
    desc: "Private listings shared through industry relationships before reaching the open market.",
    image: null as string | null,
    isOffMarket: true,
  },
];


const marketSnapshot = [
  { label: "Average Price Per Acre", value: "$48,200", note: "Central Texas, trailing 12 months" },
  { label: "Active Land Inventory", value: "1,840", note: "Listings across the region" },
  { label: "Median Days on Market", value: "112", note: "Land & acreage, current cycle" },
  { label: "12-Month Appreciation Trend", value: "+6.4%", note: "Year-over-year land values" },
];


const process = [
  {
    n: "01",
    title: "Property Analysis",
    desc: "Evaluate access, utilities, topography, floodplain, and improvements.",
  },
  {
    n: "02",
    title: "Highest & Best Use Review",
    desc: "Identify residential, recreational, agricultural, investment, or development potential.",
  },
  {
    n: "03",
    title: "Market Positioning",
    desc: "Analyze comparable sales, market demand, and land-specific trends.",
  },
  {
    n: "04",
    title: "Execution Strategy",
    desc: "Develop acquisition, disposition, or long-term hold recommendations.",
  },
];

const insights = [
  {
    to: "/blog/austin-infill-development",
    eyebrow: "Redevelopment",
    title: "Austin Infill Development: How to Evaluate, Plan, and Execute a Redevelopment Opportunity",
  },
  {
    to: "/blog/austin-redevelopment-opportunities",
    eyebrow: "Investment",
    title: "Austin Redevelopment Opportunities: How to Identify, Evaluate, and Act on Underutilized Property",
  },
  {
    to: "/blog/highest-and-best-use-property-austin",
    eyebrow: "Advisory",
    title: "How to Determine the Highest and Best Use of a Property in Austin",
  },
  {
    to: "/blog/austin-ranch-land-for-sale",
    eyebrow: "Land & Ranch",
    title: "Austin Ranch Land Guide: Acreage, Hill Country Opportunities, and Land Investment",
  },
];

const faqs = [
  {
    question: "How is ranch land valued in Texas?",
    answer:
      "Ranch land in Texas is valued based on a combination of location, topography, water availability, road frontage, agricultural or wildlife exemption status, improvements, and highest and best use. Recreational ranches often carry premiums for water features, mature live oaks, and views, while investment acreage is typically priced relative to growth corridors and future development potential.",
  },
  {
    question: "What impacts the value of acreage?",
    answer:
      "Key drivers include access (paved versus deeded easement), utility availability, surface and groundwater rights, floodplain coverage, soil and topography, fencing and improvements, proximity to growth corridors like Austin, Dripping Springs, and the Highway 290 West corridor, and current tax-valuation status. Smaller details like minerals, restrictions, and survey accuracy can also materially affect value.",
  },
  {
    question: "How do agricultural and wildlife exemptions affect value?",
    answer:
      "Agricultural and wildlife valuations significantly reduce annual property taxes by assessing land on productive capacity rather than market value. A property losing its exemption can see a sharp tax increase and a corresponding impact on resale value. Buyers and sellers should understand whether an existing exemption transfers, what activity is required to maintain it, and how rollback taxes may apply if the use changes.",
  },
  {
    question: "What is highest and best use?",
    answer:
      "Highest and best use is the analysis of what a property can legally, physically, and financially support that produces the greatest value. For land, this might mean keeping a property as a recreational ranch, repositioning it for residential development, subdividing into homesites, holding as investment acreage, or selling to a developer. The right answer is property specific and changes with the market.",
  },
  {
    question: "How do I determine development potential?",
    answer:
      "Development potential depends on zoning or county regulations, utility access, road frontage, topography, floodplain, environmental constraints, and surrounding land use. In Austin proper, the City's land development code and the HOME initiative materially affect what can be built. Outside city limits, county and ETJ rules, water and septic feasibility, and proximity to growth corridors drive feasibility.",
  },
  {
    question: "Should I sell land now or hold for future appreciation?",
    answer:
      "The right answer depends on your goals, holding costs, tax basis, current market conditions, and the property's specific position relative to growth. In Central Texas, certain corridors have appreciated meaningfully, while others remain early in their cycle. A proper analysis weighs current market value, future trajectory, carrying costs, and how the asset fits within your broader portfolio.",
  },
];

const ExoticWildlifeVideoBand = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <section className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden h-screen"
      >
        {!reducedMotion && shouldLoad ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={exoticWildlifeVideo}
            poster={exoticWildlifeImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img
            src={exoticWildlifeImage}
            alt="Texas exotic wildlife ranch landscape"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* subtle navy gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.32) 0%, rgba(12,15,36,0.18) 45%, rgba(12,15,36,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* overlay copy */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="container mx-auto px-6 pb-10 md:pb-0">
            <div className="max-w-2xl text-white">
              <p
                className="text-[11px] md:text-xs tracking-[0.32em] uppercase mb-4 md:mb-6"
                style={{
                  color: "#b9a06c",
                  fontFamily: "'Jost', sans-serif",
                  textShadow: "0 0 18px rgba(185,160,108,0.55), 0 2px 10px rgba(12,15,36,0.35)",
                }}
              >
                Texas Exotic Wildlife
              </p>
              <h2
                className="font-light leading-[1.1] mb-5 md:mb-7"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  letterSpacing: "0.01em",
                  textShadow: "0 0 28px rgba(255,255,255,0.35), 0 2px 16px rgba(12,15,36,0.55)",
                }}
              >
                Ranch Ownership With a Different Kind of Wild
              </h2>
              <p
                className="text-white/85 leading-relaxed max-w-xl"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                  textShadow: "0 0 20px rgba(255,255,255,0.25), 0 1px 8px rgba(12,15,36,0.45)",
                }}
              >
                From axis deer and blackbuck to zebra and oryx, select Texas
                ranches offer a rare blend of recreation, stewardship, and
                private land ownership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LandRanch = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Ranch Land & Acreage for Sale"
        description="Explore ranch land, recreational property, investment acreage, development tracts, and legacy estates throughout Austin and the Texas Hill Country with Echelon Property Group."
        canonical="/land-ranch"
        ogType="website"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Search Properties", url: `${SITE}/search` },
          { name: "Land & Ranch", url: `${SITE}/land-ranch` },
        ])}
      />

      <Navigation />
      <div className="h-32 md:h-28 lg:h-[6.5rem]" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative w-full h-[590px] sm:min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] overflow-hidden bg-primary">
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.16] md:scale-[1.12] lg:scale-100"
          aria-hidden="true"
        />
        <img
          src={heroPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.16] md:scale-[1.12] lg:hidden -z-10"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,15,36,0.48) 0%, rgba(12,15,36,0.30) 35%, rgba(12,15,36,0.10) 65%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(12,15,36,0.68) 0%, rgba(12,15,36,0.52) 46%, rgba(12,15,36,0.24) 100%)" }} />

        <div className="relative z-10 flex h-full items-start px-6 pt-24 md:hidden">
          <div className="w-full max-w-[390px]">
            <p className="text-gold mb-3" style={labelStyle}>
              LAND & RANCH
            </p>
            <h1
              className="font-display font-normal text-white leading-[1.06] mb-4"
              style={{ fontSize: "1.78rem", textShadow: "0 2px 18px rgba(0,0,0,0.40), 0 1px 2px rgba(0,0,0,0.45)" }}
            >
              Austin Area<br />Land & Ranch Opportunities
            </h1>
            <p
              className="text-white/90 leading-relaxed mb-5 text-[0.88rem]"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
            >
              From legacy ranches and recreational retreats to investment acreage and development
              tracts, evaluate Central Texas land through both current value and future potential.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="#categories"
                className="inline-flex min-h-[48px] w-full items-center justify-center bg-gold hover:bg-primary text-white px-4 py-3 text-center transition-colors duration-300"
                style={labelStyle}
              >
                Explore Land Opportunities
              </a>
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] w-full items-center justify-center border border-gold text-white hover:bg-gold hover:border-gold px-4 py-3 text-center transition-colors duration-300 backdrop-blur-sm"
                style={labelStyle}
              >
                Request a Property Evaluation
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden h-full md:flex md:items-center md:pt-0 md:pb-0">
          <div className="container mx-auto px-6 md:px-12 md:-translate-y-16 lg:-translate-y-20">
            <div className="max-w-2xl">
              <p className="text-gold mb-3 md:mb-5" style={labelStyle}>
                LAND & RANCH
              </p>
              <h1
                className="font-display font-normal text-white leading-[1.08] tracking-tight mb-4 md:mb-7"
                style={{ fontSize: "clamp(1.6rem, 4.4vw, 3.4rem)", textShadow: "0 2px 22px rgba(0,0,0,0.38), 0 1px 2px rgba(0,0,0,0.45)" }}
              >
                Austin Area<br />Land & Ranch Opportunities
              </h1>
              <p
                className="text-white/85 leading-relaxed mb-7 md:mb-10 max-w-xl text-[0.95rem] md:text-base lg:text-lg"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
              >
                From legacy ranches and recreational retreats to investment acreage and development
                tracts, evaluate Central Texas land through both current value and future potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center bg-gold hover:bg-primary text-white px-8 py-4 transition-colors duration-300"
                  style={labelStyle}
                >
                  Explore Land Opportunities
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border border-gold text-white hover:bg-gold hover:border-gold px-8 py-4 transition-colors duration-300 backdrop-blur-sm"
                  style={labelStyle}
                >
                  Request a Property Evaluation
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="h-6 md:h-10" aria-hidden="true" />



      {/* ── SECTION 1.5: MORE THAN LAND ──────────────────────── */}

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start max-w-6xl mx-auto">
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="max-w-[560px]">
                <p
                  className="mb-4"
                  style={{
                    ...labelStyle,
                    color: "#b9a06c",
                    fontWeight: 500,
                    letterSpacing: "0.42em",
                    fontSize: "0.58rem",
                  }}
                >
                  LAND ADVISORY
                </p>
                <h2
                  className="font-display font-normal text-architectural leading-[1.05] tracking-tight mb-4 whitespace-nowrap"
                  style={{ fontSize: "clamp(2rem, 4.4vw, 3.1rem)" }}
                >
                  More Than Land
                </h2>
                <p
                  className="mb-7"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.78rem",
                    letterSpacing: "0.09em",
                    color: "rgba(185,160,108,0.85)",
                    lineHeight: 1.6,
                  }}
                >
                  Advising buyers, sellers, investors, and landowners across Austin and the Texas Hill Country.
                </p>
                <div className="space-y-5 text-muted-foreground text-[1.05rem] leading-[1.8]">
                  <p>
                    The most valuable land opportunities are rarely defined by acreage alone. They are defined by what they can become.
                  </p>
                  <p>
                    For some owners, that means a legacy ranch held for generations. For others, a future family compound, strategic development opportunity, or long-term investment positioned along the path of growth.
                  </p>
                </div>
                <div className="mt-14">
                  <div className="h-px w-10 bg-[#b9a06c] mb-6" aria-hidden="true" />
                  <blockquote
                    className="text-architectural max-w-[46ch]"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "clamp(1.2rem, 1.7vw, 1.4rem)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      letterSpacing: "0.005em",
                    }}
                  >
                    Echelon Property Group evaluates land through privacy, access, water, topography, market demand, and highest-and-best-use potential.
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div
                className="group overflow-hidden"
                style={{
                  border: "1px solid rgba(12,15,36,0.06)",
                  boxShadow:
                    "0 18px 38px -24px rgba(12,15,36,0.16), 0 6px 16px -10px rgba(12,15,36,0.09)",
                }}
              >
                <img
                  src={editorialImage}
                  alt="Aerial view of a luxury Texas Hill Country ranch at golden hour with a winding private road, live oak groves, and a reflective creek"
                  className="block w-full h-[360px] md:h-[480px] lg:h-[540px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ── SECTION 2: DIFFERENT EXPERTISE ──────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
            <div className="md:col-span-5">
              <p className="text-gold mb-5" style={labelStyle}>
                ADVISORY
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
                Land Requires a Different Level of Expertise
              </h2>
              <a
                href="https://landandranch.exprealty.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit eXp Realty Land & Ranch"
                className="inline-block mt-8 transition-opacity duration-300 hover:opacity-80"
              >
                <img
                  src={expLandRanchLogo}
                  alt="eXp Realty Land & Ranch"
                  className="h-12 md:h-14 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div className="md:col-span-7 space-y-6 text-muted-foreground leading-[1.8] text-[1.0625rem]">
              <p>
                Unlike traditional residential real estate, land value is often driven by factors that
                aren't immediately visible. Water availability, topography, access, utilities,
                development potential, wildlife exemptions, agricultural valuation, frontage, and
                highest-and-best-use analysis can dramatically impact value.
              </p>
              <p>
                Whether evaluating a recreational ranch, investment acreage, redevelopment tract, or
                future homesite, understanding the underlying opportunity is critical.
              </p>
              <div className="pt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors"
                  style={labelStyle}
                >
                  Speak With an Advisor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CATEGORIES ──────────────────────── */}
      <section id="categories" className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              PROPERTY CATEGORIES
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              The Spectrum of Central Texas Land
            </h2>
          </div>
          {/* Mobile swipe hint */}
          <div className="flex sm:hidden justify-start mb-5">
            <div
              className="swipe-hint-pill inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-[#b9a06c] bg-[#b9a06c]/[0.06]"
              style={{ ...labelStyle, fontSize: "0.68rem", letterSpacing: "0.18em" }}
            >
              <span>Swipe to explore</span>
              <span aria-hidden="true" className="swipe-hint-arrow inline-block text-base leading-none">→</span>
            </div>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-6 px-6 sm:mx-0 sm:px-0 pb-4 sm:pb-0 scroll-pl-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c, i) => {
              const isOff = (c as { isOffMarket?: boolean }).isOffMarket;
              const CardInner = (
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {isOff ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-architectural via-architectural to-architectural/85 flex items-center justify-center">
                      <img
                        src="/static-assets/echelon-logo-gold-square.webp"
                        alt="Echelon Property Group | Off-Market Land & Ranch"
                        className="w-1/2 h-auto object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <img
                      src={c.image as string}
                      alt={`${c.title} in Central Texas`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      width={1280}
                      height={1600}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(12,15,36,0.85) 0%, rgba(12,15,36,0.45) 45%, rgba(12,15,36,0.10) 75%, transparent 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <p className="text-gold mb-3" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                      0{i + 1}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-normal text-white leading-tight mb-3">
                      {c.title}
                    </h3>
                    <p className="text-white/75 text-[0.92rem] leading-relaxed max-w-md">
                      {c.desc}
                    </p>
                  </div>
                </div>
              );
              return isOff ? (
                <Link
                  key={c.title}
                  to="/off-market-real-estate-austin"
                  className="group relative overflow-hidden bg-architectural block shrink-0 w-[82%] sm:w-auto snap-start"
                >
                  {CardInner}
                </Link>
              ) : i === 3 ? (
                <Link
                  key={c.title}
                  to="/land-development"
                  className="group relative overflow-hidden bg-architectural block shrink-0 w-[82%] sm:w-auto snap-start"
                >
                  {CardInner}
                </Link>
              ) : (
                <article
                  key={c.title}
                  className="group relative overflow-hidden bg-architectural shrink-0 w-[82%] sm:w-auto snap-start"
                >
                  {CardInner}
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── CINEMATIC EXOTIC WILDLIFE VIDEO BAND ─────────────────────── */}
      <div className="hidden md:block">
        <ExoticWildlifeVideoBand />
      </div>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── SECTION 3.5: EXOTIC WILDLIFE RANCHES ──────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="md:col-span-6 order-1">
              <div
                className="group overflow-hidden"
                style={{
                  border: "1px solid rgba(12,15,36,0.06)",
                  boxShadow:
                    "0 18px 38px -24px rgba(12,15,36,0.16), 0 6px 16px -10px rgba(12,15,36,0.09)",
                }}
              >
                <img
                  src={exoticWildlifeImage}
                  alt="Blackbuck antelope at golden hour on a Texas Hill Country ranch"
                  className="block w-full h-[440px] md:h-[600px] lg:h-[660px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                  width={1800}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="md:col-span-6 order-2">
              <div className="max-w-[480px]">
                <p
                  className="mb-5"
                  style={{
                    ...labelStyle,
                    color: "#b9a06c",
                    fontWeight: 500,
                    letterSpacing: "0.42em",
                    fontSize: "0.58rem",
                  }}
                >
                  WILDLIFE STEWARDSHIP
                </p>
                <h2 className="font-display text-[1.85rem] md:text-[2.5rem] lg:text-[2.9rem] font-normal text-architectural leading-[1.08] tracking-tight mb-6">
                  Texas Exotic Wildlife Ranches
                </h2>
                <p
                  className="mb-10"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.78rem",
                    letterSpacing: "0.09em",
                    color: "rgba(185,160,108,0.85)",
                    lineHeight: 1.6,
                  }}
                >
                  From free-ranging axis deer and blackbuck antelope to zebras, elk, and other exotic species, Texas is home to one of the most unique private wildlife ownership environments in the world.
                </p>
                <div className="space-y-8 text-muted-foreground text-[1.05rem] leading-[1.85]">
                  <p>
                    Unlike many states, Texas allows private landowners to own and manage a wide variety of exotic wildlife species. Across the Hill Country and Central Texas, ranches may feature axis deer, blackbuck antelope, fallow deer, elk, aoudad, zebras, and other exotic animals that contribute to recreation, conservation, and wildlife management programs.
                  </p>
                  <p>
                    For some owners, these properties serve as private family retreats. For others, they represent income-producing operations, conservation-focused holdings, or legacy ranches designed to be enjoyed across generations.
                  </p>
                  <p>
                    The appeal extends beyond the wildlife itself. Large acreage, water resources, habitat quality, road infrastructure, and long-term land appreciation often make exotic wildlife ranches some of the most sought-after recreational properties in Texas.&nbsp;
                  </p>
                </div>
                <blockquote
                  className="mt-10 pl-5 text-architectural"
                  style={{
                    borderLeft: "1px solid #b9a06c",
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "1.125rem",
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >
                  Texas is one of the few places in the world where private landowners can steward free-ranging exotic wildlife across thousands of acres.
                </blockquote>
                <div className="mt-10">
                  <Link
                    to="/land-ranch/exotic-wildlife-ranches"
                    className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors"
                    style={labelStyle}
                  >
                    learn more about Texas exotic wildlife ranches →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Suspense fallback={null}>
        <ExoticWildlifeGallery />
      </Suspense>





      <div className="h-10 md:h-16" aria-hidden="true" />



      {/* ── SECTION 4: MAP ──────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              COVERAGE
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-5">
              Where We Work
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Echelon Property Group advises on land and ranch opportunities across Austin and the Texas Hill Country,
              with active focus throughout the corridors below.
            </p>
          </div>
          <Suspense fallback={<div className="w-full h-[440px] md:h-[600px] bg-secondary/40" />}>
            <LandRanchMap />
          </Suspense>
        </div>
      </section>

      {/* ── FEATURED LAND LISTING ──────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              FEATURED LAND LISTING
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-5">
              10811 San Jose Ave
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A rare 3.06-acre redevelopment parcel in the high-growth Del Valle corridor
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 relative overflow-hidden group">
              <img
                src={featuredLandListingImage}
                alt="10811 San Jose Ave, Del Valle TX, 3.06 acres redevelopment land"
                title="10811 San Jose Ave, development land opportunity, Del Valle TX"
                className="w-full aspect-[4/3] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute top-5 left-5 text-white bg-gold px-3 py-1" style={labelStyle}>
                DEVELOPMENT LAND
              </span>
            </div>

            <div className="lg:col-span-5">
              <p className="text-muted-foreground mb-3" style={labelStyle}>
                CURRENTLY ASKING
              </p>
              <p className="font-display text-3xl md:text-4xl text-architectural font-normal mb-8">
                $1,600,000
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8 border-t border-border/50 pt-8">
                <div>
                  <p className="text-muted-foreground mb-1" style={labelStyle}>ACREAGE</p>
                  <p className="text-foreground text-base font-light">3.06 Acres</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1" style={labelStyle}>ASSET TYPE</p>
                  <p className="text-foreground text-base font-light">Redevelopment Land</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1" style={labelStyle}>ZONING</p>
                  <p className="text-foreground text-base font-light">Unrestricted</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1" style={labelStyle}>CORRIDOR</p>
                  <p className="text-foreground text-base font-light">Del Valle / SE Austin</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                3.06-acre parcel with existing mobile homes and zero zoning restrictions. Positioned for ground-up multifamily, mixed-use, or commercial development inside one of Austin's most active growth corridors.
              </p>

              <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                <Link
                  to="/contact"
                  className="inline-block border border-border/60 px-7 py-3 text-foreground/80 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  REQUEST INFORMATION
                </Link>
                <ConfidentialOMGate />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/images/parallax-ranch.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />








      {/* ── SECTION 6: MARKET SNAPSHOT ──────────────────────── */}
      <section className="pt-0 pb-14 md:pb-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              MARKET DATA
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              Central Texas Land&nbsp;<br />Market Snapshot
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {marketSnapshot.map((m) => (
              <div
                key={m.label}
                className="group relative bg-background p-8 md:p-10 border border-transparent transition-all duration-500 ease-out hover:scale-[1.02] hover:border-gold hover:z-10"
              >
                <p className="text-gold mb-5" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                  {m.label}
                </p>
                <p className="font-display text-3xl md:text-4xl font-normal text-architectural leading-none mb-4 transition-colors duration-300 group-hover:text-gold">
                  {m.value}
                </p>
                <p className="text-muted-foreground text-[0.85rem] leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground/70 text-xs mt-6 max-w-2xl" style={{ fontStyle: "italic" }}>
            Indicative figures based on recent Central Texas market activity. Contact Echelon Property Group for a
            current, property-specific assessment.
          </p>
        </div>
      </section>

      {/* ── EXPLORE CENTRAL TEXAS RANCH & LAND MARKETS ─────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>SEARCH MARKETS</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              Explore Central Texas Ranch & Land Markets
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-14">
            {[
              { name: "Burnet", slug: "burnet", img: marketBurnet, desc: "Large tracts, hunting properties, and premier recreational land." },
              { name: "Dripping Springs", slug: "dripping-springs", img: marketDrippingSprings, desc: "Luxury acreage, equestrian estates, and development opportunities." },
              { name: "Fredericksburg", slug: "fredericksburg", img: marketFredericksburg, desc: "Wine country ranches, recreational land, and legacy Hill Country estates." },
              { name: "Johnson City", slug: "johnson-city", img: marketJohnsonCity, desc: "Recreational land, vineyards, and long-term investment-grade acreage." },
              { name: "Kerrville", slug: "kerrville", img: marketKerrville, desc: "Riverfront acreage and private ranch holdings throughout the Hill Country." },
              { name: "Lampasas", slug: "lampasas", img: marketLampasas, desc: "Private acreage, agricultural land, and long-term appreciation." },
              { name: "Llano", slug: "llano", img: marketLlano, desc: "Classic Texas ranch country with abundant wildlife and open landscapes." },
              { name: "Marble Falls", slug: "marble-falls", img: marketMarbleFalls, desc: "Waterfront tracts, ranch acreage, and expanding development corridors." },
            ].map((m) => (
              <Link
                key={m.slug}
                to={`/land-ranch/${m.slug}`}
                className="group flex flex-col"
                aria-label={`Explore the ${m.name} land and ranch market`}
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-5">
                  <img
                    src={m.img}
                    alt={`${m.name}, Texas Hill Country landscape`}
                    width={1280}
                    height={1600}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px bg-gold w-full scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                </div>
                <h3 className="font-display text-architectural text-lg md:text-xl leading-tight mb-2 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-gold">
                  {m.name}
                </h3>
                <p className="text-muted-foreground text-[0.88rem] leading-relaxed mb-4">
                  {m.desc}
                </p>
                <span
                  className="relative inline-flex items-center text-gold self-start pb-0.5"
                  style={{ ...labelStyle, fontSize: "0.58rem" }}
                >
                  Explore Market
                  <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                  <span aria-hidden="true" className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>
              </Link>
            ))}
          </div>

          {/* Thematic advisory pages */}
          {(() => {
            const advisories = [
              {
                to: "/land-ranch/hill-country-ranches",
                eyebrow: "REGIONAL ADVISORY",
                title: "Hill Country Ranches",
                desc: "Legacy acreage, live-water tracts, and recreational ranches across the heart of Central Texas.",
              },
              {
                to: "/land-ranch/exotic-wildlife-ranches",
                eyebrow: "SPECIALIZED ADVISORY",
                title: "Exotic Wildlife Ranches",
                desc: "Texas ranches with axis deer, blackbuck, oryx, zebra, and other managed wildlife.",
              },
              {
                to: "/land-development",
                eyebrow: "DEVELOPMENT ADVISORY",
                title: "Land Development",
                desc: "Entitled tracts, infill assemblages, and growth-corridor opportunities for builders and investors.",
              },
              {
                to: "/land-development",
                eyebrow: "URBAN ADVISORY",
                title: "Infill Land",
                desc: "In-town lots, teardowns, and small-tract assemblages within Austin's established neighborhoods and growth corridors.",
              },
            ];

            const renderCard = (t: typeof advisories[number]) => (
              <Link
                key={t.to}
                to={t.to}
                className="group bg-background p-8 md:p-10 flex flex-col justify-between min-h-[220px] transition-colors duration-500 hover:bg-secondary/40"
              >
                <div>
                  <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                    {t.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl md:text-[1.65rem] text-architectural leading-tight mb-3 transition-colors duration-300 group-hover:text-gold">
                    {t.title}
                  </h3>
                  <p className="text-muted-foreground text-[0.95rem] leading-[1.65] max-w-[42ch]">
                    {t.desc}
                  </p>
                </div>
                <span
                  className="relative inline-flex items-center text-gold self-start mt-6 pb-0.5"
                  style={{ ...labelStyle, fontSize: "0.58rem" }}
                >
                  Explore Advisory
                  <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                  <span aria-hidden="true" className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>
              </Link>
            );
            return (
              <div className="mt-16 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
                  {advisories.map(renderCard)}
                </div>
              </div>
            );
          })()}


        </div>
      </section>

      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/images/parallax-pasture.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />



      {/* ── SECTION 6.9: MEET YOUR ADVISOR ──────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#F5F3EF",
          paddingTop: "clamp(80px, 10vw, 120px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
        }}
      >
        {/* Subtle top & bottom dividers */}
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(12,15,36,0.08)" }} />
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px" style={{ background: "rgba(12,15,36,0.08)" }} />



        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center max-w-[1280px] mx-auto">
            {/* Portrait */}
            <div className="md:col-span-6 lg:col-span-5">

              <div
                className="relative overflow-hidden -translate-y-20 md:-translate-y-40 lg:-translate-y-14"
                style={{
                  borderRadius: "24px",
                  boxShadow:
                    "0 30px 60px -25px rgba(12,15,36,0.28), 0 12px 30px -15px rgba(12,15,36,0.18)",
                }}
              >
                <img
                  src={taylorPortrait}
                  alt="Taylor Sherwood, Land & Ranch Advisor at Echelon Property Group"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4 / 5" }}
                  width={1080}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Social links — matches homepage styling */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-5 lg:gap-x-10 mt-6">
                <a
                  href="https://www.instagram.com/theinvestorbroker/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold group/ig"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
                  aria-label="Follow Taylor Sherwood on Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span className="relative leading-none font-semibold whitespace-nowrap">

                    @THEINVESTORBROKER
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/ig:scale-x-100 transition-transform duration-500 origin-center" />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/taylorsherwood/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-gold group/li"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
                  aria-label="View Taylor Sherwood on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="relative leading-none font-semibold whitespace-nowrap">
                    TAYLOR SHERWOOD
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/li:scale-x-100 transition-transform duration-500 origin-center" />
                  </span>
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-6 lg:col-span-7 relative overflow-visible">
              <img
                src={echelonWatermarkLogo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute pointer-events-none select-none hidden lg:block"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-32%, -55%)',
                  height: '82%',
                  width: 'auto',
                  opacity: 0.06,
                }}
              />
              <div className="relative">
              <p className="text-gold mb-5" style={labelStyle}>
                MEET YOUR LAND & RANCH ADVISOR
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.15] mb-5">
                Taylor Sherwood
              </h2>
              <p
                className="text-architectural/75 mb-8 leading-relaxed"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.05rem" }}
              >
                Land, Ranch, Development &amp; Investment Property Across Austin and the Texas Hill
                Country
              </p>

              <div
                className="space-y-7 text-muted-foreground leading-relaxed"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.0125rem" }}
              >
                <p>
                  Taylor Sherwood advises buyers, sellers, investors, and landowners throughout
                  Austin and the Texas Hill Country on ranch, land, development, and investment
                  opportunities. His experience spans luxury residential sales, redevelopment
                  projects, off-market acquisitions, and land transactions where future potential
                  is often just as important as current value.
                </p>
                <p>
                  Rather than focusing solely on acreage or improvements, Taylor helps clients
                  evaluate the broader picture, including access, water, topography, development
                  potential, market demand, and long-term appreciation. Every property is analyzed
                  through both its present use and its highest-and-best-use potential.
                </p>
                <p>
                  Through Echelon Property Group, clients gain access to strategic guidance, local
                  market expertise, and opportunities both on and off the market.
                </p>
              </div>


              {/* Credentials */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                {[
                  "Austin & Hill Country Land",
                  "Off-Market Opportunities",
                  "Development & Redevelopment Analysis",
                  "Luxury Ranch Representation",
                ].map((item, idx, arr) => (
                  <div key={item} className="flex items-center gap-x-5">
                    <span
                      className="text-architectural"
                      style={{
                        ...labelStyle,
                        fontSize: "0.6rem",
                      }}
                    >
                      {item}
                    </span>
                    {idx < arr.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline-block"
                        style={{ width: "20px", height: "1px", background: "#b9a06c" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Editorial callout */}
              <div
                className="mt-12 pt-10"
                style={{ borderTop: "1px solid rgba(12,15,36,0.12)" }}
              >
                <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                  LAND OWNERS
                </p>
                <h3 className="font-display text-2xl md:text-[1.75rem] font-normal text-architectural leading-tight mb-4">
                  Considering Selling Land or Ranch?
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed mb-7 max-w-2xl"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "1rem" }}
                >
                  Get a confidential property evaluation and market analysis tailored to your
                  property's location, acreage, improvements, and future potential.
                </p>
                <Link
                  to="/sell"
                  className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-[1.1rem] transition-colors duration-300 rounded-sm"
                  style={{
                    ...labelStyle,
                    background: "#0C0F24",
                    color: "#F5F3EF",
                    border: "1px solid #B9A06C",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B9A06C";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0C0F24";
                    e.currentTarget.style.color = "#F5F3EF";
                  }}
                >

                  Request a Land Evaluation →
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* Fancy gold divider — matches Ranch Ownership Profiles */}
          <div className="mt-14 md:mt-20 flex items-center justify-center gap-4 md:gap-6" aria-hidden="true">
            <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to right, rgba(185,160,108,0), #b9a06c)" }} />
            <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="inline-block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to left, rgba(185,160,108,0), #b9a06c)" }} />
          </div>
        </div>
      </section>

      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── SECTION 5: PROCESS ──────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              ADVISORY PROCESS
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              How We Evaluate Land Opportunities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {process.map((step) => (
              <div
                key={step.n}
                className="group relative bg-background p-8 md:p-10 border border-transparent transition-all duration-500 ease-out hover:scale-[1.02] hover:border-gold hover:z-10"
              >
                <p className="font-display text-3xl text-gold mb-5" style={{ letterSpacing: "0.05em" }}>
                  {step.n}
                </p>
                <h3 className="font-display text-xl font-normal text-architectural mb-3 transition-colors duration-300 group-hover:text-gold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />


      {/* ── NEW: WHY LAND REQUIRES DIFFERENT REPRESENTATION ─────────────── */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 max-w-6xl mx-auto">
            {/* LEFT — Editorial intro */}
            <div className="md:col-span-5 md:pr-4 md:border-r md:border-[#b9a06c]/40">
              <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.6rem" }}>
                ADVISORY
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.1rem] lg:text-[2.4rem] font-normal text-architectural leading-[1.1] tracking-[-0.005em] mb-8 max-w-[18ch]">
                Why Land Requires Different Representation
              </h2>
              <p className="text-muted-foreground leading-[1.85] text-[1.0625rem] max-w-[500px]">
                Land is not a house on a larger lot. It is a separate discipline with its own diligence, its own buyer pool, and a different set of questions that determine real value. Working with an advisor who lives inside those variables changes the outcome.
              </p>
              <p
                className="text-gold mt-8"
                style={{ ...labelStyle, fontSize: "0.6rem", letterSpacing: "0.28em" }}
              >
                Land transactions involve variables most residential buyers never encounter.
              </p>

              {/* Editorial ranch image */}
              <div className="relative mt-10 md:mt-12 md:pr-4">
                <div className="group overflow-hidden rounded-[4px] aspect-[16/10] bg-[#F5F3EF]">
                  <img
                    src={advisoryRanchImage}
                    alt="Texas Hill Country ranch landscape with oak trees and ridgeline view"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Quote card — slightly overlapping the image */}
                <figure
                  className="relative md:absolute md:right-6 md:-bottom-8 md:max-w-[300px] mt-5 md:mt-0 bg-[#FAFAF8] border-l-2 border-[#b9a06c] pl-5 pr-5 py-5 shadow-[0_8px_24px_-12px_rgba(12,15,36,0.15)]"
                >
                  <blockquote
                    className="font-display text-architectural text-[0.98rem] leading-[1.45] italic"
                  >
                    “Land value is often determined by factors invisible to the average buyer.”
                  </blockquote>
                  <figcaption
                    className="text-gold mt-3"
                    style={{ ...labelStyle, fontSize: "0.58rem", letterSpacing: "0.26em" }}
                  >
                    Taylor Sherwood
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* RIGHT — Advisory items */}
            <div className="md:col-span-7">
              <dl>
                {[
                  ["Water Access", "Wells, surface water, river frontage, and groundwater district rules."],
                  ["Agricultural Exemptions", "Tax valuations tied to qualifying agricultural use and history."],
                  ["Wildlife Exemptions", "Wildlife management plans that preserve favorable valuations."],
                  ["Mineral Rights", "Surface vs. mineral ownership, leases, and reservations."],
                  ["Easements & Access", "Recorded, prescriptive, and shared access affecting use and value."],
                  ["Road Frontage", "Public, private, and county road access and condition."],
                  ["Floodplain & Topography", "Buildable area, drainage, slope, and FEMA designations."],
                  ["Development Feasibility", "Utilities, entitlement path, and highest and best use."],
                ].map(([t, d], i) => (
                  <div
                    key={t}
                    className="group relative grid grid-cols-[2.75rem_1fr] gap-5 md:gap-7 py-7 md:py-8 px-3 md:px-5 -mx-3 md:-mx-5 transition-colors duration-300 hover:bg-[#FAFAF8]"
                  >
                    {/* Animated left border on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b9a06c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out"
                    />
                    {/* Hairline divider between rows */}
                    {i !== 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-3 right-3 md:left-5 md:right-5 top-0 h-px bg-[rgba(12,15,36,0.12)]"
                      />
                    )}

                    <dt
                      className="text-gold pt-[0.2rem] tabular-nums"
                      style={{
                        ...labelStyle,
                        fontSize: "0.65rem",
                        letterSpacing: "0.22em",
                        fontWeight: 500,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </dt>
                    <div>
                      <h3
                        className="text-architectural text-[0.95rem] md:text-[1rem] mb-3 transition-colors duration-300 group-hover:text-gold"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </h3>
                      <p className="text-muted-foreground text-[1rem] leading-[1.75] max-w-[58ch]">
                        {d}
                      </p>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/images/parallax-pasture-tree.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── SECTION 5.5: PRIVATE LAND OPPORTUNITIES ──────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          {/* Fancy gold divider */}
          <div className="mb-14 md:mb-20 flex items-center justify-center gap-4 md:gap-6" aria-hidden="true">
            <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to right, rgba(185,160,108,0), #b9a06c)" }} />
            <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="inline-block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
            <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to left, rgba(185,160,108,0), #b9a06c)" }} />
          </div>
          <div className="max-w-3xl mx-auto text-center">

            <p className="text-gold mb-5" style={labelStyle}>
              PRIVATE ACCESS
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-8">
              Private Land Opportunities
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[1.0625rem] mb-10 max-w-2xl mx-auto">
              <p>
                Some of Central Texas' most desirable ranches, acreage estates, and development
                tracts never reach the public market.
              </p>
              <p>
                Through Echelon Property Group's network of landowners, builders, developers, and industry
                relationships, select opportunities may be shared privately before they are widely
                marketed.
              </p>
            </div>
            <Link
              to="/private"
              className="inline-flex items-center justify-center px-8 py-4 md:px-[34px] md:py-4 transition-colors duration-300 rounded-sm"
              style={{ ...labelStyle, background: "#B9A06C", color: "#FFFFFF", border: "1px solid #B9A06C", fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0C0F24"; e.currentTarget.style.borderColor = "#0C0F24"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#B9A06C"; e.currentTarget.style.borderColor = "#B9A06C"; }}
            >
              Explore Private Opportunities →
            </Link>
          </div>
        </div>
      </section>
      <div className="h-10 md:h-16" aria-hidden="true" />




      {/* ── NEW: LAND BUYER PROCESS ─────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>PROCESS</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              The Land Buyer Process
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {[
              ["01", "Identify Opportunity", "Define the goal, the geography, and the kind of land that fits the long-term plan."],
              ["02", "Evaluate Constraints", "Review access, water, utilities, exemptions, and any encumbrances on title."],
              ["03", "Due Diligence", "Surveys, environmental review, floodplain, mineral, and entitlement analysis."],
              ["04", "Negotiate Terms", "Structure price, contingencies, and timing to protect the buyer's position."],
              ["05", "Close with Confidence", "Coordinate closing with clarity on what the buyer is acquiring and why."],
            ].map(([n, t, d]) => (
              <li
                key={n}
                className="group relative bg-background p-8 md:p-9 border border-transparent transition-all duration-500 ease-out hover:scale-[1.02] hover:border-gold hover:z-10"
              >
                <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>{`STEP ${n}`}</p>
                <p className="font-display text-architectural text-xl md:text-2xl leading-snug mb-3 transition-colors duration-300 group-hover:text-gold">{t}</p>
                <p className="text-muted-foreground text-[0.9rem] leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── NEW: LAND ACQUISITION & DEVELOPMENT ADVISORY ───────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start max-w-6xl mx-auto">
            <div className="md:col-span-5">
              <p className="text-gold mb-5" style={labelStyle}>ACQUISITION & DEVELOPMENT</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1] mb-6">
                Land Acquisition & Development Advisory
              </h2>
              <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-8">
                For investors, builders, and landowners weighing what to do next, the right strategy is rarely obvious from the deed alone. Echelon Property Group advises on the full arc, from sourcing the parcel to deciding whether to hold, improve, develop, or sell.
              </p>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 rounded-sm"
                style={{ ...labelStyle, background: "#B9A06C", color: "#FFFFFF", border: "1px solid #B9A06C", fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0C0F24"; e.currentTarget.style.borderColor = "#0C0F24"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#B9A06C"; e.currentTarget.style.borderColor = "#B9A06C"; }}
              >
                Discuss a Land Acquisition Strategy →
              </Link>
            </div>
            <div className="md:col-span-7">
              <dl className="space-y-8">
                {[
                  ["Infill Opportunities", "Underutilized parcels inside established submarkets where demand already exists."],
                  ["Assemblage Strategy", "Combining adjacent tracts to unlock scale, frontage, or entitlement options."],
                  ["Builder & Developer Introductions", "Quiet introductions to vetted builders and developers when alignment is right."],
                  ["Entitlement Considerations", "Zoning, utilities, ETJ status, and the regulatory path to a usable site."],
                  ["Hold, Improve, Develop, or Sell", "An honest read on which strategy maximizes long-term value for the owner."],
                ].map(([t, d]) => (
                  <div key={t} className="grid grid-cols-12 gap-6 pb-8 border-b border-[rgba(12,15,36,0.1)] last:border-b-0 last:pb-0">
                    <dt className="col-span-12 sm:col-span-5 font-display text-architectural text-lg md:text-xl leading-tight">{t}</dt>
                    <dd className="col-span-12 sm:col-span-7 text-muted-foreground text-[0.95rem] leading-relaxed">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/__l5e/assets-v1/821f01f5-5011-41e1-8ba2-6bc50dbbf7a6/hill-country-overlook.jpg')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />

      <div className="h-10 md:h-16" aria-hidden="true" />






      {/* ── SECTION 6.5: INSIGHTS ──────────────────────── */}

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-6xl">
            <div>
              <p className="text-gold mb-5" style={labelStyle}>
                INSIGHTS
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
                Land & Ranch Insights
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors self-start md:self-auto"
              style={labelStyle}
            >
              View All Insights →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {insights.map((post) => (
              <Link
                key={post.to}
                to={post.to}
                className="group bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-secondary/30"
              >
                <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                  {post.eyebrow}
                </p>
                <h3 className="font-display text-xl md:text-[1.4rem] font-normal text-architectural leading-snug group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="mt-6 text-foreground/70 group-hover:text-gold transition-colors" style={labelStyle}>
                  Read →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-12 md:h-20" />

      {/* ── SECTION 7: SELLER CTA ──────────────────────── */}


      <section className="py-16 md:py-24" style={{ background: "#0C0F24" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold mb-6" style={labelStyle}>
              LAND OWNERS
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-normal text-white leading-[1.1] mb-8">
              What Could Your Land Be Worth Under Its Highest & Best Use?
            </h2>
            <p className="text-white/65 leading-relaxed mb-12 text-lg max-w-2xl mx-auto whitespace-pre-line">
              Many owners evaluate their property based on current use. The market often values land
              based on future potential. Understanding the difference can materially impact decisions
              regarding a sale, hold strategy, or redevelopment opportunity.
              {"\n"}Let's connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Request a Land Evaluation
              </Link>
              <Link
                to="/austin-land-development-opportunities"
                className="inline-flex items-center justify-center border border-gold text-white hover:bg-gold hover:text-architectural px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Discuss Development Potential
              </Link>
            </div>
          </div>
        </div>
      </section>





      {/* ── SECTION 8: FAQ ──────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold mb-5 text-center" style={labelStyle}>
              FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-14 text-center">
              Land & Ranch Questions
            </h2>
            <div className="divide-y divide-[rgba(12,15,36,0.1)] border-t border-b border-[rgba(12,15,36,0.1)]">
              {faqs.map((f) => (
                <details key={f.question} className="group py-7">
                  <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                    <h3 className="font-display text-lg md:text-xl font-normal text-architectural group-hover:text-gold transition-colors">
                      {f.question}
                    </h3>
                    <span
                      className="shrink-0 text-gold mt-1 transition-transform duration-300 group-open:rotate-45"
                      style={{ fontSize: "1.25rem", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-5 text-muted-foreground leading-relaxed text-[1rem] max-w-3xl">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandRanch;
