import { useEffect, useRef, useState, type ReactNode } from "react";

const VIDEO_URL = "/videos/invest-hero.mp4";

interface Props {
  children: ReactNode;
}

const InvestHeroSection = ({ children }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) setUseVideo(true);
  }, []);

  // Play video as soon as it's ready
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = () => {
      video.play().then(() => setVideoReady(true)).catch(() => {
        setTimeout(() => {
          video.muted = true;
          video.play()?.then(() => setVideoReady(true)).catch(() => {});
        }, 800);
      });
    };

    if (video.readyState >= 2) attemptPlay();
    else video.addEventListener("loadeddata", attemptPlay, { once: true });
  }, [useVideo]);

  // Re-play when section scrolls back into view
  useEffect(() => {
    if (!useVideo) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoReady) {
          const video = videoRef.current;
          if (video) { video.currentTime = 0; video.play().catch(() => {}); }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [useVideo, videoReady]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-end overflow-hidden bg-primary"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {useVideo ? (
          <>
            <video
              ref={videoRef}
              className={`w-full h-full object-cover object-top transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster="/images/invest-hero-poster.webp"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
            <img
              src="/images/invest-hero-poster.webp"
              alt=""
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
              loading="eager"
            />
          </>
        ) : (
          <img
            src="/images/mobile-hero-poster.webp"
            alt="Austin investment real estate"
            className="w-full h-full object-cover object-top"
            loading="eager"
            width={828}
            height={1471}
          />
        )}
      </div>

      {children}
    </section>
  );
};

export default InvestHeroSection;
