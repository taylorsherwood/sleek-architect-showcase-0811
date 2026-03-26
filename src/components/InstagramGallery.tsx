import { useEffect } from "react";

/**
 * ─── INSTAGRAM CONFIGURATION ───────────────────────────────────────────
 *
 * PROFILE URL — Update this to your Instagram profile:
 */
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/theinvestorbroker";

/**
 * EMBEDSOCIAL — The data-ref below powers the live feed.
 * To change the feed or number of posts, update settings in your
 * EmbedSocial dashboard → Widgets → Layout/Design.
 * Set "Number of posts" to 4 in the dashboard for best results.
 */
const EMBEDSOCIAL_REF = "6fd82b336784d0fdcec3ce38de6cf04c6cec4621";

const InstagramGallery = () => {
  useEffect(() => {
    if (!document.getElementById("EmbedSocialHashtagScript")) {
      const script = document.createElement("script");
      script.id = "EmbedSocialHashtagScript";
      script.src = "https://embedsocial.com/cdn/ht.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="hidden md:block pt-8 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
              @TheInvestorBroker
            </p>
            <h2 className="text-4xl font-display font-light text-foreground mb-3">
              Follow Echelon on Instagram
            </h2>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              Market moments, new listings, Austin lifestyle, and behind-the-scenes perspective from Echelon Property Group.
            </p>
          </div>

          {/* Live EmbedSocial Feed */}
          <div className="instagram-feed-wrapper">
            <div
              className="embedsocial-hashtag"
              data-ref={EMBEDSOCIAL_REF}
            />
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
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
