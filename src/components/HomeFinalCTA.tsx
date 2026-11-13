import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const linkGroups = [
  {
    heading: "Buy & Sell",
    links: [
      { to: "/buy", label: "Buy a Home" },
      { to: "/sell", label: "Sell Your Home" },
      { to: "/austin-luxury-homes-for-sale", label: "Austin Luxury Homes" },
      { to: "/luxury-real-estate-austin", label: "Luxury Real Estate" },
    ],
  },
  {
    heading: "Invest",
    links: [
      { to: "/invest", label: "Investment Advisory" },
      { to: "/austin-real-estate-investment", label: "Real Estate Investment" },
      { to: "/austin-commercial-real-estate", label: "Commercial Real Estate" },
      { to: "/land-for-sale-austin", label: "Land for Sale" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { to: "/communities", label: "Communities" },
      { to: "/best-luxury-neighborhoods-austin", label: "Best Neighborhoods" },
      { to: "/moving-to-austin-texas", label: "Moving to Austin" },
      { to: "/off-market-real-estate-austin", label: "Off-Market Access" },
    ],
  },
];

const FinalCTA = () => (
  <>
    <section id="final-cta-section" data-nav-dark-zone style={{ padding: "clamp(32px, 5vw, 56px) 0 clamp(64px, 10vw, 120px)" }} className="bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-5">GET STARTED</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal mb-5 leading-[1.1] tracking-[0.03em] text-architectural">
              Work With
              <br />
              Echelon Property Group
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[15px] mb-12 max-w-[400px] mx-auto text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
              Real estate, redefined through strategy, access, & execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/buy" className="cta-luxury">
                BUY PROPERTY
              </Link>
              <Link to="/sell" className="cta-luxury cta-luxury--ghost">
                SELL PROPERTY
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>


    
  </>
);

/** Priority internal links, rendered in the homepage footer below the brokerage mark. */
export const HomeExploreLinks = () => (
    <section className="bg-secondary" style={{ padding: "clamp(48px, 7vw, 76px) 0" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p
              className="text-gold mb-2"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}
            >
              EXPLORE AUSTIN REAL ESTATE
            </p>
            <div className="w-6 h-px mx-auto" style={{ background: "#b9a06c" }} />
          </div>

          <div className="hidden sm:grid sm:grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-0 items-start">
            {linkGroups.map((group, i) => (
              <React.Fragment key={group.heading}>
                {i > 0 && (
                  <div className="self-stretch flex items-center justify-center">
                    <div className="w-px h-full" style={{ background: "rgba(184,160,109,0.12)" }} />
                  </div>
                )}
                <div className="px-8 text-center group/col transition-opacity duration-300 hover:opacity-100" style={{ opacity: 0.88 }}>
                  <h3
                    className="text-foreground/70 mb-4"
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}
                  >
                    {group.heading}
                  </h3>
                  <div className="space-y-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block text-muted-foreground/55 hover:text-gold transition-all duration-300 hover:translate-x-0.5"
                        style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px", fontWeight: 300, lineHeight: 2, letterSpacing: "0.015em" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="sm:hidden space-y-8">
            {linkGroups.map((group) => (
              <div key={group.heading} className="text-center">
                <h3
                  className="text-foreground/70 mb-3"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}
                >
                  {group.heading}
                </h3>
                <div className="space-y-1.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block text-muted-foreground/55 hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px", fontWeight: 300, lineHeight: 2, letterSpacing: "0.015em" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
);

export default FinalCTA;
