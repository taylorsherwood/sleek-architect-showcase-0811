import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Maximize2, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useListing } from "@/hooks/useListing";
import { useAuth } from "@/hooks/useAuth";
import { useReveal } from "@/hooks/useReveal";
import StorySectionRenderer from "@/components/listing-story/StorySectionRenderer";
import LeadCaptureForm from "@/components/listing-story/LeadCaptureForm";
import PresentationMode from "@/components/listing-story/PresentationMode";

const SITE_URL = "https://www.echelonpropertygroup.com";

const formatPrice = (p: number | null | undefined) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

const StatsBlock = ({ stats }: { stats: { label: string; value: string | number }[] }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background">
      <div ref={ref} className="ls-reveal container mx-auto px-6 md:px-10 max-w-5xl py-16 md:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl md:text-[2.5rem] leading-none text-architectural">
                {s.value}
              </p>
              <p className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntroBlock = ({ short, full }: { short: string | null; full: string | null }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background">
      <div ref={ref} className="ls-reveal container mx-auto px-6 md:px-10 max-w-3xl py-24 md:py-40">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">The Residence</p>
        {short && (
          <h2 className="font-display text-[1.75rem] sm:text-3xl md:text-[2.75rem] leading-[1.18] text-architectural mb-10">
            {short}
          </h2>
        )}
        {full && (
          <div className="font-body text-[15px] md:text-[17px] leading-[1.95] text-foreground/80 whitespace-pre-line">
            {full}
          </div>
        )}
      </div>
    </section>
  );
};

const ListingStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { listing, sections, media, loading, notFound } = useListing(slug);
  const { isAdmin } = useAuth();
  const [present, setPresent] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) heroVideoRef.current.play().catch(() => {});
  }, [listing?.hero_video_url]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center text-muted-foreground text-xs tracking-[0.3em] uppercase">
          Loading
        </div>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Echelon Property Group</p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">Listing Not Found</h1>
          <p className="text-muted-foreground mb-10 font-body">This presentation is unavailable or has been retired.</p>
          <Link to="/listings" className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors">
            View Available Listings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing.is_published && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center px-6 max-w-xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Private Preview</p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">
            Not Available for Public Viewing
          </h1>
          <p className="text-muted-foreground mb-10 font-body">
            This presentation is currently being prepared by the Echelon team.
          </p>
          <Link to="/contact" className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors">
            Request Access
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const price = formatPrice(listing.price);
  const stats = [
    listing.beds && { label: "Beds", value: listing.beds },
    listing.baths && { label: "Baths", value: listing.baths },
    listing.sqft && { label: "Sqft", value: listing.sqft.toLocaleString() },
    listing.acres && { label: "Acres", value: listing.acres },
    listing.year_built && { label: "Built", value: listing.year_built },
  ].filter(Boolean) as { label: string; value: string | number }[];

  const canonical = `${SITE_URL}/listing/${listing.slug}`;
  const metaTitle = listing.meta_title || listing.title;
  const metaDesc =
    listing.meta_description ||
    listing.short_intro ||
    `${listing.title} — ${listing.address || listing.neighborhood || ""}. Presented by Echelon Property Group.`;
  const ogImage = listing.og_image_url || listing.hero_image_url || `${SITE_URL}/og-image.png`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    url: canonical,
    description: metaDesc,
    image: ogImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address || undefined,
      addressLocality: listing.city || "Austin",
      addressRegion: listing.state || "TX",
      postalCode: listing.zip || undefined,
    },
    offers: listing.price
      ? { "@type": "Offer", price: listing.price, priceCurrency: "USD", availability: "https://schema.org/InStock" }
      : undefined,
    numberOfBedrooms: listing.beds || undefined,
    numberOfBathroomsTotal: listing.baths || undefined,
    floorSize: listing.sqft ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" } : undefined,
  };

  return (
    <div className="ls-root min-h-screen bg-background">
      <Helmet prioritizeSeoTags>
        <title>{`${metaTitle} | Echelon Property Group`}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        {!listing.is_published && <meta name="robots" content="noindex, nofollow" />}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navigation />

      {!listing.is_published && isAdmin && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background text-[10px] tracking-[0.4em] uppercase px-5 py-2">
          Admin Preview · Draft
        </div>
      )}

      {/* CINEMATIC HERO */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-foreground">
        <div className="absolute inset-0 ls-kenburns">
          {listing.hero_video_url ? (
            <video
              ref={heroVideoRef}
              src={listing.hero_video_url}
              poster={listing.hero_image_url || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : listing.hero_image_url ? (
            <img
              src={listing.hero_image_url}
              alt={listing.title}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          ) : null}
        </div>

        {/* Refined dual-stop overlay — quiet at top, weighted at base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F24]/25 via-transparent to-[#0C0F24]/70" />

        {/* Top hairline meta */}
        <div className="absolute top-24 md:top-28 left-0 right-0 z-10 flex justify-between items-center px-6 md:px-12 text-background/85">
          <p className="text-[10px] tracking-[0.45em] uppercase">Echelon · Private Presentation</p>
          {listing.status && (
            <p className="text-[10px] tracking-[0.45em] uppercase text-gold hidden sm:block">
              {listing.status}
            </p>
          )}
        </div>

        {/* Lockup — bottom-left, restrained */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 text-background">
          <div className="max-w-5xl">
            {listing.neighborhood && (
              <p className="ls-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
                {listing.neighborhood}
              </p>
            )}
            <h1 className="ls-rise-delay-1 font-display text-[2.5rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[0.98] tracking-[-0.01em] mb-6 md:mb-8 max-w-4xl">
              {listing.title}
            </h1>
            <div className="ls-rise-delay-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 max-w-4xl">
              {listing.address && (
                <p className="font-body text-sm md:text-lg opacity-85 max-w-md leading-snug">
                  {listing.address}
                </p>
              )}
              {price && (
                <p className="font-display text-xl md:text-2xl text-background/95 tracking-wide">
                  {price}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hairline scroll cue */}
        <div className="ls-rise-delay-3 absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10">
          <span className="text-[9px] tracking-[0.5em] uppercase text-background/55">Scroll</span>
          <div className="ls-scroll-cue" />
        </div>

        {/* Present button — desktop only, top right */}
        <button
          onClick={() => setPresent(true)}
          className="ls-rise-delay-3 hidden md:inline-flex items-center gap-2 absolute top-24 right-12 z-20 text-[10px] tracking-[0.4em] uppercase text-background/85 hover:text-gold transition-colors"
        >
          <Maximize2 className="w-3 h-3" /> Present
        </button>
      </section>

      {/* QUICK STATS — editorial, not sticky */}
      {stats.length > 0 && <StatsBlock stats={stats} />}

      {/* EDITORIAL INTRO */}
      {(listing.short_intro || listing.full_description) && (
        <IntroBlock short={listing.short_intro} full={listing.full_description} />
      )}

      {/* DYNAMIC STORY SECTIONS */}
      {sections.map((s) => (
        <StorySectionRenderer
          key={s.id}
          section={s}
          media={media}
          listingId={listing.id}
          listingTitle={listing.title}
        />
      ))}

      {/* DEFAULT LEAD CAPTURE if no CTA section */}
      {!sections.some((s) => s.section_type === "cta") && (
        <section className="bg-[#0C0F24] text-background py-28 md:py-40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Inquiries</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-8 tracking-[-0.005em]">
              Request a Private Showing
            </h2>
            <p className="font-body text-[15px] md:text-[17px] opacity-80 mb-12 leading-relaxed">
              Speak directly with the Echelon team about this residence.
            </p>
            <LeadCaptureForm listingId={listing.id} listingTitle={listing.title} variant="dark" />
            {listing.agent_name && (
              <div className="mt-16 pt-10 border-t border-background/15 text-sm tracking-wide opacity-80">
                <p className="font-display text-base">{listing.agent_name}</p>
                {listing.agent_phone && <p className="mt-1">{listing.agent_phone}</p>}
                {listing.agent_email && <p className="mt-1">{listing.agent_email}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mobile sticky CTA — minimal hairline bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-foreground/10 px-4 py-3 flex gap-2 safe-bottom">
        {listing.agent_phone && (
          <a
            href={`tel:${listing.agent_phone.replace(/[^\d+]/g, "")}`}
            className="w-12 inline-flex items-center justify-center border border-foreground/15 text-foreground/80"
            aria-label="Call agent"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
        <a
          href={`mailto:${listing.agent_email || "info@echelonpropertygroup.com"}?subject=${encodeURIComponent("Inquiry: " + listing.title)}`}
          className="flex-1 inline-flex items-center justify-center text-[11px] tracking-[0.35em] uppercase bg-foreground text-background py-3.5"
        >
          Inquire
        </a>
      </div>

      <div className="md:pb-0 pb-20">
        <Footer />
      </div>

      {present && (
        <PresentationMode
          listing={listing}
          sections={sections}
          media={media}
          onClose={() => setPresent(false)}
        />
      )}
    </div>
  );
};

export default ListingStory;
