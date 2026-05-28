import { useEffect, useRef, useState } from "react";

const VIDEO_URL = "/videos/market-intelligence-hero.mp4";
const POSTER_URL = "/images/market-intelligence-hero-poster.jpg";

/**
 * Restrained atmospheric hero for /market-intelligence.
 * Footage sits behind the editorial copy as quiet cinematic texture:
 * desaturated, darkened, ivory/navy wash, slow playback, no obvious loop seam.
 */
const MarketIntelHero = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    // Only attempt video on larger viewports & when motion is allowed
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced && window.innerWidth >= 768) setUseVideo(true);
  }, []);

  useEffect(() => {
    if (!useVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playbackRate = 0.7; // slow, elegant
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("loadeddata", play, { once: true });
  }, [useVideo]);

  return (
    <section className="relative overflow-hidden bg-[#0c0f24] min-h-[500px] sm:min-h-[560px] md:min-h-[576px] lg:h-[656px] xl:h-[688px] 2xl:h-[704px] flex flex-col justify-center">
      {/* Media layer — full bleed */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {useVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center top",
              filter: "saturate(0.7) brightness(0.88) contrast(1.08)",
            }}
            poster={POSTER_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={POSTER_URL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top", filter: "saturate(0.7) brightness(0.7) contrast(1.05)" }}
            loading="eager"
          />
        )}

        {/* Navy wash for depth + readability — lighter on mobile */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.58) 0%, rgba(12,15,36,0.4) 50%, rgba(12,15,36,0.62) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.38) 0%, rgba(12,15,36,0.22) 45%, rgba(12,15,36,0.48) 100%)",
          }}
        />
        {/* Cinematic clarity layer — desktop only, subtle contrast lift */}
        <div
          className="absolute inset-0 mix-blend-overlay hidden md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.12) 100%)",
          }}
        />
        {/* Fine grain edge vignette — desktop only */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "radial-gradient(100% 70% at 50% 50%, transparent 60%, rgba(0,0,0,0.32) 100%)",
          }}
        />
      </div>

      {/* Content — centered vertically; tighter padding on mobile */}
      <div className="relative z-10 pt-36 pb-10 md:pt-16 md:pb-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto text-center text-[#f5f3ef] max-w-3xl">
            {children}
          </div>
        </div>
      </div>


      {/* Architectural handoff — thin tonal step into the page */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.35) 70%, hsl(var(--background)) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Hairline rule to anchor the transition */}
      <div
        className="absolute inset-x-0 bottom-0 z-[6] pointer-events-none"
        style={{ height: 1, background: "rgba(245,243,239,0.08)" }}
        aria-hidden="true"
      />

      {/* Animated gold scroll cue — hidden on mobile to save vertical space */}
      <button
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
        }}
        aria-label="Scroll to market intelligence"
        className="hero-scroll-cue absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 group cursor-pointer z-[7]"
      >
        <span
          className="group-hover:text-white transition-colors duration-500"
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: "0.75rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "hsl(var(--warm-cream))",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          Explore Intelligence
        </span>
        <span className="hero-scroll-track relative block w-[1px] h-12 md:h-16 overflow-hidden bg-[hsl(var(--gold))]/20">
          <span className="hero-scroll-bar absolute top-0 left-0 w-full h-1/2 bg-[hsl(var(--gold))]" />
        </span>
      </button>
    </section>
  );
};

export default MarketIntelHero;
