import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";

const communityFaqs = [
  { question: "What are the best luxury neighborhoods in Austin Texas?", answer: "Austin's premier luxury neighborhoods include West lake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, and Dripping Springs. Each offers distinct lifestyle benefits, school districts, and price ranges." },
  { question: "What is the average home price in Austin's luxury communities?", answer: "Prices vary by neighborhood. West lake Hills ranges from $1.2M to $20M+, Barton Creek from $1.5M to $15M+, and Lake Austin waterfront from $2M to $25M+. Entry-level luxury starts around $800K in neighborhoods like Tarrytown." },
  { question: "Which Austin neighborhood has the best schools?", answer: "West lake Hills, Barton Creek, and Rollingwood are served by the Eanes Independent School District, consistently ranked among the top districts in Texas." },
  { question: "Are there waterfront homes in Austin?", answer: "Yes. Lake Austin and Lake Travis offer waterfront estates with private docks, panoramic water views, and a resort-like lifestyle just minutes from downtown Austin." },
  { question: "Barton Creek vs West lake Hills — which is better?", answer: "Both are premier Austin neighborhoods. Barton Creek offers gated country club living with championship golf and resort amenities, ideal for families and golf enthusiasts. West lake Hills provides sweeping Hill Country views, a wider price range, and more diverse architectural styles. Both share access to the top-rated Eanes ISD school district." },
  { question: "What is the most expensive neighborhood in Austin?", answer: "Lake Austin waterfront is Austin's most expensive submarket, with estates regularly exceeding $10 million. West lake Hills and Barton Creek also feature ultra-luxury homes above $15 million. These neighborhoods offer limited inventory and the strongest long-term appreciation in the Austin market." },
];
import { Link } from "react-router-dom";
import { communityPages } from "@/data/communityData";


