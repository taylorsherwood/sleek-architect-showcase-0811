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
  /** Optional extra content rendered inside the unlocked report (e.g. static
   *  marketing copy that should live behind the gate). */
  unlockedExtras?: React.ReactNode;
}

/**
 * Inline gated community report. Designed to be embedded inside an existing
 * community page (e.g. /communities/westlake-hills) without bringing its own
 * hero, navigation, or footer. Loads CMS content from Supabase. Renders a
 * conversion-focused teaser, an inline gate, and the full report once
 * unlocked (30-day device-level localStorage).
 */
const InlineCommunityReport = ({ slug, unlockedExtras }: InlineCommunityReportProps) => {
  const [community, setCommunity] = useState<CommunityRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlockedState] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

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

  if (loading || !community) return null;

  const showFullReport = !community.gate_enabled || unlocked;

  return (
    <section className="py-4">
      {/* TEASER + GATE FRAME (locked state) */}
      {!showFullReport && (
        <div className="border border-border bg-secondary">
          {/* Eyebrow + Headline */}
          <div className="px-6 md:px-12 pt-12 md:pt-16 pb-8 max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-5 tracking-[0.25em]">
              ECHELON INSIDER ACCESS
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural mb-6 leading-[1.15]">
              The {community.name} Briefing
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A working document we maintain for clients quietly transacting in {community.name}.
              Pricing direction, where the real movement is happening, and the opportunities most
              buyers never see listed.
            </p>
          </div>

          {/* Teaser Highlights — what the report contains */}
          {community.highlights?.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-px bg-border border-y border-border">
              {community.highlights.slice(0, 4).map((h, i) => (
                <div key={i} className="bg-secondary p-7 md:p-8">
                  <p className="text-minimal text-gold mb-3 tracking-[0.15em]">
                    {h.title.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Inside the report — concrete benefits */}
          <div className="px-6 md:px-12 py-10 md:py-12 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground tracking-[0.2em] mb-6 text-center">
              INSIDE THIS BRIEFING
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-foreground">
              <li className="flex items-start gap-3">
                <span aria-hidden className="text-gold shrink-0 leading-relaxed w-4">—</span>
                <span className="leading-relaxed">
                  Where pricing is actually moving, not the headline numbers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="text-gold shrink-0 leading-relaxed w-4">—</span>
                <span className="leading-relaxed">
                  Pockets within {community.name} appreciating fastest
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="text-gold shrink-0 leading-relaxed w-4">—</span>
                <span className="leading-relaxed">
                  Current inventory paired with our read on each property
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="text-gold shrink-0 leading-relaxed w-4">—</span>
                <span className="leading-relaxed">
                  Schools, demographics, and walkability in one place
                </span>
              </li>
            </ul>
          </div>

          {/* Gate */}
          <CommunityGate
            slug={community.slug}
            communityName={community.name}
            headline={community.gate_headline || `Request access to the ${community.name} briefing`}
            subheadline={
              community.gate_subheadline ||
              `Delivered the moment you confirm. Reserved for buyers, sellers, and investors with active interest in ${community.name}.`
            }
            thankYouMessage={community.thank_you_message || ""}
            onUnlock={() => {
              setUnlockedState(true);
              setJustUnlocked(true);
            }}
          />
        </div>
      )}

      {/* UNLOCKED FULL REPORT */}
      {showFullReport && (
        <div className="max-w-4xl mx-auto">
          {justUnlocked && (
            <div className="border border-gold/40 bg-secondary px-6 md:px-10 py-6 md:py-8 mb-12 text-center">
              <p className="text-minimal text-gold mb-2 tracking-[0.2em]">ACCESS GRANTED</p>
              <p className="text-foreground text-base md:text-lg leading-relaxed">
                The full {community.name} briefing is open below. Take your time — we will not
                follow up unless you reach out first.
              </p>
            </div>
          )}

          <div className="space-y-16 mt-4">
            {community.full_overview && (
              <section>
                <p className="text-minimal text-gold mb-3 tracking-[0.2em]">
                  THE {community.name.toUpperCase()} BRIEFING
                </p>
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
        </div>
      )}
    </section>
  );
};

export default InlineCommunityReport;
