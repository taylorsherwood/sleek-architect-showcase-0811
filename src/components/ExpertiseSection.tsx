import { Link } from "react-router-dom";
import { Home, MapPin, Building2, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const expertiseBlocks = [
{
  icon: Home,
  title: "Luxury Homes",
  description: "Austin's finest luxury residential properties — from lakefront estates and hilltop mansions to gated golf communities. Expert guidance for luxury buyers and sellers across Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and Austin's most exclusive neighborhoods.",
  link: "/austin-luxury-homes-for-sale",
  linkText: "EXPLORE LUXURY HOMES"
},
{
  icon: MapPin,
  title: "Land Development",
  description: "Austin land for sale — raw acreage, entitled parcels, and development-ready sites across high-growth corridors. Strategic site selection, zoning analysis, and acquisition advisory for Austin builders, developers, and land investors.",
  link: "/land-for-sale-austin",
  linkText: "VIEW LAND OPPORTUNITIES"
},
{
  icon: Building2,
  title: "Commercial Real Estate",
  description: "Austin commercial real estate — multifamily, retail, office, industrial, and mixed-use properties throughout the metro. Tenant representation, investment acquisitions, and commercial development advisory for institutional and private investors.",
  link: "/austin-commercial-real-estate",
  linkText: "EXPLORE COMMERCIAL"
},
{
  icon: TrendingUp,
  title: "Investment Property",
  description: "Austin investment property — income-producing assets and value-add opportunities across the strongest submarkets. Institutional-grade underwriting, off-market deal sourcing, and strategic advisory for private and portfolio investors.",
  link: "/austin-real-estate-investment",
  linkText: "VIEW INVESTMENTS"
}];


const ExpertiseSection = () => {
  return (
    <section className="pt-12 pb-20 md:pt-16 md:pb-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-[58rem] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <p className="text-minimal text-gold mb-4">OUR EXPERTISE</p>
              <h2 className="text-3xl md:text-[2.75rem] font-display font-normal text-architectural mb-6 leading-tight">
                Austin Real Estate Expertise
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-[0.95rem] leading-relaxed" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>From luxury homes and land development to commercial acquisitions and investment strategy — Echelon Property Group delivers full-spectrum real estate advisory across Austin and the Texas Hill Country.</p>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4 text-lg" style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}>Driven by Data, Proven by Results</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertiseBlocks.map((block, index) => {
              const isFeatured = index === 0;
              return (
                <ScrollReveal key={block.title} delay={index * 100}>
                  <Link
                    to={block.link}
                    className="group flex flex-col border-2 border-border/80 hover:border-gold shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-architectural)] hover:-translate-y-1 transition-all duration-500 h-full px-6 py-10 md:px-8 md:py-11 bg-[hsl(38_20%_96%/0.35)] dark:bg-[hsl(38_15%_15%/0.2)]">
                    
                      <block.icon className={`text-gold mb-5 ${isFeatured ? "w-8 h-8" : "w-7 h-7"}`} />
                      <h3 className={`font-display font-normal text-architectural mb-2.5 group-hover:text-muted-foreground transition-colors duration-300 ${
                        isFeatured ? "text-[1.35rem]" : "text-xl"
                      }`}>
                        {block.title}
                      </h3>
                      <p className="text-muted-foreground text-[0.875rem] leading-relaxed mb-6 flex-1">
                        {block.description}
                      </p>
                      <span className="text-minimal text-foreground group-hover:text-gold transition-colors duration-300 mt-auto">
                        {block.linkText} →
                      </span>
                    </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>);

};

export default ExpertiseSection;