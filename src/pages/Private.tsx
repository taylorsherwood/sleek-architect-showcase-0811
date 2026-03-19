import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-luxury-austin.jpg";

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

const FadeIn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
    >
      {children}
    </div>
  );
};

const Private = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c6f787d5-449a-4d4e-bb5a-501122ab7878",
          subject: "Private Valuation Request",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        const gtag = (window as unknown as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | undefined;
        if (typeof gtag === "function") {
          gtag("event", "conversion", {
            event_category: "Lead",
            event_label: "Private Seller Lead",
            value: 1,
          });
          gtag("event", "conversion", {
            send_to: "AW-17598090760",
          });
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("private-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Private Home Sale Advisory"
        description="Confidential pricing guidance, curated buyer outreach, and discreet sale strategy for luxury, investment, and high-value Austin properties."
      />
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Austin architecture"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-[calc(7.5rem+3vh)] md:pt-[calc(7.5rem+4vh)] pb-12 md:pb-16">
          <h1 className="font-display text-[2.1rem] md:text-[3.4rem] lg:text-[4.1rem] font-light text-primary-foreground leading-[1.18] mb-4 tracking-tight">
            Private Home Sale Advisory for Austin Homeowners
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto mb-3">
            Confidential pricing guidance, curated buyer outreach, and discreet sale strategy for luxury, investment, and high-value properties.
          </p>
          <div className="w-12 h-px bg-primary-foreground/25 mx-auto mb-3" />
          <p className="text-primary-foreground/70 text-xs font-sans font-medium tracking-[0.3em] uppercase mb-6">
            Advising clients across Austin's luxury, investment, and development markets
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-7">
            <button
              onClick={scrollToForm}
              className="bg-gold hover:bg-[hsl(42,37%,50%)] text-primary-foreground px-12 py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300"
            >
              Request Private Valuation
            </button>
            <Link
              to="/connect"
              className="border border-primary-foreground/50 text-primary-foreground/90 hover:bg-primary-foreground/15 hover:border-primary-foreground/70 px-10 py-4 text-sm tracking-[0.15em] uppercase font-sans font-light transition-all duration-300 text-center"
            >
              Schedule a Consultation
            </Link>
          </div>
          <p className="text-primary-foreground/65 text-xs font-sans font-light tracking-[0.12em]" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            Trusted by Austin homeowners, investors, and developers seeking discretion.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <FadeIn>
        <section className="py-14 md:py-20 bg-background">
          <div className="max-w-[680px] mx-auto px-6">
            <p className="text-gold text-xs tracking-[0.2em] uppercase font-sans font-semibold mb-3">
              Private Advisory Fit
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-[1.18] mb-5">
              Who This Advisory Is For
            </h2>
            <ul className="space-y-3 mt-5">
              {[
                "Luxury homeowners seeking discretion and privacy",
                "Properties that may benefit from off-market positioning",
                "Unique, high-value, or hard-to-comp properties",
                "Sellers who want to test pricing without going public",
                "Development, land, or investment-oriented assets",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-gold mt-2.5 shrink-0" />
                  <span className="text-foreground text-base font-sans font-light leading-[1.8] tracking-wide">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm font-sans font-light tracking-wide mt-8 leading-relaxed">
              Not every property is a fit for a private sale strategy. We'll help you determine the right approach.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* POSITIONING */}
      <section className="py-14 md:py-22 bg-warm-cream">
        <div className="max-w-[680px] mx-auto px-6">
          <p className="text-gold text-xs tracking-[0.2em] uppercase font-sans font-semibold mb-3">
            Private Advisory
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-[1.18] mb-8">
            Not Every Property Should Be Sold Publicly
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.9] mb-6">
            Many high-value properties trade quietly through private networks, institutional relationships, and curated buyer pools.
          </p>
          <p className="text-muted-foreground text-lg leading-[1.9] mb-6">
            For certain homes, a public listing can limit flexibility, reduce leverage, or attract the wrong exposure.
          </p>
          <p className="text-muted-foreground text-lg leading-[1.9]">
            We help you evaluate both paths—so you can make a strategic decision, not just a conventional one.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-14 md:py-22 bg-background border-t border-border/40">
        <div className="max-w-[680px] mx-auto px-6">
          <p className="text-gold text-xs tracking-[0.2em] uppercase font-sans font-semibold mb-3">
            What You Receive
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-[1.18] mb-6">
            What This Advisory Includes
          </h2>
          <ul className="space-y-5">
            {[
              "Confidential valuation and pricing strategy",
              "Access to qualified off-market and institutional buyers",
              "Strategic positioning to maximize leverage and discretion",
              "Direct advisory throughout the entire decision process",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                <span className="text-foreground text-base font-sans font-light leading-[1.8] tracking-wide">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FORM */}
      <FadeIn>
        <section id="private-form" className="py-14 md:py-22 bg-warm-cream">
          <div className="max-w-lg mx-auto px-6">
            <div className="bg-background/60 border border-border/30 rounded-sm p-8 md:p-12">
              <div className="text-center mb-10">
                <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-5">
                  Get Started
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-[1.18] mb-3">
                  Request a Confidential Property Assessment
                </h2>
                <p className="text-muted-foreground text-sm tracking-wide leading-relaxed">
                  No obligation. Fully confidential. Direct advisory from Taylor Sherwood.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <h3 className="font-display text-2xl text-foreground mb-4">Thank You</h3>
                  <p className="text-muted-foreground">
                    We'll be in touch within 24 hours with your confidential assessment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors rounded-sm"
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
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors rounded-sm"
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-sans mb-2">
                      Property Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      maxLength={200}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-gold hover:text-primary-foreground py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300 disabled:opacity-50 mt-4 rounded-sm"
                  >
                    {loading ? "Submitting…" : "Request Private Review"}
                  </button>
                  <div className="text-center space-y-1.5 mt-3">
                    <p className="text-muted-foreground text-xs tracking-wide">
                      Your information is never shared. This is a private advisory conversation.
                    </p>
                    <p className="text-muted-foreground text-xs tracking-wide">
                      Typical clients include luxury homeowners, investors, and developers across Austin.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* TRUST */}
      <section className="py-12 md:py-14 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg font-sans font-light leading-relaxed italic">
            Echelon Property Group advises clients across Austin in luxury, investment, and development real estate.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-14 md:py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-primary-foreground leading-[1.18] mb-4">
            Join Private Opportunities List
          </h2>
          <p className="text-primary-foreground/50 text-base font-sans font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Receive curated off-market homes, development sites, and investment opportunities.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-[hsl(42,37%,50%)] text-primary-foreground px-12 py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300"
          >
            Request Private Valuation
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Private;
