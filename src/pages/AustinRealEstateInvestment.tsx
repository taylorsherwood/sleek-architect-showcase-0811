import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import AuthorBio from "@/components/AuthorBio";

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Raleway", sans-serif',
};

const faqs = [
  { question: "Is Austin a good city for real estate investment?", answer: "Yes. Austin consistently ranks among the top U.S. metros for real estate investment due to robust population growth, tech-sector expansion, no state income tax, and strong rent growth. Both residential and commercial assets have demonstrated compelling risk-adjusted returns relative to coastal gateway markets." },
  { question: "What types of investment property are available in Austin?", answer: "Austin offers diverse investment opportunities including luxury residential buy-and-hold, value-add renovation projects, multifamily apartment complexes, commercial office and retail, industrial properties, development land, and mixed-use projects. Echelon Property Group advises across all asset classes." },
  { question: "What cap rates should I expect in Austin?", answer: "Cap rates vary by asset class. Multifamily properties trade at 4.5–5.5%, Class A office at 5.0–6.5%, suburban retail at 5.5–7.0%, and industrial at 5.0–6.0%. Value-add opportunities may offer higher cap rates with NOI improvement potential. Austin's growth fundamentals support cap rate compression over time." },
  { question: "Where are the best areas to invest in Austin real estate?", answer: "Strongest investment areas include Westlake Hills and Lake Austin (long-term appreciation), East Austin and East Riverside (value-add multifamily), I-35 corridor (industrial and development land), Cedar Park and Pflugerville (suburban growth), and Dripping Springs (Hill Country development). Strategy should align with your investment thesis and risk tolerance." },
  { question: "Does Echelon Property Group work with out-of-state investors?", answer: "Absolutely. Many of our investment clients are based outside Texas. We provide comprehensive market orientation, submarket analysis, property tours, financial underwriting support, and end-to-end transaction management for remote investors targeting Austin real estate opportunities." },
];

