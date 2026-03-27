import { useEffect, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let loaded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          observer.disconnect();
          if (!document.getElementById("EmbedSocialHashtagScript")) {
            const script = document.createElement("script");
            script.id = "EmbedSocialHashtagScript";
            script.async = true;
            script.src = "https://embedsocial.com/cdn/ht.js";
            document.head.appendChild(script);
          }
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="hidden md:block pt-16 pb-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
              @TheInvestorBroker
            </p>
            <h2 className="text-4xl font-display font-light text-foreground mb-3">
              Follow Us on Instagram
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
          <div className="text-center mt-12">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-metallic-text gold-underline-hover inline-block px-10 py-2.5 text-[0.6rem] tracking-[0.22em] uppercase"
            >
              View More on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
