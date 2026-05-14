import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronDown, Play, Maximize2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useListing } from "@/hooks/useListing";
import { useAuth } from "@/hooks/useAuth";
import StorySectionRenderer from "@/components/listing-story/StorySectionRenderer";
import LeadCaptureForm from "@/components/listing-story/LeadCaptureForm";
import PresentationMode from "@/components/listing-story/PresentationMode";

const SITE_URL = "https://www.echelonpropertygroup.com";

const formatPrice = (p: number | null | undefined) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

const ListingStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { listing, sections, media, loading, notFound } = useListing(slug);
  const { isAdmin } = useAuth();
  const [present, setPresent] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // iOS-friendly video autoplay
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [listing?.hero_video_url]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Echelon Property Group</p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">Listing Not Found</h1>
          <p className="text-muted-foreground mb-8">This presentation is unavailable or has been retired.</p>
          <Link
            to="/listings"
            className="inline-block text-xs tracking-[0.3em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors"
          >
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
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Private Preview</p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">
            Not Available for Public Viewing
          </h1>
          <p className="text-muted-foreground mb-8 font-body">
            This presentation is currently being prepared by the Echelon team.
          </p>
          <Link
            to="/contact"
            className="inline-block text-xs tracking-[0.3em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors"
          >
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
      ? {
          "@type": "Offer",
          price: listing.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    numberOfBedrooms: listing.beds || undefined,
    numberOfBathroomsTotal: listing.baths || undefined,
    floorSize: listing.sqft
      ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" }
      : undefined,
  };

  return (
    <div className="min-h-screen bg-background">
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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background text-[10px] tracking-[0.3em] uppercase px-4 py-2">
          Admin Preview · Draft
        </div>
      )}

      {/* CINEMATIC HERO */}
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-foreground">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F24]/30 via-[#0C0F24]/10 to-[#0C0F24]/75" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 text-background animate-fade-in-up">
          <div className="max-w-4xl">
            {listing.status && (
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold mb-4">
                {listing.status}
              </p>
            )}
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-4 md:mb-6">
              {listing.title}
            </h1>
            {listing.address && (
              <p className="font-body text-base md:text-xl opacity-90 mb-2">{listing.address}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
              {price && <p className="font-display text-xl md:text-2xl text-gold">{price}</p>}
              {listing.neighborhood && (
                <p className="text-xs md:text-sm tracking-[0.25em] uppercase opacity-75">
                  {listing.neighborhood}
                </p>
              )}
            </div>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 flex gap-3">
            <button
              onClick={() => setPresent(true)}
              className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase border border-background/40 px-4 py-3 hover:border-gold hover:text-gold transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Present
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-background/70">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      {stats.length > 0 && (
        <section className="border-b border-foreground/10 bg-background sticky top-[64px] z-30 backdrop-blur supports-[backdrop-filter]:bg-background/85">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-foreground/10">
              {stats.map((s) => (
                <div key={s.label} className="py-5 md:py-7 px-3 md:px-6 text-center">
                  <p className="font-display text-xl md:text-3xl text-architectural">{s.value}</p>
                  <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL INTRO */}
      {(listing.short_intro || listing.full_description) && (
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-6">
              The Residence
            </p>
            {listing.short_intro && (
              <h2 className="font-display text-3xl md:text-5xl leading-[1.15] text-architectural mb-8">
                {listing.short_intro}
              </h2>
            )}
            {listing.full_description && (
              <div className="font-body text-base md:text-lg leading-[1.85] text-foreground/85 whitespace-pre-line">
                {listing.full_description}
              </div>
            )}
          </div>
        </section>
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
        <section className="bg-[#0C0F24] text-background py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Inquiries
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-6">
              Request a Private Showing
            </h2>
            <p className="font-body text-base md:text-lg opacity-85 mb-10">
              Speak directly with the Echelon team about this residence.
            </p>
            <LeadCaptureForm listingId={listing.id} listingTitle={listing.title} />
            {listing.agent_name && (
              <div className="mt-12 pt-10 border-t border-background/15 text-sm tracking-wide opacity-80">
                <p className="font-display text-base">{listing.agent_name}</p>
                {listing.agent_phone && <p>{listing.agent_phone}</p>}
                {listing.agent_email && <p>{listing.agent_email}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-foreground/10 px-4 py-3 flex gap-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPresent(true);
          }}
          className="flex-1 inline-flex items-center justify-center text-[11px] tracking-[0.25em] uppercase border border-foreground/20 py-3"
        >
          <Play className="w-3.5 h-3.5 mr-2" /> Present
        </a>
        <a
          href={`mailto:${listing.agent_email || "info@echelonpropertygroup.com"}`}
          className="flex-1 inline-flex items-center justify-center text-[11px] tracking-[0.25em] uppercase bg-foreground text-background py-3"
        >
          Inquire
        </a>
      </div>

      <div className="md:pb-0 pb-16">
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
