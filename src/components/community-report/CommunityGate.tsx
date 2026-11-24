import { useState, useEffect, FormEvent } from "react";
import { formatPhoneNumber, getPhoneDigits, submitLeadToZapier } from "@/lib/formUtils";
import SmsConsent from "@/components/SmsConsent";
import { requestReportEmail, redeemReportTokenFromUrl, getUtmParams } from "@/lib/communityUnlock";

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
  const [emailed, setEmailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).get("report_token")) return;
    redeemReportTokenFromUrl(slug).then((community) => {
      if (community) onUnlock();
      else setError("This briefing link has expired. Request a fresh one below.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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

    // 1. Insert the lead (also dispatches Zapier).
    const message = `Community report unlock, ${communityName}${interest ? ` | Interest: ${interest}` : ""}`;
    await submitLeadToZapier({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: getPhoneDigits(phone),
      message,
      source: sourceTag,
      extra: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        interest,
        community_slug: slug,
        community_name: communityName,
        ...utm,
      },
    });

    // 2. Server-verify the lead and fetch the gated payload. The full
    //    report data only reaches the browser after this call succeeds.
    const ok = await requestReportEmail(slug, {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: getPhoneDigits(phone),
      community_name: communityName,
      interest,
    });
    setSubmitting(false);

    if (!ok) {
      setError("We couldn't send your briefing. Please try again in a moment.");
      return;
    }

    setEmailed(true);
  };

  return (
    <section className="bg-foreground text-background px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-minimal text-gold mb-5 tracking-[0.25em]">REQUEST ACCESS</p>
          <h3 className="text-2xl md:text-4xl font-display font-normal mb-5 leading-[1.2]">
            {headline}
          </h3>
          <p className="text-sm md:text-base opacity-75 leading-relaxed max-w-lg mx-auto">
            {subheadline}
          </p>
        </div>

        {emailed ? (
          <div className="text-center" role="status">
            <p className="text-lg md:text-xl font-display leading-relaxed">Your briefing is on its way.</p>
            <p className="text-sm opacity-75 mt-4 leading-relaxed">
              We sent a private link to {email.trim()}. Open it to read the full {communityName} report.
            </p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              maxLength={100}
              className="w-full px-4 py-3.5 bg-transparent border border-background/25 text-background placeholder:text-background/45 focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              maxLength={100}
              className="w-full px-4 py-3.5 bg-transparent border border-background/25 text-background placeholder:text-background/45 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
            className="w-full px-4 py-3.5 bg-transparent border border-background/25 text-background placeholder:text-background/45 focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            required
            className="w-full px-4 py-3.5 bg-transparent border border-background/25 text-background placeholder:text-background/45 focus:outline-none focus:border-gold transition-colors"
          />
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-4 py-3.5 bg-transparent border border-background/25 text-background focus:outline-none focus:border-gold transition-colors"
          >
            <option value="" className="bg-foreground">What brings you here? (optional)</option>
            <option value="buying" className="bg-foreground">Considering a purchase</option>
            <option value="selling" className="bg-foreground">Considering a sale</option>
            <option value="investing" className="bg-foreground">Evaluating as an investment</option>
            <option value="researching" className="bg-foreground">Researching the area</option>
          </select>

          {error && <p className="text-sm text-gold">{error}</p>}

          <SmsConsent className="text-background mt-2" />
          <button
            type="submit"
            disabled={submitting}
            className="w-full text-minimal bg-gold text-foreground hover:bg-background hover:text-foreground px-10 py-4 mt-2 tracking-[0.15em] transition-colors duration-300 disabled:opacity-50"
          >
            {submitting ? "SENDING…" : "EMAIL ME THE BRIEFING"}
          </button>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4 text-[11px] tracking-[0.18em] opacity-60 uppercase">
            <span>Delivered by email</span>
            <span className="text-gold/60">•</span>
            <span>Direct line, no list</span>
            <span className="text-gold/60">•</span>
            <span>Discreet by default</span>
          </div>

          {thankYouMessage && (
            <p className="text-xs opacity-55 text-center pt-3 leading-relaxed">
              {thankYouMessage}
            </p>
          )}
        </form>
        )}
      </div>
    </section>
  );
};

export default CommunityGate;
