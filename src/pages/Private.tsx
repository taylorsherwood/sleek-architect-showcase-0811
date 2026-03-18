import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-luxury-austin.jpg";

const Private = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) return;
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
          phone: formData.phone,
          address: formData.address,
        }),
      });
      if (res.ok) setSubmitted(true);
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
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Austin architecture"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[1.15] mb-5 tracking-tight">
            Private Home Sale Advisory for Austin Homeowners
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto mb-4">
            Confidential pricing guidance, curated buyer outreach, and discreet sale strategy for luxury, investment, and high-value properties.
          </p>
          <p className="text-primary-foreground/50 text-sm font-sans font-light tracking-wide mb-9">
            Advising clients across Austin's luxury, investment, and development markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-gold hover:bg-gold-light text-primary-foreground px-12 py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300"
            >
              Request Private Valuation
            </button>
            <Link
              to="/connect"
              className="border border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground/10 px-10 py-4 text-sm tracking-[0.15em] uppercase font-sans font-light transition-colors duration-300 text-center"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-20 md:py-28 bg-warm-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-6">
            Private Advisory
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-[1.15] mb-8">
            Not Every Property Should Be Sold Publicly
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
            Many high-value properties trade quietly through private networks, institutional relationships, and curated buyer pools.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
            For certain homes, a public listing can limit flexibility, reduce leverage, or attract the wrong exposure.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We help you evaluate both paths—so you can make a strategic decision, not just a conventional one.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-6">
                What You Receive
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-[1.15]">
                What This Advisory Includes
              </h2>
            </div>
            <ul className="space-y-10">
              {[
                "Confidential valuation and pricing strategy",
                "Access to qualified off-market and institutional buyers",
                "Strategic positioning to maximize leverage and discretion",
                "Direct advisory throughout the entire decision process",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                  <span className="text-foreground text-lg font-sans font-light leading-relaxed tracking-wide">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="private-form" className="py-20 md:py-28 bg-warm-cream">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-6">
              Get Started
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-[1.15] mb-4">
              Request a Confidential Property Assessment
            </h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              No obligation. Fully confidential. Direct advisory from Taylor Sherwood.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16">
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors"
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
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-sans transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-gold hover:text-primary-foreground py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300 disabled:opacity-50 mt-4"
              >
                {loading ? "Submitting…" : "Submit Confidential Request"}
              </button>
              <p className="text-center text-muted-foreground text-xs tracking-wide mt-3">
                Your information is never shared. This is a private advisory conversation.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg font-sans font-light leading-relaxed italic">
            Echelon Property Group advises clients across Austin in luxury, investment, and development real estate.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary-foreground leading-[1.15] mb-5">
            Start With a Private Conversation
          </h2>
          <p className="text-primary-foreground/50 text-lg font-sans font-light leading-relaxed mb-10 max-w-xl mx-auto">
            We'll help you determine whether a private sale, public listing, or hybrid strategy is best for your property.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold-light text-primary-foreground px-12 py-4 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-300"
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
