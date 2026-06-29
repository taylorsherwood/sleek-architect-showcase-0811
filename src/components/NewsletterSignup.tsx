import React, { useState } from "react";
import { submitLeadToZapier } from "@/lib/formUtils";
import editorialImage from "@/assets/barton-creek-estate-new.webp";


interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

const BREVO_FORM_ACTION =
  "https://00a111c2.sibforms.com/serve/MUIFAN8bXYcpoPm94yrwccMYEQRJ8Ifrxf2KRdAekdE_s9K6iWYcxrlTjQ4bz9AJ5VXKTBDTb34a6LjTvnVOO8AF2Ft9yDFzBTToQjBhGwnTqYwaTnFHCTbkSpaVy9K10aXlCQlFVxvvt4tx-290Jp14jL33mMx8VFtlL8j4Nu94VJYS-9M1ga5pNZBonjhUyXaj-a-Ls7Y8m252gA==";

const NAVY = "#0C0F24";
const GOLD = "#B9A06C";
const IVORY = "#F5F3EF";

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = "The Echelon Insider",
  description = "Receive curated Austin market intelligence, private opportunities, luxury listings, development trends, and notable local insights. No spam.",
  className = "",
  compact = false,
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("email_address_check", "");
      formData.append("locale", "en");

      await fetch(BREVO_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // Also forward to the site-wide Zapier lead pipeline so newsletter
      // signups land in the same CRM/notification flow as every other form.
      // Fire-and-forget — Brevo subscription is the source of truth for the
      // newsletter itself; Zapier dispatch failures must not block success.
      const derivedName = email.split("@")[0]?.replace(/[._-]+/g, " ").trim() || "Newsletter Subscriber";
      void submitLeadToZapier({
        name: derivedName,
        email,
        message: "Newsletter signup, The Echelon Insider",
        source: "Newsletter — The Echelon Insider",
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (compact) {
    return (
      <section className={`bg-secondary pb-20 md:pb-28 ${className}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-foreground"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              {title}
            </h2>
            <p
              className="text-foreground/60 text-left"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto 2.5rem",
              }}
            >
              {description}
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
                  color: NAVY,
                  background: IVORY,
                  border: `1px solid ${GOLD}`,
                  padding: "1.25rem 1.5rem",
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
              >
                Welcome to The Echelon Insider.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ maxWidth: "520px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.875rem" }}
              >
                <label
                  htmlFor="newsletter-email"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: NAVY,
                    fontWeight: 400,
                    textAlign: "left",
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  autoComplete="email"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: NAVY,
                    background: "transparent",
                    border: "none",
                    borderBottom: `1px solid ${NAVY}33`,
                    padding: "0.75rem 0",
                    outline: "none",
                    width: "100%",
                    borderRadius: 0,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = GOLD)}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = `${NAVY}33`)}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: GOLD,
                    background: "transparent",
                    border: "none",
                    padding: "0.25rem 0",
                    marginTop: "0.5rem",
                    cursor: status === "submitting" ? "wait" : "pointer",
                    alignSelf: "flex-start",
                    transition: "opacity 200ms ease",
                  }}
                  onMouseEnter={(e) => { if (status !== "submitting") e.currentTarget.style.opacity = "0.7"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {status === "submitting" ? "Joining…" : "Join The Echelon Insider →"}
                </button>
                {status === "error" && (
                  <p role="alert" style={{ fontFamily: '"Jost", sans-serif', fontSize: "0.8125rem", fontWeight: 300, color: NAVY, textAlign: "left", margin: "0.5rem 0 0" }}>
                    We couldn't process your request at this time. Please try again or contact Echelon Property Group directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  const benefits = ["Market Intelligence", "Private Opportunities", "Luxury Listings", "Local Insights"];

  return (
    <section
      className={`relative ${className}`}
      style={{
        background: IVORY,
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(7rem, 12vw, 10rem)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            maxWidth: "1040px",
            background: "#FAFAF8",
            border: `1px solid ${GOLD}40`,
            boxShadow: "0 1px 2px rgba(12,15,36,0.04), 0 24px 60px -30px rgba(12,15,36,0.18)",
            padding: "clamp(2.5rem, 6vw, 5.5rem) clamp(1.75rem, 5vw, 5rem)",
          }}
        >
          {/* Watermark monogram */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              userSelect: "none",
              fontFamily: '"Cinzel", serif',
              fontWeight: 400,
              fontSize: "clamp(18rem, 38vw, 32rem)",
              lineHeight: 1,
              color: NAVY,
              opacity: 0.03,
              letterSpacing: "0.02em",
            }}
          >
            E
          </div>

          <div className="relative" style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.6875rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: GOLD,
                fontWeight: 500,
                marginBottom: "1.5rem",
              }}
            >
              Private Market Intelligence
            </div>

            <h2
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                color: NAVY,
                marginBottom: "1.5rem",
              }}
            >
              {title}
            </h2>

            <div
              aria-hidden="true"
              style={{
                width: "44px",
                height: "1px",
                background: GOLD,
                margin: "0 auto 1.75rem",
              }}
            />

            <p
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: `${NAVY}B3`,
                maxWidth: "620px",
                margin: "0 auto 2.5rem",
              }}
            >
              {description}
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 auto 3rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.75rem 2.25rem",
                maxWidth: "720px",
              }}
            >
              {benefits.map((b) => (
                <li
                  key={b}
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.75rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: NAVY,
                    fontWeight: 400,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.625rem",
                  }}
                >
                  <span aria-hidden="true" style={{ width: "5px", height: "5px", background: GOLD, display: "inline-block", transform: "rotate(45deg)" }} />
                  {b}
                </li>
              ))}
            </ul>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: NAVY,
                  background: IVORY,
                  border: `1px solid ${GOLD}`,
                  padding: "1.5rem 1.75rem",
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Welcome to The Echelon Insider. You will receive periodic Austin market
                intelligence, private opportunities, luxury listings, development trends,
                and notable local insights.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row"
                style={{
                  maxWidth: "560px",
                  margin: "0 auto",
                  gap: "0.875rem",
                  alignItems: "stretch",
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: NAVY,
                    background: "transparent",
                    border: `1px solid ${NAVY}26`,
                    padding: "1rem 1.25rem",
                    outline: "none",
                    borderRadius: 0,
                    transition: "border-color 200ms ease, box-shadow 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${GOLD}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${NAVY}26`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.75rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: IVORY,
                    background: NAVY,
                    border: `1px solid ${NAVY}`,
                    padding: "1rem 1.75rem",
                    cursor: status === "submitting" ? "wait" : "pointer",
                    transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (status === "submitting") return;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.color = NAVY;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = NAVY;
                    e.currentTarget.style.borderColor = NAVY;
                    e.currentTarget.style.color = IVORY;
                  }}
                >
                  {status === "submitting" ? "Joining…" : "Join The Echelon Insider"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p
                role="alert"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: NAVY,
                  margin: "1rem auto 0",
                  maxWidth: "560px",
                }}
              >
                We couldn't process your request at this time. Please try again or
                contact Echelon Property Group directly.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
