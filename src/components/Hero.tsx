import { useState, useRef, useEffect } from "react";

const FALLBACK_TIMEOUT = 4000;
const RETRY_DELAY = 800;

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Re-trigger text animation when hero scrolls back into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setShowFallback(true);
      return;
    }
    // Delay video load until after first paint + initial render settle
    const id = setTimeout(() => setVideoSrc("/videos/hero-video.mp4"), 150);
    return () => clearTimeout(id);
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
          video.playbackRate = 0.85;
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
                video.playbackRate = 0.85;
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
    <section ref={sectionRef} id="hero-section" className="relative h-screen flex items-center overflow-hidden bg-[hsl(var(--black-soft))]">
      {/* ── VIDEO LAYER ── */}
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
          className={`hero-bg-video ${videoReady ? "opacity-100" : "opacity-0"}`}
          width={1920}
          height={1080}
          tabIndex={-1}>
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {/* Fallback image */}
      {showFallback && !videoReady &&
      <img
        src="/images/hero-poster.jpg"
        alt="Austin Texas skyline at sunset with downtown high-rises and Hill Country backdrop"
        title="Austin Texas skyline — Echelon Property Group luxury real estate"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        loading="eager"
        width={1920}
        height={1080}
      />
      }

      {/* ── CONTENT LAYER — positioned ~6% higher ── */}
      <div
        className="relative container mx-auto"
        style={{
          zIndex: 2,
          paddingLeft: "clamp(32px, 6vw, 96px)",
          paddingRight: "24px",
          paddingTop: "clamp(64px, 8vh, 120px)",
          marginTop: "-6vh",
        }}>
        <div style={{ maxWidth: "620px" }}>
          
          <p
            className="text-warm-cream/55 mb-6 font-bold"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease 0s, transform 1s ease 0s",
              fontFamily: '"Jost", sans-serif',
              fontSize: "0.65rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(12,15,36,0.7), 0 0 40px rgba(12,15,36,0.5), 0 1px 6px rgba(0,0,0,0.4)"
            }}>
            AUSTIN REAL ESTATE ADVISORY
          </p>

          <h1
            className="font-display text-warm-cream"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1.4s ease 0.2s, transform 1.4s ease 0.2s",
              fontSize: "clamp(38px, 4.5vw, 68px)",
              lineHeight: 1.08,
              letterSpacing: "0.02em",
              fontWeight: 500,
              maxWidth: "620px",
              marginBottom: "28px",
              textShadow: "0 2px 9px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.2)"
            }}>
            Access Austin's Most<br />
            Exclusive Homes
          </h1>

          {/* Service pillars */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            }}>
            {["Residential", "Investment", "Development"].map(
              (item, i) =>
              <span key={item} className="flex items-center gap-5">
                <span
                  className="text-warm-cream/85"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    fontWeight: 400,
                    textShadow: "0px 1px 6px rgba(0,0,0,0.35)"
                  }}>
                  {item}
                </span>
                {i < 2 &&
                  <span className="text-[9px] text-white/50">●</span>
                }
              </span>
            )}
          </div>

          <p
            className="max-w-[500px]"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(245, 243, 239, 0.78)",
              letterSpacing: "0.045em",
              lineHeight: 1.75,
              marginTop: "24px",
              marginBottom: "0",
              textShadow: "0 2px 9px rgba(0,0,0,0.55)"
            }}>
            Data-driven strategy and discreet representation across Austin's
            most sought-after neighborhoods.
          </p>

          {/* ── CTA BUTTONS ── */}
          <div className="hero-ctas flex flex-row gap-6 items-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease 0.45s, transform 1s ease 0.45s",
              marginTop: "40px",
            }}>
            <a
              href="/invest"
              className="hero-cta-gold inline-flex items-center justify-center whitespace-nowrap"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 400,
                padding: "14px 30px",
                minWidth: "200px",
                maxWidth: "260px",
                width: "fit-content",
              }}>
              EXPLORE OPPORTUNITIES
            </a>
            <a
              href="/off-market-real-estate-austin"
              className="hero-cta-light inline-flex items-center justify-center whitespace-nowrap"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 400,
                padding: "13px 28px",
                minWidth: "200px",
                maxWidth: "260px",
                width: "fit-content",
              }}>
              PRIVATE ACCESS
            </a>
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
            fontFamily: '"Jost", sans-serif',
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
