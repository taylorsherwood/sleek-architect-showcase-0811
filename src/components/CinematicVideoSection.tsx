import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VIDEO_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/f_auto,q_auto,w_1600/My_Movie_4_gxjr7u";

const POSTER_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/so_2,w_1600,f_jpg,q_80/My_Movie_4_gxjr7u";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

const CinematicVideoSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Ensure autoplay works after intersection */
  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible]);

  return (
    <section
      ref={ref}
      className="relative bg-[#0C0F24] overflow-hidden"
    >
      {/* Video container — cinematic aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: "21 / 9", minHeight: 320 }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          poster={POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F24]/80 via-[#0C0F24]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/60 via-transparent to-[#0C0F24]/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <p
                className="text-minimal text-gold mb-3 font-extrabold"
                style={reveal(visible, 0)}
              >
                PROPERTY FILM
              </p>

              {/* Divider */}
              <div
                className="mb-5"
                style={{
                  ...reveal(visible, 120),
                  width: 40,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, hsl(43 30% 56% / 0.5), transparent)",
                }}
              />

              {/* Headline */}
              <h2
                className="text-3xl md:text-5xl lg:text-[3.4rem] font-display font-light text-primary-foreground leading-[1.1] mb-5"
                style={reveal(visible, 240)}
              >
                Luxury Marketing
                <br />
                <span className="italic text-primary-foreground/90">
                  That Moves
                </span>{" "}
                Buyers
              </h2>

              {/* Subheadline */}
              <p
                className="text-primary-foreground/55 text-sm md:text-base leading-[1.8] mb-8 max-w-md"
                style={reveal(visible, 400)}
              >
                Cinematic presentation is part of how we position exceptional
                homes to stand apart, attract attention, and drive stronger
                perceived value.
              </p>

              {/* CTA */}
              <div style={reveal(visible, 560)}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 text-minimal text-primary-foreground/80 hover:text-gold transition-colors duration-300"
                >
                  SEE HOW YOUR HOME WOULD BE POSITIONED
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
