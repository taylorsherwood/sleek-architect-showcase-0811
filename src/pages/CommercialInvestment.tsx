import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema } from "@/components/SchemaMarkup";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import gillisStreet from "@/assets/commercial-gillis-street.jpg";
import sanJoseAve from "@/assets/commercial-san-jose-ave.jpg";

const faqs = [
  {
    question: "What types of commercial investment properties are available in Austin?",
    answer: "Austin offers a wide range of commercial investment opportunities including multifamily apartment complexes, retail centers, Class A and B office buildings, industrial and logistics facilities, mixed-use developments, and development land across the metro's high-growth corridors."
  },
  {
    question: "What cap rates should I expect for Austin investment properties?",
    answer: "Cap rates in Austin vary by asset class. Multifamily properties typically trade at 4.5–5.5%, Class A office at 5.0–6.5%, suburban retail at 5.5–7.0%, and industrial at 5.0–6.0%. Value-add opportunities may offer higher cap rates with NOI improvement potential."
  },
  {
    question: "Is Austin a good market for commercial real estate investment?",
    answer: "Yes. Austin consistently ranks among the top U.S. metros for commercial investment thanks to robust population growth, an expanding tech economy, no state income tax, and strong in-migration trends that drive sustained demand across all asset classes."
  },
  {
    question: "Does Echelon Property Group work with out-of-state investors?",
    answer: "Absolutely. We provide comprehensive market orientation, submarket analysis, property tours, and end-to-end transaction management for out-of-state and international investors seeking Austin commercial and investment real estate."
  },
];

