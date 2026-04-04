import { useEffect, useRef, useState } from "react";

/**
 * ─── INSTAGRAM CONFIGURATION ───────────────────────────────────────────
 */
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/theinvestorbroker";
const EMBEDSOCIAL_REF = "6fd82b336784d0fdcec3ce38de6cf04c6cec4621";

const InstagramGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    // Inject the script only once the user has triggered loading
    if (!document.getElementById("EmbedSocialHashtagScript")) {
      const script = document.createElement("script");
      script.id = "EmbedSocialHashtagScript";
      script.async = true;
      script.src = "https://embedsocial.com/cdn/ht.js";
      document.head.appendChild(script);
    }
  }, [loaded]);

  // Lazy-trigger: load when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section ref={sectionRef} className="hidden md:block pt-10 pb-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              @TheInvestorBroker
            </p>
            <h3 className="text-4xl font-display font-normal text-foreground mb-3">
              Follow Us on Instagram
            </h3>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              Market moments, new listings, Austin lifestyle, and behind-the-scenes perspective from Echelon Property Group.
            </p>
          </div>

          {/* Feed area */}
          <div className="instagram-feed-wrapper">
            {loaded ? (
              <div
                className="embedsocial-hashtag"
                data-ref={EMBEDSOCIAL_REF}
              />
            ) : (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-gold border-t-gold rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
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
