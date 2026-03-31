import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import AboutBlock from "@/components/AboutBlock";
import { MapPin } from "lucide-react";

const Footer = lazy(() => import("@/components/Footer"));

const propertyTypes = [
  {
    title: "Acreage & Ranch Land",
    description:
      "Hill Country acreage, recreational land, estate parcels, and ranch properties across Austin's most scenic growth corridors.",
  },
  {
    title: "Development Land",
    description:
      "Raw and entitled land suited for residential, mixed-use, or commercial development in high-growth areas.",
  },
  {
    title: "Investment Property",
    description:
      "Multifamily, short-term rental, mixed-use, and commercial investment opportunities positioned for strong returns.",
  },
  {
    title: "Off-Market Opportunities",
    description:
      "Access select off-market properties and quietly marketed opportunities through local relationships and investor networks.",
  },
];

const submarkets = [
  "Austin", "Westlake Hills", "Barton Creek", "Lake Travis", "Bee Cave",
  "Dripping Springs", "Spicewood", "Bastrop", "Manor", "Liberty Hill",
  "Georgetown", "Cedar Park", "Round Rock",
];

const evaluationFactors = [
  "Zoning and permitted uses",
  "Utility availability",
  "Road access and frontage",
  "Floodplain and topography",
  "Development potential",
  "Comparable sales and market trends",
  "Income potential for investment assets",
  "Long-term appreciation outlook",
];

const processSteps = [
  {
    step: "01",
    title: "Define acquisition goals",
    description: "We identify your investment strategy, property type, and target locations.",
  },
  {
    step: "02",
    title: "Source opportunities",
    description: "We analyze listed properties and off-market opportunities.",
  },
  {
    step: "03",
    title: "Evaluate the asset",
    description: "We review zoning, utilities, location fundamentals, and investment potential.",
  },
  {
    step: "04",
    title: "Execute the acquisition",
    description: "We help negotiate and guide the transaction through closing.",
  },
];

const faqs = [
  {
    q: "What types of investment property do you help clients buy?",
    a: "We assist clients in acquiring land, ranch properties, multifamily investments, short-term rental assets, and development opportunities throughout the Austin region.",
  },
  {
    q: "What should I look for when buying land in Austin?",
    a: "Key factors include zoning, utilities, road access, floodplain considerations, and development potential.",
  },
  {
    q: "Do you help with off-market properties?",
    a: "Yes. Through local relationships and investor networks we may identify select off-market opportunities.",
  },
  {
    q: "Do you work with out-of-state investors?",
    a: "Yes. Many of our clients purchase Austin investment property while living in other states.",
  },
];

const LandPage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Austin Land & Investment Property | Echelon Property Group"
        description="Austin land, ranch, development, and investment property opportunities. Strategic real estate advisory across Austin and the Texas Hill Country."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Land", url: "https://www.echelonpropertygroup.com/land" }
      ])} />
      <Navigation />

      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background: "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 14%) 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-minimal mb-6" style={{ color: "hsl(var(--gold-light))" }}>
              AUSTIN LAND &amp; INVESTMENT
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-normal text-architectural mb-6 text-warm-cream">
              Austin Land &amp; Investment{" "}
              <span className="italic">Property</span>
            </h1>
            <p className="text-lg text-warm-cream/60 mb-4 font-medium" style={{ letterSpacing: "0.02em" }}>
              Strategic land, ranch, and investment opportunities across Austin and the Texas Hill Country.
            </p>
            <p className="text-base md:text-lg text-warm-cream/70 max-w-2xl font-light leading-relaxed mb-10">
              From Hill Country acreage and ranch land to development parcels and income-producing investment assets, Echelon Property Group helps buyers and investors identify high-potential real estate opportunities across greater Austin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-gold hover:text-primary-foreground px-8 py-4 transition-colors duration-300 text-center"
              >
                DISCUSS YOUR INVESTMENT GOALS
              </Link>
              <Link
                to="/listings"
                className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300 text-center"
              >
                EXPLORE OPPORTUNITIES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Approach ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-10">
              A Strategic Approach to Land &amp; Investment{" "}
              <span className="italic">Real Estate</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin's rapid growth continues to create opportunity across land, ranch, and investment real estate. Whether you are searching for a long-term land hold, a development parcel, a 1031 exchange target, or an income-producing investment asset, the most successful acquisitions come down to location, access, utilities, zoning, and long-term demand.
              </p>
              <p>
                Echelon Property Group helps buyers evaluate opportunities through both an investment and lifestyle lens. From Hill Country acreage to urban infill development sites, we focus on identifying properties with strong upside potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Property Types ── */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">PROPERTY TYPES</p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-14">
              Property Types We Help Clients{" "}
              <span className="italic">Acquire</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {propertyTypes.map((type) => (
                <div
                  key={type.title}
                  className="p-8 bg-card border border-border rounded-sm"
                >
                  <h3 className="text-xl font-display mb-3 text-foreground">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Investors Target Austin ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-10">
              Why Investors Target Austin{" "}
              <span className="italic">Real Estate</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Greater Austin remains one of the most attractive real estate markets in Texas. Continued population growth, business relocation, and infrastructure expansion have driven long-term demand for land, housing, and commercial real estate.
              </p>
              <p>
                Investors and developers continue to pursue opportunities across the region ranging from Hill Country acreage to urban redevelopment parcels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Submarkets ── */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">SUBMARKETS</p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-6">
              Key Austin Investment{" "}
              <span className="italic">Submarkets</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Investment and land opportunities vary dramatically by location. Each submarket offers different zoning, development potential, and demand drivers.
            </p>
            <div className="flex flex-wrap gap-3">
              {submarkets.map((market) => (
                <span
                  key={market}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-sm text-sm text-foreground"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Evaluate ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-6">
              What We Evaluate{" "}
              <span className="italic">Before You Buy</span>
            </h2>
            <p className="text-muted-foreground mb-10">
              When evaluating land or investment property, we help clients review several critical factors.
            </p>
            <ul className="space-y-4">
              {evaluationFactors.map((factor) => (
                <li
                  key={factor}
                  className="flex items-center gap-4 text-foreground"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">OUR PROCESS</p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-14">
              Our <span className="italic">Process</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {processSteps.map((step) => (
                <div key={step.step} className="flex gap-6">
                  <span
                    className="text-3xl font-display font-normal flex-shrink-0"
                    style={{ color: "hsl(var(--gold) / 0.4)" }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-display mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-14">
              Austin Land &amp; Investment{" "}
              <span className="italic">FAQ</span>
            </h2>
            <div className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-lg font-display mb-3 text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative py-24 md:py-32"
        style={{
          background: "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 12%) 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-normal text-warm-cream text-architectural mb-6">
            Looking for Austin Land or{" "}
            <span className="italic">Investment Property?</span>
          </h2>
          <p className="text-warm-cream/70 max-w-2xl mx-auto mb-10 text-lg">
            Whether you are searching for acreage, development land, or an income-producing investment asset, we can help you identify the right opportunity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-gold hover:text-primary-foreground px-10 py-4 transition-colors duration-300"
            >
              CONTACT TAYLOR SHERWOOD
            </Link>
            <Link
              to="/contact"
              className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-10 py-4 transition-colors duration-300"
            >
              DISCUSS INVESTMENT OPPORTUNITIES
            </Link>
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/austin-land-development-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LAND DEVELOPMENT</Link>
              <Link to="/austin-multifamily-report-2026" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MULTIFAMILY MARKET REPORT</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/listings/commercial-investment-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ COMMERCIAL & INVESTMENT</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
            </div>
          </div>
        </div>
      </section>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandPage;
