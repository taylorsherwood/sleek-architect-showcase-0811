import { Link } from "react-router-dom";
import NeighborhoodMedian from "@/components/NeighborhoodMedian";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardRollingwood from "@/assets/community-rollingwood.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";


const NEIGHBORHOODS = [
  { name: "Barton Creek", image: card78746, stat: "", slug: "barton-creek" },
  { name: "Rollingwood", image: cardRollingwood, stat: "", slug: "rollingwood" },
  { name: "Old Enfield", image: cardOldEnfield, stat: "", slug: "old-enfield" },
  { name: "West Lake Hills", image: cardWestlake, stat: "", slug: "westlake-hills" },
  { name: "Tarrytown", image: cardDavenport, stat: "CENTRAL ACCESS TO AUSTIN", slug: "tarrytown" },
  { name: "Spanish Oaks", image: cardSpanishOaks, stat: "GUARD GATED GOLF ESTATES", slug: "spanish-oaks" },
];

/** Image-led homepage atlas; all six communities remain accessible without scroll pinning. */
const HomeCommunitiesScroll = () => (
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" aria-label="Featured Austin communities">
      {NEIGHBORHOODS.map((n) => (
        <Link key={n.slug} to={`/communities/${n.slug}`} aria-label={`Explore ${n.name}, Austin community`} className="home-community-tile group relative block aspect-[4/5] overflow-hidden bg-primary">
          <img src={n.image} alt={`${n.name} Austin neighborhood`} className="w-full h-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025]" loading="lazy" decoding="async" />
          <div className="home-community-shade absolute inset-0 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-primary-foreground">
            <NeighborhoodMedian area={n.slug} />
            {n.stat && <p className="text-gold text-[10px] mb-3 uppercase">{n.stat}</p>}
            <h3 className="font-display font-normal text-2xl leading-snug mb-3">{n.name}</h3>
            <span className="text-xs inline-block border-b border-gold pb-1">Explore Community →</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default HomeCommunitiesScroll;
