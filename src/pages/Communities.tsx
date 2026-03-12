import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { communityPages } from "@/data/communityData";

const bartonCreek = "/lovable-uploads/99d231ba-d5ab-43da-83fe-162a182a3914.jpg";
const westlake = "/lovable-uploads/c250e465-9078-48da-b8c6-a690b5beb959.png";
import lakeAustin from "@/assets/community-lake-austin.jpg";
import rollingwood from "@/assets/community-rollingwood.jpg";
import hillCountry from "@/assets/community-hill-country.jpg";
import travisHeights from "@/assets/community-travis-heights.jpg";
import tarrytown from "@/assets/community-tarrytown.jpg";
import drippingSprings from "@/assets/community-dripping-springs.jpg";
import downtown from "@/assets/community-downtown.jpg";
import zilker from "@/assets/community-zilker.jpg";

const imageMap: Record<string, string> = {
  "barton-creek": bartonCreek,
  "westlake-hills": westlake,
  "lake-austin-waterfront": lakeAustin,
  "rollingwood": rollingwood,
  "texas-hill-country-estates": hillCountry,
  "travis-heights": travisHeights,
  "downtown-austin-condos": downtown,
  "tarrytown": tarrytown,
  "dripping-springs": drippingSprings,
};

const Communities = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Luxury Communities | Echelon Property Group"
        description="Explore Austin's finest luxury neighborhoods including Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, and more. Expert guidance from Echelon Property Group."
      />
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4">LUXURY COMMUNITIES</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              Austin's Finest Neighborhoods
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Deep expertise in the communities that define luxury living in the Austin area. 
              Explore the neighborhoods where we live, work, and help clients find their perfect home.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityPages.map((community) => {
                const img = imageMap[community.slug] || community.image;
                return (
                  <Link
                    key={community.slug}
                    to={`/communities/${community.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden mb-4">
                      {img ? (
                        <img
                          src={img}
                          alt={`Luxury homes for sale in ${community.name}, Austin Texas`}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">{community.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-minimal text-gold mb-2">{community.priceRange}</p>
                    <h2 className="text-2xl font-display font-light text-architectural group-hover:text-muted-foreground transition-colors duration-300 mb-2">
                      {community.name}
                    </h2>
                    <p className="text-minimal text-muted-foreground">EXPLORE COMMUNITY →</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Communities;
