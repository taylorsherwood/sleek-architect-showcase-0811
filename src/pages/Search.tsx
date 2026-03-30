import { lazy, Suspense, useMemo } from "react";
import AboutBlock from "@/components/AboutBlock";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";
import { Link, useSearchParams } from "react-router-dom";
import gillisStreet from "@/assets/commercial-gillis-street.jpg";
import sanJoseAve from "@/assets/commercial-san-jose-ave.jpg";
import bremserAve from "@/assets/commercial-bremser-ave.jpg";
import killeenPortfolio from "@/assets/commercial-killeen-portfolio.jpg";
import s11thStreet from "@/assets/commercial-s-11th-street.webp";

const LOCATION_LABELS: Record<string, string> = {
  "westlake-hills": "Westlake Hills",
  "barton-creek": "Barton Creek",
  "lake-austin": "Lake Austin",
  "tarrytown": "Tarrytown",
  "rollingwood": "Rollingwood",
  "spanish-oaks": "Spanish Oaks",
  "downtown-austin": "Downtown Austin",
};

const PRICE_LABELS: Record<string, string> = {
  "500k-1m": "$500K – $1M",
  "1m-2m": "$1M – $2M",
  "2m-5m": "$2M – $5M",
  "5m-10m": "$5M – $10M",
  "10m+": "$10M+",
};

const searchFaqs = [
  { question: "How do I search for homes in Austin Texas?", answer: "Use our integrated listing search above to browse all available homes in Austin. Filter by price, neighborhood, property type, and features. For off-market opportunities not shown on the MLS, contact Echelon Property Group directly." },
  { question: "What types of properties can I find in Austin?", answer: "Austin offers luxury single-family homes, waterfront estates, downtown condos, Hill Country ranches, new construction, investment properties, and development land. Our search includes properties across all Austin neighborhoods and price points." },
  { question: "Are there off-market homes available in Austin?", answer: "Yes. Many of Austin's finest properties trade privately through agent networks before appearing on public listing sites. Echelon Property Group provides qualified buyers with access to exclusive off-market inventory." },
  { question: "What neighborhoods should I search in Austin?", answer: "Austin's premier neighborhoods include Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, and Dripping Springs. Each offers a unique lifestyle, price range, and investment profile." },
];

const Footer = lazy(() => import("@/components/Footer"));
const RealScoutSearch = lazy(() => import("@/components/RealScoutSearch"));
const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const price = searchParams.get("price") || "";
  const beds = searchParams.get("beds") || "";

  const filterSummary = useMemo(() => {
    const parts: string[] = [];
    if (location && LOCATION_LABELS[location]) parts.push(LOCATION_LABELS[location]);
    if (price && PRICE_LABELS[price]) parts.push(PRICE_LABELS[price]);
    if (beds) parts.push(`${beds}+ Beds`);
    return parts.length > 0 ? parts.join(" · ") : null;
  }, [location, price, beds]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Search Austin Homes for Sale | Echelon Property Group"
        description="Search all Austin homes for sale. Browse luxury homes, condos, land, and investment properties across Austin's most desirable neighborhoods."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(searchFaqs)} />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background:
            "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 14%) 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <p
              className="text-minimal mb-6"
              style={{ color: "hsl(var(--gold-light))" }}
            >
              AUSTIN REAL ESTATE
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-normal text-architectural mb-6 text-warm-cream">
              Search All <span className="italic">Listings</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-cream/70 max-w-2xl mx-auto font-light">
              Explore every available home across Austin — from luxury estates
              to condos, new construction, and investment opportunities.
            </p>
            {filterSummary && (
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-warm-cream/20 text-warm-cream/80 text-sm font-light">
                <span>Filtering:</span>
                <span className="text-gold font-medium">{filterSummary}</span>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* RealScout Search Widget */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <Suspense
              fallback={
                <div className="min-h-[120px] flex items-center justify-center text-muted-foreground">
                  Loading search…
                </div>
              }
            >
              <RealScoutSearch />
            </Suspense>
          </ScrollReveal>
        </div>
      </section>

      {/* Listings widget */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <Suspense
              fallback={
                <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                  Loading listings…
                </div>
              }
            >
              <RealScoutListings
                listingStatus="For Sale,In Contract"
                heading="ECHELON LISTINGS"
                subheading="ON MARKET"
              />
            </Suspense>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SEO Content ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
              Search Austin Real Estate Listings
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin's real estate market spans an extraordinary range of properties — from contemporary Hill Country estates and Lake Austin waterfront homes to downtown high-rise penthouses and sprawling ranch land. Whether you're searching for a luxury primary residence, an investment property, or land for development, our comprehensive search covers every available listing across greater Austin.
              </p>
              <p>
                Echelon Property Group provides expert guidance for buyers navigating Austin's competitive market. Beyond public listings, we maintain access to off-market properties and private opportunities through our brokerage network. Work with Taylor Sherwood for personalized property recommendations tailored to your goals, timeline, and budget.
              </p>
            </div>

            <h3 className="text-2xl font-display font-normal text-architectural mt-10 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {searchFaqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h4 className="text-lg font-medium text-foreground mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-display font-normal text-architectural mt-10 mb-6">
              Explore Austin Real Estate
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYER SERVICES</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ALL COMMUNITIES</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
              <Link to="/past-transactions" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PAST TRANSACTIONS</Link>
              <Link to="/austin-luxury-homes-for-sale" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY HOMES</Link>
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

export default SearchPage;
