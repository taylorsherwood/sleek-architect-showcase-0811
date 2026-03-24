import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import ExpertiseSection from "@/components/ExpertiseSection";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, localBusinessSchema, taylorSherwoodSchema, organizationSchema, websiteSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";

// Lazy-load below-fold sections to reduce initial JS bundle
const RealScoutSearch = lazy(() => import("@/components/RealScoutSearch"));
const PrivateOpportunities = lazy(() => import("@/components/PrivateOpportunities"));
const CommunitiesPreview = lazy(() => import("@/components/CommunitiesPreview"));
const CommercialCTA = lazy(() => import("@/components/CommercialCTA"));
const FeaturedListings = lazy(() => import("@/components/FeaturedListings"));
const IntroSection = lazy(() => import("@/components/IntroSection"));
const MeetTaylor = lazy(() => import("@/components/MeetTaylor"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const SellerCTA = lazy(() => import("@/components/SellerCTA"));
const CTASection = lazy(() => import("@/components/CTASection"));
const LuxurySearchLinks = lazy(() => import("@/components/LuxurySearchLinks"));
const MarketInsights = lazy(() => import("@/components/MarketInsights"));
const Footer = lazy(() => import("@/components/Footer"));

const NewsletterSection = lazy(async () => {
  return {
    default: () => (
      <section className="pt-16 pb-0 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-6xl font-light text-architectural mb-6 md:mb-8">
              Stay Informed
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12">
              Subscribe to our newsletter for the latest insights on Austin luxury real estate
            </p>
            <a
              href="https://taylorsherwood.myflodesk.com/biolink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-sm bg-[#0C0F24] text-background hover:bg-gold hover:text-primary-foreground transition-colors duration-300"
            >
              BECOME AN ECHELON INSIDER
            </a>
            <div className="mt-6 flex items-center justify-center gap-4 md:gap-14 flex-wrap">
              <img src="/static-assets/exp-commercial-logo.png" alt="eXp Commercial" title="eXp Commercial — Echelon Property Group" className="h-24 md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
              <img src="/static-assets/exp-realty-luxury-logo.png" alt="eXp Realty Luxury" title="eXp Realty Luxury — Echelon Property Group" className="h-24 md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
              <img src="/static-assets/exp-realty-logo.png" alt="eXp Realty" title="eXp Realty — Echelon Property Group brokerage" className="h-24 md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>
    ),
  };
});

const BelowFold = () => (
  <div className="min-h-[200px]" />
);

/** Noscript fallback for below-fold content so crawlers always see key text */
const NoscriptFallback = () => (
  <noscript>
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-light mb-6">Austin Luxury Real Estate Services</h2>
        <p className="mb-4">Echelon Property Group provides full-service luxury real estate advisory across Austin, Texas. We specialize in luxury homes, land development, commercial real estate, and investment properties.</p>
        <h3 className="text-2xl font-light mb-4">Our Expertise</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Luxury residential sales in Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and Rollingwood</li>
          <li>Off-market and private listing opportunities</li>
          <li>Commercial real estate and multifamily investment</li>
          <li>Land acquisition and development advisory</li>
        </ul>
        <h3 className="text-2xl font-light mb-4">Austin Luxury Communities</h3>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li><a href="/communities/barton-creek">Barton Creek</a></li>
          <li><a href="/communities/westlake-hills">Westlake Hills</a></li>
          <li><a href="/communities/lake-austin">Lake Austin</a></li>
          <li><a href="/communities/tarrytown">Tarrytown</a></li>
          <li><a href="/communities/rollingwood">Rollingwood</a></li>
          <li><a href="/communities/dripping-springs">Dripping Springs</a></li>
          <li><a href="/communities/spanish-oaks">Spanish Oaks</a></li>
        </ul>
        <h3 className="text-2xl font-light mb-4">About Taylor Sherwood</h3>
        <p className="mb-4">Taylor Sherwood is a Certified Luxury Home Marketing Specialist (CLHMS) and Austin-based real estate advisor. He founded Echelon Property Group to bring a strategic, investment-focused approach to Austin real estate.</p>
        <p className="mb-4">With over $100M in career sales volume and deep expertise across Austin's most sought-after neighborhoods, Taylor helps clients buy, sell, and invest with confidence.</p>
        <h3 className="text-2xl font-light mb-4">Contact</h3>
        <p>2105 East MLK Blvd Ste 227, Austin, Texas 78702</p>
        <p>Email: <a href="mailto:taylor@echelonpropertygroup.com">taylor@echelonpropertygroup.com</a></p>
        <p>Phone: <a href="tel:+15126613843">(512) 661-3843</a></p>
        <p className="mt-4"><a href="/contact">Schedule a Consultation →</a></p>
      </div>
    </section>
  </noscript>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Austin Luxury Real Estate | Echelon Property Group"
        description="Luxury homes, land, and investment real estate in Austin TX. Work with Taylor Sherwood of Echelon Property Group for exclusive listings and expert guidance."
        ogTitle="Austin Real Estate Experts | Echelon Property Group"
        ogDescription="Austin real estate experts helping clients buy, sell, and invest in Austin Texas property."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={taylorSherwoodSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" }
      ])} />
      <Navigation />
      <Hero />

      <Suspense fallback={<div className="min-h-[200px] bg-primary" />}>
        <RealScoutSearch />
      </Suspense>

      <CredibilityStrip />
      <ExpertiseSection />

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PrivateOpportunities />
      </Suspense>

      <NoscriptFallback />

      <Suspense fallback={<BelowFold />}>
        <IntroSection />
        <CommunitiesPreview />
        <CommercialCTA />
        <div className="py-2 bg-background" />
        <FeaturedListings />
        <SellerCTA />
        <div className="py-6 bg-background" />
        <Testimonials />
        
        <div className="py-8 bg-background" />
        <MeetTaylor />
        <div className="py-8 bg-background" />
        <CTASection />
        <MarketInsights />
        <NewsletterSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;