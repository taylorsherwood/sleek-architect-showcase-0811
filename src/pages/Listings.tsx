import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createRealEstateListingSchema, createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";

const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));
const RealScoutSearch = lazy(() => import("@/components/RealScoutSearch"));
const Footer = lazy(() => import("@/components/Footer"));
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import gillisStreet from "@/assets/commercial-gillis-street.jpg";
import sanJoseAve from "@/assets/commercial-san-jose-ave.jpg";
import bremserAve from "@/assets/commercial-bremser-ave.jpg";
import killeenPortfolio from "@/assets/commercial-killeen-portfolio.jpg";
import s11thStreet from "@/assets/commercial-s-11th-street.webp";

const listings = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,495,000",
    beds: 4,
    baths: 4,
    sqft: "4,147",
    acres: "0.55",
    description: "Elegant villa in the heart of Barton Creek with refined finishes, open floor plan, and access to world-class amenities.",
    link: "https://www.bartoncreekvilla.com",
  },
];

const commercialLabelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const commercialCtaStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
  fontWeight: 500 as const,
};

const commercialListings = [
  {
    image: gillisStreet,
    alt: "4314 Gillis Street, Austin TX 78745 — 24-unit multifamily",
    title: "4314 Gillis Street — 24-unit multifamily investment, Austin TX",
    badge: "MULTIFAMILY",
    name: "4314 Gillis Street",
    location: "Austin, TX 78745",
    price: "$2,500,000",
    assetType: "Value-Add Multifamily",
    units: "24",
    description: "24-unit value-add multifamily opportunity in South Austin. Well-positioned for rent growth and operational improvements in a high-demand rental corridor.",
  },
  {
    image: sanJoseAve,
    alt: "10811 San Jose Ave, Del Valle TX — 3.06 acres redevelopment land",
    title: "10811 San Jose Ave — development land opportunity, Del Valle TX",
    badge: "DEVELOPMENT LAND",
    name: "10811 San Jose Ave",
    location: "Del Valle, TX",
    price: "$1,600,000",
    assetType: "Redevelopment Land",
    units: "3.06 Acres",
    description: "3.06-acre redevelopment parcel with existing mobile homes and zero zoning restrictions. Ideal for ground-up multifamily, mixed-use, or commercial development in the high-growth Del Valle corridor.",
  },
  {
    image: s11thStreet,
    alt: "717 S. 11th St, Temple TX — 6-unit multifamily",
    title: "717 S. 11th St — multifamily investment, Temple TX",
    badge: "MULTIFAMILY",
    name: "717 S. 11th St.",
    location: "Temple, TX",
    price: "Price Upon Request",
    assetType: "6-Unit Multifamily",
    units: "Recently Renovated",
    description: "Recently renovated 6-unit multifamily property in Temple, TX. Contact for pricing and additional details.",
  },
  {
    image: killeenPortfolio,
    alt: "Small Killeen Rental Portfolio — 9 rentable units, 100% occupied",
    title: "Small Killeen Rental Portfolio — rental investment, Killeen TX",
    badge: "PORTFOLIO SALE",
    name: "Small Killeen Rental Portfolio",
    location: "Killeen, TX",
    price: "$550,000",
    assetType: "Rental Portfolio",
    units: "9 Rentable Units",
    description: "9-unit rental portfolio in Killeen, TX. Fully occupied with a 14% cap rate.",
  },
  {
    image: bremserAve,
    alt: "709/711/713 Bremser Ave, Killeen TX — 3 individual rental homes",
    title: "709/711/713 Bremser Ave — rental homes, Killeen TX",
    badge: "PORTFOLIO SALE",
    name: "709/711/713 Bremser Ave",
    location: "Killeen, TX",
    price: "$240,000",
    assetType: "Single-Family Rentals",
    units: "3 Homes",
    description: "Three individual rental homes on Bremser Ave in Killeen. Each unit separately metered. Ideal for a buy-and-hold investor seeking affordable entry into the Central Texas rental market.",
  },
];

