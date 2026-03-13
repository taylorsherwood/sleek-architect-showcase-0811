import Navigation from "@/components/Navigation";
import expEchelonLogo from "@/assets/exp-echelon-logo.png";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import FeaturedListings from "@/components/FeaturedListings";
import IntroSection from "@/components/IntroSection";
import Testimonials from "@/components/Testimonials";
import MeetTaylor from "@/components/MeetTaylor";
import CommunitiesPreview from "@/components/CommunitiesPreview";
import CommercialCTA from "@/components/CommercialCTA";
import RealScoutListings from "@/components/RealScoutListings";
import CTASection from "@/components/CTASection";
import SellerCTA from "@/components/SellerCTA";
import ExpertiseSection from "@/components/ExpertiseSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

import SchemaMarkup, { realEstateAgentSchema, localBusinessSchema, taylorSherwoodSchema } from "@/components/SchemaMarkup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Austin Luxury Real Estate | Homes, Land & Investment Property | Echelon Property Group"
        description="Luxury homes, land, and investment real estate in Austin Texas. Work with Taylor Sherwood of Echelon Property Group for exclusive listings, off-market opportunities, and expert Austin real estate guidance."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={taylorSherwoodSchema} />
      <Navigation />
      <Hero />
      <CredibilityStrip />
      <ExpertiseSection />
      <CommunitiesPreview />
      <CommercialCTA />
      <FeaturedListings />
      
      <IntroSection />
      <MeetTaylor />
      <Testimonials />
      <SellerCTA />
      <CTASection />
      
      {/* Newsletter Section */}
      <section className="pt-16 pb-2 bg-muted">
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
              className="inline-block px-8 py-4 bg-[#0C0F24] text-background hover:bg-gold hover:text-primary-foreground transition-colors duration-300"
            >
              SUBSCRIBE
            </a>
            <div className="-mt-2 flex justify-center">
              <img src={expEchelonLogo} alt="eXp Realty | Echelon Property Group" className="h-60 w-auto translate-x-3" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
};

export default Index;
