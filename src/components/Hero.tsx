import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import heroFallback from "@/assets/hero-fallback.jpg";

const FALLBACK_TIMEOUT = 3000;

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoReady) setShowFallback(true);
    }, FALLBACK_TIMEOUT);

    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setShowFallback(true);
        });
      }
    }

    return () => clearTimeout(timer);
  }, [videoReady]);

  const handleVideoReady = () => {
    setVideoReady(true);
    setShowFallback(false);
  };

  return (
    <section className="relative h-screen flex items-end overflow-hidden bg-black">
      {/* Background video — primary hero media */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoReady}
          onError={() => setShowFallback(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Fallback image — only shown if video fails or times out */}
      {showFallback && !videoReady && (
        <img
          src={heroFallback}
          alt="Austin skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      <div className="absolute inset-0 bg-black/35" />
      
      <div className="relative z-10 container mx-auto px-6 pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p className="text-minimal text-warm-cream/70 mb-6 reveal">
            AUSTIN LUXURY REAL ESTATE EXPERTS
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-warm-cream text-architectural mb-8 reveal">
            Driven by Data,
            <br />
            Defined by
            <br />
            <span className="italic">Results</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-cream/75 font-light max-w-xl mb-10 reveal-delayed" style={{ fontFamily: '"Roboto", sans-serif' }}>
            Austin luxury homes, investment properties, land opportunities, and select commercial real estate — expertly guided by Echelon Property Group across Austin's most coveted neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal-delayed-2">
            <Link
              to="/contact"
              className="inline-block text-minimal bg-warm-cream text-foreground hover:bg-[#0C0F24] hover:text-primary-foreground px-8 py-4 transition-colors duration-300 text-center">
              
              SCHEDULE A CONSULTATION
            </Link>
            <Link
              to="/listings"
              className="inline-block text-minimal border border-warm-cream/50 text-warm-cream hover:bg-warm-cream/10 px-8 py-4 transition-colors duration-300 text-center">
              
              VIEW LISTINGS
            </Link>
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;