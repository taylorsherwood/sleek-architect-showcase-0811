import {
  BriefSection,
  PropertyFeature,
  WatchingItem,
  TradeRow,
} from "@/data/privateDistribution";

/**
 * Renders a single gated section of a Private Distribution brief.
 * One renderer per `type` keeps the layout flexible for future editions
 * while preserving a consistent editorial rhythm.
 */

const NAVY = "#0C0F24";
const PAPER = "#F4EFE3";
const CREAM = "#EDE5D0";
const GOLD = "#b9a06c";
const GOLD_DEEP = "#8e7a4a";
const RULE = "#d4c9ad";
const MUTED = "#6b6557";

const sectionWrap = "max-w-[820px] mx-auto px-6 md:px-12";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "10.5px",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: GOLD_DEEP,
};

/* ─── Section header (chapter · title · count) ─── */

const SectionHeader = ({ section }: { section: BriefSection }) => (
  <header
    className="mb-10 pb-3.5 flex items-baseline gap-4 md:gap-5"
    style={{ borderBottom: `1px solid ${RULE}` }}
  >
    {section.chapter && (
      <span
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: "14px",
          letterSpacing: "0.1em",
          color: GOLD,
        }}
      >
        {section.chapter}
      </span>
    )}
    {section.title && (
      <h3
        className="flex-1"
        style={{
          fontFamily: '"Cinzel", serif',
          fontWeight: 500,
          fontSize: "16px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: NAVY,
          margin: 0,
        }}
      >
        {section.title}
      </h3>
    )}
    {section.count && (
      <span
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "10px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {section.count}
      </span>
    )}
  </header>
);

/* ─── Property card ─── */

const statusStyle = (status: PropertyFeature["status"]): React.CSSProperties => {
  const base: React.CSSProperties = {
    fontFamily: '"Jost", sans-serif',
    fontSize: "9px",
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    padding: "5px 12px",
    fontWeight: 500,
    display: "inline-block",
    alignSelf: "flex-start",
  };
  if (status === "Pre-Market") {
    return { ...base, background: NAVY, color: PAPER };
  }

  if (status === "Active" || status === "Off-Market") {
    return { ...base, background: NAVY, color: PAPER };
  }
  return { ...base, background: GOLD_DEEP, color: PAPER };
};

const PropertyCard = ({ p, isLast }: { p: PropertyFeature; isLast: boolean }) => (
  <article
    className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-7 md:gap-8 py-10 md:py-11"
    style={{ borderBottom: isLast ? "none" : `1px solid ${RULE}` }}
  >
    {/* Property image — falls back to navy/gold placeholder when no image provided */}
    <div
      className="w-full overflow-hidden relative"
      style={{
        aspectRatio: "4 / 3",
        background: `linear-gradient(135deg, ${NAVY} 0%, #1a1f3a 100%)`,
        borderRadius: "2px",
      }}
    >
      {p.image ? (
        <img
          src={p.image}
          alt={p.imageAlt ?? p.address}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(185,160,108,0.15), transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 flex items-center justify-center text-center px-5"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: "10px",
              letterSpacing: "0.32em",
              color: GOLD,
            }}
            aria-hidden="true"
          >
            IMAGERY ON REQUEST
          </div>
        </>
      )}
    </div>

    <div className="flex flex-col">
      <span style={statusStyle(p.status)} className="mb-3.5">
        {p.status}
      </span>

      <h4
        style={{
          fontFamily: '"Cinzel", serif',
          fontWeight: 500,
          fontSize: "22px",
          letterSpacing: "0.02em",
          color: NAVY,
          lineHeight: 1.2,
          marginBottom: "4px",
        }}
      >
        {p.address}
      </h4>

      {p.zone && (
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: "16px",
          }}
        >
          {p.zone}
        </p>
      )}

      <div
        className="flex flex-wrap gap-x-6 gap-y-2 py-3 mb-4"
        style={{
          borderTop: `1px solid ${RULE}`,
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        {p.specs.map((s, i) => (
          <div key={i} className="flex flex-col">
            <span
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: "2px",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "15px",
                color: NAVY,
                fontWeight: 500,
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: "19px",
          color: GOLD_DEEP,
          fontWeight: 500,
          letterSpacing: "0.04em",
          marginBottom: "14px",
        }}
      >
        {p.price}
        {p.priceQualifier && (
          <span
            style={{
              fontFamily: '"Jost", sans-serif',
              fontStyle: "italic",
              fontSize: "13px",
              color: MUTED,
              marginLeft: "6px",
              fontWeight: 300,
            }}
          >
            {p.priceQualifier}
          </span>
        )}
      </p>

      <p
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "15px",
          lineHeight: 1.7,
          color: "#1a1a1a",
          marginBottom: "14px",
          fontWeight: 300,
        }}
      >
        {p.description}
      </p>

      <div
        style={{
          background: CREAM,
          padding: "14px 18px",
          borderLeft: `2px solid ${GOLD}`,
        }}
      >
        <span
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: GOLD_DEEP,
            fontWeight: 500,
            marginRight: "8px",
          }}
        >
          {p.insightLabel ?? "Why It Matters"}
        </span>
        <span
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "14px",
            lineHeight: 1.6,
            color: NAVY,
            fontWeight: 300,
          }}
        >
          {p.insight}
        </span>
      </div>
    </div>
  </article>
);

