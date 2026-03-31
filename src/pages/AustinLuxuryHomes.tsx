import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import FeaturedLuxuryListings from "@/components/FeaturedLuxuryListings";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import { communityPages } from "@/data/communityData";

const faqs = [
  { question: "What defines luxury real estate in Austin Texas?", answer: "Luxury real estate in Austin generally starts at $1 million for single-family homes and encompasses properties up to $30 million or more. The luxury segment includes waterfront estates on Lake Austin, hilltop mansions in Westlake Hills, gated golf community homes in Barton Creek, walkable urban estates in Tarrytown, high-rise penthouses downtown, and sprawling Hill Country ranches. What unifies Austin luxury is exceptional quality, premium locations, and distinctive lifestyle experiences." },
  { question: "Where are the most expensive homes in Austin?", answer: "The most expensive homes in Austin are concentrated along Lake Austin's waterfront ($2M–$25M+), in Westlake Hills ($1.2M–$20M+), and within the gated Barton Creek community ($1.5M–$15M+). Texas Hill Country ranch estates can exceed $30 million for exceptional properties with significant acreage." },
  { question: "Is Austin luxury real estate a good investment?", answer: "Yes. Austin's luxury market benefits from a booming tech economy (Apple, Google, Tesla, Meta, Oracle), no state income tax, sustained in-migration from high-cost states, limited premium inventory, and exceptional lifestyle appeal. Supply-constrained neighborhoods like Lake Austin waterfront and Westlake Hills have demonstrated 7–12% average annual appreciation over the past decade." },
  { question: "How do I find luxury homes for sale in Austin?", answer: "Working with a specialized luxury agent is essential. Many of Austin's finest properties trade off-market through private networks. Echelon Property Group provides access to both publicly listed and exclusive off-market luxury homes across all of Austin's premier neighborhoods. Contact us for a personalized property search." },
  { question: "What is the average price per square foot for luxury homes in Austin?", answer: "Price per square foot varies significantly by neighborhood and property type. New construction in Tarrytown and Rollingwood typically achieves $600–$800/sq ft. Westlake Hills and Barton Creek estates range from $400–$600/sq ft. Lake Austin waterfront can exceed $1,000/sq ft for premium properties. Downtown luxury condos range from $400–$1,500/sq ft depending on building and floor." },
  { question: "Do I need a luxury real estate specialist in Austin?", answer: "Yes. Austin's luxury market involves unique dynamics including off-market transactions, complex negotiations, neighborhood-specific expertise, and high-value deal structuring. A specialist like Echelon Property Group provides market intelligence, private network access, and experienced representation that generalist agents cannot match." },
];

