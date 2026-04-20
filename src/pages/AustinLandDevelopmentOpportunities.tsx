import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import heroImage from "@/assets/community-hill-country.jpg";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
import RelatedInsights from "@/components/RelatedInsights";

const SITE = "https://www.echelonpropertygroup.com";

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const AustinLandDevelopmentOpportunities = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    use: "",
    acreage: "",
    budget: "",
    timeline: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fireConversion = () => {
    const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtagFn === "function") {
      gtagFn("event", "conversion", {
        send_to: "AW-17598090760/BHb7CPuQr4scEIictsdB",
        value: 1.0,
        currency: "USD",
      });
      gtagFn("event", "Land_Dev_Lead", {
        event_category: "Lead",
        event_label: form.use || "General",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          intended_use: form.use || "General",
          acreage_range: form.acreage,
          budget: form.budget,
          timeline: form.timeline,
          notes: form.notes,
          source: "Land Development Landing Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        fireConversion();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("land-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-3 text-white font-sans transition-colors placeholder:text-white/30";
  const selectClass =
    "w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-3 text-white font-sans transition-colors appearance-none cursor-pointer [&>option]:bg-[hsl(220,14%,10%)] [&>option]:text-white";

  const FormBlock = () =>
    submitted ? (
      <div className="text-center py-12">
        <h3 className="font-display text-2xl text-white mb-4">Criteria Received</h3>
        <p className="text-white/60">We'll review your requirements and reach out within 24 hours with relevant opportunities.</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-white/40 mb-1.5" style={labelStyle}>Name</label>
          <input id="name" type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-white/40 mb-1.5" style={labelStyle}>Email</label>
            <input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-white/40 mb-1.5" style={labelStyle}>Phone</label>
            <input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="use" className="block text-white/40 mb-1.5" style={labelStyle}>Intended Use</label>
            <select id="use" value={form.use} onChange={(e) => setForm({ ...form, use: e.target.value })} className={selectClass}>
              <option value="">Select</option>
              <option value="Development">Development</option>
              <option value="Investment">Investment</option>
              <option value="Land Banking">Land Banking</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="acreage" className="block text-white/40 mb-1.5" style={labelStyle}>Acreage Range</label>
            <select id="acreage" value={form.acreage} onChange={(e) => setForm({ ...form, acreage: e.target.value })} className={selectClass}>
              <option value="">Select</option>
              <option value="Under 1 acre">Under 1 acre</option>
              <option value="1–5 acres">1–5 acres</option>
              <option value="5–20 acres">5–20 acres</option>
              <option value="20–100 acres">20–100 acres</option>
              <option value="100+ acres">100+ acres</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="budget" className="block text-white/40 mb-1.5" style={labelStyle}>Budget</label>
            <select id="budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={selectClass}>
              <option value="">Select</option>
              <option value="Under $500K">Under $500K</option>
              <option value="$500K–$1M">$500K – $1M</option>
              <option value="$1M–$3M">$1M – $3M</option>
              <option value="$3M–$10M">$3M – $10M</option>
              <option value="$10M+">$10M+</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className="block text-white/40 mb-1.5" style={labelStyle}>Timeline</label>
            <select id="timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={selectClass}>
              <option value="">Select</option>
              <option value="Immediately">Immediately</option>
              <option value="1–3 months">1–3 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="6+ months">6+ months</option>
              <option value="Exploring">Exploring / No rush</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-white/40 mb-1.5" style={labelStyle}>Notes <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
          <textarea id="notes" maxLength={1000} rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-none`} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-[hsl(var(--gold-deep))] text-white py-4 tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300 disabled:opacity-50 active:scale-[0.98] mt-1"
          style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
        >
          {loading ? "Submitting…" : "Submit Acquisition Criteria"}
        </button>
        <p className="text-center text-white/30 text-xs tracking-wide">
          Confidential. Your criteria are never shared publicly.
        </p>
      </form>
    );

  return (
    <div className="min-h-screen bg-[hsl(220,14%,8%)]">
      <SEOHead
        title="Austin Land Development | Echelon Property Group"
        description="Land, redevelopment sites, and development opportunities across Austin and Central Texas. Off-market and on-market deals for developers and investors."
        canonical="/austin-land-development-opportunities"
        ogTitle="Austin Land Development | Echelon Property Group"
        ogDescription="Land and development deals across Austin and Central Texas for serious investors and developers."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Investment", url: `${SITE}/invest` },
          { name: "Land & Development", url: `${SITE}/austin-land-development-opportunities` },
        ])}
      />

      {/* ── Minimal header ──────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,14%,8%)]/90 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm tracking-[0.2em] uppercase font-sans">
            Echelon Property Group
          </Link>
          <Link to="/contact" className="text-white/40 hover:text-white/70 transition-colors text-xs tracking-[0.15em] uppercase font-sans">
            Contact
          </Link>
        </div>
      </header>

      {/* ── HERO + FORM ─────────────────────────────── */}
      <section className="relative min-h-screen max-h-[900px] xl:max-h-[920px] 2xl:max-h-[940px] flex items-center pt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Austin Hill Country land — development and investment opportunities"
            title="Austin land for development and investment"
            className="w-full h-full object-cover opacity-15"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,14%,8%)]/30 to-[hsl(220,14%,8%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left — Copy */}
            <div className="lg:pt-8">
              <p className="text-gold mb-4 font-bold" style={labelStyle}>
                LAND & DEVELOPMENT
              </p>
              <h1 className="font-display text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-light text-white leading-[1.1] mb-6 tracking-tight">
                Austin Land & Development Opportunities
              </h1>
              <p className="text-white/55 text-lg font-light leading-relaxed mb-8 max-w-lg">
                Access land, redevelopment sites, and development opportunities across Austin and Central Texas — both on-market and off-market.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Off-market land opportunities",
                  "Development-ready sites",
                  "Assemblage and large tracts",
                  "Strategic investment locations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-white/50 text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="lg:hidden bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-10 py-4 transition-colors duration-300 active:scale-[0.98]"
                style={labelStyle}
              >
                SUBMIT ACQUISITION CRITERIA
              </button>
            </div>

            {/* Right — Form */}
            <div id="land-form" className="border border-white/10 p-6 md:p-10 bg-white/[0.02]">
              <p className="text-gold mb-3 font-bold" style={labelStyle}>
                ACQUISITION CRITERIA
              </p>
              <h2 className="font-display text-xl md:text-2xl font-light text-white mb-6">
                Tell Us What You're Looking For
              </h2>
              <FormBlock />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE SOURCE ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,14%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            SOURCING CAPABILITIES
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            What We Source
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Residential Development Land",
                desc: "Entitled and pre-development parcels for single-family, townhome, and multifamily projects across Austin's growth corridors.",
              },
              {
                title: "Commercial Sites",
                desc: "Retail, office, and mixed-use development sites in high-traffic and high-growth areas of Central Texas.",
              },
              {
                title: "Infill & Redevelopment Parcels",
                desc: "Urban infill lots, teardown opportunities, and adaptive reuse sites inside Austin's core submarkets.",
              },
              {
                title: "Large Acreage Tracts",
                desc: "Ranch land, land-banking tracts, and large-scale development parcels in the Hill Country and surrounding counties.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/8 p-6 md:p-8">
                <h3 className="text-white font-medium text-base mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WORK WITH US ────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,14%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-gold mb-4 font-bold" style={labelStyle}>
            THE ECHELON ADVANTAGE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-12">
            Why Developers and Investors Work With Us
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                heading: "Access Beyond MLS",
                body: "Proprietary sourcing and off-market deal flow from landowners, estates, and private sellers who never list publicly.",
              },
              {
                heading: "Landowner Relationships",
                body: "Direct relationships with landowners, ranchers, developers, and family offices across Austin and the Hill Country.",
              },
              {
                heading: "Strategic Site Selection",
                body: "Data-informed site analysis covering zoning, entitlements, utilities, flood, growth patterns, and highest-and-best-use.",
              },
            ].map((item) => (
              <div key={item.heading}>
                <h3 className="text-white font-medium text-sm mb-2">{item.heading}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT LISTINGS ────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,14%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-gold mb-4 font-bold" style={labelStyle}>
            ACTIVE INVENTORY
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
            Current Land Listings
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Browse publicly available land and development listings across Austin and Central Texas. For off-market opportunities, submit your criteria above.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/land-for-sale-austin"
              className="inline-block bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-10 py-4 transition-colors duration-300 active:scale-[0.98]"
              style={labelStyle}
            >
              VIEW LAND LISTINGS
            </Link>
            <Link
              to="/search"
              className="inline-block border border-white/20 text-white/70 hover:border-white/40 hover:text-white px-10 py-4 transition-colors duration-300 active:scale-[0.98]"
              style={labelStyle}
            >
              SEARCH ALL PROPERTIES
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/off-market-real-estate-austin" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Private opportunities</Link>
            <Link to="/land" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Land & investment</Link>
            <Link to="/blog/find-off-market-homes-austin" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Off-market guide</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,14%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
            Submit Your Acquisition Criteria
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-8">
            Share your requirements and get matched with private and upcoming land and development opportunities across Austin.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-[hsl(var(--gold-deep))] text-white px-12 py-4 transition-colors duration-300 active:scale-[0.98]"
            style={labelStyle}
          >
            SUBMIT ACQUISITION CRITERIA
          </button>
        </div>
      </section>

      {/* ── Footer (minimal) ────────────────────────── */}
      <footer className="py-8 bg-[hsl(220,14%,5%)] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">© {new Date().getFullYear()} Echelon Property Group · Austin, Texas</p>
          <div className="flex gap-5">
            <Link to="/" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Home</Link>
            <Link to="/off-market-real-estate-austin" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Private</Link>
            <Link to="/contact" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AustinLandDevelopmentOpportunities;
