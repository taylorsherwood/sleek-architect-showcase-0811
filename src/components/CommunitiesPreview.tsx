import { Link } from "react-router-dom";

const communities = [
  { name: "Barton Creek, \nLost Creek and Amarra", image: "/static-assets/community-barton-creek.jpg", slug: "barton-creek" },
  { name: "Cat Mountain & Northwest Hills", image: "/static-assets/community-cat-mountain.jpg", slug: "cat-mountain-northwest-hills", objectPosition: "20% center" },
  { name: "Downtown Austin", image: "/static-assets/community-downtown.jpg", slug: "downtown-austin-condos", objectPosition: "40% center" },
  { name: "Dripping Springs", image: "/static-assets/community-dripping-springs.jpg", slug: "dripping-springs" },
  { name: "Hill Country", image: "/static-assets/community-hill-country.jpg", slug: "texas-hill-country-estates" },
  { name: "Lake Austin", image: "/static-assets/community-lake-austin.jpg", slug: "lake-austin" },
  { name: "Rollingwood", image: "/static-assets/community-rollingwood.jpg", slug: "rollingwood" },
  { name: "Spanish Oaks", image: "/static-assets/community-spanish-oaks.jpg", slug: "spanish-oaks" },
  { name: "Tarrytown", image: "/static-assets/community-tarrytown.jpg", slug: "tarrytown" },
  { name: "Travis Heights", image: "/static-assets/community-travis-heights.jpg", slug: "travis-heights" },
  { name: "Westlake Hills", image: "/static-assets/community-westlake-hills.avif", slug: "westlake-hills" },
  { name: "Zilker & Barton Hills", image: "/static-assets/community-zilker-barton-springs.jpg", slug: "zilker-austin" },
];

const CommunitiesPreview = () => {
  return (
    <section className="pt-28 pb-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">LUXURY COMMUNITIES</p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">Explore Austin's Premier Neighborhoods</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From waterfront estates on Lake Austin to sprawling Hill Country ranches, we know every corner of Austin's real estate market.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communities.map((community, index) =>
            <Link
              key={index}
              to={`/communities/${community.slug}`}
              className="group relative overflow-hidden aspect-[3/4]">
              
              <img
                src={community.image}
                alt={`Luxury homes for sale in ${community.name}, Austin Texas`}
                title={`${community.name} luxury homes for sale in Austin TX`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                style={community.objectPosition ? { objectPosition: community.objectPosition } : undefined} />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-warm-cream font-display text-xl md:text-2xl whitespace-pre-line">
                    {community.name}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>);
};

export default CommunitiesPreview;