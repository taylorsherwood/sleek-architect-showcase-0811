import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import commercialMusicLane from "@/assets/commercial-music-lane-austin.jpg";
import luxuryHomesKitchen from "@/assets/luxury-homes-austin-kitchen.webp";
import paseoInvestment from "@/assets/paseo-downtown-austin-investment.jpg";

const expertiseBlocks = [
  {
    eyebrow: "RESIDENTIAL",
    title: "Luxury homes",
    description: "Lakefront estates, hilltop mansions, and gated golf communities across Austin's most exclusive enclaves.",
    link: "/austin-luxury-homes-for-sale",
    linkText: "Explore",
    image: luxuryHomesKitchen,
    alt: "Modern Austin luxury home interior with chef's kitchen and open living space",
  },
  {
    eyebrow: "LAND & ENTITLEMENT",
    title: "Land development",
    description: "Raw acreage, entitled parcels, and development-ready sites across high-growth corridors.",
    link: "/land-for-sale-austin",
    linkText: "View land",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    alt: "Aerial view of rolling Texas Hill Country acreage",
  },
  {
    eyebrow: "COMMERCIAL",
    title: "Commercial real estate",
    description: "Multifamily, retail, office, and mixed-use across the metro — tenant rep to acquisitions.",
    link: "/austin-commercial-real-estate",
    linkText: "Explore commercial",
    image: commercialMusicLane,
    alt: "Music Lane mixed-use development on South Congress with downtown Austin skyline",
  },
  {
    eyebrow: "INVESTMENT ADVISORY",
    title: "Investment property",
    description: "Income-producing assets and value-add opportunities, underwritten to institutional standards.",
    link: "/austin-real-estate-investment",
    linkText: "View investments",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern multifamily architectural portfolio property",
  },
];

const ExpertiseSection = () => {
  return (
    <section
      className="bg-background"
      style={{ padding: "clamp(80px, 12vw, 120px) 0" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
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
                What We Do
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
                Four practices. One standard.
              </h2>
              <div
                aria-hidden="true"
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#b9a06c",
                  margin: "0 auto",
                }}
              />
            </div>
          </ScrollReveal>

          {/* Cinematic image-led grid */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
            {expertiseBlocks.map((block, index) => (
              <ScrollReveal key={block.title} delay={index * 100}>
                <Link
                  to={block.link}
                  className="expertise-card group relative block w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 5" }}
                  aria-label={`${block.title} — ${block.linkText}`}
                >
                  {/* Background image */}
                  <img
                    src={block.image}
                    alt={block.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.08) 100%)",
                    }}
                  />

                  {/* Hover darkening overlay */}
                  <div
                    aria-hidden="true"
                    className="expertise-card__darken absolute inset-0 opacity-0 transition-opacity duration-700"
                    style={{ background: "rgba(10,10,12,0.14)" }}
                  />

                  {/* Content (bottom-left) */}
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
                      {block.eyebrow}
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
                      {block.title}
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
                      {block.description}
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
                        {block.linkText} →
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
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .expertise-card:hover img { transform: scale(1.04); }
        .expertise-card:hover .expertise-card__darken { opacity: 1; }
        .expertise-card:hover .expertise-card__underline { width: 60px; }
        @media (max-width: 767px) {
          .expertise-card { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>
    </section>
  );
};

export default ExpertiseSection;
