import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroImage from "@/assets/community-westlake-hills.webp";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const SITE = "https://www.echelonpropertygroup.com";
const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const SellPrivate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
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
      // silent — still route to thank you so user isn't blocked
      navigate("/sell-private/thank-you");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("private-sale-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-[hsl(var(--gold))] outline-none py-3 text-white font-sans transition-colors placeholder:text-white/30";
  const selectClass =
    "w-full bg-transparent border-b border-white/20 focus:border-[hsl(var(--gold))] outline-none py-3 text-white font-sans transition-colors appearance-none cursor-pointer [&>option]:bg-[hsl(220,15%,12%)] [&>option]:text-white";

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)]">
      <SEOHead
        title="Sell Your Home Off Market in Austin | Private Home Sales Strategy"
        description="Explore a discreet way to sell your home in Austin without going fully public. Work with a private sale strategy tailored to your property."
        canonical="/sell-private"
        ogTitle="Sell Your Home Off Market in Austin"
        ogDescription="A quieter, more controlled way to sell your Austin home—without open houses or testing the market publicly."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Sell Privately", url: `${SITE}/sell-private` },
        ])}
      />
      <SchemaMarkup schema={realEstateAgentSchema} />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,15%,8%)]/60 backdrop-blur-[6px] border-b border-white/[0.03]">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-white/[0.85] hover:text-[hsl(var(--gold))] transition-colors tracking-[0.18em] uppercase font-sans"
            style={{ fontSize: "0.8rem" }}
          >
            Echelon Property Group
          </Link>
          <button
            onClick={scrollToForm}
            className="text-[hsl(var(--gold))]/80 hover:text-white transition-colors tracking-[0.12em] uppercase font-sans"
            style={{ fontSize: "0.75rem" }}
          >
            Request Strategy
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Discreet luxury home sale in Westlake Hills, Austin"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,8%)]/40 via-[hsl(220,15%,8%)]/70 to-[hsl(220,15%,8%)]" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--gold) / 0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[hsl(var(--gold))] mb-6 font-bold" style={labelStyle}>
              PRIVATE SELLER ADVISORY
            </p>
            <h1 className="font-display text-[1.85rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-light text-white leading-[1.1] mb-6 tracking-tight">
              Sell Your Home Without <span className="italic">Going Fully Public</span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
              Explore a quieter, more controlled way to sell—without open houses, excessive showings, or testing the market publicly.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <button
                onClick={scrollToForm}
                className="bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] px-8 sm:px-10 py-4 transition-all duration-300 active:scale-[0.98] tracking-[0.2em] uppercase font-sans font-medium"
                style={{ fontSize: "0.7rem" }}
              >
                Request a Private Sale Strategy
              </button>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[hsl(var(--gold))]/85 hover:text-white transition-colors tracking-[0.2em] uppercase font-sans border-b border-[hsl(var(--gold))]/40 hover:border-white/60 pb-1"
                style={{ fontSize: "0.7rem" }}
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-10 md:py-12 bg-[hsl(220,15%,6%)] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-white/50 text-sm md:text-base font-light tracking-wide">
            Serving Austin's most sought-after neighborhoods
          </p>
          <p className="text-[hsl(var(--gold))] mt-3 tracking-[0.25em] uppercase text-xs sm:text-sm">
            Barton Creek &nbsp;•&nbsp; Westlake Hills &nbsp;•&nbsp; Rollingwood &nbsp;•&nbsp; Downtown
          </p>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            THE SHIFT
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white text-center mb-10 leading-tight">
            Before You List, Consider This
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed text-center mb-6">
            Not every home needs to hit the open market to achieve a strong result.
          </p>
          <p className="text-white/60 text-base font-light leading-relaxed text-center mb-12">
            In many cases, the right buyer is already actively looking—they just haven't seen your home yet.
          </p>
          <p className="text-white/55 text-sm tracking-[0.2em] uppercase text-center mb-6">
            A private sale allows you to:
          </p>
          <ul className="space-y-4 max-w-xl mx-auto">
            {[
              "Maintain discretion",
              "Control timing",
              "Avoid unnecessary disruption",
              "Gauge real demand before making a public move",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-2 shrink-0" />
                <span className="text-white/75 text-base font-light leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[hsl(220,15%,6%)] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            HOW IT WORKS
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white text-center mb-16">
            A More Controlled Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                num: "1",
                title: "Private Evaluation",
                body: "We assess your home, timing, and goals—quietly.",
              },
              {
                num: "2",
                title: "Targeted Exposure",
                body: "Your home is shared with a curated network of qualified buyers and agents.",
              },
              {
                num: "3",
                title: "Strategic Decision",
                body: "Accept a strong private offer or transition to market with leverage.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-[hsl(var(--gold))] font-light mb-5">
                  {step.num}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-light text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/60 text-base font-light leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
            THE DIFFERENCE
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white mb-10 leading-tight">
            This Isn't a Public Listing Strategy
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-6">
            Most agents rely entirely on public exposure.
          </p>
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-6">
            We take a more selective approach—one that prioritizes discretion, positioning, and access.
          </p>
          <p className="text-white/55 text-base font-light leading-relaxed italic">
            In some cases, we may already have buyers actively searching for homes like yours.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="private-sale-form" className="py-20 md:py-28 bg-[hsl(220,15%,6%)] border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <p className="text-[hsl(var(--gold))] text-center mb-4 font-bold" style={labelStyle}>
            CONFIDENTIAL INQUIRY
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white text-center mb-12 leading-tight">
            Request a Private Sale Strategy
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:p-10">
            <div>
              <label htmlFor="sp-name" className="block text-white/40 mb-1.5" style={labelStyle}>Name</label>
              <input
                id="sp-name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="sp-address" className="block text-white/40 mb-1.5" style={labelStyle}>Property Address</label>
              <input
                id="sp-address"
                type="text"
                required
                maxLength={200}
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className={inputClass}
                placeholder="Street, city"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sp-phone" className="block text-white/40 mb-1.5" style={labelStyle}>Phone</label>
                <input
                  id="sp-phone"
                  type="tel"
                  required
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: formatPhoneNumber(e.target.value) }))}
                  className={inputClass}
                  placeholder="(512) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="sp-email" className="block text-white/40 mb-1.5" style={labelStyle}>Email</label>
                <input
                  id="sp-email"
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="sp-timeline" className="block text-white/40 mb-1.5" style={labelStyle}>
                Timeline <span className="normal-case tracking-normal text-white/25">(optional)</span>
              </label>
              <select
                id="sp-timeline"
                value={form.timeline}
                onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="Just exploring">Just exploring</option>
                <option value="3–6 months">3–6 months</option>
                <option value="6–12 months">6–12 months</option>
                <option value="Soon">Soon</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 ease-out disabled:opacity-50 active:scale-[0.98] mt-2 bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] hover:font-bold"
              style={{ fontSize: "0.7rem" }}
            >
              {loading ? "Submitting…" : "Submit Request"}
            </button>
            <p className="text-center text-white/40 text-xs tracking-wide">
              No pressure. No obligation. Just a conversation.
            </p>
          </form>
        </div>
      </section>

      {/* SOFT CLOSE */}
      <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8">
            Not Sure Yet?
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-6">
            That's completely fine. Many of our clients start here—simply exploring their options before making a decision.
          </p>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            We're happy to give you a clear, honest perspective based on your property and goals.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-24 bg-[hsl(220,15%,6%)] border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <button
            onClick={scrollToForm}
            className="bg-[hsl(var(--gold))] hover:bg-white text-white hover:text-[hsl(var(--gold))] px-10 sm:px-14 py-4 transition-all duration-300 active:scale-[0.98] tracking-[0.2em] uppercase font-sans font-medium"
            style={{ fontSize: "0.7rem" }}
          >
            Start the Conversation
          </button>
          <p className="text-white/35 text-xs tracking-[0.2em] uppercase mt-6">
            Discreet · Confidential · No Obligation
          </p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-10 bg-[hsl(220,15%,5%)] border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Link
            to="/"
            className="text-white/40 hover:text-[hsl(var(--gold))] transition-colors tracking-[0.18em] uppercase font-sans"
            style={{ fontSize: "0.7rem" }}
          >
            Echelon Property Group · Austin, Texas
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SellPrivate;
