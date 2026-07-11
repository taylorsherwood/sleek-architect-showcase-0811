const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

interface Stat {
  label: string;
  value: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  score?: number;
  positionLabel?: string;
  stats?: Stat[];
  attribution?: string;
}

const DEFAULT_STATS: Stat[] = [
  { label: "Bee Cave / Spanish Oaks", value: "2.3 months of inventory (seller-leaning)" },
  { label: "Westlake 78746 / Rob Roy", value: "5.2 months (balanced)" },
  { label: "Spicewood 78669 / Belvedere corridor", value: "11.2 months (buyer's market)" },
];

export default function GatedCommunityGauge({
  eyebrow = "GATED COMMUNITY MARKET CONDITIONS",
  title = "Gated Community Market Conditions",
  subtitle = "Austin gated submarkets · Q2 2026 (Apr–Jun)",
  score = 45,
  positionLabel = "Balanced, edging toward buyers at the top end",
  stats = DEFAULT_STATS,
  attribution = "Source: Unlock MLS via MLS Grid, Q2 2026",
}: Props) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <section
      className="py-8 md:py-10"
      style={{ backgroundColor: "#FAFAF8" }}
      aria-label="Gated community market conditions"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="pt-8 md:pt-10 pb-8 md:pb-10"
            style={{ borderTop: `1px solid ${GOLD}33` }}
          >
            <p
              className="text-[11px] tracking-[0.22em] uppercase font-sans mb-3"
              style={{ color: GOLD }}
            >
              {eyebrow}
            </p>
            <h3
              className="font-display text-2xl md:text-3xl font-normal mb-2"
              style={{ color: NAVY }}
            >
              {title}
            </h3>
            <p
              className="font-sans text-[13px] mb-8"
              style={{ color: `${NAVY}99` }}
            >
              {subtitle}
            </p>

            <div className="relative pt-2">
              <div
                className="relative h-[6px] rounded-full overflow-hidden"
                style={{ backgroundColor: `${NAVY}10` }}
                role="img"
                aria-label={`Market position: ${score} on a buyer-to-seller spectrum`}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: "40%", backgroundColor: `${NAVY}1f` }}
                />
                <div
                  className="absolute inset-y-0"
                  style={{ left: "40%", width: "20%", backgroundColor: `${GOLD}40` }}
                />
                <div
                  className="absolute inset-y-0"
                  style={{ left: "60%", right: 0, backgroundColor: `${NAVY}33` }}
                />
              </div>

              <div
                className="absolute motion-safe:transition-[left] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{ left: `${pct}%`, top: "calc(0.5rem + 3px)", transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="gauge-dot-pulse w-[14px] h-[14px] rounded-full"
                  style={{ backgroundColor: GOLD, boxShadow: `0 0 0 3px #FAFAF8` }}
                />
              </div>

              <div
                className="mt-4 flex justify-between text-[10px] tracking-[0.22em] uppercase font-sans"
                style={{ color: `${NAVY}80` }}
              >
                <span>Buyer Advantage</span>
                <span>Balanced</span>
                <span>Seller Advantage</span>
              </div>
            </div>

            <p
              className="mt-6 font-display text-[19px] md:text-[21px] leading-snug"
              style={{ color: NAVY }}
            >
              {positionLabel}
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-y-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 pb-2.5"
                  style={{ borderBottom: `1px solid ${NAVY}14` }}
                >
                  <dt
                    className="text-[11px] tracking-[0.18em] uppercase font-sans"
                    style={{ color: `${NAVY}80` }}
                  >
                    {s.label}
                  </dt>
                  <dd
                    className="font-display text-[15px]"
                    style={{ color: NAVY }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className="mt-6 text-[11px] tracking-[0.22em] uppercase font-sans"
              style={{ color: `${NAVY}66` }}
            >
              {attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
