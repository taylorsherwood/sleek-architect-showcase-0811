import { useEffect, useRef, useState, type ReactNode } from "react";

const POSTER_URL = "/images/hero-poster.jpg";
const VIDEO_URL = "/videos/invest-hero.mp4";

interface Props {
  children: ReactNode;
}

const InvestHeroSection = ({ children }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedOnce = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.playbackRate = 1.5;
    video.play().then(() => {
      setVideoReady(true);
    }).catch(() => {});
  };

  // Play on initial load — wait for enough data buffered
  useEffect(() => {
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

    if (video.readyState >= 3) {
      onReady();
    } else {
      video.addEventListener("canplaythrough", onReady, { once: true });
      return () => video.removeEventListener("canplaythrough", onReady);
    }
  }, []);

  // Re-play when section scrolls into view (after initial load)
  useEffect(() => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-end overflow-hidden bg-primary"
    >
      {/* Poster fallback */}
      <img
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ zIndex: 0 }}
        loading="eager"
      />

      {/* Video background — fades in when ready */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ zIndex: 0, opacity: videoReady ? 1 : 0 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-top"
          muted
          playsInline
          preload="auto"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {children}
    </section>
  );
};

export default InvestHeroSection;
