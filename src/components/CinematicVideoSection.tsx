import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VIDEO_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/q_90,br_8m,f_mp4/My_Movie_4_gxjr7u";

const POSTER_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/so_2,f_jpg,q_90/My_Movie_4_gxjr7u";

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(10px)",
  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

const CinematicVideoSection = () => {
  const { ref, visible } = useScrollReveal(0.08);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!visible || !video) return;

    // iOS Safari needs the video to be loaded before play() works
    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
      // Trigger load since preload may be "none"
      video.load();
      return () => video.removeEventListener("canplay", attemptPlay);
    }
  }, [visible]);

  return (
    <section ref={ref} className="relative" style={{ margin: 0, padding: 0 }}>
      {/* Full-bleed cinematic video background */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(560px, 95vh, 95vh)" }}>
        {/* Video layer */}
        <div
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            poster={POSTER_URL}
            muted
            loop
            playsInline
            preload="none"
          >
            {visible && <source src={VIDEO_URL} type="video/mp4" />}
          </video>
        </div>

        {/* Subtle bottom gradient — warm charcoal */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(10, 10, 8, 0.12) 0%, rgba(10, 10, 8, 0.04) 40%, transparent 100%)",
          }}
        />
        {/* Left-side localized text protection gradient — hidden on mobile */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none hidden sm:block"
          style={{
            background: "linear-gradient(to right, rgba(10, 12, 18, 0.68) 0%, rgba(10, 12, 18, 0.45) 22%, rgba(10, 12, 18, 0.18) 40%, transparent 55%)",
          }}
        />
        {/* Full-screen overlay on mobile only for text readability */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none sm:hidden"
          style={{
            background: "rgba(10, 12, 18, 0.45)",
          }}
        />

        {/* Content — left-aligned, vertically centered (slightly above) */}
        <div
          className="absolute inset-0 z-10 flex items-center"
          style={{ marginTop: "-3vh" }}
        >
          <div className="w-full px-8 sm:px-12 md:px-16 lg:px-20 xl:px-28">
            <div className="max-w-[560px]">
              {/* Eyebrow */}
              <p
                className="text-minimal text-gold mb-6 font-extrabold"
                style={reveal(visible, 0)}
              >
                IMAGE IN MOTION
              </p>

              {/* Headline */}
              <h2
                className="font-display font-medium leading-[0.95] mb-2"
                style={{
                  ...reveal(visible, 120),
                  color: "#F5F5F5",
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.02em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
              >
                Luxury Marketing
              </h2>
              <p
                className="font-display font-normal leading-[0.95] mb-8"
                style={{
                  ...reveal(visible, 200),
                  color: "rgba(245, 245, 245, 0.7)",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
                  letterSpacing: "0.03em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
              >
                That <em className="italic">Moves</em> Buyers
              </p>

              {/* Power line */}
              <p
                className="text-sm font-medium mb-5"
                style={{
                  ...reveal(visible, 300),
                  color: "rgba(245, 245, 245, 0.85)",
                  letterSpacing: "0.12em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
              >
                Most agents list. We position.
              </p>

              {/* Subheadline */}
              <p
                className="text-[15px] leading-[1.9] max-w-[26rem] mb-10"
                style={{
                  ...reveal(visible, 380),
                  color: "rgba(245, 245, 245, 0.75)",
                  letterSpacing: "0.02em",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 0 12px rgba(0,0,0,0.3)",
                }}
              >
                Cinematic presentation is part of how we position exceptional
                homes to stand apart, attract attention, and drive stronger
                perceived value.
              </p>

              {/* CTA */}
              <div style={reveal(visible, 480)}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[11px] font-medium text-[#F5F5F58C] hover:text-gold transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 gold-underline-hover pb-0.5"
                  style={{ letterSpacing: "0.18em" }}
                >
                  SEE HOW YOUR PROPERTY WOULD BE POSITIONED
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVideoSection;
