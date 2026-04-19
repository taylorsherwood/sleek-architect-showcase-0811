/**
 * RecognizedPlatforms
 * ---------------------------------------------------------------
 * Lightweight, reusable entity-signal block listing the external
 * platforms where Echelon Property Group maintains a presence.
 *
 * Each platform renders as plain text by default. When a verified
 * URL is supplied via the `url` field on a platform entry, the
 * label automatically becomes an anchor — no redesign required.
 * ---------------------------------------------------------------
 */

type Platform = {
  name: string;
  /** Optional verified URL. When omitted, plain text label is rendered. */
  url?: string;
};

const defaultPlatforms: Platform[] = [
  { name: "Google Business Profile" },
  { name: "Zillow", url: "https://www.zillow.com/profile/TaylorSherwood512" },
  { name: "Realtor.com", url: "https://www.realtor.com/realestateagents/5e50ed9a4cb1520012995024" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/taylorsherwood/" },
  { name: "Instagram", url: "https://www.instagram.com/theinvestorbroker" },
  { name: "Yelp" },
];

interface RecognizedPlatformsProps {
  platforms?: Platform[];
  title?: string;
  /** Optional eyebrow label above the heading. */
  eyebrow?: string;
  /** Optional descriptive paragraph rendered below the heading. */
  description?: string;
  className?: string;
}

const RecognizedPlatforms = ({
  platforms = defaultPlatforms,
  title = "Where to Find Us",
  eyebrow = "RECOGNIZED PLATFORMS",
  description,
  className = "",
}: RecognizedPlatformsProps) => {
  return (
    <section
      className={`py-20 md:py-28 bg-secondary border-t border-border/40 ${className}`}
      aria-labelledby="recognized-platforms-heading"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {eyebrow && (
          <p className="text-minimal text-gold mb-4">{eyebrow}</p>
        )}
        <h2
          id="recognized-platforms-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6"
        >
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {description}
          </p>
        )}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-muted-foreground">
          {platforms.map((p) => (
            <li
              key={p.name}
              className="text-[0.95rem] tracking-[0.02em] leading-relaxed"
            >
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {p.name}
                </a>
              ) : (
                <span className="text-foreground/85">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecognizedPlatforms;
