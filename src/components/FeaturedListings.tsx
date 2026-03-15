import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  isOffMarketCard: false
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
  isOffMarketCard: true
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
  isOffMarketCard: false
}];


const FeaturedListings = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    const el = document.createElement("realscout-your-listings");
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    el.setAttribute("sort-order", "PRICE_HIGH");
    el.setAttribute("listing-status", "For Sale,For Rent,In Contract");
    el.setAttribute("property-types", "SFR,MF,TC,LAL,MOBILE,OTHER");
    el.setAttribute("price-min", "300000");
    el.setAttribute("include-co-listings", "");
    el.setAttribute("include-seller-listings", "");
    widgetRef.current.appendChild(el);

    return () => {
      if (widgetRef.current && el.parentNode === widgetRef.current) {
        widgetRef.current.removeChild(el);
      }
    };
  }, []);

  return (
    <>
      <section className="pt-24 pb-0 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 -mt-8">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">



FEATURED LISTINGS</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                  Featured Austin Luxury Properties
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Explore the caliber of luxury properties available across
                  Austin, including select private and off-market opportunities.
                </p>
              </div>
              <Link to="/austin-luxury-homes-for-sale" className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 relative group shrink-0">
                
                EXPLORE AUSTIN LUXURY HOMES
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {listings.map((listing, index) => {
                if (listing.isOffMarketCard) {
                  return (
                    <Link key={index} to={listing.link} className="group block">
                      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-primary via-primary to-primary/80 flex flex-col items-center justify-center transition-all duration-700 ease-in-out group-hover:from-gold group-hover:via-gold group-hover:to-gold/80">
                        <img
                          src={echelonLogo}
                          alt="Echelon Property Group"
                          title="Echelon Property Group — View exclusive listings"
                          className="w-1/2 h-auto object-contain transition-all duration-300 ease-out group-hover:brightness-0 group-hover:invert"
                          loading="lazy" />
                      </div>
                      <div className="mt-7 px-1 text-center">
                        <h3 className="text-lg font-display font-medium mb-2 leading-relaxed group-hover:text-muted-foreground transition-colors duration-300">
                          {listing.address}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Exclusive private listings and investment opportunities not publicly advertised. →
                        </p>
                      </div>
                    </Link>);

                }

                const Wrapper = listing.link.startsWith("http") ? "a" : "div";
                const wrapperProps = listing.link.startsWith("http") ?
                {
                  href: listing.link,
                  target: "_blank" as const,
                  rel: "noopener noreferrer"
                } :
                {};

                return (
                  <Wrapper
                    key={index}
                    {...wrapperProps}
                    className="group block">
                    
                    {/* Image with overlay details */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={listing.image}
                        alt={listing.address}
                        title={`${listing.address} — ${listing.price}`}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy" />
                      
                      {/* Gradient overlay — concentrated at bottom-left for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr from-black/50 via-black/20 to-transparent pointer-events-none" />

                      {/* View Property CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-minimal text-white border border-gold/40 px-8 py-3 rounded-full backdrop-blur-md bg-white/10 tracking-[0.15em]">
                          View Property
                        </span>
                      </div>

                      {/* Price & address on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 0 24px rgba(0,0,0,0.25)' }}>
                        <p className="text-2xl font-display font-light text-white mb-2 tracking-wide">
                          {listing.price}
                        </p>
                        <p className="text-white/95 text-sm font-normal">
                          {listing.address}
                        </p>
                        <p className="text-white/75 text-sm font-light">
                          {listing.location}
                        </p>
                      </div>

                      {/* Badge */}
                      {listing.badgeLabel &&
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                            {listing.badgeLabel}
                          </span>
                        </div>
                      }
                    </div>

                    {/* Specs row below image */}
                    <div className="mt-2 px-1">
                      <div className="flex gap-3 text-sm text-muted-foreground py-3 items-center">
                        <span>{listing.beds} Beds</span>
                        <span className="text-foreground/50 text-base">•</span>
                        <span>{listing.baths} Baths</span>
                        <span className="text-foreground/50 text-base">•</span>
                        <span>{listing.sqft} Sq Ft</span>
                      </div>
                    </div>
                  </Wrapper>);

              })}
            </div>

            <div className="mt-12 mb-8 text-center">
              <Link
                to="/off-market-luxury-homes-austin"
                className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                
                Searching for private market opportunities in Austin? Contact us to become an Echelon Insider
                for discreet listings not publicly advertised.{" "}
                <span className="underline">
                  Ask about off-market opportunities
                </span>{" "}
                →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">
              CURRENTLY ON THE MARKET
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-12">
              Commercial and Residential Listings
            </h2>
            <div ref={widgetRef} className="w-full" />
            <div className="mt-12 text-center">
              <Link
                to="/past-transactions"
                className="inline-block px-8 py-4 border border-border text-minimal text-muted-foreground hover:text-primary-foreground hover:bg-gold hover:border-gold transition-all duration-300">
                
                SEE PAST TRANSACTIONS →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>);

};

export default FeaturedListings;