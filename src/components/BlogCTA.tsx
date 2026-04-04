import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <section className="py-14 md:py-18 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-minimal text-gold mb-4 tracking-[0.25em]">Your Next Move</p>
        <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-4">
          Explore Austin Luxury Real Estate
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
          View available homes, private opportunities, and curated listings across Austin's most desirable neighborhoods.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://www.echelonpropertygroup.com" className="cta-luxury">
            Explore Homes
          </a>
          <Link to="/connect" className="cta-luxury cta-luxury--ghost">
            Request Private Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
