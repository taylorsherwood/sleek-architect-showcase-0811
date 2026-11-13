import { Link } from "react-router-dom";
import NeighborhoodMedian from "@/components/NeighborhoodMedian";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardRollingwood from "@/assets/community-rollingwood.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";


const NEIGHBORHOODS = [
  { name: "Barton Creek", image: card78746, stat: "", slug: "barton-creek", note: "Hill Country estates above the greenbelt" },
  { name: "Rollingwood", image: cardRollingwood, stat: "", slug: "rollingwood", note: "Quiet streets minutes from downtown" },
  { name: "Old Enfield", image: cardOldEnfield, stat: "", slug: "old-enfield", note: "Historic central Austin architecture" },
  { name: "West Lake Hills", image: cardWestlake, stat: "", slug: "westlake-hills", note: "Eanes ISD and wooded hillside lots" },
  { name: "Tarrytown", image: cardDavenport, stat: "CENTRAL ACCESS TO AUSTIN", slug: "tarrytown", note: "Lake Austin access, close to the core" },
  { name: "Spanish Oaks", image: cardSpanishOaks, stat: "GUARD GATED GOLF ESTATES", slug: "spanish-oaks", note: "Gated golf living in the hills" },
];

const SPANS = [
  "lg:col-span-4 lg:row-span-2 aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
];

/** Image-led editorial mosaic; all six communities remain accessible without scroll pinning. */
const HomeCommunitiesScroll = () => (
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[340px] gap-2 md:gap-3" aria-label="Featured Austin communities">
      {NEIGHBORHOODS.map((n, i) => (
        <Link key={n.slug} to={`/communities/${n.slug}`} aria-label={`Explore ${n.name}, Austin community`} className={`home-community-tile group relative block overflow-hidden bg-primary ${SPANS[i]}`}>
          <img src={n.image} alt={`${n.name} Austin neighborhood`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out motion-safe:group-hover:scale-[1.05]" loading="lazy" decoding="async" />
          <div className="home-community-shade absolute inset-0 pointer-events-none transition-opacity duration-700" />
          <span className="absolute top-6 left-6 md:top-7 md:left-7 font-display text-sm text-primary-foreground/80 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-primary-foreground transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1">
            <NeighborhoodMedian area={n.slug} />
            {n.stat && <p className="text-gold text-[10px] tracking-[0.25em] mb-3 uppercase">{n.stat}</p>}
            <span className="block w-10 h-px bg-gold mb-4 transition-all duration-700 group-hover:w-16" aria-hidden="true" />
            <h3 className={`font-display font-normal leading-tight mb-2 ${i === 0 ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>{n.name}</h3>
            <p className="text-sm font-light text-primary-foreground/80 mb-4 max-w-xs">{n.note}</p>
            <span className="text-[11px] tracking-[0.2em] uppercase inline-block border-b border-gold pb-1">Explore Community →</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
export default HomeCommunitiesScroll;
