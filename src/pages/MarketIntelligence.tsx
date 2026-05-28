import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import MarketPulse from "@/components/market-intel/MarketPulse";
import NeighborhoodStats from "@/components/market-intel/NeighborhoodStats";
import InventoryTrends from "@/components/market-intel/InventoryTrends";
import LuxuryMarketInsights from "@/components/market-intel/LuxuryMarketInsights";
import AgentIntelMarketSnapshot from "@/components/market-intel/AgentIntelMarketSnapshot";

const Footer = lazy(() => import("@/components/Footer"));

const link = "underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold text-foreground transition-colors duration-300";

const faqs = [
  {
    question: "How often is Austin market intelligence data updated?",
    answer:
      "Echelon's market intelligence refreshes daily using private market data feeds and luxury market trend analysis. Aggregated metrics for inventory, absorption, and pricing reflect the most recent closed and active records available for the Austin MSA.",
  },
  {
    question: "What is considered the luxury tier in Austin real estate?",
    answer:
      "Austin's core luxury tier begins at $1.5M, with the upper-tier defined at $3M+ and ultra-luxury at $5M+. Neighborhoods such as West Lake Hills, Tarrytown, Barton Creek, Rollingwood, Old Enfield, and Spanish Oaks anchor the most active segments of this market.",
  },
  {
    question: "How much of Austin's luxury market trades off-market?",
    answer:
      "Roughly one-third of $3M+ closings in Austin transact privately, never reaching the MLS. Access typically requires established advisory relationships, broker-to-broker networks, and discreet representation.",
  },
  {
    question: "Where is buyer migration into Austin luxury coming from?",
    answer:
      "Above $5M, the buyer pool is increasingly driven by relocation from California, New York, and Illinois, with sustained interest from founders and operators in the tech, energy, and finance sectors.",
  },
  {
    question: "Is the Austin luxury market a good investment in 2026?",
    answer:
      "Supply-constrained neighborhoods continue to compound pricing power. Sale-to-list ratios in the upper tier remain near 97%, signaling disciplined pricing and durable demand. The strongest opportunity remains in acquiring quality properties in irreplaceable locations.",
  },
];

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Austin Real Estate Market Intelligence",
  description:
    "Daily-updated Austin real estate market intelligence: market pulse, neighborhood statistics, inventory trends, and luxury market insights for buyers, sellers, and investors.",
  url: "https://www.echelonpropertygroup.com/market-intelligence",
  keywords: [
    "Austin real estate market",
    "Austin luxury market report",
    "Austin neighborhood statistics",
    "Austin inventory trends",
    "off-market real estate Austin",
    "luxury buyer migration Austin",
  ],
  isAccessibleForFree: true,
  creator: {
    "@type": "RealEstateAgent",
    name: "Echelon Property Group",
    url: "https://www.echelonpropertygroup.com",
  },
  temporalCoverage: "2025/2026",
  spatialCoverage: {
    "@type": "Place",
    name: "Austin, Texas",
  },
};

const reportSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  name: "Austin Market Intelligence Briefing",
  about: "Austin luxury real estate market trends, inventory dynamics, and advisory insights",
  url: "https://www.echelonpropertygroup.com/market-intelligence",
  author: {
    "@type": "Organization",
    name: "Echelon Property Group",
  },
  publisher: {
    "@type": "Organization",
    name: "Echelon Property Group",
    url: "https://www.echelonpropertygroup.com",
  },
};

const MarketIntelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Market Intelligence | Luxury Real Estate Briefing"
        description="Daily Austin real estate market intelligence. Pricing resilience, inventory tightening, luxury buyer migration, and off-market activity, interpreted by Echelon Property Group."
        canonical="/market-intelligence"
      />
      <SchemaMarkup schema={datasetSchema} />
      <SchemaMarkup schema={reportSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://www.echelonpropertygroup.com/" },
          { name: "Market Intelligence", url: "https://www.echelonpropertygroup.com/market-intelligence" },
        ])}
      />

      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 tracking-[0.28em] font-semibold uppercase text-[0.7rem]">
              Market Intelligence Briefing
            </p>
            <h1 className="text-4xl md:text-[3.25rem] font-display font-normal text-architectural mb-6 leading-[1.1]">
              Austin Real Estate, Read by Advisors
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A continuously updated read on Austin's residential and luxury market, interpreted with the
              same discipline we bring to private client work. Built for buyers, sellers, and investors
              who require precision over noise.
            </p>
            <p className="mt-5 text-[0.7rem] tracking-[0.22em] uppercase text-muted-foreground/80">
              UPDATED DAILY USING ABOR MLS, PRIVATE MARKET INTELLIGENCE, AND LUXURY MARKET TREND ANALYSIS
            </p>
          </div>
        </div>
      </section>

      <div className="h-6 md:h-10" aria-hidden="true" />

      {/* Section 1 — Market Briefing */}
      <section className="pb-16" aria-labelledby="briefing-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 md:mb-12 max-w-3xl">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground mb-3">Part One</p>
              <h2 id="briefing-heading" className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                The Market Briefing
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                A top-line read on where Austin sits today, pricing, time-to-sale, supply, and the share of
                activity moving through the upper tier. The signal underneath: how confidently the market is
                pricing and absorbing inventory heading into the next cycle.
              </p>
            </header>

            <div className="space-y-10">
              <MarketPulse
                id="market-pulse"
                standfirst={
                  <>
                    Headline indicators for the Austin MSA, drawn from active and recently closed inventory.
                    Read alongside our{" "}
                    <Link to="/austin-luxury-real-estate-market-report" className={link}>
                      Austin luxury market report
                    </Link>{" "}
                    for full-cycle context.
                  </>
                }
                interpretation={
                  <>
                    Pricing resilience is the through-line. Median values are firm, days on market are
                    compressing, and the upper tier continues to absorb a disproportionate share of
                    activity. For sellers above $1.5M, this is a market that rewards{" "}
                    <Link to="/sell-private" className={link}>private positioning</Link> and disciplined
                    pricing strategy. For buyers, opportunity is narrowing in the categories with the
                    deepest demand, particularly{" "}
                    <Link to="/communities/west-lake-hills" className={link}>West Lake Hills</Link>,{" "}
                    <Link to="/communities/tarrytown" className={link}>Tarrytown</Link>, and{" "}
                    <Link to="/communities/barton-creek" className={link}>Barton Creek</Link>.
                  </>
                }
              />

              <InventoryTrends
                id="inventory-trends"
                standfirst={
                  <>
                    Twelve months of active, new, and sold inventory across the Austin market. Useful for
                    identifying seasonal absorption windows and pricing leverage shifts.
                  </>
                }
                interpretation={
                  <>
                    Active inventory is contracting while absorption holds steady, the textbook profile of a
                    tightening market. New listings are pacing below sold counts, which is the precondition
                    for renewed pricing power. Investors evaluating timing should review our{" "}
                    <Link to="/austin-real-estate-investment" className={link}>investment advisory</Link>{" "}
                    framework and{" "}
                    <Link to="/austin-luxury-market-trends" className={link}>luxury market trend analysis</Link>{" "}
                    before committing capital.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Private Intelligence Report */}
      <section className="py-16 md:py-20 bg-[#faf9f6] dark:bg-[hsl(38_15%_12%/0.3)] border-y border-border/50" aria-labelledby="private-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 md:mb-12 max-w-3xl">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground mb-3">Part Two</p>
              <h2 id="private-heading" className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                The Private Intelligence Report
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Where the market diverges by neighborhood. Pricing, year-over-year movement, days on market,
                and active count across Austin's most resilient luxury enclaves, the ZIP codes that define
                where capital is being deployed and where it is being protected.
              </p>
            </header>

            <NeighborhoodStats
              id="neighborhood-stats"
              standfirst={
                <>
                  Coverage across{" "}
                  <Link to="/communities/west-lake-hills" className={link}>West Lake Hills</Link>,{" "}
                  <Link to="/communities/tarrytown" className={link}>Tarrytown</Link>,{" "}
                  <Link to="/communities/barton-creek" className={link}>Barton Creek</Link>,{" "}
                  <Link to="/communities/rollingwood" className={link}>Rollingwood</Link>,{" "}
                  <Link to="/communities/old-enfield" className={link}>Old Enfield</Link>, and{" "}
                  <Link to="/communities/spanish-oaks" className={link}>Spanish Oaks</Link>. Aggregated
                  area data only, individual sold prices are not displayed.
                </>
              }
              interpretation={
                <>
                  Waterfront and view-protected estates continue to set the pace, with Lake Austin and
                  West Lake Hills compounding meaningfully year over year. Tarrytown and Old Enfield reward
                  patience, lower turnover, but durable appreciation. Barton Creek and Spanish Oaks reflect
                  a deeper bench of inventory and a buyer pool that is selective rather than reactive.
                  Compare against the{" "}
                  <Link to="/best-luxury-neighborhoods-austin" className={link}>broader luxury neighborhood map</Link>{" "}
                  to identify where pricing power is most defensible.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Upper-Tier Advisory Memo */}
      <section className="py-16 md:py-20" aria-labelledby="advisory-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 md:mb-12 max-w-3xl">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground mb-3">Part Three</p>
              <h2 id="advisory-heading" className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                The Upper-Tier Advisory Memo
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                A focused read on Austin's $3M+ market, the segment most influenced by relocation capital,
                off-market inventory, and discretionary timing. This is where private representation, not
                broad exposure, drives outcomes.
              </p>
            </header>

            <LuxuryMarketInsights
              id="luxury-insights"
              standfirst={
                <>
                  Upper-tier metrics drawn from active and recently closed luxury inventory. For private
                  inventory not represented here, see our{" "}
                  <Link to="/off-market-real-estate-austin" className={link}>off-market real estate</Link>{" "}
                  desk and{" "}
                  <Link to="/private-distribution" className={link}>private distribution</Link> editions.
                </>
              }
              interpretation={
                <>
                  Three signals matter most at this tier. First, sale-to-list discipline near 97% indicates
                  appropriate pricing and committed buyers, not soft conditions. Second, off-market
                  activity continues to absorb roughly a third of $3M+ closings, reinforcing the value of
                  representation that operates inside private networks. Third, luxury buyer migration from
                  CA, NY, and IL remains structural, not cyclical. Sellers preparing for this market
                  benefit most from{" "}
                  <Link to="/sell-private" className={link}>private-channel positioning</Link>; buyers
                  benefit from access to inventory before it surfaces publicly.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Internal linking + Further reading */}
      <section className="py-16 md:py-20 bg-[#faf9f6] dark:bg-[hsl(38_15%_12%/0.3)] border-y border-border/50" aria-labelledby="further-reading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-gold font-semibold mb-3">Further Reading</p>
              <h2 id="further-reading" className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Continue Inside the Market
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Curated entry points into Austin's most relevant communities, market reports, and private
                advisory channels.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              <LinkColumn
                title="Premier Communities"
                items={[
                  { to: "/communities/west-lake-hills", label: "West Lake Hills" },
                  { to: "/communities/tarrytown", label: "Tarrytown" },
                  { to: "/communities/barton-creek", label: "Barton Creek" },
                  { to: "/communities/rollingwood", label: "Rollingwood" },
                  { to: "/communities/old-enfield", label: "Old Enfield" },
                  { to: "/communities/spanish-oaks", label: "Spanish Oaks" },
                ]}
              />
              <LinkColumn
                title="Reports & Advisory"
                items={[
                  { to: "/austin-luxury-real-estate-market-report", label: "Austin Luxury Market Report" },
                  { to: "/austin-luxury-market-trends", label: "Austin Luxury Market Trends" },
                  { to: "/off-market-real-estate-austin", label: "Off-Market Real Estate" },
                  { to: "/private-distribution", label: "Private Distribution Editions" },
                  { to: "/austin-real-estate-investment", label: "Investment Advisory" },
                  { to: "/sell-private", label: "Private Sale Representation" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" aria-labelledby="faq-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10 text-center">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-gold font-semibold mb-3">Frequently Asked</p>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-display font-normal text-architectural">
                About Austin Market Intelligence
              </h2>
            </header>
            <dl className="divide-y divide-border/60 border-y border-border/60">
              {faqs.map((f) => (
                <div key={f.question} className="py-6">
                  <dt className="text-lg md:text-xl font-display text-architectural mb-2">{f.question}</dt>
                  <dd className="text-foreground/80 leading-relaxed">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

const LinkColumn = ({ title, items }: { title: string; items: { to: string; label: string }[] }) => (
  <div className="bg-background p-8 md:p-10">
    <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gold font-semibold mb-5">{title}</p>
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.to}>
          <Link
            to={i.to}
            className="group inline-flex items-center gap-3 text-foreground/90 hover:text-gold transition-colors duration-300"
          >
            <span className="font-display">{i.label}</span>
            <span className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default MarketIntelligence;
