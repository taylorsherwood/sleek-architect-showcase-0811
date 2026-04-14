import { Link } from "react-router-dom";

const commercialHeroSrc = "/images/commercial-hero-austin.webp";

const CommercialCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={commercialHeroSrc}
          alt="Austin commercial real estate skyline"
          title="Austin commercial real estate and investment properties"
          className="w-full h-full object-cover object-center"
          sizes="100vw"
          style={{ imageRendering: 'auto' }}
          loading="lazy"
          decoding="async" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto py-16">
          <p className="text-minimal text-gold mb-4 font-extrabold" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>COMMERCIAL & INVESTMENT</p>
          <h3 className="text-5xl font-display font-normal text-warm-cream mb-8 md:text-6xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)' }}>Austin Commercial Real Estate & 
Investment Properties
          </h3>
          <p className="text-xl text-warm-cream/85 max-w-3xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            Multifamily, retail, office, land development, and income-producing investment
            opportunities across the Austin metro.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/listings/commercial-investment-austin"
              className="cta-luxury cta-luxury--on-dark">
              VIEW OPPORTUNITIES
            </Link>
          </div>
        </div>
      </div>
    </section>);

};

export default CommercialCTA;