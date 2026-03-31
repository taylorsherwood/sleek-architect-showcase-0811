import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, createFAQSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroImage from "@/assets/hero-luxury-austin.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const SITE = "https://www.echelonpropertygroup.com";

const faqs = [
  { question: "What is an off-market home in Austin?", answer: "An off-market home is a property that is available for sale but not listed on the MLS or public real estate websites. These properties are marketed privately through agent networks, direct outreach, and exclusive buyer lists. In Austin's luxury market, off-market transactions are common, particularly for high-value estates in neighborhoods like Westlake Hills, Barton Creek, and Lake Austin." },
  { question: "Why do sellers choose to sell off-market in Austin?", answer: "Sellers choose off-market transactions for privacy, discretion, and control. High-profile homeowners may prefer to avoid public attention. Others want to test pricing without accumulating days on market. Off-market sales also avoid the disruption of public open houses and extensive photography of private spaces." },
  { question: "How do I find off-market luxury homes in Austin?", answer: "Access to off-market listings requires working with an agent who maintains deep relationships within Austin's luxury real estate community. Echelon Property Group specializes in off-market transactions and maintains a network of property owners, developers, and fellow agents who share exclusive opportunities before they reach the public market." },
  { question: "Are off-market homes more expensive than listed homes?", answer: "Not necessarily. Off-market homes can sometimes be acquired at favorable prices because there is less competition from other buyers. Without public marketing generating multiple offers, negotiations may be more straightforward. However, pricing depends on the specific property, seller motivation, and market conditions." },
  { question: "What neighborhoods have the most off-market activity in Austin?", answer: "The highest concentration of off-market transactions occurs in Austin's most exclusive neighborhoods: Lake Austin waterfront, Westlake Hills, Barton Creek, Tarrytown, and Rollingwood. These communities have high-net-worth homeowners who value privacy, and the limited inventory creates an environment where many transactions occur through private channels." },
  { question: "Can I sell my Austin luxury home off-market?", answer: "Yes. Echelon Property Group offers a discreet, off-market selling program for luxury homeowners who prefer privacy. We market your property exclusively to qualified buyers through our private network, ensuring confidentiality while achieving optimal pricing. Contact us for a confidential consultation about selling your home off-market." },
  { question: "What price range qualifies for off-market listings in Austin?", answer: "While off-market transactions occur at all price points, they are most common in Austin's luxury segment—generally properties priced above $2 million. The highest concentration of off-market activity is in the $3 million to $25 million range, where privacy concerns make private transactions the preferred approach." },
];

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
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
      const res = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          interest: form.interest || "General",
          budget: form.budget,
          timeline: form.timeline,
          notes: form.notes,
          source: "Off-Market Landing Page",
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
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-[hsl(var(--gold))] outline-none py-3 text-white font-sans transition-colors placeholder:text-white/30";
  const selectClass =
    "w-full bg-transparent border-b border-white/20 focus:border-[hsl(var(--gold))] outline-none py-3 text-white font-sans transition-colors appearance-none cursor-pointer [&>option]:bg-[hsl(220,15%,12%)] [&>option]:text-white";

  const formContent = submitted ? (
    <div className="text-center py-12 pt-20 flex flex-col items-center">
      <img src={echelonLogo} alt="Echelon Property Group logo — Austin luxury real estate" className="h-[10.5rem] mb-4"
                    loading="lazy" decoding="async"
                    />
      <h3 className="font-display text-2xl text-white mb-2">You're In</h3>
      <p className="text-white/60">We'll reach out within 24 hours with curated off-market opportunities.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-white/40 mb-1.5" style={labelStyle}>Full Name</label>
        <input id="name" type="text" required maxLength={100} value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} className={inputClass} placeholder="Your name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-white/40 mb-1.5" style={labelStyle}>Email</label>
          <input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} className={inputClass} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-white/40 mb-1.5" style={labelStyle}>Phone</label>
          <input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))} className={inputClass} placeholder="(512) 000-0000" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="interest" className="block text-white/40 mb-1.5" style={labelStyle}>Looking For</label>
          <select id="interest" value={form.interest} onChange={(e) => setForm(prev => ({ ...prev, interest: e.target.value }))} className={selectClass}>
            <option value="">Select</option>
            <option value="Luxury Residential">Luxury Residential</option>
            <option value="Investment">Investment Property</option>
            <option value="Land / Development">Land / Development</option>
            <option value="Mixed / Open">Open to Opportunities</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-white/40 mb-1.5" style={labelStyle}>Budget Range</label>
          <select id="budget" value={form.budget} onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))} className={selectClass}>
            <option value="">Select</option>
            <option value="$500K–$1M">$500K – $1M</option>
            <option value="$1M–$3M">$1M – $3M</option>
            <option value="$3M–$5M">$3M – $5M</option>
            <option value="$5M–$10M">$5M – $10M</option>
            <option value="$10M+">$10M+</option>
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
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="block text-white/40 mb-1.5" style={labelStyle}>Anything Else? <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
        <textarea id="notes" maxLength={1000} rows={2} value={form.notes} onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Neighborhoods, property type, investment goals…" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 ease-out disabled:opacity-50 active:scale-[0.98] mt-1 bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] hover:font-bold"
        style={{ fontSize: "0.7rem" }}
      >
        {loading ? "Submitting…" : "Request Private Access"}
      </button>
      <p className="text-center text-white/30 text-xs tracking-wide">
        Your information is never shared. Discreet advisory only.
      </p>
    </form>
  );

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)]">
      <SEOHead
        title="Off-Market Homes & Private Listings in Austin | Echelon Property Group"
        description="Access Austin's most exclusive off-market homes and private listings. Luxury properties, investment deals, and land opportunities not on the public market."
        canonical="/off-market-real-estate-austin"
        ogTitle="Off-Market Homes in Austin | Echelon Property Group"
        ogDescription="Many of Austin's most desirable homes never hit the public market. Get private access to off-market luxury homes and investment properties."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Off-Market Homes Austin", url: `${SITE}/off-market-real-estate-austin` },
        ])}
      />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup schema={realEstateAgentSchema} />

      {/* ── Minimal header ──────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,15%,8%)]/60 backdrop-blur-[6px] border-b border-white/[0.03]">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-white/[0.85] hover:text-gold transition-colors tracking-[0.18em] uppercase font-sans" style={{ fontSize: "0.8rem" }}>
            Echelon Property Group
          </Link>
          <button
            onClick={scrollToForm}
            className="text-[hsl(var(--gold))]/80 hover:text-white transition-colors tracking-[0.12em] uppercase font-sans" style={{ fontSize: "0.75rem" }}
          >
            Request Access
          </button>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Above-the-fold lead capture
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center pt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Austin estate representing exclusive off-market real estate opportunities"
            title="Off-market homes in Austin Texas — private listings not on Zillow or MLS"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,8%)]/30 to-[hsl(220,15%,8%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left — Copy */}
            <div className="lg:pt-8">
              <p className="text-[hsl(var(--gold))] mb-5 font-bold" style={labelStyle}>
                PRIVATE REAL ESTATE ACCESS
              </p>
              <h1 className="font-display text-[1.6rem] sm:text-[2rem] md:text-[2.8rem] lg:text-[3.4rem] font-light text-white leading-[1.12] mb-5 tracking-tight">
                Access Austin's Private &{" "}
                <span className="italic">Off-Market</span> Homes
              </h1>
              <p className="text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-4 max-w-lg">
                These properties are not available on Zillow, Realtor.com, or the MLS.
              </p>
              <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg">
                Many of Austin's most desirable homes never hit the public market. They trade quietly — through trusted relationships, private networks, and off-market channels that most buyers never see.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Luxury homes sold privately before reaching the open market",
                  "Investment and value-add opportunities sourced through direct relationships",
                  "Land and development sites available before public listing",
                  "Curated matches based on your criteria and investment goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-2 shrink-0" />
                    <span className="text-white/60 text-[0.925rem] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="lg:hidden bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] px-10 py-4 transition-all duration-300 active:scale-[0.98] tracking-[0.2em] uppercase font-sans font-medium"
                style={{ fontSize: "0.65rem" }}
              >
                REQUEST PRIVATE ACCESS
              </button>
            </div>

            {/* Right — Form (above the fold) */}
            <div id="lead-form" className="border border-white/10 p-6 md:p-10 bg-white/[0.02]">
              {!submitted && (
                <>
                  <p className="text-[hsl(var(--gold))] mb-3 font-bold" style={labelStyle}>
                    REQUEST PRIVATE ACCESS
                  </p>
                  <h2 className="font-display text-xl md:text-2xl font-light text-white mb-6">
                    Tell Us What You're Looking For
                  </h2>
                </>
              )}
              {formContent}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          EXCLUSIVITY STATEMENT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 md:py-28 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div
            className="mx-auto mb-8"
            style={{ width: "48px", height: "1px", background: "hsl(var(--gold) / 0.4)" }}
          />
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-normal text-white/90 leading-relaxed mb-8">
            "Many of Austin's most desirable homes never hit the public market. They move through private channels, trusted relationships, and curated networks."
          </blockquote>
          <p className="text-white/40 text-sm tracking-[0.15em] uppercase">
            — Echelon Property Group
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            HOW IT WORKS
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-14">
            Three Steps to Private Access
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              { step: "01", title: "Submit Your Criteria", body: "Tell us what you're looking for — property type, budget, timeline, and preferred neighborhoods across Austin." },
              { step: "02", title: "We Source Opportunities", body: "We tap our private network of sellers, developers, and investors to match you with off-market properties that fit." },
              { step: "03", title: "Early & Exclusive Access", body: "You see opportunities before they hit the public market — with expert advisory and deal structuring support." },
            ].map((item) => (
              <div key={item.step} className="group text-center md:text-left">
                <span className="text-[hsl(var(--gold))] font-display text-4xl font-light inline-block transition-transform duration-500 ease-out group-hover:scale-125">{item.step}</span>
                <h3 className="text-white font-medium text-base mt-3 mb-2 transition-colors duration-500 group-hover:text-[hsl(var(--gold))]">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <button
              onClick={scrollToForm}
              className="border-2 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))] hover:text-white hover:border-[hsl(var(--gold))] px-10 py-4 transition-all duration-300 active:scale-[0.98] tracking-[0.2em] uppercase font-sans font-medium"
              style={{ fontSize: "0.65rem" }}
            >
              REQUEST PRIVATE ACCESS
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHY OFF-MARKET
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            THE OFF-MARKET ADVANTAGE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Why Serious Buyers Go Off-Market
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
            {[
              { title: "Less Competition", body: "Fewer buyers know about the opportunity — giving you stronger positioning and more room to negotiate." },
              { title: "Better Terms", body: "Flexible deal structures, creative financing, and the ability to negotiate beyond standard MLS contracts." },
              { title: "Hidden Inventory", body: "Access properties that never appear on Zillow, Realtor.com, or the Austin MLS — homes that trade exclusively through private channels." },
              { title: "Relationship-Driven Access", body: "The best off-market homes in Austin move through trusted agent networks and direct seller relationships — not search algorithms." },
            ].map((item) => (
              <div key={item.title} className="group border-2 border-white/10 p-6 md:p-8 hover:border-[hsl(var(--gold))] hover:scale-[1.03] transition-all duration-500">
                <h3 className="text-white group-hover:text-[hsl(var(--gold))] font-medium text-base mb-2 transition-colors duration-500">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHAT YOU CAN ACCESS — with internal links
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            DEAL TYPES
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Off-Market Opportunities Across Austin
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Off-Market Luxury Homes",
                desc: "Discreet sales in Austin's most sought-after neighborhoods — Westlake Hills, Tarrytown, Barton Creek, Lake Austin, and Rollingwood.",
                links: [
                  { to: "/communities/westlake-hills", text: "Westlake Hills" },
                  { to: "/communities/barton-creek", text: "Barton Creek" },
                  { to: "/communities/tarrytown", text: "Tarrytown" },
                  { to: "/communities/lake-austin", text: "Lake Austin" },
                ],
              },
              {
                title: "Investment Properties",
                desc: "Value-add residential, small multifamily, and income-producing assets across the Austin metro area.",
                links: [
                  { to: "/austin-real-estate-investment", text: "Investment opportunities" },
                  { to: "/invest", text: "Explore investments" },
                ],
              },
              {
                title: "Land & Development",
                desc: "Raw land, infill lots, assemblage plays, and entitled development sites across Central Texas.",
                links: [
                  { to: "/land-for-sale-austin", text: "Land for sale" },
                  { to: "/austin-land-development-opportunities", text: "Development sites" },
                ],
              },
              {
                title: "Pre-Market Listings",
                desc: "Properties preparing for market that you can access and negotiate on before public exposure drives up competition.",
                links: [
                  { to: "/off-market-real-estate-austin", text: "Off-market luxury homes" },
                  { to: "/luxury-homes-austin", text: "Luxury homes Austin" },
                ],
              },
            ].map((item) => (
              <div key={item.title} className="group border-2 border-white/10 p-6 md:p-8 hover:border-[hsl(var(--gold))] hover:scale-[1.03] transition-all duration-500">
                <h3 className="text-white group-hover:text-[hsl(var(--gold))] font-medium text-base mb-2 transition-colors duration-500">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.links.map((link) => (
                    <Link key={link.to} to={link.to} className="text-[hsl(var(--gold))] hover:text-white transition-colors text-xs tracking-[0.1em] uppercase">
                      {link.text} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHY ECHELON — Authority section
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
            WHY ECHELON PROPERTY GROUP
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-6">
            Your Source for Off-Market Real Estate in Austin
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
            Echelon Property Group is an Austin-based real estate advisory firm specializing in off-market transactions, luxury homes, and investment properties. We provide discreet, relationship-driven access to opportunities most buyers never see.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { heading: "Local Expertise", body: "Deep market knowledge across Austin's luxury, investment, land, and commercial real estate sectors." },
              { heading: "Private Networks", body: "Direct relationships with developers, investors, builders, and private sellers throughout Central Texas." },
              { heading: "Advisory Approach", body: "Strategy-first guidance — we help you find, evaluate, structure, and close with confidence." },
            ].map((item) => (
              <div key={item.heading}>
                <h3 className="text-white font-medium text-sm mb-2">{item.heading}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/about" className="text-white/30 hover:text-[hsl(var(--gold))] transition-colors duration-500 text-xs tracking-[0.1em] uppercase no-underline relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[hsl(var(--gold))] after:transition-all after:duration-500 hover:after:w-full">About us</Link>
            <Link to="/communities" className="text-white/30 hover:text-[hsl(var(--gold))] transition-colors duration-500 text-xs tracking-[0.1em] uppercase no-underline relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[hsl(var(--gold))] after:transition-all after:duration-500 hover:after:w-full">Austin communities</Link>
            <Link to="/listings" className="text-white/30 hover:text-[hsl(var(--gold))] transition-colors duration-500 text-xs tracking-[0.1em] uppercase no-underline relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[hsl(var(--gold))] after:transition-all after:duration-500 hover:after:w-full">Active listings</Link>
            <Link to="/buy" className="text-white/30 hover:text-[hsl(var(--gold))] transition-colors duration-500 text-xs tracking-[0.1em] uppercase no-underline relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[hsl(var(--gold))] after:transition-all after:duration-500 hover:after:w-full">Buyer services</Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FAQ — Merged from /off-market-real-estate-austin
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-12">
            Off-Market Real Estate in Austin
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h3 className="text-white font-medium text-base mb-2">{faq.question}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
            Ready for Private Access?
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Submit your criteria and we'll match you with off-market homes, investment properties, and land opportunities across Austin — before they hit the public market.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] hover:font-bold px-12 py-4 transition-all duration-300 ease-out active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)] tracking-[0.2em] uppercase font-sans font-medium"
            style={{ fontSize: "0.65rem" }}
          >
            REQUEST PRIVATE ACCESS
          </button>
        </div>
      </section>

      {/* ── Footer (minimal) ────────────────────────── */}
      <footer className="py-8 bg-[hsl(220,15%,5%)] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">© {new Date().getFullYear()} Echelon Property Group · Austin, Texas · Brokered by eXp Realty</p>
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

export default OffMarketRealEstateAustin;
