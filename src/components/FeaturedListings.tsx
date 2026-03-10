import { Link } from "react-router-dom";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

const listings = [
  {
    image: listing1,
    address: "2847 Barton Creek Blvd",
    location: "Barton Creek, Austin",
    price: "$4,850,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    link: "#",
  },
  {
    image: listing2,
    address: "1203 Westlake Ridge",
    location: "Westlake Hills, Austin",
    price: "$7,250,000",
    beds: 6,
    baths: 7,
    sqft: "8,400",
    link: "#",
  },
  {
    image: listing3,
    address: "Ranch Estate on 42 Acres",
    location: "Texas Hill Country",
    price: "$5,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,800",
    link: "#",
  },
];

const FeaturedListings = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-minimal text-gold mb-4">FEATURED LISTINGS</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                Exceptional Properties
              </h2>
            </div>
            <Link
              to="/listings"
              className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              VIEW ALL LISTINGS
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
              <a
                key={index}
                href={listing.link}
                className="group block"
              >
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={listing.image}
                    alt={listing.address}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                    <span className="text-minimal text-foreground font-semibold">
                      {listing.price}
                    </span>
                  </div>
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
