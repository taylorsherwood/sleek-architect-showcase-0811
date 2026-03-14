import { Link } from "react-router-dom";
import clhmsBadge from "@/assets/clhms-badge.png";
import echelonLogoGold from "@/assets/echelon-logo-gold.png";

const MeetTaylor = () => {
  return (
    <section className="pt-20 pb-8 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-display font-light text-architectural mb-1 md:w-1/2 text-center">
            Meet Taylor Sherwood
          </h3>
          <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/60 mb-3 md:w-1/2 text-center">
            CERTIFIED LUXURY HOME MARKETING SPECIALIST (CLHMS) <br />
            AUSTIN LUXURY REAL ESTATE ADVISOR
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative inline-block">
              <img
                alt="Taylor Sherwood — Austin luxury real estate advisor and CLHMS specialist"
                className="w-full h-[50vh] md:h-[60vh] object-contain"
                src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg"
                loading="lazy"
                decoding="async" />
              <img src={clhmsBadge} alt="CLHMS Guild Badge" className="absolute bottom-3 right-3 w-20 h-20 opacity-85" loading="lazy" decoding="async" />
            </div>
            
            <div>
              <h4 className="text-minimal text-gold mb-4 font-extrabold">{"\n\n"}AUSTIN LUXURY REAL ESTATE SPECIALIST</h4>
              <p className="text-muted-foreground leading-relaxed max-w-md text-xl mb-6">
                {"\n\n"}Taylor Sherwood is an Austin-based real estate advisor specializing in distinctive homes, luxury properties, and land opportunities. Known for his attention to detail and thoughtful approach to marketing, he helps clients navigate complex transactions with confidence while showcasing properties in their best possible light.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md text-xl mb-6">
                With deep expertise across Austin's most sought-after neighborhoods — including Westlake Hills, Barton Creek, Tarrytown, and Lake Austin — Taylor works closely with buyers and sellers to ensure every transaction is handled with care, discretion, and strategic insight.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="whitespace-pre-line text-muted-foreground leading-relaxed text-xl mb-8 text-center">
              {"      "}Taylor founded Echelon Property Group to bring a strategic, investment-focused approach to Austin real estate.{" "}
              {"\n    "}With experience across luxury residential, commercial assets, and investment properties, Taylor helps clients identify{" "}
              {"\n    "}opportunities others miss and execute transactions with precision.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-primary text-primary px-8 py-3 text-minimal tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              
              SCHEDULE A PRIVATE CONSULTATION
            </Link>
            <div className="mt-6 mb-0">
              <img src={echelonLogoGold} alt="Echelon Property Group" className="mx-auto h-32 w-auto" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default MeetTaylor;