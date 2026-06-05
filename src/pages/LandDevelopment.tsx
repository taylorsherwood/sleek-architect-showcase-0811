import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createBreadcrumbSchema,
  realEstateAgentSchema,
} from "@/components/SchemaMarkup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/land-development-hero.jpg";
import masterplanImg from "@/assets/land-development-masterplan.jpg";
import datacenterImg from "@/assets/land-development-datacenter.jpg";
import industrialImg from "@/assets/land-development-industrial.jpg";
import landBankingImg from "@/assets/land-banking.webp.asset.json";
import mixedUseImg from "@/assets/mixed-use.png.asset.json";
import dataCenterImg from "@/assets/data-center-site.jpg.asset.json";
import buildToRentImg from "@/assets/build-to-rent.jpg.asset.json";
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
    image: dataCenterImg.url,
  },
  {
    title: "Mixed-Use Development",
    body: "Retail, residential, hospitality, and commercial development opportunities.",
    image: mixedUseImg.url,
  },
  {
    title: "Strategic Land Banking",
    body: "Properties positioned along future growth corridors and infrastructure expansion.",
    image: landBankingImg.url,
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
  {
    title: "Developers",
    body: "Site selection, entitlement strategy, feasibility assessment, and disposition advisory for ground-up programs.",
  },
  {
    title: "Builders",
    body: "Lot pipeline strategy, takedown structuring, and acquisition of land aligned to product type and absorption.",
  },
  {
    title: "Family Offices",
    body: "Patient capital deployment into appreciating land positions, generational holds, and strategic ground leases.",
  },
  {
    title: "Private Investors",
    body: "Path-of-growth acquisitions, joint venture introductions, and asymmetric land plays with defined catalysts.",
  },
];

const themes = [
  {
    title: "Data Centers",
    thesis: "Power, fiber, and water capacity now define site economics more than entitlements or zoning.",
    image: dataCenterImg.url,
  },
  {
    title: "Industrial Outdoor Storage",
    thesis: "Constrained supply and institutional capital inflows are reshaping low-coverage industrial land.",
    image: industrialImg,
  },
  {
    title: "Master Planned Communities",
    thesis: "Long-horizon land holdings positioned to absorb regional in-migration and rooftop demand.",
    image: masterplanImg,
  },
  {
    title: "Build-to-Rent",
    thesis: "Single-family rental product underwritten as an institutional asset class, not a housing trend.",
    image: buildToRentImg.url,
  },
  {
    title: "Mixed-Use Development",
    thesis: "Retail, residential, and hospitality programs built around walkability and density curves.",
    image: mixedUseImg.url,
  },
  {
    title: "Strategic Land Banking",
    thesis: "Future development sites acquired years ahead of utility, transportation, and policy catalysts.",
    image: landBankingImg.url,
  },
];


const advisoryQuestions = [
  {
    q: "Can utilities realistically serve the site?",
    a: "Water, wastewater, and electric capacity often determine whether a site is developable at the scale the underwriting requires. We evaluate service area boundaries, available capacity, capital improvement plans, and the timeline to actual hookup, not just paper availability.",
  },
  {
    q: "What is the highest and best use?",
    a: "Highest and best use is a function of demand, regulation, and capital structure, not the current condition of the land. We frame the question against absorption curves, comparable executions, and the underwriting tolerance of the capital most likely to acquire the entitled site.",
  },
  {
    q: "What infrastructure projects are nearby?",
    a: "Roadway expansions, utility extensions, transit decisions, and public investment frequently move land values long before they are announced as catalysts. We track CIP schedules, TxDOT programs, MUD activity, and adjacent private development as leading indicators.",
  },
  {
    q: "How does future land use affect value?",
    a: "Comprehensive plans, ETJ status, annexation policy, and overlay districts often signal where entitlements will move years in advance. The strongest acquisitions tend to be aligned with future land use direction rather than current zoning alone.",
  },
  {
    q: "What are the entitlement risks?",
    a: "Variances, replatting, MUD creation, traffic mitigation, and environmental review can each compress IRR if mispriced. We map the entitlement path, identify the binding constraints, and pressure-test the schedule against political and procedural risk.",
  },
  {
    q: "What could change over the next decade?",
    a: "Population migration, employer relocations, transportation investment, and policy direction reshape the underwriting on long-horizon land. We frame each opportunity against the ten-year trajectory of the corridor, not the snapshot of today.",
  },
];

