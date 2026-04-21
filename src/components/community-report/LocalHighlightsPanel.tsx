import { LocalHighlightCategory } from "@/types/community";

interface Props {
  highlights: LocalHighlightCategory[];
  communityName: string;
}

const LocalHighlightsPanel = ({ highlights, communityName }: Props) => {
  const filtered = highlights.filter((c) => c.items?.length > 0);
  if (filtered.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Local Highlights
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Curated nearby places and points of interest in {communityName}.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {filtered.map((cat) => (
          <div key={cat.category} className="bg-background p-6">
            <div className="flex items-baseline gap-2 mb-4">
              {cat.icon && <span aria-hidden className="text-base">{cat.icon}</span>}
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold">
                {cat.category}
              </h3>
            </div>
            <ul className="space-y-3">
              {cat.items.map((item, i) => (
                <li key={i} className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                  <p className="text-foreground leading-snug">{item.name}</p>
                  {item.detail && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocalHighlightsPanel;
