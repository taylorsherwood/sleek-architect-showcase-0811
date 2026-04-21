import { CommunityTransit } from "@/types/community";

interface Props {
  transit: CommunityTransit;
}

const TransitPanel = ({ transit }: Props) => {
  const scores = [
    { label: "Walk Score", value: transit.walk_score },
    { label: "Bike Score", value: transit.bike_score },
    { label: "Transit Score", value: transit.transit_score },
  ].filter((s) => s.value != null);

  if (scores.length === 0 && !transit.summary) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
        Transit & Walkability
      </h2>
      {scores.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-border mb-6">
          {scores.map((s) => (
            <div key={s.label} className="bg-background p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{s.label}</p>
              <p className="text-3xl font-display text-architectural">{s.value}</p>
            </div>
          ))}
        </div>
      )}
      {transit.summary && (
        <p className="text-muted-foreground leading-relaxed">{transit.summary}</p>
      )}
    </section>
  );
};

export default TransitPanel;
