import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  createFAQSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import heroImage from "@/assets/land-ranch-hero.jpg";
import editorialImage from "@/assets/land-ranch-editorial.jpg";
import catLuxuryRanches from "@/assets/cat-luxury-ranches.jpg";
import catRecreational from "@/assets/cat-recreational-land.jpg";
import catInvestment from "@/assets/cat-investment-acreage.jpg";
import catDevelopment from "@/assets/cat-development-opportunities.jpg";
import catHomesites from "@/assets/cat-hill-country-homesites.jpg";

const Footer = lazy(() => import("@/components/Footer"));
const LandRanchMap = lazy(() => import("@/components/LandRanchMap"));

const SITE = "https://www.echelonpropertygroup.com";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const categories = [
  {
    title: "Luxury Ranches",
    desc: "Large acreage estates featuring custom homes, water features, equestrian facilities, and recreational amenities.",
    image: catLuxuryRanches,
  },
  {
    title: "Recreational Land",
    desc: "Properties focused on hunting, fishing, wildlife habitat, trails, and outdoor recreation.",
    image: catRecreational,
  },
  {
    title: "Investment Acreage",
    desc: "Long-term land holdings positioned for appreciation and future growth.",
    image: catInvestment,
  },
  {
    title: "Development Opportunities",
    desc: "Properties with subdivision, redevelopment, commercial, or mixed-use potential.",
    image: catDevelopment,
  },
  {
    title: "Hill Country Homesites",
    desc: "Scenic parcels suited for custom residential construction.",
    image: catHomesites,
  },
];

const marketSnapshot = [
  { label: "Average Price Per Acre", value: "$48,200", note: "Central Texas, trailing 12 months" },
  { label: "Active Land Inventory", value: "1,840", note: "Listings across the region" },
  { label: "Median Days on Market", value: "112", note: "Land & acreage, current cycle" },
  { label: "12-Month Appreciation Trend", value: "+6.4%", note: "Year-over-year land values" },
];


const process = [
  {
    n: "01",
    title: "Property Analysis",
    desc: "Evaluate access, utilities, topography, floodplain, and improvements.",
  },
  {
    n: "02",
    title: "Highest & Best Use Review",
    desc: "Identify residential, recreational, agricultural, investment, or development potential.",
  },
  {
    n: "03",
    title: "Market Positioning",
    desc: "Analyze comparable sales, market demand, and land-specific trends.",
  },
  {
    n: "04",
    title: "Execution Strategy",
    desc: "Develop acquisition, disposition, or long-term hold recommendations.",
  },
];

const insights = [
  {
    to: "/blog/austin-infill-development",
    eyebrow: "Redevelopment",
    title: "Austin Infill Development: How to Evaluate, Plan, and Execute a Redevelopment Opportunity",
  },
  {
    to: "/blog/austin-redevelopment-opportunities",
    eyebrow: "Investment",
    title: "Austin Redevelopment Opportunities: How to Identify, Evaluate, and Act on Underutilized Property",
  },
  {
    to: "/blog/highest-and-best-use-property-austin",
    eyebrow: "Advisory",
    title: "How to Determine the Highest and Best Use of a Property in Austin",
  },
  {
    to: "/blog/austin-ranch-land-for-sale",
    eyebrow: "Land & Ranch",
    title: "Austin Ranch Land Guide: Acreage, Hill Country Opportunities, and Land Investment",
  },
];

