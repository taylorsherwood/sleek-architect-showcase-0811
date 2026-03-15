import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroFallback from "@/assets/hero-fallback.jpg";

const FALLBACK_TIMEOUT = 4000;
const RETRY_DELAY = 800;

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
              retry.
              then(() => {
                setVideoReady(true);
                setShowFallback(false);
              }).
              catch(() => {
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
        style={{ zIndex: 0 }}>
        
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className={`hero-bg-video transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          tabIndex={-1}>
          
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {/* Fallback image */}
      {showFallback && !videoReady &&
      <img
        src={heroFallback}
        alt="Austin skyline"
        title="Austin Texas skyline — Echelon Property Group"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }} />

      }

      {/* Cinematic vignette gradient — extended darkness behind text */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 65%),
            linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 35%, transparent 65%),
            radial-gradient(ellipse at 15% 70%, rgba(0,0,0,0.3) 0%, transparent 60%)
          `
        }} />
      

      {/* Content */}
      <div
        className="relative container mx-auto px-6 pt-20 md:pt-28 lg:pt-32"
        style={{ zIndex: 2 }}>
        
        <div
          className="max-w-xl relative"
          style={{
            filter: "drop-shadow(0 0 80px rgba(0,0,0,0.4))"
          }}>
          
          <p
            className="text-warm-cream/60 mb-6 reveal font-medium"
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              textShadow: "0 1px 8px rgba(0,0,0,0.5)"
            }}>
            
            STRATEGIC AUSTIN REAL ESTATE ADVISORY
          </p>

          <h1
            className="font-display font-light text-warm-cream text-architectural mb-10 reveal"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
              lineHeight: 1.15,
              textShadow: "0px 3px 10px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.3)"
            }}>
            
            Driven By Data,
            <br />
            <span className="italic">Proven by Results</span>
          </h1>

          {/* Service pillars */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-7 reveal-delayed">
            {[
            "Luxury Homes",
            "Private Investments",
            "Development Opportunities"].
            map((item, i) =>
            <span key={item} className="flex items-center gap-4">
                <span
                className="text-warm-cream/90 font-medium"
                style={{
                  fontFamily: '"Raleway", sans-serif',
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  textShadow: "0 1px 4px rgba(0,0,0,0.3)"
                }}>
                
                  {item}
                </span>
                {i < 2 &&
              <span className="text-warm-cream/40 text-xs">•</span>
              }
              </span>
            )}
          </div>

          <p
            className="text-warm-cream/70 max-w-lg mb-14 reveal-delayed leading-relaxed font-semibold"
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontSize: "1.05rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.30)"
            }}>
            
            Data-driven strategy and discreet representation across Austin's
            most sought-after neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 reveal-delayed-2">
            <Link
              to="/contact"
              className="hero-cta-btn inline-block bg-warm-cream text-foreground px-9 py-4 text-center transition-all duration-200 ease-out hover:bg-gold hover:text-primary-foreground"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600
              }}>
              
              Schedule a Consultation
            </Link>
            <Link
              to="/listings"
              className="hero-cta-btn inline-block border border-warm-cream/40 text-warm-cream px-9 py-4 text-center transition-all duration-200 ease-out hover:bg-warm-cream/10 hover:border-warm-cream/60"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500
              }}>
              
              View Listings
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-scroll-indicator"
        style={{ zIndex: 2 }}>
        
        <ChevronDown
          className="text-warm-cream/40"
          size={20}
          strokeWidth={1.5} />
        
        <span
          className="text-warm-cream/35 font-medium"
          style={{
            fontFamily: '"Raleway", sans-serif',
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase"
          }}>
          
          Discover Austin
        </span>
      </div>
    </section>);

};

export default Hero;