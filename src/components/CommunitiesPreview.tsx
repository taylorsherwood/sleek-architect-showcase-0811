import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const featured = [
  {
    name: "Barton Creek",
    descriptor: "Golf, privacy, Hill Country estates",
    image: "/static-assets/community-barton-creek.webp",
    slug: "barton-creek",
  },
  {
    name: "Lake Austin",
    descriptor: "Waterfront living at its finest",
    image: "/static-assets/community-lake-austin.webp",
    slug: "lake-austin",
  },
  {
    name: "Westlake Hills",
    descriptor: "Scenic bluffs, top-rated schools",
    image: "/static-assets/community-westlake-hills.webp",
    slug: "westlake-hills",
  },
  {
    name: "Tarrytown",
    descriptor: "Historic prestige near downtown",
    image: "/static-assets/community-tarrytown.webp",
    slug: "tarrytown",
  },
  {
    name: "Rollingwood",
    descriptor: "Quiet enclave, Eanes ISD",
    image: "/static-assets/community-rollingwood.webp",
    slug: "rollingwood",
  },
  {
    name: "Spanish Oaks",
    descriptor: "Gated luxury, championship golf",
    image: "/static-assets/community-spanish-oaks.webp",
    slug: "spanish-oaks",
  },
];

const CommunitiesPreview = () => {
  const [hero, ...secondary] = featured;
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".community-pin-tile");

      // Subtle parallax + reveal as the section is pinned
      gsap.fromTo(
        tiles,
        { y: 40, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 0.6,
            pin: stickyRef.current,
            pinSpacing: true,
          },
        }
      );

      // Gentle image scale during pin
      tiles.forEach((tile) => {
        const img = tile.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=80%",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div ref={stickyRef} className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-5">
              <p className="text-minimal text-gold mb-4 font-extrabold">
                SELECT COMMUNITIES
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-5">
                Austin's Most Sought-After Addresses
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                A curated introduction to the neighborhoods that define luxury living in Austin.
              </p>
            </div>
          </ScrollReveal>

          {/* Editorial layout: hero + 5 secondary tiles */}
          <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[6px]">
            {/* Hero — 7 of 12 cols, spans 2 rows */}
            <Link
              to={`/communities/${hero.slug}`}
              className="community-pin-tile group relative overflow-hidden md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto"
            >
              <img
                src={hero.image}
                alt={`Luxury homes in ${hero.name}, Austin Texas`}
                className="community-tile-img absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 via-[40%] to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <h3 className="text-warm-cream font-display text-2xl md:text-3xl mb-1.5 font-medium tracking-[0.03em] leading-[1.1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  {hero.name}
                </h3>
                <p className="text-warm-cream/70 text-[0.6rem] font-normal tracking-[0.07em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {hero.descriptor}
                </p>
              </div>
            </Link>

            {/* Secondary — 5 tiles in 5-col grid area, 2 rows */}
            {secondary.map((c) => (
              <Link
                key={c.slug}
                to={`/communities/${c.slug}`}
                className="community-pin-tile group relative overflow-hidden md:col-span-5 lg:col-span-5 aspect-[3/2] md:aspect-auto md:min-h-[180px]"
              >
                <img
                  src={c.image}
                  alt={`Luxury homes in ${c.name}, Austin Texas`}
                  className="community-tile-img absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 50vw, 42vw"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={533}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 via-[40%] to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-warm-cream font-display text-lg md:text-xl mb-1 font-medium tracking-[0.03em] leading-[1.1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    {c.name}
                  </h3>
                  <p className="text-warm-cream/65 text-[0.55rem] font-normal tracking-[0.07em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {c.descriptor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          </ScrollReveal>

          {/* View all */}
          <div className="text-center mt-12">
            <Link
              to="/communities"
              className="gold-metallic-text gold-underline-hover inline-block px-10 py-2.5 text-[0.6rem] tracking-[0.22em] uppercase"
            >
              Explore All Communities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesPreview;
