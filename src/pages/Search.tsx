import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = lazy(() => import("@/components/Footer"));
const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Search Austin Homes for Sale | Echelon Property Group"
        description="Browse all Austin homes for sale. Search luxury homes, condos, and investment properties across Austin's most desirable neighborhoods."
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background:
            "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 14%) 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <p
              className="text-minimal mb-6"
              style={{ color: "hsl(42 37% 67%)" }}
            >
              AUSTIN REAL ESTATE
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-architectural mb-6 text-warm-cream">
              Search All <span className="italic">Listings</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-cream/70 max-w-2xl mx-auto font-light">
              Explore every available home across Austin — from luxury estates
              to condos, new construction, and investment opportunities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Listings widget */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <Suspense
              fallback={
                <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                  Loading listings…
                </div>
              }
            >
              <RealScoutListings />
            </Suspense>
          </ScrollReveal>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SearchPage;
