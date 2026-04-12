import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const featured = [
  { name: "Barton Creek", slug: "barton-creek", price: "From $1.5M+" },
  { name: "Bee Cave", slug: "bee-cave", price: "From $500K+" },
  { name: "Dripping Springs", slug: "dripping-springs", price: "From $500K+" },
  { name: "Lake Austin", slug: "lake-austin", price: "From $2M+" },
  { name: "Pemberton Heights", slug: "pemberton-heights", price: "From $1.5M+" },
  { name: "Rob Roy", slug: "rob-roy", price: "From $1.5M+" },
  { name: "Rollingwood", slug: "rollingwood", price: "From $1M+" },
  { name: "Spanish Oaks", slug: "spanish-oaks", price: "From $3M+" },
  { name: "Tarrytown", slug: "tarrytown", price: "From $800K+" },
  { name: "Westlake Hills", slug: "westlake-hills", price: "From $1.2M+" },
];

const FeaturedCommunities = () => (
  <section className="py-16 md:py-20 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">FEATURED AUSTIN COMMUNITIES</p>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural leading-[1.1] tracking-[0.03em]">
              Explore Austin's Premier Neighborhoods
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {featured.map((c) => (
              <Link
                key={c.slug}
                to={`/communities/${c.slug}`}
                className="group text-center border border-border/40 py-5 px-3 hover:border-gold transition-all duration-300 hover:bg-background"
              >
                <h3 className="font-display text-sm md:text-[15px] font-medium text-foreground group-hover:text-gold transition-colors duration-300 mb-1">
                  {c.name}
                </h3>
                <p className="text-muted-foreground/60" style={{
                  fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.1em"
                }}>
                  {c.price}
                </p>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-8">
            <Link
              to="/communities"
              className="relative inline-block text-foreground hover:text-gold transition-colors duration-300 text-minimal after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              VIEW ALL COMMUNITIES →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default FeaturedCommunities;
