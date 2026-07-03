import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AliasRedirect from "@/components/AliasRedirect";
import { ScrollToTop } from "@/components/ScrollToTop";
const FloatingContact = lazy(() => import("@/components/FloatingContact"));
const ExitIntentModal = lazy(() => import("@/components/ExitIntentModal"));

// Eagerly load the homepage for instant first paint
import Index from "@/pages/Index";

// Lazy-load every other route to defer non-critical JS
const aboutImport = () => import("@/pages/About");
const About = lazy(aboutImport);
const listingsImport = () => import("@/pages/Listings");
const Listings = lazy(listingsImport);
const buyImport = () => import("@/pages/Buy");
const Buy = lazy(buyImport);
const sellImport = () => import("@/pages/Sell");
const Sell = lazy(sellImport);
const communitiesImport = () => import("@/pages/Communities");
const Communities = lazy(communitiesImport);
const communityPageImport = () => import("@/pages/CommunityPage");
const CommunityPage = lazy(communityPageImport);
const blogImport = () => import("@/pages/Blog");
const Blog = lazy(blogImport);
const blogPostImport = () => import("@/pages/BlogPost");
const BlogPost = lazy(blogPostImport);
const contactImport = () => import("@/pages/Contact");
const Contact = lazy(contactImport);
const MovingToAustin = lazy(() => import("@/pages/MovingToAustin"));
const BestLuxuryNeighborhoods = lazy(() => import("@/pages/BestLuxuryNeighborhoods"));
const MarketReport = lazy(() => import("@/pages/MarketReport"));

const AustinLuxuryHomes = lazy(() => import("@/pages/AustinLuxuryHomes"));
const AustinCommercialRealEstate = lazy(() => import("@/pages/AustinCommercialRealEstate"));
const HomeValueAustin = lazy(() => import("@/pages/HomeValueAustin"));
const CommercialInvestment = lazy(() => import("@/pages/CommercialInvestment"));
const LuxuryRealEstateAustin = lazy(() => import("@/pages/LuxuryRealEstateAustin"));


const AustinRealEstateInvestment = lazy(() => import("@/pages/AustinRealEstateInvestment"));
const LandForSaleAustin = lazy(() => import("@/pages/LandForSaleAustin"));
const LandRanch = lazy(() => import("@/pages/LandRanch"));
const LandRanchMarket = lazy(() => import("@/pages/LandRanchMarket"));
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

const AustinLuxuryMarketTrends = lazy(() => import("@/pages/AustinLuxuryMarketTrends"));
const OffMarketRealEstateAustin = lazy(() => import("@/pages/OffMarketRealEstateAustin"));
const AustinLandDevelopmentOpportunities = lazy(() => import("@/pages/AustinLandDevelopmentOpportunities"));
const LandDevelopment = lazy(() => import("@/pages/LandDevelopment"));
const AustinLuxuryRealEstateMarketReport = lazy(() => import("@/pages/AustinLuxuryRealEstateMarketReport"));
const MarketIntelligence = lazy(() => import("@/pages/MarketIntelligence"));
const investImport = () => import("@/pages/Invest");
const Invest = lazy(investImport);

