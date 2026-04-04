import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, realEstateAgentSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import AuthorBio from "@/components/AuthorBio";
import RelatedInsights from "@/components/RelatedInsights";

const faqs = [
  { question: "What is the best time to buy a home in Austin?", answer: "Austin's market is active year-round, but spring and fall typically offer the most balanced conditions. Winter months can present opportunities with less competition, while summer is the most competitive season. For luxury buyers, the best time is when the right property becomes available — especially off-market opportunities that don't follow seasonal patterns." },
  { question: "How much do I need for a down payment on an Austin luxury home?", answer: "Conventional financing for luxury homes typically requires 20% down. Jumbo loans for properties above conforming limits may require 20–30% down with strong reserves. Cash purchases are common in the $3M+ segment. Echelon Property Group can connect you with luxury-focused lenders experienced in high-value transactions." },
  { question: "Can I buy a home in Austin from out of state?", answer: "Absolutely. Many of our clients purchase Austin homes while living in California, New York, or other states. We provide virtual property tours, comprehensive neighborhood analysis, and full-service transaction management for remote buyers. Many transactions are completed with just one or two in-person visits." },
  { question: "How competitive is the Austin luxury home market?", answer: "Austin's luxury market varies by neighborhood and price point. Properties in supply-constrained areas like Westlake Hills, Lake Austin, and Barton Creek can be highly competitive. Working with a well-connected agent who has access to off-market inventory provides a significant advantage." },
  { question: "What should I look for when buying a luxury home in Austin?", answer: "Key considerations include school district (Eanes ISD vs. Austin ISD), proximity to downtown, lot size and topography, flood zone status, HOA restrictions, and future development in the area. An experienced Austin luxury agent can help you evaluate these factors for each property." },
];

const BuyHomesAustin = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Buy a Home in Austin Texas | Echelon Property Group"
        description="Buy a home in Austin TX with expert representation. Luxury homes, investment properties, and off-market opportunities in Austin's best neighborhoods."
        canonical="/buy-homes-austin"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Buy a Home in Austin", url: "https://www.echelonpropertygroup.com/buy-homes-austin" },
      ])} />
      <Navigation />

      <div className="h-24" />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
              <p className="text-minimal text-gold mb-4">{"\n\n\n\n\n\nBUYER SERVICES"}</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Buy a Home in Austin Texas
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert buyer representation for luxury homes, investment properties, and off-market opportunities 
              across Austin's most coveted neighborhoods. Work with Taylor Sherwood and Echelon Property Group 
              to find your perfect Austin home.
            </p>
          </div>
        </div>
      </section>

      <article className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Buy a Home in Austin?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Austin, Texas has consistently ranked among the best places to live in America — and for good reason. The city combines a booming technology economy with no state income tax, year-round outdoor recreation, a world-class cultural scene, and some of the most diverse luxury real estate options in the country.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For homebuyers, Austin offers exceptional value compared to coastal markets. Luxury homes that would command $8–15 million in the Bay Area, Los Angeles, or New York can be purchased for $3–7 million in neighborhoods like <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-gold transition-colors">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-gold transition-colors">Barton Creek</Link>, and <Link to="/communities/lake-austin" className="text-foreground underline hover:text-gold transition-colors">Lake Austin</Link>. Combined with income tax savings, the financial case for buying in Austin is compelling.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're relocating from out of state, upgrading within the Austin market, or purchasing an investment property, understanding the nuances of Austin's neighborhoods, school districts, and market dynamics is essential to making the right decision.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Where Are the Best Neighborhoods to Buy in Austin?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Austin's luxury neighborhoods each offer distinct lifestyles and investment profiles. Here's what to consider:
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/westlake-hills" className="hover:text-gold transition-colors">Westlake Hills</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for families, top schools (Eanes ISD), hilltop estates. $1.2M–$20M+</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/barton-creek" className="hover:text-gold transition-colors">Barton Creek</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for golf, gated community, resort amenities. $1.5M–$15M+</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/lake-austin" className="hover:text-gold transition-colors">Lake Austin</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for waterfront lifestyle, private docks, highest appreciation. $2M–$25M+</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/tarrytown" className="hover:text-gold transition-colors">Tarrytown</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for walkability, central location, urban lifestyle. $800K–$8M+</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/spanish-oaks" className="hover:text-gold transition-colors">Spanish Oaks</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for private golf, large estates, Hill Country setting. $1.5M–$10M+</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium mb-1"><Link to="/communities/dripping-springs" className="hover:text-gold transition-colors">Dripping Springs</Link></h3>
                  <p className="text-muted-foreground text-sm">Best for acreage, wine country, Hill Country lifestyle. $500K–$10M+</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                How Does Buying a Home in Austin Work?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Austin homebuying process follows Texas real estate law, which differs from other states. Key steps include:
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">1. Strategy & Pre-Approval</h3>
                  <p className="text-muted-foreground text-sm">We start with understanding your goals and connecting you with luxury-focused lenders for pre-approval.</p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">2. Property Search & Showings</h3>
                  <p className="text-muted-foreground text-sm">We curate properties from MLS and our <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-gold transition-colors">off-market network</Link>, scheduling private showings.</p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">3. Offer & Negotiation</h3>
                  <p className="text-muted-foreground text-sm">Data-driven pricing and aggressive negotiation to secure the best terms.</p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">4. Due Diligence</h3>
                  <p className="text-muted-foreground text-sm">Inspections, appraisal, title review, and survey managed by our team.</p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">5. Closing</h3>
                  <p className="text-muted-foreground text-sm">Final walk-through, settlement, and keys in hand.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                What Should First-Time Austin Buyers Know?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you're new to Austin, several unique market dynamics are important to understand. Texas uses the TREC (Texas Real Estate Commission) contract, which provides an option period — typically 7–14 days — during which you can terminate the contract for any reason. This protects buyers during due diligence.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Property taxes in Texas are higher than many states (approximately 1.8–2.2% of assessed value in the Austin area), but are offset by the absence of state income tax. File a homestead exemption immediately after purchasing your primary residence to cap annual assessment increases at 10%.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Many of Austin's finest properties — particularly in the <Link to="/luxury-real-estate-austin" className="text-foreground underline hover:text-gold transition-colors">luxury segment</Link> — trade off-market. Working with an agent who has deep network connections provides access to inventory that most buyers never see.
              </p>
            </section>

            {/* Internal Links */}
            <section className="border border-border p-8">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LUXURY REAL ESTATE</Link>
                <Link to="/sell-home-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELL YOUR HOME</Link>
                <Link to="/austin-real-estate-investment" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT PROPERTY</Link>
                <Link to="/land-for-sale-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND FOR SALE</Link>
                <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ALL COMMUNITIES</Link>
                <Link to="/best-luxury-neighborhoods-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ NEIGHBORHOOD GUIDE</Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions About Buying in Austin
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <AuthorBio />

            <section className="text-center py-16 bg-secondary -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Ready to Buy a Home in Austin?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact Taylor Sherwood for expert buyer representation across Austin's luxury, land, and investment markets.
              </p>
              <Link to="/contact" className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
                SCHEDULE A BUYER CONSULTATION
              </Link>
            </section>
          </div>
        </div>
      </article>

      <AboutBlock />
      <RelatedInsights />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default BuyHomesAustin;
