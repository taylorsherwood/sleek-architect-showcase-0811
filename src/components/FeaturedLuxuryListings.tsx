import { Link } from "react-router-dom";
import communityBartonCreek from "@/assets/community-barton-creek.jpg";
import communityWestlake from "@/assets/community-westlake-hills.avif";
import communityLakeAustin from "@/assets/community-lake-austin.jpg";
import communityRollingwood from "@/assets/community-rollingwood.jpg";
import communityTravisHeights from "@/assets/community-travis-heights.jpg";
import communitySpanishOaks from "@/assets/community-spanish-oaks.jpg";
import listingTarrytown from "@/assets/listing-tarrytown-2621-exposition.jpg";
import listingEastAustin from "@/assets/listing-east-austin-1007-e-8th.jpg";
import listingBartonCreek from "@/assets/listing-barton-creek-4416-amarra.jpg";

interface Listing {
  id: string;
  image: string;
  price: string;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: string;
  sold?: boolean;
  link: string;
}

const listings: Listing[] = [
  {
    id: "1",
    image: listingTarrytown,
    price: "$2,500,000",
    address: "2621 Exposition Blvd, Austin, TX 78703",
    neighborhood: "Tarrytown",
    beds: 3,
    baths: 3,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/169041083",
  },
  {
    id: "2",
    image: listingEastAustin,
    price: "$2,395,000",
    address: "1007 E 8th St, Austin, TX 78702",
    neighborhood: "East Austin",
    beds: 5,
    baths: 5,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/169820156",
  },
  {
    id: "3",
    image: communityBartonCreek,
    price: "$3,150,000",
    address: "Barton Creek Estate",
    neighborhood: "Barton Creek",
    beds: 4,
    baths: 5,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/163332268",
  },
  {
    id: "4",
    image: communityWestlake,
    price: "$2,695,000",
    address: "Westlake Home",
    neighborhood: "Westlake",
    beds: 4,
    baths: 4,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/154226813",
  },
  {
    id: "5",
    image: communityLakeAustin,
    price: "$6,900,000",
    address: "Lake Austin Waterfront",
    neighborhood: "Lake Austin",
    beds: 5,
    baths: 6,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/161251939",
  },
  {
    id: "6",
    image: communityRollingwood,
    price: "$3,185,000",
    address: "New Construction Modern",
    neighborhood: "Northwest Hills",
    beds: 4,
    baths: 5,
    sqft: "—",
    link: "https://taylorsherwood.realscout.com/agent/ls/169226605",
  },
  {
    id: "7",
    image: communitySpanishOaks,
    price: "$2,850,000",
    address: "Recently Sold",
    neighborhood: "Westlake",
    beds: 4,
    baths: 4,
    sqft: "—",
    sold: true,
    link: "https://taylorsherwood.realscout.com/agent/ls/160106167",
  },
];

const ListingCard = ({ listing, featured = false }: { listing: Listing; featured?: boolean }) => {
  const isExternal = listing.link.startsWith("http");

  const content = (
    <>
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[4/3]"}`}>
        <img
          src={listing.image}
          alt={`${listing.address} — ${listing.neighborhood}, Austin TX`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {listing.sold && (
          <div className="absolute top-5 left-5">
            <span
              className="bg-foreground/80 text-background backdrop-blur-sm px-4 py-1.5 font-semibold"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              SOLD
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="pt-5 pb-2">
        <p className="text-xl md:text-2xl font-display font-light text-foreground mb-1.5">
          {listing.price}
        </p>
        <p className="text-[13px] text-muted-foreground font-light leading-relaxed mb-2">
          {listing.address}
        </p>
        <p
            className="text-gold/70"
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            {listing.neighborhood}
          </p>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={listing.link} target="_blank" rel="noopener noreferrer" className="group block relative">
        {content}
      </a>
    );
  }

  return (
    <Link to={listing.link} className="group block relative">
      {content}
    </Link>
  );
};

const FeaturedLuxuryListings = () => {
  return (
    <section className="pt-8 pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-14">
            <p
              className="text-gold mb-4 font-semibold"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              CURATED THIS WEEK
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-light text-architectural mb-4">
              Featured Austin Luxury Homes
            </h2>
            <p className="text-muted-foreground text-[15px] font-light leading-relaxed max-w-xl">
              Selected weekly based on architecture, location, and overall quality across Austin's
              premier neighborhoods.
            </p>
          </div>

          {/* Grid: 2 large + 1 medium top row, then 2+2 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 mb-14">
            {/* First two large */}
            <ListingCard listing={listings[0]} featured />
            <ListingCard listing={listings[1]} featured />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mb-14">
            <ListingCard listing={listings[2]} />
            <ListingCard listing={listings[3]} />
            <ListingCard listing={listings[4]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            <ListingCard listing={listings[5]} />
            <ListingCard listing={listings[6]} />
          </div>

          {/* Off-market CTA */}
          <div className="mt-20 pt-10 border-t border-border/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-muted-foreground text-[14px] font-light leading-relaxed max-w-lg">
              Looking for something more discreet? We also advise clients on private and off-market
              opportunities across Austin's luxury market.
            </p>
            <Link
              to="/off-market-luxury-homes-austin"
              className="inline-block shrink-0 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-7 py-3 rounded-full transition-all duration-300"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              Inquire About Off-Market Listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLuxuryListings;