const faqs = [
  {
    question: "How is ranch land valued in Texas?",
    answer:
      "Ranch land in Texas is valued based on a combination of location, topography, water availability, road frontage, agricultural or wildlife exemption status, improvements, and highest and best use. Recreational ranches often carry premiums for water features, mature live oaks, and views, while investment acreage is typically priced relative to growth corridors and future development potential.",
  },
  {
    question: "What impacts the value of acreage?",
    answer:
      "Key drivers include access (paved versus deeded easement), utility availability, surface and groundwater rights, floodplain coverage, soil and topography, fencing and improvements, proximity to growth corridors like Austin, Dripping Springs, and the Highway 290 West corridor, and current tax-valuation status. Smaller details like minerals, restrictions, and survey accuracy can also materially affect value.",
  },
  {
    question: "How do agricultural and wildlife exemptions affect value?",
    answer:
      "Agricultural and wildlife valuations significantly reduce annual property taxes by assessing land on productive capacity rather than market value. A property losing its exemption can see a sharp tax increase and a corresponding impact on resale value. Buyers and sellers should understand whether an existing exemption transfers, what activity is required to maintain it, and how rollback taxes may apply if the use changes.",
  },
  {
    question: "What is highest and best use?",
    answer:
      "Highest and best use is the analysis of what a property can legally, physically, and financially support that produces the greatest value. For land, this might mean keeping a property as a recreational ranch, repositioning it for residential development, subdividing into homesites, holding as investment acreage, or selling to a developer. The right answer is property specific and changes with the market.",
  },
  {
    question: "How do I determine development potential?",
    answer:
      "Development potential depends on zoning or county regulations, utility access, road frontage, topography, floodplain, environmental constraints, and surrounding land use. In Austin proper, the City's land development code and the HOME initiative materially affect what can be built. Outside city limits, county and ETJ rules, water and septic feasibility, and proximity to growth corridors drive feasibility.",
  },
  {
    question: "Should I sell land now or hold for future appreciation?",
    answer:
      "The right answer depends on your goals, holding costs, tax basis, current market conditions, and the property's specific position relative to growth. In Central Texas, certain corridors have appreciated meaningfully, while others remain early in their cycle. A proper analysis weighs current market value, future trajectory, carrying costs, and how the asset fits within your broader portfolio.",
  },
];

