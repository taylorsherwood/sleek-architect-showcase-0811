import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import heroFallback from "@/assets/hero-fallback.jpg";

const FALLBACK_TIMEOUT = 4000;
const RETRY_DELAY = 800;

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy-load: set video src after initial render
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setShowFallback(true);
      return;
    }
    requestAnimationFrame(() => {
      setVideoSrc("/videos/hero-video.mp4");
    });
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) {
      setShowFallback(true);
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const fallbackTimer = setTimeout(() => {
      if (!videoReady) setShowFallback(true);
    }, FALLBACK_TIMEOUT);

    const attemptPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          setVideoReady(true);
          setShowFallback(false);
        }).catch(() => {
          setTimeout(() => {
            video.muted = true;
            video.defaultMuted = true;
            const retry = video.play();
            if (retry !== undefined) {
              retry
                .then(() => {
                  setVideoReady(true);
                  setShowFallback(false);
                })
                .catch(() => {
                  setShowFallback(true);
                });
            } else {
              setShowFallback(true);
            }
          }, RETRY_DELAY);
        });
      } else {
        setShowFallback(true);
      }
    };

    const onReady = () => attemptPlay();

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", onReady);
    }

    video.addEventListener("error", () => setShowFallback(true));

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadeddata", onReady);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Decorative background video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className={`hero-bg-video transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          tabIndex={-1}
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {/* Fallback image */}
      {showFallback && !videoReady && (
        <img
          src={heroFallback}
          alt="Austin skyline"
          title="Austin Texas skyline — Echelon Property Group"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/15"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="relative container mx-auto px-6 pt-16 md:pt-20"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-3xl">
          <p
            className="text-minimal text-warm-cream/70 mb-3 reveal"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            STRATEGIC AUSTIN REAL ESTATE ADVISORY
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-warm-cream text-architectural mb-8 reveal"
            style={{
              textShadow:
                "0 2px 20px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Driven By Data,
            <br />
            <span className="italic">Proven by Results</span>
          </h1>

          {/* Service pillars */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 reveal-delayed">
            {["Luxury Homes", "Investment Property", "Development Land"].map(
              (item, i) => (
                <span key={item} className="flex items-center gap-3">
                  <span
                    className="text-sm md:text-base text-warm-cream/80 font-light"
                    style={{
                      fontFamily: '"Raleway", sans-serif',
                      textShadow: "0 1px 6px rgba(0,0,0,0.3)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item}
                  </span>
                  {i < 2 && (
                    <span className="text-gold/50 text-sm">•</span>
                  )}
                </span>
              ),
            )}
          </div>

          <p
            className="text-base md:text-lg text-warm-cream/70 font-light max-w-xl mb-10 reveal-delayed leading-relaxed"
            style={{
              fontFamily: '"Raleway", sans-serif',
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            Data-driven strategy and discreet representation across Austin's
            most sought-after neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 reveal-delayed-2">
            <Link
              to="/contact"
              className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-4 transition-colors duration-300 text-center"
            >
              SCHEDULE A CONSULTATION
            </Link>
            <Link
              to="/listings"
              className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300 text-center"
            >
              VIEW LISTINGS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
