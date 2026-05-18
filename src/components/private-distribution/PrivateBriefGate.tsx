import { FormEvent, useState } from "react";
import { formatPhoneNumber, getPhoneDigits, submitLeadToZapier } from "@/lib/formUtils";

/**
 * Refined inline gate for Private Distribution editions.
 * Designed to feel like part of the editorial layout rather than a popup —
 * ivory card with a single thin gold rule, restrained typography, and
 * minimum-friction fields (name, email, optional phone).
 */

interface PrivateBriefGateProps {
  editionSlug: string;
  editionTitle: string;
  onUnlock: () => void;
}

const PrivateBriefGate = ({ editionSlug, editionTitle, onUnlock }: PrivateBriefGateProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and email.");
      return;
    }

    setSubmitting(true);
    const result = await submitLeadToZapier({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? getPhoneDigits(phone) : "",
      message: `Private Distribution access — ${editionTitle}`,
      source: "Private Distribution",
      extra: {
        edition_slug: editionSlug,
        edition_title: editionTitle,
      },
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Something went wrong. Please try again.");
      return;
    }

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          `echelon_private_distribution_${editionSlug}`,
          new Date().toISOString()
        );
        window.dispatchEvent(
          new CustomEvent("echelon:private-distribution-unlocked", {
            detail: { slug: editionSlug },
          })
        );
      } catch {
        /* ignore storage errors */
      }
    }

    onUnlock();
  };

  return (
    <section
      aria-label="Access the full brief"
      style={{ background: "#F5F3EF" }}
      className="w-full"
    >
      <div className="max-w-[640px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-10">
          <div
            className="h-px w-12 mx-auto mb-6"
            style={{ background: "rgba(184,160,109,0.6)" }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#b9a06c",
            }}
            className="mb-5"
          >
            Continue Reading
          </p>
          <h2
            className="font-display text-[24px] md:text-[30px] leading-[1.2] mb-4"
            style={{ color: "#0C0F24", fontWeight: 400 }}
          >
            The remainder of this brief is distributed privately.
          </h2>
          <p
            className="text-[14.5px] md:text-[15px] leading-[1.75] max-w-[480px] mx-auto"
            style={{
              fontFamily: '"Jost", sans-serif',
              color: "rgba(12,15,36,0.7)",
              fontWeight: 300,
            }}
          >
            Provide your details to access recent off-market trades, currently
            available private inventory, and advisory commentary. No newsletter
            list — this brief is shared with a narrow audience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            className="w-full px-4 py-3.5 bg-transparent text-[#0C0F24] placeholder:text-[#0C0F24]/45 focus:outline-none transition-colors"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "14.5px",
              borderBottom: "1px solid rgba(12,15,36,0.18)",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
            className="w-full px-4 py-3.5 bg-transparent text-[#0C0F24] placeholder:text-[#0C0F24]/45 focus:outline-none"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "14.5px",
              borderBottom: "1px solid rgba(12,15,36,0.18)",
            }}
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            className="w-full px-4 py-3.5 bg-transparent text-[#0C0F24] placeholder:text-[#0C0F24]/45 focus:outline-none"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "14.5px",
              borderBottom: "1px solid rgba(12,15,36,0.18)",
            }}
          />

          {error && (
            <p
              className="text-[13px] pt-1"
              style={{ fontFamily: '"Jost", sans-serif', color: "#b9a06c" }}
            >
              {error}
            </p>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#b9a06c";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0C0F24";
                e.currentTarget.style.color = "#F5F3EF";
              }}
              className="w-full py-4 transition-colors disabled:opacity-50"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: "#0C0F24",
                color: "#F5F3EF",
                border: "1px solid #0C0F24",
              }}
            >
              {submitting ? "Opening Access…" : "Access Full Distribution"}
            </button>
            <p
              className="text-center mt-5 text-[10.5px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(12,15,36,0.5)",
              }}
            >
              Discreet · Invitation-only · No list
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PrivateBriefGate;