const Listings = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Listings | Echelon Property Group"
        description="Explore Listings with Echelon Property Group. View homes, market insights, and real estate opportunities in Austin, Texas."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Listings", url: "https://www.echelonpropertygroup.com/listings" }
      ])} />
      {listings.map((listing, i) => (
        <SchemaMarkup
          key={i}
          schema={createRealEstateListingSchema({
            name: listing.address,
            description: listing.description,
            image: listing.image.startsWith('http') ? listing.image : `https://www.echelonpropertygroup.com${listing.image}`,
            price: listing.price,
            url: listing.link,
          })}
        />
      ))}
      <Navigation />

      <div className="py-8 bg-background" />

      {/* Hero + Intro */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">FEATURED LISTINGS</p>
            <h1 className="text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Austin Luxury Homes
              <br />
              and Opportunities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Every property represented by Echelon Property Group reflects our commitment to quality, strategic positioning, and exceptional presentation. From luxury residences in Barton Creek and Westlake Hills to commercial investment opportunities across Central Texas, our portfolio is curated for discerning buyers and investors.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Beyond what appears on public listing portals, our team maintains access to exclusive off-market inventory through established relationships with Austin's top agents, developers, and property owners. If you don't see what you're looking for here, <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">connect with our team</Link> — the right opportunity may already be within reach.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            {listings.map((listing, index) => (
              <a
                key={index}
                href={listing.link}
                className="group grid md:grid-cols-2 gap-10 items-center"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.address}
                    title={`${listing.address} — ${listing.price}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" decoding="async"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-5 py-2.5">
                    <span className="text-minimal text-foreground font-semibold">
                      {listing.price}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-minimal text-gold mb-3">{listing.location}</p>
                  <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4 group-hover:text-muted-foreground transition-colors duration-300">
                    {listing.address}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {listing.description}
                  </p>
                  <div className="flex flex-wrap gap-8 border-t border-border pt-6">
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">BEDS</p>
                      <p className="text-lg font-display">{listing.beds}</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">BATHS</p>
                      <p className="text-lg font-display">{listing.baths}</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">SQ FT</p>
                      <p className="text-lg font-display">{listing.sqft}</p>
                    </div>
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">ACRES</p>
                      <p className="text-lg font-display">{listing.acres}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-minimal text-foreground group-hover:text-gold transition-colors duration-300">
                    VIEW PROPERTY WEBSITE →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <RealScoutListings
          listingStatus="For Sale,For Rent,In Contract"
          heading={"\n\n\n\nCURRENTLY ON THE MARKET"}
          subheading={"\n"}
        />
      </Suspense>

      {/* Beyond What You See Online */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Beyond What You See Online
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The most compelling properties in Austin's luxury market frequently trade before they ever appear on public listing portals. Echelon Property Group maintains access to a robust pipeline of off-market opportunities — estate homes, development parcels, and investment properties that are available exclusively through agent networks and private channels.
              </p>
              <p>
                Our relationships with Austin's leading luxury agents, developers, and institutional investors give our clients a meaningful advantage. Whether you are searching for a waterfront estate, a Hill Country ranch, or a value-add multifamily asset, we proactively source opportunities that align with your criteria and investment thesis. <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Learn more about our approach</Link> to client representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Austin Neighborhoods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Explore Austin Neighborhoods
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin's luxury landscape is shaped by its neighborhoods — each offering a distinct lifestyle, architectural character, and investment profile. From the gated estates of Barton Creek and Spanish Oaks to the tree-lined streets of Tarrytown and the waterfront retreats along Lake Austin, understanding the nuances of each community is essential to making a confident purchase decision.
              </p>
              <p>
                Echelon Property Group provides hyperlocal expertise across every premier Austin neighborhood. <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Explore our community guides</Link> for detailed insights on schools, amenities, market trends, and available inventory in the areas that matter most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial & Investment Listings */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-gold text-center mb-4 font-bold" style={commercialLabelStyle}>COMMERCIAL & INVESTMENT</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-4">
                Current Commercial Listings
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto">
                Available commercial, land, and investment opportunities represented by Echelon Property Group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialListings.map((listing, index) => (
                <div
                  key={index}
                  className="border border-border/60 overflow-hidden group bg-card hover:border-gold hover:shadow-[0_0_0_1px_hsl(var(--gold))] transition-colors duration-500 flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.alt}
                      title={listing.title}
                      className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                      {listing.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 text-white text-sm font-light  bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">{listing.price}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-light text-foreground mb-1 ">
                      {listing.name}
                    </h3>
                    <p className="text-muted-foreground mb-2 ">{listing.location}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-muted-foreground mb-1" style={commercialLabelStyle}>ASSET TYPE</p>
                        <p className="text-foreground font-medium text-sm ">{listing.assetType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1" style={commercialLabelStyle}>UNITS</p>
                        <p className="text-foreground font-medium text-sm ">{listing.units}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed  mb-4 flex-grow">
                      {listing.description}
                    </p>
                    <Link
                      to="/contact"
                      className="border border-border/50 rounded-sm px-6 py-2 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 ease-out self-center"
                      style={commercialCtaStyle}
                    >
                      REQUEST INFORMATION
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Next Chapter search block */}
      <Suspense fallback={<div className="min-h-[200px]" />}><RealScoutSearch /></Suspense>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-normal text-architectural mb-6">
              Explore More
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ABOUT ECHELON</Link>
              <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CONTACT US</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & INSIGHTS</Link>
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYER SERVICES</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/land" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND & INVESTMENT PROPERTY</Link>
              <Link to="/search" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SEARCH ALL AUSTIN HOMES</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default Listings;
