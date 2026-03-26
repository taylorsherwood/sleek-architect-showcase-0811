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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-light text-foreground mb-4">
              Follow Echelon on Instagram
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Market moments, new listings, Austin lifestyle, and behind-the-scenes perspective from Echelon Property Group.
            </p>
          </div>

          {/* Grid — 6 tiles: 3 cols desktop, 2 cols tablet & mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-muted"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-primary-foreground text-xs tracking-[0.15em] uppercase">
                    <Instagram className="w-4 h-4" />
                    View Post
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            {/* ── Update href to your Instagram profile URL ── */}
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-3 text-xs tracking-[0.15em] uppercase border border-foreground/20 text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
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