const LandRanch = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Ranch Land & Acreage for Sale"
        description="Explore ranch land, recreational property, investment acreage, development tracts, and legacy estates throughout Austin and the Texas Hill Country with Echelon Property Group."
        canonical="/land-ranch"
        ogType="website"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Search Properties", url: `${SITE}/search` },
          { name: "Land & Ranch", url: `${SITE}/land-ranch` },
        ])}
      />

      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(560px, 88vh, 880px)" }}>
        <img
          src={heroImage}
          alt="Texas Hill Country ranch land with rolling terrain, live oaks, a creek, and a private drive leading to a modern ranch home"
          className="absolute inset-0 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,15,36,0.48) 0%, rgba(12,15,36,0.30) 35%, rgba(12,15,36,0.10) 65%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 sm:hidden" style={{ background: "rgba(12,15,36,0.38)" }} />

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <p className="text-gold mb-5" style={labelStyle}>
                LAND & RANCH
              </p>
              <h1
                className="font-display font-normal text-white leading-[1.05] tracking-tight mb-7"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
              >
                Austin Land & Ranch Opportunities
              </h1>
              <p
                className="text-white/85 leading-relaxed mb-10 max-w-xl"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
              >
                From legacy ranches and recreational retreats to investment acreage and development
                tracts, Echelon helps buyers, sellers, and investors evaluate Central Texas land
                through both current value and future potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-8 py-4 transition-colors duration-300"
                  style={labelStyle}
                >
                  Explore Land Opportunities
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border border-white/60 hover:border-gold hover:text-gold text-white px-8 py-4 transition-colors duration-300 backdrop-blur-sm"
                  style={labelStyle}
                >
                  Request a Property Evaluation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── SECTION 2: DIFFERENT EXPERTISE ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
            <div className="md:col-span-5">
              <p className="text-gold mb-5" style={labelStyle}>
                ADVISORY
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
                Land Requires a Different Level of Expertise
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5 text-muted-foreground leading-relaxed text-[1.0625rem]">
              <p>
                Unlike traditional residential real estate, land value is often driven by factors that
                aren't immediately visible. Water availability, topography, access, utilities,
                development potential, wildlife exemptions, agricultural valuation, frontage, and
                highest-and-best-use analysis can dramatically impact value.
              </p>
              <p>
                Whether evaluating a recreational ranch, investment acreage, redevelopment tract, or
                future homesite, understanding the underlying opportunity is critical.
              </p>
              <div className="pt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors"
                  style={labelStyle}
                >
                  Speak With an Advisor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CATEGORIES ──────────────────────── */}
      <section id="categories" className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              PROPERTY CATEGORIES
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              The Spectrum of Central Texas Land
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {categories.map((c, i) => (
              <div
                key={c.title}
                className="bg-background p-8 md:p-10 flex flex-col"
                style={i === categories.length - 1 ? { gridColumn: "auto" } : {}}
              >
                <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                  0{i + 1}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-normal text-architectural mb-4">
                  {c.title}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/images/parallax-ranch.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* ── SECTION 4: MAP ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              COVERAGE
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-5">
              Where We Work
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Echelon advises on land and ranch opportunities across Austin and the Texas Hill Country,
              with active focus throughout the corridors below.
            </p>
          </div>
          <Suspense fallback={<div className="w-full h-[440px] md:h-[600px] bg-secondary/40" />}>
            <LandRanchMap />
          </Suspense>
        </div>
      </section>

      {/* ── SECTION 5: PROCESS ──────────────────────── */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              ADVISORY PROCESS
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
              How We Evaluate Land Opportunities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {process.map((step) => (
              <div key={step.n} className="bg-background p-8 md:p-10">
                <p className="font-display text-3xl text-gold mb-5" style={{ letterSpacing: "0.05em" }}>
                  {step.n}
                </p>
                <h3 className="font-display text-xl font-normal text-architectural mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX BREAK ──────────────────────── */}
      <div
        className="parallax-break hidden md:block"
        style={{ backgroundImage: "url('/images/parallax-pasture.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties}
        aria-hidden="true"
      />


      {/* ── SECTION 6: INSIGHTS ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-6xl">
            <div>
              <p className="text-gold mb-5" style={labelStyle}>
                INSIGHTS
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1]">
                Land & Ranch Insights
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors self-start md:self-auto"
              style={labelStyle}
            >
              View All Insights →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {insights.map((post) => (
              <Link
                key={post.to}
                to={post.to}
                className="group bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-secondary/30"
              >
                <p className="text-gold mb-4" style={{ ...labelStyle, fontSize: "0.55rem" }}>
                  {post.eyebrow}
                </p>
                <h3 className="font-display text-xl md:text-[1.4rem] font-normal text-architectural leading-snug group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="mt-6 text-foreground/70 group-hover:text-gold transition-colors" style={labelStyle}>
                  Read →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: SELLER CTA ──────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#0C0F24" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold mb-6" style={labelStyle}>
              LAND OWNERS
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-normal text-white leading-[1.1] mb-8">
              Curious What Your Land Is Really Worth?
            </h2>
            <p className="text-white/65 leading-relaxed mb-12 text-lg max-w-2xl mx-auto">
              Many owners evaluate their property based on current use. The market often values land
              based on future potential. Understanding the difference can materially impact decisions
              regarding a sale, hold strategy, or redevelopment opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Request a Land Evaluation
              </Link>
              <Link
                to="/austin-land-development-opportunities"
                className="inline-flex items-center justify-center border border-white/40 hover:border-gold hover:text-gold text-white px-8 py-4 transition-colors duration-300"
                style={labelStyle}
              >
                Discuss Development Potential
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold mb-5 text-center" style={labelStyle}>
              FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-architectural leading-[1.1] mb-14 text-center">
              Land & Ranch Questions
            </h2>
            <div className="divide-y divide-[rgba(12,15,36,0.1)] border-t border-b border-[rgba(12,15,36,0.1)]">
              {faqs.map((f) => (
                <details key={f.question} className="group py-7">
                  <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                    <h3 className="font-display text-lg md:text-xl font-normal text-architectural group-hover:text-gold transition-colors">
                      {f.question}
                    </h3>
                    <span
                      className="shrink-0 text-gold mt-1 transition-transform duration-300 group-open:rotate-45"
                      style={{ fontSize: "1.25rem", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-5 text-muted-foreground leading-relaxed text-[1rem] max-w-3xl">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandRanch;
