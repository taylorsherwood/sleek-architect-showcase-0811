import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import RealScoutListings from "@/components/RealScoutListings";
import ScrollReveal from "@/components/ScrollReveal";
import heroImage from "@/assets/past-transactions-hero.jpg";

const Testimonials = lazy(() => import("@/components/Testimonials"));
const PrivateSalesShowcase = lazy(() => import("@/components/PrivateSalesShowcase"));

const stats = [
  "90%+ Off-Market Transactions",
  "Luxury & Investment Sales Across Austin",
  "Barton Creek • Westlake • Tarrytown • Downtown",
];

const PastTransactions = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Recent Sales & Transactions | Echelon Property Group"
        description="View recently closed luxury homes, land, and investment properties in Austin Texas by Echelon Property Group. See our track record of successful transactions." />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Past Transactions", url: "https://www.echelonpropertygroup.com/past-transactions" },
      ])} />
      <SchemaMarkup schema={createFAQSchema([
        { question: "Does Echelon Property Group share past transaction details?", answer: "Due to the private nature of our client relationships, approximately 95% of our transactions are conducted off market and are not publicly displayed. Client privacy and confidentiality are of utmost importance to Echelon Property Group." },
        { question: "What types of properties has Echelon Property Group sold?", answer: "Our portfolio includes luxury residential homes, waterfront estates, commercial investment properties, development land, and ranch properties across Austin and the Texas Hill Country." },
        { question: "How can I see Echelon Property Group's track record?", answer: "Contact us directly for a confidential overview of our transaction history and client references. We are happy to provide case studies and examples relevant to your specific real estate needs." },
      ])} />
      <Navigation />

      {/* ── Editorial Hero ── */}
      <section className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        {/* Background image */}
        <img
          src={heroImage}
          alt="Luxury homes along Lake Austin at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12 md:pb-16">
            <div className="max-w-3xl">
              <ScrollReveal delay={100} distance={8}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-normal text-white leading-[1.1] tracking-[-0.02em] mb-5">
                  A Proven Record Across Austin's Most Competitive Markets
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={250} distance={8}>
                <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  A curated selection of on-market and privately negotiated transactions across Austin's most sought-after neighborhoods. The majority of our deals are executed off-market, giving our clients access, discretion, and pricing advantages not available through traditional channels.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={400} distance={6}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
                  {stats.map((stat, i) => (
                    <span key={i} className="flex items-center gap-4 md:gap-0">
                      <span
                        className="text-[10px] md:text-[11px] uppercase font-medium text-white/60 tracking-[0.16em]"
                      >
                        {stat}
                      </span>
                      {i < stats.length - 1 && (
                        <span className="hidden md:block mx-5 h-3 w-px bg-white/25" />
                      )}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <div className="h-8 md:h-12" />
      <RealScoutListings />

      {/* ── Notable Private Sales ── */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PrivateSalesShowcase />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Testimonials />
      </Suspense>

      {/* ── SEO Content: Transaction History & Expertise ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              A Track Record Built on Results
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Echelon Property Group has built its reputation on consistent, measurable results for luxury home sellers, buyers, and investors across Austin and the Texas Hill Country. Our transaction history spans a wide range of property types — from multimillion-dollar estates in Barton Creek and Westlake Hills to waterfront homes on Lake Austin, development land in the Hill Country, and commercial investment properties throughout the Austin metro.
              </p>
              <p>
                What sets our transaction record apart is the volume of off-market and privately negotiated deals. Approximately 95% of our transactions are conducted through private channels, reflecting our clients' preference for discretion and our ability to source and close opportunities that never appear on public listing platforms.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Property Types We've Transacted
              </h3>
              <p>
                Our experience covers the full spectrum of Austin real estate. We've represented clients in the purchase and sale of luxury single-family homes, gated community estates, waterfront properties, downtown condominiums and penthouses, multifamily apartment complexes, retail and office buildings, raw and entitled development land, and ranch properties across the Texas Hill Country.
              </p>
              <p>
                This breadth of experience gives our clients a significant advantage. Whether you're evaluating a luxury home purchase, considering a 1031 exchange into commercial property, or assembling land for development, we bring relevant transaction experience and market knowledge to every engagement.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Neighborhoods Where We've Closed Deals
              </h3>
              <p>
                Our transaction history includes properties across Austin's most prestigious addresses: Barton Creek, Westlake Hills, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, Dripping Springs, Travis Heights, Downtown Austin, Cat Mountain, Northwest Hills, and the greater Texas Hill Country. This deep neighborhood-level experience means we bring hyperlocal pricing insight, buyer demand data, and negotiation context that generalist agents simply cannot match.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Why Our Track Record Matters
              </h3>
              <p>
                In luxury real estate, experience translates directly to results. Our familiarity with complex deal structures, high-value negotiations, and the nuances of Austin's luxury submarkets ensures our clients receive informed, strategic representation. We understand appraisal challenges in the luxury segment, how to navigate inspection negotiations on estate properties, and how to position listings for maximum buyer engagement.
              </p>
              <p>
                Every transaction in our history represents a client who trusted us with one of the most significant financial decisions of their lives. That trust is earned through market expertise, transparent communication, and a relentless commitment to achieving the best possible outcome.
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
              >
                DISCUSS YOUR NEXT TRANSACTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYER SERVICES</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
              <Link to="/home-value-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ FREE HOME VALUATION</Link>
              <Link to="/austin-luxury-homes-for-sale" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY HOMES</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default PastTransactions;