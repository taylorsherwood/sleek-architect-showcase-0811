import { Link } from "react-router-dom";

const IntroSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4">THE ECHELON DIFFERENCE</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
                Unmatched Expertise in Austin Luxury Real Estate
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>At Echelon Property Group we believe real estate is more than transactions—it’s about creating opportunities and building lasting relationships. With expertise across residential, commercial, and investment properties, our team provides clients with clear guidance, innovative strategies, and personalized service at every step. Whether you’re buying your first home, scaling a portfolio, or positioning a property for market, we bring the local expertise and sharp negotiation skills you need to achieve your goals.



                </p>
                <p>



                </p>
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group">
                
                LEARN MORE ABOUT US
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">$100M+</p>
                <p className="text-minimal text-muted-foreground">IN SALES VOLUME</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">11+</p>
                <p className="text-minimal text-muted-foreground">YEARS EXPERIENCE</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">200+</p>
                <p className="text-minimal text-muted-foreground">CLIENTS HELPED</p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <p className="text-4xl font-display font-light text-foreground mb-2">Top 1%</p>
                <p className="text-minimal text-muted-foreground">AUSTIN REALTORS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default IntroSection;