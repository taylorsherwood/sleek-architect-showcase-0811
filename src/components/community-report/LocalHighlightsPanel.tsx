import { LocalHighlightCategory } from "@/types/community";

interface Props {
  highlights: LocalHighlightCategory[];
  communityName: string;
}

const PLACEHOLDER_CATEGORIES: { category: string; icon?: string; placeholders: string[] }[] = [
  { category: "Parks & Outdoors", icon: "🌳", placeholders: ["Add a nearby park", "Add a trail or greenbelt", "Add a recreation area"] },
  { category: "Restaurants", icon: "🍽", placeholders: ["Add a notable restaurant", "Add a neighborhood favorite", "Add a fine dining option"] },
  { category: "Cafes", icon: "☕", placeholders: ["Add a local cafe", "Add a coffee roaster"] },
  { category: "Shopping", icon: "🛍", placeholders: ["Add a shopping destination", "Add a boutique"] },
  { category: "Lake & Recreation", icon: "🚤", placeholders: ["Add a lake access point", "Add a marina or boat ramp"] },
  { category: "Country Clubs", icon: "⛳", placeholders: ["Add a private club", "Add a golf course"] },
];

const LocalHighlightsPanel = ({ highlights, communityName }: Props) => {
  const populated = (highlights || []).filter((c) => c.items?.length > 0);
  const useReal = populated.length > 0;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Local Highlights
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        {useReal
          ? `Curated nearby places and points of interest in ${communityName}.`
          : `Add curated POIs in the admin to populate this section. Showing placeholder layout for ${communityName}.`}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {useReal
          ? populated.map((cat) => (
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
            ))
          : PLACEHOLDER_CATEGORIES.map((cat) => (
              <div key={cat.category} className="bg-background p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span aria-hidden className="text-base opacity-40">{cat.icon}</span>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold/60">
                    {cat.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {cat.placeholders.map((p, i) => (
                    <li key={i} className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                      <p className="text-muted-foreground/60 italic leading-snug">{p}</p>
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
