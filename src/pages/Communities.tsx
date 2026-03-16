import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema } from "@/components/SchemaMarkup";

const communityFaqs = [
  { question: "What are the best luxury neighborhoods in Austin Texas?", answer: "Austin's premier luxury neighborhoods include Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, and Dripping Springs. Each offers distinct lifestyle benefits, school districts, and price ranges." },
  { question: "What is the average home price in Austin's luxury communities?", answer: "Prices vary by neighborhood. Westlake Hills ranges from $1.2M to $20M+, Barton Creek from $1.5M to $15M+, and Lake Austin waterfront from $2M to $25M+. Entry-level luxury starts around $800K in neighborhoods like Tarrytown." },
  { question: "Which Austin neighborhood has the best schools?", answer: "Westlake Hills, Barton Creek, and Rollingwood are served by the Eanes Independent School District, consistently ranked among the top districts in Texas." },
  { question: "Are there waterfront homes in Austin?", answer: "Yes. Lake Austin and Lake Travis offer waterfront estates with private docks, panoramic water views, and a resort-like lifestyle just minutes from downtown Austin." },
];
import { Link } from "react-router-dom";
import { communityPages } from "@/data/communityData";

import bartonCreek from "@/assets/community-barton-creek.jpg";
import westlake from "@/assets/community-westlake-hills.avif";
import lakeAustin from "@/assets/community-lake-austin.jpg";
import rollingwood from "@/assets/community-rollingwood.jpg";
import hillCountry from "@/assets/community-hill-country.jpg";
import travisHeights from "@/assets/community-travis-heights.jpg";
import tarrytown from "@/assets/community-tarrytown.jpg";
import drippingSprings from "@/assets/community-dripping-springs.jpg";
import downtown from "@/assets/community-downtown.jpg";
import zilker from "@/assets/community-zilker-barton-springs.jpg";
import spanishOaks from "@/assets/community-spanish-oaks.jpg";
import catMountain from "@/assets/community-cat-mountain.jpg";

const imageMap: Record<string, string> = {
  "barton-creek": bartonCreek,
  "westlake-hills": westlake,
  "lake-austin": lakeAustin,
  "rollingwood": rollingwood,
  "texas-hill-country-estates": hillCountry,
  "travis-heights": travisHeights,
  "downtown-austin-condos": downtown,
  "tarrytown": tarrytown,
  "dripping-springs": drippingSprings,
  "zilker-austin": zilker,
  "spanish-oaks": spanishOaks,
  "cat-mountain-northwest-hills": catMountain,
};

const Communities = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Luxury Communities | Echelon Property Group"
        description="Explore Austin's finest luxury neighborhoods: Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, and more. Expert guidance from Echelon Property Group."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(communityFaqs)} />
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
              {[...communityPages].sort((a, b) => a.name.localeCompare(b.name)).map((community) => {
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
                          title={`${community.name} homes for sale — Austin luxury real estate`}
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

      {/* ── SEO Content: Communities Overview ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
              Luxury Living in Austin's Best Neighborhoods
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin, Texas is home to some of the most desirable luxury communities in the American Southwest. From the gated estates of Barton Creek and Spanish Oaks to the waterfront properties along Lake Austin and Lake Travis, the city offers a remarkable diversity of high-end living environments — each with its own distinct character, amenities, and lifestyle appeal.
              </p>
              <p>
                What makes Austin's luxury neighborhoods exceptional is the rare combination of natural beauty, urban convenience, and economic opportunity. Residents enjoy access to world-class dining, live music, outdoor recreation, and a thriving technology economy — all within a state that levies no personal income tax.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Why Live in Austin's Luxury Communities
              </h3>
              <p>
                Each of Austin's premier neighborhoods offers something unique. Westlake Hills is renowned for the top-rated Eanes Independent School District and sweeping Hill Country views. Barton Creek provides gated country club living with championship golf and resort-caliber amenities. Lake Austin waterfront estates offer private docks and serene water views just minutes from downtown. Tarrytown delivers old Austin charm with walkability and mature tree canopies, while Rollingwood offers a small-town feel with big-city proximity.
              </p>
              <p>
                For those seeking more space, the Texas Hill Country and Dripping Springs provide sprawling ranch estates, vineyard properties, and acreage surrounded by rolling terrain and live oaks. Downtown Austin and Travis Heights cater to buyers who prefer urban energy, walkable streetscapes, and proximity to the city's cultural core.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Market Insights Across Austin Neighborhoods
              </h3>
              <p>
                Austin's luxury real estate market varies significantly by neighborhood. Lake Austin waterfront commands the highest per-property prices, with estates regularly exceeding $10 million. Barton Creek and Westlake Hills feature the largest concentration of $3 million–plus homes. Downtown Austin penthouses and high-rises appeal to buyers seeking lock-and-leave convenience with skyline views, while emerging areas like Zilker and Barton Hills offer strong appreciation potential.
              </p>
              <p>
                Inventory in Austin's most exclusive communities remains limited, and many of the finest properties trade off-market through private channels. Working with an agent who has deep neighborhood expertise and access to off-market inventory is essential for buyers targeting these communities.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Expert Guidance for Every Neighborhood
              </h3>
              <p>
                At Echelon Property Group, we don't just sell homes in these communities — we know them intimately. Taylor Sherwood provides clients with hyperlocal market knowledge, including pricing trends, school zone boundaries, HOA details, flood zone considerations, and upcoming development that could impact property values. Whether you're relocating to Austin from out of state or moving between neighborhoods, our community-level expertise ensures you find the right fit for your lifestyle and investment goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
              Frequently Asked Questions About Austin Communities
            </h2>
            <div className="space-y-6">
              {communityFaqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal">→ BUYING A HOME IN AUSTIN</Link>
              <Link to="/sell" className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal">→ SELLING YOUR AUSTIN HOME</Link>
              <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal">→ BEST NEIGHBORHOODS IN AUSTIN</Link>
              <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal">→ AUSTIN LUXURY REAL ESTATE</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Communities;