const watchCorridors = [
  {
    name: "SH 130 Corridor",
    location: "East of Austin / Travis & Williamson",
    explanation: "Emerging logistics, industrial, and data center activity along the region's primary bypass route.",
    demand: "Power-rich employment corridor attracting long-term institutional interest.",
  },
  {
    name: "Georgetown Expansion",
    location: "Northern Williamson County",
    explanation: "Rapid ETJ growth, new utility capacity, and active MUD formation across the I-35 spine.",
    demand: "Master planned residential and employment land in one of the country's fastest growing cities.",
  },
  {
    name: "Liberty Hill Growth",
    location: "Western Williamson County",
    explanation: "New school capacity and arterial expansion opening a residential frontier west of Leander.",
    demand: "Greenfield land where rooftop demand is outpacing infrastructure delivery.",
  },
  {
    name: "Bastrop Technology Corridor",
    location: "SH 71 East / Bastrop County",
    explanation: "Large-employer announcements reshaping a historically rural corridor east of Austin.",
    demand: "Long-hold industrial and employment-adjacent land tied to corporate site selection.",
  },
  {
    name: "East Austin Expansion",
    location: "East of I-35, inside Travis County",
    explanation: "Infill redevelopment, transit investment, and mixed-use rezonings reshaping the urban core.",
    demand: "Assemblage and vertical mixed-use opportunities along key arterials.",
  },
  {
    name: "Kyle & San Marcos Corridor",
    location: "I-35 South / Hays County",
    explanation: "Sustained in-migration expanding rooftops and the employment base along I-35 South.",
    demand: "Residential, build-to-rent, and supporting retail across the southern growth band.",
  },
];

const timeline = [
  "Raw Land",
  "Entitlement",
  "Infrastructure",
  "Development",
  "Value Creation",
];

