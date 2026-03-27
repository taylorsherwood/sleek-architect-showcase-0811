import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createRealEstateListingSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";

const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));
const RealScoutSearch = lazy(() => import("@/components/RealScoutSearch"));
const Footer = lazy(() => import("@/components/Footer"));
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import gillisStreet from "@/assets/commercial-gillis-street.jpg";
import sanJoseAve from "@/assets/commercial-san-jose-ave.jpg";

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
    link: "https://www.villagovernorshill.com",
  },
];

const commercialLabelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Raleway", sans-serif',
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
];

const Listings = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Luxury Listings in Austin TX | Echelon Property Group"
        description="Current luxury listings in Austin TX. Homes for sale, investment properties, estate homes, and land opportunities across Austin's premier neighborhoods."
      />
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

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">{"\n\n\n\n"}FEATURED LISTINGS</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              Current Properties
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Each listing features a dedicated property website with professional photography, 
              video tours, and comprehensive details. Click any property to explore.
            </p>
          </div>
        </div>
      </section>

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
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-5 py-2.5">
                    <span className="text-minimal text-foreground font-semibold">
                      {listing.price}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-minimal text-gold mb-3">{listing.location}</p>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4 group-hover:text-muted-foreground transition-colors duration-300">
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

      {/* Commercial & Investment Listings */}
      <section className="py-10 md:py-14 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-gold text-center mb-4 font-bold" style={commercialLabelStyle}>COMMERCIAL & INVESTMENT</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-4">
                Current Commercial Listings
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto">
                Available commercial, land, and investment opportunities represented by Echelon Property Group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {commercialListings.map((listing, index) => (
                <div
                  key={index}
                  className="border-2 border-border overflow-hidden group bg-card hover:border-gold transition-colors duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.alt}
                      title={listing.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-4 left-4 text-minimal bg-gold text-white px-3 py-1 font-extrabold">
                      {listing.badge}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-display font-light text-foreground">
                        {listing.name}
                      </h3>
                      <span className="text-2xl font-display font-light text-foreground">{listing.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{listing.location}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-muted-foreground mb-1" style={commercialLabelStyle}>ASSET TYPE</p>
                        <p className="text-foreground font-medium text-sm">{listing.assetType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1" style={commercialLabelStyle}>UNITS</p>
                        <p className="text-foreground font-medium text-sm">{listing.units}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {listing.description}
                    </p>
                    <Link
                      to="/contact"
                      className="inline-block bg-white text-primary border border-border hover:bg-gold hover:text-white hover:border-gold px-8 py-4 transition-all duration-300 ease-out active:scale-[0.98]"
                      style={commercialLabelStyle}
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
            <h2 className="text-2xl font-display font-light text-architectural mb-6">
              Explore More
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYER SERVICES</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/land" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND & INVESTMENT PROPERTY</Link>
              <Link to="/search" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SEARCH ALL AUSTIN HOMES</Link>
              <Link to="/home-value-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ FREE HOME VALUATION</Link>
              <Link to="/listings/commercial-investment-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ COMMERCIAL & INVESTMENT</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
              <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BEST NEIGHBORHOODS IN AUSTIN</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Listings;
