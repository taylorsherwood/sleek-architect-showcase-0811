import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury-austin.jpg";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-foreground/75" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-minimal text-gold-light mb-6">READY TO SELL?</p>
        <h2 className="text-4xl md:text-6xl font-display font-light text-warm-cream text-architectural mb-6">
          Your Home Deserves
          <br />
          <span className="italic">Exceptional</span> Marketing
        </h2>
        <p className="text-warm-cream/70 max-w-2xl mx-auto mb-10 text-lg">
          Schedule a private consultation to learn how Echelon Property Group can position 
          your home for maximum exposure and top-dollar results.
        </p>
        <Link
          to="/contact"
          className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-warm-cream/90 px-10 py-4 transition-colors duration-300"
        >
          SCHEDULE A CONSULTATION
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
