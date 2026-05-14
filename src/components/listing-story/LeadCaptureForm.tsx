import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  formatPhoneNumber,
  submitLeadToZapier,
} from "@/lib/formUtils";

interface Props {
  listingId: string;
  listingTitle: string;
  ctaClicked?: string;
  compact?: boolean;
}

const LeadCaptureForm = ({ listingId, listingTitle, ctaClicked = "listing_inquiry", compact }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please share your name and email.");
      return;
    }
    setSubmitting(true);

    // Capture in listing_leads regardless of Zapier outcome
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

    // Also push through unified Zapier helper
    const result = await submitLeadToZapier({
      name,
      email,
      phone,
      message: message || `Inquiry on ${listingTitle}`,
      source: `Listing Story – ${listingTitle}`,
      extra: { listing_id: listingId, cta_clicked: ctaClicked },
    });

    setSubmitting(false);
    if (!result.ok) {
      // Still treat as captured (we saved to DB) but surface gentle note
      setDone(true);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="border-t border-b border-foreground/10 py-12 text-center">
        <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Thank You</p>
        <p className="font-display text-2xl md:text-3xl text-architectural mb-3">
          Your inquiry has been received.
        </p>
        <p className="text-muted-foreground max-w-md mx-auto font-body">
          A member of the Echelon team will follow up personally within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? "" : "max-w-xl mx-auto"}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={120}
          className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 px-1 text-architectural placeholder:text-muted-foreground/60 font-body transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={200}
          className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 px-1 text-architectural placeholder:text-muted-foreground/60 font-body transition-colors"
        />
      </div>
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 px-1 text-architectural placeholder:text-muted-foreground/60 font-body transition-colors"
      />
      <textarea
        placeholder="Tell us what you'd like to know"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        maxLength={1500}
        className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 px-1 text-architectural placeholder:text-muted-foreground/60 font-body resize-none transition-colors"
      />
      {error && <p className="text-sm text-destructive font-body">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 text-xs tracking-[0.3em] uppercase bg-foreground text-background hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Request Private Showing"}
      </button>
    </form>
  );
};

export default LeadCaptureForm;
