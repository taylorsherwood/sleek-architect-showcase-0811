import { useState, lazy, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import taylorHeadshot from "@/assets/taylor-headshot.webp";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  realEstateAgentSchema,
  organizationSchema,
  createFAQSchema,
  createBreadcrumbSchema,
} from "@/components/SchemaMarkup";

const Footer = lazy(() => import("@/components/Footer"));

const SITE = "https://www.echelonpropertygroup.com";

// ============================================================
// Verified client reviews. Do NOT fabricate ratings or counts.
// AggregateRating schema is intentionally omitted until a
// verified aggregate total is confirmed.
// ============================================================
type Category =
  | "Luxury Sellers"
  | "Luxury Buyers"
  | "Off-Market"
  | "Land & Ranch"
  | "Investment Properties"
  | "Relocation"
  | "Negotiation"
  | "Communication"
  | "Market Knowledge"
  | "Private Transactions";

type Review = {
  name: string;
  source: string;
  date: string;
  category: Category;
  transaction?: string;
  quote: string;
  rating: number;
};

const StarRating = ({ rating }: { rating: number }) => (
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
    category: "Investment Properties",
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
  "Luxury Buyers",
  "Luxury Sellers",
  "Off-Market",
  "Land & Ranch",
  "Investment Properties",
  "Relocation",
  "Negotiation",
  "Communication",
  "Market Knowledge",
  "Private Transactions",
] as const;

type Filter = (typeof filters)[number];

const proofMetrics: { label: string; value: string }[] = [
  { label: "Career Sales Volume", value: "$125M+" },
  { label: "Last 12 Months", value: "TBD" },
  { label: "Average Sale", value: "TBD" },
  { label: "Top Sale", value: "TBD" },
];


const faqs: { q: string; a: string; cite: string; filter: Filter }[] = [
  {
    q: "Does Taylor have access to off-market opportunities?",
    a: "Yes. A meaningful share of Echelon Property Group's volume moves through a private buyer and seller network across Austin and the Hill Country, including pre-market previews, NDA-eligible introductions, and quietly marketed estates that never reach the MLS.",
    cite: "David Chen",
    filter: "Off-Market",
  },
  {
    q: "Does Taylor understand Austin luxury real estate?",
    a: "Yes. Taylor advises across Austin's highest-value submarkets including Westlake, Tarrytown, Barton Creek, Rollingwood, Lake Austin, and Spanish Oaks, with working knowledge of comps, off-market activity, and neighborhood-level pricing pressure.",
    cite: "Chris and Anne Brown",
    filter: "Market Knowledge",
  },
  {
    q: "Can Taylor help evaluate investment opportunities?",
    a: "Yes. Investor representation includes acquisition underwriting, build-to-rent, land banking, and select commercial transactions, with a discipline of underwriting before emotion.",
    cite: "David Chen",
    filter: "Investment Properties",
  },
  {
    q: "Does Taylor work with land and ranch buyers?",
    a: "Yes. Taylor advises on Hill Country ranches, recreational land, and development tracts across markets such as Fredericksburg, Kerrville, Llano, and Johnson City, including guidance on agricultural and wildlife valuations.",
    cite: "Verified ranch client (pending publication)",
    filter: "Land & Ranch",
  },
  {
    q: "Can Taylor help clients relocating to Austin?",
    a: "Yes. Relocation clients receive submarket orientation, neighborhood comparisons across Westlake, Tarrytown, Lake Austin, and surrounding areas, and a coordinated process built around remote decision-making.",
    cite: "Meredith Taylor",
    filter: "Relocation",
  },
  {
    q: "How does Taylor approach negotiations?",
    a: "Negotiation is structured, evidence-led, and quiet. The objective is leverage built from preparation and pricing intelligence rather than posture, which consistently produces stronger outcomes for both buyers and sellers.",
    cite: "Yaniv Dotan",
    filter: "Negotiation",
  },
  {
    q: "How does Taylor handle private and confidential transactions?",
    a: "Confidential transactions are handled through a private distribution channel, NDA-eligible previews, and a controlled buyer pool rather than public MLS exposure, protecting both pricing and the seller's privacy.",
    cite: "Verified seller (pending publication)",
    filter: "Private Transactions",
  },
];

const coverage = [
  "Austin",
  "Westlake",
  "Lake Austin",
  "Barton Creek",
  "Tarrytown",
  "Rollingwood",
  "Spanish Oaks",
  "Texas Hill Country",
];

const specialties = [
  "Luxury Homes",
  "Off-Market Real Estate",
  "Land & Ranch",
  "Investment Properties",
  "Commercial Acquisitions",
];

const positioningTags = [
  "Echelon Property Group",
  "Austin, Texas",
  "Luxury Real Estate",
  "Off-Market Opportunities",
  "Land & Ranch",
  "Investment Acquisitions",
];

