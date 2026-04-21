import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommunityRecord } from "@/types/community";
import { toCommunityRecord } from "@/lib/communityCoerce";
import { isUnlocked } from "@/lib/communityUnlock";
import CommunityGate from "@/components/community-report/CommunityGate";
import MarketSnapshot from "@/components/community-report/MarketSnapshot";
import DemographicsPanel from "@/components/community-report/DemographicsPanel";
import SchoolsPanel from "@/components/community-report/SchoolsPanel";
import TransitPanel from "@/components/community-report/TransitPanel";

const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));

interface InlineCommunityReportProps {
  slug: string;
}

/**
 * Inline gated community report. Designed to be embedded inside an existing
 * community page (e.g. /communities/westlake-hills) without bringing its own
 * hero, navigation, or footer. Loads CMS content from Supabase. Renders a
 * teaser + 4 highlights publicly, an inline gate, and the full report below
 * once the visitor unlocks (30-day device-level localStorage).
 */
const InlineCommunityReport = ({ slug }: InlineCommunityReportProps) => {
  const [community, setCommunity] = useState<CommunityRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlockedState] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("communities")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setCommunity(data ? toCommunityRecord(data) : null);
        setLoading(false);
      });
    setUnlockedState(isUnlocked(slug));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // If the report record doesn't exist yet, render nothing rather than a broken block.
  if (loading || !community) return null;

  const showFullReport = !community.gate_enabled || unlocked;

  return (
    <section className="py-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-minimal text-gold mb-3 tracking-[0.2em]">
            ECHELON INSIDER ACCESS
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
            The {community.name} Insider Report
          </h2>
          {community.teaser_summary && (
            <div className="space-y-4">
              {community.teaser_summary.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p.trim()}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Highlights teaser */}
        {community.highlights?.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-px bg-border mb-10">
            {community.highlights.slice(0, 4).map((h, i) => (
              <div key={i} className="bg-background p-8">
                <p className="text-minimal text-gold mb-3 tracking-[0.15em]">
                  {h.title.toUpperCase()}
                </p>
                <p className="text-muted-foreground leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* What's inside (only when locked) */}
        {!showFullReport && (
          <div className="border border-border p-8 bg-secondary mb-2">
            <p className="text-sm text-muted-foreground mb-3 tracking-wider">
              INSIDE THE FULL REPORT
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-foreground">
              <li>• Aggregated market snapshot</li>
              <li>• Current listings via RealScout</li>
              <li>• Demographics & schools</li>
              <li>• Transit & walkability</li>
              <li>• Echelon's Take</li>
              <li>• In-depth FAQs</li>
            </ul>
          </div>
        )}
      </div>

      {/* Gate (full-bleed dark band) */}
      {!showFullReport && (
        <div className="-mx-6 mt-10">
          <CommunityGate
            slug={community.slug}
            communityName={community.name}
            headline={community.gate_headline || `Unlock the full ${community.name} report`}
            subheadline={
              community.gate_subheadline ||
              "Market trends, schools, demographics, and current listings — delivered instantly."
            }
            thankYouMessage={community.thank_you_message || ""}
            onUnlock={() => setUnlockedState(true)}
          />
        </div>
      )}

      {/* Full report */}
      {showFullReport && (
        <div className="max-w-4xl mx-auto space-y-16 mt-12">
          {community.full_overview && (
            <section>
              <h3 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-6">
                Inside {community.name}
              </h3>
              <div className="space-y-4">
                {community.full_overview.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p.trim()}
                  </p>
                ))}
              </div>
            </section>
          )}

          <MarketSnapshot stats={community.market_stats} communityName={community.name} />

          <section>
            <h3 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-6">
              Current Listings in {community.name}
            </h3>
            <Suspense
              fallback={
                <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
                  Loading listings…
                </div>
              }
            >
              <RealScoutListings
                heading={`${community.name.toUpperCase()} INVENTORY`}
                subheading="Available Now"
                title="Currently Available"
                listingStatus="For Sale"
              />
            </Suspense>
          </section>

          <DemographicsPanel demographics={community.demographics} />
          <SchoolsPanel schools={community.schools} />
          <TransitPanel transit={community.transit} />

          {community.our_take && (
            <section className="border-l-4 border-gold pl-8">
              <p className="text-minimal text-gold mb-4 tracking-[0.2em]">ECHELON'S TAKE</p>
              <h3 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-6">
                Our Read on {community.name}
              </h3>
              <div className="space-y-4">
                {community.our_take.split("\n\n").map((p, i) => (
                  <p key={i} className="text-foreground leading-relaxed text-lg">
                    {p.trim()}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default InlineCommunityReport;
