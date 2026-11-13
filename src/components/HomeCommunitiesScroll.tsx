import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NeighborhoodMedian from "@/components/NeighborhoodMedian";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardRollingwood from "@/assets/community-rollingwood.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";

const NEIGHBORHOODS = [
  { name: "Barton Creek", image: card78746, slug: "barton-creek", note: "Hill Country estates above the greenbelt" },
  { name: "Rollingwood", image: cardRollingwood, slug: "rollingwood", note: "Quiet streets minutes from downtown" },
  { name: "Old Enfield", image: cardOldEnfield, slug: "old-enfield", note: "Historic central Austin architecture" },
  { name: "West Lake Hills", image: cardWestlake, slug: "westlake-hills", note: "Eanes ISD and wooded hillside lots" },
  { name: "Tarrytown", image: cardDavenport, slug: "tarrytown", note: "Lake Austin access, close to the core" },
  { name: "Spanish Oaks", image: cardSpanishOaks, slug: "spanish-oaks", note: "Gated golf living in the hills" },
];
const N = NEIGHBORHOODS.length;

/** Overlapping card deck; every community link stays in the DOM and keyboard-reachable. */
const HomeCommunitiesScroll = () => {
  const [active, setActive] = useState(0);
  const go = (d: number) => setActive((a) => (a + d + N) % N);

  return (
    <div className="container mx-auto px-6 lg:flex lg:items-center lg:gap-12">
      <div className="home-deck relative lg:flex-1 lg:order-2 h-[460px] sm:h-[520px] lg:h-[600px]" aria-label="Featured Austin communities">
        {NEIGHBORHOODS.map((n, i) => {
          const pos = (i - active + N) % N;
          const front = pos === 0;
          const onClick = (e: MouseEvent) => { if (!front) { e.preventDefault(); setActive(i); } };
          return (
            <Link
              key={n.slug}
              to={`/communities/${n.slug}`}
              onClick={onClick}
              onFocus={() => setActive(i)}
              data-pos={pos > 3 ? "hidden" : pos}
              aria-label={`Explore ${n.name}, Austin community`}
              className="home-deck-card group absolute top-0 left-0 lg:left-[4%] h-full w-[78%] sm:w-[62%] lg:w-[52%] overflow-hidden bg-primary"
            >
              <img src={n.image} alt={`${n.name} Austin neighborhood`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out motion-safe:group-hover:scale-[1.04]" loading="lazy" decoding="async" />
              <div className="home-community-shade absolute inset-0 pointer-events-none" />
              <span className="absolute top-6 left-6 md:top-8 md:left-8 font-display text-sm text-primary-foreground/80 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
              <div className="home-deck-copy absolute inset-x-0 bottom-0 p-6 md:p-10 text-primary-foreground">
                <NeighborhoodMedian area={n.slug} />
                <span className="block w-10 h-px bg-gold mb-4" aria-hidden="true" />
                <h3 className="font-display font-normal leading-tight mb-2 text-3xl md:text-5xl">{n.name}</h3>
                <p className="text-sm font-light text-primary-foreground/80 mb-5 max-w-xs">{n.note}</p>
                <span className="text-[11px] tracking-[0.2em] uppercase inline-block border-b border-gold pb-1">Explore Community →</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 lg:mt-0 lg:order-1 flex lg:flex-col items-center justify-center gap-6 lg:shrink-0">
        <button type="button" onClick={() => go(-1)} aria-label="Previous community" className="home-deck-arrow"><ArrowLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next community" className="home-deck-arrow"><ArrowRight className="w-4 h-4" /></button>
        <span className="font-display text-sm tracking-[0.2em] text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
      </div>
    </div>
  );
};
export default HomeCommunitiesScroll;
