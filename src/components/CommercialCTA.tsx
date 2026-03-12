import { Link } from "react-router-dom";
import commercialHero from "@/assets/commercial-hero-austin.jpg";

const CommercialCTA = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0">
        <img
          src={heroArchitecture}
          alt="Austin commercial real estate skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto py-16">
          <p className="text-minimal text-gold mb-4 font-extrabold">COMMERCIAL & INVESTMENT</p>
          <h2 className="text-5xl md:text-7xl font-display font-light text-warm-cream mb-8">
            Austin Commercial & Investment Real Estate
          </h2>
          <p className="text-xl text-warm-cream/80 max-w-3xl">
            Multifamily, retail, office, land development, and income-producing investment
            opportunities across the Austin metro.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/listings/commercial-investment-austin"
              className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300"
            >
              VIEW OPPORTUNITIES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialCTA;
