import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Listings from "./pages/Listings";
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
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:slug" element={<CommunityPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/moving-to-austin" element={<MovingToAustin />} />
          <Route path="/best-luxury-neighborhoods-austin" element={<BestLuxuryNeighborhoods />} />
          <Route path="/austin-luxury-market-report" element={<MarketReport />} />
          <Route path="/off-market-luxury-homes-austin" element={<OffMarketHomes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
