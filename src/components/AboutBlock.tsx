import { Link } from "react-router-dom";

const AboutBlock = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-normal text-architectural mb-6">
            About Echelon Property Group
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm">
              <Link to="/" className="text-foreground hover:text-muted-foreground transition-colors duration-300">Echelon Property Group</Link> is a private Austin real estate advisory firm representing buyers, sellers, and investors across residential, ranch, land, redevelopment, and investment property.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              The team is led by Taylor Sherwood, an advisor focused on strategy, valuation, and discreet execution across Austin's most consequential real estate assets.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Echelon is brokered by eXp Realty, providing global agent reach, advanced technology, and a national distribution network that extends well beyond the local MLS, an advantage on both the acquisition and disposition side of any high-value transaction.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              For sellers, this means broader exposure and stronger qualified-buyer reach. For buyers and investors, it means earlier visibility into private opportunities, ranch and land inventory, and redevelopment sites that rarely surface publicly.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Coverage includes Westlake Hills, Tarrytown, Spanish Oaks, Northwest Hills, Barton Creek, Lake Austin, and surrounding Hill Country ranch and land markets.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
