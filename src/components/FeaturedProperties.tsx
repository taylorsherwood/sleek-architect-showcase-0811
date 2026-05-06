import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import gillisStreet from "@/assets/gillis-street-home-card.jpg";

const properties = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.webp",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,349,000",
    beds: 4, baths: 4, sqft: "4,147",
    link: "https://www.bartoncreekvilla.com",
    badge: "LUXURY LISTING",
  },
  {
    image: gillisStreet,
    address: "4314 Gillis Street",
    location: "Austin, TX 78745",
    price: "$2,495,000",
    beds: 24, baths: 0, sqft: "24-unit",
    link: "/listings/commercial-investment-austin",
    badge: "COMMERCIAL LISTING",
    subtitle: "4314 Gillis Street — 24-unit value-add multifamily, 78745.",
  },
  {
    image: "/static-assets/listing-westlake-hills-private.avif",
    address: "Address withheld",
    location: "West Lake Hills",
    price: "$5,950,000",
    beds: 5, baths: 5, sqft: "—",
    link: "/off-market-real-estate-austin",
    badge: "PRIVATE LISTING",
  },
];

const FeaturedProperties = () => {
  return (
    <section
      className="bg-secondary"
      style={{ padding: "clamp(80px, 12vw, 120px) 0" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: "clamp(56px, 8vw, 80px)" }}>
              <p
                className="text-gold mb-5"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Featured Listings
              </p>
              <h2
                className="font-display font-normal text-architectural"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  marginBottom: "1.75rem",
                }}
              >
                Exceptional Properties
              </h2>
              <div
                aria-hidden="true"
                style={{ width: "40px", height: "1px", background: "#b9a06c", margin: "0 auto" }}
              />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
            {properties.map((p, index) => {
              const isExternal = p.link.startsWith("http");
              const Wrapper: any = isExternal ? "a" : Link;
              const wrapperProps = isExternal
                ? { href: p.link, target: "_blank", rel: "noopener noreferrer" }
                : { to: p.link };
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <Wrapper
                    {...wrapperProps}
                    className="expertise-card group relative block w-full overflow-hidden"
                    style={{ aspectRatio: "4 / 5" }}
                    aria-label={`${p.address} — ${p.price}`}
                  >
                    <img
                      src={p.image}
                      alt={p.address}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.08) 100%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="expertise-card__darken absolute inset-0 opacity-0 transition-opacity duration-700"
                      style={{ background: "rgba(10,10,12,0.14)" }}
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end"
                      style={{ padding: "clamp(24px, 3.5vw, 40px)" }}
                    >
                      <p
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#b9a06c",
                          marginBottom: "0.875rem",
                        }}
                      >
                        {p.badge}
                      </p>
                      <h3
                        style={{
                          fontFamily: '"Cinzel", serif',
                          fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: "0.02em",
                          color: "#FAFAF8",
                          marginBottom: "0.875rem",
                        }}
                      >
                        {p.price}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "0.95rem",
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: "rgba(250, 250, 248, 0.9)",
                          maxWidth: "400px",
                          marginBottom: "1.5rem",
                          textAlign: "left",
                        }}
                      >
                        {(p as any).subtitle
                          ? (p as any).subtitle
                          : p.sqft === "—"
                          ? `${p.location} — private inquiry`
                          : `${p.address} — ${p.beds} beds · ${p.baths} baths · ${p.sqft} sq ft.`}
                      </p>
                      <span
                        className="expertise-card__cta inline-flex items-center"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#b9a06c",
                          position: "relative",
                          paddingBottom: "8px",
                          alignSelf: "flex-start",
                        }}
                      >
                        <span style={{ position: "relative" }}>
                          Explore →
                          <span
                            aria-hidden="true"
                            className="expertise-card__underline"
                            style={{
                              position: "absolute",
                              left: 0,
                              bottom: "-6px",
                              height: "1px",
                              width: "24px",
                              background: "#b9a06c",
                              transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </Wrapper>
                </ScrollReveal>
              );
            })}

            {/* Off-market card — spans full width on second row */}
            <ScrollReveal delay={properties.length * 100}>
              <Link
                to="/off-market-real-estate-austin"
                className="expertise-card group relative block w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5", background: "#0C0F24" }}
                aria-label="Off-Market Opportunities — Exclusive Private Listings"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/static-assets/echelon-logo-gold-square.webp"
                    alt="Echelon Property Group"
                    loading="lazy"
                    decoding="async"
                    className="w-[40%] max-w-[280px] h-auto object-contain"
                    style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.08) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="expertise-card__darken absolute inset-0 opacity-0 transition-opacity duration-700"
                  style={{ background: "rgba(10,10,12,0.14)" }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{ padding: "clamp(24px, 3.5vw, 40px)" }}
                >
                  <p
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#b9a06c",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Private Access
                  </p>
                  <h3
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "0.02em",
                      color: "#FAFAF8",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Off-market opportunities
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(250, 250, 248, 0.9)",
                      maxWidth: "400px",
                      marginBottom: "1.5rem",
                      textAlign: "left",
                    }}
                  >
                    Exclusive private listings shared only with qualified buyers in our network.
                  </p>
                  <span
                    className="expertise-card__cta inline-flex items-center"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#b9a06c",
                      position: "relative",
                      paddingBottom: "8px",
                      alignSelf: "flex-start",
                    }}
                  >
                    <span style={{ position: "relative" }}>
                      Request access →
                      <span
                        aria-hidden="true"
                        className="expertise-card__underline"
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: "-6px",
                          height: "1px",
                          width: "24px",
                          background: "#b9a06c",
                          transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-16">
              <Link to="/austin-luxury-homes-for-sale" className="cta-luxury">
                EXPLORE ALL LISTINGS
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
