import { BriefSection } from "@/data/privateDistribution";

/**
 * Renders a single gated section of a Private Distribution brief.
 * One component per `type` keeps the layout flexible for future editions
 * while ensuring a consistent editorial rhythm.
 */

const sectionWrap = "max-w-[760px] mx-auto px-6 md:px-10";
const eyebrowStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "10.5px",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: "#b9a06c",
};
const bodyStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "16px",
  lineHeight: 1.85,
  color: "rgba(12,15,36,0.82)",
  fontWeight: 300,
};

const SectionHeader = ({ eyebrow, title }: { eyebrow?: string; title?: string }) => (
  <header className="mb-8">
    <div
      className="h-px w-10 mb-6"
      style={{ background: "rgba(184,160,109,0.6)" }}
      aria-hidden="true"
    />
    {eyebrow && <p style={eyebrowStyle} className="mb-4">{eyebrow}</p>}
    {title && (
      <h3
        className="font-display text-[24px] md:text-[30px] leading-[1.25]"
        style={{ color: "#0C0F24", fontWeight: 400, letterSpacing: "0.005em" }}
      >
        {title}
      </h3>
    )}
  </header>
);

const BriefSectionBlock = ({ section }: { section: BriefSection }) => {
  return (
    <section className="py-14 md:py-20" style={{ background: "#FAFAF8" }}>
      <div className={sectionWrap}>
        <SectionHeader eyebrow={section.eyebrow} title={section.title} />

        {section.body && <p style={bodyStyle} className="mb-8 whitespace-pre-line">{section.body}</p>}

        {section.bullets && section.bullets.length > 0 && (
          <ul className="space-y-3 mb-4 mt-2">
            {section.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-baseline gap-4"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "15px",
                  color: "rgba(12,15,36,0.82)",
                  fontWeight: 300,
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-1 h-1 rotate-45 flex-shrink-0 translate-y-[2px]"
                  style={{ background: "#b9a06c" }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {section.type === "trades" && section.trades && (
          <div className="mt-2 border-t border-[rgba(12,15,36,0.1)]">
            {section.trades.map((row, i) => (
              <div
                key={i}
                className="py-5 border-b border-[rgba(12,15,36,0.08)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8 items-baseline"
              >
                <div>
                  <p
                    className="font-display text-[17px] md:text-[18px]"
                    style={{ color: "#0C0F24", fontWeight: 400 }}
                  >
                    {row.address}
                  </p>
                  {row.neighborhood && (
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(12,15,36,0.55)",
                      }}
                    >
                      {row.neighborhood}
                    </p>
                  )}
                  {row.notes && (
                    <p
                      className="mt-3 max-w-[480px]"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "rgba(12,15,36,0.7)",
                        fontWeight: 300,
                      }}
                    >
                      {row.notes}
                    </p>
                  )}
                </div>
                <p
                  className="font-display text-[20px] md:text-[22px] md:text-right whitespace-nowrap"
                  style={{ color: "#b9a06c", fontWeight: 400 }}
                >
                  {row.closedPrice}
                </p>
              </div>
            ))}
          </div>
        )}

        {section.type === "feature" && section.feature && (
          <div
            className="mt-4 px-7 md:px-10 py-10 md:py-12"
            style={{ background: "#0C0F24", color: "#F5F3EF" }}
          >
            <p
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b9a06c",
              }}
              className="mb-5"
            >
              {section.feature.label}
            </p>
            <h4
              className="font-display text-[22px] md:text-[26px] leading-[1.3] mb-5"
              style={{ fontWeight: 400 }}
            >
              {section.feature.headline}
            </h4>
            <p
              className="mb-7 max-w-[560px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(245,243,239,0.82)",
                fontWeight: 300,
              }}
            >
              {section.feature.description}
            </p>
            {section.feature.meta && (
              <ul className="space-y-2">
                {section.feature.meta.map((m, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "12.5px",
                      letterSpacing: "0.06em",
                      color: "rgba(245,243,239,0.75)",
                    }}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {section.attribution && (
          <p
            className="mt-6"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: "13px",
              letterSpacing: "0.12em",
              color: "#b9a06c",
            }}
          >
            {section.attribution}
          </p>
        )}
      </div>
    </section>
  );
};

export default BriefSectionBlock;
