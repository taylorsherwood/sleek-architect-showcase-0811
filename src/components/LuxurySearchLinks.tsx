import { Link } from "react-router-dom";

const luxuryLinks = [
  { label: "Luxury Homes in Austin", to: "/austin-luxury-homes-for-sale" },
  { label: "Austin Luxury Homes for Sale", to: "/austin-luxury-homes-for-sale" },
  { label: "Off-Market Luxury Homes", to: "/off-market-real-estate-austin" },
  { label: "Luxury Real Estate Austin", to: "/luxury-real-estate-austin" },
  { label: "Best Luxury Neighborhoods", to: "/best-luxury-neighborhoods-austin" },
];

const LuxurySearchLinks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-gold mb-5 font-semibold"
            style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}
          >
            EXPLORE AUSTIN
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-10">
            Luxury Property Searches
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {luxuryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-6 py-3 border border-border/50 text-muted-foreground hover:text-primary-foreground hover:bg-gold hover:border-gold transition-all duration-500 text-sm font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxurySearchLinks;
