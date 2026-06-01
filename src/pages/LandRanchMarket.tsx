import { lazy, Suspense } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import {
  getLandRanchMarket,
  landRanchMarkets,
  type LandRanchMarket,
} from "@/data/landRanchMarkets";

const Footer = lazy(() => import("@/components/Footer"));
const MarketBalanceGauge = lazy(
  () => import("@/components/market-intel/MarketBalanceGauge"),
);

const SITE = "https://www.echelonpropertygroup.com";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const propertyTypeBlurbs: Record<string, string> = {
  Ranches:
    "Working and legacy ranches with cattle, hay, equestrian, and lifestyle infrastructure in place.",
  "Recreational Land":
    "Tracts curated for hunting, fishing, wildlife habitat, and family recreation rather than agricultural yield.",
  "Hunting Properties":
    "Managed acreage with established wildlife programs, exemption history, and turnkey hunting infrastructure.",
  "Agricultural Land":
    "Productive farm and ranch acreage with active ag valuation, water, and operational history.",
  "Development Opportunities":
    "Tracts with subdivision, hospitality, mixed-use, or entitlement potential aligned with regional growth.",
  "Vineyards & Wine Country Estates":
    "Operating vineyards, tasting-room sites, and acreage suited to the Hill Country wine economy.",
  "Waterfront & River Tracts":
    "Properties with lake, river, or creek frontage and verified water access rights.",
  "Equestrian Estates":
    "Acreage configured for horse operations, with stables, arenas, and pasture systems in place.",
};

const LandRanchMarketPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const market = getLandRanchMarket(slug);

  if (!market) {
    return <Navigate to="/land-ranch" replace />;
  }

  const canonical = `/land-ranch/${market.slug}`;
  const relatedMarkets = landRanchMarkets
    .filter((m) => m.slug !== market.slug && m.kind !== "theme")
    .slice(0, 4);
  const heroEyebrow = market.heroEyebrow ?? `LAND & RANCH · ${market.county.toUpperCase()}`;
  const heroHeadline = market.heroHeadline ?? `${market.name} Ranches & Land`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={market.metaTitle}
        description={market.metaDescription}
        canonical={canonical}
        ogType="website"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Land & Ranch", url: `${SITE}/land-ranch` },
          { name: market.name, url: `${SITE}${canonical}` },
        ])}
      />

      <Navigation />
      <div className="h-32 md:h-28 lg:h-[6.5rem]" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative w-full h-[560px] sm:min-h-[620px] md:min-h-[700px] lg:h-[780px] overflow-hidden bg-primary">
        <img
          src={market.heroImage}
          alt={`${market.name}, ${market.county} ranch land and Hill Country landscape`}
          className="absolute inset-0 w-full h-full object-cover object-center"
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
              "linear-gradient(to right, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.32) 40%, rgba(12,15,36,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,15,36,0.72) 0%, rgba(12,15,36,0.50) 50%, rgba(12,15,36,0.24) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full items-end md:items-center px-6 md:px-12 pb-20 md:pb-0">
          <div className="container mx-auto md:-translate-y-6 lg:-translate-y-10">
            <div className="max-w-2xl">

              <p className="text-gold mb-3 md:mb-5" style={labelStyle}>
                {heroEyebrow}
              </p>
              <h1
                className="font-display font-normal text-white leading-[1.06] tracking-tight mb-4 md:mb-6"
                style={{
                  fontSize: "clamp(1.85rem, 4.6vw, 3.4rem)",
                  textShadow:
                    "0 2px 22px rgba(0,0,0,0.40), 0 1px 2px rgba(0,0,0,0.45)",
                }}
              >
                {heroHeadline}
              </h1>
              <p
                className="text-white/90 leading-relaxed mb-7 md:mb-9 max-w-xl text-[0.95rem] md:text-base lg:text-[1.0625rem]"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
              >
                {market.positioning}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-7 py-4 transition-colors duration-300"
                  style={labelStyle}
                >
                  Discuss a {market.name} Acquisition
                </Link>
                <Link
                  to="/land-ranch"
                  className="inline-flex items-center justify-center border border-gold text-white hover:bg-architectural hover:border-architectural px-7 py-4 transition-colors duration-300 backdrop-blur-sm"
                  style={labelStyle}
                >
                  Explore All Markets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── BUYER / SELLER MARKET BALANCE ─────────────────── */}
      <Suspense fallback={null}>
        <MarketBalanceGauge
          communityName={market.name}
          marketName={market.name}
          fallbackMarketName={market.county}
          eyebrow={`${market.name} · Market Balance`}
        />
      </Suspense>



      {/* ── MARKET OVERVIEW ─────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 max-w-6xl mx-auto">
            <div className="md:col-span-5">
              <p className="text-gold mb-5" style={labelStyle}>
                MARKET OVERVIEW
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.1rem] lg:text-[2.4rem] font-normal text-architectural leading-[1.15] max-w-[20ch]">
                Understanding the {market.name} land market
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-muted-foreground leading-[1.75] text-[1.0625rem]">
              {market.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="pt-2">
                <div className="h-px w-12 bg-gold mb-6" aria-hidden="true" />
                <p
                  className="text-architectural mb-4"
                  style={{ ...labelStyle, fontSize: "0.65rem" }}
                >
                  WHY BUYERS ARE DRAWN HERE
                </p>
                <ul className="space-y-3">
                  {market.buyerDraw.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-[1rem] leading-[1.6] text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] h-px w-4 bg-gold flex-shrink-0"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── AGENT INTEL ─────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              AGENT INTEL
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1]">
              {market.name} Market Snapshot
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mt-5 max-w-2xl">
              Advisory-grade observations from active engagement in the {market.name} land
              market. Indicative figures — every parcel underwrites differently based on
              water, exemptions, access, and entitlement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {[
              { label: "Median Price Per Acre", value: market.agentIntel.medianPricePerAcre },
              { label: "Typical Ranch Size", value: market.agentIntel.typicalRanchSize },
              { label: "Buyer Profile", value: market.agentIntel.buyerProfile },
              { label: "Recreational Demand", value: market.agentIntel.recreationalDemand },
              { label: "Development Activity", value: market.agentIntel.developmentActivity },
              { label: "Long-Term Outlook", value: market.agentIntel.longTermOutlook },
            ].map((row) => (
              <div key={row.label} className="bg-background p-8 md:p-9">
                <p
                  className="text-gold mb-4"
                  style={{ ...labelStyle, fontSize: "0.55rem" }}
                >
                  {row.label}
                </p>
                <p
                  className="text-primary leading-[1.6] text-[1rem]"
                  style={{ fontFamily: '"Jost", sans-serif' }}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-muted-foreground/70 text-xs mt-6 max-w-2xl"
            style={{ fontStyle: "italic" }}
          >
            Indicative figures based on recent {market.county} market activity. Contact
            Echelon Property Group for a current, property-specific assessment.
          </p>
        </div>
      </section>



      {/* ── PROPERTY TYPES ─────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              PROPERTY TYPES
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1]">
              What trades in {market.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {market.propertyTypes.map((t) => (
              <div key={t} className="border-t border-[rgba(12,15,36,0.18)] pt-6">
                <h3 className="font-display text-xl text-architectural mb-3 leading-tight">
                  {t}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-[1.65]">
                  {propertyTypeBlurbs[t]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── WHY BUYERS CHOOSE ─────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              EDITORIAL
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1]">
              Why buyers choose {market.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 max-w-6xl">
            {market.whyBuyers.map((w) => (
              <div key={w.title}>
                <div className="h-px w-10 bg-gold mb-5" aria-hidden="true" />
                <h3 className="font-display text-[1.35rem] text-architectural mb-4 leading-snug">
                  {w.title}
                </h3>
                <p className="text-muted-foreground leading-[1.7] text-[1rem]">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── LIFESTYLE ─────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={market.lifestyle.image ?? market.heroImage}
                  alt={`${market.name} lifestyle and surrounding landscape`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <p className="text-gold mb-5" style={labelStyle}>
                {market.lifestyle.eyebrow}
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.1rem] lg:text-[2.4rem] font-normal text-architectural leading-[1.15] mb-6 max-w-[22ch]">
                {market.lifestyle.headline}
              </h2>
              <p className="text-muted-foreground leading-[1.8] text-[1.0625rem] max-w-[44ch]">
                {market.lifestyle.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── FEATURED OPPORTUNITIES CTA ─────────────────────────────────── */}
      <section className="py-14 md:py-20 text-white" style={{ background: "#0C0F24" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold mb-5" style={labelStyle}>
              PRIVATE ACCESS
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white leading-[1.1] mb-6">
              Featured {market.name} Opportunities
            </h2>
            <p className="text-white/80 leading-relaxed text-[1.0625rem] mb-9 max-w-2xl mx-auto">
              The most relevant tracts in {market.name} rarely reach open marketing.
              Qualified buyers receive a curated, off-market view of what is actually
              moving before it becomes public.
            </p>
            <Link
              to="/off-market-real-estate-austin"
              className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-8 py-4 transition-colors duration-300"
              style={labelStyle}
            >
              Request Private Access
            </Link>
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── RELATED MARKETS ─────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-gold mb-5" style={labelStyle}>
              ADJACENT MARKETS
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-architectural leading-[1.1]">
              Explore nearby Hill Country markets
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {relatedMarkets.map((m: LandRanchMarket) => (
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
                <h3 className="font-display text-architectural text-lg leading-tight mb-1 transition-colors duration-300 group-hover:text-gold">
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

      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── FINAL ADVISORY CTA ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold mb-5" style={labelStyle}>
              ADVISORY
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1] mb-6">
              Discuss a {market.name} Land Acquisition Strategy
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-9 max-w-2xl mx-auto">
              Every tract in {market.county} underwrites differently. We work with a small
              number of buyers each cycle to identify, evaluate, and acquire the right
              piece of {market.name} land — quietly, and on the right terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Begin a Conversation
              </Link>
              <Link
                to="/land-ranch"
                className="inline-flex items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Return to Land & Ranch
              </Link>
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

export default LandRanchMarketPage;
