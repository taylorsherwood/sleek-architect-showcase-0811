import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import echelonWatermark from "@/assets/echelon-watermark.webp";
import ScrollReveal from "@/components/ScrollReveal";

const MeetTaylor = () => {
  return (
    <section className="relative pt-16 md:pt-20 pb-14 md:pb-16 bg-background overflow-hidden">
      {/* Watermark — centered in the gap between text blocks */}
      <div
        className="pointer-events-none absolute right-[0%] bottom-[-8%] hidden md:block w-[60vw] max-w-[1050px] aspect-square"
        aria-hidden="true"
        style={{
          filter: 'blur(3px)',
        }}
      >
        <img
          src={echelonWatermark}
          alt=""
          className="w-full h-full object-contain opacity-[0.07]"
          style={{
            filter: 'sepia(60%) saturate(40%) hue-rotate(5deg) brightness(1.1)',
          }}
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
        />
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h3 className="text-2xl md:text-4xl font-display font-normal text-architectural mb-3 text-center md:w-1/2">
              Meet Taylor Sherwood
            </h3>
            <p className="text-[0.65rem] md:text-xs tracking-[0.1em] uppercase text-muted-foreground/60 mb-6 text-center md:w-1/2 leading-relaxed">
              CERTIFIED LUXURY HOME MARKETING SPECIALIST (CLHMS) <br />
              AUSTIN LUXURY REAL ESTATE ADVISOR
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="relative inline-block">
              <img
                alt="Taylor Sherwood — Austin luxury real estate advisor and CLHMS specialist"
                title="Taylor Sherwood — Certified Luxury Home Marketing Specialist"
                className="w-full h-[40vh] md:h-[60vh] object-contain"
                src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
              />
              <img src="/static-assets/clhms-badge.png" alt="Certified Luxury Home Marketing Specialist guild member badge" title="Certified Luxury Home Marketing Specialist badge" className="absolute bottom-3 right-3 w-16 h-16 md:w-20 md:h-20 opacity-85" loading="lazy" decoding="async" width={80} height={80} />
            </div>
            
            <div className="relative overflow-hidden">
              <h4 className="text-minimal text-gold mb-4 font-extrabold">AUSTIN LUXURY REAL ESTATE SPECIALIST</h4>
              <p className="text-muted-foreground leading-relaxed max-w-md text-base md:text-xl mb-6">
                Taylor Sherwood is an Austin-based real estate advisor specializing in distinctive homes, luxury properties, and land opportunities. Known for his attention to detail and thoughtful approach to marketing, he helps clients navigate complex transactions with confidence while showcasing properties in their best possible light.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md text-base md:text-xl mb-6">
                With deep expertise across Austin's most sought-after neighborhoods — including Westlake Hills, Barton Creek, Tarrytown, and Lake Austin — Taylor works closely with buyers and sellers to ensure every transaction is handled with care, discretion, and strategic insight.
              </p>
              <a
                href="https://www.instagram.com/theinvestorbroker"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="gold-metallic-text gold-underline-hover inline-flex items-center gap-2 transition-opacity duration-300"
                aria-label="Follow Taylor Sherwood on Instagram"
              >
                <Instagram className="w-5 h-5 text-gold" />
                <span className="text-xs tracking-[0.15em] uppercase">@TheInvestorBroker</span>
              </a>
            </div>
          </div>
          </ScrollReveal>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground leading-relaxed text-base md:text-xl mb-8 text-center max-w-3xl mx-auto">
              Taylor founded Echelon Property Group to bring a strategic, investment-focused approach to Austin real estate. With experience across luxury residential, commercial assets, and investment properties, Taylor helps clients identify opportunities others miss and execute transactions with precision.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-primary text-primary px-6 md:px-8 py-3 text-minimal tracking-widest hover:bg-gold hover:text-white hover:border-gold transition-colors duration-300">
              SCHEDULE A PRIVATE CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </section>);
};

export default MeetTaylor;