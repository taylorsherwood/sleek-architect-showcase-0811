import { CommunityTransit } from "@/types/community";

interface Props {
  transit: CommunityTransit;
}

const descriptor = (label: string, score?: number | null): { tier: string; note: string } => {
  if (score == null) return { tier: "—", note: "" };
  if (label === "Walk Score") {
    if (score >= 90) return { tier: "Walker's Paradise", note: "Daily errands do not require a car" };
    if (score >= 70) return { tier: "Very Walkable", note: "Most errands can be accomplished on foot" };
    if (score >= 50) return { tier: "Somewhat Walkable", note: "Some errands can be accomplished on foot" };
    if (score >= 25) return { tier: "Car-Dependent", note: "Most errands require a car" };
    return { tier: "Car-Dependent", note: "Almost all errands require a car" };
  }
  if (label === "Bike Score") {
    if (score >= 90) return { tier: "Biker's Paradise", note: "Flat as a pancake, excellent bike lanes" };
    if (score >= 70) return { tier: "Very Bikeable", note: "Biking is convenient for most trips" };
    if (score >= 50) return { tier: "Bikeable", note: "Some bike infrastructure" };
    if (score >= 25) return { tier: "Somewhat Bikeable", note: "Minimal bike infrastructure" };
    return { tier: "Not Bikeable", note: "Limited or no bike infrastructure" };
  }
  // Transit
  if (score >= 90) return { tier: "Rider's Paradise", note: "World-class public transportation" };
  if (score >= 70) return { tier: "Excellent Transit", note: "Transit is convenient for most trips" };
  if (score >= 50) return { tier: "Good Transit", note: "Many nearby public transportation options" };
  if (score >= 25) return { tier: "Some Transit", note: "A few nearby public transportation options" };
  return { tier: "Minimal Transit", note: "It is possible to get on a bus" };
};

const TransitPanel = ({ transit }: Props) => {
  const scores = [
    { label: "Walk Score", value: transit.walk_score },
    { label: "Bike Score", value: transit.bike_score },
    { label: "Transit Score", value: transit.transit_score },
  ].filter((s) => s.value != null);

  if (scores.length === 0 && !transit.summary) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Walkability & Transportation
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        How easy it is to get around on foot, by bike, and by transit in this area.
      </p>

      {scores.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-px bg-border mb-6">
          {scores.map((s) => {
            const d = descriptor(s.label, s.value);
            return (
              <div key={s.label} className="bg-background p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  {s.label}
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-4xl font-display text-architectural">{s.value}</p>
                  <p className="text-sm text-foreground">{d.tier}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.note}</p>
              </div>
            );
          })}
        </div>
      )}

      {transit.summary && (
        <p className="text-muted-foreground leading-relaxed">{transit.summary}</p>
      )}

      {scores.length > 0 && (
        <p className="text-[11px] text-muted-foreground mt-4">
          Source: Walk Score®
        </p>
      )}
    </section>
  );
};

export default TransitPanel;
