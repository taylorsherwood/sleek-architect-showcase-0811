import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import IntroSection from "@/components/IntroSection";
import CommunitiesPreview from "@/components/CommunitiesPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedListings />
      <IntroSection />
      <CommunitiesPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
