import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardTarrytown from "@/assets/community-tarrytown.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";

gsap.registerPlugin(ScrollTrigger);

const NEIGHBORHOODS = [
  { name: "Barton creek", image: card78746, stat: "Median sale: $3.2M", slug: "barton-creek" },
  { name: "Rollingwood", image: cardTarrytown, stat: "Avg DOM off-market: 14 days", slug: "rollingwood" },
  { name: "Old Enfield", image: cardOldEnfield, stat: "60% OF TRADES ARE PRIVATE", slug: "old-enfield" },
  { name: "Westlake Hills", image: cardWestlake, stat: "Median sale: $4.1M", slug: "westlake-hills" },
  { name: "Tarrytown", image: cardDavenport, stat: "CENTRAL ACCESS TO AUSTIN", slug: "tarrytown" },
  { name: "Spanish Oaks", image: cardSpanishOaks, stat: "GUARD GATED GOLF ESTATES", slug: "spanish-oaks" },
];

/**
 * Horizontal pinned scroll gallery — mirrors Section 4 of
 * /off-market-real-estate-austin (CinematicSections.tsx).
 *
 * Desktop/tablet: section pins, neighborhoods slide horizontally as the
 * user scrolls vertically. Mobile: stacked full-bleed cards (no pin).
 */
const HomeCommunitiesScroll = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Match off-market: pinned horizontal scroll runs on tablet + desktop.
    // True mobile (<768px) stays as stacked vertical fallback.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const horizontalTrack = root.querySelector<HTMLDivElement>(".hcs-track");
      if (!horizontalTrack) return;

      const getTotalScroll = () =>
        Math.max(horizontalTrack.scrollWidth - window.innerWidth, 0);

      // Reveal: track eases up, first card image scales down from over-zoom.
      gsap.set(".hcs-track", { yPercent: 8 });
      gsap.set(".hcs-card.is-first .hcs-card-image img", { scale: 1.18 });
      gsap.set(".hcs-card.is-first .hcs-card-content", { opacity: 0, y: 40 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".hcs-section",
          start: "top bottom",
          end: "top top",
          scrub: 0.6,
        },
      });
      reveal
        .to(".hcs-track", { yPercent: 0, ease: "none", force3D: true }, 0)
        .to(".hcs-card.is-first .hcs-card-image img", { scale: 1, ease: "none", force3D: true }, 0)
        .to(".hcs-card.is-first .hcs-card-content", { opacity: 1, y: 0, ease: "none", force3D: true }, 0.4);

      // Horizontal scroll pin
      const horizontalTween = gsap.to(horizontalTrack, {
        x: () => -getTotalScroll(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hcs-section",
          start: "top top",
          end: () => `+=${getTotalScroll()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          fastScrollEnd: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Per-card subtle parallax (skip last card to avoid post-pin shift)
      const cardImages = gsap.utils.toArray<HTMLDivElement>(".hcs-card-image");
      cardImages.forEach((img, i) => {
        if (i === cardImages.length - 1) return;
        gsap.fromTo(
          img,
          { xPercent: -3 },
          {
            xPercent: 3,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: img.parentElement!,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: 0.6,
            },
          }
        );
      });

      // Hide site navigation while the gallery is fully pinned (immersive
      // full-screen mode). Restore once the user scrolls past the last card
      // or back above the first.
      ScrollTrigger.create({
        trigger: ".hcs-section",
        start: "top top",
        end: () => `+=${getTotalScroll()}`,
        onEnter: () => document.body.classList.add("hcs-immersive"),
        onLeave: () => document.body.classList.remove("hcs-immersive"),
        onEnterBack: () => document.body.classList.add("hcs-immersive"),
        onLeaveBack: () => document.body.classList.remove("hcs-immersive"),
      });

      // Refresh after images load to pick up final dimensions
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      // Refresh shortly after mount so downstream pinned triggers
      // (e.g. TestimonialsSection split-reveal) recompute their start/end
      // against the pinSpacing height this gallery adds to the page.
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
      const refreshTimer2 = window.setTimeout(() => ScrollTrigger.refresh(), 600);

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(refreshTimer);
        window.clearTimeout(refreshTimer2);
      };
    }, root);

    return () => {
      ctx.revert();
      document.body.classList.remove("hcs-immersive");
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-[hsl(220,15%,6%)]">
      {/* DESKTOP / TABLET — pinned horizontal scroll */}
      <section
        className="hcs-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,6%)] hidden md:block"
        aria-label="Featured Austin communities"
      >
        <div
          className="hcs-track absolute top-0 left-0 flex h-full"
          style={{ width: `${NEIGHBORHOODS.length * 100}vw` }}
        >
          {NEIGHBORHOODS.map((n, idx) => (
            <Link
              key={n.name}
              to={`/communities/${n.slug}`}
              aria-label={`Explore ${n.name} — luxury Austin community`}
              className={`hcs-card group relative h-screen flex items-end overflow-hidden will-change-transform cursor-pointer ${idx === 0 ? "is-first" : ""}`}
              style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
            >
              <div
                className="hcs-card-image absolute inset-0 will-change-transform"
                style={{ width: "100%", left: "0%" }}
              >
                <img
                  src={n.image}
                  alt={`${n.name} luxury Austin neighborhood`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-500 group-hover:bg-[rgba(12,15,36,0.32)]"
                style={{ backgroundColor: "rgba(12, 15, 36, 0.2)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12, 15, 36, 0.75), rgba(12, 15, 36, 0))",
                }}
              />
              <div className="hcs-card-content relative z-10 p-10 lg:p-14 max-w-xl">
                <p
                  className="mb-4 text-xs uppercase tracking-[0.24em] font-sans"
                  style={{ color: "#b9a06c" }}
                >
                  {n.stat}
                </p>
                <h2 className="font-display text-4xl lg:text-6xl text-white leading-[0.98] mb-5">
                  {n.name}
                </h2>
                <span
                  className="inline-block text-white/0 group-hover:text-white/90 transition-colors duration-500"
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
