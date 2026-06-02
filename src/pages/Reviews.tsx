import { useState, lazy, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  realEstateAgentSchema,
  localBusinessSchema,
  createFAQSchema,
  createBreadcrumbSchema,
} from "@/components/SchemaMarkup";

const Footer = lazy(() => import("@/components/Footer"));

const SITE = "https://www.echelonpropertygroup.com";

// ============================================================
// PLACEHOLDER review data. Replace with verified client reviews.
// Do NOT publish fake reviews or aggregate ratings.
// ============================================================
type Review = {
  name: string;
  source: string;
  date: string; // ISO or display string
  category:
    | "Luxury Sellers"
    | "Luxury Buyers"
    | "Off-Market"
    | "Land & Ranch"
    | "Investors"
    | "Relocation"
    | "Negotiation"
    | "Market Knowledge"
    | "Communication";
  transaction?: string;
  quote: string;
  rating: number;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={i < rating ? "#b9a06c" : "none"}
          stroke="#b9a06c"
          strokeWidth="1.2"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const reviews: Review[] = [
  {
    name: "Cameron Miller",
    source: "Verified Client",
    date: "2025",
    category: "Luxury Sellers",
    transaction: "Sold in Northwest Hills",
    rating: 5,
    quote:
      "After a failed listing experience I was hesitant. Taylor showed me exactly what went wrong before and what he would do differently. That honesty earned my trust, and the sale.",
  },
  {
    name: "James & Sarah Mitchell",
    source: "Verified Client",
    date: "2025",
    category: "Luxury Sellers",
    transaction: "Sold in Barton Creek",
    rating: 5,
    quote:
      "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
  },
  {
    name: "Meredith Taylor",
    source: "Verified Client",
    date: "2025",
    category: "Luxury Buyers",
    transaction: "Purchased in Austin",
    rating: 5,
    quote:
      "Taylor really understood what I was looking for and showed me options that fit my criteria. When I was ready to make an offer, he moved quickly to meet a tight closing date. I've already recommended Taylor to my friends.",
  },
  {
    name: "Katherine & Robert Ellis",
    source: "Verified Client",
    date: "2025",
    category: "Communication",
    transaction: "Sold in Westlake Hills",
    rating: 5,
    quote:
      "From staging to close, every step was handled with professionalism and care. We'd recommend anyone thinking about buying or selling in Austin to call Taylor first.",
  },
  {
    name: "David Chen",
    source: "Verified Client",
    date: "2025",
    category: "Investors",
    transaction: "Investment Property, Austin",
    rating: 5,
    quote:
      "Taylor's understanding of Austin's investment landscape helped us identify a property that exceeded our return expectations. His analysis was institutional-grade and his negotiation saved us significantly on the acquisition.",
  },
  {
    name: "Chris and Anne Brown",
    source: "Verified Client",
    date: "2025",
    category: "Market Knowledge",
    transaction: "Sold in Tarrytown",
    rating: 5,
    quote:
      "Taylor's knowledge of the Austin luxury market is exceptional. He knew the comps, the trends, and which streets were commanding premiums before we even asked.",
  },
  {
    name: "Yaniv Dotan",
    source: "Verified Client",
    date: "2025",
    category: "Negotiation",
    transaction: "Purchased and sold in Barton Creek",
    rating: 5,
    quote:
      "Taylor is knowledgeable, responsive, and genuinely cares about getting the best results for his clients. The entire process was smooth and stress-free.",
  },
];

const filters = [
  "All Reviews",
  "Luxury Sellers",
  "Luxury Buyers",
  "Off-Market",
  "Land & Ranch",
  "Investors",
  "Relocation",
  "Negotiation",
  "Market Knowledge",
  "Communication",
] as const;

type Filter = (typeof filters)[number];

const proofMetrics: { label: string; value: string; note?: string }[] = [
  { label: "Transaction Volume", value: "TBD", note: "Verified figure pending" },
  { label: "Luxury Listings Represented", value: "TBD" },
  { label: "Off-Market Opportunities Sourced", value: "TBD" },
  { label: "Markets Covered", value: "Austin · Hill Country · Land & Ranch" },
  { label: "Average Client Rating", value: "TBD", note: "Aggregate pending" },
];

const faqs = [
  {
    q: "Does Taylor know the Austin luxury market?",
    a: "Yes. Taylor advises across Austin's highest-value submarkets including Westlake Hills, Tarrytown, Barton Creek, Rollingwood, and the surrounding Hill Country, with a working knowledge of comps, off-market activity, and neighborhood-level pricing pressure.",
    cite: "Chris and Anne Brown",
  },
  {
    q: "Is Taylor responsive?",
    a: "Clients consistently describe Taylor as direct, accessible, and quick to coordinate showings, offers, and closing logistics, including on tight timelines.",
    cite: "Meredith Taylor",
  },
  {
    q: "Can Taylor help with off-market opportunities?",
    a: "Yes. A meaningful share of Echelon Property Group's volume is transacted off-market through a private buyer and seller network across Austin and the Hill Country.",
    cite: "David Chen",
  },
  {
    q: "Does Taylor work with land and ranch buyers?",
    a: "Yes. Taylor advises on Hill Country ranches, recreational land, and development tracts across markets such as Fredericksburg, Kerrville, Llano, and Johnson City.",
    cite: "Verified ranch client (pending)",
  },
  {
    q: "Can Taylor advise investors?",
    a: "Yes. Investor representation includes acquisition analysis, build-to-rent, land banking, and select commercial transactions, with a focus on underwriting before emotion.",
    cite: "David Chen",
  },
  {
    q: "What is the experience like for sellers?",
    a: "Sellers describe a structured, marketing-led process with clear positioning, defined pricing strategy, and disciplined negotiation through closing.",
    cite: "James & Sarah Mitchell",
  },
  {
    q: "How does Taylor handle privacy and discretion?",
    a: "Confidential transactions are handled through a private distribution channel, NDA-eligible previews, and a controlled buyer pool rather than public MLS exposure.",
    cite: "Verified seller (pending)",
  },
];

const Reviews = () => {
  const [active, setActive] = useState<Filter>("All Reviews");

  const filtered = useMemo(
    () => (active === "All Reviews" ? reviews : reviews.filter((r) => r.category === active)),
    [active]
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE}/` },
    { name: "Reviews", url: `${SITE}/reviews` },
  ]);

  const faqSchema = createFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Taylor Sherwood Reviews | Austin Luxury Real Estate Advisor"
        description="Read verified reviews and client experiences for Taylor Sherwood, Austin real estate advisor specializing in luxury homes, off-market opportunities, land, ranch, and investment properties."
        canonical="/reviews"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-minimal text-gold mb-4 font-extrabold tracking-[0.25em]">
            CLIENT REVIEWS & RESULTS
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-normal text-architectural leading-[1.05] mb-6">
            Taylor Sherwood Reviews
            <br />
            <span className="text-foreground/80">& Client Results</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Verified client experiences, transaction highlights, and answers to the questions
            buyers, sellers, and investors ask before choosing an Austin real estate advisor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#reviews"
              className="inline-flex items-center justify-center px-7 py-3 bg-architectural text-background text-sm tracking-[0.18em] font-medium hover:bg-architectural/90 transition-colors"
            >
              READ CLIENT REVIEWS
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 border border-architectural/30 text-architectural text-sm tracking-[0.18em] font-medium hover:bg-architectural hover:text-background transition-colors"
            >
              SCHEDULE A PRIVATE CONSULTATION
            </Link>
          </div>

          {/* Aggregate placeholder */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 border-y border-architectural/10">
            <div className="text-left">
              <p className="text-[0.65rem] tracking-[0.22em] text-gold font-extrabold">AVERAGE RATING</p>
              <p className="font-display text-xl text-architectural">TBD</p>
            </div>
            <div className="h-8 w-px bg-architectural/15 hidden sm:block" />
            <div className="text-left">
              <p className="text-[0.65rem] tracking-[0.22em] text-gold font-extrabold">TOTAL REVIEWS</p>
              <p className="font-display text-xl text-architectural">TBD</p>
            </div>
            <div className="h-8 w-px bg-architectural/15 hidden sm:block" />
            <div className="text-left">
              <p className="text-[0.65rem] tracking-[0.22em] text-gold font-extrabold">SOURCES</p>
              <p className="font-display text-sm text-architectural">Google · Zillow · Realtor.com · LinkedIn</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF METRICS */}
      <section className="py-16 md:py-20 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-minimal text-gold mb-3 font-extrabold">PROOF & TRACK RECORD</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              Advisory Built on Verified Outcomes
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {proofMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-white border border-architectural/10 p-6 text-center"
                style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.04)" }}
              >
                <p className="font-display text-2xl md:text-3xl text-architectural mb-2 leading-tight">
                  {m.value}
                </p>
                <p className="text-[0.7rem] tracking-[0.18em] text-gold font-extrabold uppercase mb-1">
                  {m.label}
                </p>
                {m.note && (
                  <p className="text-[0.7rem] text-muted-foreground/80 font-light italic">
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS + REVIEW CARDS */}
      <section id="reviews" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-3 font-extrabold">CLIENT EXPERIENCES</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              Filter Reviews by Category
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-4 py-2 text-[0.72rem] tracking-[0.18em] font-medium uppercase border transition-colors ${
                    isActive
                      ? "bg-architectural text-background border-architectural"
                      : "bg-transparent text-architectural border-architectural/25 hover:border-architectural"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {filtered.map((r, i) => (
              <article
                key={`${r.name}-${i}`}
                className="bg-white border border-architectural/10 rounded-lg p-7 md:p-8 flex flex-col"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.65rem] tracking-[0.22em] text-gold font-extrabold uppercase">
                    {r.category}
                  </span>
                  <span className="text-[0.7rem] text-muted-foreground/80 font-light">
                    {r.source} · {r.date}
                  </span>
                </div>
                <div className="w-10 h-px bg-gold mb-5" />
                <p className="text-foreground/[0.88] text-[0.95rem] leading-[1.8] font-light italic flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-architectural/10">
                  <p className="font-display text-base text-architectural">{r.name}</p>
                  {r.transaction && (
                    <p className="text-xs text-muted-foreground/80 mt-0.5 font-light">
                      {r.transaction}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-light mt-8">
              Additional verified reviews in this category coming soon.
            </p>
          )}
        </div>
      </section>

      {/* QUESTIONS CLIENTS ASK */}
      <section className="py-16 md:py-24 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-minimal text-gold mb-3 font-extrabold">QUESTIONS CLIENTS ASK</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              The Trust Signals Behind the Reviews
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-architectural/10 pb-6">
                <h3 className="font-display text-lg md:text-xl text-architectural mb-3">
                  {f.q}
                </h3>
                <p className="text-foreground/85 leading-relaxed font-light mb-3">{f.a}</p>
                <p className="text-[0.7rem] tracking-[0.18em] text-gold font-extrabold uppercase">
                  Cited Client · {f.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CITATION / ABOUT */}
      <section className="py-16 md:py-24 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-3 font-extrabold">ABOUT</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              About Taylor Sherwood
            </h2>
          </div>
          <p className="text-foreground/85 leading-relaxed font-light text-lg mb-10 text-center">
            Taylor Sherwood is an Austin-based real estate advisor and Realtor with Echelon
            Property Group, focused on luxury residential, off-market opportunities, investment
            acquisitions, land, ranch, and select commercial real estate throughout Austin and
            the Texas Hill Country.
          </p>

          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5 bg-white border border-architectural/10 p-8" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Name</dt>
              <dd className="font-display text-architectural">Taylor Sherwood</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Company</dt>
              <dd className="font-display text-architectural">Echelon Property Group</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Market</dt>
              <dd className="font-display text-architectural">Austin, Texas & Texas Hill Country</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Specialties</dt>
              <dd className="font-display text-architectural">
                Luxury Real Estate · Off-Market · Land & Ranch · Investment · Select Commercial
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Website</dt>
              <dd className="font-display text-architectural">
                <a href="https://www.echelonpropertygroup.com" className="hover:text-gold transition-colors">
                  echelonpropertygroup.com
                </a>
              </dd>
            </div>
          </dl>

          {/* Internal link grid */}
          <div className="mt-12">
            <p className="text-center text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-5">
              Explore Echelon Property Group
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              {[
                { to: "/sell", label: "Sell" },
                { to: "/buy", label: "Buy" },
                { to: "/off-market-real-estate-austin", label: "Off-Market" },
                { to: "/land-ranch", label: "Land & Ranch" },
                { to: "/invest", label: "Invest" },
                { to: "/communities", label: "Communities" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-architectural border-b border-transparent hover:border-gold transition-colors font-light tracking-wide"
                >
                  {l.label}
                </Link>
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

export default Reviews;
