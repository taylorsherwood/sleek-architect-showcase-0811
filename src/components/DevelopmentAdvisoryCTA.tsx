const DEV_URL = "https://developments.echelonpropertygroup.com";

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-jost), 'Jost', sans-serif",
  fontWeight: 500,
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

interface DevelopmentAdvisoryCTAProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  cta?: string;
  /** Anchor text used for the descriptive contextual link inside the copy. */
  anchorText?: string;
  variant?: "ivory" | "solid" | "transparent";
  className?: string;
}

/**
 * Editorial cross-link module to the dedicated Development Advisory site.
 * Uses a standard <a> anchor (crawlable, same tab) with descriptive anchor text
 * for SEO. Intentionally minimal — matches the site's luxury advisory tone.
 */
const DevelopmentAdvisoryCTA = ({
  eyebrow = "DEVELOPMENT ADVISORY",
  heading = "A dedicated platform for development opportunities",
  intro = "Explore Echelon Property Group's dedicated advisory for land, infill, mixed-use, and residential development opportunities across Austin and Central Texas.",
  cta = "View Development Opportunities",
  anchorText = "Austin development opportunities",
  variant = "ivory",
  className = "",
}: DevelopmentAdvisoryCTAProps) => {
  const bg =
    variant === "ivory"
      ? "bg-secondary/40"
      : variant === "solid"
      ? "bg-secondary"
      : "";
  return (
    <section className={`py-14 md:py-20 ${bg} ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold mb-5" style={LABEL_STYLE}>
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-normal text-architectural leading-[1.12] mb-6">
            {heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[1.0625rem] max-w-2xl mx-auto mb-9">
            {intro}{" "}
            <a
              href={DEV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors"
            >
              {anchorText}
            </a>
            .
          </p>
          <a
            href={DEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 transition-colors duration-300"
            style={{
              ...LABEL_STYLE,
              fontSize: "0.68rem",
              border: "1px solid #b9a06c",
              color: "#b9a06c",
              background: "rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#b9a06c";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#b9a06c";
            }}
          >
            {cta}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentAdvisoryCTA;
