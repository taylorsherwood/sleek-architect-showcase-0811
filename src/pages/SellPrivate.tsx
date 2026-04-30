import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroPoster from "@/assets/sell-private-hero-poster.webp";
import heroVideoMp4 from "@/assets/video/sell-private-hero.mp4";
import heroVideoWebm from "@/assets/video/sell-private-hero.webm";
import sectionImage from "@/assets/sell-private-approach-kitchen.webp";
import { formatPhoneNumber, submitLeadToZapier } from "@/lib/formUtils";

const SITE = "https://www.echelonpropertygroup.com";

// Brand tokens
const IVORY = "#F5F3EF";
const NAVY = "#0C0F24";

const eyebrowStyle = {
  fontSize: "0.62rem" as const,
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const SellPrivate = () => {
  const navigate = useNavigate();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    timeline: "",
  });
  const [loading, setLoading] = useState(false);

  // Replay hero video when it re-enters viewport (e.g., user scrolls back to top)
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    let hasLeft = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          hasLeft = true;
          return;
        }
        if (hasLeft) {
          video.currentTime = 0;
          video.play().catch(() => {});
          hasLeft = false;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
    const message = `Private seller inquiry — Address: ${form.address}${form.timeline ? ` | Timeline: ${form.timeline}` : ""}`;
    await submitLeadToZapier({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message,
      source: "Sell Private Landing Page",
      extra: {
        property_address: form.address,
        timeline: form.timeline || "Not specified",
        interest: "Private Seller Inquiry",
      },
    });
    fireConversion();
    setLoading(false);
    navigate("/sell-private/thank-you");
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Form field styles — ivory card on dark navy
  const fieldLabel = "block mb-2";
  const fieldLabelStyle = { ...eyebrowStyle, color: `${NAVY}B3` }; // ~70% navy
  const fieldInput =
    "w-full bg-transparent border-b border-[#0C0F24]/25 focus:border-[hsl(var(--gold))] outline-none py-3 text-[#0C0F24] font-sans transition-colors placeholder:text-[#0C0F24]/40";
  const fieldSelect =
    "w-full bg-transparent border-b border-[#0C0F24]/25 focus:border-[hsl(var(--gold))] outline-none py-3 text-[#0C0F24] font-sans transition-colors appearance-none cursor-pointer";

  return (
    <div className="min-h-screen" style={{ backgroundColor: IVORY }}>
      <SEOHead
        title="Sell Your Home Off Market in Austin | Private Seller Strategy"
        description="Explore a discreet way to sell your home in Austin without going fully public. Private seller strategy for homeowners seeking control, privacy, and flexibility."
        canonical="/sell-private"
        ogTitle="Sell Your Home Off Market in Austin"
        ogDescription="A more controlled way to explore a sale in Austin — without open houses, excessive showings, or public days on market."
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
            className="text-[#F5F3EF] hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.72rem" }}
          >
            Echelon Property Group
          </Link>
          <button
            onClick={() => scrollTo("private-sale-form")}
            className="text-[hsl(var(--gold))] hover:text-[#F5F3EF] transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.7rem" }}
          >
            Request Strategy
          </button>
        </div>
      </header>

      {/* Sticky desktop CTA removed for editorial cleanliness */}


      {/* ─────────── HERO ─────────── */}
      <section className="relative min-h-[78vh] md:min-h-[82vh] flex items-center" style={{ backgroundColor: NAVY }}>
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={heroPoster}
            aria-hidden="true"
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoMp4} type="video/mp4" />
          </video>
          {/* Dark overlay for hero text legibility */}
          <div className="absolute inset-0" style={{ backgroundColor: "#000000", opacity: 0.5 }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(12,15,36,0.42) 0%, rgba(12,15,36,0.18) 65%, rgba(12,15,36,0.1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 pt-20 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-2xl">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              Private Seller Advisory
            </p>
            <h1
              className="font-display text-[1.95rem] sm:text-[2.4rem] md:text-[2.95rem] lg:text-[3.3rem] font-light leading-[1.1] mb-5 tracking-tight"
              style={{ color: IVORY }}
            >
              Sell Your Home Quietly Without <span className="italic">Going Fully Public</span>
            </h1>
            <p
              className="text-base sm:text-lg font-light leading-[1.65] mb-3 max-w-xl"
              style={{ color: "rgba(245,243,239,0.88)" }}
            >
              A more controlled way to explore a sale in Austin — without open houses, excessive showings, or public days on market.
            </p>
            <p
              className="font-semibold tracking-[0.18em] uppercase mb-5 text-[hsl(var(--gold))]"
              style={{ fontSize: "0.62rem", fontFamily: '"Jost", sans-serif' }}
            >
              For homeowners who value discretion over exposure.
            </p>
            <p
              className="text-[0.95rem] sm:text-base font-light leading-[1.65] mb-8 max-w-xl italic"
              style={{ color: "rgba(245,243,239,0.72)" }}
            >
              In some cases, we already have buyers actively searching for homes like yours.
            </p>
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                <button
                  onClick={() => scrollTo("private-sale-form")}
                  className="bg-[hsl(var(--gold))] hover:bg-[#F5F3EF] text-[#F5F3EF] hover:text-[hsl(var(--gold))] px-9 py-[1.05rem] transition-colors duration-300 tracking-[0.22em] uppercase font-sans font-medium"
                  style={{ fontSize: "0.7rem" }}
                >
                  Request a Private Sale Strategy
                </button>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="text-[#F5F3EF] hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans border-b border-[#F5F3EF]/40 hover:border-[hsl(var(--gold))]/60 pb-1 self-start sm:self-auto"
                  style={{ fontSize: "0.7rem" }}
                >
                  How it Works
                </button>
              </div>
              <p
                className="font-sans tracking-wide"
                style={{ fontSize: "0.7rem", color: "rgba(245,243,239,0.6)" }}
              >
                No pressure. No obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── TENSION STRIP ─────────── */}
      <div className="h-2 md:h-3" aria-hidden="true" style={{ backgroundColor: IVORY }} />
      <section className="border-b" style={{ backgroundColor: IVORY, borderColor: "rgba(12,15,36,0.06)" }}>
        <div className="container mx-auto px-6 py-7 md:py-10 max-w-5xl">
          <div className="grid md:grid-cols-[17rem_1fr] gap-7 md:gap-14 items-center">
            <div>
              <p className="text-[hsl(var(--gold))] mb-2.5" style={eyebrowStyle}>
                The Reality
              </p>
              <h2
                className="font-display text-[1.4rem] md:text-[1.6rem] font-light leading-[1.18] tracking-tight"
                style={{ color: NAVY }}
              >
                Why Some Sellers<br />Avoid the Open Market
              </h2>
            </div>
            <ul>
              {[
                "Privacy concerns",
                "Avoiding constant showings and disruption",
                "Not wanting to test pricing publicly",
                "Uncertainty about timing",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-5 py-2.5 first:pt-0 last:pb-0 border-t first:border-t-0"
                  style={{ borderColor: "rgba(12,15,36,0.06)" }}
                >
                  <span
                    className="font-sans tracking-[0.18em] shrink-0 tabular-nums"
                    style={{ fontSize: "0.62rem", color: "rgba(12,15,36,0.4)" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-[0.95rem] md:text-base font-normal leading-[1.5]"
                    style={{ color: "rgba(12,15,36,0.82)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="h-2 md:h-3" aria-hidden="true" style={{ backgroundColor: IVORY }} />

      {/* ─────────── SECTION 1 — Before You List Publicly ─────────── */}
      <section className="py-8 md:py-11" style={{ backgroundColor: IVORY }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-[hsl(var(--gold))] mb-3.5" style={eyebrowStyle}>
                THE APPROACH
              </p>
              <h2
                className="font-display text-[1.7rem] md:text-[2rem] lg:text-[2.3rem] font-light leading-[1.12] mb-4 tracking-tight"
                style={{ color: NAVY }}
              >
                Before You List Publicly
              </h2>
              <p
                className="text-base md:text-[1.05rem] font-light leading-[1.6] mb-2.5"
                style={{ color: "rgba(12,15,36,0.82)" }}
              >
                Not every home should start with broad public exposure.
              </p>
              <p
                className="text-base font-light leading-[1.6] mb-2.5"
                style={{ color: "rgba(12,15,36,0.72)" }}
              >
                For some sellers, a more discreet approach creates better control, better timing, and a cleaner decision-making process.
              </p>
              <p
                className="text-base font-light leading-[1.6] mb-6"
                style={{ color: "rgba(12,15,36,0.72)" }}
              >
                For some sellers, going public too early creates unnecessary friction.
              </p>
              <p
                className="mb-3"
                style={{ ...eyebrowStyle, color: "rgba(12,15,36,0.6)" }}
              >
                A PRIVATE SALE STRATEGY CAN HELP YOU
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Preserve privacy",
                  "Avoid unnecessary showings",
                  "Test real demand quietly",
                  "Decide whether a public launch is even necessary",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span
                      className="w-[5px] h-[5px] rounded-full mt-[0.6rem] shrink-0"
                      style={{ backgroundColor: "hsl(var(--gold))" }}
                    />
                    <span
                      className="text-base font-light leading-[1.55]"
                      style={{ color: "rgba(12,15,36,0.85)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="text-[0.98rem] md:text-base font-light leading-[1.7] italic"
                style={{ color: "rgba(12,15,36,0.72)" }}
              >
                In many cases, this approach creates stronger leverage, even if you ultimately decide to list publicly.
              </p>
            </div>

            <div className="relative order-first lg:order-last lg:-mr-[6vw] xl:-mr-[10vw]">
              <div className="aspect-[3/2] sm:aspect-[16/9] lg:aspect-[16/9] overflow-hidden" style={{ backgroundColor: "rgba(12,15,36,0.05)" }}>
                <img
                  src={sectionImage}
                  alt="Refined Austin luxury home exterior at dusk — discreet seller representation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Quiet authority signal ─────────── */}
      <section style={{ backgroundColor: IVORY }}>
        <div className="container mx-auto px-6 max-w-3xl text-center pb-8">
          <div
            className="w-24 h-px mx-auto mb-6"
            style={{ background: "hsl(var(--gold))" }}
          />
          <p
            className="font-light leading-relaxed text-[0.92rem] md:text-[0.98rem]"
            style={{ color: "rgba(12,15,36,0.62)" }}
          >
            We work with buyers actively searching in <span style={{ color: NAVY }}>Barton Creek</span>,{" "}
            <span style={{ color: NAVY }}>West lake Hills</span>,{" "}
            <span style={{ color: NAVY }}>Rollingwood</span>, and central Austin.
          </p>
        </div>
      </section>

      {/* ─────────── SECTION 2 — How the Process Works ─────────── */}
      <section id="how-it-works" className="py-14 md:py-20" style={{ backgroundColor: NAVY }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              The Process
            </p>
            <h2
              className="font-display text-[1.75rem] md:text-[2.15rem] lg:text-[2.5rem] font-light leading-[1.15] tracking-tight max-w-2xl mx-auto"
              style={{ color: IVORY }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-9 md:gap-8 lg:gap-12 mb-12 md:mb-14">
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
                title: "Strategic Decision",
                body: "You evaluate private interest and decide whether to stay quiet or go to market from a stronger position.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="border-t pt-6 md:pt-8"
                style={{ borderColor: "hsl(var(--gold) / 0.4)" }}
              >
                <p
                  className="font-display font-light mb-5"
                  style={{ fontSize: "1.05rem", letterSpacing: "0.15em", color: "hsl(var(--gold))" }}
                >
                  {step.num}
                </p>
                <h3
                  className="font-display text-xl md:text-[1.35rem] font-light mb-3.5 leading-snug"
                  style={{ color: IVORY }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[0.95rem] md:text-base font-light leading-[1.75]"
                  style={{ color: "rgba(245,243,239,0.78)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center font-light leading-relaxed text-[0.95rem] md:text-base max-w-2xl mx-auto italic mb-9 md:mb-11"
            style={{ color: "rgba(245,243,239,0.7)" }}
          >
            This is not about avoiding the market — it's about approaching it more strategically.
          </p>

          {/* Mid-page CTA */}
          <div className="text-center">
            <button
              onClick={() => scrollTo("private-sale-form")}
              className="bg-[hsl(var(--gold))] hover:bg-[#F5F3EF] text-[#F5F3EF] hover:text-[hsl(var(--gold))] px-9 py-[1.05rem] transition-colors duration-300 tracking-[0.22em] uppercase font-sans font-medium"
              style={{ fontSize: "0.7rem" }}
            >
              Request a Private Sale Strategy
            </button>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 3 — Form / Conversion ─────────── */}
      <section id="private-sale-form" className="py-14 md:py-20" style={{ backgroundColor: NAVY }}>
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="text-center mb-9 md:mb-11">
            <p className="text-[hsl(var(--gold))] mb-5" style={eyebrowStyle}>
              Confidential Inquiry
            </p>
            <h2
              className="font-display text-[1.85rem] md:text-[2.25rem] lg:text-[2.6rem] font-light leading-[1.12] tracking-tight mb-5"
              style={{ color: IVORY }}
            >
              Request a Private Sale Strategy
            </h2>
            <p
              className="text-base md:text-[1.05rem] font-light leading-[1.7] max-w-xl mx-auto mb-3"
              style={{ color: "rgba(245,243,239,0.78)" }}
            >
              You'll hear directly from us — not an automated estimate.
            </p>
            <p
              className="font-light tracking-[0.18em] uppercase"
              style={{ fontSize: "0.6rem", color: "hsl(var(--gold))", fontFamily: '"Jost", sans-serif' }}
            >
              All inquiries are handled confidentially.
            </p>
          </div>

          {/* Ivory card on navy — minimal styling, no heavy borders */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-9 md:p-11 space-y-6"
            style={{ backgroundColor: IVORY }}
          >
            <div>
              <label htmlFor="sp-name" className={fieldLabel} style={fieldLabelStyle}>
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
              <label htmlFor="sp-address" className={fieldLabel} style={fieldLabelStyle}>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sp-email" className={fieldLabel} style={fieldLabelStyle}>
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
                <label htmlFor="sp-phone" className={fieldLabel} style={fieldLabelStyle}>
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
              <label htmlFor="sp-timeline" className={fieldLabel} style={fieldLabelStyle}>
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-[1.05rem] tracking-[0.22em] uppercase font-sans font-medium transition-colors duration-300 ease-out disabled:opacity-50"
                style={{
                  fontSize: "0.72rem",
                  backgroundColor: NAVY,
                  color: IVORY,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--gold))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = NAVY;
                }}
              >
                {loading ? "Submitting…" : "Submit Request"}
              </button>
              <p
                className="text-center text-xs tracking-wide mt-4 font-light"
                style={{ color: "rgba(12,15,36,0.65)" }}
              >
                Most inquiries are responded to within a few hours.
              </p>
              <p
                className="text-center text-xs tracking-wide mt-1.5 font-light"
                style={{ color: "rgba(12,15,36,0.5)" }}
              >
                No pressure. No obligation.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ─────────── Soft close ─────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: IVORY }}>
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2
            className="font-display text-[1.55rem] md:text-[1.95rem] font-light mb-5 leading-tight tracking-tight"
            style={{ color: NAVY }}
          >
            Not Sure Yet?
          </h2>
          <p
            className="text-base md:text-[1.05rem] font-light leading-[1.75]"
            style={{ color: "rgba(12,15,36,0.78)" }}
          >
            That's completely fine. Many sellers begin here simply to understand their options before deciding how or when to move.
          </p>
        </div>
      </section>

      {/* ─────────── Quiet footer ─────────── */}
      <footer className="py-9" style={{ backgroundColor: NAVY }}>
        <div className="container mx-auto px-6 text-center">
          <Link
            to="/"
            className="hover:text-[hsl(var(--gold))] transition-colors tracking-[0.22em] uppercase font-sans"
            style={{ fontSize: "0.7rem", color: "rgba(245,243,239,0.7)" }}
          >
            Echelon Property Group · Austin, Texas
          </Link>
          <p
            className="text-[0.65rem] tracking-[0.2em] uppercase mt-3.5"
            style={{ color: "rgba(245,243,239,0.4)" }}
          >
            Discreet · Confidential · By Inquiry
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SellPrivate;
