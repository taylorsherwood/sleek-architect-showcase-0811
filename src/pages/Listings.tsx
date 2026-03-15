import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RealScoutListings from "@/components/RealScoutListings";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createProductSchema } from "@/components/SchemaMarkup";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

const listings = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,750,000",
    beds: 4,
    baths: 4,
    sqft: "4,147",
    acres: "",
    description: "Elegant villa in the heart of Barton Creek with refined finishes, open floor plan, and access to world-class amenities.",
    link: "https://www.villagovernorshill.com",
  },
];

const Listings = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Luxury Listings Austin TX | Echelon Property Group Austin"
        description="View current luxury listings from Echelon Property Group. Austin homes for sale, investment properties, estate homes, and land opportunities across Austin's premier neighborhoods."
      />
      {listings.map((listing, i) => (
        <SchemaMarkup
          key={i}
          schema={createProductSchema({
            name: listing.address,
            description: listing.description,
            image: listing.image.startsWith('http') ? listing.image : `https://www.echelonpropertygroup.com${listing.image}`,
            price: listing.price,
            url: listing.link,
          })}
        />
      ))}
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4">FEATURED LISTINGS</p>
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

      {/* ── SEO Content: Austin Listings Overview ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
              Austin Luxury Real Estate Listings
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin's luxury real estate market offers an extraordinary range of properties — from contemporary Hill Country estates and Lake Austin waterfront homes to downtown high-rise penthouses and sprawling ranch land. At Echelon Property Group, we curate listings that represent the best of Austin living, whether you're searching for a primary residence, a second home, or a strategic investment property.
              </p>
              <p>
                Our featured listings include both on-market and private market opportunities across Austin's most coveted neighborhoods. Properties in Westlake Hills, Barton Creek, Tarrytown, Rollingwood, and the Texas Hill Country are among the most sought-after addresses in Central Texas, offering privacy, natural beauty, and proximity to Austin's world-class dining, entertainment, and cultural scene.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Market Insights for Austin Home Buyers
              </h3>
              <p>
                Austin's luxury segment — generally defined as homes priced above $1 million — continues to benefit from strong fundamentals. The metro area's expanding tech economy, led by employers including Apple, Tesla, Google, Meta, and Oracle, drives sustained demand for premium housing. Texas's lack of state income tax further enhances Austin's appeal for high-income buyers relocating from coastal markets.
              </p>
              <p>
                Inventory in Austin's top neighborhoods remains limited, particularly for move-in-ready estates in supply-constrained areas like Lake Austin waterfront and Barton Creek. This creates opportunities for buyers who act decisively and work with an agent who has access to off-market inventory and private listing networks.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Why Browse Listings With Echelon Property Group
              </h3>
              <p>
                Not every luxury property in Austin appears on public listing sites. Many of the finest homes are sold privately through agent networks and direct relationships. As a Certified Luxury Home Marketing Specialist, Taylor Sherwood maintains connections across Austin's luxury brokerage community, providing clients with early access to properties before they hit the open market.
              </p>
              <p>
                Every property we represent receives premium marketing — professional photography, cinematic video tours, drone footage, custom property websites, and targeted digital campaigns. When you browse our listings, you're seeing properties presented at the highest standard, with comprehensive details and media designed to help you evaluate opportunities from anywhere in the world.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Buying Tips for Austin Luxury Real Estate
              </h3>
              <p>
                When evaluating luxury listings in Austin, consider key factors beyond the property itself: school district enrollment (Eanes ISD vs. Austin ISD), flood zone status, HOA restrictions, and future development plans in the surrounding area. Properties in gated communities like Barton Creek and Spanish Oaks offer resort-style amenities and security, while neighborhoods like Tarrytown and Travis Heights provide walkability and urban convenience.
              </p>
              <p>
                Working with an experienced luxury agent ensures you receive accurate pricing context, off-market comparables, and negotiation expertise that protects your investment. Whether you're a first-time luxury buyer or an experienced investor, our team provides the insight and representation you need to make confident decisions in Austin's competitive market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RealScoutListings
        listingStatus="For Sale,For Rent,In Contract"
        heading="CURRENTLY ON THE MARKET"
        subheading="Commercial and Residential Listings"
      />

      <Footer />
    </div>
  );
};

export default Listings;
