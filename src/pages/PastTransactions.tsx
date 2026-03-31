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
        {/* Hero image — focal point locked to upper third for consistent framing */}
        <img
          src={heroImage}
          alt="Aerial view of Lake Austin waterfront properties"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] md:object-[center_25%]"
          fetchPriority="high"
        />
        {/* Bottom-only gradient — refined for text readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-[65%]"
          style={{ background: "linear-gradient(to top, rgba(10,14,25,0.55) 0%, rgba(10,14,25,0.25) 35%, rgba(10,14,25,0.0) 65%)" }}
        />

        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="container mx-auto px-6 md:px-10 lg:px-14">
            <ScrollReveal distance={6} duration={900}>
              <h1
                className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.85rem] font-display font-normal text-white leading-[1.1] tracking-[0.02em]"
                style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
              >
                A Proven Track Record
              </h1>
              <p
                className="mt-3 text-white/80 text-sm md:text-[15px] font-light tracking-wide max-w-lg leading-relaxed"
                style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
              >
                A selection of transactions across Austin's most competitive luxury markets.
              </p>
            </ScrollReveal>
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