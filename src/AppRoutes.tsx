import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

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
const OffMarketHomes = lazy(() => import("@/pages/OffMarketHomes"));
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
const connectImport = () => import("@/pages/Connect");
const Connect = lazy(connectImport);
const NotFound = lazy(() => import("@/pages/NotFound"));

// Prefetch /connect chunk after homepage loads
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    requestIdleCallback?.(() => connectImport()) ?? setTimeout(() => connectImport(), 2000);
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
          <Route path="/moving-to-austin" element={<MovingToAustin />} />
          <Route path="/best-luxury-neighborhoods-austin" element={<BestLuxuryNeighborhoods />} />
          <Route path="/austin-luxury-market-report" element={<MarketReport />} />
          <Route path="/off-market-luxury-homes-austin" element={<OffMarketHomes />} />
          <Route path="/austin-luxury-homes-for-sale" element={<AustinLuxuryHomes />} />
          <Route path="/austin-commercial-real-estate" element={<AustinCommercialRealEstate />} />
          <Route path="/home-value-austin" element={<HomeValueAustin />} />
          <Route path="/luxury-real-estate-austin" element={<LuxuryRealEstateAustin />} />
          <Route path="/buy-homes-austin" element={<BuyHomesAustin />} />
          <Route path="/sell-home-austin" element={<SellHomeAustin />} />
          <Route path="/austin-real-estate-investment" element={<AustinRealEstateInvestment />} />
          <Route path="/land-for-sale-austin" element={<LandForSaleAustin />} />
          <Route path="/past-transactions" element={<PastTransactions />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FloatingContact />
    </>
  );
};

export default AppRoutes;
