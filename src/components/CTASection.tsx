import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/static-assets/hero-luxury-austin.jpg"
          alt="Luxury home exterior in Austin Texas Hill Country"
          title="Austin luxury home — schedule a consultation"
          className="w-full h-full object-cover object-center"
          sizes="100vw"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>
      
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-minimal text-gold mb-6 font-extrabold">READY TO SELL?</p>
        <h2 className="text-4xl md:text-6xl font-display font-normal text-warm-cream text-architectural mb-6">Your Property Deserves
          <br />
          <span className="italic">Exceptional</span> Marketing
        </h2>
        <p className="text-warm-cream/70 max-w-2xl mx-auto mb-10 text-lg">
          Schedule a private consultation to learn how Echelon Property Group can position 
          your home for maximum exposure and top-dollar results.
        </p>
        <Link
          to="/contact"
          className="inline-block text-minimal bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground px-10 py-4 transition-colors duration-300">
          
          SCHEDULE A CONSULTATION
        </Link>
      </div>
    </section>);
};

export default CTASection;