import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
const blogRollingwoodVsWestlake = new URL("../assets/blog-rollingwood-vs-westlake.jpg", import.meta.url).href;
const blogTarrytownVsBrykerWoods = new URL("../assets/tarrytown-bryker-woods.avif", import.meta.url).href;
const blogLakeAustinVsLakeTravis = new URL("../assets/lake-travis-sunset.jpg", import.meta.url).href;
const blogWhatIsPrivateListing = new URL("../assets/blog-what-is-private-listing-hero.webp", import.meta.url).href;

/* LOCKED: This section is frozen. Do not add, remove, or reorder blog cards. */
const insights = [
  { to: "/blog/austin-luxury-real-estate-market-forecast", title: "Austin Luxury Market Forecast", excerpt: "Expert analysis of pricing trends, inventory, and investment outlook across Austin's luxury segments.", category: "Market" },
  { to: "/blog/best-luxury-neighborhoods-austin-texas", title: "LUXURY LIVING", excerpt: "A comprehensive guide to Austin's most prestigious communities and what makes each one unique.", category: "Neighborhoods" },
  { to: "/blog/top-investment-neighborhoods-austin", title: "Top Investment Neighborhoods", excerpt: "Data-driven analysis of appreciation trends, rental yields, and growth potential across Austin.", category: "Investment" },
  { to: "/blog/best-waterfront-homes-austin", title: "Best Waterfront Homes in Austin", excerpt: "Lake Austin estates, Lake Travis retreats, and what to know before buying waterfront property.", category: "Waterfront" },
  { to: "/blog/moving-to-austin-texas-from-california", title: "Moving to Austin from California", excerpt: "Everything California residents need to know about relocating, taxes, neighborhoods, and lifestyle.", category: "Relocation" },
  { to: "/blog/moving-from-new-york-to-austin", title: "Moving from New York to Austin", excerpt: "An honest, advisor-level guide for affluent New Yorkers relocating to Austin: tax tradeoffs, the luxury neighborhoods buyers actually choose, school realities, and the lifestyle factors that matter at the top of the market.", category: "Relocation" },
  { to: "/blog/austin-property-taxes-explained", title: "Austin Property Taxes Explained", excerpt: "Rates, exemptions, protest strategies, and how property taxes affect luxury real estate decisions.", category: "Taxes" },
  { to: "/blog/austin-ranch-land-for-sale", title: "Austin Ranch Land for Sale", excerpt: "A complete guide to Austin ranch land, Hill Country properties, investment land, acreage ownership, agricultural and wildlife exemptions, and Austin-area growth corridors shaping long-term value across Central Texas.", category: "Land & Ranch" },
  { to: "/blog/texas-homestead-exemption-travis-county", title: "Texas Homestead Exemption: Travis County Guide", excerpt: "The 2026 $140,000 school exemption, the City and county 20% exemptions, and the 10% appraisal cap, explained.", category: "Ownership" },
] as const;

