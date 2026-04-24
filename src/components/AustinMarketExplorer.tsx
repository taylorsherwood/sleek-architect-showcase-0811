import { Link } from "react-router-dom";

type Scene = {
  name: string;
  slug: string;
  meta: string;
  insight: string;
  image: string;
  index: string;
};

const SCENES: Scene[] = [
  {
    index: "01",
    name: "Westlake",
    slug: "westlake-hills",
    meta: "Hill Country · Eanes ISD",
    insight:
      "Estate privacy, topographical scarcity, and long-term luxury demand.",
    image: "/static-assets/community-westlake-hills.webp",
  },
  {
    index: "02",
    name: "Tarrytown",
    slug: "tarrytown",
    meta: "Central Austin · Heritage",
    insight:
      "Central Austin heritage, quiet streets, and enduring resale strength.",
    image: "/static-assets/community-tarrytown.webp",
  },
  {
    index: "03",
    name: "Downtown",
    slug: "downtown-austin",
    meta: "Skyline · Walkable",
    insight:
      "Vertical living, walkability, and lock-and-leave convenience.",
    image: "/static-assets/community-downtown.webp",
  },
  {
    index: "04",
    name: "Lake Austin",
    slug: "lake-austin",
    meta: "Waterfront · Private Access",
    insight: "Waterfront scarcity, private access, and lifestyle-driven value.",
    image: "/static-assets/community-lake-austin.webp",
  },
  {
    index: "05",
    name: "Barton Creek",
    slug: "barton-creek",
    meta: "Gated · Golf · Resort",
    insight:
      "Gated privacy, acreage feel, golf access, and resort-style living.",
    image: "/static-assets/community-barton-creek.webp",
  },
];

const AustinMarketExplorer = () => {
  const featured = SCENES[0];
  const secondary = SCENES.slice(1);

  return (
    <section
      aria-labelledby="ame-heading"
      className="relative bg-[hsl(222_40%_8%)] text-warm-cream"
    >
      {/* Editorial intro — tight, centered, no boxy chrome */}
      <div className="px-6 pt-20 md:pt-28 pb-10 md:pb-14">
        <div className="max-w-[760px] mx-auto text-center">
          <p
            className="text-gold mb-5"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Explore The Market
          </p>
          <h2
            id="ame-heading"
            className="font-display font-normal text-warm-cream leading-[1.05] tracking-[0.015em] mb-6"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)" }}
          >
            Austin Is Not <span className="text-gold italic">One Market</span>
          </h2>
          <div className="w-10 h-px bg-gold/60 mx-auto mb-6" />
          <p
            className="text-warm-cream/72 mx-auto leading-[1.75]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "15px",
              letterSpacing: "0.012em",
              maxWidth: "620px",
            }}
          >
            Each neighborhood carries its own rhythm, constraints, buyer
            psychology, and long-term value profile. Echelon helps clients read
            those differences before making a move.
          </p>
        </div>
      </div>

      {/* Full-bleed editorial composition */}
      <div className="px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="max-w-[1480px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-4 md:gap-6">
            {/* Featured — large cinematic frame */}
            <Link
              to={`/communities/${featured.slug}`}
              className="group relative block overflow-hidden lg:col-span-8 min-h-[460px] md:min-h-[600px] lg:min-h-[680px]"
              aria-label={`Explore ${featured.name}`}
            >
              <img
                src={featured.image}
                alt={`${featured.name}, Austin`}
                width={1600}
                height={1100}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,11,26,0.10) 0%, rgba(8,11,26,0.20) 45%, rgba(8,11,26,0.86) 100%)",
                }}
              />
              {/* Top index marker */}
              <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-3">
                <span className="w-8 h-px bg-gold" />
                <span
                  className="text-gold"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                  }}
                >
                  {featured.index} · Featured Market
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-12 lg:p-14">
                <p
                  className="text-warm-cream/80 mb-3"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  {featured.meta}
                </p>
                <h3
                  className="font-display text-warm-cream leading-[1.0] mb-5"
                  style={{
                    fontSize: "clamp(48px, 6.4vw, 96px)",
                    fontWeight: 400,
                    letterSpacing: "0.005em",
                    textShadow: "0 2px 22px rgba(0,0,0,0.45)",
                  }}
                >
                  {featured.name}
                </h3>
                <p
                  className="text-warm-cream/85 max-w-[560px] leading-[1.65] mb-6"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "16px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {featured.insight}
                </p>
                <span
                  className="inline-flex items-center gap-3 text-warm-cream"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #b9a06c",
                    paddingBottom: 5,
                  }}
                >
                  Advisory On {featured.name}{" "}
                  <span className="text-gold">→</span>
                </span>
              </div>
            </Link>

            {/* Secondary stack — image-led, no boxes */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              {secondary.map((scene) => (
                <Link
                  key={scene.slug}
                  to={`/communities/${scene.slug}`}
                  className="group relative block overflow-hidden min-h-[200px] md:min-h-[240px] lg:min-h-[158px]"
                  aria-label={`Explore ${scene.name}`}
                >
                  <img
                    src={scene.image}
                    alt={`${scene.name}, Austin`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8,11,26,0.20) 0%, rgba(8,11,26,0.35) 50%, rgba(8,11,26,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p
                      className="text-gold mb-1.5"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9.5px",
                        letterSpacing: "0.26em",
                        textTransform: "uppercase",
                      }}
                    >
                      {scene.index} · {scene.meta}
                    </p>
                    <h4
                      className="font-display text-warm-cream leading-[1.05] transition-colors duration-300 group-hover:text-gold"
                      style={{
                        fontSize: "clamp(22px, 2vw, 28px)",
                        fontWeight: 400,
                      }}
                    >
                      {scene.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Editorial closing band — no card chrome */}
          <div className="mt-12 md:mt-16 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end border-t border-white/10 pt-10 md:pt-12">
            <div className="max-w-[640px]">
              <p
                className="text-gold mb-3"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                Five Micro-Markets · Five Decisions
              </p>
              <p
                className="text-warm-cream/72 leading-[1.75]"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "15px",
                  letterSpacing: "0.01em",
                }}
              >
                The right Austin property strategy changes by school district,
                terrain, walkability, waterfront scarcity, privacy, and
                long-term liquidity. Start with the market, then choose the
                property.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/communities"
                className="inline-block text-center px-7 py-[14px]"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "2px solid #b9a06c",
                  color: "#fff",
                  background: "#b9a06c",
                }}
              >
                Explore Austin Communities
              </Link>
              <Link
                to="/austin-luxury-homes-for-sale"
                className="inline-block text-center px-7 py-[14px]"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#fff",
                  background: "transparent",
                }}
              >
                View Active Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AustinMarketExplorer;
