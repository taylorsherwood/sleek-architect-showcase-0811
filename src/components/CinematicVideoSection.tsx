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
  transform: visible ? "translateY(0)" : "translateY(16px)",
  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

const CinematicVideoSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible]);

  return (
    <section ref={ref} className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Text above video */}
          <div className="max-w-xl mb-10" style={reveal(visible, 0)}>
            <p className="text-minimal text-gold mb-3 font-extrabold">
              PROPERTY FILM
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural leading-[1.15] mb-4">
              Luxury Marketing
              <br />
              <span className="italic">That Moves</span> Buyers
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-[1.8] max-w-md">
              Cinematic presentation is part of how we position exceptional
              homes to stand apart, attract attention, and drive stronger
              perceived value.
            </p>
          </div>

          {/* Video — contained, editorial proportions */}
          <div
            className="relative rounded-lg overflow-hidden shadow-elegant"
            style={reveal(visible, 200)}
          >
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
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
            </div>
          </div>

          {/* CTA below video */}
          <div className="mt-8" style={reveal(visible, 400)}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 text-minimal text-muted-foreground hover:text-gold transition-colors duration-300"
            >
              SEE HOW YOUR HOME WOULD BE POSITIONED
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVideoSection;
