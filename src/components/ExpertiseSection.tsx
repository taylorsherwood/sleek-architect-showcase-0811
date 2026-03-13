import { Link } from "react-router-dom";
import { Home, MapPin, Building2, TrendingUp } from "lucide-react";

const expertiseBlocks = [
  {
    icon: Home,
    title: "Luxury Homes",
    description: "Austin's finest residential properties — from lakefront estates and hilltop mansions to gated golf communities. Expert guidance for buyers and sellers in Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and beyond.",
    link: "/austin-luxury-homes-for-sale",
    linkText: "EXPLORE LUXURY HOMES",
  },
  {
    icon: MapPin,
    title: "Land Development",
    description: "Raw land, entitled parcels, and development opportunities across Austin's high-growth corridors. Site selection, zoning analysis, and acquisition advisory for builders, developers, and investors.",
    link: "/land-for-sale-austin",
    linkText: "VIEW LAND OPPORTUNITIES",
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    description: "Multifamily, retail, office, industrial, and mixed-use properties throughout the Austin metro. Tenant representation, investment acquisitions, and development land advisory.",
    link: "/austin-commercial-real-estate",
    linkText: "EXPLORE COMMERCIAL",
  },
  {
    icon: TrendingUp,
    title: "Investment Property",
    description: "Income-producing assets and value-add opportunities across Austin's strongest submarkets. Institutional-grade underwriting and deal sourcing for private and portfolio investors.",
    link: "/austin-real-estate-investment",
    linkText: "VIEW INVESTMENTS",
  },
];

const ExpertiseSection = () => {
  return (
    <section className="py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">OUR EXPERTISE</p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
              Austin Real Estate Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From luxury homes and land development to commercial acquisitions and investment strategy — 
              Echelon Property Group delivers full-spectrum real estate advisory across Austin and the Texas Hill Country.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertiseBlocks.map((block) => (
              <Link
                key={block.title}
                to={block.link}
                className="group border border-border p-8 hover:border-foreground/30 transition-colors duration-300"
              >
                <block.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-2xl font-display font-light text-architectural mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                  {block.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {block.description}
                </p>
                <span className="text-minimal text-foreground group-hover:text-gold transition-colors duration-300">
                  {block.linkText} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
