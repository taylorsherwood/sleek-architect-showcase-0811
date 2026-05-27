import { ReactNode } from "react";

interface InsightCardProps {
  eyebrow: string;
  title: string;
  /** Optional standfirst rendered between title and data. Keeps modules crawlable. */
  standfirst?: ReactNode;
  lastUpdated?: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
  /** Short editorial interpretation rendered after the data. */
  interpretation?: ReactNode;
  /** Optional id for in-page anchoring. */
  id?: string;
}

export const InsightCard = ({
  id,
  eyebrow,
  title,
  standfirst,
  lastUpdated,
  loading,
  error,
  children,
  interpretation,
}: InsightCardProps) => {
  return (
    <article
      id={id}
      className="group border border-border/60 bg-[#f5f4f1] dark:bg-[hsl(38_15%_15%/0.2)] p-8 md:p-12 shadow-[var(--shadow-elegant)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-architectural)] hover:border-border/90 animate-fade-in"
    >
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6 mb-6">
        <div className="flex-1">
          <p className="text-minimal text-gold mb-3 tracking-[0.28em] font-semibold uppercase text-[0.7rem]">
            {eyebrow}
          </p>
          <h2 className="text-2xl md:text-[1.85rem] font-display font-normal text-architectural leading-snug">
            {title}
          </h2>
          {standfirst && (
            <p className="mt-4 text-base text-foreground/80 leading-relaxed max-w-3xl">
              {standfirst}
            </p>
          )}
        </div>
        {lastUpdated && !loading && !error && (
          <span className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap md:mt-2">
            Updated {lastUpdated}
          </span>
        )}
      </header>

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

      {!loading && !error && (
        <div className="animate-fade-in">
          {children}
          {interpretation && (
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gold font-semibold mb-3">
                Advisor's Read
              </p>
              <div className="text-[15px] md:text-base text-foreground/85 leading-relaxed max-w-3xl font-display">
                {interpretation}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default InsightCard;
