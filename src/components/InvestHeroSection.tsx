import { useEffect, useRef, useState, type ReactNode } from "react";

const VIDEO_URL = "/videos/invest-hero.mp4";

interface Props {
  children: ReactNode;
}

const InvestHeroSection = ({ children }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedOnce = useRef(false);
  const [useVideo, setUseVideo] = useState(false);

  // Skip video on mobile to save bandwidth
  useEffect(() => {
    if (window.innerWidth >= 768) setUseVideo(true);
  }, []);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.playbackRate = 1;
    video.play().catch(() => {});
  };

  // Play as soon as possible on initial load
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const onReady = () => {
      if (!hasPlayedOnce.current) {
        hasPlayedOnce.current = true;
        playVideo();
      }
    };

    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener("loadeddata", onReady, { once: true });
      return () => video.removeEventListener("loadeddata", onReady);
    }
  }, [useVideo]);

  // Re-play when section scrolls into view
  useEffect(() => {
    if (!useVideo) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasPlayedOnce.current) {
          playVideo();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [useVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-end overflow-hidden bg-primary"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {useVideo ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-top"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/images/invest-hero-poster.webp"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/invest-hero-poster.webp"
            alt="Austin investment real estate"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        )}
      </div>

      {children}
    </section>
  );
};

export default InvestHeroSection;
