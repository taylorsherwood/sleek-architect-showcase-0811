import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <section className="py-14 md:py-18 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-minimal text-gold mb-4 tracking-[0.25em]">Opportunities</p>
        <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-4">
          Looking for Your Next Move?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
          Whether you're exploring off-market opportunities or evaluating investment properties across Austin, we can help you move with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/off-market-real-estate-austin" className="cta-luxury">
            Explore Off-Market Homes
          </Link>
          <Link to="/invest" className="cta-luxury cta-luxury--ghost">
            Investment Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
