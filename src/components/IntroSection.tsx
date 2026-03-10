import { Link } from "react-router-dom";

const IntroSection = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4">THE ECHELON DIFFERENCE</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
                Unmatched Expertise in Austin Luxury Real Estate
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Echelon Property Group is a boutique brokerage built on the belief that selling a luxury 
                  home demands more than a listing—it demands exceptional marketing, strategic positioning, 
                  and white-glove service from start to close.
                </p>
                <p>
                  With deep roots in Austin's most prestigious communities—Barton Creek, Westlake Hills, 
                  Lake Austin, Rollingwood, and the Texas Hill Country—we bring unparalleled local knowledge 
                  and a curated approach to every transaction.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
              >
                LEARN MORE ABOUT US
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">$500M+</p>
                <p className="text-minimal text-muted-foreground">IN SALES VOLUME</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">15+</p>
                <p className="text-minimal text-muted-foreground">YEARS EXPERIENCE</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">98%</p>
                <p className="text-minimal text-muted-foreground">CLIENT SATISFACTION</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">Top 1%</p>
                <p className="text-minimal text-muted-foreground">AUSTIN REALTORS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