const AustinRealEstateInvestment = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Real Estate Investment | Echelon Property Group"
        description="Austin real estate investment: residential, commercial, multifamily, and land advisory. Expert deal sourcing and underwriting from Echelon Property Group."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />

      {/* ── HERO (keep as-is on light background) ── */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4">INVESTMENT ADVISORY</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              Austin Real Estate Investment
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Institutional-grade investment advisory for Austin's residential, commercial, and land markets. 
              Echelon Property Group helps private investors, family offices, and portfolio buyers identify, 
              underwrite, and execute winning real estate strategies across Central Texas.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DARK BODY — matches /off-market-real-estate-austin
          ══════════════════════════════════════════════ */}

      {/* ── WHY INVEST ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            THE OPPORTUNITY
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Why Invest in Austin Real Estate?
          </h2>
          <div className="space-y-6">
            <p className="text-white/50 text-sm md:text-[0.925rem] leading-relaxed">
              Austin has emerged as one of the most compelling real estate investment markets in the United States. The city's fundamental growth drivers — a diversified technology economy, sustained population growth, no state income tax, and exceptional quality of life — create a demand environment that supports multiple investment strategies across asset classes.
            </p>
            <p className="text-white/50 text-sm md:text-[0.925rem] leading-relaxed">
              Major corporate relocations and expansions by Apple, Tesla, Google, Meta, Oracle, and Samsung generate thousands of high-income households annually, driving sustained demand for both housing and commercial space. Austin's population has grown by over 300,000 residents in the past five years, creating long-term demand tailwinds that benefit property owners and developers.
            </p>
            <p className="text-white/50 text-sm md:text-[0.925rem] leading-relaxed">
              Compared to coastal gateway markets, Austin offers significantly better risk-adjusted returns. Cap rates remain attractive, construction costs are more favorable, the regulatory environment is business-friendly, and long-term growth projections support continued appreciation across most asset classes.
            </p>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT STRATEGIES ─────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            STRATEGIES
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-14">
            Austin Investment Strategies
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
            <div className="border border-white/8 p-6 md:p-8">
              <h3 className="text-white font-medium text-base mb-2">Luxury Residential Buy-and-Hold</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                Supply-constrained neighborhoods like{" "}
                <Link to="/communities/westlake-hills" className="text-gold hover:text-gold/80 transition-colors">Westlake Hills</Link>,{" "}
                <Link to="/communities/lake-austin" className="text-gold hover:text-gold/80 transition-colors">Lake Austin</Link>, and{" "}
                <Link to="/communities/barton-creek" className="text-gold hover:text-gold/80 transition-colors">Barton Creek</Link>{" "}
                offer the most reliable long-term appreciation. Limited buildable lots, top-tier schools, and sustained demand from tech-economy growth create a foundation for 7–12% average annual appreciation.
              </p>
            </div>
            <div className="border border-white/8 p-6 md:p-8">
              <h3 className="text-white font-medium text-base mb-2">Value-Add Residential</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                Established neighborhoods like{" "}
                <Link to="/communities/tarrytown" className="text-gold hover:text-gold/80 transition-colors">Tarrytown</Link> and{" "}
                <Link to="/communities/rollingwood" className="text-gold hover:text-gold/80 transition-colors">Rollingwood</Link>{" "}
                offer compelling renovation and teardown-rebuild opportunities. The spread between acquisition cost and improved value supports profitable projects, particularly on larger lots.
              </p>
            </div>
            <div className="border border-white/8 p-6 md:p-8">
              <h3 className="text-white font-medium text-base mb-2">Commercial & Multifamily</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                Austin's{" "}
                <Link to="/austin-commercial-real-estate" className="text-gold hover:text-gold/80 transition-colors">commercial real estate market</Link>{" "}
                offers opportunities across multifamily, office, retail, and industrial asset classes. Strong population growth and tech-sector expansion drive sustained demand, while cap rates remain attractive relative to coastal markets.
              </p>
            </div>
            <div className="border border-white/8 p-6 md:p-8">
              <h3 className="text-white font-medium text-base mb-2">Development Land</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                <Link to="/land-for-sale-austin" className="text-gold hover:text-gold/80 transition-colors">Land along Austin's growth corridors</Link>{" "}
                — including I-35, Highway 290 West, and the{" "}
                <Link to="/communities/dripping-springs" className="text-gold hover:text-gold/80 transition-colors">Dripping Springs</Link>{" "}
                corridor — presents significant appreciation potential for investors with medium- to long-term horizons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST AREAS ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            SUBMARKETS
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            What Areas of Austin Are Best for Investment Property?
          </h2>
          <div className="space-y-6">
            <p className="text-white/50 text-sm md:text-[0.925rem] leading-relaxed">
              Austin's investment landscape varies by submarket and strategy. East Austin and the East Riverside corridor offer strong multifamily and mixed-use potential. Northwest Austin and the Domain area attract corporate office tenants. South Austin and the I-35 corridor present industrial and logistics opportunities.
            </p>
            <p className="text-white/50 text-sm md:text-[0.925rem] leading-relaxed">
              For luxury residential investment, the strongest returns historically come from supply-constrained neighborhoods: Lake Austin waterfront, Westlake Hills, and Barton Creek. These areas benefit from permanently limited inventory, enduring demand drivers, and buyer pools that are less sensitive to interest rate fluctuations.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXPLORE LINKS ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            EXPLORE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Austin Real Estate
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link to="/luxury-real-estate-austin" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ Luxury Real Estate</Link>
            <Link to="/austin-commercial-real-estate" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ Commercial Real Estate</Link>
            <Link to="/land-for-sale-austin" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ Land for Sale</Link>
            <Link to="/listings/commercial-investment-austin" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ Current Listings</Link>
            <Link to="/off-market-luxury-homes-austin" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ Off-Market Homes</Link>
            <Link to="/communities" className="text-white/40 hover:text-gold transition-colors text-xs tracking-[0.15em] uppercase py-3">→ All Communities</Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            FAQ
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-14">
            Frequently Asked Questions About Austin Investment Property
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/8 pb-6">
                <h3 className="text-white font-medium text-base mb-2">{faq.question}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR BIO ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <AuthorBio />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
            Discuss Your Investment Strategy
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Contact Taylor Sherwood for a confidential conversation about Austin real estate investment opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold hover:bg-white text-white hover:text-gold hover:font-bold px-12 py-4 transition-all duration-300 ease-out active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
            style={labelStyle}
          >
            CONTACT US
          </Link>
        </div>
      </section>

      {/* ── Footer (minimal, dark) ────────────────────── */}
      <footer className="py-8 bg-[hsl(220,15%,5%)] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">© {new Date().getFullYear()} Echelon Property Group · Austin, Texas · Brokered by eXp Realty</p>
          <div className="flex gap-5">
            <Link to="/" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Home</Link>
            <Link to="/private" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Private</Link>
            <Link to="/contact" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AustinRealEstateInvestment;
