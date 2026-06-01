import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import heroImg from "@/assets/land-development-hero.jpg";
import masterplanImg from "@/assets/land-development-masterplan.jpg";
import datacenterImg from "@/assets/land-development-datacenter.jpg";
import industrialImg from "@/assets/land-development-industrial.jpg";
import corridorImg from "@/assets/land-development-corridor.jpg";

const Footer = lazy(() => import("@/components/Footer"));

const SITE = "https://www.echelonpropertygroup.com";
const GOLD = "#b9a06c";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const opportunities = [
  {
    title: "Residential Development",
    body: "Master planned communities, subdivisions, build-to-rent, and housing-focused land opportunities.",
    image: masterplanImg,
  },
  {
    title: "Industrial & IOS",
    body: "Industrial outdoor storage, contractor yards, logistics, and industrial land.",
    image: industrialImg,
  },
  {
    title: "Data Center Sites",
    body: "Power, fiber, water availability, and large-scale infrastructure requirements.",
    image: datacenterImg,
  },
  {
    title: "Mixed-Use Development",
    body: "Retail, residential, hospitality, and commercial development opportunities.",
    image: masterplanImg,
  },
  {
    title: "Strategic Land Banking",
    body: "Properties positioned along future growth corridors and infrastructure expansion.",
    image: corridorImg,
  },
  {
    title: "Utility & Infrastructure Corridors",
    body: "Land influenced by transmission, transportation, utility, and public infrastructure projects.",
    image: corridorImg,
  },
];

const framework = [
  {
    title: "Utility Availability",
    body: "Water, wastewater, electric capacity, gas, and telecom infrastructure.",
  },
  {
    title: "Access & Frontage",
    body: "Road frontage, ingress, egress, and transportation connectivity.",
  },
  {
    title: "Future Land Use",
    body: "Comprehensive plans, zoning direction, and growth policy.",
  },
  {
    title: "Development Feasibility",
    body: "Site constraints, topography, floodplain exposure, and buildability.",
  },
  {
    title: "Market Positioning",
    body: "Supply, demand, absorption, and long-term viability.",
  },
  {
    title: "Highest & Best Use",
    body: "The long-term opportunity rather than the current condition.",
  },
];

const corridors = [
  { name: "SH 130 Corridor", note: "Eastern logistics & industrial spine" },
  { name: "East Austin", note: "Infill redevelopment & mixed-use" },
  { name: "Manor", note: "Residential & employment growth" },
  { name: "Elgin", note: "Path-of-growth acreage" },
  { name: "Hutto", note: "Industrial & residential expansion" },
  { name: "Georgetown", note: "Master planned & commercial" },
  { name: "Liberty Hill", note: "Residential development frontier" },
  { name: "Leander", note: "Transit-adjacent growth" },
  { name: "Kyle", note: "South corridor housing demand" },
  { name: "Buda", note: "Mixed-use & industrial momentum" },
  { name: "San Marcos", note: "I-35 corridor positioning" },
  { name: "Bastrop", note: "Eastern growth & infrastructure" },
];

const audience = [
  "Developers",
  "Builders",
  "Family Offices",
  "Private Investors",
  "Landowners",
  "Infrastructure & Industrial Users",
];

const timeline = [
  "Raw Land",
  "Entitlement",
  "Infrastructure",
  "Development",
  "Value Creation",
];

const LandDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Land Development & Strategic Acreage in Austin"
        description="Strategic advisory for landowners, investors, developers, and family offices evaluating land development, data center sites, industrial, and path-of-growth acreage across Austin and Central Texas."
        canonical="/land-development"
        ogType="website"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Land Development", url: `${SITE}/land-development` },
        ])}
      />

      <Navigation />
      <div className="h-32 md:h-28 lg:h-[6.5rem]" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative w-full h-[600px] sm:min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] overflow-hidden bg-primary">
        <img
          src={heroImg}
          alt="Aerial view of a Central Texas growth corridor with infrastructure and the Austin skyline in the distance"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.12] sm:scale-100"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,15,36,0.62) 0%, rgba(12,15,36,0.40) 40%, rgba(12,15,36,0.18) 75%, rgba(12,15,36,0.10) 100%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,15,36,0.74) 0%, rgba(12,15,36,0.56) 46%, rgba(12,15,36,0.32) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full items-end md:items-center pb-12 md:pb-0">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl text-white">
              <p className="mb-4 md:mb-6" style={{ ...labelStyle, color: GOLD }}>
                Land Development &mdash; Central Texas
              </p>
              <h1
                className="font-normal leading-[1.06] mb-5 md:mb-7"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.85rem, 4.6vw, 3.6rem)",
                  letterSpacing: "0.005em",
                  textShadow:
                    "0 2px 22px rgba(0,0,0,0.42), 0 1px 2px rgba(0,0,0,0.45)",
                }}
              >
                Land Development &<br />Strategic Acreage
              </h1>
              <p
                className="text-white/85 leading-relaxed max-w-2xl mb-7 md:mb-10"
                style={{
                  fontFamily: "'Jost', sans-serif',",
                  fontSize: "clamp(0.98rem, 1.15vw, 1.12rem)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                }}
              >
                Evaluating land through infrastructure, entitlement potential,
                utility access, market demand, and future land use.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-white transition-colors duration-300 hover:bg-[hsl(var(--gold-deep))]"
                  style={{ ...labelStyle, backgroundColor: GOLD }}
                >
                  Discuss a Development Opportunity
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-white border border-white/70 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                  style={labelStyle}
                >
                  Request a Site Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* ── SECTION 2: WHAT CAN THIS PROPERTY BECOME ───────────────── */}
      <section className="bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              The Question Is Not What the Land Is Today
            </p>
            <h2
              className="text-foreground font-normal leading-[1.1] mb-7 md:mb-9"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              }}
            >
              What Can This Property Become?
            </h2>
            <div
              className="text-foreground/75 leading-relaxed space-y-5 max-w-2xl"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.02rem" }}
            >
              <p>
                The most valuable development opportunities are often identified
                long before construction begins.
              </p>
              <p>
                Value is frequently created through infrastructure, utility
                availability, entitlement strategy, access, timing, and future
                market demand.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 md:mt-16">
            <div className="hidden md:grid grid-cols-9 items-center gap-0">
              {timeline.map((step, i) => (
                <>
                  <div
                    key={step}
                    className="col-span-1 flex flex-col items-center text-center"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full mb-4"
                      style={{ backgroundColor: GOLD }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-foreground"
                      style={{
                        ...labelStyle,
                        fontSize: "0.66rem",
                        letterSpacing: "0.26em",
                      }}
                    >
                      {step}
                    </p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div
                      className="col-span-1 h-px"
                      style={{ backgroundColor: "rgba(185,160,108,0.45)" }}
                      aria-hidden="true"
                    />
                  )}
                </>
              ))}
            </div>

            {/* Mobile timeline */}
            <ol className="md:hidden space-y-4 border-l border-[rgba(185,160,108,0.45)] pl-5">
              {timeline.map((step) => (
                <li key={step} className="relative">
                  <span
                    className="absolute -left-[27px] top-2 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: GOLD }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-foreground"
                    style={{
                      ...labelStyle,
                      fontSize: "0.7rem",
                      letterSpacing: "0.28em",
                    }}
                  >
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 3: DEVELOPMENT OPPORTUNITIES WE EVALUATE ────────── */}
      <section className="bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              What We Evaluate
            </p>
            <h2
              className="text-foreground font-normal leading-[1.1]"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              }}
            >
              Development Opportunities We Evaluate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {opportunities.map((o) => (
              <article
                key={o.title}
                className="group relative overflow-hidden rounded-[2px] bg-primary"
                style={{ height: "clamp(280px, 22vw, 340px)" }}
              >
                <img
                  src={o.image}
                  alt={`${o.title} in Central Texas`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,15,36,0.88) 0%, rgba(12,15,36,0.52) 48%, rgba(12,15,36,0.08) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                  <h3
                    className="font-normal leading-[1.15] mb-3"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.15rem",
                    }}
                  >
                    {o.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 mb-3 origin-left transition-transform duration-700 ease-out group-hover:scale-x-[2.4]"
                    style={{ backgroundColor: GOLD }}
                  />
                  <p
                    className="text-white/85 leading-[1.55] max-w-[42ch]"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.88rem",
                    }}
                  >
                    {o.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 4: FRAMEWORK / WHAT WE EVALUATE ────────────────── */}
      <section className="bg-[hsl(var(--surface,40_15%_96%))]" style={{ backgroundColor: "#F2EFEA" }}>
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              The Evaluation Framework
            </p>
            <h2
              className="text-foreground font-normal leading-[1.1]"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              }}
            >
              How We Evaluate Land
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-y-14">
            {framework.map((f, i) => (
              <div key={f.title} className="max-w-sm">
                <p
                  className="mb-3"
                  style={{
                    ...labelStyle,
                    color: GOLD,
                    fontSize: "0.62rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="text-foreground font-normal leading-[1.2] mb-3"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.2rem",
                  }}
                >
                  {f.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="block h-px w-8 mb-4"
                  style={{ backgroundColor: GOLD }}
                />
                <p
                  className="text-foreground/72 leading-[1.6]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.95rem",
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 5: AUSTIN GROWTH CORRIDORS ───────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden">
        <img
          src={corridorImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.92) 0%, rgba(12,15,36,0.86) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              Where Growth Is Moving
            </p>
            <h2
              className="font-normal leading-[1.1] mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              }}
            >
              Austin Growth Corridors
            </h2>
            <p
              className="text-white/75 leading-relaxed max-w-2xl"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem" }}
            >
              A view of Central Texas through the lens of infrastructure
              expansion, employment migration, and long-term development
              activity rather than neighborhood lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
            {corridors.map((c) => (
              <div
                key={c.name}
                className="group bg-primary p-5 md:p-6 transition-colors duration-500 hover:bg-[rgba(185,160,108,0.08)]"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className="mt-2 inline-block h-px w-5 flex-shrink-0"
                    style={{ backgroundColor: GOLD }}
                    aria-hidden="true"
                  />
                  <h3
                    className="text-white font-normal leading-[1.2]"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.98rem",
                    }}
                  >
                    {c.name}
                  </h3>
                </div>
                <p
                  className="text-white/65 leading-[1.5] pl-8"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.8rem",
                  }}
                >
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 6: PRIVATE OPPORTUNITIES ───────────────────── */}
      <section className="bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-6" style={{ ...labelStyle, color: GOLD }}>
              Private Opportunities
            </p>
            <h2
              className="text-foreground font-normal leading-[1.12] mb-8"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.55rem, 3.2vw, 2.5rem)",
              }}
            >
              Many Development Opportunities<br className="hidden md:block" />{" "}
              Never Reach Public Marketing
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto block h-px w-12 mb-8"
              style={{ backgroundColor: GOLD }}
            />
            <p
              className="text-foreground/72 leading-[1.7] max-w-2xl mx-auto"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.02rem" }}
            >
              Some of the most compelling development sites change hands through
              private introductions, direct landowner relationships, investor
              networks, and broker-to-broker collaboration rather than public
              listing platforms.
            </p>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 7: WHO WE WORK WITH ───────────────────── */}
      <section className="bg-background border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
                Who We Work With
              </p>
              <h2
                className="text-foreground font-normal leading-[1.15]"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                }}
              >
                Advisory For Capital,<br />Builders, & Landowners
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {audience.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-4 py-3 border-b border-border/50"
                  >
                    <span
                      className="inline-block h-px w-6"
                      style={{ backgroundColor: GOLD }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-foreground"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ───────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.88) 0%, rgba(12,15,36,0.94) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <p
            className="mb-6"
            style={{ ...labelStyle, color: GOLD }}
          >
            A Confidential Conversation
          </p>
          <h2
            className="font-normal leading-[1.1] mb-7 max-w-3xl mx-auto"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.85rem, 4vw, 3rem)",
            }}
          >
            Let&rsquo;s Evaluate the Opportunity
          </h2>
          <p
            className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.05rem" }}
          >
            Whether you&rsquo;re exploring development potential, future land
            use, or strategic land acquisition, start with a confidential
            conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center px-7 py-3 text-white transition-colors duration-300 hover:bg-[hsl(var(--gold-deep))]"
              style={{ ...labelStyle, backgroundColor: GOLD }}
            >
              Schedule a Consultation
            </Link>
            <Link
              to="/sell-private"
              className="inline-flex min-h-[48px] items-center justify-center px-7 py-3 text-white border border-white/70 hover:bg-white/10 transition-colors duration-300"
              style={labelStyle}
            >
              Submit a Property for Review
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandDevelopment;
