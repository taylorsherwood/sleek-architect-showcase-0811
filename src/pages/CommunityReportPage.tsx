import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CommunityRecord } from "@/types/community";
import { isUnlocked } from "@/lib/communityUnlock";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createFAQSchema,
  createBreadcrumbSchema,
  createPlaceSchema,
} from "@/components/SchemaMarkup";
import CommunityGate from "@/components/community-report/CommunityGate";
import MarketSnapshot from "@/components/community-report/MarketSnapshot";
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
        setCommunity(data as CommunityRecord | null);
        setLoading(false);
      });
    setUnlockedState(isUnlocked(slug));
  }, [slug]);

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
        canonicalUrl={canonical}
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
              {community.city.toUpperCase()} {community.county ? `• ${community.county.toUpperCase()}` : ""}
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
          </div>
        </div>
      </section>

      {/* TEASER (always visible) */}
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

            {community.highlights?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-px bg-border mb-12">
                {community.highlights.slice(0, 4).map((h, i) => (
                  <div key={i} className="bg-background p-8">
                    <p className="text-minimal text-gold mb-3 tracking-[0.15em]">{h.title.toUpperCase()}</p>
                    <p className="text-muted-foreground leading-relaxed">{h.description}</p>
                  </div>
                ))}
              </div>
            )}

            {!showFullReport && (
              <div className="border border-border p-8 bg-secondary">
                <p className="text-sm text-muted-foreground mb-3 tracking-wider">INSIDE THE FULL REPORT</p>
                <ul className="grid sm:grid-cols-2 gap-3 text-foreground">
                  <li>• Full neighborhood overview</li>
                  <li>• Aggregated market snapshot</li>
                  <li>• Current listings via RealScout</li>
                  <li>• Demographics & schools</li>
                  <li>• Transit & walkability</li>
                  <li>• Echelon's Take</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GATE */}
      {!showFullReport && (
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
      )}

      {/* FULL REPORT */}
      {showFullReport && (
        <article className="pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-20">
              {community.full_overview && (
                <section>
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

              <MarketSnapshot stats={community.market_stats} communityName={community.name} />

              {/* Current listings via RealScout */}
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                  Current Listings in {community.name}
                </h2>
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
                </section>
              )}

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

              {/* CTAs */}
              <section className="text-center py-12 bg-secondary -mx-6 px-6">
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                  Ready to explore {community.name}?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Whether you are buying, selling, or considering an off-market opportunity, Echelon can
                  help you act with full information.
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
      )}

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CommunityReportPage;
