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
    name: "Downtown Austin",
    slug: "downtown-austin",
    meta: "Skyline · Walkable",
    insight:
      "Vertical living, walkability, skyline energy, and lock-and-leave convenience.",
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
  const secondaryScenes = SCENES.slice(1);

  return (
    <section aria-labelledby="ame-heading" className="relative bg-background">
      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
            EXPLORE THE MARKET
          </p>
          <h2
            id="ame-heading"
            className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-display font-normal text-architectural leading-[1.1] tracking-[0.02em] mb-5"
          >
            Austin Is Not <span className="text-gold italic">One Market</span>
          </h2>
          <p
            className="text-muted-foreground mx-auto leading-[1.7] max-w-2xl"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "15px",
              letterSpacing: "0.015em",
            }}
          >
            Each neighborhood carries its own rhythm, constraints, buyer
            psychology, and long-term value profile. Echelon helps clients read
            those differences before making a move.
          </p>
        </div>
      </div>

      <div className="bg-[hsl(222_40%_8%)] py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-6 lg:gap-8 max-w-[1320px] mx-auto">
            <Link
              to={`/communities/${featured.slug}`}
              className="group relative block overflow-hidden bg-primary min-h-[520px] md:min-h-[620px]"
              aria-label={`Explore ${featured.name}`}
            >
              <img
                src={featured.image}
                alt={`${featured.name}, Austin`}
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,11,26,0.24) 0%, rgba(8,11,26,0.28) 42%, rgba(8,11,26,0.88) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                <p
                  className="text-gold mb-4"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  {featured.index} · {featured.meta}
                </p>
                <h3
                  className="font-display text-warm-cream leading-[1.02] mb-5"
                  style={{
                    fontSize: "clamp(44px, 6vw, 86px)",
                    fontWeight: 400,
                    textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                  }}
                >
                  {featured.name}
                </h3>
                <p
                  className="text-warm-cream/86 max-w-[560px] leading-[1.65] mb-7"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "16px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {featured.insight}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-warm-cream"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #b9a06c",
                    paddingBottom: 4,
                  }}
                >
                  Advisory On {featured.name} <span className="text-gold">→</span>
                </span>
              </div>
            </Link>

            <div className="bg-[hsl(222_40%_8%)] border border-white/10 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <p
                  className="text-gold mb-5"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  Austin Market Explorer
                </p>
                <h3
                  className="font-display text-warm-cream leading-[1.08] mb-6"
                  style={{ fontSize: "clamp(30px, 3vw, 44px)", fontWeight: 400 }}
                >
                  Five micro-markets. Five different decisions.
                </h3>
                <p
                  className="text-warm-cream/72 leading-[1.75] mb-8"
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

              <div className="space-y-4">
                {secondaryScenes.map((scene) => (
                  <Link
                    key={scene.slug}
                    to={`/communities/${scene.slug}`}
                    className="group grid grid-cols-[92px_1fr] gap-4 border-t border-white/10 pt-4"
                  >
                    <div className="relative overflow-hidden bg-primary" style={{ aspectRatio: "4 / 3" }}>
                      <img
                        src={scene.image}
                        alt={`${scene.name}, Austin`}
                        width={320}
                        height={240}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-78 transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-primary/25" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-gold mb-1"
                        style={{
                          fontFamily: '"Jost", sans-serif',
                          fontSize: "9.5px",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                        }}
                      >
                        {scene.index} · {scene.meta}
                      </p>
                      <h4
                        className="font-display text-warm-cream mb-1 transition-colors duration-300 group-hover:text-gold"
                        style={{ fontSize: "22px", fontWeight: 400 }}
                      >
                        {scene.name}
                      </h4>
                      <p
                        className="text-warm-cream/62 leading-[1.55]"
                        style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px" }}
                      >
                        {scene.insight}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-[1320px] mx-auto mt-8 flex flex-col sm:flex-row items-start gap-4">
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
    </section>
  );
};

export default AustinMarketExplorer;
