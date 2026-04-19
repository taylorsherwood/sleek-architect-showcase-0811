import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroImage from "@/assets/listing-westlake-2210-westlake-dr.jpg";
import sectionImage from "@/assets/listing-tarrytown-2621-exposition.jpg";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const SITE = "https://www.echelonpropertygroup.com";
const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

const eyebrowStyle = {
  fontSize: "0.62rem" as const,
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const SellPrivate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    timeline: "",
  });
  const [loading, setLoading] = useState(false);

  const fireConversion = () => {
    const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtagFn === "function") {
      gtagFn("event", "conversion", {
        send_to: "AW-17598090760/BHb7CPuQr4scEIictsdB",
        value: 1.0,
        currency: "USD",
      });
      gtagFn("event", "PrivateSeller_Lead", {
        event_category: "Lead",
        event_label: form.timeline || "Unspecified",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) return;
    setLoading(true);
    try {
      await fetch(ZAPIER_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone,
          property_address: form.address,
          timeline: form.timeline || "Not specified",
          interest: "Private Seller Inquiry",
          source: "Sell Private Landing Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      fireConversion();
      navigate("/sell-private/thank-you");
    } catch {
      navigate("/sell-private/thank-you");
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── Form field styles (ivory card on dark section) ──
  const fieldLabel =
    "block text-[hsl(220,15%,8%)]/55 mb-2";
  const fieldInput =
    "w-full bg-transparent border-b border-[hsl(220,15%,8%)]/15 focus:border-[hsl(var(--gold))] outline-none py-3 text-[hsl(220,15%,8%)] font-sans transition-colors placeholder:text-[hsl(220,15%,8%)]/30";
  const fieldSelect =
    "w-full bg-transparent border-b border-[hsl(220,15%,8%)]/15 focus:border-[hsl(var(--gold))] outline-none py-3 text-[hsl(220,15%,8%)] font-sans transition-colors appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <SEOHead
        title="Sell Your Home Off Market in Austin | Private Seller Strategy"
        description="Explore a discreet way to sell your home in Austin without going fully public. Private seller strategy for homeowners seeking control, privacy, and flexibility."
        canonical="/sell-private"
        ogTitle="Sell Your Home Off Market in Austin"
        ogDescription="A quieter, more controlled way to explore a sale in Austin — without open houses, public days on market, or unnecessary exposure."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Private Seller Strategy", url: `${SITE}/sell-private` },
        ])}
      />
      <SchemaMarkup schema={realEstateAgentSchema} />

      {/* ─────────── Minimal advisory header ─────────── */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-white/90 hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.72rem" }}
          >
            Echelon Property Group
          </Link>
          <button
            onClick={() => scrollTo("private-sale-form")}
            className="text-[hsl(var(--gold))] hover:text-white transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.7rem" }}
          >
            Request Strategy
          </button>
        </div>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-center bg-[hsl(220,15%,8%)]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Discreet luxury residence in Austin's most sought-after neighborhoods"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* warmer, darker overlay for readability */}
          <div className="absolute inset-0 bg-[hsl(220,15%,8%)]/72" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, hsl(220 15% 6% / 0.78) 0%, hsl(220 15% 6% / 0.5) 55%, hsl(220 15% 6% / 0.35) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 pt-28 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-2xl">
            <p className="text-[hsl(var(--gold))] mb-7" style={eyebrowStyle}>
              Private Seller Advisory
            </p>
            <h1 className="font-display text-[2rem] sm:text-[2.5rem] md:text-[3.1rem] lg:text-[3.5rem] font-light text-white leading-[1.08] mb-7 tracking-tight">
              Sell Your Home Without <span className="italic">Going Fully Public</span>
            </h1>
            <p className="text-white/72 text-base sm:text-lg font-light leading-[1.65] mb-11 max-w-xl">
              A quieter, more controlled way to explore a sale in Austin — without open houses, public days on market, or unnecessary exposure.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-9">
              <button
                onClick={() => scrollTo("private-sale-form")}
                className="bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] px-9 py-[1.05rem] transition-colors duration-300 tracking-[0.22em] uppercase font-sans font-medium"
                style={{ fontSize: "0.7rem" }}
              >
                Request a Private Sale Strategy
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="text-white/85 hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans border-b border-white/30 hover:border-[hsl(var(--gold))]/60 pb-1 self-start"
                style={{ fontSize: "0.7rem" }}
              >
                How it Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Compact credibility band ─────────── */}
      <section className="bg-[#F5F3EF] border-b border-[hsl(220,15%,8%)]/8">
        <div className="container mx-auto px-6 py-7 md:py-9 max-w-5xl text-center">
          <p
            className="text-[hsl(220,15%,8%)]/75 font-light leading-relaxed text-[0.95rem] md:text-base"
          >
            Serving sellers across <span className="text-[hsl(220,15%,8%)]">Barton Creek</span>,{" "}
            <span className="text-[hsl(220,15%,8%)]">Westlake Hills</span>,{" "}
            <span className="text-[hsl(220,15%,8%)]">Rollingwood</span>,{" "}
            <span className="text-[hsl(220,15%,8%)]">Tarrytown</span>, and Austin's most sought-after neighborhoods.
          </p>
        </div>
      </section>

      {/* ─────────── SECTION 1 — Before You List Publicly ─────────── */}
      <section className="bg-[#F5F3EF] py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
                The Approach
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.2rem] lg:text-[2.6rem] font-light text-[hsl(220,15%,8%)] leading-[1.15] mb-7 tracking-tight">
                Before You List Publicly
              </h2>
              <p className="text-[hsl(220,15%,8%)]/75 text-base md:text-[1.05rem] font-light leading-[1.75] mb-5">
                Not every home should start with broad public exposure.
              </p>
              <p className="text-[hsl(220,15%,8%)]/65 text-base font-light leading-[1.75] mb-9">
                For some sellers, a more discreet approach creates better control, better timing, and a cleaner decision-making process.
              </p>
              <p className="text-[hsl(220,15%,8%)]/55 mb-5" style={eyebrowStyle}>
                A private sale strategy can help you
              </p>
              <ul className="space-y-3.5">
                {[
                  "Preserve privacy",
                  "Avoid unnecessary showings",
                  "Test real demand quietly",
                  "Decide whether a public launch is even necessary",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="w-[5px] h-[5px] rounded-full bg-[hsl(var(--gold))] mt-[0.7rem] shrink-0" />
                    <span className="text-[hsl(220,15%,8%)]/80 text-base font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="aspect-[4/5] overflow-hidden bg-[hsl(220,15%,8%)]/5">
                <img
                  src={sectionImage}
                  alt="Refined Tarrytown residence — discreet seller representation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="hidden lg:block absolute -bottom-5 -left-5 w-24 h-px"
                style={{ background: "hsl(var(--gold))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 2 — How the Process Works ─────────── */}
      <section id="how-it-works" className="bg-[hsl(220,15%,8%)] py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              The Process
            </p>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] lg:text-[2.6rem] font-light text-white leading-[1.15] tracking-tight max-w-2xl mx-auto">
              How the Process Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {[
              {
                num: "01",
                title: "Private Review",
                body: "We discuss your property, timing, and goals.",
              },
              {
                num: "02",
                title: "Selective Exposure",
                body: "If appropriate, your home is introduced discreetly through a curated network.",
              },
              {
                num: "03",
                title: "Strategic Next Step",
                body: "You evaluate private interest and decide whether to stay quiet or go to market from a stronger position.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="border-t border-[hsl(var(--gold))]/30 pt-7 md:pt-9"
              >
                <p
                  className="text-[hsl(var(--gold))] font-display font-light mb-6"
                  style={{ fontSize: "1.1rem", letterSpacing: "0.15em" }}
                >
                  {step.num}
                </p>
                <h3 className="font-display text-xl md:text-[1.4rem] font-light text-white mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/65 text-[0.95rem] md:text-base font-light leading-[1.75]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 3 — Who This Is For ─────────── */}
      <section className="bg-[#F5F3EF] py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 md:mb-16">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              The Fit
            </p>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] lg:text-[2.6rem] font-light text-[hsl(220,15%,8%)] leading-[1.15] tracking-tight">
              Who This Is For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mb-16">
            {[
              {
                title: "Sellers Who Value Privacy",
                body: "Discretion matters — whether for personal, professional, or family reasons.",
              },
              {
                title: "Not Ready for a Full Public Listing",
                body: "Considering a sale, but not prepared for open houses, photography, and public days on market.",
              },
              {
                title: "Wanting to Understand Options",
                body: "Exploring what a sale could look like before committing to a direction.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <h3 className="font-display text-lg md:text-[1.25rem] font-light text-[hsl(220,15%,8%)] mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[hsl(220,15%,8%)]/65 text-[0.95rem] font-light leading-[1.75]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center pt-10 border-t border-[hsl(220,15%,8%)]/10">
            <p className="text-[hsl(220,15%,8%)]/65 text-[0.95rem] md:text-base font-light leading-[1.8] italic">
              This is not the right fit for every property. The goal is not to force a private sale — it's to assess whether a quieter approach gives you leverage.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 4 — Form / Conversion ─────────── */}
      <section
        id="private-sale-form"
        className="bg-[hsl(220,15%,8%)] py-20 md:py-28"
      >
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              Confidential Inquiry
            </p>
            <h2 className="font-display text-[1.85rem] md:text-[2.3rem] lg:text-[2.7rem] font-light text-white leading-[1.12] tracking-tight mb-6">
              Request a Private Sale Strategy
            </h2>
            <p className="text-white/65 text-base md:text-[1.05rem] font-light leading-[1.7] max-w-xl mx-auto">
              Tell us a bit about your property and timing. We'll follow up personally with a clear, honest perspective.
            </p>
          </div>

          {/* Ivory card on dark navy */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#F5F3EF] p-6 sm:p-9 md:p-12 space-y-7"
          >
            <div>
              <label htmlFor="sp-name" className={fieldLabel} style={eyebrowStyle}>
                Name
              </label>
              <input
                id="sp-name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className={fieldInput}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="sp-address" className={fieldLabel} style={eyebrowStyle}>
                Property Address
              </label>
              <input
                id="sp-address"
                type="text"
                required
                maxLength={200}
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className={fieldInput}
                placeholder="Street, city"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="sp-email" className={fieldLabel} style={eyebrowStyle}>
                  Email
                </label>
                <input
                  id="sp-email"
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={fieldInput}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="sp-phone" className={fieldLabel} style={eyebrowStyle}>
                  Phone
                </label>
                <input
                  id="sp-phone"
                  type="tel"
                  required
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: formatPhoneNumber(e.target.value) }))}
                  className={fieldInput}
                  placeholder="(512) 000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sp-timeline" className={fieldLabel} style={eyebrowStyle}>
                Timeline
              </label>
              <select
                id="sp-timeline"
                value={form.timeline}
                onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
                className={fieldSelect}
              >
                <option value="">Select</option>
                <option value="Just exploring">Just exploring</option>
                <option value="3–6 months">3–6 months</option>
                <option value="6–12 months">6–12 months</option>
                <option value="Soon">Soon</option>
              </select>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-[1.1rem] tracking-[0.22em] uppercase font-sans font-medium transition-colors duration-300 ease-out disabled:opacity-50 bg-[hsl(220,15%,8%)] hover:bg-[hsl(var(--gold))] text-white"
                style={{ fontSize: "0.72rem" }}
              >
                {loading ? "Submitting…" : "Submit Request"}
              </button>
              <p className="text-center text-[hsl(220,15%,8%)]/55 text-xs tracking-wide mt-5 font-light">
                No pressure. No obligation. Just a private conversation.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ─────────── Soft close ─────────── */}
      <section className="bg-[#F5F3EF] py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="font-display text-[1.6rem] md:text-[2rem] font-light text-[hsl(220,15%,8%)] mb-6 leading-tight tracking-tight">
            Not Sure Yet?
          </h2>
          <p className="text-[hsl(220,15%,8%)]/70 text-base md:text-[1.05rem] font-light leading-[1.75]">
            That's fine. Many sellers begin here simply to understand their options before deciding how or when to move.
          </p>
        </div>
      </section>

      {/* ─────────── Quiet footer ─────────── */}
      <footer className="bg-[hsl(220,15%,8%)] py-10">
        <div className="container mx-auto px-6 text-center">
          <Link
            to="/"
            className="text-white/55 hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.7rem" }}
          >
            Echelon Property Group · Austin, Texas
          </Link>
          <p className="text-white/30 text-[0.65rem] tracking-[0.2em] uppercase mt-4">
            Discreet · Confidential · By Inquiry
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SellPrivate;
