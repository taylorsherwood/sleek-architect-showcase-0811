import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import {
  landRanchMarkets,
  type LandRanchMarket,
} from "@/data/landRanchMarkets";

import hillCountryVideo from "@/assets/hill-country-cinematic.mp4.asset.json";
import hillCountryPoster from "@/assets/hill-country-ranches-hero.jpg.asset.json";
import taylorPortrait from "@/assets/taylor-about-headshot.jpeg";
import legacyImg from "@/assets/cat-luxury-ranches.jpg";
import liveWaterImg from "@/assets/lake-austin-waterfront.jpg";
import recreationalImg from "@/assets/cat-recreational-land.jpg";
import investmentImg from "@/assets/cat-investment-acreage.jpg";
import offMarketImg from "@/assets/land-ranch-editorial-v2.jpg";
import lifestyleImg from "@/assets/land-ranch-editorial.jpg";
import echelonWatermarkLogo from "@/assets/echelon-watermark-logo.png";

const Footer = lazy(() => import("@/components/Footer"));
const LandRanchMap = lazy(() => import("@/components/LandRanchMap"));

const SITE = "https://www.echelonpropertygroup.com";
const SLUG = "hill-country-ranches";
const NAME = "Hill Country Ranches";

const label: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

// ─────────────────────────────────────────────────────────────
// 1 · CINEMATIC HERO
// ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative w-full h-[88vh] min-h-[560px] max-h-[860px] overflow-hidden bg-architectural">
    <video
      src={hillCountryVideo.url}
      poster={hillCountryPoster.url}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(12,15,36,0.45) 0%, rgba(12,15,36,0.20) 40%, rgba(12,15,36,0.65) 100%)",
      }}
    />
    <div className="relative z-10 h-full flex items-center pt-20 md:pt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-[#b9a06c] mb-5 md:mb-7" style={label}>
            HILL COUNTRY · LAND ADVISORY
          </p>
          <h1
            className="font-display font-normal text-white leading-[1.04] tracking-tight mb-8 md:mb-10"
            style={{
              fontSize: "clamp(2.1rem, 5.2vw, 4.25rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
            }}
          >
            The most valuable land in Texas rarely trades publicly.
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 rounded-sm"
              style={{ ...label, background: "#B9A06C", color: "#FFFFFF", border: "1px solid #B9A06C", fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0C0F24"; e.currentTarget.style.borderColor = "#0C0F24"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#B9A06C"; e.currentTarget.style.borderColor = "#B9A06C"; }}
            >
              Begin a Private Conversation →
            </Link>
            <Link
              to="/off-market-real-estate-austin"
              className="inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 rounded-sm"
              style={{ ...label, background: "transparent", color: "#FFFFFF", border: "1px solid #B9A06C", fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#B9A06C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Request Private Access →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 2 · ADVISOR ANCHOR
// ─────────────────────────────────────────────────────────────
const AdvisorAnchor = () => (
  <section className="relative bg-background py-20 md:py-32">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="md:col-span-5 md:col-start-1">
          <div className="relative overflow-hidden aspect-[4/5] max-w-[420px]">
            <img
              src={taylorPortrait}
              alt="Taylor Sherwood, Land &amp; Ranch Advisor at Echelon Property Group"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-[#b9a06c] mb-6" style={label}>
            YOUR ADVISOR
          </p>
          <h2
            className="font-display font-normal text-architectural leading-[1.08] tracking-tight mb-8"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}
          >
            Taylor Sherwood, advising on Hill Country acquisitions.
          </h2>
          <p className="text-muted-foreground text-[1.0625rem] leading-[1.85] mb-10 max-w-[52ch]">
            Land in the Hill Country is rarely won on the open market. Taylor
            works with a small group of buyers each cycle to source, evaluate,
            and acquire the right tract quietly, on the right terms, and with
            the right diligence in place.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-architectural hover:text-[#b9a06c] transition-colors duration-300"
            style={label}
          >
            Begin a private conversation
            <span aria-hidden="true" className="inline-block h-px w-10 bg-[#b9a06c]" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 3 · OPPORTUNITY REEL (full-bleed, dark navy, horizontal scroll)
// ─────────────────────────────────────────────────────────────
type Opportunity = {
  eyebrow: string;
  title: string;
  image: string;
  href: string;
};

const opportunities: Opportunity[] = [
  {
    eyebrow: "01 · LEGACY",
    title: "Legacy Holdings",
    image: legacyImg,
    href: "/contact",
  },
  {
    eyebrow: "02 · WATER",
    title: "Live Water Ranches",
    image: liveWaterImg,
    href: "/contact",
  },
  {
    eyebrow: "03 · RECREATION",
    title: "Recreational Acreage",
    image: recreationalImg,
    href: "/contact",
  },
  {
    eyebrow: "04 · INVESTMENT",
    title: "Investment Tracts",
    image: investmentImg,
    href: "/contact",
  },
  {
    eyebrow: "05 · PRIVATE",
    title: "Off-Market Opportunities",
    image: offMarketImg,
    href: "/off-market-real-estate-austin",
  },
];

const OpportunityReel = () => (
  <section className="relative bg-architectural text-white py-20 md:py-28">
    <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-16">
      <div className="max-w-3xl">
        <p className="text-[#b9a06c] mb-5" style={label}>
          THE OPPORTUNITY SET
        </p>
        <h2
          className="font-display font-normal leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}
        >
          Five ways serious buyers acquire in the Hill Country.
        </h2>
      </div>
    </div>

    <div
      className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 md:px-12 scroll-smooth"
      style={{ scrollbarWidth: "thin" }}
    >
      {opportunities.map((o) => (
        <Link
          key={o.title}
          to={o.href}
          className="group relative flex-shrink-0 snap-start overflow-hidden block"
          style={{ width: "clamp(280px, 32vw, 420px)", aspectRatio: "3 / 4" }}
          aria-label={`${o.title} in the Texas Hill Country`}
        >
          <img
            src={o.image}
            alt={`${o.title} in the Texas Hill Country`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(12,15,36,0.78) 0%, rgba(12,15,36,0.18) 55%, rgba(12,15,36,0) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            <p className="text-[#b9a06c] mb-3" style={{ ...label, fontSize: "0.55rem" }}>
              {o.eyebrow}
            </p>
            <h3 className="font-display text-[1.4rem] md:text-[1.6rem] leading-[1.15] text-white">
              {o.title}
            </h3>
            <span
              aria-hidden="true"
              className="block h-px bg-[#b9a06c] mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              style={{ width: "60px" }}
            />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 4 · SIX LENSES (signature evaluation framework)
// ─────────────────────────────────────────────────────────────
type Lens = {
  number: string;
  title: string;
  body: string;
};

const lenses: Lens[] = [
  {
    number: "01",
    title: "Water",
    body: "Live water, springs, wells, and groundwater district context. The single variable that most often defines the top of the Hill Country market.",
  },
  {
    number: "02",
    title: "Access",
    body: "Frontage type, easements of record, deeded ingress, and how a tract actually enters and exits. Access quietly determines every future use.",
  },
  {
    number: "03",
    title: "Exemptions",
    body: "Ag valuation history, wildlife management plans, and timber or open-space status. Tax posture shapes carry cost and future flexibility.",
  },
  {
    number: "04",
    title: "Topography",
    body: "Elevation, view corridors, build pads, drainage, and the parts of a tract that will never carry value. Reading land before walking it.",
  },
  {
    number: "05",
    title: "Feasibility",
    body: "Utilities, septic, well yield, road improvements, and entitlement risk for any tract a buyer may eventually subdivide, develop, or improve.",
  },
  {
    number: "06",
    title: "Position",
    body: "Where the tract sits relative to growth corridors, comparable trades, and the buyer pools that will ultimately determine a credible exit.",
  },
];

const SixLenses = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((node, idx) => {
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(node);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative bg-[#FAFAF8] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Sticky left */}
          <aside className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <p className="text-[#b9a06c] mb-6" style={label}>
              SIGNATURE FRAMEWORK
            </p>
            <h2
              className="font-display font-normal text-architectural leading-[1.06] tracking-tight mb-7"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.85rem)" }}
            >
              How we read a tract of land.
            </h2>
            <p className="text-muted-foreground text-[1.0625rem] leading-[1.85] max-w-[42ch] mb-10">
              Six lenses Echelon Property Group applies to every Hill Country
              acquisition. Not a checklist. A way of evaluating what land is,
              what it can become, and what it should never be asked to do.
            </p>
            <div className="hidden md:flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-[#b9a06c]" />
              <span className="text-architectural" style={{ ...label, fontSize: "0.55rem" }}>
                {String(active + 1).padStart(2, "0")} / 06
              </span>
            </div>
          </aside>

          {/* Right: stacked lenses */}
          <div className="md:col-span-7 space-y-16 md:space-y-24">
            {lenses.map((l, idx) => {
              const isActive = idx === active;
              return (
                <div
                  key={l.number}
                  ref={(el) => (refs.current[idx] = el)}
                  className="group"
                >
                  <div className="flex items-baseline gap-6 mb-5">
                    <span
                      className="font-display text-architectural transition-all duration-700 ease-out"
                      style={{
                        fontSize: "clamp(2.25rem, 4vw, 3rem)",
                        color: isActive ? "#b9a06c" : undefined,
                        opacity: isActive ? 1 : 0.45,
                        transform: isActive ? "scale(1)" : "scale(0.96)",
                        transformOrigin: "left center",
                      }}
                    >
                      {l.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px bg-[#b9a06c] transition-all duration-700"
                      style={{
                        width: isActive ? "72px" : "32px",
                        opacity: isActive ? 1 : 0.55,
                      }}
                    />
                  </div>
                  <h3
                    className="font-display text-architectural mb-5 leading-[1.1]"
                    style={{ fontSize: "clamp(1.45rem, 2.4vw, 1.85rem)" }}
                  >
                    {l.title}
                  </h3>
                  <p className="text-muted-foreground text-[1.0625rem] leading-[1.85] max-w-[52ch]">
                    {l.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// 5 · REGIONAL MAP (single short caption)
// ─────────────────────────────────────────────────────────────
const RegionalMap = () => (
  <section className="bg-background py-20 md:py-28">
    <div className="container mx-auto px-6 md:px-12">
      <div className="max-w-2xl mb-10 md:mb-14">
        <p className="text-[#b9a06c] mb-5" style={label}>
          WHERE WE OPERATE
        </p>
        <h2
          className="font-display font-normal text-architectural leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.6rem)" }}
        >
          Fredericksburg to Llano, Kerrville to Burnet.
        </h2>
      </div>
      <Suspense
        fallback={<div className="w-full h-[440px] md:h-[600px] bg-secondary/40" />}
      >
        <LandRanchMap />
      </Suspense>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 6 · QUIET LIFESTYLE FRAME (image + Cinzel pull quote)
// ─────────────────────────────────────────────────────────────
const LifestyleQuote = () => (
  <section className="relative bg-[#FAFAF8] py-24 md:py-32 overflow-hidden">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="h-px w-12 bg-[#b9a06c] mb-8" aria-hidden="true" />
          <blockquote
            className="text-architectural leading-[1.35]"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: "clamp(1.4rem, 2.4vw, 1.95rem)",
              fontWeight: 400,
              letterSpacing: "0.005em",
            }}
          >
            Water, view corridors, wildlife, quiet. The Hill Country still
            rewards the things that have always made a ranch worth owning.
          </blockquote>
          <p
            className="text-[#b9a06c] mt-8"
            style={{ ...label, fontSize: "0.55rem" }}
          >
            ECHELON PROPERTY GROUP · LAND ADVISORY
          </p>
        </div>
        <div className="md:col-span-5 order-1 md:order-2">
          <div className="relative overflow-hidden aspect-[4/5]">
            <img
              src={lifestyleImg}
              alt="Hill Country ranch landscape at golden hour"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 7 · OFF-MARKET BAND
// ─────────────────────────────────────────────────────────────
const OffMarketBand = () => (
  <section className="bg-architectural text-white py-24 md:py-32">
    <div className="container mx-auto px-6 md:px-12">
      <div className="max-w-2xl">
        <span aria-hidden="true" className="block h-px w-16 bg-[#b9a06c] mb-8" />
        <p className="text-[#b9a06c] mb-5" style={label}>
          PRIVATE ACCESS
        </p>
        <h2
          className="font-display font-normal text-white leading-[1.08] tracking-tight mb-7"
          style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}
        >
          The tracts that matter most are rarely advertised.
        </h2>
        <p className="text-white/90 text-[1.0625rem] leading-[1.85] mb-10 max-w-[52ch]">
          Qualified buyers receive a quiet, curated view of what is actually
          moving across the Hill Country before it surfaces to the broader
          market.
        </p>
        <Link
          to="/off-market-real-estate-austin"
          className="inline-flex items-center gap-3 text-white hover:text-[#b9a06c] transition-colors duration-300"
          style={label}
        >
          Request private access
          <span aria-hidden="true" className="inline-block h-px w-10 bg-[#b9a06c]" />
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// 8 · ADJACENT MARKETS
// ─────────────────────────────────────────────────────────────
const AdjacentMarkets = () => {
  const related = landRanchMarkets
    .filter((m) => m.slug !== SLUG && m.kind !== "theme")
    .slice(0, 4);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="text-[#b9a06c] mb-5" style={label}>
            ADJACENT MARKETS
          </p>
          <h2
            className="font-display font-normal text-architectural leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
          >
            Explore nearby Hill Country markets.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {related.map((m: LandRanchMarket) => (
            <Link
              key={m.slug}
              to={`/land-ranch/${m.slug}`}
              className="group flex flex-col"
              aria-label={`Explore the ${m.name} land and ranch market`}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-4">
                <img
                  src={m.heroImage}
                  alt={`${m.name}, Texas Hill Country landscape`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <h3 className="font-display text-architectural text-lg leading-tight mb-1 transition-colors duration-300 group-hover:text-[#b9a06c]">
                {m.name}
              </h3>
              <p className="text-muted-foreground text-[0.85rem] leading-relaxed">
                {m.county}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// PAGE ORCHESTRATOR
// ─────────────────────────────────────────────────────────────
const HillCountryExperience = () => {
  const canonical = `/land-ranch/${SLUG}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Texas Hill Country Ranches for Sale | Echelon Property Group"
        description="Hill Country ranches, live water tracts, hunting properties, and legacy acreage across Central Texas. Echelon Property Group advises buyers on Hill Country land."
        canonical={canonical}
        ogType="website"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Land & Ranch", url: `${SITE}/land-ranch` },
          { name: NAME, url: `${SITE}${canonical}` },
        ])}
      />

      <Navigation />

      <Hero />
      <AdvisorAnchor />
      <OpportunityReel />
      <SixLenses />
      <RegionalMap />
      <LifestyleQuote />
      <OffMarketBand />
      <AdjacentMarkets />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HillCountryExperience;