const CommercialInvestment = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Commercial Investment Property | Echelon Property Group"
        description="Explore Austin commercial real estate and investment properties. Multifamily, retail, office, land development, and income-producing opportunities across the Austin metro. Expert advisory from Echelon Property Group."
      />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={heroArchitecture}
            alt="Austin commercial real estate skyline"
            title="Austin commercial real estate — Echelon Property Group"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto py-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">COMMERCIAL & INVESTMENT</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-warm-cream mb-8">
              Austin Commercial & Investment Real Estate
            </h1>
            <p className="text-xl text-warm-cream/80 max-w-3xl">
              Multifamily, retail, office, land development, and income-producing investment
              opportunities across the Austin metro.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-gold text-foreground hover:bg-gold-light px-8 py-4 transition-colors duration-300"
              >
                DISCUSS AN ACQUISITION
              </Link>
              <a
                href="#featured-listings"
                className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300"
              >
                VIEW OPPORTUNITIES
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Current Commercial Listings */}
      <section id="featured-listings" className="py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">CURRENT INVENTORY</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Current Commercial Listings
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Available commercial, land, and investment opportunities represented by Echelon Property Group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-border overflow-hidden hover:border-foreground transition-colors duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={gillisStreet}
                    alt="4314 Gillis Street, Austin TX 78745 — 24-unit multifamily"
                    title="4314 Gillis Street — 24-unit multifamily investment, Austin TX"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-foreground px-3 py-1 font-extrabold">
                    MULTIFAMILY
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-light text-architectural">
                      4314 Gillis Street
                    </h3>
                    <span className="text-2xl font-display font-light text-architectural">$2,500,000</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Austin, TX 78745</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">ASSET TYPE</p>
                      <p className="text-foreground font-medium">Value-Add Multifamily</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">UNITS</p>
                      <p className="text-foreground font-medium">24</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    24-unit value-add multifamily opportunity in South Austin. Well-positioned for rent growth and operational improvements in a high-demand rental corridor.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 transition-colors duration-300"
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>
              <div className="border border-border overflow-hidden hover:border-foreground transition-colors duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={sanJoseAve}
                    alt="10811 San Jose Ave, Del Valle TX — 3.06 acres redevelopment land"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 text-minimal bg-gold text-foreground px-3 py-1 font-extrabold">
                    DEVELOPMENT LAND
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-light text-architectural">
                      10811 San Jose Ave
                    </h3>
                    <span className="text-2xl font-display font-light text-architectural">$1,600,000</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Del Valle, TX</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">ASSET TYPE</p>
                      <p className="text-foreground font-medium">Redevelopment Land</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">LOT SIZE</p>
                      <p className="text-foreground font-medium">3.06 Acres</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    3.06-acre redevelopment parcel with existing mobile homes and zero zoning restrictions. Ideal for ground-up multifamily, mixed-use, or commercial development in the high-growth Del Valle corridor.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 transition-colors duration-300"
                  >
                    REQUEST INFORMATION
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Market Opportunities */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">PRIVATE MARKET</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Private Market Opportunities
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Select off-market and discreetly marketed opportunities may be available upon request.
                These properties are not publicly advertised and are shared exclusively with qualified buyers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  type: "Multifamily",
                  name: "24-Unit Value-Add Complex",
                  location: "East Riverside, Austin",
                  price: "$4,200,000",
                  capRate: "5.8%",
                  sqft: "18,400",
                  highlights: "Strong rent growth corridor, proximity to Oracle HQ"
                },
                {
                  type: "Retail Center",
                  name: "Anchored Neighborhood Center",
                  location: "Cedar Park, TX",
                  price: "$6,750,000",
                  capRate: "6.2%",
                  sqft: "32,000",
                  highlights: "95% occupied, NNN leases, high-growth suburban submarket"
                },
                {
                  type: "Development Land",
                  name: "Mixed-Use Entitled Parcel",
                  location: "I-35 Corridor, Austin",
                  price: "$2,850,000",
                  capRate: "—",
                  sqft: "3.2 Acres",
                  highlights: "Entitled for 120 residential units + 8,000 SF retail"
                },
                {
                  type: "Office",
                  name: "Class B+ Creative Office",
                  location: "East Austin",
                  price: "$3,400,000",
                  capRate: "6.8%",
                  sqft: "14,200",
                  highlights: "Value-add opportunity, emerging tech corridor"
                },
              ].map((listing, index) => (
                <div
                  key={index}
                  className="border border-border p-8 hover:border-foreground transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-minimal bg-muted px-3 py-1 text-foreground">{listing.type}</span>
                    <span className="text-2xl font-display font-light text-architectural">{listing.price}</span>
                  </div>
                  <h3 className="text-xl font-display font-light text-architectural mb-2">
                    {listing.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{listing.location}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">CAP RATE</p>
                      <p className="text-foreground font-medium">{listing.capRate}</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">SIZE</p>
                      <p className="text-foreground font-medium">{listing.sqft}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{listing.highlights}</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      to="/contact"
                      className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      REQUEST DETAILS →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Search */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">INVESTMENT SEARCH</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                  Find Your Next Austin Investment Property
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Whether you're targeting multifamily acquisitions, NNN retail, value-add office,
                  or development land, our team provides institutional-grade deal sourcing and
                  underwriting for individual and portfolio-level investors.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Multifamily & apartment complexes",
                    "Retail & restaurant NNN investments",
                    "Office & creative workspace",
                    "Industrial & logistics facilities",
                    "Development land & entitled parcels",
                    "Mixed-use & build-to-rent projects"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-foreground">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 transition-colors duration-300"
                >
                  SHARE YOUR INVESTMENT CRITERIA
                </Link>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Assets Under Advisory", value: "$85M+" },
                  { label: "Average Cap Rate (Multifamily)", value: "5.2%" },
                  { label: "Active Austin Submarkets", value: "12+" },
                  { label: "Investor Clients Served", value: "50+" }
                ].map((stat, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <p className="text-minimal text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl md:text-4xl font-display font-light text-architectural">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Austin Investment Market Overview */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">MARKET OVERVIEW</p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-12">
              Austin Investment Market Insights
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-display font-light text-architectural mb-4">
                  Why Austin for Commercial Investment
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Austin has emerged as one of America's premier commercial real estate markets, driven by
                  explosive population growth, major corporate relocations from Apple, Tesla, Google, Meta,
                  and Oracle, and a business-friendly tax environment with no state income tax. The metro
                  area has added over 300,000 residents in the past five years, creating sustained demand
                  across every commercial asset class.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For investors, Austin offers compelling risk-adjusted returns relative to coastal gateway
                  markets. Cap rates remain attractive, rent growth continues to outpace national averages
                  in key submarkets, and the metro's diversifying economy reduces concentration risk that
                  historically challenged single-industry cities.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-light text-architectural mb-4">
                  Austin Multifamily Investment Landscape
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Multifamily remains Austin's most active commercial investment sector. Strong job growth,
                  elevated mortgage rates sustaining rental demand, and Austin's quality-of-life appeal
                  create a favorable environment for apartment investors. Suburban corridors including
                  Cedar Park, Pflugerville, Round Rock, and Kyle/Buda offer the strongest rent growth
                  trajectories for value-add and ground-up development strategies.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-light text-architectural mb-4">
                  Emerging Opportunity Zones
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  East Austin continues its transformation as the city's most dynamic development corridor.
                  The I-35 expansion project is reshaping adjacent land values and accessibility. Southeast
                  Austin, anchored by Tesla's Gigafactory and Samsung's semiconductor campus, represents one
                  of the metro's highest-growth commercial corridors. Echelon Property Group helps investors
                  identify and capitalize on these evolving submarkets before institutional capital fully
                  prices in the opportunity.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">GET STARTED</p>
            <h2 className="text-4xl md:text-6xl font-display font-light text-architectural mb-6">
              Looking for a Commercial Acquisition?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Share your criteria for multifamily, retail, office, land, or value-add investments
              in Austin and surrounding markets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300"
              >
                SHARE INVESTMENT CRITERIA
              </Link>
              <Link
                to="/contact"
                className="inline-block text-minimal border border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-4 transition-colors duration-300"
              >
                CONTACT TAYLOR SHERWOOD
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialInvestment;