const InsightsSection = () => (
  <section id="insights-section" className="bg-secondary" style={{ padding: "clamp(64px, 10vw, 120px) 0 clamp(32px, 5vw, 56px)" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-10 h-px mx-auto mb-5" style={{ background: "hsl(38 39% 61%)" }} />
            <p className="text-minimal text-gold mb-5">{"\n"}</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal text-foreground/90 leading-[1.1] tracking-[0.03em]">
              Insights & Market Intelligence
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger={70}>
          <div className="grid auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article) => (
              <Link key={article.to} to={article.to} className="group flex h-[300px] md:h-[320px] bg-card border border-border/30 overflow-hidden
                shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-[500ms] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
                <div className="p-7 flex flex-col h-full">
                  <p className="text-gold mb-2.5" style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>{article.category}</p>
                  <h3 className="font-display text-[17px] font-medium text-foreground/90 mb-3 leading-[1.35] group-hover:text-gold transition-colors duration-[400ms] tracking-[0.01em] line-clamp-2 min-h-[2.8rem]">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground/70 text-[13.5px] leading-[1.85] flex-1 line-clamp-3" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>{article.excerpt}</p>
                  <span className="mt-5 text-gold group-hover:text-gold transition-colors duration-[400ms]" style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>
                    READ MORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/blog" className="cta-luxury">
              EXPLORE ALL INSIGHTS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const editorialArticles = [
  {
    title: "Rollingwood vs West Lake Hills",
    description: "How two of Austin's most prestigious neighborhoods compare for luxury buyers.",
    image: blogRollingwoodVsWestlake,
    href: "/blog/rollingwood-vs-westlake-hills",
  },
  {
    title: "Tarrytown vs Bryker Woods",
    description: "A closer look at Austin's most sought-after 78703 neighborhoods.",
    image: blogTarrytownVsBrykerWoods,
    href: "/blog/tarrytown-vs-bryker-woods",
  },
  {
    title: "Lake Austin vs Lake Travis",
    description: "Waterfront lifestyles compared, proximity, pricing, and daily experience.",
    image: blogLakeAustinVsLakeTravis,
    href: "/blog/lake-austin-vs-lake-travis",
  },
  {
    title: "What Is a Private Listing in Real Estate?",
    description: "How off-market and private listings actually work in Austin's upper market.",
    image: blogWhatIsPrivateListing,
    href: "/blog/what-is-private-listing-in-real-estate",
  },
];

const EditorialInsights = () => (
  <section className="bg-background" style={{ padding: "clamp(72px, 10vw, 130px) 0" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1240px] mx-auto">
        {/* Editorial masthead */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4 md:gap-5 mb-6" aria-hidden="true">
              <span className="block h-px w-10 md:w-14 bg-[#b9a06c]" />
              <span className="block w-1.5 h-1.5 rotate-45 border border-[#b9a06c]" />
              <span className="block h-px w-10 md:w-14 bg-[#b9a06c]" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <p
              className="text-gold mb-6"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
              }}
            >
              The Journal &nbsp;·&nbsp; Issue No. 01
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2
              className="font-display font-normal text-architectural mb-6"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                lineHeight: 1.04,
                letterSpacing: "0.015em",
              }}
            >
              Real Estate, <span className="italic">Studied.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p
              className="text-muted-foreground max-w-[42rem] mx-auto"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.8,
                letterSpacing: "0.005em",
              }}
            >
              Field notes, neighborhood comparisons, and considered analysis from the
              upper end of Austin's market, written for buyers and sellers who expect
              more than headlines.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 md:gap-x-10">
          {editorialArticles.map((article, i) => (
            <ScrollReveal key={article.href} delay={i * 90} className="h-full">
              <Link to={article.href} className="group flex flex-col h-full">
                {/* Index marker + hairline */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-gold"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.32em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="flex-1 h-px bg-[#b9a06c]/40" />
                </div>

                {/* Image, taller, more editorial proportion with gentle zoom */}
                <div className="aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={article.image}
                    alt={`${article.title}, Austin luxury real estate`}
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Eyebrow category */}
                <p
                  className="text-muted-foreground/80 mb-3"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  Field Notes
                </p>

                <h3
                  className="font-display font-normal text-architectural mb-3 transition-colors duration-300 group-hover:text-gold"
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: 1.22,
                    letterSpacing: "0.01em",
                  }}
                >
                  {article.title}
                </h3>

                <p
                  className="text-muted-foreground mb-5 flex-1"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 300,
                    fontSize: "13.5px",
                    lineHeight: 1.7,
                  }}
                >
                  {article.description}
                </p>

                {/* Read affordance, animated underline */}
                <span
                  className="inline-flex items-center gap-2 text-gold"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.66rem",
                    fontWeight: 500,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                  }}
                >
                  <span className="relative">
                    Read Insight
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-1 h-px bg-[#b9a06c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ width: "100%" }}
                    />
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer rule + "View Journal" link */}
        <ScrollReveal delay={120}>
          <div className="mt-20 md:mt-24 flex flex-col items-center">
            <span aria-hidden="true" className="block h-px w-24 bg-[#b9a06c] mb-8" />
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 text-architectural hover:text-gold transition-colors duration-300"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
              }}
            >
              <span className="relative">
                Explore the Journal
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-px bg-[#b9a06c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ width: "100%" }}
                />
              </span>
              <span aria-hidden="true" className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export { InsightsSection, EditorialInsights };
