import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import ExpertiseSection from "@/components/ExpertiseSection";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, localBusinessSchema, taylorSherwoodSchema, organizationSchema, websiteSchema } from "@/components/SchemaMarkup";

// Lazy-load below-fold sections to reduce initial JS bundle
const RealScoutSearch = lazy(() => import("@/components/RealScoutSearch"));
const CommunitiesPreview = lazy(() => import("@/components/CommunitiesPreview"));
const CommercialCTA = lazy(() => import("@/components/CommercialCTA"));
const FeaturedListings = lazy(() => import("@/components/FeaturedListings"));
const IntroSection = lazy(() => import("@/components/IntroSection"));
const MeetTaylor = lazy(() => import("@/components/MeetTaylor"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const SellerCTA = lazy(() => import("@/components/SellerCTA"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const logoImports = () =>
  Promise.all([
    import("@/assets/exp-commercial-logo.png"),
    import("@/assets/exp-realty-logo.png"),
    import("@/assets/exp-realty-luxury-logo.png"),
  ]);

const NewsletterSection = lazy(async () => {
  const [commercialMod, realtyMod, luxuryMod] = await logoImports();
  const commercialLogo = commercialMod.default;
  const realtyLogo = realtyMod.default;
  const luxuryLogo = luxuryMod.default;
  return {
    default: () => (
      <section className="pt-16 pb-4 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Stay Informed
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
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
            <div className="mt-6 flex items-center justify-center gap-10 md:gap-14">
              <img src={commercialLogo} alt="eXp Commercial" title="eXp Commercial — Echelon Property Group" className="h-[13rem] md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
              <img src={luxuryLogo} alt="eXp Realty Luxury" title="eXp Realty Luxury — Echelon Property Group" className="h-[13rem] md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
              <img src={realtyLogo} alt="eXp Realty" title="eXp Realty — Echelon Property Group brokerage" className="h-[13rem] md:h-60 w-auto object-contain" loading="lazy" decoding="async" />
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
      <Navigation />
      <Hero />

      <Suspense fallback={<div className="min-h-[200px] bg-primary" />}>
        <RealScoutSearch />
      </Suspense>

      <CredibilityStrip />
      <ExpertiseSection />

      <Suspense fallback={<BelowFold />}>
        <IntroSection />
        <CommunitiesPreview />
        <CommercialCTA />
        <div className="py-2 bg-background" />
        <FeaturedListings />
        <Testimonials />
        <SellerCTA />
        <MeetTaylor />
        <CTASection />
        <NewsletterSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
