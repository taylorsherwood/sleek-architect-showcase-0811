import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import heroImage from "@/assets/hero-luxury-austin.jpg";
import communityLakeAustin from "@/assets/community-lake-austin.jpg";
import commercialHero from "@/assets/commercial-hero-austin.jpg";
import communityHillCountry from "@/assets/community-hill-country.jpg";

/* ── fade-in utility ─────────────────────────────────── */

const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ── label micro-style ───────────────────────────────── */

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

/* ── segment cards data ──────────────────────────────── */

const segments = [
  {
    title: "Luxury & Off-Market Homes",
    description:
      "Private listings, exclusive inventory, and discreet acquisition opportunities across Austin's top luxury neighborhoods.",
    cta: "Explore Luxury Opportunities",
    to: "/off-market-real-estate-austin",
    image: communityLakeAustin,
    alt: "Lake Austin luxury waterfront homes — off-market real estate",
  },
  {
    title: "Investment Opportunities",
    description:
      "Value-add properties, income-producing assets, and strategic acquisitions for investors.",
    cta: "View Investment Opportunities",
    to: "/austin-real-estate-investment",
    image: commercialHero,
    alt: "Austin commercial real estate — investment property opportunities",
  },
  {
    title: "Land & Development",
    description:
      "Land, redevelopment sites, and development opportunities across Austin and Central Texas.",
    cta: "Explore Land Opportunities",
    to: "/land-for-sale-austin",
    image: communityHillCountry,
    alt: "Austin Hill Country land — development and land opportunities",
  },
];

/* ── component ───────────────────────────────────────── */

const Private = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fireGoogleConversion = () => {
    const runConversion = () => {
      const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtagFn === "function") {
        gtagFn("event", "Private Lead", { send_to: "AW-17598090760/BHb7CPuQr4scEIictsdB", value: 1.0, currency: "USD" });
      }
    };
    if (document.readyState === "complete") {
      runConversion();
      return;
    }
    window.addEventListener("load", runConversion, { once: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          interest: formData.interest || "General",
          message: formData.message,
          source: "Private Listings Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        fireGoogleConversion();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Access Private Real Estate Opportunities in Austin"
        description="Explore off-market luxury homes, investment properties, and land opportunities in Austin. Access private real estate deals not publicly listed on the MLS."
        ogTitle="Off-Market Real Estate in Austin | Echelon Property Group"
        ogDescription="Luxury homes, investment properties, and land opportunities not publicly listed. Explore private real estate in Austin."
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://www.echelonpropertygroup.com/" },
          { name: "Private Opportunities", url: "https://www.echelonpropertygroup.com/private" },
        ])}
      />
      <Navigation />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[62vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Austin estate representing exclusive off-market real estate opportunities"
            title="Off-market real estate deals in Austin Texas"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-[calc(7.5rem+3vh)] md:pt-[calc(7.5rem+4vh)] pb-12 md:pb-16">
          <p
            className="text-primary-foreground/50 mb-4 font-bold"
            style={labelStyle}
          >
            PRIVATE REAL ESTATE ACCESS
          </p>
          <h1 className="font-display text-[2rem] md:text-[3.2rem] lg:text-[3.8rem] font-light text-primary-foreground leading-[1.12] mb-5 tracking-tight">
            Access Off-Market Real Estate in Austin
          </h1>
          <p className="text-primary-foreground/85 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Luxury homes, investment properties, and land opportunities not publicly listed. Select your focus below to explore curated opportunities.
          </p>
        </div>
      </section>

      {/* ── SEGMENT CARDS ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {segments.map((seg, i) => (
              <FadeIn key={seg.title} delay={i * 100}>
                <Link
                  to={seg.to}
                  className="group block h-full border border-border/50 hover:border-gold transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={seg.image}
                      alt={seg.alt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy" decoding="async"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-display text-xl md:text-2xl font-light text-foreground mb-3 leading-snug">
                      {seg.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {seg.description}
                    </p>
                    <span
                      className="inline-block text-foreground group-hover:text-gold transition-colors duration-300"
                      style={labelStyle}
                    >
                      {seg.cta} →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ───────────────────────────────── */}
      <FadeIn>
        <section className="py-14 md:py-20 bg-secondary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-4">
              Why Echelon
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-[1.2] mb-10">
              Built on Relationships, Not Just Listings
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  heading: "Austin-Focused Advisory",
                  body: "Deep local expertise across luxury, investment, and development markets throughout Austin and the Hill Country.",
                },
                {
                  heading: "Access Beyond MLS",
                  body: "Private deal sourcing, off-market networks, and proactive outreach to surface opportunities others miss.",
                },
                {
                  heading: "Trusted Network",
                  body: "Direct relationships with developers, investors, private sellers, and institutional partners across Central Texas.",
                },
              ].map((item) => (
                <div key={item.heading}>
                  <h3 className="text-foreground font-medium text-base mb-2">{item.heading}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/luxury-real-estate-austin" className="hover:text-foreground transition-colors duration-200 underline underline-offset-4">Austin luxury real estate</Link>
              <Link to="/search" className="hover:text-foreground transition-colors duration-200 underline underline-offset-4">Search Austin homes</Link>
              <Link to="/land-for-sale-austin" className="hover:text-foreground transition-colors duration-200 underline underline-offset-4">Land opportunities</Link>
              <Link to="/austin-luxury-market-report" className="hover:text-foreground transition-colors duration-200 underline underline-offset-4">Market insights</Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── LEAD FORM ─────────────────────────────────── */}
      <FadeIn>
        <section id="private-form" className="py-16 md:py-24 bg-background">
          <div className="max-w-lg mx-auto px-6">
            <div className="border border-border/40 p-8 md:p-12">
              <div className="text-center mb-10">
                <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-4">
                  Get Started
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-[1.18] mb-3">
                  Looking for Something Specific?
                </h2>
                <p className="text-muted-foreground text-sm tracking-wide leading-relaxed">
                  Tell us what you're looking for and we'll connect you with relevant private opportunities.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <h3 className="font-display text-2xl text-foreground mb-4">Thank You</h3>
                  <p className="text-muted-foreground">
                    We'll be in touch within 24 hours with curated opportunities.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      What Are You Looking For?
                    </label>
                    <select
                      id="interest"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      <option value="Luxury Homes">Luxury Homes</option>
                      <option value="Investment Property">Investment Property</option>
                      <option value="Land & Development">Land & Development</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Message <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      maxLength={1000}
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-gold hover:text-primary-foreground py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300 disabled:opacity-50 mt-2 active:scale-[0.98]"
                  >
                    {loading ? "Submitting…" : "Request Private Opportunities"}
                  </button>
                  <p className="text-center text-muted-foreground text-xs tracking-wide mt-3">
                    Your information is never shared. This is a private advisory conversation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </FadeIn>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </>
  );
};

export default Private;
