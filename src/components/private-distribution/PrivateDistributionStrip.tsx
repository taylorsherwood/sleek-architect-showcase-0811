import { Link } from "react-router-dom";

/**
 * Subtle editorial entry strip for the Private Distribution.
 * Designed to be embedded into existing pages without redesigning them,
 * ivory background, thin gold rules, restrained typography.
 *
 * Variants:
 *  - "ivory" (default), for homepage / standard ivory contexts
 *  - "navy", for darker editorial contexts (off-market funnel)
 */

interface PrivateDistributionStripProps {
  variant?: "ivory" | "navy";
  eyebrow?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  to?: string;
}

const PrivateDistributionStrip = ({
  variant = "ivory",
  eyebrow = "Private Distribution",
  headline = "The 78746 Brief, May 2026",
  body = "Private market intelligence for Austin's most guarded zip code. Off-market trades, properties whispered before listing, and the strategic posture of buyers active in the field.",
  ctaLabel = "Access the Brief",
  to = "/private-distribution",
}: PrivateDistributionStripProps) => {
  const isNavy = variant === "navy";
  const bg = isNavy ? "#0C0F24" : "#F5F3EF";
  const textColor = isNavy ? "rgba(250,248,244,0.92)" : "#0C0F24";
  const mutedColor = isNavy ? "rgba(250,248,244,0.65)" : "rgba(12,15,36,0.7)";
  const rule = "rgba(184,160,109,0.55)";

  return (
    <section
      aria-label="Private Distribution"
      style={{ background: bg }}
      className="w-full"
    >
      <div className="max-w-[980px] mx-auto px-6 md:px-10 py-14 md:py-20">
        <div
          className="h-px w-16 mb-7 md:mb-9"
          style={{ background: rule }}
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
          {eyebrow}
        </p>
        <h2
          className="font-display text-[26px] md:text-[34px] leading-[1.18] mb-5 md:mb-6 max-w-[760px]"
          style={{
            color: textColor,
            fontWeight: 400,
            letterSpacing: "0.005em",
          }}
        >
          {headline}
        </h2>
        <p
          className="text-[15px] md:text-[16px] leading-[1.75] max-w-[640px] mb-8 md:mb-10"
          style={{
            fontFamily: '"Jost", sans-serif',
            color: mutedColor,
            fontWeight: 300,
          }}
        >
          {body}
        </p>
        <Link
          to="/private-distribution"
          className="inline-flex items-center gap-3 group"
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#b9a06c",
            borderBottom: "1px solid rgba(184,160,109,0.4)",
            paddingBottom: "6px",
            transition: "color 250ms ease, border-color 250ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#b9a06c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(184,160,109,0.4)";
          }}
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default PrivateDistributionStrip;
