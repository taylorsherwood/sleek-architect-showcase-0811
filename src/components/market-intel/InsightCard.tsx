import { ReactNode } from "react";

interface InsightCardProps {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
}

export const InsightCard = ({ eyebrow, title, lastUpdated, loading, error, children }: InsightCardProps) => {
  return (
    <section className="border border-border/70 bg-[#f5f4f1] dark:bg-[hsl(38_15%_15%/0.2)] p-8 md:p-10 shadow-[var(--shadow-elegant)]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-minimal text-gold mb-2 tracking-[0.25em] font-semibold uppercase text-[0.7rem]">
            {eyebrow}
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-normal text-architectural leading-snug">
            {title}
          </h3>
        </div>
        {lastUpdated && !loading && !error && (
          <span className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap mt-1">
            Updated {lastUpdated}
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-border/60 w-2/3" />
          <div className="h-4 bg-border/60 w-1/2" />
          <div className="h-4 bg-border/60 w-3/4" />
        </div>
      )}

      {error && !loading && (
        <p className="text-sm text-muted-foreground italic">
          Market data is temporarily unavailable. Please check back shortly.
        </p>
      )}

      {!loading && !error && children}
    </section>
  );
};

export default InsightCard;
