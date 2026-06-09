import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

interface Resource {
  label: string;
  description: string;
  href: string;
}

interface Props {
  communityName: string;
  communitySlug: string;
}

/**
 * End-of-community-page next-step block. Pairs with the existing
 * "Related Communities" grid (which covers nearby + related links) by
 * providing the third Part-3 pillar: relevant buyer resources, framed
 * around the specific community the visitor is currently reading.
 *
 * Editorial composition (gold hairlines, no cards) to preserve the
 * existing luxury system. Fires `community_resource_click` per item.
 */
const CommunityNextSteps = ({ communityName, communitySlug }: Props) => {
  const resources: Resource[] = [
    {
      label: `Buying in ${communityName}`,
      description: "How Echelon Property Group represents buyers in Austin's upper tier, from first showing to close.",
      href: "/buy",
    },
    {
      label: `Off-Market in ${communityName}`,
      description: "A meaningful share of inventory never reaches public portals. See how Echelon Property Group sources it.",
      href: "/off-market-real-estate-austin",
    },
    {
      label: "Market Intelligence",
      description: "The current read on Austin's $2M+ market, with absorption and pricing data not visible in the citywide median.",
      href: "/market-intelligence",
    },
  ];

  const onClick = (label: string, href: string) => () => {
    trackEvent("community_resource_click", {
      community_slug: communitySlug,
      community_name: communityName,
      resource_label: label,
      resource_href: href,
    });
  };

  return (
    <section className="mt-4" aria-label={`Buyer resources for ${communityName}`}>
      <p className="text-minimal text-gold mb-3 tracking-[0.22em] text-xs uppercase">
        Continue Your Search
      </p>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-10">
        Buyer Resources for {communityName}
      </h2>
      <ul className="grid md:grid-cols-3 gap-x-10 gap-y-10">
        {resources.map((r) => (
          <li key={r.href} className="group">
            <Link
              to={r.href}
              onClick={onClick(r.label, r.href)}
              className="block"
            >
              <span className="block w-8 h-px bg-[#b9a06c] mb-5 group-hover:w-14 transition-all duration-300" />
              <span className="block text-lg md:text-xl font-display font-normal text-architectural mb-3 leading-snug group-hover:text-gold transition-colors">
                {r.label}
              </span>
              <span className="block text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                {r.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommunityNextSteps;
