import { useEffect, useMemo, useState } from "react";
import { fetchMortgageRate, monthlyPayment, type MortgageRateSeries } from "@/lib/rates";
import { fetchMetricsByMarketName, type MarketMetricsResponse } from "@/lib/agentIntel";

// Rates + Affordability Context
// -----------------------------------------------------------------------------
// Editorial pairing of the live 30-year fixed mortgage average (FRED) against
// the Austin Metro median sales price (AgentIntel). Renders an advisory
// interpretation of monthly carry and the year-over-year shift in financing
// cost. Intentionally restrained: one hero rate, one paired affordability
// figure, one short commentary block. No dashboard grids.

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

interface Props {
  /** Assumed down-payment fraction. Defaults to 20% — the convention for the
   *  Austin Metro median household, not the upper-tier. */
  downPaymentPct?: number;
  /** Optional advisory note appended below the auto-narrative. */
  commentary?: string;
}

function formatMoney(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  return `$${Math.round(v).toLocaleString()}`;
}

function formatPeriod(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch { return iso; }
}

/** Approximate prior-year rate from the FRED trailing window. */
function priorYearRate(series: MortgageRateSeries): number | null {
  const pts = series.points ?? [];
  if (pts.length < 2) return null;
  // Series is weekly; ~52 entries back is a year. Fall back to oldest.
  const prior = pts.length >= 52 ? pts[0] : pts[0];
  return prior?.value ?? null;
}

