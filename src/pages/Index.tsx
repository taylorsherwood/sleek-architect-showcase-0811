import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import ExpertiseSection from "@/components/ExpertiseSection";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, localBusinessSchema, taylorSherwoodSchema, organizationSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";
import HeroCTAStrip from "@/components/HeroCTAStrip";

// Lazy-load below-fold sections to reduce initial JS bundle
const CommunitiesPreview = lazy(() => import("@/components/CommunitiesPreview"));
const CommercialCTA = lazy(() => import("@/components/CommercialCTA"));
const FeaturedListings = lazy(() => import("@/components/FeaturedListings"));
const IntroSection = lazy(() => import("@/components/IntroSection"));
const MeetTaylor = lazy(() => import("@/components/MeetTaylor"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const SellerCTA = lazy(() => import("@/components/SellerCTA"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const expEchelonLogoImport = () => import("@/assets/exp-echelon-logo.png");

const NewsletterSection = lazy(async () => {
  const mod = await expEchelonLogoImport();
  const expEchelonLogo = mod.default;
  return {
    default: () => (
      <section className="pt-16 pb-0 bg-muted">
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
              className="inline-block px-12 py-5 text-lg bg-[#0C0F24] text-background hover:bg-gold hover:text-primary-foreground transition-colors duration-300"
            >
              SUBSCRIBE
            </a>
            <div className="-mt-6 flex justify-center">
              <img src={expEchelonLogo} alt="eXp Realty | Echelon Property Group" title="eXp Realty — Echelon Property Group brokerage" className="h-80 w-auto translate-x-3 -mb-12" loading="lazy" decoding="async" />
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
        title="Austin Luxury Real Estate | Echelon Property Group Austin"
        description="Luxury homes, land, and investment real estate in Austin TX. Work with Taylor Sherwood of Echelon Property Group for exclusive listings and expert guidance."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={taylorSherwoodSchema} />
      <Navigation />
      <Hero />
      <HeroCTAStrip />

      <ScrollReveal>
        <CredibilityStrip />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <ExpertiseSection />
      </ScrollReveal>

      <Suspense fallback={<BelowFold />}>
        <ScrollReveal>
          <CommunitiesPreview />
        </ScrollReveal>
        <ScrollReveal>
          <CommercialCTA />
        </ScrollReveal>
        <div className="py-8 bg-secondary" />
        <ScrollReveal>
          <FeaturedListings />
        </ScrollReveal>
        <ScrollReveal>
          <IntroSection />
        </ScrollReveal>
        <ScrollReveal>
          <MeetTaylor />
        </ScrollReveal>
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <ScrollReveal>
          <SellerCTA />
        </ScrollReveal>
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
        <ScrollReveal>
          <NewsletterSection />
        </ScrollReveal>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
