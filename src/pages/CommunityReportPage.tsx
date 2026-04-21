import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CommunityRecord } from "@/types/community";
import { toCommunityRecord } from "@/lib/communityCoerce";
import { isUnlocked } from "@/lib/communityUnlock";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createFAQSchema,
  createBreadcrumbSchema,
  createPlaceSchema,
} from "@/components/SchemaMarkup";
import CommunityGate from "@/components/community-report/CommunityGate";
import StickyReportNav from "@/components/community-report/StickyReportNav";
import LocalHighlightsPanel from "@/components/community-report/LocalHighlightsPanel";
import DemographicsPanel from "@/components/community-report/DemographicsPanel";
import SchoolsPanel from "@/components/community-report/SchoolsPanel";
import TransitPanel from "@/components/community-report/TransitPanel";
import AboutBlock from "@/components/AboutBlock";

const Footer = lazy(() => import("@/components/Footer"));
const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));

const SITE_URL = "https://www.echelonpropertygroup.com";

const CommunityReportPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [community, setCommunity] = useState<CommunityRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlockedState] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("communities")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setCommunity(data ? toCommunityRecord(data) : null);
        setLoading(false);
      });
    setUnlockedState(isUnlocked(slug));
  }, [slug]);

  const navItems = useMemo(() => {
    if (!community) return [];
    const items: { id: string; label: string }[] = [];
    if (community.full_overview) items.push({ id: "overview", label: "Overview" });
    if (community.highlights?.length) items.push({ id: "highlights", label: "Highlights" });
    if (community.local_highlights?.some((c) => c.items?.length))
      items.push({ id: "local", label: "Local" });
    const demo = community.demographics || {};
    if (Object.values(demo).some((v) => v != null)) items.push({ id: "demographics", label: "Demographics" });
    if (community.schools?.length) items.push({ id: "schools", label: "Schools" });
    const t = community.transit || {};
    if (t.walk_score != null || t.bike_score != null || t.transit_score != null || t.summary)
      items.push({ id: "transit", label: "Walkability" });
    items.push({ id: "homes", label: "Homes" });
    if (community.our_take) items.push({ id: "take", label: "Echelon's Take" });
    return items;
  }, [community]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center">
          <h1 className="text-4xl font-display text-architectural mb-4">Report Not Available</h1>
          <Link to="/communities" className="text-minimal text-foreground hover:text-muted-foreground">
            ← BACK TO COMMUNITIES
          </Link>
        </div>
      </div>
    );
  }

  const showFullReport = !community.gate_enabled || unlocked;
  const canonical = community.canonical_url || `${SITE_URL}/communities/${community.slug}/report`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={community.seo_title || `${community.name} Community Report | Echelon Property Group`}
        description={
          community.meta_description ||
          `Inside look at ${community.name}: market trends, schools, demographics, and current listings.`
        }
        canonical={canonical}
      />
      {community.faqs?.length > 0 && <SchemaMarkup schema={createFAQSchema(community.faqs)} />}
      <SchemaMarkup
        schema={createPlaceSchema({
          name: community.name,
          slug: `${community.slug}/report`,
          description: community.meta_description || community.tagline || "",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Communities", url: `${SITE_URL}/communities` },
          { name: `${community.name} Report`, url: canonical },
        ])}
      />
      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        {community.hero_image_url && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${community.hero_image_url})` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-foreground"
              style={{ opacity: community.hero_overlay_opacity }}
              aria-hidden="true"
            />
          </>
        )}
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl">
            <Link
              to="/communities"
              className={`inline-block text-minimal mb-8 transition-colors duration-300 ${
                community.hero_image_url
                  ? "text-background/80 hover:text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ← ALL COMMUNITIES
            </Link>
            <p className={`text-minimal text-gold mb-4 tracking-[0.2em]`}>
              COMMUNITY GUIDE • {community.city.toUpperCase()}
              {community.county ? ` • ${community.county.toUpperCase()}` : ""}
            </p>
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-display font-normal mb-6 ${
                community.hero_image_url ? "text-background" : "text-architectural"
              }`}
            >
              {community.name}
            </h1>
            {community.tagline && (
              <p
                className={`text-lg md:text-xl max-w-2xl leading-relaxed ${
                  community.hero_image_url ? "text-background/85" : "text-muted-foreground"
                }`}
              >
                {community.tagline}
              </p>
            )}
            {community.updated_at && (
              <p
                className={`mt-8 text-[11px] tracking-[0.2em] uppercase ${
                  community.hero_image_url ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                Last updated{" "}
                {new Date(community.updated_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                • Curated by Echelon Property Group
              </p>
            )}
          </div>
        </div>
      </section>

      {/* GATE (locked state) */}
      {!showFullReport && (
        <>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                {community.teaser_summary && (
                  <div className="space-y-4 mb-12">
                    {community.teaser_summary.split("\n\n").map((p, i) => (
                      <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                        {p.trim()}
                      </p>
                    ))}
                  </div>
                )}
                <div className="border border-border p-8 bg-secondary">
                  <p className="text-sm text-muted-foreground mb-3 tracking-wider">INSIDE THE FULL REPORT</p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-foreground">
                    <li>• Full neighborhood overview</li>
                    <li>• Curated local highlights</li>
                    <li>• Demographics</li>
                    <li>• Schools by level</li>
                    <li>• Walk / Bike / Transit scores</li>
                    <li>• Current listings via RealScout</li>
                    <li>• Echelon's Take</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
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
        </>
      )}

      {/* FULL REPORT */}
      {showFullReport && (
        <>
          <StickyReportNav items={navItems} />
          <article className="pb-24">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto space-y-20 pt-16 md:pt-20">
                {community.full_overview && (
                  <section id="overview" className="scroll-mt-32">
                    <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                      Overview of {community.name}
                    </h2>
                    <div className="space-y-4">
                      {community.full_overview.split("\n\n").map((p, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed">
                          {p.trim()}
                        </p>
                      ))}
                    </div>
                  </section>
                )}

                {community.highlights?.length > 0 && (
                  <section id="highlights" className="scroll-mt-32">
                    <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
                      What Makes It Special
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8">
                      Curated by Echelon Property Group.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-px bg-border">
                      {community.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="bg-background p-8">
                          <p className="text-minimal text-gold mb-3 tracking-[0.15em]">
                            {h.title.toUpperCase()}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">{h.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {community.local_highlights?.some((c) => c.items?.length) && (
                  <section id="local" className="scroll-mt-32">
                    <LocalHighlightsPanel
                      highlights={community.local_highlights}
                      communityName={community.name}
                    />
                  </section>
                )}

                <section id="demographics" className="scroll-mt-32">
                  <DemographicsPanel demographics={community.demographics} />
                </section>

                <section id="schools" className="scroll-mt-32">
                  <SchoolsPanel schools={community.schools} />
                </section>

                <section id="transit" className="scroll-mt-32">
                  <TransitPanel transit={community.transit} />
                </section>

                <section id="homes" className="scroll-mt-32">
                  <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
                    Current Listings in {community.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Live inventory from MLS, curated through Echelon's RealScout integration.
                  </p>
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

                <section id="take" className="scroll-mt-32">
                  {community.our_take ? (
                    <div className="border-l-4 border-gold pl-8">
                      <p className="text-minimal text-gold mb-4 tracking-[0.2em]">ECHELON'S TAKE</p>
                      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                        Our Read on {community.name}
                      </h2>
                      <div className="space-y-4">
                        {community.our_take.split("\n\n").map((p, i) => (
                          <p key={i} className="text-foreground leading-relaxed text-lg">
                            {p.trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-l-4 border-gold/40 pl-8">
                      <p className="text-minimal text-gold mb-4 tracking-[0.2em]">ECHELON'S TAKE</p>
                      <p className="text-muted-foreground italic leading-relaxed">
                        Our read on {community.name} is being updated. Reach out for the most current
                        perspective from the team.
                      </p>
                    </div>
                  )}
                </section>

                {community.related_communities?.length > 0 && (
                  <section>
                    <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-6">
                      Related Communities
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {community.related_communities.map((rel) => (
                        <Link
                          key={rel}
                          to={`/communities/${rel}`}
                          className="border border-border p-6 hover:border-gold transition-colors text-foreground hover:text-gold text-minimal"
                        >
                          → {rel.replace(/-/g, " ").toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {community.faqs?.length > 0 && (
                  <section>
                    <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                      {community.faqs.map((faq, i) => (
                        <div key={i} className="border-b border-border pb-6">
                          <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Methodology / data note */}
                <section className="border-t border-border pt-8">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Report Methodology
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Sections are curated by Echelon Property Group using a combination of public
                    market data, US Census figures, MLS-aggregated area data, and on-the-ground
                    knowledge from active representation in {community.name}. Individual sold
                    transaction prices are not displayed. Specific property valuations are provided
                    privately on request.
                  </p>
                </section>

                {/* CTAs */}
                <section className="text-center py-12 bg-secondary -mx-6 px-6">
                  <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                    Ready to explore {community.name}?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Whether you are buying, selling, or considering an off-market opportunity,
                    Echelon can help you act with full information.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/contact"
                      className="text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-foreground px-8 py-4 transition-colors"
                    >
                      CONTACT ECHELON
                    </Link>
                    <Link
                      to="/off-market-real-estate-austin"
                      className="text-minimal border border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4 transition-colors"
                    >
                      OFF-MARKET ACCESS
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </article>
        </>
      )}

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CommunityReportPage;
