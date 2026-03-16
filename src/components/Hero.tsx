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
    <section className="relative h-screen flex items-center overflow-hidden bg-primary">
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
          className={`hero-bg-video transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"}`
          }
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

      {/* Cinematic vignette gradient */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.42) 22%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 68%),
            linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 40%, transparent 70%),
            radial-gradient(ellipse at 15% 70%, rgba(0,0,0,0.25) 0%, transparent 55%)
          `
        }} />
      


      {/* Content */}
      <div
        className="relative container mx-auto px-6 pt-24 md:pt-32 lg:pt-36"
        style={{ zIndex: 2 }}>
        
        <div
          className="max-w-xl relative"
          style={{
            filter: "drop-shadow(0 0 60px rgba(0,0,0,0.3))"
          }}>
          
          <p
            className="text-warm-cream/55 mb-6 reveal font-medium"
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontSize: "0.65rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              textShadow: "0 1px 6px rgba(0,0,0,0.4)"
            }}>
            
            STRATEGIC AUSTIN REAL ESTATE ADVISORY
          </p>

          <h1
            className="font-display font-light text-warm-cream mb-9 reveal"
            style={{
              fontSize: "clamp(2.8rem, 5.8vw, 5.8rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              textShadow:
              "0px 2px 8px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)"
            }}>
            
            <span className="whitespace-nowrap">Driven By Data,</span>
            <br />
            <span className="italic whitespace-nowrap">Proven by Results</span>
          </h1>

          {/* Service pillars */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5 reveal-delayed">
            {["Luxury Homes", "Private Investments", "Development Opportunities"].map(
              (item, i) =>
              <span key={item} className="flex items-center gap-5">
                  <span
                  className="text-warm-cream/85 font-medium"
                  style={{
                    fontFamily: '"Raleway", sans-serif',
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    fontWeight: 400,
                    textShadow: "0px 1px 6px rgba(0,0,0,0.35)"
                  }}>
                  
                    {item}
                  </span>
                  {i < 2 &&
                <span className="text-warm-cream/25 text-[6px]">•</span>
                }
                </span>

            )}
          </div>

          <p
            className="text-warm-cream/60 max-w-lg mb-10 reveal-delayed leading-relaxed font-medium"
            style={{
              fontFamily: '"Raleway", sans-serif',
              fontSize: "1rem",
              letterSpacing: "0.01em",
              textShadow: "0px 1px 4px rgba(0,0,0,0.25)"
            }}>
            
            Data-driven strategy and discreet representation across Austin's
            most sought-after neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 reveal-delayed-2">
            <Link
              to="/listings"
              className="hero-cta-btn inline-block bg-warm-cream text-foreground px-12 py-[1.1rem] text-center hover:bg-gold hover:text-white"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 700
              }}>
              
              Explore Listings
            </Link>
            <Link
              to="/contact"
              className="hero-cta-btn inline-block border border-warm-cream/25 text-warm-cream/75 px-10 py-[1.1rem] text-center hover:bg-white hover:text-[#0C0F24] hover:border-white hover:font-bold transition-all duration-300"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 400
              }}>
              
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>


      {/* Scroll indicator */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{ zIndex: 3 }}>
        
        <span
          className="text-warm-cream font-light"
          style={{
            fontFamily: '"Raleway", sans-serif',
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase"
          }}>
          
          Discover Austin
        </span>
        <div className="scroll-indicator-line" />
      </div>
    </section>);

};

export default Hero;