const LandDevelopment = () => {
  const themesScrollerRef = useRef<HTMLDivElement | null>(null);
  const relationshipRef = useRef<HTMLDivElement | null>(null);
  const [relationshipInView, setRelationshipInView] = useState(false);

  useEffect(() => {
    const el = relationshipRef.current;
    if (!el || relationshipInView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRelationshipInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [relationshipInView]);

  const scrollThemes = (direction: "prev" | "next") => {
    const el = themesScrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-theme-card]");
    const delta = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "next" ? delta : -delta, behavior: "smooth" });
  };

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

        <div className="relative z-10 flex h-full items-center pb-16 md:pb-24 lg:pb-32">
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
                  fontFamily: "'Jost', sans-serif",
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

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 1.5: CAPITAL ALLOCATION DECISION ──────────────── */}
      <section className="bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <p className="mb-6" style={{ ...labelStyle, color: GOLD }}>
                A Capital Allocation Decision
              </p>
              <h2
                className="text-foreground font-normal leading-[1.05] mb-8"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
                }}
              >
                Development Begins<br />Long Before Construction
              </h2>
              <div
                className="text-foreground/72 leading-[1.75] space-y-5 max-w-xl"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "1.04rem" }}
              >
                <p>
                  The most valuable opportunities are often identified years
                  before vertical development begins.
                </p>
                <p>
                  Infrastructure expansion, utility capacity, transportation
                  improvements, population migration, and future land use
                  policy frequently create value long before a permit is issued.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <div className="space-y-10 md:space-y-12">
                {["Power Availability", "Infrastructure Access", "Future Demand"].map(
                  (m, i) => (
                    <div key={m}>
                      <p
                        className="mb-3"
                        style={{ ...labelStyle, color: GOLD, fontSize: "0.62rem" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p
                        className="text-foreground font-normal leading-[1.05]"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                        }}
                      >
                        {m}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

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
            <div className="hidden md:block">
              <div className="grid grid-cols-9 items-center gap-0">
                {timeline.map((step, i) => (
                  <Fragment key={`dot-${step}`}>
                    <div className="col-span-1 flex justify-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: GOLD }}
                        aria-hidden="true"
                      />
                    </div>
                    {i < timeline.length - 1 && (
                      <div
                        className="col-span-1 h-px"
                        style={{ backgroundColor: "rgba(185,160,108,0.45)" }}
                        aria-hidden="true"
                      />
                    )}
                  </Fragment>
                ))}
              </div>
              <div className="grid grid-cols-9 gap-0 mt-4">
                {timeline.map((step, i) => (
                  <Fragment key={`label-${step}`}>
                    <p
                      className="col-span-1 text-foreground text-center"
                      style={{
                        ...labelStyle,
                        fontSize: "0.66rem",
                        letterSpacing: "0.26em",
                        textIndent: "0.26em",
                      }}
                    >
                      {step}
                    </p>
                    {i < timeline.length - 1 && <div className="col-span-1" aria-hidden="true" />}
                  </Fragment>
                ))}
              </div>
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
              Development Opportunities<br />We Evaluate
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

      {/* ── SECTION 4.5: WHAT SOPHISTICATED BUYERS ASK FIRST ───────── */}
      <section className="bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
                Advisory Briefing
              </p>
              <h2
                className="text-foreground font-normal leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.55rem, 2.8vw, 2.2rem)",
                }}
              >
                What Sophisticated<br />Buyers Ask First
              </h2>
              <p
                className="text-foreground/70 leading-[1.7] max-w-sm"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.98rem" }}
              >
                The questions that separate disciplined land underwriting from
                speculation, framed the way institutional capital evaluates a
                site.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {advisoryQuestions.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`q-${i}`}
                    className="border-b border-border/60"
                  >
                    <AccordionTrigger
                      className="py-6 hover:no-underline group text-left"
                    >
                      <div className="flex items-start gap-6 w-full pr-4">
                        <span
                          style={{
                            ...labelStyle,
                            color: GOLD,
                            fontSize: "0.6rem",
                          }}
                          className="pt-1.5 flex-shrink-0"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-foreground font-normal leading-[1.3] flex-1"
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "clamp(1rem, 1.3vw, 1.18rem)",
                          }}
                        >
                          {item.q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8">
                      <p
                        className="text-foreground/72 leading-[1.75] max-w-2xl ml-[3.25rem]"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        {item.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 4.75: CINEMATIC CONTEXT VIDEO ───────────────── */}
      <section className="relative w-full h-[60vh] min-h-[420px] md:h-[80vh] md:min-h-[560px] overflow-hidden bg-primary">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/commercial-hero-poster-mobile.webp"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source src="/videos/commercial-hero.mp4" type="video/mp4" />
        </video>
        <img
          src="/images/commercial-hero-poster-mobile.webp"
          alt="Aerial view of Austin's growth corridors"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.35) 45%, rgba(12,15,36,0.75) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="mb-4" style={{ ...labelStyle, color: GOLD }}>
              The Region In Motion
            </p>
            <h2
              className="font-normal leading-[1.1] text-white mb-5"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.6vw, 2.8rem)",
              }}
            >
              Central Texas Is Being Rebuilt In Real Time
            </h2>
            <p
              className="text-white/80 leading-relaxed max-w-xl"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem" }}
            >
              New highways, power infrastructure, and employment centers are
              redrawing the map of where land becomes investable. The
              corridors below reflect that movement.
            </p>
          </div>
        </div>
      </section>




      {/* ── SECTION 5: AUSTIN GROWTH CORRIDORS ───────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden">

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

      {/* ── SECTION 5.5: GROWTH CORRIDORS TO WATCH ───────────────── */}
      <section className="bg-[#F2EFEA]">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              Corridor Research
            </p>
            <h2
              className="text-foreground font-normal leading-[1.1] mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              }}
            >
              Growth Corridors to Watch
            </h2>
            <p
              className="text-foreground/70 leading-[1.7] max-w-2xl"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem" }}
            >
              A research view of the corridors most likely to attract capital,
              entitlements, and infrastructure investment over the next
              development cycle.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0 pb-4">
              <ol className="flex gap-10 md:gap-12 lg:gap-14 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6">
                {watchCorridors.map((c, i) => (
                  <li
                    key={c.name}
                    className="relative w-[260px] md:w-auto flex-shrink-0"
                  >
                    {/* Timeline row: dot perfectly centered on the gold line */}
                    <div className="relative h-3 mb-8 flex items-center">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
                        style={{ backgroundColor: "rgba(185,160,108,0.4)" }}
                      />
                      <span
                        className="relative w-3 h-3 rounded-full"
                        style={{ backgroundColor: GOLD }}
                        aria-hidden="true"
                      />
                    </div>
                    <p
                      className="mb-4"
                      style={{ ...labelStyle, color: GOLD, fontSize: "0.6rem" }}
                    >
                      {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; {c.location}
                    </p>
                    <h3
                      className="text-foreground font-normal leading-[1.15] mb-5"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "clamp(1.15rem, 1.35vw, 1.3rem)",
                      }}
                    >
                      {c.name}
                    </h3>
                    <p
                      className="text-foreground/72 leading-[1.7] mb-5"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.82rem",
                      }}
                    >
                      {c.explanation}
                    </p>
                    <p
                      className="text-foreground/55 leading-[1.65] italic"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.78rem",
                      }}
                    >
                      {c.demand}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PRIVATE OPPORTUNITIES ───────────────────── */}
      <section className="bg-background pt-16 md:pt-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="mb-6" style={{ ...labelStyle, color: GOLD }}>
                Private Opportunities
              </p>
              <h2
                className="text-foreground font-normal leading-[1.08] mb-5"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.7rem, 3.4vw, 2.7rem)",
                }}
              >
                Not Every Opportunity<br />Is Publicly Marketed
              </h2>
              <p
                className="mb-8"
                style={{
                  ...labelStyle,
                  color: GOLD,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                }}
              >
                Where landowners, capital, and opportunity converge.
              </p>
              <span
                aria-hidden="true"
                className="block h-px w-12 mb-8"
                style={{ backgroundColor: GOLD }}
              />
              <div
                className="text-foreground/72 leading-[1.75] space-y-5 max-w-xl"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "1.02rem",
                }}
              >
                <p>
                  Many development sites change hands through direct landowner
                  conversations, broker networks, and family office introductions
                  rather than public platforms.
                </p>
                <p>
                  At this level, sourcing is a relationship problem. The most
                  consequential transactions move through a small network of
                  advisors trusted by both landowners and capital.
                </p>
              </div>
            </div>

            {/* Relationship diagram */}
            <div className="lg:col-span-6">
              <div
                ref={relationshipRef}
                className="relative w-full group"
                style={{ aspectRatio: "5 / 4" }}
              >
                <svg
                  viewBox="0 0 500 400"
                  className="absolute inset-0 w-full h-full"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="ld-arrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M0,0 L10,5 L0,10 z" fill={GOLD} />
                    </marker>
                  </defs>

                  {/* Atmospheric background rings (reduced 20-30%) */}
                  <circle
                    cx="250"
                    cy="200"
                    r="120"
                    stroke="rgba(185,160,108,0.13)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 1.6s ease 0.1s",
                    }}
                  />
                  <circle
                    cx="250"
                    cy="200"
                    r="170"
                    stroke="rgba(185,160,108,0.07)"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 1.6s ease 0.2s",
                    }}
                  />

                  {/* Lines — draw toward advisor, then out to development */}
                  {(() => {
                    const lineStyle = (delay: number) => ({
                      strokeDasharray: 260,
                      strokeDashoffset: relationshipInView ? 0 : 260,
                      transition: `stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s, opacity 0.6s ease ${delay}s`,
                      opacity: relationshipInView ? 1 : 0,
                    });
                    return (
                      <>
                        {/* Landowner → Advisor (stops short of both endpoints) */}
                        <line
                          x1="108" y1="108" x2="222" y2="186"
                          stroke={GOLD} strokeWidth="1.25"
                          markerEnd="url(#ld-arrow)"
                          style={lineStyle(0.6)}
                        />
                        {/* Investor → Advisor */}
                        <line
                          x1="392" y1="108" x2="278" y2="186"
                          stroke={GOLD} strokeWidth="1.25"
                          markerEnd="url(#ld-arrow)"
                          style={lineStyle(0.9)}
                        />
                        {/* Advisor → Development */}
                        <line
                          x1="250" y1="220" x2="250" y2="312"
                          stroke={GOLD} strokeWidth="1.25"
                          markerEnd="url(#ld-arrow)"
                          style={lineStyle(2.0)}
                        />
                      </>
                    );
                  })()}

                  {/* Nodes — sized & placed so labels sit clear of them */}
                  <circle
                    cx="100" cy="100" r="4.5" fill={GOLD}
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 0.8s ease 0.1s",
                    }}
                  />
                  <circle
                    cx="400" cy="100" r="4.5" fill={GOLD}
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 0.8s ease 0.4s",
                    }}
                  />
                  <circle
                    cx="250" cy="200" r="6" fill={GOLD}
                    className="transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(185,160,108,0.85)]"
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 0.9s ease 1.7s, filter 0.5s ease",
                    }}
                  />
                  <circle
                    cx="250" cy="352" r="4.5" fill={GOLD}
                    style={{
                      opacity: relationshipInView ? 1 : 0,
                      transition: "opacity 0.8s ease 3.0s",
                    }}
                  />
                </svg>


                {/* Labels (absolutely positioned over SVG, each on a solid-bg plate so lines visually terminate before the text) */}
                <div
                  className="absolute"
                  style={{
                    left: "0%",
                    top: "2%",
                    maxWidth: "44%",
                    opacity: relationshipInView ? 1 : 0,
                    transform: relationshipInView ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
                  }}
                >
                  <span className="inline-block bg-background px-2 py-0.5">
                    <p style={{ ...labelStyle, color: GOLD, fontSize: "0.6rem" }} className="mb-1">
                      Source
                    </p>
                    <p
                      className="text-foreground font-normal whitespace-nowrap"
                      style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem" }}
                    >
                      Landowner
                    </p>
                  </span>
                </div>

                <div
                  className="absolute text-right"
                  style={{
                    right: "0%",
                    top: "2%",
                    maxWidth: "44%",
                    opacity: relationshipInView ? 1 : 0,
                    transform: relationshipInView ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
                  }}
                >
                  <span className="inline-block bg-background px-2 py-0.5 text-right">
                    <p style={{ ...labelStyle, color: GOLD, fontSize: "0.6rem" }} className="mb-1">
                      Capital
                    </p>
                    <p
                      className="text-foreground font-normal whitespace-nowrap"
                      style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem" }}
                    >
                      Investor
                    </p>
                  </span>
                </div>

                <div
                  className="absolute text-center"
                  style={{
                    left: "50%",
                    top: "55%",
                    transform: "translateX(-50%)",
                    opacity: relationshipInView ? 1 : 0,
                    transition: "opacity 1s ease 1.7s",
                  }}
                >
                  <span className="inline-block bg-background px-3 py-1">
                    <p style={{ ...labelStyle, color: GOLD, fontSize: "0.62rem" }} className="mb-1.5 whitespace-nowrap">
                      Echelon Property Group
                    </p>
                    <p
                      className="text-foreground whitespace-nowrap"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.35rem",
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Advisor
                    </p>
                  </span>
                </div>

                <div
                  className="absolute text-center"
                  style={{
                    left: "50%",
                    bottom: "0%",
                    transform: "translateX(-50%)",
                    opacity: relationshipInView ? 1 : 0,
                    transition: "opacity 0.9s ease 3.0s",
                  }}
                >
                  <span className="inline-block bg-background px-2 py-0.5">
                    <p style={{ ...labelStyle, color: GOLD, fontSize: "0.6rem" }} className="mb-1">
                      Outcome
                    </p>
                    <p
                      className="text-foreground font-normal whitespace-nowrap"
                      style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem" }}
                    >
                      Development
                    </p>
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />

      {/* ── SECTION 7: WHO THIS PAGE IS FOR ───────────────────── */}
      <section className="bg-background border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="mb-5" style={{ ...labelStyle, color: GOLD }}>
              Who This Page Is For
            </p>
            <h2
              className="text-foreground font-normal leading-[1.1]"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              }}
            >
              Advisory Across the Capital Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {audience.map((a, i) => (
              <div key={a.title} className="border-t border-border/60 pt-6">
                <p
                  className="mb-4"
                  style={{ ...labelStyle, color: GOLD, fontSize: "0.6rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="text-foreground font-normal leading-[1.2] mb-4"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.3rem",
                  }}
                >
                  {a.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="block h-px w-8 mb-4"
                  style={{ backgroundColor: GOLD }}
                />
                <p
                  className="text-foreground/72 leading-[1.7]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.95rem",
                  }}
                >
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SECTION 8: FINAL CTA ───────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden">
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
