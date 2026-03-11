import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import aboutTeam from "@/assets/about-team.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4">ABOUT US</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              Built on Trust,
              <br />
              Driven by <span className="italic">Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Echelon Property Group was founded with a singular vision: to redefine luxury real estate 
              marketing and service in Austin, Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Team Image */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <img
              alt="Echelon Property Group team"
              className="w-full h-[50vh] md:h-[60vh] object-contain" src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg" />
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4">Meet Taylor

              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team brings decades of combined experience in Austin's luxury real estate market. We're passionate about delivering exceptional results for every client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-minimal text-gold mb-4">OUR PHILOSOPHY</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
                Every Property Tells a Story
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We believe that selling a luxury home is about more than square footage and comparable 
                  sales. It's about understanding the lifestyle a home offers, the memories it holds, and 
                  the vision of its next chapter.
                </p>
                <p>
                  Our approach combines strategic pricing, world-class photography and videography, 
                  targeted digital marketing, and a network of qualified buyers to ensure every property 
                  receives the exposure it deserves.
                </p>
                <p>
                  With deep expertise across Barton Creek, Westlake Hills, Lake Austin, Rollingwood, 
                  and the Texas Hill Country, we bring hyper-local market knowledge that big-box 
                  brokerages simply can't match.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3">Premium Marketing</h3>
                <p className="text-muted-foreground">
                  Professional photography, cinematic video, custom property websites, and targeted 
                  social campaigns designed to reach qualified buyers worldwide.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3">Strategic Pricing</h3>
                <p className="text-muted-foreground">
                  Data-driven market analysis combined with decades of experience to position your 
                  property for maximum return.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3">White-Glove Service</h3>
                <p className="text-muted-foreground">
                  From staging consultation to closing day, every detail is managed with precision 
                  and personal attention.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Deep roots in Austin's most prestigious neighborhoods. We don't just sell homes 
                  here—we live here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Whether you're selling a luxury estate or searching for your dream home, 
            we'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
            
            GET IN TOUCH
          </Link>
        </div>
      </section>

      <Footer />
    </div>);

};

export default About;