import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RealScoutListings from "@/components/RealScoutListings";

const PastTransactions = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Past Transactions | Echelon Property Group"
        description="View recently closed luxury homes, land, and investment properties in Austin Texas by Echelon Property Group. See our track record of successful transactions." />
      
      <Navigation />
      <div className="pt-32 pb-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">OUR TRACK RECORD</p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-architectural mb-6">
              Past Transactions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              95% of our transactions are conducted off market and will not show on this site.
              <br />
              The privacy of our clients is of utmost importance to us.
            </p>
          </div>
        </div>
      </div>
      <RealScoutListings />

      {/* ── SEO Content: Transaction History & Expertise ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
              A Track Record Built on Results
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Echelon Property Group has built its reputation on consistent, measurable results for luxury home sellers, buyers, and investors across Austin and the Texas Hill Country. Our transaction history spans a wide range of property types — from multimillion-dollar estates in Barton Creek and Westlake Hills to waterfront homes on Lake Austin, development land in the Hill Country, and commercial investment properties throughout the Austin metro.
              </p>
              <p>
                What sets our transaction record apart is the volume of off-market and privately negotiated deals. Approximately 95% of our transactions are conducted through private channels, reflecting our clients' preference for discretion and our ability to source and close opportunities that never appear on public listing platforms.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Property Types We've Transacted
              </h3>
              <p>
                Our experience covers the full spectrum of Austin real estate. We've represented clients in the purchase and sale of luxury single-family homes, gated community estates, waterfront properties, downtown condominiums and penthouses, multifamily apartment complexes, retail and office buildings, raw and entitled development land, and ranch properties across the Texas Hill Country.
              </p>
              <p>
                This breadth of experience gives our clients a significant advantage. Whether you're evaluating a luxury home purchase, considering a 1031 exchange into commercial property, or assembling land for development, we bring relevant transaction experience and market knowledge to every engagement.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Neighborhoods Where We've Closed Deals
              </h3>
              <p>
                Our transaction history includes properties across Austin's most prestigious addresses: Barton Creek, Westlake Hills, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, Dripping Springs, Travis Heights, Downtown Austin, Cat Mountain, Northwest Hills, and the greater Texas Hill Country. This deep neighborhood-level experience means we bring hyperlocal pricing insight, buyer demand data, and negotiation context that generalist agents simply cannot match.
              </p>

              <h3 className="text-2xl font-display font-light text-architectural pt-4">
                Why Our Track Record Matters
              </h3>
              <p>
                In luxury real estate, experience translates directly to results. Our familiarity with complex deal structures, high-value negotiations, and the nuances of Austin's luxury submarkets ensures our clients receive informed, strategic representation. We understand appraisal challenges in the luxury segment, how to navigate inspection negotiations on estate properties, and how to position listings for maximum buyer engagement.
              </p>
              <p>
                Every transaction in our history represents a client who trusted us with one of the most significant financial decisions of their lives. That trust is earned through market expertise, transparent communication, and a relentless commitment to achieving the best possible outcome.
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300"
              >
                DISCUSS YOUR NEXT TRANSACTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default PastTransactions;