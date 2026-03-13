import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RealScoutListings from "@/components/RealScoutListings";

const PastTransactions = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Past Transactions | Echelon Property Group | Austin Luxury Real Estate"
        description="View recently closed luxury homes, land, and investment properties in Austin Texas by Echelon Property Group. See our track record of successful transactions." />
      
      <Navigation />
      <div className="pt-32 pb-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">OUR TRACK RECORD</p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-architectural mb-6">
              Past Transactions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">95% of our transactions are conducted off market and will not show on this site.  
The privacy is of utmost importance to us.
            </p>
          </div>
        </div>
      </div>
      <RealScoutListings />
      <Footer />
    </div>);

};

export default PastTransactions;