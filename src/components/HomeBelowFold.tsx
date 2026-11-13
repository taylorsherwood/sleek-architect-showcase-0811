import React, { lazy, Suspense } from "react";
import { chunkRetry } from "@/lib/chunkRetry";
import FeaturedProperties from "@/components/FeaturedProperties";
import LandRanchHomeIntro from "@/components/LandRanchHomeIntro";
import DevelopmentAdvisoryCTA from "@/components/DevelopmentAdvisoryCTA";
import parallaxHillCountryAsset from "@/assets/parallax-hill-country.jpg.asset.json";
import AdvisorSection from "@/components/HomeAdvisorSection";
import StatsStrip from "@/components/HomeStatsStrip";
import CommunitiesSection from "@/components/HomeCommunitiesSection";
import LeadCapture from "@/components/HomeLeadCapture";
import FinalCTA from "@/components/HomeFinalCTA";
import { InsightsSection, EditorialInsights } from "@/components/HomeInsightsSections";

const ScrollingCredibilityStrip = lazy(chunkRetry(() => import("@/components/ScrollingCredibilityStrip")));
const ExpertiseSection = lazy(chunkRetry(() => import("@/components/ExpertiseSection")));
const HomeValuationInline = lazy(chunkRetry(() => import("@/components/HomeValuationInline")));
const Footer = lazy(chunkRetry(() => import("@/components/Footer")));

const NoscriptFallback = () => (
  <noscript>
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-light mb-6">Austin Luxury Real Estate Services</h2>
        <p className="mb-4">Echelon Property Group provides strategic luxury real estate advisory across Austin, Texas.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Luxury residential sales in West Lake Hills, Barton Creek, Lake Austin, Tarrytown, and Rollingwood</li>
          <li>Off-market and private listing opportunities</li>
          <li>Commercial real estate and multifamily investment</li>
          <li>Land acquisition and development advisory</li>
        </ul>
        <p>2105 East MLK Blvd Ste 227, Austin, Texas 78702</p>
        <p>Email: <a href="mailto:info@echelonpropertygroup.com">Send an Email</a></p>
        <p>Phone: <a href="tel:+15126613843">(512) 661-3843</a></p>
      </div>
    </section>
  </noscript>
);

/* ─────────────────────────────────────────────
   COMPOSED BELOW-FOLD CONTENT
   ───────────────────────────────────────────── */

const HomeBelowFold = () => (
  <>
    <Suspense fallback={<div className="h-24" />}>
      <ScrollingCredibilityStrip />
    </Suspense>
    <div className="h-4 md:h-6 bg-background" aria-hidden="true" />
    <AdvisorSection />
    <div className="h-12 md:h-20 bg-secondary" aria-hidden="true" />
    <StatsStrip />

    <div className="parallax-break parallax-break--no-tint hidden md:block" style={{ backgroundImage: "url('/images/parallax-skyline.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties} aria-hidden="true" />

    <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
      <HomeValuationInline />
    </Suspense>

    <Suspense fallback={<div className="min-h-[200px] bg-background" />}>
      <ExpertiseSection />
    </Suspense>

    <FeaturedProperties />
    <LandRanchHomeIntro />

    <DevelopmentAdvisoryCTA variant="ivory" />

    <div className="h-12 md:h-20 bg-secondary" aria-hidden="true" />

    <LeadCapture />

    <div className="h-12 md:h-20 bg-secondary" aria-hidden="true" />

    <div className="parallax-break hidden md:block" style={{ backgroundImage: `url('${parallaxHillCountryAsset.url}')`, contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties} aria-hidden="true" />

    <CommunitiesSection />

    <NoscriptFallback />

    <div className="parallax-break hidden md:block" style={{ backgroundImage: "url('/images/parallax-barton-springs.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties} aria-hidden="true" />




    <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" } as React.CSSProperties}>
      <InsightsSection />
    </div>
    <div className="h-12 md:h-20 bg-background" aria-hidden="true" />
    <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 1200px" } as React.CSSProperties}>
      <EditorialInsights />
    </div>

    <div className="parallax-break hidden md:block" style={{ backgroundImage: "url('/images/parallax-interior.webp')", contentVisibility: "auto", containIntrinsicSize: "0 400px" } as React.CSSProperties} aria-hidden="true" />

    <div className="h-12 md:h-20 bg-background" aria-hidden="true" />
    <div className="flex items-center justify-center py-8 md:py-12 bg-background" aria-hidden="true">
      <div className="flex items-center gap-4 max-w-[280px] w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b9a06c]" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#b9a06c]" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b9a06c]" />
      </div>
    </div>
    <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" } as React.CSSProperties}>
      <FinalCTA />
    </div>

    <Suspense fallback={<div className="min-h-[100px]" />}>
      <Footer />
    </Suspense>
  </>
);

export default HomeBelowFold;
