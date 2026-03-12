import Navigation from "@/components/Navigation";
import clhmsBadge from "@/assets/clhms-badge.png";
import Footer from "@/components/Footer";
import aboutTeam from "@/assets/about-team.jpg";
import { Link } from "react-router-dom";
import SchemaMarkup, { taylorSherwoodSchema } from "@/components/SchemaMarkup";

const About = () => {
  return (
    <div className="min-h-screen">
      <SchemaMarkup schema={taylorSherwoodSchema} />
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
            <p className="text-xl text-muted-foreground max-w-3xl">Echelon Property Group was founded with a singular vision: to redefine luxury real estate marketing and investment sales in Austin, Texas.


            </p>
          </div>
        </div>
      </section>

      {/* Team Image */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="relative inline-block">
              <img
                alt="Echelon Property Group team"
                className="w-full h-[50vh] md:h-[60vh] object-contain" src="/lovable-uploads/9265260a-6432-4ccb-ad05-c43da28ecfc3.jpg" />
              <img src={clhmsBadge} alt="CLHMS Guild Badge" className="absolute bottom-3 right-3 w-20 h-20 opacity-85" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-light text-architectural mb-2">Meet Taylor Sherwood</h3>
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/60 mb-4">CLHMS</p>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{"Taylor Sherwood is a top-performing Austin real estate advisor specializing in commercial, luxury, and land development opportunities. With a background in economics and a reputation for precision deal-making, Taylor helps investors, developers, and high-net-worth clients identify, structure, and execute winning real estate strategies across Central Texas.\n\nKnown for his sharp market insight and hands-on approach, Taylor advises on everything from off-market commercial acquisitions and land assemblages to luxury residential and development projects. His experience spans investment underwriting, land development strategy, value-add positioning, and high-end residential sales — giving clients a full-spectrum advantage.\n\nTaylor's clients value his ability to cut through noise, uncover hidden opportunities, and negotiate aggressively on their behalf. Whether it's sourcing development sites, positioning a luxury asset for maximum exposure, or structuring complex commercial transactions, Taylor brings clarity, confidence, and results.\n\nWhen he's not closing deals, Taylor stays deeply engaged in Austin's growth and development landscape — because in this city, tomorrow's best opportunities are being built today."}</p>

              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="text-minimal text-muted-foreground/50 mb-3">PROFESSIONAL DESIGNATIONS</h4>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground/70">Certified Luxury Home Marketing Specialist (CLHMS)</p>
                  <p className="text-sm text-muted-foreground/70">Member, eXp Luxury Division</p>
                  <p className="text-sm text-muted-foreground/70">
</p>
                </div>
              </div>
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
          <Link to="/contact" className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
            
            GET IN TOUCH
          </Link>
        </div>
      </section>

      <Footer />
    </div>);};
export default About;