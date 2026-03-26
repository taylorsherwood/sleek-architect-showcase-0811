import { Link } from "react-router-dom";

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
];

const CommunitiesPreview = () => {
  const [hero, ...secondary] = featured;

  return (
    <section className="pt-20 pb-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-minimal text-gold mb-4 font-extrabold">
              SELECT COMMUNITIES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-5">
              Austin's Most Sought-After Addresses
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              A curated introduction to the neighborhoods that define luxury living in Austin.
            </p>
          </div>

          {/* Single-row editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Hero — ~58% width (7 of 12 cols) */}
            <Link
              to={`/communities/${hero.slug}`}
              className="group relative overflow-hidden md:col-span-7 aspect-[4/3]"
            >
              <img
                src={hero.image}
                alt={`Luxury homes in ${hero.name}, Austin Texas`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/8 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <h3 className="text-warm-cream font-display text-2xl md:text-3xl mb-1">
                  {hero.name}
                </h3>
                <p className="text-warm-cream/55 text-[0.6rem] tracking-[0.15em] uppercase">
                  {hero.descriptor}
                </p>
              </div>
            </Link>

            {/* Secondary — stacked, 5 of 12 cols */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4">
              {secondary.map((c) => (
                <Link
                  key={c.slug}
                  to={`/communities/${c.slug}`}
                  className="group relative overflow-hidden aspect-[3/2] md:aspect-auto md:h-full"
                >
                  <img
                    src={c.image}
                    alt={`Luxury homes in ${c.name}, Austin Texas`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/8 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-warm-cream font-display text-lg md:text-xl mb-0.5">
                      {c.name}
                    </h3>
                    <p className="text-warm-cream/50 text-[0.55rem] tracking-[0.15em] uppercase">
                      {c.descriptor}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* View all */}
          <div className="text-center mt-12">
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
