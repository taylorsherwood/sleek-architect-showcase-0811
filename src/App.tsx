import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import FloatingContact from "./components/FloatingContact";
import Index from "./pages/Index";
import About from "./pages/About";
import Listings from "./pages/Listings";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Communities from "./pages/Communities";
import CommunityPage from "./pages/CommunityPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import MovingToAustin from "./pages/MovingToAustin";
import BestLuxuryNeighborhoods from "./pages/BestLuxuryNeighborhoods";
import MarketReport from "./pages/MarketReport";
import OffMarketHomes from "./pages/OffMarketHomes";
import AustinLuxuryHomes from "./pages/AustinLuxuryHomes";
import AustinCommercialRealEstate from "./pages/AustinCommercialRealEstate";
import HomeValueAustin from "./pages/HomeValueAustin";
import CommercialInvestment from "./pages/CommercialInvestment";
import LuxuryRealEstateAustin from "./pages/LuxuryRealEstateAustin";
import BuyHomesAustin from "./pages/BuyHomesAustin";
import SellHomeAustin from "./pages/SellHomeAustin";
import AustinRealEstateInvestment from "./pages/AustinRealEstateInvestment";
import LandForSaleAustin from "./pages/LandForSaleAustin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/commercial-investment-austin" element={<CommercialInvestment />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          {/* Redirects from old routes */}
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingContact />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
