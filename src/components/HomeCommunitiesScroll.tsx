import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardTarrytown from "@/assets/community-tarrytown.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";

const NEIGHBORHOODS = [
  { name: "Barton Creek", image: card78746, stat: "Median sale: $3.2M", slug: "barton-creek" },
  { name: "Rollingwood", image: cardTarrytown, stat: "Avg DOM off-market: 14 days", slug: "rollingwood" },
  { name: "Old Enfield", image: cardOldEnfield, stat: "60% OF TRADES ARE PRIVATE", slug: "old-enfield" },
  { name: "Westlake Hills", image: cardWestlake, stat: "Median sale: $4.1M", slug: "westlake-hills" },
  { name: "Tarrytown", image: cardDavenport, stat: "Central access to Austin", slug: "tarrytown" },
  { name: "Spanish Oaks", image: cardSpanishOaks, stat: "Guard-gated golf estates", slug: "spanish-oaks" },
];

/**
 * Featured Austin communities — horizontal scroll carousel.
 * Desktop/tablet: section pins for ~250vh of vertical scroll, cards translate
 * horizontally via Framer Motion (much snappier than full-width pinned panels).
 * Mobile: stacked full-bleed cards (no pin).
 */
const HomeCommunitiesScroll = () => {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // Travel from a small start offset to roughly -83% so the last card lands
  // flush with the right edge regardless of viewport width.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-83%"]);

  return (
    <div className="bg-[hsl(220,15%,6%)]">
      {/* DESKTOP / TABLET — Framer Motion horizontal scroll */}
      <section
        ref={targetRef}
        className="relative hidden md:block bg-[hsl(220,15%,6%)]"
        style={{ height: "250vh" }}
        aria-label="Featured Austin communities"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 lg:gap-8 pl-6 lg:pl-12">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.name}
                to={`/communities/${n.slug}`}
                aria-label={`Explore ${n.name} — luxury Austin community`}
                className="group relative overflow-hidden flex-shrink-0"
                style={{ width: "min(560px, 70vw)", height: "70vh" }}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={n.image}
                    alt={`${n.name} luxury Austin neighborhood`}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div
                  className="absolute inset-0 z-[1] pointer-events-none transition-colors duration-500 group-hover:bg-[rgba(12,15,36,0.32)]"
                  style={{ backgroundColor: "rgba(12, 15, 36, 0.2)" }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 z-[1] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12, 15, 36, 0.78), rgba(12, 15, 36, 0))",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-8 lg:p-10">
                  <p
                    className="mb-3 text-[0.7rem] uppercase tracking-[0.24em] font-sans"
                    style={{ color: "#b9a06c" }}
                  >
                    {n.stat}
                  </p>
                  <h2 className="font-display text-3xl lg:text-5xl text-white leading-[1] mb-4">
                    {n.name}
                  </h2>
                  <span
                    className="inline-block text-white/70 group-hover:text-white transition-colors duration-500"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.7rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(185, 160, 108, 0.7)",
                      paddingBottom: "4px",
                    }}
                  >
                    Explore Community →
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MOBILE — stacked full-bleed fallback (no pin) */}
      <div className="md:hidden bg-[hsl(220,15%,6%)]">
        {NEIGHBORHOODS.map((n) => (
          <Link
            key={`m-${n.name}`}
            to={`/communities/${n.slug}`}
            aria-label={`Explore ${n.name} — luxury Austin community`}
            className="relative w-full overflow-hidden block"
            style={{ height: "70vh" }}
          >
            <img
              src={n.image}
              alt={`${n.name} luxury Austin neighborhood`}
              className="w-full h-full object-cover"
              decoding="async"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "rgba(12, 15, 36, 0.2)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(12, 15, 36, 0.75), rgba(12, 15, 36, 0))",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 max-w-xl">
              <p
                className="mb-3 text-[0.65rem] uppercase tracking-[0.24em] font-sans"
                style={{ color: "#b9a06c" }}
              >
                {n.stat}
              </p>
              <h2 className="font-display text-3xl text-white leading-[1]">
                {n.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCommunitiesScroll;
