import { Link } from "react-router-dom";

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-jost), 'Jost', sans-serif",
  fontWeight: 500,
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

type Card = {
  to: string;
  eyebrow: string;
  title: string;
  desc: string;
};

const CARDS: Record<"ranch" | "development", Card> = {
  ranch: {
    to: "/land-ranch",
    eyebrow: "LAND & RANCH ADVISORY",
    title: "Texas Hill Country Ranches & Acreage",
    desc: "Legacy ranches, live-water tracts, recreational acreage, and private land opportunities across Austin and the Hill Country.",
  },
  development: {
    to: "/land-development",
    eyebrow: "LAND DEVELOPMENT ADVISORY",
    title: "Central Texas Development & Strategic Acreage",
    desc: "Entitled tracts, infill assemblages, path-of-growth sites, and highest-and-best-use analysis for builders and investors.",
  },
};

interface LandCrossLinksProps {
  /** Optional eyebrow/title above the two cards. */
  eyebrow?: string;
  heading?: string;
  /** Optional intro copy under the heading. */
  intro?: string;
  /** Pick which cards to render. Defaults to both. */
  cards?: Array<"ranch" | "development">;
  /** Background variant. */
  variant?: "ivory" | "transparent";
  className?: string;
}

const LandCrossLinks = ({
  eyebrow,
  heading,
  intro,
  cards = ["ranch", "development"],
  variant = "transparent",
  className = "",
}: LandCrossLinksProps) => {
  const bg = variant === "ivory" ? "bg-secondary/40" : "";
  return (
    <section className={`py-14 md:py-20 ${bg} ${className}`}>
      <div className="container mx-auto px-6">
        {(eyebrow || heading || intro) && (
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            {eyebrow && (
              <p className="text-gold mb-5" style={LABEL_STYLE}>
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1] mb-6">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="text-muted-foreground leading-relaxed text-[1.0625rem] max-w-2xl mx-auto">
                {intro}
              </p>
            )}
          </div>
        )}
        <div
          className={`grid grid-cols-1 ${cards.length === 2 ? "md:grid-cols-2" : ""} gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)] max-w-5xl mx-auto`}
        >
          {cards.map((key) => {
            const c = CARDS[key];
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group bg-background p-8 md:p-10 flex flex-col justify-between min-h-[220px] transition-colors duration-500 hover:bg-secondary/40"
              >
                <div>
                  <p
                    className="text-gold mb-4"
                    style={{ ...LABEL_STYLE, fontSize: "0.55rem" }}
                  >
                    {c.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl md:text-[1.55rem] text-architectural leading-tight mb-3 transition-colors duration-300 group-hover:text-gold">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground text-[0.95rem] leading-[1.65] max-w-[42ch]">
                    {c.desc}
                  </p>
                </div>
                <span
                  className="relative inline-flex items-center text-gold self-start mt-6 pb-0.5"
                  style={{ ...LABEL_STYLE, fontSize: "0.58rem" }}
                >
                  Explore Advisory
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandCrossLinks;
