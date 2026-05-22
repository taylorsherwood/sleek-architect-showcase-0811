import { FormEvent, useState } from "react";
import { formatPhoneNumber, getPhoneDigits } from "@/lib/formUtils";
import { requestPrivateDistributionAccess } from "@/lib/privateDistributionApi";

/**
 * Inline gate for Private Distribution editions.
 * Submits to the `private-distribution-unlock` edge function,
 * which creates the lead record and issues a hashed access token.
 */

interface PrivateBriefGateProps {
  editionSlug: string;
  editionTitle: string;
  onUnlock: (token: string) => void;
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
    const result = await requestPrivateDistributionAccess({
      slug: editionSlug,
      title: editionTitle,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? getPhoneDigits(phone) : undefined,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Something went wrong. Please try again.");
      return;
    }
    const issuedToken = result.token;

    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("echelon:private-distribution-unlocked", {
            detail: { slug: editionSlug },
          }),
        );
      } catch {
        /* ignore */
      }
    }

    onUnlock(issuedToken);
  };

  return (
    <section
      aria-label="Access the full brief"
      className="relative w-full overflow-hidden"
      style={{ background: "#F5F3EF" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[180px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,15,36,0.06), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(12,15,36,0.035) 1px, transparent 1px)",
          backgroundSize: "minmax(120px, 16.6666%) 100%",
          opacity: 0.7,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[680px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div
          className="relative p-8 md:p-12"
          style={{
            background: "#FAFAF8",
            border: "1px solid #d9cfb8",
          }}
        >
          {[
            { top: -1, left: -1, borderTop: true, borderLeft: true },
            { top: -1, right: -1, borderTop: true, borderRight: true },
            { bottom: -1, left: -1, borderBottom: true, borderLeft: true },
            { bottom: -1, right: -1, borderBottom: true, borderRight: true },
          ].map((c, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute w-4 h-4 pointer-events-none"
              style={{
                top: c.top,
                left: c.left,
                right: c.right,
                bottom: c.bottom,
                borderTop: c.borderTop ? "1px solid #b9a06c" : undefined,
                borderLeft: c.borderLeft ? "1px solid #b9a06c" : undefined,
                borderRight: c.borderRight ? "1px solid #b9a06c" : undefined,
                borderBottom: c.borderBottom ? "1px solid #b9a06c" : undefined,
              }}
            />
          ))}

          <div className="text-center mb-10">
            <p
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "9.5px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#8e7a4a",
              }}
              className="mb-6"
            >
              Confidential · Continue Reading
            </p>
            <h2
              className="font-display mb-5"
              style={{
                color: "#0C0F24",
                fontWeight: 500,
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(22px, 3.4vw, 30px)",
                letterSpacing: "0.035em",
                lineHeight: 1.2,
              }}
            >
              The remainder of this brief is distributed privately.
            </h2>
            <div
              className="h-px w-10 mx-auto my-6"
              style={{ background: "#b9a06c", opacity: 0.7 }}
              aria-hidden="true"
            />
            <p
              className="max-w-[460px] mx-auto"
              style={{
                fontFamily: '"Cinzel", serif',
                fontStyle: "italic",
                fontSize: "15.5px",
                lineHeight: 1.75,
                color: "rgba(12,15,36,0.72)",
                fontWeight: 400,
              }}
            >
              Off-market dossiers, pocket inventory, and advisory commentary,
              shared with a narrow audience by introduction only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { type: "text", placeholder: "Full name", value: name, set: setName, required: true, maxLength: 120 },
              { type: "email", placeholder: "Email", value: email, set: setEmail, required: true, maxLength: 255 },
            ].map((f) => (
              <input
                key={f.placeholder}
                type={f.type}
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                required={f.required}
                maxLength={f.maxLength}
                className="w-full px-1 py-3.5 bg-transparent text-[#0C0F24] placeholder:text-[#0C0F24]/45 focus:outline-none focus:border-[#b9a06c] transition-colors"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "14.5px",
                  borderBottom: "1px solid rgba(12,15,36,0.2)",
                }}
              />
            ))}
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              className="w-full px-1 py-3.5 bg-transparent text-[#0C0F24] placeholder:text-[#0C0F24]/45 focus:outline-none focus:border-[#b9a06c] transition-colors"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "14.5px",
                borderBottom: "1px solid rgba(12,15,36,0.2)",
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

            <div className="pt-8">
              <button
                type="submit"
                disabled={submitting}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b9a06c";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#b9a06c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0C0F24";
                  e.currentTarget.style.color = "#F5F3EF";
                  e.currentTarget.style.borderColor = "#0C0F24";
                }}
                className="w-full py-4 transition-colors disabled:opacity-50"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  background: "#0C0F24",
                  color: "#F5F3EF",
                  border: "1px solid #0C0F24",
                }}
              >
                {submitting ? "Opening Access…" : "Request Private Access"}
              </button>
              <div className="flex items-center justify-center gap-3 mt-6">
                <span
                  className="h-px w-6"
                  style={{ background: "#b9a06c", opacity: 0.5 }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "9.5px",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "rgba(12,15,36,0.55)",
                  }}
                >
                  Discreet · By introduction · No list
                </p>
                <span
                  className="h-px w-6"
                  style={{ background: "#b9a06c", opacity: 0.5 }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PrivateBriefGate;
