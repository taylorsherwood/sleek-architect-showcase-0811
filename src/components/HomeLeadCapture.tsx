import React, { useState } from "react";
import { submitLeadToZapier } from "@/lib/formUtils";
import ScrollReveal from "@/components/ScrollReveal";

const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please enter your name and email.");
      return;
    }
    setLoading(true);
    const res = await submitLeadToZapier({
      name,
      email,
      message: "Requested access to private off-market opportunities (homepage CTA).",
      source: "Homepage Off-Market CTA",
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-background" style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[460px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-3">EXCLUSIVE ACCESS</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-2xl md:text-[1.85rem] font-normal mb-3 leading-[1.15] tracking-[0.03em] text-foreground">
              Private Opportunities, Before They're Public
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[14px] leading-[1.7] mb-7 max-w-[380px] mx-auto text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
              Be the first to see private listings and exclusive opportunities before they hit the market.
            </p>

            {submitted ? (
              <div className="py-6">
                <p className="font-display text-lg text-gold">Thank you for requesting access.</p>
                <p className="text-sm mt-2 text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>We'll be in touch shortly with exclusive opportunities.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[420px] mx-auto">
                <div className="flex flex-col gap-2.5 mb-3">
                  <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "0", color: "#0C0F24" }} />
                  <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "0", color: "#0C0F24" }} />
                </div>
                {errorMsg && (
                  <p className="text-[12px] text-gold mb-3" style={{ fontFamily: '"Jost", sans-serif' }}>{errorMsg}</p>
                )}
                <button type="submit" disabled={loading}
                  className="w-full py-3 text-white disabled:opacity-50 transition-all duration-[250ms] ease-out hover:-translate-y-[1px] active:translate-y-0"
                  style={{
                    fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.15em", fontWeight: 400, textTransform: "uppercase",
                    background: "#0C0F24", borderRadius: "0",
                  }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "hsl(38 39% 61%)"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0C0F24"; }}>
                  {loading ? "Sending..." : "Unlock Private Access"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
