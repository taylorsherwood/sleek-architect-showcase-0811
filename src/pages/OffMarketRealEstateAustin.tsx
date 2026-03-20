import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-luxury-austin.jpg";

const SITE = "https://www.echelonpropertygroup.com";

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Raleway", sans-serif',
};

const OffMarketRealEstateAustin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
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
      gtagFn("event", "OffMarket_Lead", {
        event_category: "Lead",
        event_label: form.interest || "General",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "b2b7bb4b-7b0b-410e-b91c-5ff681e22c05",
          subject: `Off-Market Lead — ${form.interest || "General"} — ${form.budget || "No budget"}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          budget: form.budget,
          timeline: form.timeline,
          notes: form.notes,
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
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-3 text-white font-sans transition-colors placeholder:text-white/30";
  const selectClass =
    "w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-3 text-white font-sans transition-colors appearance-none cursor-pointer [&>option]:bg-[hsl(220,15%,12%)] [&>option]:text-white";

  const formContent = submitted ? (
    <div className="text-center py-12">
      <h3 className="font-display text-2xl text-white mb-4">You're In</h3>
      <p className="text-white/60">We'll reach out within 24 hours with curated opportunities.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-white/40 mb-1.5" style={labelStyle}>Name</label>
        <input id="name" type="text" required maxLength={100} value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-white/40 mb-1.5" style={labelStyle}>Email</label>
          <input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-white/40 mb-1.5" style={labelStyle}>Phone</label>
          <input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="interest" className="block text-white/40 mb-1.5" style={labelStyle}>Looking For</label>
          <select id="interest" value={form.interest} onChange={(e) => setForm(prev => ({ ...prev, interest: e.target.value }))} className={selectClass}>
            <option value="">Select</option>
            <option value="Luxury">Luxury</option>
            <option value="Investment">Investment</option>
            <option value="Land">Land</option>
            <option value="Mixed">Mixed / Open</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-white/40 mb-1.5" style={labelStyle}>Budget Range</label>
          <select id="budget" value={form.budget} onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))} className={selectClass}>
            <option value="">Select</option>
            <option value="Under $500K">Under $500K</option>
            <option value="$500K–$1M">$500K – $1M</option>
            <option value="$1M–$3M">$1M – $3M</option>
            <option value="$3M–$5M">$3M – $5M</option>
            <option value="$5M+">$5M+</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="timeline" className="block text-white/40 mb-1.5" style={labelStyle}>Timeline</label>
        <select id="timeline" value={form.timeline} onChange={(e) => setForm(prev => ({ ...prev, timeline: e.target.value }))} className={selectClass}>
          <option value="">Select</option>
          <option value="Immediately">Immediately</option>
          <option value="1–3 months">1–3 months</option>
          <option value="3–6 months">3–6 months</option>
          <option value="6+ months">6+ months</option>
          <option value="Exploring">Just exploring</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="block text-white/40 mb-1.5" style={labelStyle}>Additional Notes <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
        <textarea id="notes" maxLength={1000} rows={2} value={form.notes} onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))} className={`${inputClass} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold hover:bg-[hsl(42,37%,50%)] text-white py-4 tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300 disabled:opacity-50 active:scale-[0.98] mt-1"
        style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
      >
        {loading ? "Submitting…" : "Get Access to Private Deals"}
      </button>
      <p className="text-center text-white/30 text-xs tracking-wide">
        Your information is never shared. Private advisory only.
      </p>
    </form>
  );
  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)]">
      <SEOHead
        title="Off-Market Real Estate Deals in Austin"
        description="Access private listings, investment opportunities, and development deals in Austin not available on the MLS. Get early access to off-market real estate."
        canonical="/off-market-real-estate-austin"
        ogTitle="Off-Market Real Estate Deals in Austin | Echelon Property Group"
        ogDescription="Private listings, investment opportunities, and development deals not available on the MLS."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Private Opportunities", url: `${SITE}/private` },
          { name: "Off-Market Real Estate Austin", url: `${SITE}/off-market-real-estate-austin` },
        ])}
      />

      {/* ── Minimal header ──────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,15%,8%)]/90 backdrop-blur-sm border-b border-white/5">
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
      <section className="relative min-h-screen flex items-center pt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Austin luxury real estate — off-market investment opportunities"
            title="Off-market real estate deals in Austin Texas"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,8%)]/40 to-[hsl(220,15%,8%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left — Copy */}
            <div className="lg:pt-8">
              <p className="text-gold mb-4 font-bold" style={labelStyle}>
                PRIVATE REAL ESTATE ACCESS
              </p>
              <h1 className="font-display text-[2rem] md:text-[2.8rem] lg:text-[3.4rem] font-light text-white leading-[1.1] mb-6 tracking-tight">
                Access Off-Market Real Estate Deals in Austin
              </h1>
              <p className="text-white/75 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
                Private listings, investment opportunities, and development deals not available on the MLS.
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  "Luxury homes and private listings",
                  "Investment and value-add opportunities",
                  "Land and development sites",
                  "Curated opportunities based on your criteria",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-white/65 text-[0.925rem] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="lg:hidden bg-gold hover:bg-[hsl(42,37%,50%)] text-white px-10 py-4 transition-colors duration-300 active:scale-[0.98]"
                style={labelStyle}
              >
                GET ACCESS TO PRIVATE DEALS
              </button>
            </div>

            {/* Right — Form */}
            <div id="lead-form" className="border border-white/10 p-6 md:p-10 bg-white/[0.02]">
              <p className="text-gold mb-3 font-bold" style={labelStyle}>
                REQUEST ACCESS
              </p>
              <h2 className="font-display text-xl md:text-2xl font-light text-white mb-6">
                Tell Us What You're Looking For
              </h2>
              {formContent}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            HOW IT WORKS
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-14">
            Three Steps to Private Access
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              { step: "01", title: "Submit Your Criteria", body: "Tell us what you're looking for — property type, budget, timeline, and target areas." },
              { step: "02", title: "We Match Opportunities", body: "We source and vet private deals from our network of sellers, developers, and investors." },
              { step: "03", title: "Early Access", body: "You see opportunities before they hit the public market — with context and advisory support." },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <span className="text-gold/70 font-display text-4xl font-light">{item.step}</span>
                <h3 className="text-white font-medium text-base mt-3 mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OFF-MARKET ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            THE ADVANTAGE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Why Off-Market
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
            {[
              { title: "Less Competition", body: "Fewer buyers means stronger positioning and more negotiating leverage." },
              { title: "Better Deal Structure", body: "Flexible terms, creative financing, and the ability to structure beyond standard contracts." },
              { title: "Hidden Inventory", body: "Access properties that never appear on Zillow, Realtor.com, or the MLS." },
              { title: "Relationship-Driven", body: "Opportunities that flow through trusted networks — not search algorithms." },
            ].map((item) => (
              <div key={item.title} className="border border-white/8 p-6 md:p-8">
                <h3 className="text-white font-medium text-base mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN ACCESS ─────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-gold text-center mb-4 font-bold" style={labelStyle}>
            DEAL TYPES
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            What You Can Access
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Off-Market Luxury Homes", desc: "Discreet sales in Austin's top neighborhoods — Westlake, Tarrytown, Barton Creek, and beyond.", link: "/luxury-real-estate-austin", linkText: "Austin luxury real estate" },
              { title: "Investment Properties", desc: "Value-add residential, small multifamily, and income-producing assets across Austin.", link: "/austin-real-estate-investment", linkText: "Austin investment opportunities" },
              { title: "Land & Development", desc: "Raw land, infill lots, assemblage plays, and entitled development sites.", link: "/land-for-sale-austin", linkText: "Land opportunities" },
              { title: "Redevelopment Opportunities", desc: "Teardowns, adaptive reuse, and repositioning deals with upside potential.", link: "/search", linkText: "Search Austin properties" },
            ].map((item) => (
              <div key={item.title} className="p-6 md:p-8">
                <h3 className="text-white font-medium text-base mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-3">{item.desc}</p>
                <Link to={item.link} className="text-gold hover:text-gold transition-colors text-xs tracking-[0.12em] uppercase">
                  {item.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHORITY ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-gold mb-4 font-bold" style={labelStyle}>
            WHY ECHELON
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-10">
            Austin-Focused. Relationship-Driven.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { heading: "Local Expertise", body: "Deep market knowledge across luxury, investment, land, and commercial real estate in Austin." },
              { heading: "Private Networks", body: "Direct relationships with developers, investors, builders, and private sellers across Central Texas." },
              { heading: "Advisory Approach", body: "Strategy-first guidance — not just lead generation. We help you find, evaluate, and close." },
            ].map((item) => (
              <div key={item.heading}>
                <h3 className="text-white font-medium text-sm mb-2">{item.heading}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/private" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Private opportunities</Link>
            <Link to="/luxury-homes-austin" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Luxury homes</Link>
            <Link to="/land" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-[0.1em] uppercase underline underline-offset-4">Land & investment</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
            Tell Us What You're Looking For
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Submit your criteria and get matched with private opportunities across Austin's luxury, investment, and development markets.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-white text-white hover:text-gold hover:font-bold px-12 py-4 transition-all duration-300 ease-out active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
            style={labelStyle}
          >
            GET ACCESS TO PRIVATE DEALS
          </button>
        </div>
      </section>

      {/* ── Footer (minimal) ────────────────────────── */}
      <footer className="py-8 bg-[hsl(220,15%,5%)] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">© {new Date().getFullYear()} Echelon Property Group · Austin, Texas</p>
          <div className="flex gap-5">
            <Link to="/" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Home</Link>
            <Link to="/private" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Private</Link>
            <Link to="/contact" className="text-white/25 hover:text-white/50 transition-colors text-xs tracking-[0.1em] uppercase">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OffMarketRealEstateAustin;
