import { Link } from "react-router-dom";
import bartonCreek from "@/assets/community-barton-creek.jpg";
import westlake from "@/assets/community-westlake.jpg";
import lakeAustin from "@/assets/community-lake-austin.jpg";
import hillCountry from "@/assets/community-hill-country.jpg";
import rollingwood from "@/assets/community-rollingwood.jpg";
import zilker from "@/assets/community-zilker-barton-springs.jpg";
import travisHeights from "@/assets/community-travis-heights.jpg";
import downtown from "@/assets/community-downtown.jpg";

const communities = [
{ name: "Barton Creek", image: bartonCreek, slug: "barton-creek" },
{ name: "Westlake Hills", image: westlake, slug: "westlake-hills" },
{ name: "Lake Austin", image: lakeAustin, slug: "lake-austin-waterfront" },
{ name: "Hill Country", image: hillCountry, slug: "texas-hill-country-estates" },
{ name: "Rollingwood", image: rollingwood, slug: "rollingwood" },
{ name: "Zilker", image: zilker, slug: "zilker-barton-hills" },
{ name: "Travis Heights", image: travisHeights, slug: "travis-heights" },
{ name: "Downtown", image: downtown, slug: "downtown" }];


const CommunitiesPreview = () => {
  return (
    <section className="py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-minimal text-gold mb-4 font-extrabold">LUXURY COMMUNITIES</p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">Explore Austin's Premier Luxury Neighborhoods

            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From waterfront estates on Lake Austin to sprawling Hill Country ranches, 
              we know every corner of Austin's luxury real estate market.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communities.map((community, index) =>
            <Link
              key={index}
              to={`/communities/${community.slug}`}
              className="group relative overflow-hidden aspect-[3/4]">
              
                <img
                src={community.image}
                alt={community.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-warm-cream font-display text-xl md:text-2xl">
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