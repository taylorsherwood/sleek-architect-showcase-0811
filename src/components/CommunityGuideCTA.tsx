import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CommunityGuideCTAProps {
  communityName: string;
  guideUrl: string;
}

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/u7plp1z/";

const CommunityGuideCTA = ({ communityName, guideUrl }: CommunityGuideCTAProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const body = new URLSearchParams({
        email: email.trim(),
        lead_source: `${communityName} Community Guide`,
        page_url: window.location.href,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
      });

      await fetch(ZAPIER_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        mode: "no-cors",
      });
    } catch {
      // Fire-and-forget
    }

    setSubmitted(true);
    setLoading(false);
    window.open(guideUrl, "_blank", "noopener");
  };

  if (submitted) {
    return (
      <section className="border border-gold/30 bg-secondary p-8 md:p-12 text-center">
        <p className="text-lg text-foreground font-display">
          Your guide is ready — check the new tab.
        </p>
        <a
          href={guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-minimal text-gold hover:text-foreground transition-colors duration-300"
        >
          OPEN GUIDE AGAIN →
        </a>
      </section>
    );
  }

  return (
    <section className="border border-border bg-background p-8 md:p-10">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-minimal text-gold tracking-[0.2em] mb-3">EXCLUSIVE RESOURCE</p>
        <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-3">
          Get the {communityName} Community Guide
        </h2>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          Schools, market data, lifestyle details, and local insights — delivered instantly.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 text-minimal tracking-[0.15em] border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "SENDING…" : "GET THE GUIDE"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CommunityGuideCTA;
