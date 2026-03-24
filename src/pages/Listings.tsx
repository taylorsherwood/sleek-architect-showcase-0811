import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RealScoutListings from "@/components/RealScoutListings";
import RealScoutSearch from "@/components/RealScoutSearch";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createRealEstateListingSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

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

const Listings = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Luxury Listings in Austin TX | Echelon Property Group"
        description="View current luxury listings from Echelon Property Group. Austin homes for sale, investment properties, estate homes, and land opportunities across Austin's premier neighborhoods."
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

      <RealScoutListings
        listingStatus="For Sale,For Rent,In Contract"
        heading={"\n\n\n\nCURRENTLY ON THE MARKET"}
        subheading="Current Echelon Properties"
      />

      {/* Find Your Next Chapter search block */}
      <RealScoutSearch />




      <Footer />
    </div>
  );
};

export default Listings;