export const RatesAffordability = ({
  downPaymentPct = 0.2,
  commentary,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rates, setRates] = useState<MortgageRateSeries | null>(null);
  const [metrics, setMetrics] = useState<MarketMetricsResponse | null>(null);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const [r, m] = await Promise.all([
          fetchMortgageRate(),
          fetchMetricsByMarketName("Austin Metro", ["median_sales_price"], "1_month"),
        ]);
        if (!live) return;
        setRates(r);
        setMetrics(m.data);
      } catch (e) {
        if (live) setError("Financing context is temporarily unavailable.");
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, []);

  const latestRate = rates?.latest ?? null;
  const priorRate = useMemo(() => (rates ? priorYearRate(rates) : null), [rates]);
  const medianPrice = metrics?.metrics?.median_sales_price?.latest ?? null;

  const payment = useMemo(() => {
    if (!latestRate || !medianPrice) return null;
    return monthlyPayment(medianPrice * (1 - downPaymentPct), latestRate);
  }, [latestRate, medianPrice, downPaymentPct]);

  const paymentPrior = useMemo(() => {
    if (!priorRate || !medianPrice) return null;
    return monthlyPayment(medianPrice * (1 - downPaymentPct), priorRate);
  }, [priorRate, medianPrice, downPaymentPct]);

  const carryDelta = payment != null && paymentPrior != null && paymentPrior > 0
    ? (payment - paymentPrior) / paymentPrior
    : null;

  const rateDelta = latestRate != null && priorRate != null ? latestRate - priorRate : null;

  const periodLabel = formatPeriod(rates?.latest_date ?? null);

  const narrative = useMemo(() => {
    if (latestRate == null) return "";
    const rateMove = rateDelta == null
      ? ""
      : rateDelta >= 0.05
        ? ` Conventional financing has risen roughly ${Math.abs(rateDelta).toFixed(2)} points year over year,`
        : rateDelta <= -0.05
          ? ` Conventional financing has eased roughly ${Math.abs(rateDelta).toFixed(2)} points year over year,`
          : " Conventional financing has held essentially flat year over year,";
    const carryMove = carryDelta == null
      ? " shaping monthly carry across the Austin metro."
      : carryDelta >= 0
        ? ` lifting monthly carry on the metro median by ${(carryDelta * 100).toFixed(1)}% and reinforcing the case for disciplined offer strategy.`
        : ` improving monthly carry on the metro median by ${Math.abs(carryDelta * 100).toFixed(1)}% and widening the window for qualified buyers.`;
    return `The 30-year fixed sits at ${latestRate.toFixed(2)}%.${rateMove}${carryMove}`;
  }, [latestRate, rateDelta, carryDelta]);

  return (
    <section
      className="relative pt-12 md:pt-16 pb-16 md:pb-24"
      aria-label="Rates and affordability context"
    >
      <div className="max-w-5xl mx-auto px-2 md:px-0">
        {/* Masthead — folio numeral, single hairline descender */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <span
            aria-hidden
            className="block w-px h-12 md:h-20"
            style={{ background: `linear-gradient(to bottom, rgba(12,15,36,0) 0%, rgba(12,15,36,0.22) 100%)` }}
          />
          <p
            className="mt-5 text-[0.6rem] tracking-[0.46em] uppercase"
            style={{ color: GOLD }}
          >
            <span className="font-display italic normal-case tracking-normal mr-3" style={{ fontSize: "0.95em" }}>
              No. II
            </span>
            <span aria-hidden style={{ color: `${NAVY}55` }}>·</span>
            <span className="ml-3">Rates &amp; Affordability Context</span>
          </p>
        </div>

        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2
            className="font-display font-light leading-[1.06] tracking-tight"
            style={{ color: NAVY, fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
          >
            Financing Backdrop for the Austin Buyer
          </h2>
          {periodLabel && !loading && !error && (
            <p className="mt-5 text-[0.6rem] tracking-[0.4em] uppercase text-muted-foreground/75">
              Reference Brief · {periodLabel}
            </p>
          )}
        </header>

        {loading && (
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-16 w-1/2 mx-auto bg-border/30" />
            <div className="h-4 w-2/3 mx-auto bg-border/20" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-sm italic text-muted-foreground">{error}</p>
        )}

        {!loading && !error && latestRate != null && (
          <>
            {/* Paired headline figures: rate · monthly carry. No card chrome. */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="text-center py-8 md:py-2 md:pr-10 md:border-r border-t-0" style={{ borderColor: `${NAVY}14` }}>
                <p className="text-[0.6rem] tracking-[0.36em] uppercase text-muted-foreground/80 mb-5">
                  30-Year Fixed
                </p>
                <p
                  className="font-display font-light leading-[0.95] tracking-[-0.02em]"
                  style={{
                    color: NAVY,
                    fontSize: "clamp(2.75rem, 7vw, 5rem)",
                    fontFeatureSettings: '"lnum", "tnum"',
                  }}
                >
                  {latestRate.toFixed(2)}<span style={{ fontSize: "0.55em" }}>%</span>
                </p>
                {rateDelta != null && Math.abs(rateDelta) >= 0.01 && (
                  <p className="mt-4 text-[0.62rem] tracking-[0.32em] uppercase" style={{ color: GOLD }}>
                    <span className="opacity-70">Year over Year ·</span>{" "}
                    <span className="font-medium">
                      {rateDelta >= 0 ? "+" : "−"}{Math.abs(rateDelta).toFixed(2)} pts
                    </span>
                  </p>
                )}
              </div>

              <div className="text-center py-8 md:py-2 md:pl-10 border-t md:border-t-0" style={{ borderColor: `${NAVY}14` }}>
                <p className="text-[0.6rem] tracking-[0.36em] uppercase text-muted-foreground/80 mb-5">
                  Monthly Carry · Metro Median
                </p>
                <p
                  className="font-display font-light leading-[0.95] tracking-[-0.02em]"
                  style={{
                    color: NAVY,
                    fontSize: "clamp(2.75rem, 7vw, 5rem)",
                    fontFeatureSettings: '"lnum", "tnum"',
                  }}
                >
                  {formatMoney(payment)}
                </p>
                {medianPrice != null && (
                  <p className="mt-4 text-[0.62rem] tracking-[0.28em] uppercase text-muted-foreground/70">
                    Assumes {Math.round((1 - downPaymentPct) * 100)}% financing on {formatMoney(medianPrice)} median
                  </p>
                )}
              </div>
            </div>

            {/* Commentary */}
            {(commentary || narrative) && (
              <figure className="mt-14 md:mt-20 max-w-2xl mx-auto text-center">
                <span
                  aria-hidden
                  className="block mx-auto h-px w-12 mb-7"
                  style={{ background: GOLD }}
                />
                <blockquote
                  className="font-light italic leading-[1.55] normal-case"
                  style={{ color: NAVY, fontSize: "clamp(0.95rem, 1.25vw, 1.1rem)", textTransform: "none", fontVariant: "normal" }}
                >
                  {commentary || narrative}
                </blockquote>
              </figure>
            )}
          </>
        )}

        {/* Colophon */}
        <div className="mt-14 md:mt-20 flex items-center gap-6">
          <span aria-hidden className="h-px flex-1" style={{ background: `${NAVY}14` }} />
          <p className="text-[0.55rem] tracking-[0.36em] uppercase text-muted-foreground/70 whitespace-nowrap">
            Source · Freddie Mac via FRED · AgentIntel
          </p>
          <span aria-hidden className="h-px flex-1" style={{ background: `${NAVY}14` }} />
        </div>
      </div>
    </section>
  );
};

export default RatesAffordability;