const AboutAustinRealEstateAdvisory = lazy(() => import("@/pages/AboutAustinRealEstateAdvisory"));
const SellPrivate = lazy(() => import("@/pages/SellPrivate"));
const SellPrivateThankYou = lazy(() => import("@/pages/SellPrivateThankYou"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CommunityReportPage = lazy(() => import("@/pages/CommunityReportPage"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminCommunityEditor = lazy(() => import("@/pages/admin/AdminCommunityEditor"));
const AdminPrivateDistribution = lazy(() => import("@/pages/admin/AdminPrivateDistribution"));
const PrivateDistribution = lazy(() => import("@/pages/PrivateDistribution"));
const Reviews = lazy(() => import("@/pages/Reviews"));

// Prefetch high-traffic route chunks after homepage is interactive
if (typeof window !== "undefined") {
  const appWindow = window as Window & { __echelonPrefetchScheduled?: boolean };

  if (!appWindow.__echelonPrefetchScheduled) {
    appWindow.__echelonPrefetchScheduled = true;
    window.addEventListener(
      "load",
      () => {
        const prefetchAll = () => {
          // Stagger prefetches to avoid network contention
          setTimeout(() => { buyImport(); sellImport(); }, 2000);
          setTimeout(() => { communitiesImport(); communityPageImport(); }, 3000);
          setTimeout(() => { listingsImport(); aboutImport(); contactImport(); }, 4000);
          setTimeout(() => { blogImport(); blogPostImport(); investImport(); }, 5000);
          setTimeout(() => { connectImport(); }, 8000);
        };
        window.requestIdleCallback?.(prefetchAll, { timeout: 10000 }) ?? setTimeout(prefetchAll, 3000);
      },
      { once: true }
    );
  }
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lander" element={<AliasRedirect to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/commercial-investment-austin" element={<CommercialInvestment />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buyers" element={<AliasRedirect to="/buy" />} />
          <Route path="/sellers" element={<AliasRedirect to="/sell" />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:slug" element={<CommunityPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/moving-to-austin-texas" element={<MovingToAustin />} />
          <Route path="/moving-to-austin" element={<AliasRedirect to="/moving-to-austin-texas" />} />
          <Route path="/best-luxury-neighborhoods-austin" element={<BestLuxuryNeighborhoods />} />
          <Route path="/best-luxury-neighborhoods-in-austin" element={<AliasRedirect to="/best-luxury-neighborhoods-austin" />} />
          <Route path="/austin-luxury-market-report" element={<MarketReport />} />
          <Route path="/off-market-luxury-homes-austin" element={<AliasRedirect to="/off-market-real-estate-austin" />} />
          <Route path="/austin-luxury-homes-for-sale" element={<AustinLuxuryHomes />} />
          <Route path="/austin-commercial-real-estate" element={<AustinCommercialRealEstate />} />
          <Route path="/home-value-austin" element={<HomeValueAustin />} />
          <Route path="/luxury-real-estate-austin" element={<LuxuryRealEstateAustin />} />
          <Route path="/buy-homes-austin" element={<AliasRedirect to="/buy" />} />
          <Route path="/sell-home-austin" element={<AliasRedirect to="/sell" />} />
          <Route path="/austin-real-estate-investment" element={<AustinRealEstateInvestment />} />
          <Route path="/land-for-sale-austin" element={<LandForSaleAustin />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/land" element={<LandPage />} />
          <Route path="/land-ranch" element={<LandRanch />} />
          <Route path="/land-ranch/:slug" element={<LandRanchMarket />} />
          <Route path="/past-transactions" element={<PastTransactions />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/best-neighborhoods-in-austin-texas" element={<BestNeighborhoodsAustin />} />
          <Route path="/austin-multifamily-report-2026" element={<AustinMultifamilyReport2026 />} />
          <Route path="/private-opportunities" element={<PrivateOpportunitiesPage />} />
          <Route path="/luxury-homes-austin" element={<AliasRedirect to="/austin-luxury-homes-for-sale" />} />
          <Route path="/why-billionaires-are-moving-to-austin" element={<BillionaireMigration />} />
          <Route path="/blog/how-to-find-off-market-real-estate-deals-austin-2026" element={<AliasRedirect to="/blog/find-off-market-homes-austin" />} />
          {/* 301 redirects for stale/duplicate blog slugs (consolidated into the canonical post) */}
          <Route path="/blog/what-is-a-private-listing" element={<AliasRedirect to="/blog/what-is-private-listing-in-real-estate" />} />
          <Route path="/blog/selling-luxury-home-austin" element={<AliasRedirect to="/blog/selling-luxury-home-austin-strategies" />} />
          <Route path="/blog/beyond-zillow-luxury-home-valuation-austin" element={<AliasRedirect to="/blog/beyond-zillow-luxury-buyers-austin" />} />
          <Route path="/blog/buyers-never-see-best-homes" element={<AliasRedirect to="/blog/why-most-buyers-never-see-austins-best-homes" />} />
          <Route path="/blog/why-buyers-never-see-the-best-austin-homes" element={<AliasRedirect to="/blog/why-most-buyers-never-see-austins-best-homes" />} />
          <Route path="/blog/buying-luxury-real-estate-out-of-state" element={<AliasRedirect to="/blog/buying-luxury-home-from-out-of-state" />} />
          <Route path="/blog/new-construction-austin" element={<AliasRedirect to="/blog/new-construction-austin-what-wins" />} />
          <Route path="/blog/new-construction-luxury-homes-austin" element={<AliasRedirect to="/blog/new-construction-austin-what-wins" />} />
          <Route path="/blog/lake-austin-waterfront-value" element={<AliasRedirect to="/blog/lake-austin-waterfront-homes-what-drives-value" />} />
          <Route path="/blog/off-market-real-estate-austin" element={<AliasRedirect to="/off-market-real-estate-austin" />} />
          <Route path="/blog/exclusive-properties-austin-texas" element={<AliasRedirect to="/blog/off-market-luxury-homes-austin" />} />
          <Route path="/blog/best-austin-neighborhoods-for-real-estate-investment" element={<AliasRedirect to="/blog/top-investment-neighborhoods-austin" />} />
          {/* 301 redirects for alternate community slugs that point at the same neighborhood */}
          <Route path="/communities/westlake" element={<AliasRedirect to="/communities/westlake-hills" />} />
          <Route path="/communities/west-lake-hills" element={<AliasRedirect to="/communities/westlake-hills" />} />
          <Route path="/blog/austin-luxury-market-trends" element={<AustinLuxuryMarketTrends />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/private" element={<AliasRedirect to="/off-market-real-estate-austin" />} />
          <Route path="/off-market-real-estate-austin" element={<OffMarketRealEstateAustin />} />
          <Route path="/austin-land-development-opportunities" element={<AustinLandDevelopmentOpportunities />} />
          <Route path="/land-development" element={<LandDevelopment />} />
          <Route path="/austin-luxury-real-estate-market-report" element={<AustinLuxuryRealEstateMarketReport />} />
          <Route path="/westlake-hills-homes-for-sale" element={<AliasRedirect to="/communities/westlake-hills" />} />
          <Route path="/tarrytown-homes-for-sale" element={<AliasRedirect to="/communities/tarrytown" />} />
          <Route path="/rollingwood-homes-for-sale" element={<AliasRedirect to="/communities/rollingwood" />} />
          <Route path="/clarksville-homes-for-sale" element={<AliasRedirect to="/communities/clarksville" />} />
          <Route path="/barton-creek-homes-for-sale" element={<AliasRedirect to="/communities/barton-creek" />} />
          <Route path="/lake-austin-waterfront-homes-for-sale" element={<AliasRedirect to="/communities/lake-austin" />} />
          <Route path="/lake-travis-waterfront-homes-for-sale" element={<AliasRedirect to="/communities/lake-travis" />} />
          <Route path="/mueller-homes-for-sale" element={<AliasRedirect to="/communities/mueller" />} />
          <Route path="/zilker-homes-for-sale" element={<AliasRedirect to="/communities/zilker-austin" />} />
          <Route path="/hyde-park-homes-for-sale" element={<AliasRedirect to="/communities/hyde-park" />} />
          <Route path="/pemberton-heights-homes-for-sale" element={<AliasRedirect to="/communities/pemberton-heights" />} />
          <Route path="/dripping-springs-homes-for-sale" element={<AliasRedirect to="/communities/dripping-springs" />} />
          <Route path="/bee-cave-homes-for-sale" element={<AliasRedirect to="/communities/bee-cave" />} />
          <Route path="/great-hills-homes-for-sale" element={<AliasRedirect to="/communities/great-hills" />} />
          <Route path="/balcones-park-homes-for-sale" element={<AliasRedirect to="/communities/balcones-park" />} />
          <Route path="/rob-roy-homes-for-sale" element={<AliasRedirect to="/communities/rob-roy" />} />
          <Route path="/steiner-ranch-homes-for-sale" element={<AliasRedirect to="/communities/steiner-ranch" />} />
          <Route path="/bryker-woods-homes-for-sale" element={<AliasRedirect to="/communities/bryker-woods" />} />
          <Route path="/east-austin-homes-for-sale" element={<AliasRedirect to="/communities/east-austin" />} />
          <Route path="/old-enfield-homes-for-sale" element={<AliasRedirect to="/communities/old-enfield" />} />
          <Route path="/davenport-ranch-homes-for-sale" element={<AliasRedirect to="/communities/davenport-ranch" />} />
          <Route path="/lakeway-homes-for-sale" element={<AliasRedirect to="/communities/lakeway" />} />
          <Route path="/sitemap" element={<AliasRedirect to="/sitemap.xml" />} />
          <Route path="/about-austin-real-estate-advisory" element={<AboutAustinRealEstateAdvisory />} />
          <Route path="/sell-private" element={<SellPrivate />} />
          <Route path="/sell-private/thank-you" element={<SellPrivateThankYou />} />
          <Route path="/communities/:slug/report" element={<CommunityReportPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/communities/:slug" element={<AdminCommunityEditor />} />
          <Route path="/admin/private-distribution" element={<AdminPrivateDistribution />} />
          <Route path="/admin/private-distribution/:slug" element={<AdminPrivateDistribution />} />
          <Route path="/private-distribution" element={<PrivateDistribution />} />
          <Route path="/private-distribution/:slug" element={<PrivateDistribution />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <FloatingContact />
        <ExitIntentModal />
      </Suspense>
    </>
  );
};

export default AppRoutes;