const Communities = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Luxury Living & Communities | Echelon Property Group"
        description="Homes for sale in Austin's top neighborhoods — Westlake, Barton Creek, Lake Austin, Tarrytown, Rollingwood, and Dripping Springs."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Communities", url: "https://www.echelonpropertygroup.com/communities" }
      ])} />
      <SchemaMarkup schema={createFAQSchema(communityFaqs)} />
      <Navigation />
      <div className="h-12 md:h-20" />

      {/* ── Editorial Hero ── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, hsl(var(--secondary) / 0.55) 0%, hsl(var(--background) / 0) 60%)",
          }}
        />
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto pt-16 sm:pt-24 pb-14 sm:pb-20 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
              <span className="h-px w-8 sm:w-12 bg-gold/70" />
              <p className="text-minimal text-gold font-extrabold tracking-[0.25em]">LUXURY LIVING</p>
              <span className="h-px w-8 sm:w-12 bg-gold/70" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-normal text-architectural leading-[1.05] mb-5 sm:mb-7">
              Austin's Finest <br className="hidden sm:block" />
              Neighborhoods
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated guide to the communities that define how Austin actually lives —
              told by the advisors who work them every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Curated Neighborhood Grid ── */}
      <section className="pb-24 sm:pb-32">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 sm:mb-16">
              <div>
                <p className="text-minimal text-gold mb-2 sm:mb-3 tracking-[0.25em]">THE COLLECTION</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
                  Neighborhoods, considered.
                </h2>
              </div>
              <div className="hidden sm:block h-px flex-1 bg-border ml-10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
              {[...communityPages].sort((a, b) => a.name.localeCompare(b.name)).map((community, idx) => {
                const img = community.image;
                // Two intentional aspect ratios — quiet editorial rhythm
                const aspect = idx % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]";
                // Very subtle vertical offset on middle column only (desktop)
                const offset = idx % 3 === 1 ? "lg:translate-y-8" : "";
                return (
                  <Link
                    key={community.slug}
                    to={`/communities/${community.slug}`}
                    className={`group block ${offset}`}
                  >
                    <div className="relative overflow-hidden bg-secondary">
                      {img ? (
                        <img
                          src={img}
                          alt={`Luxury homes for sale in ${community.name}, Austin Texas`}
                          title={`${community.name} homes for sale — Austin luxury real estate`}
                          className={`w-full ${aspect} object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]`}
                          loading="lazy" decoding="async"
                        />
                      ) : (
                        <div className={`w-full ${aspect} bg-secondary flex items-center justify-center`}>
                          <span className="text-muted-foreground text-sm">{community.name}</span>
                        </div>
                      )}
                      {/* Soft lower-third gradient for legibility */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                        style={{
                          background:
                            "linear-gradient(to top, hsl(var(--foreground) / 0.45) 0%, hsl(var(--foreground) / 0) 100%)",
                        }}
                      />
                    </div>
                    {/* Editorial caption block — anchored below image, not floating */}
                    <div className="pt-5 sm:pt-6">
                      <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: "#b9a06c" }}>
                        {community.priceRange}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural leading-tight mb-3">
                        {community.name}
                      </h3>
                      <span className="relative inline-block text-minimal text-muted-foreground tracking-[0.2em]">
                        EXPLORE
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison + Editorial Copy ── */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-6 sm:mb-8">
              Comparing Austin's <br /> Top Neighborhoods
            </h2>
            <div className="space-y-8 mb-12 sm:mb-16">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural mb-3">
                  Barton Creek vs West lake Hills
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Both neighborhoods share access to the top-rated Eanes ISD school district and offer homes in the $1.5M–$15M+ range. Barton Creek is ideal for buyers who want gated community security, country club amenities, and championship golf. West lake Hills suits buyers seeking larger lots, Hill Country views, and more architectural variety. Both communities deliver strong long-term appreciation.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural mb-3">
                  Lake Austin vs Lake Travis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lake Austin is a constant-level lake closer to downtown, offering the highest property values and the most exclusive waterfront lifestyle. Lake Travis is a larger, recreational lake with more diverse price points and newer lakefront developments. Both provide private docks, stunning water views, and resort-caliber living.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural mb-3">
                  Tarrytown vs Travis Heights for Urban Buyers
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tarrytown offers old Austin charm with tree-lined streets, walkability to downtown, and homes from $800K to $8M+. Travis Heights appeals to buyers seeking South Congress proximity, downtown skyline views, and a more eclectic architectural character. Both are among Austin's most walkable luxury neighborhoods.
                </p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-6 sm:mb-8">
              LUXURY LIVING
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin, Texas is home to some of the most desirable luxury communities in the American Southwest. From the gated estates of <Link to="/barton-creek-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link> and <Link to="/communities/spanish-oaks" className="text-foreground underline hover:text-muted-foreground">Spanish Oaks</Link> to the <Link to="/lake-austin-waterfront-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">waterfront properties along Lake Austin</Link> and <Link to="/lake-travis-waterfront-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Lake Travis</Link>, the city offers a remarkable diversity of high-end living environments — each with its own distinct character, amenities, and lifestyle appeal.
              </p>
              <p>
                What makes Austin's luxury neighborhoods exceptional is the rare combination of natural beauty, urban convenience, and economic opportunity. Residents enjoy access to world-class dining, live music, outdoor recreation, and a thriving technology economy — all within a state that levies no personal income tax. Discover <Link to="/why-billionaires-are-moving-to-austin" className="text-foreground underline hover:text-muted-foreground">why billionaires are choosing Austin</Link>.
              </p>

              <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural pt-4">
                Why Live in Austin's Luxury Communities
              </h3>
              <p>
                Each of Austin's premier neighborhoods offers something unique. <Link to="/westlake-hills-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">West lake Hills</Link> is renowned for the top-rated Eanes Independent School District and sweeping Hill Country views. Barton Creek provides gated country club living with championship golf and resort-caliber amenities. Lake Austin waterfront estates offer private docks and serene water views just minutes from downtown. <Link to="/tarrytown-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link> delivers old Austin charm with walkability and mature tree canopies, while <Link to="/rollingwood-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link> offers a small-town feel with big-city proximity.
              </p>
              <p>
                For those seeking more space, the Texas Hill Country and <Link to="/dripping-springs-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Dripping Springs</Link> provide sprawling ranch estates, vineyard properties, and acreage surrounded by rolling terrain and live oaks. Downtown Austin and Travis Heights cater to buyers who prefer urban energy, walkable streetscapes, and proximity to the city's cultural core. Those <Link to="/moving-to-austin-texas" className="text-foreground underline hover:text-muted-foreground">relocating to Austin from out of state</Link> will find a diverse range of lifestyle options.
              </p>

              <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural pt-4">
                Market Insights Across Austin Neighborhoods
              </h3>
              <p>
                Austin's luxury real estate market varies significantly by neighborhood. Lake Austin waterfront commands the highest per-property prices, with estates regularly exceeding $10 million. Barton Creek and West lake Hills feature the largest concentration of $3 million–plus homes. Downtown Austin penthouses and high-rises appeal to buyers seeking lock-and-leave convenience with skyline views, while emerging areas like <Link to="/zilker-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Zilker</Link> and Barton Hills offer strong appreciation potential. Read our <Link to="/austin-luxury-real-estate-market-report" className="text-foreground underline hover:text-muted-foreground">Austin luxury market report</Link> for detailed pricing data.
              </p>
              <p>
                Inventory in Austin's most exclusive communities remains limited, and many of the finest properties trade <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">off-market through private channels</Link>. Working with an agent who has deep neighborhood expertise and access to off-market inventory is essential for buyers targeting these communities.
              </p>

              <h3 className="text-xl sm:text-2xl font-display font-normal text-architectural pt-4">
                Expert Guidance for Every Neighborhood
              </h3>
              <p>
                At Echelon Property Group, we don't just sell homes in these communities — we know them intimately. Taylor Sherwood provides clients with hyperlocal market knowledge, including pricing trends, school zone boundaries, HOA details, flood zone considerations, and upcoming development that could impact property values. Whether you're <Link to="/buy" className="text-foreground underline hover:text-muted-foreground">buying a luxury home in Austin</Link> or <Link to="/invest" className="text-foreground underline hover:text-muted-foreground">evaluating an investment opportunity</Link>, our community-level expertise ensures you find the right fit for your lifestyle and investment goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6 sm:mb-8">
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
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYING A HOME IN AUSTIN</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLING YOUR AUSTIN HOME</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
              <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY REAL ESTATE</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default Communities;
