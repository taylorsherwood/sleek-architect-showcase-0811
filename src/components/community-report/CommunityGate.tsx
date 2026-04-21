import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPhoneNumber, getPhoneDigits, getTimestamp } from "@/lib/formUtils";
import { setUnlocked, getUtmParams } from "@/lib/communityUnlock";

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

interface CommunityGateProps {
  slug: string;
  communityName: string;
  headline: string;
  subheadline: string;
  thankYouMessage: string;
  onUnlock: () => void;
}

const CommunityGate = ({
  slug,
  communityName,
  headline,
  subheadline,
  thankYouMessage,
  onUnlock,
}: CommunityGateProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim() || getPhoneDigits(phone).length < 10) {
      setError("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    const sourceTag = `Community Report - ${communityName}`;
    const utm = getUtmParams();

    // Store lead in DB (non-blocking for unlock)
    const dbPromise = supabase.from("community_leads").insert({
      community_slug: slug,
      community_name: communityName,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: getPhoneDigits(phone),
      interest: interest || null,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_term: utm.utm_term || null,
      utm_content: utm.utm_content || null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
      page_url: typeof window !== "undefined" ? window.location.href : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      source_tag: sourceTag,
    });

    // Post to Zapier in same site-wide format
    const formData = new URLSearchParams();
    formData.append("first_name", firstName.trim());
    formData.append("last_name", lastName.trim());
    formData.append("name", `${firstName.trim()} ${lastName.trim()}`);
    formData.append("email", email.trim());
    formData.append("phone", getPhoneDigits(phone));
    formData.append("interest", interest);
    formData.append("source", sourceTag);
    formData.append("community_slug", slug);
    formData.append("community_name", communityName);
    formData.append("page", typeof window !== "undefined" ? window.location.href : "");
    formData.append("timestamp", getTimestamp());
    Object.entries(utm).forEach(([k, v]) => formData.append(k, v));

    const zapPromise = fetch(ZAPIER_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }).catch(() => null);

    await Promise.allSettled([dbPromise, zapPromise]);

    setUnlocked(slug);
    setSubmitting(false);
    onUnlock();
  };

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-minimal text-gold mb-6 tracking-[0.2em]">PRIVATE COMMUNITY REPORT</p>
          <h2 className="text-3xl md:text-5xl font-display font-normal mb-6">
            {headline}
          </h2>
          <p className="text-base md:text-lg opacity-80 mb-10 leading-relaxed">
            {subheadline}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="w-full px-4 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="tel"
              placeholder="(512) 555-0100"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              required
              className="w-full px-4 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-gold transition-colors"
            />
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-background/30 text-background focus:outline-none focus:border-gold transition-colors"
            >
              <option value="" className="bg-foreground">Interest (optional)</option>
              <option value="buying" className="bg-foreground">Buying</option>
              <option value="selling" className="bg-foreground">Selling</option>
              <option value="investing" className="bg-foreground">Investing</option>
              <option value="researching" className="bg-foreground">Just researching</option>
            </select>

            {error && <p className="text-sm text-gold">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-minimal bg-gold text-foreground hover:bg-background hover:text-foreground px-10 py-4 transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? "UNLOCKING..." : "UNLOCK FULL REPORT"}
            </button>

            <p className="text-xs opacity-60 text-center pt-2">
              {thankYouMessage ? thankYouMessage : "We respect your privacy. No spam, ever."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommunityGate;
