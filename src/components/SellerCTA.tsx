import { Link } from "react-router-dom";

const SellerCTA = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4">FOR HOMEOWNERS</p>
              <h2 className="text-3xl md:text-5xl font-display font-light text-architectural mb-6">
                Curious What Your Austin Home Is Worth?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Receive a confidential property valuation and expert market insights for your home 
                from a local Austin real estate advisor specializing in luxury properties.
              </p>
              <Link
                to="/home-value-austin"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300"
              >
                GET YOUR FREE HOME VALUATION
              </Link>
            </div>
            <div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Data-Driven Pricing Strategies</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Leverage comprehensive market data and comparable sales analysis to price your home for maximum return.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Luxury Marketing Exposure</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Professional photography, targeted digital campaigns, and premium placement across luxury platforms.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Access to Qualified Buyers</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Connect with vetted, high-net-worth buyers actively searching for Austin luxury properties.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Off-Market &amp; Private Sale Opportunities</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Discreet sales through our private network for sellers who value confidentiality.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;