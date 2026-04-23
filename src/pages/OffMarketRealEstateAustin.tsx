import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, createFAQSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import heroImage from "@/assets/hero-austin-skyline-sunset.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
import CinematicSections from "@/components/off-market/CinematicSections";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [modalOpen, setModalOpen] = useState(false);

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
    const target = document.getElementById("section-7-form");
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { duration?: number }) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(target, { duration: 1.5 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
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
        className="w-full inline-flex items-center justify-center transition-colors duration-300 ease-out disabled:opacity-50 active:scale-[0.98] mt-1"
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "0.9rem",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid #BAA26A",
          color: "#BAA26A",
          padding: "1.25rem 2.5rem",
          borderRadius: 0,
        }}
        onMouseEnter={(e) => {
          if (loading) return;
          e.currentTarget.style.backgroundColor = "#BAA26A";
          e.currentTarget.style.color = "#0C0F24";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#BAA26A";
        }}
      >
        {loading ? "Submitting…" : "Request Private Access →"}
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
            onClick={() => setModalOpen(true)}
            className="text-[hsl(var(--gold))]/80 hover:text-white transition-colors tracking-[0.12em] uppercase font-sans" style={{ fontSize: "0.75rem" }}
          >
            Request Access
          </button>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Brand statement (form moved to Section 7)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] flex items-center pt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Austin estate representing exclusive off-market real estate opportunities"
            title="Off-market homes in Austin Texas — private listings not on Zillow or MLS"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(12, 15, 36, 0.3)" }} />
          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(8, 11, 28, 0.85) 0%, rgba(8, 11, 28, 0.65) 35%, rgba(8, 11, 28, 0.3) 60%, rgba(8, 11, 28, 0.1) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(8, 11, 28, 0.7) 0%, rgba(8, 11, 28, 0.2) 40%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-24">
          <div className="max-w-full md:max-w-[60vw] text-left">
            <p className="text-[hsl(var(--gold))] mb-6 font-bold" style={labelStyle}>
              PRIVATE INVENTORY
            </p>
            <h1
              className="font-display font-light text-[#F5F1EA] mb-8 tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 7vw, 7rem)",
                lineHeight: 1.05,
                maxWidth: "60vw",
              }}
            >
              Access Austin's Private &{" "}
              <span className="italic">Off-Market</span> Homes
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-4 max-w-xl">
              These properties are not available on Zillow, Realtor.com, or the MLS.
            </p>
            <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed mb-12 max-w-xl">
              Many of Austin's most desirable homes never hit the public market. They trade quietly, through trusted relationships and private networks that most buyers never see.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center transition-colors duration-300 ease-out"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.9rem",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "transparent",
                border: "1px solid #BAA26A",
                color: "#BAA26A",
                padding: "1.25rem 2.5rem",
                borderRadius: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#BAA26A";
                e.currentTarget.style.color = "#0C0F24";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#BAA26A";
              }}
            >
              REQUEST PRIVATE ACCESS →
            </button>
          </div>
        </div>

        {/* Scroll indicator — exaggerated, elegant */}
        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
          aria-label="Scroll to explore"
          className="hero-scroll-cue absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 group cursor-pointer"
        >
          <span
            className="text-[hsl(var(--gold))] font-sans group-hover:text-white transition-colors duration-500"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Scroll
          </span>
          <span className="hero-scroll-track relative block w-[1px] h-16 md:h-20 overflow-hidden bg-[hsl(var(--gold))]/20">
            <span className="hero-scroll-bar absolute top-0 left-0 w-full h-1/2 bg-[hsl(var(--gold))]" />
          </span>
        </button>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CINEMATIC SECTIONS 2–7 (with form in Section 7)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <CinematicSections formNode={formContent} />

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

      {/* ── Lightbox: Request Private Access form ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl bg-[hsl(220,15%,8%)] border border-white/10 p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request Private Access</DialogTitle>
          <DialogDescription className="sr-only">
            Submit your details to receive curated off-market opportunities in Austin.
          </DialogDescription>
          {!submitted && (
            <div className="mb-6">
              <p className="text-[hsl(var(--gold))] mb-3 font-bold" style={labelStyle}>
                PRIVATE ACCESS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-light leading-tight">
                Request Private Access
              </h2>
            </div>
          )}
          {formContent}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OffMarketRealEstateAustin;
