import { Lock, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { isUnlocked } from "@/lib/communityUnlock";

interface LockedReportPreviewProps {
  slug: string;
  communityName: string;
  /** Hash target id of the primary access form to scroll to. */
  formTargetId?: string;
}

interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}

const DEFAULT_METRICS: Metric[] = [
  { label: "MEDIAN PRICE TREND", value: "+6.2%", trend: "up", hint: "Trailing 12 months" },
  { label: "AVG DAYS ON MARKET", value: "38", trend: "down", hint: "Down from 51 last quarter" },
  { label: "OFF-MARKET ACTIVITY", value: "1 in 4", trend: "flat", hint: "Of recent transactions" },
];

const BLURRED_CARDS: { eyebrow: string; title: string; preview: string }[] = [
  {
    eyebrow: "PRICE SEGMENTATION",
    title: "Where the market is actually clearing",
    preview:
      "$2.4M – $3.1M tier moving fastest · $4M+ tier sitting · entry-level under contract within 12 days on average.",
  },
  {
    eyebrow: "RECENT SALES",
    title: "Last 90 days, mapped to street and lot context",
    preview:
      "12 closed sales · 4 of which never hit MLS · spread across the 78746 corridor with notable outliers near Eanes.",
  },
  {
    eyebrow: "BUYER DEMAND",
    title: "Where pressure is building right now",
    preview:
      "Showings up 22% MoM in the under-$3.5M tier · multiple-offer activity returning · cash share at 41%.",
  },
  {
    eyebrow: "OFF-MARKET INVENTORY",
    title: "What we know is quietly available",
    preview:
      "Six properties currently exposed only to private channels · two value-add · one waterfront-adjacent estate.",
  },
];

const TrendIndicator = ({ trend }: { trend?: Metric["trend"] }) => {
  if (trend === "up") {
    return <TrendingUp className="w-4 h-4 text-gold" aria-hidden />;
  }
  if (trend === "down") {
    return <TrendingDown className="w-4 h-4 text-gold" aria-hidden />;
  }
  return null;
};

/**
 * Conversion-focused locked preview block. Shows three real-feeling
 * top-line metrics plus a 4-card blurred dataset preview. Each card is
 * masked with a soft dark gradient + lock icon and a "Full dataset
 * unlocked after access" affordance. CTAs scroll smoothly to the gate
 * form lower on the page.
 *
 * Hidden once the visitor has unlocked the briefing on this device.
 */
const LockedReportPreview = ({
  slug,
  communityName,
  formTargetId = "unlock-report",
}: LockedReportPreviewProps) => {
  const [unlocked, setUnlockedLocal] = useState(false);

  useEffect(() => {
    setUnlockedLocal(isUnlocked(slug));
  }, [slug]);

  if (unlocked) return null;

  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(formTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="locked-report-preview-heading"
      className="py-16 md:py-24 bg-secondary"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
              ECHELON PRIVATE MARKET REPORT
            </p>
            <h2
              id="locked-report-preview-heading"
              className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.15] mb-5"
            >
              {communityName} Private Market Report
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A deeper layer of data not visible on public platforms.
            </p>
          </div>

          {/* Visible top-line metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mt-12">
            {DEFAULT_METRICS.map((m) => (
              <div key={m.label} className="bg-secondary p-7 md:p-8">
                <p className="text-minimal text-muted-foreground tracking-[0.2em] mb-4">
                  {m.label}
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-display font-normal text-architectural">
                    {m.value}
                  </p>
                  <TrendIndicator trend={m.trend} />
                </div>
                {m.hint && (
                  <p className="text-sm text-muted-foreground mt-3">{m.hint}</p>
                )}
              </div>
            ))}
          </div>

          {/* Blurred dataset preview grid */}
          <div className="mt-10">
            <p className="text-minimal text-muted-foreground tracking-[0.2em] mb-5 uppercase">
              {communityName} Community Profile
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {BLURRED_CARDS.map((card) => (
                <div
                  key={card.eyebrow}
                  className="relative overflow-hidden border border-border bg-background"
                >
                  {/* Blurred content */}
                  <div
                    aria-hidden
                    className="p-7 md:p-8 select-none pointer-events-none"
                    style={{ filter: "blur(6px)" }}
                  >
                    <p className="text-minimal text-gold mb-3 tracking-[0.15em]">
                      {card.eyebrow}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-architectural mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {card.preview}
                    </p>
                    {/* Faux chart bars to add visual texture under blur */}
                    <div className="mt-6 flex items-end gap-2 h-16">
                      {[60, 80, 45, 95, 70, 55, 88, 40].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gold/40"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Dark gradient overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.85) 100%)",
                    }}
                  />

                  {/* Lock affordance */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/60 mb-4">
                      <Lock className="w-4 h-4 text-gold" aria-hidden />
                    </span>
                    <p className="text-minimal text-gold tracking-[0.2em] mb-2">
                      {card.eyebrow}
                    </p>
                    <p className="text-foreground text-sm md:text-base">
                      Full dataset unlocked after access
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA below the preview */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Reserved for buyers and sellers actively evaluating {communityName}.
              Instant access. No spam. Updated regularly.
            </p>
            <a
              href={`#${formTargetId}`}
              onClick={handleScrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 border border-gold text-gold tracking-[0.2em] text-sm hover:bg-gold hover:text-background transition-colors duration-300 whitespace-nowrap"
            >
              UNLOCK FULL REPORT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockedReportPreview;
