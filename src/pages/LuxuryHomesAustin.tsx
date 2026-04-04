import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema } from "@/components/SchemaMarkup";
import AboutBlock from "@/components/AboutBlock";
import FeaturedLuxuryListings from "@/components/FeaturedLuxuryListings";
import RealScoutSearch from "@/components/RealScoutSearch";
const FeaturedListings = lazy(() => import("@/components/FeaturedListings"));
import communityBartonCreek from "@/assets/community-barton-creek.jpg";
import communityWestlake from "@/assets/community-westlake-hills.avif";
import communityLakeAustin from "@/assets/community-lake-austin.jpg";
import communityRollingwood from "@/assets/community-rollingwood.jpg";

const neighborhoods = [
{ name: "Westlake Hills", slug: "/communities/westlake-hills", image: communityWestlake, desc: "Hilltop estates with panoramic Hill Country views and Eanes ISD schools." },
{ name: "Barton Creek", slug: "/communities/barton-creek", image: communityBartonCreek, desc: "Gated golf community with championship courses and estate-sized lots." },
{ name: "Lake Austin", slug: "/communities/lake-austin", image: communityLakeAustin, desc: "Waterfront estates with private docks and resort-style living." },
{ name: "Rollingwood", slug: "/communities/rollingwood", image: communityRollingwood, desc: "Intimate enclave between Zilker Park and Westlake Hills." }];


const LuxuryHomesAustin = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Luxury Homes for Sale in Austin TX"
        description="Explore luxury homes for sale in Austin, TX including Westlake, Barton Creek, Tarrytown, Rollingwood, and Lake Austin waterfront estates. Browse Austin luxury real estate listings above $1.5M." />
      
      <SchemaMarkup schema={realEstateAgentSchema} />
      <Navigation />

      {/* Hero */}
      <section className="pt-48 pb-6">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p
              className="text-gold mb-5 font-bold text-xs"
              style={{ fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>
              PRIVATE + CURATED OPPORTUNITIES
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-6">
              Curated Austin Opportunities
            </h1>
            <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl font-light">
              Not all opportunities are created equal. Each month, we curate a small selection of homes, development sites, and investment properties based on pricing, location, and long-term upside. This is not a feed — it's a filter.
            </p>
          </div>
        </div>
      </section>

      <FeaturedLuxuryListings />

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <FeaturedListings hideRealScout />
      </Suspense>

      <RealScoutSearch />


      <article className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-20">

            {/* Intro / Market Overview */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Austin Luxury Real Estate Market
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Austin, Texas has cemented its position as one of the nation's most sought-after luxury real estate
                markets. Driven by a booming technology economy — home to Apple, Google, Tesla, Meta, and Oracle
                campuses — paired with Texas's no-state-income-tax advantage, the city attracts high-net-worth buyers
                from coast to coast. The luxury segment, generally defined as properties priced above $1.5 million,
                spans waterfront estates on <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>,
                architecturally significant hilltop mansions in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>,
                and gated golf-community homes in <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neighborhoods like <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link> and{" "}
                <Link to="/communities/rollingwood" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link> offer
                walkable, tree-canopied streets with proximity to Lady Bird Lake, Zilker Park, and top-rated Eanes ISD
                schools. Meanwhile, downtown Austin's luxury condominium market delivers panoramic skyline views,
                concierge services, and immediate access to the city's renowned dining, live-music, and cultural scene.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Compared to San Francisco, Los Angeles, and New York, Austin consistently delivers more square footage,
                better amenities, and a lower overall cost of living — without sacrificing career opportunity or cultural
                richness. Supply-constrained neighborhoods like Lake Austin waterfront and Westlake Hills have
                demonstrated 7–12% average annual appreciation over the past decade, making Austin luxury real estate
                both a lifestyle upgrade and a sound long-term investment.
              </p>
            </section>

            {/* Luxury Neighborhoods */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-10">
                Best Luxury Neighborhoods in Austin
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {neighborhoods.map((n) =>
                <Link key={n.slug} to={n.slug} className="group block">
                    <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                      <img
                      src={n.image}
                      alt={`${n.name} homes for sale in Austin Texas`}
                      title={`${n.name} — Austin luxury neighborhood`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy" decoding="async" />
                    
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-display font-normal text-white mb-1">{n.name}</h3>
                        <p className="text-white/70 text-sm font-light">{n.desc}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </section>

            {/* Buyer CTA */}
            <section className="text-center py-16 bg-secondary -mx-6 px-6 rounded-sm">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Work With an Austin Luxury Realtor
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you're relocating to Austin, upgrading to a waterfront estate, or investing in
                luxury real estate, Echelon Property Group provides the local expertise, off-market access,
                and strategic guidance you need to make a confident decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/connect"
                  className="inline-block bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>
                  
                  SCHEDULE A CONSULTATION
                </Link>
                <Link
                  to="/off-market-real-estate-austin"
                  className="inline-block border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 transition-colors duration-300"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: '"Jost", sans-serif' }}>
                  
                  VIEW OFF-MARKET HOMES
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <AboutBlock />
      <Footer />
    </div>);

};

export default LuxuryHomesAustin;