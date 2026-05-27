import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import MarketPulse from "@/components/market-intel/MarketPulse";
import NeighborhoodStats from "@/components/market-intel/NeighborhoodStats";
import InventoryTrends from "@/components/market-intel/InventoryTrends";
import LuxuryMarketInsights from "@/components/market-intel/LuxuryMarketInsights";

const Footer = lazy(() => import("@/components/Footer"));

const MarketIntelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Market Intelligence | Echelon Property Group"
        description="Real-time Austin real estate market intelligence. Market pulse, neighborhood stats, inventory trends, and luxury market insights for buyers, sellers, and investors."
        canonical="/market-intelligence"
      />
      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em] font-semibold uppercase text-[0.7rem]">
              Market Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-6 leading-tight">
              Austin Real Estate, in Real Time
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A live read on Austin's residential and luxury market. Aggregated data refreshed daily,
              curated for buyers, sellers, and investors who require precision over noise.
            </p>
          </div>
        </div>
      </section>

      <div className="h-8 md:h-12" aria-hidden="true" />

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <MarketPulse />
            <NeighborhoodStats />
            <InventoryTrends />
            <LuxuryMarketInsights />
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MarketIntelligence;
