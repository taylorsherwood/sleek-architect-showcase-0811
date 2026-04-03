import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import expEchelonLogo from "@/assets/exp-echelon-logo.png";
import { Link } from "react-router-dom";
import SchemaMarkup, { taylorSherwoodSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import SEOHead from "@/components/SEOHead";

const InstagramGallery = lazy(() => import("@/components/InstagramGallery"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Footer = lazy(() => import("@/components/Footer"));

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Us | Echelon Property Group"
        description="Explore About Us with Echelon Property Group. View homes, market insights, and real estate opportunities in Austin, Texas."
      />
      
      <SchemaMarkup schema={taylorSherwoodSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "About", url: "https://www.echelonpropertygroup.com/about" }
      ])} />
      <SchemaMarkup schema={createFAQSchema([
        { question: "Who is Taylor Sherwood?", answer: "Taylor Sherwood is a Certified Luxury Home Marketing Specialist and founder of Echelon Property Group, specializing in luxury residential, commercial, land, and investment real estate across Austin and the Texas Hill Country." },
        { question: "What areas does Echelon Property Group serve?", answer: "Echelon Property Group serves Austin's premier neighborhoods including Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, Dripping Springs, and the greater Texas Hill Country." },
        { question: "What services does Echelon Property Group offer?", answer: "We offer luxury buyer representation, strategic listing and seller advisory, off-market property sourcing, commercial tenant representation, investment property acquisitions, and land brokerage." },
        { question: "Does Taylor Sherwood work with out-of-state clients?", answer: "Yes. A significant portion of our clients relocate to Austin from across the country. We provide virtual tours, comprehensive neighborhood analysis, and full-service transaction management for remote buyers and investors." },
      ])} />
      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">ABOUT US</p>
            <h1 className="text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Austin Luxury Real Estate,
              <br />
              <span className="italic">Elevated</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Echelon Property Group was founded with a singular vision: to redefine luxury real estate advisory in Austin, Texas. We are not simply agents — we are strategic partners who guide buyers, sellers, and investors through the most consequential financial decisions of their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Our Approach to Austin Real Estate
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Discretion, strategy, and access define every engagement at Echelon Property Group. In a market where the most compelling opportunities rarely appear on public listing portals, our clients benefit from deep relationships with Austin's top agents, developers, and property owners. We identify and secure properties before they reach the open market — and we position our sellers to attract qualified, motivated buyers with precision and confidentiality.
              </p>
              <p>
                Our advisory practice extends well beyond transaction coordination. We provide institutional-grade market analysis, strategic pricing counsel, and negotiation expertise honed across hundreds of residential, commercial, and land transactions. Whether you are acquiring a primary residence, diversifying into investment property, or preparing a luxury estate for sale, our approach is built around your specific objectives and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image + Bio */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="relative inline-block">
              <img
                alt="Taylor Sherwood, founder of Echelon Property Group and Austin luxury real estate advisor"
                title="Taylor Sherwood — Echelon Property Group founder and Austin real estate advisor"
                className="w-full md:w-[90%] h-[45vh] md:h-[55vh] object-contain object-top mx-auto"
                src="/lovable-uploads/9265260a-6432-4ccb-ad05-c43da28ecfc3.jpg"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 50vw"
                width={600}
                height={800}
              />
              
              <div className="mt-6 max-w-[320px] mx-auto rounded-sm overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
                <img src={expEchelonLogo} alt="eXp Realty and Echelon Property Group logo" className="w-full mix-blend-multiply" loading="lazy" decoding="async" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">Meet Taylor Sherwood</h2>
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/60 mb-4">CLHMS</p>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{"Taylor Sherwood is a top-performing Austin real estate advisor specializing in commercial, luxury, and land development opportunities. With a background in economics and a reputation for precision deal-making, Taylor helps investors, developers, and high-net-worth clients identify, structure, and execute winning real estate strategies across Central Texas.\n\nKnown for his sharp market insight and hands-on approach, Taylor advises on everything from off-market commercial acquisitions and land assemblages to luxury residential and development projects. His experience spans investment underwriting, land development strategy, value-add positioning, and high-end residential sales — giving clients a full-spectrum advantage.\n\nTaylor's clients value his ability to cut through noise, uncover hidden opportunities, and negotiate aggressively on their behalf. Whether it's sourcing development sites, positioning a luxury asset for maximum exposure, or structuring complex commercial transactions, Taylor brings clarity, confidence, and results.\n\nWhen he's not closing deals, Taylor stays deeply engaged in Austin's growth and development landscape — because in this city, tomorrow's best opportunities are being built today."}</p>

              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="text-minimal text-muted-foreground/50 mb-3">PROFESSIONAL DESIGNATIONS</h4>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground/70">Certified Luxury Home Marketing Specialist (CLHMS)</p>
                  <p className="text-sm text-muted-foreground/70">Member, eXp Luxury Division</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/contact"
                  className="gold-metallic-text gold-underline-hover inline-block px-10 py-2.5 text-[0.65rem] tracking-[0.22em] uppercase"
                >
                  Schedule a Private Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise in Austin's Premier Neighborhoods */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Expertise in Austin's Premier Neighborhoods
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin's luxury landscape is defined by its neighborhoods — each with distinct character, market dynamics, and lifestyle appeal. Echelon Property Group maintains deep expertise across the communities where discerning buyers and investors focus their attention: Barton Creek, Westlake Hills, Lake Austin, Tarrytown, Rollingwood, Spanish Oaks, Zilker, Cat Mountain, and the broader Texas Hill Country.
              </p>
              <p>
                This hyperlocal knowledge allows us to advise with precision — whether you are evaluating a waterfront estate on Lake Austin, comparing school districts in Westlake, or assessing land value in Dripping Springs. We understand the micro-trends, development pipelines, and buyer profiles that shape pricing in each community, and we use that intelligence to position our clients for success.
              </p>
              <p>
                Ready to find your place in one of Austin's most coveted neighborhoods? <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Explore available homes</Link> or <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">connect with our team</Link> to discuss your search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tailored Client Experience */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Tailored Client Experience
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Every client engagement at Echelon Property Group begins with listening. We take time to understand your goals, financial parameters, and timeline before recommending a course of action. This consultative approach ensures that every property we present, every marketing strategy we design, and every negotiation we lead is aligned with your specific priorities.
              </p>
              <p>
                For <strong>buyers</strong>, we provide curated property tours, off-market sourcing, and rigorous due diligence — from comparative market analysis to inspection coordination. For <strong>sellers</strong>, we deliver premium marketing campaigns featuring professional photography, cinematic video, targeted digital advertising, and strategic pricing that maximizes return. Considering <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">selling your home</Link>? Our team provides a complimentary market evaluation to help you understand your position.
              </p>
              <p>
                For <strong>investors</strong>, we offer deal sourcing, underwriting support, and portfolio strategy across residential, commercial, multifamily, and land asset classes. Our background in economics and investment analysis ensures that every recommendation is grounded in financial fundamentals — not speculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Relationships */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Results and Relationships
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We measure success not by the number of transactions we close, but by the strength of the relationships we build. Many of our clients return for multiple transactions — purchasing investment properties, upgrading primary residences, or referring family and colleagues. That continuity reflects a level of trust and satisfaction that only comes from consistently delivering exceptional outcomes.
              </p>
              <p>
                As a member of the eXp Luxury Division, Echelon Property Group connects clients to a global network of agents and affluent buyers, expanding the reach of every listing and search beyond Austin's borders. Whether your next real estate move involves a $1.5 million Tarrytown bungalow or a $15 million Lake Austin estate, we bring the same level of strategic thinking and personal commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">OUR PHILOSOPHY</p>
              <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
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
                <h3 className="text-xl font-display font-medium mb-3"><Link to="/sell" className="hover:text-[hsl(var(--gold))] transition-colors duration-500">Premium Marketing</Link></h3>
                <p className="text-muted-foreground">
                  Professional photography, cinematic video, custom property websites, and targeted 
                  social campaigns designed to reach qualified buyers worldwide.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3"><Link to="/off-market-real-estate-austin" className="hover:text-[hsl(var(--gold))] transition-colors duration-500">Strategic Pricing</Link></h3>
                <p className="text-muted-foreground">
                  Data-driven market analysis combined with decades of experience to position your 
                  property for maximum return.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3"><Link to="/austin-luxury-homes-for-sale" className="hover:text-[hsl(var(--gold))] transition-colors duration-500">White-Glove Service</Link></h3>
                <p className="text-muted-foreground">
                  From staging consultation to closing day, every detail is managed with precision 
                  and personal attention.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-8">
                <h3 className="text-xl font-display font-medium mb-3"><Link to="/communities" className="hover:text-[hsl(var(--gold))] transition-colors duration-500">Local Expertise</Link></h3>
                <p className="text-muted-foreground">
                  Deep roots in Austin's most prestigious neighborhoods. We don't just sell homes 
                  here—we live here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <div className="py-6 bg-background" />
      <Suspense fallback={<div className="min-h-[200px]" />}><InstagramGallery /></Suspense>
      <div className="py-6 bg-background" />

      <Suspense fallback={<div className="min-h-[200px]" />}><Testimonials /></Suspense>

      {/* CTA */}
      <section className="py-24 bg-secondary text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Whether you're selling a luxury estate or searching for your dream home, 
            we'd love to hear from you.
          </p>
          <Link to="/contact" className="inline-block text-minimal border border-foreground/30 bg-transparent text-foreground hover:bg-gold hover:border-gold hover:text-white px-10 py-4 transition-all duration-500 backdrop-blur-sm">
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* ── Explore More ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-6">Explore More</p>
            <p className="text-muted-foreground leading-[2] text-[15px]">
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">Explore available homes</Link> across Austin's most coveted neighborhoods, <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">read our latest market insights</Link> for data-driven guidance, or <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">connect with our team</Link> to begin a private conversation about your goals.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);};
export default About;
