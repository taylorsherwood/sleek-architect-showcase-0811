import { Link } from "react-router-dom";
import { createElement, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, createBlogPostingSchema, createFAQSchema } from "@/components/SchemaMarkup";
import AuthorBio from "@/components/AuthorBio";
import lakeAustinHero from "@/assets/lake-austin-aerial.jpg";
import RelatedInsights from "@/components/RelatedInsights";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Billionaires Are Moving to Austin",
  description:
    "Why founders and billionaires are relocating to Austin and how it's impacting Lake Austin, Westlake, and luxury real estate.",
  author: {
    "@type": "Person",
    name: "Taylor Sherwood",
    jobTitle: "Austin Real Estate Advisor",
    worksFor: {
      "@type": "Organization",
      name: "Echelon Property Group",
    },
  },
  publisher: {
    "@type": "Organization",
    name: "Echelon Property Group",
    url: "https://echelonpropertygroup.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://echelonpropertygroup.com/why-billionaires-are-moving-to-austin",
  },
};

const billionaireFaqs = [
  { question: "Why are billionaires moving to Austin Texas?", answer: "Billionaires and high-net-worth founders are relocating to Austin for Texas's zero state income tax, a pro-business regulatory environment, proximity to a booming tech economy, and access to luxury waterfront living on Lake Austin and in West lake Hills — all within minutes of a major metro." },
  { question: "How does billionaire migration affect Austin real estate prices?", answer: "When ultra-high-net-worth individuals relocate, they drive demand for premium inventory in supply-constrained neighborhoods like Lake Austin, West lake Hills, and Tarrytown. This increases competition, accelerates price appreciation, and pushes more luxury transactions off-market." },
  { question: "Which Austin neighborhoods attract the most billionaires?", answer: "Lake Austin waterfront, West lake Hills, and Tarrytown are the primary destinations for billionaire buyers. These areas offer large estates, privacy, water access, and proximity to downtown Austin — a combination rarely found in other major U.S. metros." },
  { question: "Are luxury homes in Austin a good investment in 2026?", answer: "Austin's luxury market continues to benefit from corporate relocations, population growth, and limited high-end inventory. Combined with no state income tax and strong long-term appreciation in neighborhoods like Barton Creek and Lake Austin, luxury real estate in Austin remains a compelling investment." },
];

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const BillionaireMigration = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <SEOHead
        title="Why Billionaires Move to Austin | Echelon Property Group"
        description="Why founders and billionaires are relocating to Austin TX. How wealth migration is reshaping Lake Austin, Westlake, and the luxury real estate market."
        canonical="/blog/why-billionaires-are-moving-to-austin"
        ogType="article"
      />
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={createFAQSchema(billionaireFaqs)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Blog", url: "https://www.echelonpropertygroup.com/blog" },
        { name: "Why Billionaires Are Moving to Austin", url: "https://www.echelonpropertygroup.com/blog/why-billionaires-are-moving-to-austin" },
      ])} />
      <SchemaMarkup schema={createBlogPostingSchema({
        title: "Why Billionaires Are Moving to Austin",
        description: "Why founders and billionaires are relocating to Austin TX. How wealth migration is reshaping Lake Austin, Westlake, and the luxury real estate market.",
        datePublished: "2026-02-15",
        author: "Taylor Sherwood",
        url: "https://www.echelonpropertygroup.com/blog/why-billionaires-are-moving-to-austin",
      })} />
      <Navigation />

      {/* Hero */}
      <section className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
        <img
          src={lakeAustinHero}
          alt="Aerial view of Lake Austin waterfront estates and Hill Country"
          className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy" decoding="async"
                    />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div className="relative h-full container mx-auto px-6 flex items-end pb-10 md:pb-20 pt-28">
          <div className="max-w-[700px]">
            <p className="text-white/50 mb-3 md:mb-5 font-bold" style={labelStyle}>
              AUSTIN LUXURY REAL ESTATE
            </p>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-normal text-white mb-4 md:mb-6 leading-[1.08]">
              Why Billionaires Are Moving to Austin
            </h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed max-w-[620px] font-light mb-6 md:mb-10">
              From Silicon Valley founders to global investors, Austin has become a primary
              destination for capital, talent, and long-term real estate investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/austin-luxury-homes-for-sale"
                className="inline-block bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                VIEW LUXURY HOMES
              </Link>
              <Link
                to="/off-market-real-estate-austin"
                className="inline-block border border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-10 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                ACCESS PRIVATE LISTINGS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="pt-14 md:pt-16 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-[700px] mx-auto" style={{ lineHeight: "1.65" }}>
            <div className="space-y-10">
              {/* Section 1 — Opening */}
              <section className="space-y-[18px]">
                <p className="text-foreground/85 text-lg md:text-xl font-light">
                  Austin isn't just growing — it's compounding.
                </p>
                <p className="text-foreground/60">
                  The latest signal came quietly, but it matters.
                </p>
                <p className="text-foreground/60">
                  Uber co-founder Travis Kalanick has officially relocated to Austin, becoming a
                  Texas resident after years of owning property on{" "}
                  <Link
                    to="/communities/lake-austin"
                    className="text-foreground/80 underline hover:text-foreground/50"
                  >
                    Lake Austin
                  </Link>
                  .
                </p>
                <p className="text-foreground/60">
                  He joins a steadily growing group of billionaires, founders, and capital
                  allocators who are no longer just investing in Austin — they're living here.
                </p>
                <p className="text-foreground/60">
                  And when people at that level move, they don't follow trends.
                </p>
                <p className="text-foreground/85 font-light text-lg">They create them.</p>
              </section>

              {/* Section 2 — The Billionaire Migration */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  The Billionaire Migration Is Real
                </h2>
                <p className="text-foreground/60 mb-5">
                  Kalanick isn't an outlier — he's part of a broader shift that's been building
                  for years.
                </p>
                <p className="text-foreground/60 mb-6">
                  Some of the most notable names tied to Austin and Texas include:
                </p>
                <ul className="space-y-2.5 mb-6 pl-1">
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Elon Musk</strong> — Tesla
                      HQ relocation and personal move to Texas
                    </span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Michael Dell</strong> —
                      Founder & CEO of Dell Technologies, longtime Austin resident
                    </span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Travis Kalanick</strong> —
                      Uber co-founder, now Austin-based
                    </span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Joe Liemandt</strong> —
                      Austin-based billionaire founder of Trilogy Software
                    </span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Brian Sheth</strong> —
                      billionaire private equity leader formerly of Vista Equity Partners
                    </span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>
                      <strong className="text-foreground/80 font-medium">David Sacks</strong> —
                      venture capitalist expanding presence in Texas
                    </span>
                  </li>
                </ul>
                <p className="text-foreground/60 mb-[18px]">
                  And beyond Texas specifically, a broader migration is underway across the
                  country.
                </p>
                <p className="text-foreground/60">The pattern is clear:</p>
                <p className="text-foreground/85 font-light text-lg mt-3">
                  Capital is decentralizing — and Austin is one of the primary landing zones.
                </p>
              </section>

              {/* Section 3 — Why They're Leaving California */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  Why They're Leaving California
                </h2>
                <p className="text-foreground/60 mb-5">
                  Taxes, regulation, and long-term capital preservation are major drivers.
                </p>
                <p className="text-foreground/60 mb-4">Texas offers:</p>
                <ul className="space-y-2.5 mb-6 pl-1">
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>No state income tax</span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>No state-level capital gains tax</span>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <span>A more predictable business environment</span>
                  </li>
                </ul>
                <p className="text-foreground/60">
                  For high-net-worth individuals, that isn't a lifestyle choice — it's a strategic
                  one.
                </p>
              </section>

              {/* Section 4 — Regulation and Speed */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  Regulation and Speed
                </h2>
                <p className="text-foreground/60 mb-[18px]">
                  Texas allows for faster development, fewer bottlenecks, and more flexibility.
                </p>
                <p className="text-foreground/60">
                  For founders and operators, speed matters.
                </p>
              </section>

              {/* Section 5 — Lifestyle Without Compromise */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  Lifestyle Without Compromise
                </h2>
                <p className="text-foreground/60 mb-[18px]">
                  Austin offers something rare:
                </p>
                <p className="text-foreground/60 mb-[18px]">
                  Waterfront living, privacy, and space — all within minutes of a major city.
                </p>
                <p className="text-foreground/85 font-light text-lg">
                  You can operate at a high level and still be on the lake by sunset.
                </p>
              </section>

              {/* Section 6 — Network Effects */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  Network Effects
                </h2>
                <p className="text-foreground/60 mb-[18px]">
                  Once a few major players relocate, others follow.
                </p>
                <p className="text-foreground/60">Talent follows founders.</p>
                <p className="text-foreground/60">Capital follows talent.</p>
                <p className="text-foreground/60 mb-5">Deals follow capital.</p>
                <p className="text-foreground/85 font-light text-lg">
                  Austin has reached a point where it no longer depends on Silicon Valley — it
                  competes with it.
                </p>
              </section>

              {/* Section 7 — Impact on Real Estate */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  Impact on Real Estate
                </h2>
                <p className="text-foreground/60 mb-5">
                  This migration is already affecting the market.
                </p>
                <p className="text-foreground/60 mb-4">
                  Luxury demand is increasing, particularly in:
                </p>
                <ul className="space-y-2.5 mb-6 pl-1">
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <Link
                      to="/communities/lake-austin"
                      className="text-foreground/80 underline hover:text-foreground/50"
                    >
                      Lake Austin
                    </Link>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <Link
                      to="/communities/westlake-hills"
                      className="text-foreground/80 underline hover:text-foreground/50"
                    >
                      West lake Hills
                    </Link>
                  </li>
                  <li className="text-foreground/60 flex items-start gap-3">
                    <span className="text-gold mt-[7px] text-[7px]">●</span>
                    <Link
                      to="/communities/tarrytown"
                      className="text-foreground/80 underline hover:text-foreground/50"
                    >
                      Tarrytown
                    </Link>
                  </li>
                </ul>
                <p className="text-foreground/60 mb-[18px]">
                  Inventory remains limited, especially for true waterfront properties.
                </p>
                <p className="text-foreground/60">
                  Many high-end transactions now happen off-market.
                </p>
              </section>

              {/* Section 8 — The Bottom Line */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mt-10 mb-4">
                  The Bottom Line
                </h2>
                <p className="text-foreground/60 mb-[18px]">
                  Austin has become a primary destination for global capital.
                </p>
                <p className="text-foreground/60">
                  As more high-net-worth individuals establish long-term presence here, real
                  estate becomes increasingly scarce — especially at the high end.
                </p>
              </section>
            </div>

            {/* Featured Homes — RealScout Widget (wider) */}
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-3">
                Featured Austin Luxury Homes
              </h2>
              <p className="text-foreground/50 text-[15px] font-light mb-8">
                Browse active listings across Austin's most sought-after luxury neighborhoods.
              </p>
            </div>
          </div>

          {/* Widget at wider width */}
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-secondary rounded-lg border border-border/30 p-5 md:p-10"
              style={{
                boxShadow:
                  "0 4px 24px -4px hsl(var(--foreground) / 0.06), 0 1px 3px hsl(var(--foreground) / 0.03)",
              }}
            >
              {createElement("realscout-advanced-search", {
                "agent-encoded-id": "QWdlbnQtMjg5NDU2",
                "price-min": "1500000",
                "property-types": "SFR",
                "sort-order": "PRICE_HIGH",
              })}
            </div>
          </div>

          {/* CTA + Author back in article width */}
          <div className="max-w-[700px] mx-auto">
            {/* CTA Section */}
            <section className="text-center py-20 mt-20 bg-secondary -mx-6 px-6 rounded-sm">
              <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-4">
                Access Private Austin Opportunities
              </h2>
              <p className="text-foreground/55 mb-10 max-w-2xl mx-auto">
                A significant portion of luxury properties in Austin never hit the public
                market. The most desirable homes are often transacted privately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/off-market-real-estate-austin"
                  className="inline-block bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
                  style={labelStyle}
                >
                  REQUEST PRIVATE LISTINGS
                </Link>
                <Link
                  to="/connect"
                  className="inline-block border border-primary text-primary hover:bg-[#0C0F24] hover:text-white hover:border-[#0C0F24] px-10 py-4 transition-colors duration-300"
                  style={labelStyle}
                >
                  SCHEDULE A CONSULTATION
                </Link>
              </div>
            </section>

            <AuthorBio />

            {/* ── Internal Links ── */}
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/moving-to-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MOVING TO AUSTIN GUIDE</Link>
                <Link to="/best-luxury-neighborhoods-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BEST LUXURY NEIGHBORHOODS</Link>
                <Link to="/austin-luxury-market-report" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN MARKET REPORT</Link>
                <Link to="/communities/lake-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAKE AUSTIN HOMES</Link>
                <Link to="/communities/westlake-hills" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ WESTLAKE HILLS HOMES</Link>
                <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET REAL ESTATE</Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <RelatedInsights />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default BillionaireMigration;
