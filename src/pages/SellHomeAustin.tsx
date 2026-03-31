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
  { question: "How do I know what my Austin home is worth?", answer: "A professional comparative market analysis (CMA) is the most accurate way to determine your home's value. Echelon Property Group provides complimentary, confidential valuations that combine MLS data, off-market comps, and neighborhood-specific expertise. Request your free valuation at our home value page." },
  { question: "How long does it take to sell a luxury home in Austin?", answer: "Average days on market for well-priced luxury homes in Austin ranges from 30–90 days, depending on neighborhood, price point, and condition. Homes in Westlake Hills, Barton Creek, and Tarrytown that are move-in ready and strategically priced often sell faster. Off-market sales can close even more quickly." },
  { question: "Should I sell my Austin home off-market?", answer: "Off-market sales offer privacy, discretion, and the ability to test pricing without public days-on-market accumulation. They're ideal for high-profile sellers or unique luxury properties. However, public marketing maximizes exposure. We help sellers evaluate which approach best serves their goals." },
  { question: "What does it cost to sell a home in Austin?", answer: "Typical seller costs include agent commissions, title insurance, property taxes prorated to closing, and any repairs or staging. In Texas, sellers also provide a survey and pay for an owner's title policy. Echelon Property Group provides a detailed net proceeds analysis during your listing consultation." },
  { question: "How should I prepare my Austin home for sale?", answer: "Key preparation steps include professional staging, decluttering, addressing deferred maintenance, fresh paint in neutral colors, and landscaping improvements. For luxury homes, professional photography, cinematic video, drone footage, and a custom property website are essential to attracting qualified buyers." },
];

const SellHomeAustin = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sell a Home in Austin Texas | Echelon Property Group"
        description="Sell your Austin home for top dollar with Echelon Property Group. Strategic marketing, expert negotiation, and luxury presentation from Taylor Sherwood."
        canonical="/sell-home-austin"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Sell Your Home in Austin", url: "https://www.echelonpropertygroup.com/sell-home-austin" },
      ])} />
      <Navigation />

      <div className="h-24" />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
             <p className="text-minimal text-gold mb-4">{"\n\n\n\n\n\nSELLER SERVICES"}</p>
            <h1 className="text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Sell Your Home in Austin Texas
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Maximize your home's value with strategic marketing, expert negotiation, and luxury-caliber 
              property presentation. Taylor Sherwood and Echelon Property Group deliver results for 
              Austin's most discerning sellers.
            </p>
          </div>
        </div>
      </section>

      <article className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Sellers Choose Echelon Property Group
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Selling a luxury home in Austin requires more than listing it on the MLS. It requires a comprehensive marketing strategy, precise pricing, and an agent with the network and negotiation skills to attract qualified buyers and close at the highest possible price.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Echelon Property Group delivers a bespoke marketing approach for every listing. From professional HDR photography and cinematic video to targeted digital campaigns and global syndication through the eXp Luxury Division, your property receives maximum exposure to the right audience — locally and worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our sellers consistently achieve above-market results because we combine institutional-grade marketing with hyper-local expertise in neighborhoods like <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-gold transition-colors">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-gold transition-colors">Barton Creek</Link>, <Link to="/communities/lake-austin" className="text-foreground underline hover:text-gold transition-colors">Lake Austin</Link>, and <Link to="/communities/tarrytown" className="text-foreground underline hover:text-gold transition-colors">Tarrytown</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                What Is My Austin Home Worth?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Understanding your home's current market value is the first step in a successful sale. Our complimentary <Link to="/home-value-austin" className="text-foreground underline hover:text-gold transition-colors">home valuation</Link> combines automated data with hands-on local expertise, recent comparable sales, and neighborhood-specific insights that algorithm-only tools consistently miss.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For luxury properties where each home is unique and comparables are limited, this human-guided approach produces significantly more accurate valuations. Request your free, confidential home valuation today.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                How We Market Your Austin Home
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every Echelon listing receives a custom marketing campaign designed to attract qualified buyers:
              </p>
              <div className="space-y-3">
                {[
                  "Professional HDR photography and cinematic video production",
                  "Drone and aerial footage for estates, acreage, and waterfront",
                  "3-D Matterport virtual tours",
                  "Custom property website and branded marketing materials",
                  "Targeted social media and Google ad campaigns",
                  "Private broker previews and luxury open houses",
                  "Syndication to 500+ listing platforms worldwide",
                  "eXp Luxury Division and global referral network",
                  "Email campaigns to curated buyer database",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Should I Sell My Home Off-Market?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-gold transition-colors">Off-market sales</Link> are increasingly common in Austin's luxury segment. They offer privacy, discretion, and the ability to test pricing without public exposure. For high-profile sellers, properties with sensitive security concerns, or homeowners who simply prefer a quiet sale, off-market can be the ideal approach.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Echelon Property Group maintains an extensive network of qualified luxury buyers and fellow agents who actively seek off-market opportunities. We help sellers evaluate whether an off-market, public, or hybrid strategy best serves their goals.
              </p>
            </section>

            <section className="border border-border p-8">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LUXURY REAL ESTATE</Link>
                <Link to="/buy-homes-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUY A HOME</Link>
                <Link to="/home-value-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ FREE HOME VALUATION</Link>
                <Link to="/austin-luxury-market-report" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MARKET REPORT</Link>
                <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ALL COMMUNITIES</Link>
                <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CONTACT US</Link>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions About Selling in Austin
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
                Ready to Sell Your Austin Home?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact Taylor Sherwood for a confidential listing consultation and complimentary home valuation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
                  SCHEDULE A CONSULTATION
                </Link>
                <Link to="/home-value-austin" className="inline-block text-minimal border border-foreground/30 text-foreground hover:bg-foreground/5 px-10 py-4 transition-colors duration-300">
                  GET YOUR HOME VALUE
                </Link>
              </div>
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

export default SellHomeAustin;
