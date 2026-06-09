import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLeadToZapier } from "@/lib/formUtils";
import { trackEvent } from "@/lib/analytics";

interface Props {
  communityName: string;
  communitySlug: string;
  /** Tightens vertical rhythm when placed adjacent to other sections. */
  compact?: boolean;
}

/**
 * Community-scoped listing alert. Editorial, email-first capture that
 * subscribes the visitor to private inventory and market updates for the
 * specific neighborhood they are viewing.
 *
 * Avoids newsletter / marketing language by design. Submits to the same
 * site-wide lead pipeline (`submitLeadToZapier`) with a community-tagged
 * source so downstream automations can route by neighborhood.
 *
 * Analytics:
 *  - community_alert_impression   once per mount when scrolled into view
 *  - community_alert_submit       on successful subscription
 */
const NAVY = "#0C0F24";
const GOLD = "#b9a06c";
const IVORY = "#F5F3EF";

const CommunityListingAlert = ({ communityName, communitySlug, compact = false }: Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const ref = useRef<HTMLElement | null>(null);
  const impressionRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || impressionRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !impressionRef.current) {
            impressionRef.current = true;
            trackEvent("community_alert_impression", {
              community_slug: communitySlug,
              community_name: communityName,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [communitySlug, communityName]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    const result = await submitLeadToZapier({
      // Synthesize a placeholder name from the email local-part so the
      // shared lead validator (requires name) accepts an email-only signup
      // without showing extra fields to the visitor.
      name: trimmed.split("@")[0] || "Listing Alert Subscriber",
      email: trimmed,
      message: `Subscribed to ${communityName} listing alerts and market updates. Send early access to new and off-market opportunities in ${communityName}.`,
      source: `Community Listing Alert - ${communityName}`,
      extra: {
        community_slug: communitySlug,
        community_name: communityName,
        interest: "listing_alert",
        alert_type: "early_access_and_market_updates",
      },
    });

    if (result.ok) {
      setStatus("success");
      setEmail("");
      trackEvent("community_alert_submit", {
        community_slug: communitySlug,
        community_name: communityName,
      });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "We couldn't process your request. Please try again.");
    }
  };

  return (
    <section
      ref={ref}
      className={compact ? "my-12" : "my-16 md:my-20"}
      aria-label={`${communityName} listing alerts`}
    >
      <div
        className="px-6 py-12 md:px-12 md:py-14"
        style={{ background: NAVY, color: IVORY }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="mb-4"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD,
              fontWeight: 400,
            }}
          >
            {communityName} · Private Access
          </p>
          <h2
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: "clamp(1.5rem, 3.2vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              color: IVORY,
              marginBottom: "1rem",
            }}
          >
            Receive {communityName} listings before they reach public portals
          </h2>
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "0.9375rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(245,243,239,0.72)",
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            Be notified when new and off-market properties in {communityName} become
            available, with quarterly market updates curated for this neighborhood.
          </p>

          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.9375rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: IVORY,
                border: `1px solid ${GOLD}`,
                padding: "1.25rem 1.5rem",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              You are on the {communityName} list. Echelon Property Group will send
              early access and market updates as inventory surfaces.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              style={{
                maxWidth: "520px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}
            >
              <label
                htmlFor={`alert-email-${communitySlug}`}
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,243,239,0.7)",
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                Email address
              </label>
              <input
                id={`alert-email-${communitySlug}`}
                type="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="name@email.com"
                autoComplete="email"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: IVORY,
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(245,243,239,0.25)",
                  padding: "0.75rem 0",
                  outline: "none",
                  width: "100%",
                  borderRadius: 0,
                }}
                onFocus={(ev) => (ev.currentTarget.style.borderBottomColor = GOLD)}
                onBlur={(ev) =>
                  (ev.currentTarget.style.borderBottomColor = "rgba(245,243,239,0.25)")
                }
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: NAVY,
                  background: IVORY,
                  border: `1px solid ${IVORY}`,
                  padding: "1rem 1.5rem",
                  marginTop: "0.75rem",
                  cursor: status === "submitting" ? "wait" : "pointer",
                  transition:
                    "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                  width: "100%",
                }}
                onMouseEnter={(ev) => {
                  if (status === "submitting") return;
                  ev.currentTarget.style.background = GOLD;
                  ev.currentTarget.style.borderColor = GOLD;
                  ev.currentTarget.style.color = NAVY;
                }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.background = IVORY;
                  ev.currentTarget.style.borderColor = IVORY;
                  ev.currentTarget.style.color = NAVY;
                }}
              >
                {status === "submitting"
                  ? "Sending…"
                  : `Receive ${communityName} Alerts`}
              </button>

              {status === "error" && (
                <p
                  role="alert"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                    color: "rgba(245,243,239,0.85)",
                    textAlign: "left",
                    margin: "0.5rem 0 0",
                  }}
                >
                  {errorMsg}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityListingAlert;
