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

import heroImage from "@/assets/land-ranch-hero.jpg";
import taylorPortrait from "@/assets/taylor-sherwood-land-ranch.jpg";
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
  <section className="relative w-full h-[88vh] min-h-[560px] max-h-[860px] overflow-hidden bg-[#2F3A2C]">
    <img
      src={heroImage}
      alt="Texas Hill Country ranch land with rolling terrain, live oaks, a creek, and a private drive leading to a modern ranch home"
      className="absolute inset-0 w-full h-full object-cover object-[58%_center] md:object-center"
      width={1920}
      height={1080}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(47,58,44,0.45) 0%, rgba(47,58,44,0.20) 40%, rgba(47,58,44,0.65) 100%)",
      }}
    />
    <div className="relative z-10 h-full flex items-center pt-20 md:pt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-[#8A7450] mb-5 md:mb-7" style={label}>
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
              style={{ ...label, background: "#8A7450", color: "#FFFFFF", border: "1px solid #8A7450", fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#2F3A2C"; e.currentTarget.style.borderColor = "#2F3A2C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#8A7450"; e.currentTarget.style.borderColor = "#8A7450"; }}
            >
              Begin a Private Conversation →
            </Link>
            <Link
              to="/off-market-real-estate-austin"
              className="inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 rounded-sm"
              style={{ ...label, background: "transparent", color: "#FFFFFF", border: "1px solid #8A7450", fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#8A7450"; }}
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
  <section className="relative bg-[#F3EEE4] py-20 md:py-32">
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
          <p className="text-[#8A7450] mb-6" style={label}>
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
            className="inline-flex items-center gap-3 text-architectural hover:text-[#8A7450] transition-colors duration-300"
            style={label}
          >
            Begin a private conversation
            <span aria-hidden="true" className="inline-block h-px w-10 bg-[#8A7450]" />
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
  <section className="relative text-white py-20 md:py-28" style={{ background: "#2F3A2C" }}>
    <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-16">
      <div className="max-w-3xl">
        <p className="text-[#8A7450] mb-5" style={label}>
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
                "linear-gradient(to top, rgba(47,58,44,0.78) 0%, rgba(47,58,44,0.18) 55%, rgba(47,58,44,0) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            <p className="text-[#8A7450] mb-3" style={{ ...label, fontSize: "0.55rem" }}>
              {o.eyebrow}
            </p>
            <h3 className="font-display text-[1.4rem] md:text-[1.6rem] leading-[1.15] text-white">
              {o.title}
            </h3>
            <span
              aria-hidden="true"
              className="block h-px bg-[#8A7450] mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
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
    body: "Live water, springs, wells, and groundwater district context. The variable that most often defines the top of the Hill Country market.",
  },
  {
    number: "02",
    title: "Access",
    body: "Frontage type, easements of record, deeded ingress, and how a tract actually enters and exits. Access quietly determines every future use.",
  },
  {
    number: "03",
    title: "Exemptions",
    body: "Agricultural and wildlife valuations, current use history, and whether the tax posture supports the intended ownership plan.",
  },
  {
    number: "04",
    title: "Topography",
    body: "Slope, drainage, floodplain exposure, buildable areas, and how the land actually lives beyond the aerial view.",
  },
  {
    number: "05",
    title: "Improvements",
    body: "Homes, barns, fencing, roads, utilities, wells, tanks, and infrastructure that may create value or require capital.",
  },
  {
    number: "06",
    title: "Highest & Best Use",
    body: "The long-term lens: legacy ownership, recreation, development, conservation, resale strategy, and market demand.",
  },
];

const SixLenses = () => {
  return (
    <>
      {/* ── DESKTOP / TABLET: static editorial grid ───────────── */}
      <section
        className="relative bg-[#F3EEE4] py-20 md:py-28 hidden md:block"
        aria-label="The Six Lenses framework"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Left column — intro */}
            <aside className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <p className="text-[#8A7450] mb-6" style={label}>
                  SIGNATURE FRAMEWORK
                </p>
                <h2
                  className="font-display font-normal text-architectural leading-[1.06] tracking-tight mb-7"
                  style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)" }}
                >
                  How We Read a Tract of Land.
                </h2>
                <p className="text-muted-foreground text-[1.0625rem] leading-[1.85] max-w-[42ch]">
                  Six lenses Echelon Property Group applies to every Hill
                  Country acquisition. Not a checklist. A way of evaluating
                  what land is, what it can become, and what it should never
                  be asked to do.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-12 bg-[#8A7450]" />
                  <span
                    className="text-architectural tabular-nums"
                    style={{ ...label, fontSize: "0.6rem" }}
                  >
                    SIX LENSES
                  </span>
                </div>
              </div>
            </aside>

            {/* Right column — 2-col grid of lenses */}
            <div className="md:col-span-7">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {lenses.map((l) => (
                  <li
                    key={l.number}
                    className="border-t border-[rgba(47,58,44,0.14)] pt-5"
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span
                        className="font-display text-[#8A7450] leading-none"
                        style={{ fontSize: "1.85rem" }}
                      >
                        {l.number}
                      </span>
                      <h3
                        className="font-display text-architectural leading-[1.15]"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {l.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-[0.97rem] leading-[1.75]">
                      {l.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE: horizontal swipe carousel ─────────────────── */}
      <section className="relative bg-[#F3EEE4] py-20 md:hidden">
        <div className="container mx-auto px-6 mb-8">
          <p className="text-[#8A7450] mb-5" style={label}>
            SIGNATURE FRAMEWORK
          </p>
          <h2
            className="font-display font-normal text-architectural leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.25rem)" }}
          >
            How We Read a Tract of Land.
          </h2>
          <p className="text-muted-foreground text-[1rem] leading-[1.8] mb-6">
            Six lenses Echelon Property Group applies to every Hill Country
            acquisition.
          </p>
          <div
            className="flex items-center gap-2 text-[#8A7450] animate-fade-in"
            style={{ ...label, fontSize: "0.6rem" }}
          >
            <span>Swipe to explore</span>
            <span
              aria-hidden="true"
              className="inline-block animate-[slide-in-right_1.4s_ease-in-out_infinite]"
            >
              →
            </span>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {lenses.map((l) => (
            <article
              key={l.number}
              className="flex-shrink-0 snap-start w-[82%] bg-[#F3EEE4] py-8 px-6"
              style={{ minHeight: "300px" }}
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span
                  className="font-display text-[#8A7450] leading-none"
                  style={{ fontSize: "3rem" }}
                >
                  {l.number}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px bg-[#8A7450]"
                  style={{ width: "60px" }}
                />
              </div>
              <h3
                className="font-display text-architectural mb-4 leading-[1.1]"
                style={{ fontSize: "1.65rem" }}
              >
                {l.title}
              </h3>
              <p className="text-muted-foreground text-[0.98rem] leading-[1.8]">
                {l.body}
              </p>
              <p
                className="text-architectural mt-6 tabular-nums"
                style={{ ...label, fontSize: "0.55rem" }}
              >
                {l.number} / 06
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};


// ─────────────────────────────────────────────────────────────
// 5 · REGIONAL MAP (single short caption)
// ─────────────────────────────────────────────────────────────
const RegionalMap = () => (
  <section className="bg-[#F3EEE4] py-20 md:py-28">
    <div className="container mx-auto px-6 md:px-12">
      <div className="max-w-2xl mb-10 md:mb-14">
        <p className="text-[#8A7450] mb-5" style={label}>
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
  <section className="relative bg-[#F3EEE4] py-24 md:py-32 overflow-hidden">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="h-px w-12 bg-[#8A7450] mb-8" aria-hidden="true" />
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
            className="text-[#8A7450] mt-8"
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
  <section className="relative text-white py-24 md:py-32" style={{ background: "#2F3A2C" }}>
    <div className="container mx-auto px-6 md:px-12">
      <div className="max-w-2xl">
        <span aria-hidden="true" className="block h-px w-16 bg-[#8A7450] mb-8" />
        <p className="text-[#8A7450] mb-5" style={label}>
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
          className="inline-flex items-center gap-3 text-white hover:text-[#8A7450] transition-colors duration-300"
          style={label}
        >
          Request private access
          <span aria-hidden="true" className="inline-block h-px w-10 bg-[#8A7450]" />
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
    <section className="bg-[#F3EEE4] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="text-[#8A7450] mb-5" style={label}>
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
              <h3 className="font-display text-architectural text-lg leading-tight mb-1 transition-colors duration-300 group-hover:text-[#8A7450]">
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
// 9 · MEET YOUR ADVISOR
// ─────────────────────────────────────────────────────────────
const MeetAdvisor = () => (
  <section
    className="relative overflow-hidden"
    style={{
      background: "#F3EEE4",
      paddingTop: "clamp(80px, 10vw, 120px)",
      paddingBottom: "clamp(80px, 10vw, 120px)",
    }}
  >
    <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(47,58,44,0.08)" }} />
    <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px" style={{ background: "rgba(47,58,44,0.08)" }} />

    <div className="container mx-auto px-6 relative">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center max-w-[1280px] mx-auto">
        <div className="md:col-span-5">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "24px",
              boxShadow:
                "0 30px 60px -25px rgba(47,58,44,0.28), 0 12px 30px -15px rgba(47,58,44,0.18)",
              transform: "translateY(-3.5rem)",
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

          <div className="flex items-center justify-center gap-10 mt-6">
            <a
              href="https://www.instagram.com/theinvestorbroker/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8A7450] group/ig"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
              aria-label="Follow Taylor Sherwood on Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span className="relative leading-none font-semibold">
                @THEINVESTORBROKER
                <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#8A7450] scale-x-0 group-hover/ig:scale-x-100 transition-transform duration-500 origin-center" />
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/taylorsherwood/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-[#8A7450] group/li"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
              aria-label="View Taylor Sherwood on LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span className="relative leading-none font-semibold">
                TAYLOR SHERWOOD
                <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#8A7450] scale-x-0 group-hover/li:scale-x-100 transition-transform duration-500 origin-center" />
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-span-7 relative overflow-visible">
          <img
            src={echelonWatermarkLogo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute pointer-events-none select-none hidden md:block"
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
            <p className="text-[#8A7450] mb-5" style={label}>
              MEET YOUR LAND & RANCH ADVISOR
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.15] mb-5">
              Taylor Sherwood
            </h2>
            <p
              className="text-architectural/80 mb-8 leading-relaxed"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.05rem" }}
            >
              Land, Ranch, Development &amp; Investment Property Across Austin and the Texas Hill Country
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

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              {[
                "Austin & Hill Country Land",
                "Off-Market Opportunities",
                "Development & Redevelopment Analysis",
                "Luxury Ranch Representation",
              ].map((item, idx, arr) => (
                <div key={item} className="flex items-center gap-x-5">
                  <span className="text-architectural" style={{ ...label, fontSize: "0.6rem" }}>
                    {item}
                  </span>
                  {idx < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline-block"
                      style={{ width: "20px", height: "1px", background: "#8A7450" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: "1px solid rgba(47,58,44,0.12)" }}>
              <p className="text-[#8A7450] mb-4" style={{ ...label, fontSize: "0.55rem" }}>
                LAND OWNERS
              </p>
              <h3 className="font-display text-2xl md:text-[1.75rem] font-normal text-architectural leading-tight mb-4">
                Considering Selling Land or a Ranch?
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
                style={{ ...label, background: "#2F3A2C", color: "#F3EEE4", border: "1px solid #8A7450" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#8A7450"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#2F3A2C"; e.currentTarget.style.color = "#F3EEE4"; }}
              >
                Request a Land Evaluation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// BARBED WIRE DIVIDER (matches /land-ranch)
// ─────────────────────────────────────────────────────────────
const BarbedWireDivider = () => (
  <section className="bg-[#F3EEE4] py-14 md:py-20" aria-hidden="true">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center max-w-3xl mx-auto">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8A7450]/60" />
        <svg
          viewBox="0 0 240 24"
          className="w-48 h-5 mx-3"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0,12 C30,6 60,18 90,12 C120,6 150,18 180,12 C210,6 240,18 240,12"
            stroke="#8A7450"
            strokeWidth="1"
          />
          <path
            d="M0,12 C30,18 60,6 90,12 C120,18 150,6 180,12 C210,18 240,6 240,12"
            stroke="#8A7450"
            strokeWidth="1"
          />
          {[60, 120, 180].map((x) => (
            <g key={x}>
              <line x1={x} y1="5" x2={x} y2="19" stroke="#8A7450" strokeWidth="1" />
              <line x1={x - 5} y1="9" x2={x + 5} y2="15" stroke="#8A7450" strokeWidth="1" />
              <line x1={x + 5} y1="9" x2={x - 5} y2="15" stroke="#8A7450" strokeWidth="1" />
              <circle cx={x} cy="12" r="1.5" fill="#8A7450" />
            </g>
          ))}
        </svg>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8A7450]/60" />
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// PAGE ORCHESTRATOR
// ─────────────────────────────────────────────────────────────

const HillCountryExperience = () => {
  const canonical = `/land-ranch/${SLUG}`;

  return (
    <div className="land-ranch-theme min-h-screen" style={{ background: "#F3EEE4" }}>
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
      <MeetAdvisor />
      <BarbedWireDivider />
      <OpportunityReel />

      <SixLenses />
      <RegionalMap />
      <LifestyleQuote />
      <OffMarketBand />
      <AdjacentMarkets />
      <BarbedWireDivider />
      <div aria-hidden="true" className="bg-[#F3EEE4] h-16 md:h-28" />



      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HillCountryExperience;
