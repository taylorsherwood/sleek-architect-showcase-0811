import { createElement } from "react";

const RealScoutSearch = () => {
  return (
    <section className="bg-background pt-16 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          {/* Editorial heading */}
          <header className="mb-10 md:mb-14 text-center">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-5 font-medium text-foreground/40"
            >
              Explore the Market
            </p>
            <h2
              className="font-display text-3xl md:text-[2.8rem] font-light leading-[1.1] tracking-[-0.01em] text-foreground"
            >
              Find Your Next
              <span className="italic text-[hsl(var(--gold))]"> Residence</span>
            </h2>
            <p className="mt-4 text-sm md:text-[15px] text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
              Search luxury homes, land, and investment opportunities across Austin's most coveted neighborhoods.
            </p>
          </header>

          {/* Premium card container — no overlays, widget fully interactive */}
          <div
            className="bg-background rounded-lg border border-border/60 p-5 md:p-8"
            style={{
              boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06), 0 1px 3px hsl(var(--foreground) / 0.03)",
            }}
          >
            {createElement("realscout-advanced-search", {
              "agent-encoded-id": "QWdlbnQtMjg5NDU2",
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealScoutSearch;