const AustinLuxuryHomes = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Luxury Homes for Sale | Echelon Property Group"
        description="Browse luxury homes for sale in Austin TX. Estate properties, waterfront homes, and premium residences in Westlake, Barton Creek, and Lake Austin."
        canonical="/listings"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />
      <div className="h-12 md:h-20" />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-3 sm:mb-4">AUSTIN LUXURY REAL ESTATE</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-5 sm:mb-8">
              Austin Luxury Homes for Sale
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              Discover Austin's finest luxury properties — from lakefront estates and hilltop mansions 
              to gated golf communities and Hill Country ranches. Echelon Property Group is your 
              trusted guide to Austin luxury real estate.
            </p>
          </div>
        </div>
      </section>

      <FeaturedLuxuryListings />

      <article className="pb-24">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">

            {/* Market Overview */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-5 sm:mb-6">
                Austin's Luxury Real Estate Market
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Austin, Texas has established itself as one of the most dynamic and desirable luxury real estate markets in the United States. Fueled by a world-class technology economy, Texas's no-state-income-tax advantage, year-round outdoor lifestyle, and a cultural scene that rivals cities twice its size, Austin attracts high-net-worth buyers from across the country and around the globe.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Austin luxury market spans an extraordinary range of property types and lifestyles. Buyers can choose from waterfront estates with private docks on <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>, architecturally significant hilltop mansions in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>, gated golf community homes in <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, charming walkable estates in <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link>, sleek high-rise penthouses in <Link to="/communities/downtown-austin-condos" className="text-foreground underline hover:text-muted-foreground">Downtown Austin</Link>, and expansive ranch properties in the <Link to="/communities/texas-hill-country-estates" className="text-foreground underline hover:text-muted-foreground">Texas Hill Country</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What sets Austin apart from other luxury markets is the combination of exceptional value relative to coastal cities, a thriving and diversified economy, and a quality of life that balances urban sophistication with natural beauty. Buyers relocating from San Francisco, Los Angeles, New York, and other high-cost markets consistently find that Austin delivers more space, better amenities, and a lower overall cost of living — all without sacrificing career opportunity or cultural richness.
              </p>
            </section>

            {/* Property Types */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-5 sm:mb-6">
                Types of Luxury Properties in Austin
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Waterfront Estates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin waterfront</Link> homes represent the pinnacle of Austin luxury real estate. These properties feature private docks, infinity-edge pools, panoramic water views, and resort-style outdoor living. Lake Austin's constant water level — unlike the fluctuating Lake Travis — makes it ideal for year-round boating and waterfront enjoyment. Prices range from $2 million to over $25 million, with extreme scarcity ensuring strong long-term appreciation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Hilltop Estates and Hill Country View Homes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link> is Austin's premier destination for homes with sweeping Hill Country and Lake Austin views. Perched on scenic bluffs west of downtown, these estates offer privacy, space, and access to the top-rated Eanes Independent School District. Many properties feature walls of glass, seamless indoor-outdoor living, and custom architecture designed to frame the landscape. Homes range from $1.2 million to over $20 million.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Gated Community and Golf Estates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link> is Austin's premier gated luxury community, featuring four championship golf courses, a full-service country club, and estate homes on generous lots nestled among mature oaks and limestone terrain. The community's approaching build-out makes remaining properties increasingly valuable. Homes range from $1.5 million to over $15 million, with golf-course-front and greenbelt-view lots commanding the highest premiums.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Walkable Urban Luxury</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For buyers who prioritize walkability and central location, <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link> and <Link to="/communities/travis-heights" className="text-foreground underline hover:text-muted-foreground">Travis Heights</Link> deliver Austin's most coveted in-town luxury experiences. Tarrytown's tree-canopied streets, proximity to Deep Eddy Pool and Lady Bird Lake, and eclectic architecture ranging from 1930s bungalows to contemporary masterpieces make it a perennial favorite. Travis Heights offers downtown skyline views and walkable access to South Congress Avenue's renowned dining and boutique scene.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">High-Rise Luxury Condominiums</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Link to="/communities/downtown-austin-condos" className="text-foreground underline hover:text-muted-foreground">Downtown Austin</Link> offers a sophisticated urban lifestyle with luxury high-rise residences in landmark buildings like The Independent, The Austonian, and the Four Seasons Residences. These properties feature panoramic skyline and lake views, resort-style amenities, concierge services, and walkable access to Austin's best dining, entertainment, and cultural attractions. Prices range from $400,000 to over $10 million.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Ranch and Hill Country Estates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The <Link to="/communities/texas-hill-country-estates" className="text-foreground underline hover:text-muted-foreground">Texas Hill Country</Link> and <Link to="/communities/dripping-springs" className="text-foreground underline hover:text-muted-foreground">Dripping Springs</Link> offer luxury on a grand scale — sprawling ranch estates, vineyard properties, and custom homes set among rolling hills, ancient live oaks, and wildflower meadows. Properties range from boutique estates on 10 to 50 acres to working ranches spanning thousands of acres, with prices from $1 million to over $30 million.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium mb-3">Small-Town Luxury</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Link to="/communities/rollingwood" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link>, a small incorporated city of fewer than 1,500 residents nestled between Zilker Park and Westlake Hills, offers an intimate luxury experience with Eanes ISD schools, walkable access to Zilker Park and Barton Springs Pool, and homes ranging from $1 million to over $5 million. Its compact geography and active teardown-rebuild market create a dynamic and desirable community.
                  </p>
                </div>
              </div>
            </section>

            {/* All Community Links */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6 sm:mb-8">
                Explore Austin's Luxury Communities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {communityPages.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/communities/${c.slug}`}
                    className="group border-2 border-border p-6 rounded-lg hover:border-gold transition-colors duration-500"
                  >
                    <p className="text-minimal text-gold mb-1">{c.priceRange}</p>
                    <h3 className="text-lg font-display font-normal text-architectural group-hover:text-muted-foreground transition-colors mb-1">
                      {c.name}
                    </h3>
                    <p className="text-minimal text-muted-foreground group-hover:text-gold transition-colors duration-500">VIEW COMMUNITY →</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Why Echelon */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Work with Echelon Property Group
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Navigating Austin's luxury real estate market requires more than access to listings — it demands deep neighborhood knowledge, established relationships, strategic negotiation skills, and an understanding of the nuances that distinguish exceptional properties from ordinary ones. Echelon Property Group brings all of this to every client engagement.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Off-Market Access</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Many of Austin's finest luxury properties never appear on public listing platforms. Our established network provides clients with access to <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">off-market and private exclusive listings</Link> across all of Austin's premier neighborhoods.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Hyper-Local Expertise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We don't just sell homes in Austin's luxury neighborhoods — we live in them. Our deep, street-level knowledge of communities from Westlake Hills to the Hill Country allows us to provide insights that data alone cannot capture.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Strategic Market Intelligence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our <Link to="/austin-luxury-market-report" className="text-foreground underline hover:text-muted-foreground">market reports</Link> and analysis provide clients with the data-driven insights needed to make confident buying and selling decisions in a dynamic market.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Relocation Expertise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For buyers <Link to="/moving-to-austin-texas" className="text-foreground underline hover:text-muted-foreground">moving to Austin</Link> from out of state, we provide comprehensive relocation guidance including neighborhood comparisons, school information, tax planning considerations, and lifestyle orientation.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions About Austin Luxury Real Estate
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16 bg-muted -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Start Your Austin Luxury Home Search
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're searching for a waterfront estate, a hilltop mansion, or a Hill Country ranch, 
                Echelon Property Group provides the expertise and access you need to find your perfect Austin luxury home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
                  CONTACT US
                </Link>
                <a
                  href="https://taylorsherwood.realscout.com/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 transition-colors duration-300"
                >
                  SEARCH HOMES
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default AustinLuxuryHomes;
