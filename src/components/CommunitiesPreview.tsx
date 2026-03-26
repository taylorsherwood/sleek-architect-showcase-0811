import { Link } from "react-router-dom";

/**
 * Curated editorial communities — 5 featured communities in an asymmetrical layout.
 * The first community is the "hero" at ~60% width; the rest fill secondary slots.
 */
const featured = [
  {
    name: "Barton Creek",
    descriptor: "Golf, privacy, Hill Country estates",
    image: "/static-assets/community-barton-creek.jpg",
    slug: "barton-creek",
  },
  {
    name: "Lake Austin",
    descriptor: "Waterfront living at its finest",
    image: "/static-assets/community-lake-austin.jpg",
    slug: "lake-austin",
  },
  {
    name: "Westlake Hills",
    descriptor: "Scenic bluffs, top-rated schools",
    image: "/static-assets/community-westlake-hills.avif",
    slug: "westlake-hills",
  },
  {
    name: "Tarrytown",
    descriptor: "Old Austin charm, walkable elegance",
    image: "/static-assets/community-tarrytown.jpg",
    slug: "tarrytown",
  },
  {
    name: "Spanish Oaks",
    descriptor: "Gated luxury, resort amenities",
    image: "/static-assets/community-spanish-oaks.jpg",
    slug: "spanish-oaks",
  },
];

const CommunitiesPreview = () => {
  const [hero, ...secondary] = featured;

  return (
    <section className="pt-28 pb-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">
              SELECT COMMUNITIES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
              Austin's Most Sought-After Addresses
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A curated introduction to the neighborhoods that define luxury living in Austin.
            </p>
          </div>

          {/* Editorial layout — hero + secondary */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
            {/* Hero community — spans 3 of 5 columns */}
            <Link
              to={`/communities/${hero.slug}`}
              className="group relative overflow-hidden md:col-span-3 aspect-[3/4] md:aspect-[4/5]"
            >
              <img
                src={hero.image}
                alt={`Luxury homes in ${hero.name}, Austin Texas`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-warm-cream font-display text-3xl md:text-4xl mb-1.5">
                  {hero.name}
                </h3>
                <p className="text-warm-cream/60 text-xs tracking-[0.15em] uppercase">
                  {hero.descriptor}
                </p>
              </div>
            </Link>

            {/* Secondary communities — 2 columns, 2 rows */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
              {secondary.slice(0, 2).map((c) => (
                <Link
                  key={c.slug}
                  to={`/communities/${c.slug}`}
                  className="group relative overflow-hidden aspect-[3/4] md:aspect-auto md:h-full"
                >
                  <img
                    src={c.image}
                    alt={`Luxury homes in ${c.name}, Austin Texas`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-warm-cream font-display text-xl md:text-2xl mb-1">
                      {c.name}
                    </h3>
                    <p className="text-warm-cream/50 text-[0.6rem] tracking-[0.15em] uppercase">
                      {c.descriptor}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom row — remaining communities */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
            {secondary.slice(2).map((c) => (
              <Link
                key={c.slug}
                to={`/communities/${c.slug}`}
                className="group relative overflow-hidden aspect-[16/9]"
              >
                <img
                  src={c.image}
                  alt={`Luxury homes in ${c.name}, Austin Texas`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-warm-cream font-display text-xl md:text-2xl mb-1">
                    {c.name}
                  </h3>
                  <p className="text-warm-cream/50 text-[0.6rem] tracking-[0.15em] uppercase">
                    {c.descriptor}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View all link */}
          <div className="text-center mt-14">
            <Link
              to="/communities"
              className="inline-block px-10 py-2.5 text-[0.6rem] tracking-[0.22em] uppercase text-foreground/50 hover:text-foreground/80 transition-all duration-500"
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
