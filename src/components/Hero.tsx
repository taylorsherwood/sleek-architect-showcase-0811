import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <section id="hero-section" className="relative h-screen flex items-center overflow-hidden bg-primary">
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
          preload="none"
          poster="/images/hero-poster.jpg"
          className={`hero-bg-video transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"}`
          }
          style={{ filter: "brightness(0.8) contrast(1.1)" }}
          tabIndex={-1}>
          
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {/* Fallback image — uses hero poster (already preloaded), no extra import */}
      {showFallback && !videoReady &&
      <img
        src="/images/hero-poster.jpg"
        alt="Austin Texas skyline at sunset with downtown high-rises and Hill Country backdrop"
        title="Austin Texas skyline — Echelon Property Group luxury real estate"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
                    loading="lazy" decoding="async"
                    />
      }

      {/* Layered cinematic gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35) 100%)
          `
        }} />
      

      {/* Content */}
      <div
        className="relative container mx-auto px-6 pt-24 md:pt-32 lg:pt-36"
        style={{ zIndex: 2 }}>
        
        <div
          className="max-w-[640px] relative"
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
              textShadow: "0 0 20px rgba(12,15,36,0.7), 0 0 40px rgba(12,15,36,0.5), 0 1px 6px rgba(0,0,0,0.4)"
            }}>
            
            STRATEGIC AUSTIN REAL ESTATE ADVISORY
          </p>

          <h1
            className="font-display font-medium text-warm-cream mb-9 reveal"
            style={{
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              textShadow: "0 2px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.2)"
            }}>
            
            <span className="whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 5.2vw, 5.2rem)" }}>Driven By Data,</span>
            <br />
            <span className="italic whitespace-nowrap" style={{ fontSize: "clamp(3.1rem, 6.4vw, 6.4rem)" }}>Proven by Results</span>
          </h1>

          {/* Service pillars */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5 reveal-delayed">
            {["Residential", "Investment", "Development"].map(
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
                <span className="text-[9px] text-white/50" style={{ textShadow: "0 0 6px rgba(255,255,255,0.25)" }}>●</span>
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
              textShadow: "0 2px 12px rgba(0,0,0,0.55)"
            }}>
            
            Data-driven strategy and discreet representation across Austin's
            most sought-after neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 reveal-delayed-2">
            <Link
              to="/invest"
              className="hero-cta-btn inline-block bg-warm-cream text-foreground px-12 py-[1.1rem] text-center hover:bg-primary hover:text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 700
              }}>
              
              EXPLORE OPPORTUNITIES
            </Link>
            <Link
              to="/off-market-real-estate-austin"
              className="hero-cta-btn inline-block bg-transparent border border-warm-cream/25 text-warm-cream/75 px-10 py-[1.1rem] text-center hover:bg-gold hover:text-white hover:border-gold hover:font-bold transition-all duration-300"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 400
              }}>
              
              PRIVATE ACCESS
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