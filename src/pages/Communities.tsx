import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const bartonCreek = "/lovable-uploads/99d231ba-d5ab-43da-83fe-162a182a3914.jpg";
const westlake = "/lovable-uploads/c250e465-9078-48da-b8c6-a690b5beb959.png";
import lakeAustin from "@/assets/community-lake-austin.jpg";
import rollingwood from "@/assets/community-rollingwood.jpg";
import hillCountry from "@/assets/community-hill-country.jpg";

const communities = [
  {
    name: "Barton Creek",
    image: bartonCreek,
    description:
      "One of Austin's most prestigious master-planned communities, Barton Creek offers world-class golf, country club amenities, and stunning estate homes nestled among mature oaks and rolling terrain. Residents enjoy access to four championship golf courses, tennis, swimming, and fine dining—all within minutes of downtown Austin.",
    priceRange: "$1.5M – $15M+",
  },
  {
    name: "Westlake Hills",
    image: westlake,
    description:
      "Perched above the city with panoramic Hill Country views, Westlake Hills is synonymous with luxury living in Austin. Home to the highly acclaimed Eanes ISD, this community attracts families seeking top-tier schools, privacy, and proximity to both Lake Austin and downtown.",
    priceRange: "$1.2M – $20M+",
  },
  {
    name: "Lake Austin",
    image: lakeAustin,
    description:
      "Waterfront living at its finest. Lake Austin properties offer private docks, stunning water views, and a resort-like lifestyle just minutes from the heart of the city. From intimate lakeside retreats to grand waterfront estates, Lake Austin is one of the most sought-after addresses in Texas.",
    priceRange: "$2M – $25M+",
  },
  {
    name: "Rollingwood",
    image: rollingwood,
    description:
      "A charming enclave just south of downtown, Rollingwood combines walkability and community with easy access to Zilker Park, Barton Springs, and the best of Austin's dining and culture. Classic mid-century homes meet contemporary renovations on quiet, tree-lined streets.",
    priceRange: "$1M – $5M+",
  },
  {
    name: "Texas Hill Country",
    image: hillCountry,
    description:
      "Expansive ranches, vineyard estates, and luxury retreats set among the rolling hills, wildflower meadows, and ancient live oaks west of Austin. The Hill Country offers unmatched privacy, breathtaking landscapes, and a slower pace of life—all within an easy drive of the city.",
    priceRange: "$1M – $30M+",
  },
];

const Communities = () => {
  return (
    <div className="min-h-screen bg-background">
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
          <div className="max-w-7xl mx-auto space-y-24">
            {communities.map((community, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <p className="text-minimal text-gold mb-3">{community.priceRange}</p>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                    {community.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {community.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Communities;
