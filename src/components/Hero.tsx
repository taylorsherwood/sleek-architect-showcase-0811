import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-austin-skyline.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }} />
      
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 container mx-auto px-6 pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p className="text-minimal text-warm-cream/70 mb-6 reveal">
            AUSTIN REAL ESTATE EXPERTS
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-warm-cream text-architectural mb-8 reveal">
            Driven by Data,
            <br />
            Defined by
            <br />
            <span className="italic">Results</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-cream/75 font-light max-w-xl mb-10 reveal-delayed">
            Specializing in luxury homes, estates, and land across Austin's most coveted neighborhoods
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal-delayed-2">
            <Link
              to="/contact"
              className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-warm-cream/90 px-8 py-4 transition-colors duration-300 text-center">
              
              SCHEDULE A CONSULTATION
            </Link>
            <Link
              to="/listings"
              className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300 text-center">
              
              VIEW LISTINGS
            </Link>
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;