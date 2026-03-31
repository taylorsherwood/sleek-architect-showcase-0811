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
              <Link to="/" className="text-foreground hover:text-muted-foreground transition-colors duration-300">Echelon Property Group</Link> is an Austin Texas real estate team specializing in luxury homes, land development opportunities, and residential real estate throughout Austin's most desirable neighborhoods.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              The firm is led by Taylor Sherwood, a real estate professional focused on helping buyers, sellers, and investors navigate Austin's competitive housing market.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Echelon Property Group is proudly brokered by eXp Realty, one of the world's fastest-growing real estate brokerages. eXp's global network, advanced technology platform, and nationwide agent collaboration provide clients with access to broader market intelligence, stronger marketing exposure, and a wider pool of qualified buyers.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              For sellers, this means expanded visibility and reach across a powerful national agent network. For buyers and investors, it provides deeper market insights and access to opportunities that may not yet be widely available.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Service areas include Westlake Hills, Tarrytown, Spanish Oaks, Northwest Hills, Barton Creek, and surrounding Austin communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
