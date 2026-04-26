import { lazy, Suspense, useMemo } from "react";
import AboutBlock from "@/components/AboutBlock";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";
import { Link, useSearchParams } from "react-router-dom";
import heroSearchImg from "@/assets/hero-search-austin.jpg";
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
const Testimonials = lazy(() => import("@/components/Testimonials"));

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
        noindex
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Search Homes", url: "https://www.echelonpropertygroup.com/search" },
      ])} />
      <SchemaMarkup schema={createFAQSchema(searchFaqs)} />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src={heroSearchImg}
            alt="Modern luxury Austin home with floor-to-ceiling glass and architectural concrete"
            title="Search Austin homes for sale"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-24 md:pt-32 lg:pt-36">
          <div className="max-w-xl">
            <p className="text-minimal text-gold mb-4 reveal">AUSTIN REAL ESTATE</p>
            <h1 className="text-3xl sm:text-2xl sm:text-4xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6 reveal">
              Search All
              <br />
              Listings
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Explore every available home across Austin — from luxury estates to condos, new construction, and investment opportunities.
            </p>
            {filterSummary && (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-warm-cream/20 text-warm-cream/80 text-sm font-light reveal-delayed-2">
                <span>Filtering:</span>
                <span className="text-gold font-medium">{filterSummary}</span>
              </div>
            )}
          </div>
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

      {/* ── Off-Market Access CTA ── */}
      <section
        className="relative py-20 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 14%) 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div style={{ width: 40, borderTop: "1px solid hsl(var(--gold))" }} />
              </div>
              <p
                className="mb-5"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "hsl(var(--gold))",
                  fontWeight: 600,
                }}
              >
                PRIVATE INVENTORY
              </p>
              <h2
                className="font-display font-normal text-warm-cream mb-5"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                Looking for something you won't find here?
              </h2>
              <p
                className="mx-auto mb-9"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "16px",
                  color: "rgba(245, 243, 239, 0.78)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.8,
                  maxWidth: "640px",
                }}
              >
                More than 95% of the homes we transact never appear on the
                MLS. Request access to our private inventory of off-market
                Austin properties — quietly available to qualified buyers
                through Echelon Property Group.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/off-market-real-estate-austin"
                  className="inline-block border border-gold bg-gold text-primary-foreground hover:bg-white hover:text-gold hover:border-white px-10 py-4 transition-all duration-500"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Request Off-Market Access
                </Link>
                <Link
                  to="/contact"
                  className="inline-block text-warm-cream/70 hover:text-warm-cream transition-colors duration-500 relative group"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Speak With An Advisor
                  <span className="absolute bottom-[-4px] left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </div>
              <p
                className="mt-8 text-warm-cream/50"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  fontWeight: 300,
                }}
              >
                Discreet · Vetted Buyers Only · No Obligation
              </p>
            </div>
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

      {/* ── Current Commercial Listings ── */}
      <section className="py-6 md:py-10 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-gold text-center mb-4 font-bold" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>CURRENT INVENTORY</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-4">
                Current Commercial Listings
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto">
                Available commercial, land, and investment opportunities represented by Echelon Property Group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gillis Street */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={gillisStreet} alt="4314 Gillis Street, Austin TX 78745 — 24-unit multifamily" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">MULTIFAMILY</span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$2,500,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">4314 Gillis Street</h3>
                  <p className="text-muted-foreground mb-2 ">Austin, TX 78745</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">Value-Add Multifamily</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">24</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">24-unit value-add multifamily opportunity in South Austin. Well-positioned for rent growth and operational improvements in a high-demand rental corridor.</p>
                  <Link to="/contact" className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>REQUEST INFORMATION</Link>
                </div>
              </div>

              {/* San Jose Ave */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={sanJoseAve} alt="10811 San Jose Ave, Del Valle TX — 3.06 acres redevelopment land" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">DEVELOPMENT LAND</span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$1,600,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">10811 San Jose Ave</h3>
                  <p className="text-muted-foreground mb-2 ">Del Valle, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">Redevelopment Land</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">3.06 Acres</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">3.06-acre redevelopment parcel with existing mobile homes and zero zoning restrictions. Ideal for ground-up multifamily, mixed-use, or commercial development in the high-growth Del Valle corridor.</p>
                  <Link to="/contact" className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>REQUEST INFORMATION</Link>
                </div>
              </div>

              {/* 717 S. 11th St */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={s11thStreet} alt="717 S. 11th St, Temple TX — 6-unit multifamily" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">MULTIFAMILY</span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">Price Upon Request</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">717 S. 11th St.</h3>
                  <p className="text-muted-foreground mb-2 ">Temple, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">6-Unit Multifamily</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>CONDITION</p>
                      <p className="text-foreground font-medium text-sm ">Recently Renovated</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">Recently renovated 6-unit multifamily property in Temple, TX. Contact for pricing and additional details.</p>
                  <Link to="/contact" className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>REQUEST INFORMATION</Link>
                </div>
              </div>

              {/* Small Killeen Rental Portfolio */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={killeenPortfolio} alt="Small Killeen Rental Portfolio — 9 rentable units, 100% occupied" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">RENTAL PORTFOLIO</span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$550,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">Small Killeen Rental Portfolio</h3>
                  <p className="text-muted-foreground mb-2 ">Killeen, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>UNITS</p>
                      <p className="text-foreground font-medium text-sm ">9 Rentable Units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>OCCUPANCY</p>
                      <p className="text-foreground font-medium text-sm ">100% Occupied</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">9-unit rental portfolio in Killeen, TX. Fully occupied with a 14% cap rate.</p>
                  <Link to="/contact" className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>REQUEST INFORMATION</Link>
                </div>
              </div>

              {/* 709/711/713 Bremser Ave */}
              <div className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={bremserAve} alt="709/711/713 Bremser Ave, Killeen TX — 3 individual rental homes" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">RENTAL PORTFOLIO</span>
                  <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">$240,000</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-light text-foreground mb-1 ">709/711/713 Bremser Ave</h3>
                  <p className="text-muted-foreground mb-2 ">Killeen, TX</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>ASSET TYPE</p>
                      <p className="text-foreground font-medium text-sm ">3 Individual Homes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>INCOME</p>
                      <p className="text-foreground font-medium text-sm ">Rental Income</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">Three individual rental homes on Bremser Ave in Killeen, TX. Opportunity to acquire a small residential rental portfolio.</p>
                  <Link to="/contact" className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>REQUEST INFORMATION</Link>
                </div>
              </div>
            </div>
          </div>
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

            <Suspense fallback={<div className="min-h-[200px]" />}>
              <Testimonials />
            </Suspense>

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