/* ─── Watching item ─── */

const WatchingCard = ({ w }: { w: WatchingItem }) => (
  <div
    className="px-6 py-5"
    style={{ background: CREAM, borderTop: `2px solid ${GOLD}` }}
  >
    <p
      style={{
        fontFamily: '"Jost", sans-serif',
        fontSize: "9px",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: GOLD_DEEP,
        fontWeight: 500,
        marginBottom: "8px",
      }}
    >
      {w.timeline}
    </p>
    <p
      style={{
        fontFamily: '"Cinzel", serif',
        fontSize: "16px",
        color: NAVY,
        fontWeight: 500,
        marginBottom: "8px",
      }}
    >
      {w.where}
    </p>
    <p
      style={{
        fontFamily: '"Jost", sans-serif',
        fontSize: "14px",
        lineHeight: 1.6,
        color: "#1a1a1a",
        fontWeight: 300,
      }}
    >
      {w.note}
    </p>
  </div>
);

/* ─── Trade row ─── */

const TradeListing = ({ row, isLast }: { row: TradeRow; isLast: boolean }) => (
  <div
    className="py-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8 items-baseline"
    style={{ borderBottom: isLast ? "none" : `1px solid ${RULE}` }}
  >
    <div>
      <p
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: "16px",
          color: NAVY,
          fontWeight: 500,
        }}
      >
        {row.address}
      </p>
      {row.neighborhood && (
        <p
          className="mt-1"
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: MUTED,
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
            fontStyle: "italic",
            fontSize: "13px",
            color: MUTED,
            fontWeight: 300,
          }}
        >
          {row.notes}
        </p>
      )}
    </div>
    <p
      style={{
        fontFamily: '"Cinzel", serif',
        fontSize: "18px",
        color: GOLD_DEEP,
        fontWeight: 500,
        textAlign: "right",
        whiteSpace: "nowrap",
      }}
    >
      {row.closedPrice}
    </p>
  </div>
);

/* ─── Section block ─── */

const BriefSectionBlock = ({ section }: { section: BriefSection }) => (
  <section className="py-14 md:py-20" style={{ background: PAPER }}>
    <div className={sectionWrap}>
      <SectionHeader section={section} />

      {section.body && (
        <p
          className="mb-7 whitespace-pre-line"
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "16px",
            lineHeight: 1.85,
            color: "#1a1a1a",
            fontWeight: 300,
          }}
        >
          {section.body}
        </p>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-3 mb-4">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-baseline gap-4"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "15px",
                color: NAVY,
                fontWeight: 300,
              }}
            >
              <span
                aria-hidden="true"
                className="inline-block w-1 h-1 rotate-45 flex-shrink-0 translate-y-[2px]"
                style={{ background: GOLD }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.type === "properties" && section.properties && (
        <div>
          {section.properties.map((p, i) => (
            <PropertyCard
              key={i}
              p={p}
              isLast={i === section.properties!.length - 1}
            />
          ))}
        </div>
      )}

      {section.type === "watching" && section.watching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {section.watching.map((w, i) => (
            <WatchingCard key={i} w={w} />
          ))}
        </div>
      )}

      {section.type === "trades" && section.trades && (
        <div style={{ borderTop: `1px solid ${NAVY}` }}>
          {section.trades.map((r, i) => (
            <TradeListing
              key={i}
              row={r}
              isLast={i === section.trades!.length - 1}
            />
          ))}
        </div>
      )}

      {section.type === "feature" && section.feature && (
        <PropertyCard p={section.feature} isLast />
      )}

      {section.attribution && (
        <p
          className="mt-6"
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: "13px",
            letterSpacing: "0.12em",
            color: GOLD_DEEP,
          }}
        >
          {section.attribution}
        </p>
      )}
    </div>
  </section>
);

export default BriefSectionBlock;
export { eyebrowStyle };
