import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface FeaturedListingsProps {
  hideRealScout?: boolean;
}

const listings = [
{
  image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.webp",
  address: "2300 Barton Creek Boulevard #15",
  location: "Barton Creek, Austin",
  price: "$3,495,000",
  beds: 4,
  baths: 4,
  sqft: "4,147",
  link: "https://www.bartoncreekvilla.com",
  badgeLabel: "LUXE LISTING",
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
  link: "/off-market-real-estate-austin",
  badgeLabel: "",
  isOffMarketCard: true
},
{
  image: "/static-assets/listing-3.webp",
  address: "Ranch Estate on 42 Acres",
  location: "Texas Hill Country",
  price: "$5M+ Hill Country Estate",
  beds: 4,
  baths: 5,
  sqft: "5,800",
  link: "#",
  badgeLabel: "Luxury Listing",
  isOffMarketCard: false
}];


const ListingCard = ({
  listing
}: {listing: (typeof listings)[number];}) => {
  if (listing.isOffMarketCard) {
    return (
      <Link to={listing.link} className="group block">
        <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-gradient-to-br from-primary via-primary to-primary/80 flex flex-col items-center justify-center">
          <img
            src="/static-assets/echelon-logo-gold-square.webp"
            alt="Echelon Property Group"
            title="Echelon Property Group — View exclusive listings"
            className="w-1/2 h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async" />
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <span
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2.5 rounded-lg font-medium"
              style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
              View Property
            </span>
          </div>
        </div>
        <div className="mt-8 px-1 text-center">
          <h3 className="text-lg font-display font-medium mb-2 leading-relaxed group-hover:text-muted-foreground transition-colors duration-500">
            {listing.address}
          </h3>
          <p className="text-[13px] text-muted-foreground/70 leading-relaxed font-light">
            Exclusive luxury listings and investment opportunities not publicly
            advertised. →
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
    <Wrapper {...wrapperProps} className="group block">
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={listing.image}
          alt={listing.address}
          title={`${listing.address} — ${listing.price}`}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr from-black/40 via-black/15 to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span
            className="text-white border border-white/40 px-10 py-3.5 backdrop-blur-md bg-black/30 font-medium"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: '"Jost", sans-serif'
            }}>
            View Property
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 p-7"
          style={{
            textShadow:
            "0 1px 6px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.2)"
          }}>
          <p className="text-[1.35rem] font-display font-normal text-white mb-2 tracking-wide">
            {listing.price}
          </p>
          <p className="text-white/90 text-[13px] font-light">
            {listing.address}
          </p>
          <p className="text-white/60 text-[13px] font-light">
            {listing.location}
          </p>
        </div>

        {listing.badgeLabel &&
        <div className="absolute top-5 left-5 bg-background/85 backdrop-blur-sm px-3.5 py-1.5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-normal">
              {listing.badgeLabel}
            </span>
          </div>
        }
      </div>

      <div className="mt-3 px-1">
        <div className="flex gap-4 text-[13px] text-muted-foreground/70 py-3 items-center font-light">
          <span>{listing.beds} Beds</span>
          <span className="text-border text-[5px]">•</span>
          <span>{listing.baths} Baths</span>
          <span className="text-border text-[5px]">•</span>
          <span>{listing.sqft} Sq Ft</span>
        </div>
      </div>
    </Wrapper>);
};

const FeaturedListings = ({ hideRealScout = false }: FeaturedListingsProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hideRealScout || !widgetRef.current) return;
    const el = document.createElement("realscout-your-listings");
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    el.setAttribute("sort-order", "PRICE_HIGH");
    el.setAttribute("listing-status", "For Sale,In Contract");
    el.setAttribute("property-types", "SFR,MF,TC,LAL,OTHER,MOBILE");
    el.setAttribute("include-co-listings", "");
    el.setAttribute("include-seller-listings", "");
    widgetRef.current.appendChild(el);

    return () => {
      if (widgetRef.current && el.parentNode === widgetRef.current) {
        widgetRef.current.removeChild(el);
      }
    };
  }, [hideRealScout]);

  return (
    <>
      {/* ── Curated Luxury Listings ── */}
      <section className="pt-28 pb-0 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 -mt-8">
              <div>
                <p
                  className="text-gold mb-5 font-semibold text-sm"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontFamily: '"Jost", sans-serif'
                  }}>
                  FEATURED LISTINGS
                </p>
                <h2
                  className="font-display font-normal text-architectural"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 3rem)",
                    letterSpacing: "-0.01em"
                  }}>
                  Featured Austin Luxury Properties
                </h2>
                <p className="text-muted-foreground/70 mt-5 max-w-xl text-[15px] font-light leading-relaxed">
                  Explore the caliber of luxury properties available across
                  Austin, including select private and off-market opportunities.
                </p>
              </div>
              <Link
                to="/austin-luxury-homes-for-sale"
                className="mt-6 md:mt-0 text-muted-foreground/60 hover:text-foreground transition-colors duration-500 relative group shrink-0"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: '"Jost", sans-serif'
                }}>
                EXPLORE AUSTIN LUXURY HOMES
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
              {listings.map((listing, index) =>
              <ListingCard key={index} listing={listing} />
              )}
            </div>

            <div className="mt-16 mb-10 text-center">
              <Link
                to="/off-market-real-estate-austin"
                className="inline-block text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors duration-500 font-light">
                Did you know that 95%+ of our listings aren't on market? If you
                are searching for luxury listing opportunities in Austin,
                contact us to become an Echelon Insider for discreet listings
                not publicly advertised.
                <br />
                <span className="underline underline-offset-4 decoration-border">
                  Ask about off-market opportunities
                </span>{" "}
                →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {!hideRealScout && (
        <section className="pt-10 pb-14 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-14">
                <p
                  className="text-gold mb-5 font-semibold text-sm"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontFamily: '"Jost", sans-serif'
                  }}>ON THE MARKET
                </p>
                <h2
                  className="font-display font-normal text-architectural"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 3rem)",
                    letterSpacing: "-0.01em"
                  }}>
                  Commercial and Residential
                </h2>
                <p className="text-muted-foreground/70 mt-5 max-w-xl text-[15px] font-light leading-relaxed">
                  Browse current listings across Austin's most desirable
                  neighborhoods — residential, commercial, and land.
                </p>
              </div>
              <div ref={widgetRef} className="w-full" />
              <noscript>
                <p className="text-center text-muted-foreground py-8">
                  Please enable JavaScript to view our interactive listing search, or visit{" "}
                  <a href="https://taylorsherwood.realscout.com/" className="underline">our listings portal</a> directly.
                </p>
              </noscript>
              <div className="mt-16 text-center">
                <Link
                  to="/past-transactions"
                  className="inline-block px-10 py-4 border-2 border-foreground/30 text-muted-foreground/70 hover:text-primary-foreground hover:bg-gold hover:border-gold transition-all duration-500"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: '"Jost", sans-serif'
                  }}>
                  SEE PAST TRANSACTIONS →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>);
};

export default FeaturedListings;