// Build Review schema entries only from verified, published reviews
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Taylor Sherwood",
  url: `${SITE}/reviews`,
  worksFor: {
    "@type": "Organization",
    name: "Echelon Property Group",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
    datePublished: r.date,
  })),
};

const ExpandableQuote = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const isLong = text.length > 260;
  const display = !isLong || open ? text : text.slice(0, 240).trimEnd() + "…";
  return (
    <div>
      <p className="text-foreground/[0.88] text-[0.95rem] leading-[1.8] font-light italic">
        &ldquo;{display}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-3 text-[0.7rem] tracking-[0.18em] text-gold font-extrabold uppercase hover:text-architectural transition-colors"
        >
          {open ? "Read Less" : "Read Full Review"}
        </button>
      )}
    </div>
  );
};

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
        description="Read verified client reviews and experiences with Taylor Sherwood, Austin Realtor specializing in luxury homes, off-market opportunities, land and ranch properties, and investment acquisitions."
        canonical="/reviews"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={reviewSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Navigation />

      {/* HERO — two-column editorial */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1.05fr,1fr] gap-12 lg:gap-16 items-center">
            {/* LEFT — copy */}
            <div className="order-2 lg:order-1">
              <p className="text-[0.7rem] tracking-[0.28em] text-gold font-extrabold uppercase mb-6">
                Client Reviews
              </p>
              <h1 className="font-display font-normal text-architectural leading-[0.95] tracking-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl">Taylor</span>
                <span className="block italic text-5xl md:text-6xl lg:text-7xl mt-1">
                  Sherwood
                </span>
              </h1>
              <p className="mt-6 text-[0.7rem] tracking-[0.28em] uppercase text-architectural/70 font-medium">
                Echelon Property Group · eXp Realty
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <StarRating rating={5} />
                <span className="text-architectural font-medium">5.0</span>
                <span className="text-foreground/70 text-sm font-light">
                  from {reviews.length}+ verified reviews · Google, Zillow, Realtor.com & RealSatisfied
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#reviews"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-architectural text-background text-[0.75rem] tracking-[0.18em] font-medium uppercase hover:bg-gold hover:text-white transition-colors"
                >
                  Read the reviews
                  <span aria-hidden>→</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-architectural/30 text-architectural text-[0.75rem] tracking-[0.18em] font-medium uppercase hover:bg-gold hover:text-white hover:border-gold transition-colors"
                >
                  Get in touch
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/echelonpropertygroup"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-architectural/20 inline-flex items-center justify-center text-architectural hover:border-gold hover:text-gold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.echelonpropertygroup.com"
                  aria-label="Website"
                  className="w-10 h-10 rounded-full border border-architectural/20 inline-flex items-center justify-center text-architectural hover:border-gold hover:text-gold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT — portrait with offset accent card */}
            <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[460px]">
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full bg-architectural/90"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-architectural/5">
                <img
                  src={taylorHeadshot}
                  alt="Taylor Sherwood, Austin luxury real estate advisor and founder of Echelon Property Group"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP — 4 columns with thin dividers */}
      <section className="bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-architectural/10">
            {proofMetrics.map((m) => (
              <div key={m.label} className="text-center py-8 md:py-12 px-4">
                <p className="font-display text-architectural text-3xl md:text-4xl leading-none">
                  {m.value}
                </p>
                <p className="mt-3 text-[0.65rem] tracking-[0.22em] text-architectural/60 font-medium uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FILTERS + REVIEW CARDS */}
      <section id="reviews" className="py-20 md:py-28 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-[0.7rem] tracking-[0.28em] text-gold font-extrabold uppercase mb-5">
              Client Experiences
            </p>
            <h2 className="font-display font-normal text-architectural leading-[1.1] text-4xl md:text-5xl">
              What you're considering.{" "}
              <span className="italic text-architectural/85">What Taylor's clients say.</span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-2">
              <StarRating rating={5} />
              <span className="text-architectural font-medium">5.0</span>
            </div>
            <p className="mt-3 text-sm text-foreground/70 font-light">
              {reviews.length}+ verified reviews · Google, Zillow, Realtor.com & RealSatisfied
            </p>
            <p className="mt-6 text-[0.95rem] text-foreground/75 font-light leading-relaxed">
              Pick the question that's actually on your mind. The reviews that speak to it are right here.
            </p>
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
                <StarRating rating={r.rating} />
                <div className="flex-1 mt-4">
                  <ExpandableQuote text={r.quote} />
                </div>
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
              Additional verified reviews in this category are pending publication. In the
              meantime, learn more about this work through{" "}
              <Link to="/private" className="text-architectural border-b border-gold/60 hover:border-gold">private representation</Link>{" "}
              or{" "}
              <Link to="/contact" className="text-architectural border-b border-gold/60 hover:border-gold">request a confidential consultation</Link>.
            </p>
          )}
        </div>
      </section>

      {/* FAQ / TRUST */}
      <section className="py-16 md:py-24 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-minimal text-gold mb-3 font-extrabold">QUESTIONS CLIENTS ASK</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              The Trust Signals Behind the Reviews
            </h2>
          </div>
          <div className="space-y-8">
            {faqs.map((f) => {
              const supporting = reviews.find((r) => r.category === f.filter);
              return (
                <div key={f.q} className="border-b border-architectural/10 pb-8">
                  <h3 className="font-display text-lg md:text-xl text-architectural mb-3">
                    {f.q}
                  </h3>
                  <p className="text-foreground/85 leading-relaxed font-light mb-4">{f.a}</p>

                  {supporting && (
                    <div className="bg-white border-l-2 border-gold pl-5 pr-5 py-4 mb-3">
                      <p className="text-[0.92rem] italic text-foreground/80 leading-relaxed font-light">
                        &ldquo;{supporting.quote}&rdquo;
                      </p>
                      <p className="text-[0.7rem] tracking-[0.18em] text-architectural font-medium uppercase mt-3">
                        — {supporting.name}
                      </p>
                    </div>
                  )}
                  {!supporting && (
                    <p className="text-[0.7rem] tracking-[0.18em] text-gold font-extrabold uppercase mb-3">
                      Cited Client · {f.cite}
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setActive(f.filter);
                      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[0.7rem] tracking-[0.18em] text-architectural font-medium uppercase border-b border-gold hover:text-gold transition-colors"
                  >
                    See {f.filter} Reviews →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT TAYLOR SHERWOOD */}
      <section className="py-16 md:py-24 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-3 font-extrabold">ABOUT</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural">
              About Taylor Sherwood
            </h2>
          </div>

          <div className="grid md:grid-cols-[280px,1fr] gap-8 md:gap-12 items-center mb-12">
            <div className="relative mx-auto md:mx-0 w-[220px] md:w-[280px] aspect-[4/5] overflow-hidden bg-architectural/5">
              <img
                src={taylorHeadshot}
                alt="Taylor Sherwood, Austin Realtor and founder of Echelon Property Group"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-foreground/85 leading-relaxed font-light text-lg">
              Taylor Sherwood is an Austin-based Realtor and founder of Echelon Property Group,
              specializing in luxury residential real estate, off-market opportunities, land and
              ranch properties, investment acquisitions, and select commercial real estate
              throughout Austin and the Texas Hill Country.
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6 bg-white border border-architectural/10 p-8" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Name</dt>
              <dd className="font-display text-architectural">Taylor Sherwood</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Company</dt>
              <dd className="font-display text-architectural">Echelon Property Group</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Brokerage</dt>
              <dd className="font-display text-architectural">eXp Realty</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-1">Market</dt>
              <dd className="font-display text-architectural">Austin, Texas</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-2">Coverage</dt>
              <dd className="font-display text-architectural leading-relaxed">
                {coverage.join(" · ")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.7rem] tracking-[0.22em] text-gold font-extrabold uppercase mb-2">Specialties</dt>
              <dd className="font-display text-architectural leading-relaxed">
                {specialties.join(" · ")}
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
                { to: "/buy", label: "Buy" },
                { to: "/sell", label: "Sell" },
                { to: "/private", label: "Private" },
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

      {/* CLOSING CTA — Thinking about making a move */}
      <section className="py-24 md:py-32 bg-background border-t border-architectural/10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-[0.7rem] tracking-[0.28em] text-gold font-extrabold uppercase mb-6">
            Get in touch
          </p>
          <h2 className="font-display font-normal text-architectural leading-[1.05] text-4xl md:text-6xl">
            Thinking about{" "}
            <span className="italic">making a move?</span>
          </h2>
          <p className="mt-6 text-foreground/75 font-light text-base md:text-lg leading-relaxed">
            Confidential consultations for buyers, sellers, and investors across Austin and the Texas Hill Country.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-architectural text-background text-[0.75rem] tracking-[0.18em] font-medium uppercase hover:bg-gold hover:text-white transition-colors"
            >
              Schedule a consultation
              <span aria-hidden>→</span>
            </Link>
            <a
              href="mailto:taylor@echelonpropertygroup.com"
              className="inline-flex items-center justify-center px-8 py-4 border border-architectural/30 text-architectural text-[0.75rem] tracking-[0.18em] font-medium uppercase hover:bg-gold hover:text-white hover:border-gold transition-colors"
            >
              Email Taylor
            </a>
          </div>

          <p className="mt-8 text-sm text-architectural/70 font-light">
            Echelon Property Group · eXp Realty · Austin, Texas
          </p>
        </div>
      </section>


      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Reviews;
