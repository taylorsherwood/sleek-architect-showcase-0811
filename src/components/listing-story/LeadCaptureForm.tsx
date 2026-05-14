import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPhoneNumber, submitLeadToZapier } from "@/lib/formUtils";

interface Props {
  listingId: string;
  listingTitle: string;
  ctaClicked?: string;
  compact?: boolean;
  /** "light" = on ivory bg (default). "dark" = on navy/dark bg. */
  variant?: "light" | "dark";
}

const LeadCaptureForm = ({
  listingId,
  listingTitle,
  ctaClicked = "listing_inquiry",
  compact,
  variant = "light",
}: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === "dark";

  const inputBase =
    "w-full bg-transparent border-b outline-none py-3.5 px-1 font-body text-[15px] transition-colors";
  const inputCls = isDark
    ? `${inputBase} border-background/25 focus:border-gold text-background placeholder:text-background/45`
    : `${inputBase} border-foreground/20 focus:border-gold text-architectural placeholder:text-muted-foreground/60`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please share your name and email.");
      return;
    }
    setSubmitting(true);

    await supabase.from("listing_leads").insert({
      listing_id: listingId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      message: message.trim() || null,
      source: `Listing Story – ${listingTitle}`,
      page_url: typeof window !== "undefined" ? window.location.href : null,
      cta_clicked: ctaClicked,
    });

    await submitLeadToZapier({
      name,
      email,
      phone,
      message: message || `Inquiry on ${listingTitle}`,
      source: `Listing Story – ${listingTitle}`,
      extra: { listing_id: listingId, cta_clicked: ctaClicked },
    });

    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className={`py-14 text-center ${isDark ? "text-background" : ""}`}>
        <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-5">Thank You</p>
        <p className={`font-display text-2xl md:text-[1.75rem] mb-3 ${isDark ? "" : "text-architectural"}`}>
          Your inquiry has been received.
        </p>
        <p className={`max-w-md mx-auto font-body text-[15px] leading-relaxed ${isDark ? "opacity-75" : "text-muted-foreground"}`}>
          A member of the Echelon team will follow up personally within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${compact ? "" : "max-w-xl mx-auto"}`}>
      <div className="grid sm:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={120}
          className={inputCls}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={200}
          className={inputCls}
        />
      </div>
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        className={inputCls}
      />
      <textarea
        placeholder="Tell us what you'd like to know"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        maxLength={1500}
        className={`${inputCls} resize-none`}
      />
      {error && (
        <p className={`text-sm font-body ${isDark ? "text-gold" : "text-destructive"}`}>{error}</p>
      )}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className={`w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-[10px] tracking-[0.4em] uppercase transition-colors disabled:opacity-50 ${
            isDark
              ? "bg-gold text-foreground hover:bg-background hover:text-foreground"
              : "bg-foreground text-background hover:bg-gold hover:text-foreground"
          }`}
        >
          {submitting ? "Sending" : "Request Private Showing"}
        </button>
      </div>
    </form>
  );
};

export default LeadCaptureForm;
