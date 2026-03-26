import { Instagram } from "lucide-react";

/**
 * ─── INSTAGRAM CONFIGURATION ───────────────────────────────────────────
 *
 * PROFILE URL — Update the href below to your Instagram profile:
 */
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/theinvestorbroker";

/**
 * POST DATA — Replace placeholder images and links below.
 * Each entry needs:
 *   - image: URL or import path for the thumbnail
 *   - postUrl: direct link to the Instagram post
 *   - alt: brief description for accessibility
 *
 * For a future live feed integration, replace the `posts` array
 * with data fetched from the Instagram Basic Display API or a
 * third-party service, keeping the same shape.
 * ────────────────────────────────────────────────────────────────────────
 */
const posts = [
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "Austin luxury listing exterior",
  },
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "Hill Country sunset view",
  },
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "Interior design detail",
  },
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "Barton Creek lifestyle",
  },
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "New listing announcement",
  },
  {
    image: "/placeholder.svg",
    postUrl: `${INSTAGRAM_PROFILE_URL}`,
    alt: "Austin skyline at dusk",
  },
];

const InstagramGallery = () => {
  return (
    <section className="pt-4 pb-12 md:pt-8 md:pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[0.65rem] md:text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
              @TheInvestorBroker
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-light text-foreground mb-3">
              Follow Echelon on Instagram
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              Market moments, new listings, Austin lifestyle, and behind-the-scenes perspective from Echelon Property Group.
            </p>
          </div>

          {/* Grid — 6 tiles: 3 cols desktop, 2 cols tablet & mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] md:gap-[3px]">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-muted/40"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Hover overlay — subtle darken with centered icon */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-primary-foreground opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 md:mt-10">
            {/* ── Update href to your Instagram profile URL ── */}
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-2.5 text-[0.65rem] tracking-[0.18em] uppercase border border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-all duration-300"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
