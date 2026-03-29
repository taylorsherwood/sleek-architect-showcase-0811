import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import clhmsBadge from "@/assets/clhms-badge.png";
import aboutTeam from "@/assets/about-team.jpg";
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
        title="Taylor Sherwood, Austin Realtor | Echelon Property Group"
        description="Meet Taylor Sherwood, CLHMS and founder of Echelon Property Group. Expert advisory for luxury homes, land, commercial, and investment property in Austin TX." />
      
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
                alt="Taylor Sherwood, founder of Echelon Property Group and Austin luxury real estate advisor"
                title="Taylor Sherwood — Echelon Property Group founder and Austin real estate advisor"
                className="w-full h-[50vh] md:h-[60vh] object-contain"
                src="/lovable-uploads/9265260a-6432-4ccb-ad05-c43da28ecfc3.jpg"
                loading="eager"
                decoding="async"
                fetchPriority="high" />
              <img src={clhmsBadge} alt="Certified Luxury Home Marketing Specialist guild member badge" title="Certified Luxury Home Marketing Specialist designation" className="absolute bottom-3 right-3 w-20 h-20 opacity-85" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-2">Meet Taylor Sherwood</h2>
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

      {/* Services Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
              Full-Spectrum Real Estate Advisory
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Echelon Property Group provides comprehensive real estate services across residential, commercial, land, and investment sectors. Unlike single-focus agents, our breadth of experience allows us to advise clients holistically — whether they're purchasing a primary residence, diversifying into commercial property, or assembling land for development.
              </p>
              <p>
                Our residential practice covers luxury homes in Austin's most coveted neighborhoods including Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, and Spanish Oaks. We represent both buyers and sellers, bringing strategic pricing, premium marketing, and disciplined negotiation to every transaction.
              </p>
              <p>
                On the commercial and investment side, we advise on multifamily acquisitions, retail and office tenant representation, development land sourcing, and portfolio strategy. Our background in economics and investment analysis gives clients an institutional-grade perspective that most residential-only agents cannot provide.
              </p>
              <p>
                Land brokerage is a core competency, encompassing residential lots, ranch properties, Hill Country acreage, and entitled development parcels throughout the Austin MSA. We guide clients through zoning analysis, highest-and-best-use evaluation, and acquisition negotiation for properties ranging from single homesites to large-scale development tracts.
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
              <p className="text-minimal text-gold mb-4 font-extrabold">OUR PHILOSOPHY</p>
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

      {/* Instagram Feed */}
      <div className="py-6 bg-background" />
      <Suspense fallback={<div className="min-h-[200px]" />}><InstagramGallery /></Suspense>
      <div className="py-6 bg-background" />

      <Suspense fallback={<div className="min-h-[200px]" />}><Testimonials /></Suspense>

      {/* CTA */}
      <section className="py-24 bg-secondary text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
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

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-light text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYER SERVICES</Link>
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/past-transactions" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PAST TRANSACTIONS</Link>
              <Link to="/moving-to-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MOVING TO AUSTIN GUIDE</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ EXPLORE ALL COMMUNITIES</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);};
export default About;