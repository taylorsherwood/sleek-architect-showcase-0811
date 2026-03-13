import { Link } from "react-router-dom";
import listing1 from "@/assets/listing-1.jpg";
import listing3 from "@/assets/listing-3.jpg";
import echelonLogo from "@/assets/echelon-logo-gold-square.png";

const listings = [
{
  image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
  address: "2300 Barton Creek Boulevard #15",
  location: "Barton Creek, Austin",
  price: "$3,750,000",
  beds: 4,
  baths: 4,
  sqft: "4,147",
  link: "https://www.villagovernorshill.com",
  badgeLabel: "Private Listing",
  isOffMarketCard: false,
},
{
  image: "",
  address: "Access Off-Market Opportunities",
  location: "",
  price: "",
  beds: 0,
  baths: 0,
  sqft: "",
  link: "/off-market-luxury-homes-austin",
  badgeLabel: "",
  isOffMarketCard: true,
},
{
  image: listing3,
  address: "Ranch Estate on 42 Acres",
  location: "Texas Hill Country",
  price: "$5M+ Hill Country Estate",
  beds: 4,
  baths: 5,
  sqft: "5,800",
  link: "#",
  badgeLabel: "Private Market Opportunity",
  isOffMarketCard: false,
}];


const FeaturedListings = () => {
  return (
    <section className="pt-12 pb-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">FEATURED LISTINGS</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                Featured Austin Luxury Properties
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl">
                Explore the caliber of luxury properties available across Austin, including select private and off-market opportunities.
              </p>
            </div>
            <Link
              to="/austin-luxury-homes-for-sale"
              className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 relative group shrink-0">
              
              EXPLORE AUSTIN LUXURY HOMES
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {listings.map((listing, index) => {
              if (listing.isOffMarketCard) {
                return (
                  <Link
                    key={index}
                    to={listing.link}
                    className="group block">
                    <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-primary flex items-center justify-center transition-colors duration-500 group-hover:bg-gold">
                      <img
                        src={echelonLogo}
                        alt="Echelon Property Group"
                        className="w-3/5 h-auto object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-display font-medium mb-1 group-hover:text-muted-foreground transition-colors duration-300">
                      {listing.address}
                    </h3>
                    <p className="text-minimal text-muted-foreground mb-4">
                      Exclusive private listings →
                    </p>
                  </Link>
                );
              }

              const Wrapper = listing.link.startsWith("http") ? "a" : "div";
              const wrapperProps = listing.link.startsWith("http")
                ? { href: listing.link, target: "_blank" as const, rel: "noopener noreferrer" }
                : {};

              return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className="group block">
                  
                    <div className="relative overflow-hidden mb-6">
                      <img
                      src={listing.image}
                      alt={listing.address}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy" />
                    
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                        <span className="text-minimal text-foreground font-semibold">
                          {listing.price}
                        </span>
                      </div>

                      {listing.badgeLabel && (
                        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5">
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                            {listing.badgeLabel}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-medium mb-1 group-hover:text-muted-foreground transition-colors duration-300">
                      {listing.address}
                    </h3>
                    <p className="text-minimal text-muted-foreground mb-4">
                      {listing.location}
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                      <span>{listing.sqft} Sq Ft</span>
                    </div>
                  </Wrapper>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/off-market-luxury-homes-austin"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Searching for private market opportunities in Austin? Contact us for discreet listings not publicly advertised.{" "}
              <span className="underline">Ask about off-market opportunities</span> →
            </Link>
          </div>
        </div>
      </div>
    </section>);

};

export default FeaturedListings;