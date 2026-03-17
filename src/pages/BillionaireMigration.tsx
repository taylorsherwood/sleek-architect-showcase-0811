import { Link } from "react-router-dom";
import { createElement } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup from "@/components/SchemaMarkup";
import AuthorBio from "@/components/AuthorBio";

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

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Raleway", sans-serif',
};

const BillionaireMigration = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why Billionaires Are Moving to Austin | Austin Luxury Real Estate Trends"
        description="Why founders and billionaires are relocating to Austin and how it's impacting Lake Austin, Westlake, and luxury real estate."
      />
      <SchemaMarkup schema={articleSchema} />
      <Navigation />

      {/* Hero */}
      <section className="pt-48 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold/50 mb-5 font-bold" style={labelStyle}>
              AUSTIN LUXURY REAL ESTATE
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-architectural mb-8 leading-[1.05]">
              Why Billionaires Are Moving to Austin
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-2xl font-light">
              From Silicon Valley founders to global investors, Austin has become a primary
              destination for capital, talent, and long-term real estate investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to="/luxury-homes-austin"
                className="inline-block bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                VIEW LUXURY HOMES
              </Link>
              <Link
                to="/off-market-luxury-homes-austin"
                className="inline-block border border-foreground/20 text-foreground hover:bg-[#0C0F24] hover:text-white hover:border-[#0C0F24] px-10 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                ACCESS PRIVATE LISTINGS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-20">
              {/* Section 1 — Opening */}
              <section className="space-y-6">
                <p className="text-foreground text-lg md:text-xl leading-relaxed font-light">
                  Austin isn't just growing — it's compounding.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The latest signal came quietly, but it matters.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Uber co-founder Travis Kalanick has officially relocated to Austin, becoming a
                  Texas resident after years of owning property on{" "}
                  <Link
                    to="/communities/lake-austin"
                    className="text-foreground underline hover:text-muted-foreground"
                  >
                    Lake Austin
                  </Link>
                  .
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  He joins a steadily growing group of billionaires, founders, and capital
                  allocators who are no longer just investing in Austin — they're living here.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  And when people at that level move, they don't follow trends.
                </p>
                <p className="text-foreground font-light text-lg">They create them.</p>
              </section>

              {/* Section 2 — The Billionaire Migration */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  The Billionaire Migration Is Real
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Kalanick isn't an outlier — he's part of a broader shift that's been building
                  for years.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Some of the most notable names tied to Austin and Texas include:
                </p>
                <ul className="space-y-3 mb-8 pl-1">
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>
                      <strong className="text-foreground font-medium">Travis Kalanick</strong> —
                      Uber co-founder, now Austin-based
                    </span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>
                      <strong className="text-foreground font-medium">Elon Musk</strong> — Tesla
                      HQ relocation and personal move to Texas
                    </span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>
                      <strong className="text-foreground font-medium">Joe Liemandt</strong> —
                      Austin-based billionaire founder of Trilogy Software
                    </span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>
                      <strong className="text-foreground font-medium">Brian Sheth</strong> —
                      billionaire private equity leader formerly of Vista Equity Partners
                    </span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>
                      <strong className="text-foreground font-medium">David Sacks</strong> —
                      venture capitalist expanding presence in Texas
                    </span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  And beyond Texas specifically, a broader migration is underway across the
                  country.
                </p>
                <p className="text-muted-foreground leading-relaxed">The pattern is clear:</p>
                <p className="text-foreground font-light text-lg mt-4">
                  Capital is decentralizing — and Austin is one of the primary landing zones.
                </p>
              </section>

              {/* Section 3 — Why They're Leaving California */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Why They're Leaving California
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Taxes, regulation, and long-term capital preservation are major drivers.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">Texas offers:</p>
                <ul className="space-y-3 mb-8 pl-1">
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>No state income tax</span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>No state-level capital gains tax</span>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <span>A more predictable business environment</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  For high-net-worth individuals, that isn't a lifestyle choice — it's a strategic
                  one.
                </p>
              </section>

              {/* Section 4 — Regulation and Speed */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Regulation and Speed
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Texas allows for faster development, fewer bottlenecks, and more flexibility.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For founders and operators, speed matters.
                </p>
              </section>

              {/* Section 5 — Lifestyle Without Compromise */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Lifestyle Without Compromise
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Austin offers something rare:
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Waterfront living, privacy, and space — all within minutes of a major city.
                </p>
                <p className="text-foreground font-light text-lg">
                  You can operate at a high level and still be on the lake by sunset.
                </p>
              </section>

              {/* Section 6 — Network Effects */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Network Effects
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once a few major players relocate, others follow.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Talent follows founders.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Capital follows talent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Deals follow capital.
                </p>
                <p className="text-foreground font-light text-lg">
                  Austin has reached a point where it no longer depends on Silicon Valley — it
                  competes with it.
                </p>
              </section>

              {/* Section 7 — Impact on Real Estate */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Impact on Real Estate
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This migration is already affecting the market.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Luxury demand is increasing, particularly in:
                </p>
                <ul className="space-y-3 mb-8 pl-1">
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <Link
                      to="/communities/lake-austin"
                      className="text-foreground underline hover:text-muted-foreground"
                    >
                      Lake Austin
                    </Link>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <Link
                      to="/communities/westlake-hills"
                      className="text-foreground underline hover:text-muted-foreground"
                    >
                      Westlake Hills
                    </Link>
                  </li>
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-gold/60 mt-1.5 text-[8px]">●</span>
                    <Link
                      to="/communities/tarrytown"
                      className="text-foreground underline hover:text-muted-foreground"
                    >
                      Tarrytown
                    </Link>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Inventory remains limited, especially for true waterfront properties.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Many high-end transactions now happen off-market.
                </p>
              </section>

              {/* Section 8 — The Bottom Line */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  The Bottom Line
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Austin has become a primary destination for global capital.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As more high-net-worth individuals establish long-term presence here, real
                  estate becomes increasingly scarce — especially at the high end.
                </p>
              </section>

              {/* Featured Homes — RealScout Widget */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4">
                  Featured Austin Luxury Homes
                </h2>
                <p className="text-muted-foreground text-[15px] font-light leading-relaxed mb-10 max-w-xl">
                  Browse active listings across Austin's most sought-after luxury neighborhoods.
                </p>
                <div
                  className="bg-background rounded-lg border border-border/30 p-5 md:p-10"
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
              </section>

              {/* CTA Section */}
              <section className="text-center py-20 bg-muted -mx-6 px-6 rounded-sm">
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4">
                  Access Private Austin Opportunities
                </h2>
                <p className="text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  A significant portion of luxury properties in Austin never hit the public
                  market. The most desirable homes are often transacted privately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/off-market-luxury-homes-austin"
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
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BillionaireMigration;
