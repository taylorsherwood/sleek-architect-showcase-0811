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
    <section className="relative overflow-hidden bg-[#0c0f24]">
      {/* Media layer */}
      <div className="absolute inset-0" aria-hidden="true">
        {useVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: "saturate(0.55) brightness(0.72) contrast(0.95)",
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
            className="absolute inset-0 w-full h-full object-contain"
            style={{ filter: "saturate(0.55) brightness(0.72) contrast(0.95)" }}
            loading="eager"
          />
        )}

        {/* Navy wash for depth + readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.62) 0%, rgba(12,15,36,0.48) 45%, rgba(12,15,36,0.72) 100%)",
          }}
        />
        {/* Subtle ivory haze for warmth */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%, rgba(245,243,239,0.18) 0%, rgba(245,243,239,0) 60%)",
          }}
        />
        {/* Fine grain edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="max-w-6xl mx-auto text-center text-[#f5f3ef]">
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
    </section>
  );
};

export default MarketIntelHero;
