import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
const FloatingContact = lazy(() => import("@/components/FloatingContact"));
const AdvisoryBar = lazy(() => import("@/components/AdvisoryBar"));

// Eagerly load the homepage for instant first paint
import Index from "@/pages/Index";

// Lazy-load every other route to defer non-critical JS
const About = lazy(() => import("@/pages/About"));
const Listings = lazy(() => import("@/pages/Listings"));
const Buy = lazy(() => import("@/pages/Buy"));
const Sell = lazy(() => import("@/pages/Sell"));
const Communities = lazy(() => import("@/pages/Communities"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const MovingToAustin = lazy(() => import("@/pages/MovingToAustin"));
const BestLuxuryNeighborhoods = lazy(() => import("@/pages/BestLuxuryNeighborhoods"));
const MarketReport = lazy(() => import("@/pages/MarketReport"));

const AustinLuxuryHomes = lazy(() => import("@/pages/AustinLuxuryHomes"));
const AustinCommercialRealEstate = lazy(() => import("@/pages/AustinCommercialRealEstate"));
const HomeValueAustin = lazy(() => import("@/pages/HomeValueAustin"));
const CommercialInvestment = lazy(() => import("@/pages/CommercialInvestment"));
const LuxuryRealEstateAustin = lazy(() => import("@/pages/LuxuryRealEstateAustin"));
const BuyHomesAustin = lazy(() => import("@/pages/BuyHomesAustin"));
const SellHomeAustin = lazy(() => import("@/pages/SellHomeAustin"));
const AustinRealEstateInvestment = lazy(() => import("@/pages/AustinRealEstateInvestment"));
const LandForSaleAustin = lazy(() => import("@/pages/LandForSaleAustin"));
const SearchPage = lazy(() => import("@/pages/Search"));
const LandPage = lazy(() => import("@/pages/Land"));
const PastTransactions = lazy(() => import("@/pages/PastTransactions"));

const BestNeighborhoodsAustin = lazy(() => import("@/pages/BestNeighborhoodsAustin"));
const AustinMultifamilyReport2026 = lazy(() => import("@/pages/AustinMultifamilyReport2026"));
const connectImport = () => import("@/pages/Connect");
const Connect = lazy(connectImport);
const PrivateOpportunitiesPage = lazy(() => import("@/pages/PrivateOpportunitiesPage"));
const LuxuryHomesAustin = lazy(() => import("@/pages/LuxuryHomesAustin"));
const BillionaireMigration = lazy(() => import("@/pages/BillionaireMigration"));
const OffMarketDealsAustin = lazy(() => import("@/pages/OffMarketDealsAustin"));
const AustinLuxuryMarketTrends = lazy(() => import("@/pages/AustinLuxuryMarketTrends"));
const OffMarketRealEstateAustin = lazy(() => import("@/pages/OffMarketRealEstateAustin"));
const AustinLandDevelopmentOpportunities = lazy(() => import("@/pages/AustinLandDevelopmentOpportunities"));
const AustinLuxuryRealEstateMarketReport = lazy(() => import("@/pages/AustinLuxuryRealEstateMarketReport"));
const Invest = lazy(() => import("@/pages/Invest"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Prefetch /connect chunk well after homepage is interactive
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    const prefetch = () => setTimeout(() => connectImport(), 4000);
    requestIdleCallback?.(prefetch, { timeout: 8000 }) ?? prefetch();
  });
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/commercial-investment-austin" element={<CommercialInvestment />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buyers" element={<Navigate to="/buy" replace />} />
          <Route path="/sellers" element={<Navigate to="/sell" replace />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:slug" element={<CommunityPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/moving-to-austin-texas" element={<MovingToAustin />} />
          <Route path="/moving-to-austin" element={<Navigate to="/moving-to-austin-texas" replace />} />
          <Route path="/best-luxury-neighborhoods-austin" element={<BestLuxuryNeighborhoods />} />
          <Route path="/best-luxury-neighborhoods-in-austin" element={<Navigate to="/best-luxury-neighborhoods-austin" replace />} />
          <Route path="/austin-luxury-market-report" element={<MarketReport />} />
          <Route path="/off-market-luxury-homes-austin" element={<Navigate to="/off-market-real-estate-austin" replace />} />
          <Route path="/austin-luxury-homes-for-sale" element={<AustinLuxuryHomes />} />
          <Route path="/austin-commercial-real-estate" element={<AustinCommercialRealEstate />} />
          <Route path="/home-value-austin" element={<HomeValueAustin />} />
          <Route path="/luxury-real-estate-austin" element={<LuxuryRealEstateAustin />} />
          <Route path="/buy-homes-austin" element={<BuyHomesAustin />} />
          <Route path="/sell-home-austin" element={<SellHomeAustin />} />
          <Route path="/austin-real-estate-investment" element={<AustinRealEstateInvestment />} />
          <Route path="/land-for-sale-austin" element={<LandForSaleAustin />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/land" element={<LandPage />} />
          <Route path="/past-transactions" element={<PastTransactions />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/best-neighborhoods-in-austin-texas" element={<BestNeighborhoodsAustin />} />
          <Route path="/austin-multifamily-report-2026" element={<AustinMultifamilyReport2026 />} />
          <Route path="/private-opportunities" element={<PrivateOpportunitiesPage />} />
          <Route path="/luxury-homes-austin" element={<Navigate to="/austin-luxury-homes-for-sale" replace />} />
          <Route path="/why-billionaires-are-moving-to-austin" element={<BillionaireMigration />} />
          <Route path="/blog/how-to-find-off-market-real-estate-deals-austin-2026" element={<OffMarketDealsAustin />} />
          <Route path="/blog/austin-luxury-market-trends" element={<AustinLuxuryMarketTrends />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/private" element={<Navigate to="/off-market-real-estate-austin" replace />} />
          <Route path="/off-market-real-estate-austin" element={<OffMarketRealEstateAustin />} />
          <Route path="/austin-land-development-opportunities" element={<AustinLandDevelopmentOpportunities />} />
          <Route path="/austin-luxury-real-estate-market-report" element={<AustinLuxuryRealEstateMarketReport />} />
          <Route path="/westlake-hills-homes-for-sale" element={<Navigate to="/communities/westlake-hills" replace />} />
          <Route path="/tarrytown-homes-for-sale" element={<Navigate to="/communities/tarrytown" replace />} />
          <Route path="/rollingwood-homes-for-sale" element={<Navigate to="/communities/rollingwood" replace />} />
          <Route path="/clarksville-homes-for-sale" element={<Navigate to="/communities/clarksville" replace />} />
          <Route path="/barton-creek-homes-for-sale" element={<Navigate to="/communities/barton-creek" replace />} />
          <Route path="/lake-austin-waterfront-homes-for-sale" element={<Navigate to="/communities/lake-austin" replace />} />
          <Route path="/lake-travis-waterfront-homes-for-sale" element={<Navigate to="/communities/lake-travis" replace />} />
          <Route path="/mueller-homes-for-sale" element={<Navigate to="/communities/mueller" replace />} />
          <Route path="/zilker-homes-for-sale" element={<Navigate to="/communities/zilker-austin" replace />} />
          <Route path="/hyde-park-homes-for-sale" element={<Navigate to="/communities/hyde-park" replace />} />
          <Route path="/pemberton-heights-homes-for-sale" element={<Navigate to="/communities/pemberton-heights" replace />} />
          <Route path="/dripping-springs-homes-for-sale" element={<Navigate to="/communities/dripping-springs" replace />} />
          <Route path="/bee-cave-homes-for-sale" element={<Navigate to="/communities/bee-cave" replace />} />
          <Route path="/great-hills-homes-for-sale" element={<Navigate to="/communities/great-hills" replace />} />
          <Route path="/balcones-park-homes-for-sale" element={<Navigate to="/communities/balcones-park" replace />} />
          <Route path="/rob-roy-homes-for-sale" element={<Navigate to="/communities/rob-roy" replace />} />
          <Route path="/steiner-ranch-homes-for-sale" element={<Navigate to="/communities/steiner-ranch" replace />} />
          <Route path="/bryker-woods-homes-for-sale" element={<Navigate to="/communities/bryker-woods" replace />} />
          <Route path="/east-austin-homes-for-sale" element={<Navigate to="/communities/east-austin" replace />} />
          <Route path="/old-enfield-homes-for-sale" element={<Navigate to="/communities/old-enfield" replace />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <FloatingContact />
        <AdvisoryBar />
      </Suspense>
    </>
  );
};

export default AppRoutes;
