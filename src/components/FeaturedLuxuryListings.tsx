import { Link } from "react-router-dom";
import listingTarrytown from "@/assets/listing-tarrytown-2203-greenlee.jpg";
import listingEastAustin from "@/assets/listing-east-austin-1007-e-8th.jpg";
import listingBartonCreek from "@/assets/listing-barton-creek-4416-amarra.jpg";
import listingWestlake from "@/assets/listing-westlake-2210-westlake-dr.jpg";
import listingLakeAustin from "@/assets/listing-lake-austin-2503-westlake-301.jpg";
import listingLostCreek from "@/assets/listing-lost-creek-2319-cypress-point.jpg";
import listingSold from "@/assets/listing-westlake-3629-peregrine.jpg";

interface Listing {
  id: string;
  image: string;
  price: string;
  address: string;
  neighborhood: string;
  status?: "sold" | "pending";
  link: string;
}

const listings: Listing[] = [
  {
    id: "1",
    image: listingLakeAustin,
    price: "$11,500,000",
    address: "2503 Westlake Dr 301, Austin, TX 78746",
    neighborhood: "Lake Austin",
    link: "https://taylorsherwood.realscout.com/agent/ls/160972751",
  },
  {
    id: "2",
    image: listingBartonCreek,
    price: "$8,750,000",
    address: "4416 Amarra Dr, Austin, TX 78735",
    neighborhood: "AMARRA",
    link: "https://taylorsherwood.realscout.com/agent/ls/163332268",
  },
  {
    id: "3",
    image: listingTarrytown,
    price: "$4,600,000",
    address: "2203 Greenlee Dr, Austin, TX 78703",
    neighborhood: "Tarrytown",
    link: "https://taylorsherwood.realscout.com/agent/ls/167683003",
  },
  {
    id: "4",
    image: listingLostCreek,
    price: "$4,295,000",
    address: "2319 Cypress Point E, Austin, TX 78746",
    neighborhood: "Lost Creek",
    link: "https://taylorsherwood.realscout.com/agent/ls/169226605",
  },
  {
    id: "5",
    image: listingSold,
    price: "$3,250,000",
    address: "3629 Peregrine Falcon Dr, Austin, TX 78746",
    neighborhood: "Westlake",
    status: "sold",
    link: "https://taylorsherwood.realscout.com/agent/ls/160106167",
  },
  {
    id: "6",
    image: listingEastAustin,
    price: "$2,395,000",
    address: "1007 E 8th St, Austin, TX 78702",
    neighborhood: "East Austin",
    link: "https://taylorsherwood.realscout.com/agent/ls/169820156",
  },
  {
    id: "7",
    image: listingWestlake,
    price: "$1,599,000",
    address: "2210 Westlake Dr A, Austin, TX 78746",
    neighborhood: "Westlake",
    status: "pending",
    link: "https://taylorsherwood.realscout.com/agent/ls/154226813",
  },
];

const labelStyle = {
  fontSize: "0.5rem" as const,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const ListingCardOverlay = ({
  listing,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  listing: Listing;
  aspect?: string;
  className?: string;
}) => {
  const isExternal = listing.link.startsWith("http");

  const inner = (
    <div className={`relative overflow-hidden rounded-md ${aspect} ${className}`}>
      <img
        src={listing.image}
        alt={`${listing.address} — ${listing.neighborhood}, Austin TX`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06] group-hover:scale-[1.06]"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        width={800}
        height={600}
      />
      {/* Persistent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Frosted "View Property" button on hover */}
      <div className="absolute inset-0 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2.5 rounded-lg font-medium" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
          View Property
        </span>
      </div>

      {/* Sold badge */}
      {listing.status && (
        <div className="absolute top-4 left-4">
          <span
            className="bg-background/90 text-foreground backdrop-blur-sm px-3 py-1 font-semibold"
            style={{ ...labelStyle, fontSize: "0.45rem" }}
          >
            {listing.status.toUpperCase()}
          </span>
        </div>
      )}

      {/* Bottom overlay text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-white font-display font-normal text-lg md:text-2xl mb-1">
          {listing.price}
        </p>
        <p
          className="text-white/60"
          style={labelStyle}
        >
          {listing.neighborhood}
        </p>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={listing.link} target="_blank" rel="noopener noreferrer nofollow" className="group block">
        {inner}
      </a>
    );
  }

  return (
    <Link to={listing.link} className="group block">
      {inner}
    </Link>
  );
};

const FeaturedLuxuryListings = () => {
  return (
    <section className="pb-10">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Subtle transition line */}
          <p
            className="text-muted-foreground/40 mb-10 font-semibold"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: '"Jost", sans-serif',
            }}
          >
            UPDATED: APRIL 2026
          </p>

          {/* PRIMARY ROW: Hero (70%) + 2 stacked (30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Hero listing */}
            <div className="lg:col-span-8">
              <ListingCardOverlay
                listing={listings[0]}
                aspect="aspect-[4/3] lg:aspect-[16/10]"
              />
            </div>

            {/* Two stacked */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <ListingCardOverlay
                listing={listings[1]}
                aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="lg:flex-1"
              />
              <ListingCardOverlay
                listing={listings[2]}
                aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="lg:flex-1"
              />
            </div>
          </div>

          {/* SECOND ROW: 4 listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <ListingCardOverlay listing={listings[3]} aspect="aspect-[3/4] sm:aspect-[4/3]" />
            <ListingCardOverlay listing={listings[4]} aspect="aspect-[3/4] sm:aspect-[4/3]" />
            <ListingCardOverlay listing={listings[5]} aspect="aspect-[3/4] sm:aspect-[4/3]" />
            <ListingCardOverlay listing={listings[6]} aspect="aspect-[3/4] sm:aspect-[4/3]" />
          </div>

          {/* Off-market CTA — subtle, editorial */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-muted-foreground/60 text-[13px] font-light leading-relaxed">
              Looking for something more discreet? We also advise clients on private and off-market
              opportunities across Austin's luxury market.
            </p>
            <Link
              to="/off-market-real-estate-austin"
              className="inline-block shrink-0 border border-foreground/15 text-foreground/70 hover:bg-gold hover:text-white hover:border-gold px-7 py-3 rounded-full transition-all duration-300"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: '"Jost", sans-serif',
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
