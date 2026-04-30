import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

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
    name: "West lake Hills",
    descriptor: "Scenic bluffs, top-rated schools",
    image: "/static-assets/community-westlake-hills.webp",
    slug: "westlake-hills",
  },
];

const CommunitiesPreview = () => {
  const [hero, ...secondary] = featured;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
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

          {/* Single-row editorial layout */}
          <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[6px]">
            {/* Hero — ~58% width (7 of 12 cols) */}
            <Link
              to={`/communities/${hero.slug}`}
              className="group relative overflow-hidden md:col-span-7 aspect-[4/3]"
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

            {/* Secondary — stacked, 5 of 12 cols */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-[6px]">
              {secondary.map((c) => (
                <Link
                  key={c.slug}
                  to={`/communities/${c.slug}`}
                  className="group relative overflow-hidden aspect-[3/2] md:aspect-auto md:h-full"
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
