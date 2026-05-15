import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useListing } from "@/hooks/useListing";
import { useAuth } from "@/hooks/useAuth";
import FlipbookStory from "@/components/listing-story/FlipbookStory";

const SITE_URL = "https://www.echelonpropertygroup.com";

const formatPrice = (p: number | null | undefined) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

const ListingStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { listing, sections, media, loading, notFound } = useListing(slug);
  const { isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0F24] flex items-center justify-center">
        <p className="text-background/60 text-[10px] tracking-[0.4em] uppercase">
          Loading Presentation
        </p>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-32 text-center px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
            Echelon Property Group
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">
            Listing Not Found
          </h1>
          <p className="text-muted-foreground mb-10 font-body">
            This presentation is unavailable or has been retired.
          </p>
          <Link
            to="/listings"
            className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors"
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
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
            Private Preview
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-architectural mb-6">
            Not Available for Public Viewing
          </h1>
          <p className="text-muted-foreground mb-10 font-body">
            This presentation is currently being prepared by the Echelon team.
          </p>
          <Link
            to="/contact"
            className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors"
          >
            Request Access
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const price = formatPrice(listing.price);
  const canonical = `${SITE_URL}/listing/${listing.slug}`;
  const metaTitle = listing.meta_title || listing.title;
  const metaDesc =
    listing.meta_description ||
    listing.short_intro ||
    `${listing.title} — ${listing.address || listing.neighborhood || ""}. Presented by Echelon Property Group.`;
  const ogImage =
    listing.og_image_url || listing.hero_image_url || `${SITE_URL}/og-image.png`;

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
    <>
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

      {/* Hidden SEO-friendly content for crawlers — the visible
          experience is the full-screen flipbook. */}
      <div className="sr-only" aria-hidden="false">
        <h1>{listing.title}</h1>
        {listing.address && <p>{listing.address}</p>}
        {listing.neighborhood && <p>{listing.neighborhood}</p>}
        {price && <p>{price}</p>}
        {listing.short_intro && <p>{listing.short_intro}</p>}
        {listing.full_description && (
          <p style={{ whiteSpace: "pre-line" }}>{listing.full_description}</p>
        )}
        <ul>
          {listing.beds && <li>{listing.beds} Bedrooms</li>}
          {listing.baths && <li>{listing.baths} Bathrooms</li>}
          {listing.sqft && <li>{listing.sqft.toLocaleString()} Square Feet</li>}
          {listing.acres && <li>{listing.acres} Acres</li>}
          {listing.year_built && <li>Built {listing.year_built}</li>}
        </ul>
        {sections
          .filter((s) => s.is_visible)
          .map((s) => (
            <section key={s.id}>
              {s.eyebrow && <p>{s.eyebrow}</p>}
              {s.title && <h2>{s.title}</h2>}
              {s.body && <p style={{ whiteSpace: "pre-line" }}>{s.body}</p>}
            </section>
          ))}
        {listing.agent_name && (
          <address>
            {listing.agent_name}
            {listing.agent_phone && ` · ${listing.agent_phone}`}
            {listing.agent_email && ` · ${listing.agent_email}`}
          </address>
        )}
        <p>Echelon Property Group · Texas Real Estate Commission Information</p>
      </div>

      {!listing.is_published && isAdmin && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[120] bg-foreground text-background text-[10px] tracking-[0.4em] uppercase px-5 py-2">
          Admin Preview · Draft
        </div>
      )}

      <FlipbookStory listing={listing} sections={sections} media={media} />
    </>
  );
};

export default ListingStory;
