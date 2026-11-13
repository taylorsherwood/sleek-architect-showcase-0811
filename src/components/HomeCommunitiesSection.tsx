import { lazy, Suspense } from "react";
import { chunkRetry } from "@/lib/chunkRetry";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomeCommunitiesScroll = lazy(chunkRetry(() => import("@/components/HomeCommunitiesScroll")));

const CommunitiesSection = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-6 mb-10 md:mb-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs text-gold uppercase mb-4">Featured Neighborhoods</p>
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-5">Where Austin lives well.</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">A curated atlas of the city's most coveted enclaves, each shaped by its own identity and quiet authority.</p>
          </div>
          <Button asChild variant="link" className="p-0 h-auto self-start md:self-auto text-xs text-foreground hover:text-gold">
            <Link to="/communities">View All Communities →</Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
        <HomeCommunitiesScroll />
      </Suspense>
      <div className="container mx-auto px-6 text-center pt-12 md:pt-16">
        <p className="text-xs text-gold uppercase mb-4">AUSTIN MICRO MARKETS</p>
        <p className="font-display font-normal text-lg md:text-2xl mb-6">each neighborhood has a story.<br />One discerning point of view.</p>
        <Button asChild variant="outline" className="rounded-none border-gold bg-transparent text-xs hover:bg-primary hover:text-primary-foreground">
          <Link to="/communities">EXPLORE EVERY COMMUNITY</Link>
        </Button>
      </div>
    </section>
  );
};

export default CommunitiesSection;
